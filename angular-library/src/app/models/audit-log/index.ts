import { IMaterialNodePath } from './../materials/material-node-path';

export interface IAuditLog {
  date: Date | string;
  newValue: string;
  oldValue: string;
  newValueInheritedFrom: string;
  oldValueInheritedFrom: string;
  parameterName: string;
  userName: string;
  changeComment: string;
  material: IMaterialNodePath;
  materialName: string;
}
