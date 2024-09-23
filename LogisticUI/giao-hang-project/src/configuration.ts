import { InjectionToken } from "@angular/core";

export interface AppConfiguration {
    production: boolean;
    dev: boolean;
    API: string;
    API2: string;
}

export const AppConfig = new InjectionToken<AppConfiguration>(
    '@@appConfiguration'
);