export class HierarchyGridGroupModel {
  level = 0;
  parent!: HierarchyGridGroupModel;
  expanded = true;
  rowCount = 0;
  groupCount = 0;
  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }
  sequence: number;
}

export interface CollapseExpandGridState {
  expanded: boolean;
  path: string;
}