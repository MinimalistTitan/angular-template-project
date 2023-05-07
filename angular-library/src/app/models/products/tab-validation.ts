import { TabsEnum } from "../enums";

export class TabValidation {
  public tab: TabsEnum;
  public isValid: boolean;
  public isVisible: boolean;

  public static fromServerResponse(response: any): TabValidation {
    var model = new TabValidation();
    if (!!response) {
      model.tab = response.Tab;
      model.isValid = response.IsValid;
      model.isVisible = response.IsVisible;
    }
    return model;
  }
}
