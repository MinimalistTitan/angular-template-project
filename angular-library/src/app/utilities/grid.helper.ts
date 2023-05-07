import { first, isNumber, last, lowerFirst } from 'lodash';
import { IHierarchyColumn } from '../share/hierarchy-grid/hierarchy-grid.interface';
import { MATERIAL_ARROW } from '../share/share.const';
import { IBaseHierarchyGridItem } from '../models';
import { ICapacityData, ICapacityDataDetail } from '../models/capacity';

export function toHierarchyObject(
  item: IBaseHierarchyGridItem<ICapacityDataDetail<ICapacityData>>
) {
  const nodes = item.data.materialPath?.nodes || [];
  return {
    path: item.productPath.nodes
      ?.slice(0, item.productPath?.nodes?.length - 1)
      .join(MATERIAL_ARROW),
    node: last(item.productPath.nodes),
    material: !nodes.length
      ? 'All'
      : `${first(nodes)}${nodes.slice(1).join('.')}`,
    blank: '',
  };
}

export function populateRankValue(
  data: Object,
  rankEnum: Object,
  fieldEnum: Object,
  rankData: Object | number
) {
  const rankFields = Object.keys(rankEnum).filter((k) => isNumber(rankEnum[k]));
  if (!!fieldEnum && !!rankData) {
    Object.keys(fieldEnum)
      .filter((k) => isNumber(fieldEnum[k]))
      .forEach((field) => {
        rankFields.forEach((rank) => {
          data[`${lowerFirst(field)}_${rank}`] =
            rankEnum[rank] == rankData[lowerFirst(field)];
        });
      });
  } else if (typeof rankData === 'number') {
    rankFields.forEach((key) => {
      data[lowerFirst(key)] = rankEnum[key] === rankData;
    });
  }
}

export function populateHierarchyColumns(
  columns: IHierarchyColumn[],
  nodeName = 'RefCode',
  excludeCols = [],
  includeMaterial = true
) {
  return [
    {
      id: 'node',
      name: nodeName,
      hidden: false,
      customClass: '!text-sky-700 font-semibold pl-14',
      width: 250,
    },
    {
      id: 'material',
      name: 'Material',
      isCheckbox: false,
      width: 100,
      hidden: !includeMaterial,
    },
    ...columns.filter((_) => !excludeCols.includes(_.id)),
    {
      id: 'count',
      name: 'Count',
      isCheckbox: false,
      width: 50,
      customClass: 'text-center',
      unCheckBoxText: 'X',
      excludeFromExporting: true
    },
  ];
}
