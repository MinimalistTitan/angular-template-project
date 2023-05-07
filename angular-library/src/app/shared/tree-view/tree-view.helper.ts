import { groupBy } from 'lodash';

const applyTextFilter = (data: any[], textFilters: any[]) => {
  if (!textFilters?.length) return data;
  let result = [];
  const groups = groupBy(data, 'level');
  textFilters
    .filter((_) => !!_.values.length)
    .forEach((filter) => {
      groups[filter.level] = (groups[filter.level] || []).filter(
        (_) => filter.values.includes(_.name) && _.level === filter.level
      );
    });

  const keys = Object.keys(groups)
    .map((_) => parseInt(_))
    .sort();

  keys.every((key) => {
    if (!groups[key].length) {
      result = [];
      return false;
    }

    const filter = textFilters.find((_) => _.level === key);
    if (!!filter) {
      groups[key] = groups[key].filter((i) => filter.values.includes(i.name));
    }

    const children = groups[key + 1];
    if (children instanceof Array) {
      const indexes: number[] = children.map((m) => m.data.parentIndex);
      groups[key] = groups[key].filter((i) => indexes.includes(i.data.index));
    }
    const parent = groups[key - 1];
    if (parent instanceof Array) {
      const indexes: number[] = parent.map((m) => m.data.index);
      groups[key] = groups[key].filter((i) =>
        indexes.includes(i.data.parentIndex)
      );
    }

    result.push(...groups[key]);
    return true;
  });
  //
  return result;
};

const populateParent = (node, _clonedTreeNodes: any[], textFilters: any[]) => {
  let data = [node];
  const getParent = (parentIndex: number) =>
    _clonedTreeNodes.find((_) => _.data.index === parentIndex);
  let processingIndex = node.data.parentIndex;
  let level = node.level;
  while (level > 0) {
    const parent = getParent(processingIndex);
    if (!!parent) {
      data.unshift(parent);
      processingIndex = parent.data.parentIndex;
    }

    level--;
  }

  data = applyTextFilter(data, textFilters);

  return { node, data };
};

const populateChildren = (
  node,
  _clonedTreeNodes: any[],
  textFilters: any[]
) => {
  const nextIndex = _clonedTreeNodes.find(
    (_) => _.level === node.level && _.data.index > node.data.index
  )?.data.index;

  let slicedData = _clonedTreeNodes
    .slice(node.data.index, nextIndex)
    .filter((_) => _.level >= node.level);
  slicedData = applyTextFilter(slicedData, textFilters);
  return { node, data: slicedData };
};

const populateParents = (
  nodes: any[],
  _clonedTreeNodes: any[],
  textFilters: any[]
) => {
  return nodes
    .map((node) => populateParent(node, _clonedTreeNodes, textFilters))
    .flat();
};

export const processFilter = ({
  node,
  _clonedTreeNodes,
  isParent,
  textFilters,
}) =>
  isParent
    ? populateParents(node, _clonedTreeNodes, textFilters)
    : populateChildren(node, _clonedTreeNodes, textFilters);
