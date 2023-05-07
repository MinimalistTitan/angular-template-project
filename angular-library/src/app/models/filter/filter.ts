export class EnumModel {
    id: number;
    name: string;

    constructor(id: number = null, name: string = "") {
        this.id = id;
        this.name = name;
    }

    public clear() {
        this.id = null;
        this.name = "";
    }

    public toJson(): any {
        return {
            Id: this.id,
            Name: this.name
        };
    }

    public static fromServerResponse(response: any): EnumModel {
        var model = new EnumModel();
        if (response != null) {
            model.id = response.Id;
            model.name = response.Name;
        }
        return model;
    }
}

export interface IFilterModel{
    items: Array<EnumModel>;
    selectedItems: Array<EnumModel>;
    title: string;
}