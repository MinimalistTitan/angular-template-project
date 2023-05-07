import { includes, isArray, isEqualWith, isNil, isObject, omitBy } from "lodash/fp";
import * as _ from 'lodash';

export const isEmptyArray = (arr: any): boolean => {
    if (!arr) {
      return true;
    }
    if (!Array.isArray(arr)) {
      return true;
    }
    return arr.length <= 0;
};

export const ignoreUndefinedAndNull = (a: Object, b: Object): boolean | undefined => {
  if (Array.isArray(a) || Array.isArray(b)) {
    return undefined;
  }
  
  if (!_.isObject(a) || !_.isObject(b)) {
    return undefined;
  }

  if (!_.includes(a, undefined) && !_.includes(b, undefined)) {
    return undefined;
  }

  const filteredA = omitBy(isNil, a);
  const filteredB = omitBy(isNil, b);

  return _.isEqualWith(filteredA, filteredB, ignoreUndefinedAndNull);
};


  