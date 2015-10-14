export const extend = function extend(obj: any, newObj: any) {
  return (<any>window).$.extend(true, obj, newObj);
};