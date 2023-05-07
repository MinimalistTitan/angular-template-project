import { formatNumber } from '@angular/common';
import { camelCase, isNumber, startCase, toUpper, upperCase } from 'lodash';
import { IBaseItem } from '../models';

export function toCamelCaseObject(o: any) {
  let newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === 'object') {
        value = toCamelCaseObject(value);
      }
      return value;
    });
  } else {
    newO = {} as any;
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = camelCase(origKey).toString();
        value = o[origKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamelCaseObject(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
}

export function camelCaseToTitle(value?: string) {
  if (!value) {
    return '';
  }
  const result = value.replace(/([A-Z])/g, ' $1');

  return (result.charAt(0).toUpperCase() + result.slice(1)).trim();
}

export function enumToList(
  enumO: Object,
  ignoreZero = false,
  upperCase = false
): IBaseItem[] {
  return Object.keys(enumO)
    .filter(
      (k) => isNumber(enumO[k]) && (!ignoreZero || (ignoreZero && enumO[k] > 0))
    )
    .map((k) => {
      return {
        id: enumO[k],
        name: upperCase ? k.toUpperCase() : startCase(k),
      } as IBaseItem;
    });
}

export function toPascalCaseObject(o: any, expression?: (key) => string) {
  let newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === 'object') {
        value = toPascalCaseObject(value, expression);
      }
      return value;
    });
  } else {
    newO = {} as any;
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (
          upperCase(origKey).replace(/\s+/g, '_') || origKey
        ).toString();
        if (!!expression) {
          newKey = expression(newKey);
        }
        value = o[origKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toPascalCaseObject(value, expression);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
}

export const toPascalCase = (str: string) =>
  camelCase(str).replace(/^(.)/, toUpper);
  
export const toPascalUnderscoreCase = (str: string) =>
  upperCase(str).replace(/\s+/g, '_');

export const safeFormatNumber = (
  value: number,
  locale: string,
  digitsInfo?: string
) => {
  if (isNumber(value)) {
    return formatNumber(value, locale, digitsInfo);
  }

  return null;
};

export function formatNumber2(value: number, decimalPlaces: number = 2): string {
  if (value == null || isNaN(value)) {
    return '';
  }
  const roundedValue = Math.round(value * 10**decimalPlaces) / 10**decimalPlaces;
  let stringValue = roundedValue.toFixed(decimalPlaces);
  stringValue = stringValue.replace('.', ',');
  const [wholePart, decimalPart] = stringValue.split(',');
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (decimalPlaces === 0) {
    return formattedWholePart;
  } else {
    return `${formattedWholePart},${decimalPart}`;
  }
}
