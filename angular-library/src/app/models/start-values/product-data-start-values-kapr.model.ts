import { isNumber } from 'lodash';

export class ProductDataStartValuesKaprModel {
  public value: number;

  constructor(init?: Partial<ProductDataStartValuesKaprModel>) {
    if (init) {
      Object.assign(this, init);
    } else {
      this.clear();
    }
  }

  public clear(): void {
    this.value = null;
  }

  public toJson(): any {
    return {
      value: this.value,
    };
  }

  public static fromServerResponse(
    response: any
  ): ProductDataStartValuesKaprModel {
    var model = new ProductDataStartValuesKaprModel();
    if (response) {
      model.value = isNumber(response.value) ? response.value : null;
    }

    return model;
  }
}
