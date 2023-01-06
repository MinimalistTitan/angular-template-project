export const environment = {
    production: true,

    appConfig:{
      apiHost: 'https://app-01-cdm-api-euw-dev.azurewebsites.net',// replace by deployed endpoint
      reportApiHost: 'https://app-03-cdm-reportapi-euw-dev.azurewebsites.net',
      appHost: 'http://localhost:5140',
      environmentName: ''
    },
    
    auth: {
      authority: "https://login.microsoftonline.com/e11cbe9c-f680-44b9-9d42-d705f740b888",
      clientId: "4b59d2ec-54ba-4cc6-ab83-8915b1fd54e1",
      scopes: "api://4b59d2ec-54ba-4cc6-ab83-8915b1fd54e1/cdm_access user.read"
    }
  };
  