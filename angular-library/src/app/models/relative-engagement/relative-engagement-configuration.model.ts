import { EngagementTypeEnum } from "../enums";

export class RelativeEngagementConfiguration {
  public engagementType: EngagementTypeEnum;
  public dcap: number;
  public ae: number;

  constructor() {
    this.engagementType = null;
    this.ae = null;
    this.dcap = null;
  }

  public static fromServerResponse(
    response: any
  ): RelativeEngagementConfiguration {
    var model = new RelativeEngagementConfiguration();

    if (!!response) {
      model.engagementType = response.EngagementType;
      model.dcap = response.Dcap;
      model.ae = response.Ae;
    }

    return model;
  }
}

export const toRelativeEngagementConfiguration = (
  raw: any
): RelativeEngagementConfiguration => {
  const model = new RelativeEngagementConfiguration();
  if (!!raw) {
    model.engagementType = raw.engagementType;
    model.dcap = raw.dcap;
    model.ae = raw.ae;
  }
  return model;
};
