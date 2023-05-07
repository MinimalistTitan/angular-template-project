import { ICapacityData } from '../capacity';
import { RangeEnum } from '../enums';

export interface ICoolantCapacityData extends ICapacityData {
  dry: RangeEnum;
  air: RangeEnum;
  mql: RangeEnum;
  em5: RangeEnum;
  em10: RangeEnum;
  oil: RangeEnum;
  get isDefined(): boolean;
  get isOptionalEmpty(): boolean;
}

export * from './coolant-cvc.model';
export * from './coolant-ranking.model';
export * from './coolant.model';
export * from './coolant-tool-life-factor.model';
