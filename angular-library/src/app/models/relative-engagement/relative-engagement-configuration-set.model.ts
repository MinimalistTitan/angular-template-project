import { EngagementTypeEnum } from '../enums';
import {
  RelativeEngagementConfiguration,
  toRelativeEngagementConfiguration,
} from './relative-engagement-configuration.model';

export class RelativeEngagementConfigurationSet {
  public configurations: Array<RelativeEngagementConfiguration>;

  constructor() {
    this.configurations = null;
  }
}

export const toRelativeEngagementConfigurationSet = (
  raw: any
): RelativeEngagementConfigurationSet => {
  const model = new RelativeEngagementConfigurationSet();
  if (!!raw) {
    model.configurations = raw.configurations.map((configuration) => {
      return toRelativeEngagementConfiguration(configuration);
    });
  }
  return model;
};

export const getEngagementConfiguration = (
  engagements: RelativeEngagementConfiguration[],
  engagementType: EngagementTypeEnum
): RelativeEngagementConfiguration =>
  engagements?.find((ite) => ite.engagementType === engagementType);
