import { isNumber } from 'lodash';
import { ICapacityData, ICapacityDataDetail, toCapacityDataDescriptor } from '../capacity';
import { CdmModule } from 'src/app/share/shared.enum';
import { TappingToolLifeCapacityDataModel } from '../tool-life/tapping-tool-life.model';
import { ToolLifeCapacityDataModel } from '../tool-life/tool-life.model';
import { DrillingGradeToolLifeCapacityDataModel, SolidMillingToolLifeCapacityDataModel } from '../tool-life';
import { CoolantRankingCapacityDataModel } from '../coolant';
import { CapacityDataPageEnum, TabsEnum } from '../enums';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';
import { IProductNodePath } from '../products';

export class SubCuttingSpeedCapacityDataModel implements ICapacityData {
  modified: Date;
  module: CdmModule;
  vcnom: number;
  gradeToolLife:
    | TappingToolLifeCapacityDataModel
    | ToolLifeCapacityDataModel
    | SolidMillingToolLifeCapacityDataModel
    | DrillingGradeToolLifeCapacityDataModel;
  // Note: hardcoded feed - some kind of hack, tapping has no feed
  gradeFeed: GradeFeedCapacityDataModel | GradeFeedApmxCapacityDataModel =
    new GradeFeedCapacityDataModel({
      hexn: 0,
      hexx: 10,
    });
  gradeCoolantRanking: CoolantRankingCapacityDataModel;
  objective: number;
  ae: number;
  cvc: number;
  dcap: number;
  vc0: number;
  vca: number;
  vcb: number;
  vcc: number;
  vcmin: number;
  vcmax: number;
  vcrec: number;

  get hasDefinedPrerequisites(): boolean {
    return (
      !!this.gradeCoolantRanking &&
      this.gradeCoolantRanking.isDefinedForVcNormalization &&
      !!this.gradeToolLife &&
      this.gradeToolLife.isDefinedForVcNormalization
    );
  }

  get isDefined(): boolean {
    const isDefined = getFormFields(this.module).every((field) =>
      isNumber(this[field])
    );
    return (
      isDefined &&
      ((this.gradeCoolantRanking &&
        this.gradeCoolantRanking.isDefined &&
        this.gradeToolLife &&
        this.gradeToolLife.isDefined) ||
        this.gradeFeed?.isDefined)
    );
  }

  get isOptionalEmpty(): boolean {
    return getFormFields(this.module).every((field) => !this[field]);
  }

  constructor(init?: Partial<SubCuttingSpeedCapacityDataModel>) {
    Object.assign(this, init);
    this.toValidModel();
  }

  private toValidModel() {
    if (!!this.gradeCoolantRanking) {
      this.gradeCoolantRanking = new CoolantRankingCapacityDataModel(
        this.gradeCoolantRanking
      );
    }

    if (!!this.gradeFeed) {
      this.gradeFeed = new GradeFeedCapacityDataModel(this.gradeFeed);
    }
    switch (this.module) {
      case CdmModule.SolidMilling:
        this.gradeToolLife = new SolidMillingToolLifeCapacityDataModel(
          this.gradeToolLife
        );
        break;
      case CdmModule.Tapping:
      case CdmModule.IndexableMilling:
        this.gradeToolLife = new TappingToolLifeCapacityDataModel(
          this.gradeToolLife
        );
        break;
      case CdmModule.IndexableDrilling:
      case CdmModule.SolidDrilling:
      case CdmModule.Reaming:
        if (!!this['drillingGradeToolLife']) {
          this.gradeToolLife = new DrillingGradeToolLifeCapacityDataModel(
            this['drillingGradeToolLife']
          );
        }

        break;
      case CdmModule.GeneralTurning:
        this.gradeToolLife = new ToolLifeCapacityDataModel(this.gradeToolLife);
        if (!!this['generalTurningGradeFeed']) {
          this.gradeFeed = new GradeFeedApmxCapacityDataModel(
            this['generalTurningGradeFeed']
          );
        }

        break;
      default:
        this.gradeToolLife = new ToolLifeCapacityDataModel(this.gradeToolLife);
    }
  }
}

export class CuttingSpeedCapacityDataModel implements ICapacityData {
  modified: Date;
  cuttingSpeed: SubCuttingSpeedCapacityDataModel;
  testData: CuttingSpeedTestModel[];
  module: CdmModule;

  get isDefined(): boolean {
    if (!this.cuttingSpeed) return false;
    return this.cuttingSpeed.isDefined;
  }
  get isOptionalEmpty(): boolean {
    return this.cuttingSpeed.isOptionalEmpty;
  }

  constructor(init?: Partial<CuttingSpeedCapacityDataModel>) {
    if (!!init) {
      if (!!init.cuttingSpeed) {
        init.cuttingSpeed.module = init.module;
        init.cuttingSpeed = new SubCuttingSpeedCapacityDataModel(
          init.cuttingSpeed
        );
      }
    }
    Object.assign(this, init);
  }
}

export class CuttingSpeedModel extends ICapacityDataDetail<CuttingSpeedCapacityDataModel> {
  module: CdmModule;
  constructor(init?: Partial<CuttingSpeedModel>) {
    super();
    if (!!init) {
      if (!!init.capacityData) {
        init.capacityData.module = init.module;
        init.capacityData = new CuttingSpeedCapacityDataModel(
          init.capacityData
        );
      }
    }
    Object.assign(this, init);
  }
  toJson() {
    return this;
  }
  get isDefined(): boolean {
    return this.capacityData.isDefined;
  }
  get isValid(): boolean {
    return this.isDefined;
  }
  get isOptionalEmpty(): boolean {
    return this.descriptor.isOptional && this.capacityData.isOptionalEmpty;
  }

  get hasDefinedPrerequisites(): boolean {
    return this.capacityData?.cuttingSpeed.hasDefinedPrerequisites;
  }

  static get accordion(): IAccordionSetting {
    return {
      id: TabsEnum.CuttingSpeed,
      name: CdmAccordionRoute.CuttingSpeed,
      displayName: 'Cutting speed',
      pageName: CapacityDataPageEnum.TappingCuttingSpeed,
      mapToAccordionItem: mapToAccordionItem,
    };
  }
}

const mapToAccordionItem = (
  response: any,
  productPath?: IProductNodePath,
  module?: CdmModule
) => {
  response.module = module;
  response.descriptor = toCapacityDataDescriptor(
    response.capacityDataDescriptor,
    undefined,
    response.materialPath
  );
  return new CuttingSpeedModel(response);
};

export const getFormFields = (module: CdmModule) => {
  const fields = (CUTTING_SPEED_FORM[module] || []).map((_) => _.fieldName);
  return !!fields.length ? fields : CUTTING_SPEED_DEFAULT_FIELD;
};
