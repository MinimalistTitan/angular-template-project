import { Pipe, PipeTransform } from '@angular/core';

export enum CapacityDataDisplayType {
  ReadOnly = 'readOnly',
}

@Pipe({ name: 'commaSeparatedValuesToIndividualLines' })
export class CommaSeparatedValuesToIndividualLinesPipe implements PipeTransform {
  transform(value: string): string {
    function getParamTemplate(keyValuePair: string[]): string {
      const [key, value] = keyValuePair;
      return `<span class="text-[#aaa]">${key} = </span><span>${value}</span>`;
    }

    if (value && value.length > 0) {
      const output = value
        .split(/; /)
        .reduce((accumulator, current) => {
          const keyValuePair = current.split(/\s*=\s*/);
          return accumulator + getParamTemplate(keyValuePair);
        }, '');
      return output;
    }
    return value;
  }
}

