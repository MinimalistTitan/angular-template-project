import { Injector } from '@angular/core';

export interface IDialogConfig {
  title?: string;
  extraTitle?:string;
  component?: any;
  injector?: Injector;
  width?: string;
  minHeight?: string;
  position?: {
    top: string;
  };
  disableClose?: boolean;
  customClassContainer?:string
}

export interface IDialogConfirm {
  data?: any;
  isConfirmClick: boolean;
  willSubmitOverrideExceptions: boolean;
}
