import { CdmModuleRoute } from "../models/routes";
import { CdmModule, CdmSubModule } from "./shared.enum";

export const MATERIAL_ARROW =
  '<mat-icon role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color !inline !text-xs text-gray-400 !leading-none align-middle mx-1" aria-hidden="true" data-mat-icon-type="font">double_arrow</mat-icon>';

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
