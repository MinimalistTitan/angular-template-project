import { CdmModuleRoute } from "../models/routes";
import { CdmModule, CdmSubModule } from "./shared.enum";

export const SUB_NAVIGATION: CdmModuleRoute[] = [
  {
    parent: CdmModule.ProductAdministration,
    children: [
      {
        route: CdmSubModule.Geometry,
        name: 'Geometry Capacity Data',
        readableRoles: ['geometry-milling-indexable-read'],
        writableRoles: ['geometry-milling-indexable-write'],
      },
      
    ],
  },
];
