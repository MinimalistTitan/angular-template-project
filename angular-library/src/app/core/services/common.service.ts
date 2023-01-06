import { Injectable, InjectionToken } from "@angular/core";
import { CdmModule } from "src/app/share/shared.enum";

export const MODULE_NAME_TOKEN = new InjectionToken<CdmModule>('module');

@Injectable({
    providedIn: 'any',
  })
  export class CommonService {

    
  }