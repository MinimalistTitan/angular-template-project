export const isEmptyArray = (arr: any): boolean => {
    if (!arr) {
      return true;
    }
    if (!Array.isArray(arr)) {
      return true;
    }
    return arr.length <= 0;
};
  