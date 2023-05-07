import { ProductDataValidatorResultModel } from "./product-data-validator-result.model";

export interface FeedSpeedModel extends ProductDataValidatorResultModel {
  vc1?: number;
  vc2?: number;
  vc3?: number;
  feed1?: number;
  feed2?: number;
  feed3?: number;
  vcmax?: number;
  vcnom?: number;
  vcmin?: number;
  calculationValidatorResult? : ProductDataValidatorResultModel;
}