import { environment } from "src/environments/environment";
import { AppConfig } from "./models/app-config";

export const appConfigFactory= (): AppConfig => ({ ...window['APP_CONFIG'] || environment.appConfig } as AppConfig);

export const APP_NAVIGATION = [
  {
    id: 'Milling',
    name: 'Milling',
    text: 'Milling',
    textIntl: 'Milling',
    link: '',
    queryParams: null as any,
    active: false,
    icon: '',
    title: '',
    titleIntl: '',
    children: [
      {
        id: 'Indexable',
        name: '',
        text: 'Indexable',
        textIntl: 'Indexable',
        link: 'milling/indexable/',
        queryParams: null as any,
        active: false,
        icon: 'indexable-milling',
        title: 'Go to Indexable Milling',
        titleIntl: 'Go to Indexable Milling',
        children: [] as any,
      },
     
    ]
  },
  {
    id: 'ProductAdministration',
    name: 'ProductAdministration',
    text: 'Product Administration',
    textIntl: 'ProductAdministration',
    link: 'product-administration/product-assignment',
    queryParams: null,
    active: false,
    children: [],
    icon: '',
    title: '',
    titleIntl: '',
  },
];
