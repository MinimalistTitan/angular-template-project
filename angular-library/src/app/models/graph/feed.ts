import { GraphCompareTypeEnum } from '../enums';
import { DrillingFeed } from '../feed/drilling-feed';
import { IMaterialNodePath } from '../materials/material-node-path';

import { IProductNodePath } from '../products';

export interface FeedGraphDataSeries {
  name: string;
  data: Array<Number>;
  categories: Array<string>;
}

export class FeedGraphData {
  productPath: IProductNodePath;
  materialPath: IMaterialNodePath;
  fnnSeries: FeedGraphDataSeries;
  fnxSeries: FeedGraphDataSeries;

  constructor() {
    this.productPath = null;
    this.materialPath = null;
    this.fnnSeries = { data: [], categories: [] } as FeedGraphDataSeries;
    this.fnxSeries = { data: [], categories: [] } as FeedGraphDataSeries;
  }
}
export class FeedGraphDataCollection {
  currentSeries: FeedGraphData;
  seriesToCompare: Array<FeedGraphData>;
}

export const buildGraphData = (
  feedList: Array<DrillingFeed>,
  compareAction: GraphCompareTypeEnum = null
): FeedGraphData => {
  const model = new FeedGraphData();

  for (var i = 0; i < feedList.length; i++) {
    var feed = feedList[i];

    if (i === 0) {
      if (compareAction) {
        switch (compareAction) {
          case GraphCompareTypeEnum.Materials:
            model.materialPath = feed.materialPath;
            break;
          case GraphCompareTypeEnum.DesignCodes:
            model.productPath = feed.productPath;
            break;
        }
      } else {
        model.productPath = feed.productPath;
        model.materialPath = feed.materialPath;
      }
    }

    if (!!feed.fnn) {
      model.fnnSeries.data.push(feed.fnn);
      model.fnnSeries.categories.push(feed.productLeafString);
    }

    if (!!feed.fnx) {
      model.fnxSeries.data.push(feed.fnx);
      model.fnxSeries.categories.push(feed.productLeafString);
    }
  }
  return model;
};
