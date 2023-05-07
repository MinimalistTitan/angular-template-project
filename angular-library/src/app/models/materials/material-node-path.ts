import { TmcLevelEnum } from "../enums";

export function toJsonFromMaterialNodePathModel(
  materialNodePathModel: IMaterialNodePath
) {
  return {
    nodes: materialNodePathModel.nodes,
  };
}

export interface IMaterialNodePath {
  nodes?: Array<string>;
  tmc1?: string;
  bvc?: number;
  hardnessUom?: string;
  hardnessNominal?: number;
  hardnessMinimum?: number;
  hardnessMaximum?: number;
  isPublished?: boolean;
  isValid?: boolean;
  isSelected?: boolean;
  material?: IMaterialNodePath;
  referenceMaterial?: IMaterialNodePath;
  isReferenceMaterial?: boolean;
  pathString?: string;
}

export interface IMaterialProfile {
  ae: number;
  averageVc: number;
  cvc: number;
  dcap: number;
  hex: number;
  highVc: number;
  lowVc: number;
  materialPath: IMaterialNodePath;
  vc0: number;
  selected: boolean
}

export interface IMaterial {
  nodes: IMaterialNodePath[];
  tmcLevel?: TmcLevelEnum;
}

export const toMaterialNodePath = (
  raw: IMaterialNodePath
): IMaterialNodePath => {
  const model = {} as IMaterialNodePath;
  if (raw != null) {
    model.nodes = raw.nodes;
    model.tmc1 =
      model.nodes != null && model.nodes.length > 0 ? model.nodes[0] : '';
    model.pathString = nodesToPathString(model.nodes);
  }
  return model;
};

export const nodesToPathString = (nodes): string => {
  var pathString = '';
  (nodes || []).forEach((node, index) => {
    if (index > 1) {
      pathString += '.';
    }
    pathString += node;
  });
  return pathString.length > 0 ? pathString : 'All';
};

export const getLevel = ( raw: IMaterialNodePath, index: number): string => {
  return raw.nodes != null && index < raw.nodes.length ? raw.nodes[index] : '';
}
