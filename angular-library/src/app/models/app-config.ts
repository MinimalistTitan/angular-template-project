import { InjectionToken } from "@angular/core";

export interface AppConfig {
    apiHost: string;
    appHost: string;
    environmentName: string;
}

export const CDM_APP_CONFIG = new InjectionToken('CDM App Config');