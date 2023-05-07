import {
  IProductMaterialSelection, toJsonFromProductMaterialSelection,

} from '../products';
import {
  CapacityDataConflictCollectionModel,
  toCapacityDataConflictCollectionJson,
} from './capacity-data-conflict-collection.model';

export class CapacityDataSaveRequestBaseModel {
  public productSelection: IProductMaterialSelection;
  public saveComment: string;
  public deleteExceptions: boolean;
  public conflictResolution: CapacityDataConflictCollectionModel;

  constructor(
    productSelection: IProductMaterialSelection,
    saveComment: string,
    deleteExceptions: boolean = false,
    conflicts?: CapacityDataConflictCollectionModel
  ) {
    this.productSelection = productSelection;
    this.saveComment = saveComment;
    this.deleteExceptions = deleteExceptions;
    this.conflictResolution = conflicts;
  }
  public toJson(): any {
    return {
      materialSelection: toJsonFromProductMaterialSelection(
        this.productSelection
      ),
      saveComment: this.saveComment,
      deleteExceptions: this.deleteExceptions,
      conflictResolution: !!this.conflictResolution
        ? toCapacityDataConflictCollectionJson(this.conflictResolution)
        : null,
    };
  }
}
