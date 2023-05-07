import { Params } from "@angular/router";

export interface NavigationItem {
    id: string;
    name: string;
    icon: string;
    text: string;
    textIntl: string;
    link: string;
    queryParams: Params;
    children: NavigationItem[];
    active: boolean;
    title: string;
    titleIntl: string;
}