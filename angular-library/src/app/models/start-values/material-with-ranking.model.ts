import { RankingEnum } from '../enums';
import { IMaterialNodePath, toMaterialNodePath } from '../materials/material-node-path';
import { ProductDataValidatorResultModel } from './product-data-validator-result.model';

export class MaterialWithRankingModel {
  public materialPath: IMaterialNodePath;
  public tmc5MaterialPath: IMaterialNodePath;
  public geometryRank: RankingEnum;
  public gradeRank: RankingEnum;
  public materialPathString: string;
  public validatorResult: ProductDataValidatorResultModel;
  public selectedTMC5PathString?: string;

  constructor() {
    this.clear();
  }

  public clear(): void {
    // this.materialPath = new MaterialNodePathModel();
    // this.geometryRank = null;
    // this.gradeRank = null;
    // this.materialPathString = null;
    // this.validatorResult = null;
  }

  public toJson(): any {
    return {
      MaterialPath: {
        Nodes: this.materialPath.nodes,
      },
      GeometryRank: this.geometryRank,
      GradeRank: this.gradeRank,
    };
  }

  public static fromOther(
    other: MaterialWithRankingModel
  ): MaterialWithRankingModel {
    var model = new MaterialWithRankingModel();
    model.materialPath = other.materialPath;
    model.geometryRank = other.geometryRank;
    model.gradeRank = other.gradeRank;
    model.materialPathString = other.materialPathString;
    model.validatorResult = other.validatorResult;
    return model;
  }

  public static fromServerResponse(response: any): MaterialWithRankingModel {
    var model = new MaterialWithRankingModel();
    if (response) {
      model.materialPath = toMaterialNodePath(response.materialPath);
      model.geometryRank = response.geometryRank;
      model.gradeRank = response.gradeRank;
      model.materialPathString = model.materialPath?.pathString;
      if (response.allowTmcLevel5) {
        model.tmc5MaterialPath = toMaterialNodePath(response.tmc5MaterialPath);
        model.selectedTMC5PathString = model.tmc5MaterialPath?.pathString;
      } else {
        model.selectedTMC5PathString = '';
      }

      if (response.calculationValidatorResult) {
        model.validatorResult =
          ProductDataValidatorResultModel.fromServerResponse(
            response.calculationValidatorResult
          );
      }
    }

    return model;
  }
}
