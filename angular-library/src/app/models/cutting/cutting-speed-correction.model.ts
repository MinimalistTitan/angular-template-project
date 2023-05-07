import { ICapacityData, ICapacityDataDetail } from '../capacity';

export class CuttingSpeedCorrectionCapacityDataModel implements ICapacityData {
  modified: Date;
  cvcorr: number;
}

export class CuttingSpeedCorrectionModel extends ICapacityDataDetail<CuttingSpeedCorrectionCapacityDataModel> {
  toJson() {}

  get isDefined(): boolean {
    throw new Error('Method not implemented.');
  }

  get isValid(): boolean {
    throw new Error('Method not implemented.');
  }

  get isOptionalEmpty(): boolean {
    throw new Error('Method not implemented.');
  }
  
}
