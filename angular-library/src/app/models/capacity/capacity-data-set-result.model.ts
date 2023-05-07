import { isArray } from 'lodash';
import {
  CapacityDataConflictCollectionModel,
  toCapacityDataConflictCollectionModel,
} from './capacity-data-conflict-collection.model';

export class CapacityDataSetResultModel {
  public data: any[];
  public hasConflicts: boolean;
  public conflicts: CapacityDataConflictCollectionModel;

  constructor() {
    this.hasConflicts = null;
    this.data = null;
    this.conflicts = null;
  }
}
export const toCapacityDataSetResultModel = (
  raw: any
): CapacityDataSetResultModel => {
  const model = new CapacityDataSetResultModel();
  if (raw != null) {
    model.data = !raw.data
      ? [raw]
      : raw.data instanceof Array
      ? raw.data
      : [raw.data];
    model.hasConflicts = raw.hasConflicts;
    if (
      model.hasConflicts &&
      !!raw.conflicts &&
      isArray(raw.conflicts.conflicts)
    ) {
      model.conflicts = toCapacityDataConflictCollectionModel(raw.conflicts);
    }
  }
  return model;
};
