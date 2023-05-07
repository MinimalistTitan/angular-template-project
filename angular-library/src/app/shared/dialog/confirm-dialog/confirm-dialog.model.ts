export class ConfirmDialogModel {
  message: string;
  title: string;
  confirmText?: string = 'Confirm';
  confirmClass?: string = '';
  cancelText?: string = 'Cancel';
  showComment?: boolean = false
  constructor(init?: Partial<ConfirmDialogModel>) {
    Object.assign(this, init);
  }
}