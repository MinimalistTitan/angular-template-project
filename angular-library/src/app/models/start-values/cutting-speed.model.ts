import { KaprTypeEnum } from '../enums';
import { FeedSpeedModel } from './feed-speed.model';
import { TappingSpeedModel } from './tapping-speed.model';
import { ThreadNapVcModel } from './thread-nap-vc.model';

export interface CuttingSpeedModel {
  vc: number;
  feedSpeedZ: FeedSpeedModel;
  feedSpeedN: FeedSpeedModel;
  feedSpeedNe: FeedSpeedModel;
  feedSpeedNs: FeedSpeedModel;
  solidMillingFeedSpeed: FeedSpeedModel;
  kapr: number;
  kaprType: KaprTypeEnum;
  labelType: string;
  reamingFeedSpeed?: FeedSpeedModel;
  threadNapVc: ThreadNapVcModel;
  drillingFeedSpeed: FeedSpeedModel;
  tappingSpeed: TappingSpeedModel;
  apmn: number;
  apnom: number;
  apmx: number;
}
