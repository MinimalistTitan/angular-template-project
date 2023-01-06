// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    appConfig:{
      // apiHost: 'https://app-01-cdm-api-euw-dev.azurewebsites.net',
      reportApiHost: 'https://localhost:7127',
      apiHost: 'http://localhost:5208',
      appHost: 'http://localhost:5140',
      environmentName: 'Local'
    },

    auth: {
      authority: "https://login.microsoftonline.com/e11cbe9c-f680-44b9-9d42-d705f740b888",
      clientId: "4b59d2ec-54ba-4cc6-ab83-8915b1fd54e1",
      scopes: "api://4b59d2ec-54ba-4cc6-ab83-8915b1fd54e1/cdm_access User.Read Directory.Read.All"
    }
  };
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
  