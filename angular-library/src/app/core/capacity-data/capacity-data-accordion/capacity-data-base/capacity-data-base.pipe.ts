import { Pipe, PipeTransform } from '@angular/core';
import { RESOURCES } from 'src/app/models';
import { CapacityDataDescriptorModel } from 'src/app/models/capacity';
import { ReadOnlyCauseEnum } from 'src/app/models/enums';


export enum CapacityDataDisplayType {
  ReadOnly = 'readOnly',
}
@Pipe({ name: 'capacityData', standalone: true })
export class CapacityDataPipe implements PipeTransform {
  transform(
    value: CapacityDataDescriptorModel,
    displayType: 'readOnly' | 'inheritance' | 'error'
  ): string | CapacityDataDescriptorModel {
    switch (displayType) {
      case 'readOnly':
        return this.getReadOnlyCauseTooltip(value);
      case 'inheritance':
        return value;
      case 'error':
        return RESOURCES['ValidationInputNotValid'];
      default:
        return '';
    }
  }

  private getReadOnlyCauseTooltip(
    descriptor: CapacityDataDescriptorModel
  ): string {
    if (
      descriptor.readOnlyCause === ReadOnlyCauseEnum.None ||
      !descriptor.readOnlyCause
    )
      return RESOURCES['EditingDisabledTooltip'];
    let enumValueName = ReadOnlyCauseEnum[descriptor.readOnlyCause];
    return enumValueName
      ? RESOURCES[`EditingDisabledTooltip_${enumValueName}`]
      : RESOURCES['EditingDisabledTooltip'];
  }
}
