import { CalculationValidationMessageEnum } from "../enums";

export class ProductDataValidatorResultModel {
    public isCalculationValid?: boolean;
    public validationMessage?: CalculationValidationMessageEnum;
    public messages?: Array<CalculationValidationMessageEnum>;
    public missingParams?: Array<string>;

    constructor() {
        this.clear();
    }

    public clear(): void {
        this.isCalculationValid = null;
        this.validationMessage = null;
        this.messages = null;
        this.missingParams = null;
    }

    public static fromServerResponse(response: any): ProductDataValidatorResultModel {
        var model = new ProductDataValidatorResultModel();
        if (response) {
            model.isCalculationValid = response.isCalculationValid;
            model.validationMessage = response.validationMessage;
            model.messages = this.getValidationMessages(model.validationMessage);
            model.missingParams = response.missingParams;
        }

        return model;
    }

    private static getValidationMessages(value: number): Array<CalculationValidationMessageEnum> {
        var result = new Array<CalculationValidationMessageEnum>();

        if (!value || value === CalculationValidationMessageEnum.Valid)
            return result;

        for (let item in CalculationValidationMessageEnum) {

            if (!CalculationValidationMessageEnum.hasOwnProperty(item))
                continue;

            if (item === CalculationValidationMessageEnum.Valid.toString())
                continue;

            if (!/^\d+$/.test(item))
                continue;

            var parsedItem = parseInt(item);
            if ((parsedItem & value) === parsedItem)
                result.push(parsedItem);
        }

        return result;
    }
}