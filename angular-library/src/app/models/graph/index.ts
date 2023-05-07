
import { CuttingSpeedModel } from '../cutting/cutting-speed.model';
import { IMaterialNodePath } from '../materials/material-node-path';
import { IProductNodePath } from '../products';

export interface IGraphData {
  cuttingSpeedGraph: number[][];
  materialNode: IMaterialNodePath;
  productNode: IProductNodePath;
  testDataGraph: number[][];
  toolLifeGraph: number[][];
}

export class GraphDataPointModel {
  hex: number;
  vc: number;
  constructor(init?: Partial<GraphDataPointModel>) {
    Object.assign(this, init);
  }
}

export class GraphDataSeries {
  name: string;
  data: Array<Array<number> | IGraphTestDataPoint>;

  constructor(init?: Partial<GraphDataSeries>) {
    Object.assign(this, init);
  }
}

export class CuttingSpeedGraphData {
  productPath: IProductNodePath;
  materialPath: IMaterialNodePath;
  testDataSeries: GraphDataSeries = new GraphDataSeries();
  vcSeries: GraphDataSeries = new GraphDataSeries();
  objectiveSeries: GraphDataSeries = new GraphDataSeries();
  toolLifeSeries: GraphDataSeries = new GraphDataSeries();
  fnnSeries: GraphDataSeries = new GraphDataSeries();
  fnxSeries: GraphDataSeries = new GraphDataSeries();
  constructor(init?: Partial<CuttingSpeedGraphData>) {
    Object.assign(this, init);
  }
}

export class CuttingSpeedGraphDataCollection {
  currentSeries: CuttingSpeedGraphData = new CuttingSpeedGraphData();
  seriesToCompare: Array<CuttingSpeedGraphData> = [];
  originalSeries: GraphDataSeries = new GraphDataSeries();
  model: CuttingSpeedModel = new CuttingSpeedModel();
  isOnEngagementChange: boolean;
  isPointDropping: boolean;
}

export interface IGraphTestDataPoint {
  x: number;
  y: number;
  customId: string;
}

export function generateControlPointSeries(
  sourceSeries: number[][]
): number[][] {
  if (!sourceSeries || sourceSeries.length < 2) return [];
  if (sourceSeries.length === 3)
    return [sourceSeries[0], sourceSeries[1], sourceSeries[2]];
  if (sourceSeries.length === 4)
    return [sourceSeries[0], sourceSeries[1], sourceSeries[2], sourceSeries[3]];

  const step = Math.round(sourceSeries.length / 4);
  return [
    sourceSeries[0],
    sourceSeries[step],
    sourceSeries[step * 2],
    sourceSeries[step * 3],
    sourceSeries[sourceSeries.length - 1],
  ];
}
