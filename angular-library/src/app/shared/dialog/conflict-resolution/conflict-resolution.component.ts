import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { isString } from 'lodash';
import { DialogService } from '../dialog.service';
import { IDialogConfirm } from '../model';
import { CapacityDataConflictModel } from 'src/app/models/capacity/capacity-data-conflict.model';
import { exportToCSV } from 'src/app/utilities/export.helper';
import { CapacityDataConflictDialogModel } from 'src/app/models/capacity/capacity-data-conflict-dialog.model';
import { CapacityDataConflictCollectionModel, areAllConflictsSolved } from 'src/app/models/capacity/capacity-data-conflict-collection.model';


@Component({
    selector: 'cdm-conflict-resolution-dialog',
    templateUrl: './conflict-resolution.component.html',
    styleUrls: []
})
export class ConflictResolutionDialogComponent implements OnInit {
    displayedColumns: string[] = ['productPath', 'materialPath', 'productHierarchyOrigin', 'materialHierarchyOrigin'];
    public dataSource: MatTableDataSource<CapacityDataConflictModel>;
    constructor(private data: CapacityDataConflictDialogModel
        , private dialogService: DialogService) {
    }
    searchForm: FormGroup;
    get isReadOnly() {
        return this.data.readOnly;
    }
    get isPreview() {
        return this.data.isPreview;
    }
    ngOnInit(): void {
        this.searchFormInit();
        this.dataSource = new MatTableDataSource(this.data.setResult.conflicts.conflicts);
        this.dataSource.filterPredicate = this.getFilterPredicate();
    }

    solveByHierarchyOrigin(node: CapacityDataConflictModel, colName: string, onlyUnselected: boolean): void {
        if (!!node) {
            node.solvedBy = node[colName].valueInheritedFrom;
            node.solvedBy.colName = colName;
        } else {
            this.dataSource.data.forEach(row => {
                if (onlyUnselected === true && !!row.solvedBy && isString(row.solvedBy.colName) && row.solvedBy.colName !== colName) return;
                row.solvedBy = row[colName].valueInheritedFrom;
                row.solvedBy.colName = colName;
            });
        }
    }
    areSolved(): boolean {

        return areAllConflictsSolved(this.data.setResult.conflicts.conflicts);
    }


    cancel() {
        this.dialogService.close({
            isConfirmClick: false
        } as IDialogConfirm);
    }

    exportToCsv() {
        const dataToExport = [...this.dataSource.data].map(ite => ({
            'Product path': this.formatProductPathString(ite.conflictNode.productPath.pathString),
            'Material path': ite.conflictNode.materialPath.pathString,
            'Value by product hierarchy location': this.formatOriginPaths(ite.productHierarchyOrigin),
            'Value by product hierarchy': this.formatValueString(ite.productHierarchyOrigin.nodeContentString),
            'Value by material hierarchy': this.formatValueString(ite.productHierarchyOrigin.nodeContentString),
            'Value by material hierarchy location': this.formatOriginPaths(ite.materialHierarchyOrigin),
        }));
        exportToCSV(dataToExport, 'conflicts');

    }
    save() {
        const model = new CapacityDataConflictCollectionModel();
        model.conflicts = [...this.dataSource.data];
        this.dialogService.close({
            isConfirmClick: true,
            data: model
        } as IDialogConfirm);
    }

    formatProductPathString(pathString) {
        return pathString.replace(/>/g, '|');
    }

    formatValueString(value: string): string {
        return '"' + value.replace(/=/g, ' = ').replace(/; /g, '\r\n') + '"';
    }

    formatOriginPaths(origin): string {
        return '"P: ' + origin.valueInheritedFrom.productPath.pathString + '\r\n'
            + 'M: ' + origin.valueInheritedFrom.materialPath.pathString + '"';
    }
    searchFormInit() {
        this.searchForm = new FormGroup({
            productPath: new FormControl(''),
            materialPath: new FormControl(''),
            valueByProductHierarchy: new FormControl(''),
            valueByMaterialHierarchy: new FormControl(''),
        });
    }
    getFilterPredicate() {
        return (row: CapacityDataConflictModel, filters: string) => {
            // split string per '$' to array
            const filterArray = filters.split('$');
            const productPath = filterArray[0];
            const materialPath = filterArray[1];
            const valueByProductHierarchy = filterArray[2];
            const valueByMaterialHierarchy = filterArray[3];
    
            const matchFilter = [];

            // Fetch data from row
            const productPathColumn = row.conflictNode.productPath.pathString;
            const materialPathColumn = row.conflictNode.materialPath.pathString;
            const valueByProductHierarchyColumn = row.productHierarchyOrigin.nodeContentString;
            const valueByMaterialHierarchyColumn = row.materialHierarchyOrigin.nodeContentString ;

            const customFilterProductPath = productPathColumn.toLowerCase().includes(productPath);
            const customFilterMaterialPath = materialPathColumn.toLowerCase().includes(materialPath);
            const customFilterValueByProductHierarchy = valueByProductHierarchyColumn.toLowerCase().includes(valueByProductHierarchy);
            const customFilterValueByMaterialHierarch = valueByMaterialHierarchyColumn.toLowerCase().includes(valueByMaterialHierarchy);

            // push boolean values into array
            matchFilter.push(customFilterProductPath);
            matchFilter.push(customFilterMaterialPath);
            matchFilter.push(customFilterValueByProductHierarchy);
            matchFilter.push(customFilterValueByMaterialHierarch);
            
            return matchFilter.every(Boolean);
        };
    }

    applyFilter() {
        let productPath = this.searchForm.get('productPath').value;
        let materialPath = this.searchForm.get('materialPath').value;
        let valueByProductHierarchy = this.searchForm.get('valueByProductHierarchy').value;
        let valueByMaterialHierarchy = this.searchForm.get('valueByMaterialHierarchy').value;

        productPath = !productPath ? '' : productPath;
        materialPath = !materialPath ? '' : materialPath;
        valueByProductHierarchy = !valueByProductHierarchy ? '' : valueByProductHierarchy;
        valueByMaterialHierarchy = !valueByMaterialHierarchy ? '' : valueByMaterialHierarchy;

        const filterValue = productPath + '$' + materialPath + '$' + valueByProductHierarchy + '$' + valueByMaterialHierarchy;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}



