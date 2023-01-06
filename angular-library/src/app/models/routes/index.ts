import { CdmModule, CdmSubModule } from "src/app/share/shared.enum";

export interface CdmSubModuleRoute {
  route: CdmSubModule;
  name?: string;
  readableRoles: string[];
  writableRoles: string[];
  visible?: boolean;
  readonly?: boolean;
}

export interface CdmModuleRoute {
  parent: CdmModule;
  children: CdmSubModuleRoute[];
}
