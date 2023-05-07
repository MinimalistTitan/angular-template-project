import { ICoolantCapacityData } from '.';
import { ICapacityDataDetail } from '../capacity';

export class CoolantModel<
  TCoolantCapacity extends ICoolantCapacityData
> extends ICapacityDataDetail<TCoolantCapacity> {
  toJson() {
    return {
      materialPath: { nodes: this.materialPath.nodes },
      capacityData: !this.isDefined ? null : this.capacityData,
    };
  }
  get isDefined(): boolean {
    return this.capacityData?.isDefined;
  }
  get isValid(): boolean {
    return this.isDefined;
  }
  get isOptionalEmpty(): boolean {
    return this.descriptor.isOptional && this.capacityData?.isOptionalEmpty;
  }
}
