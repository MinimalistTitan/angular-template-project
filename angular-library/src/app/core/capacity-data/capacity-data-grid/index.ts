import { isEqual, omit } from 'lodash';
import { IHierarchyGridItem } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';

export function toPreviewGridItem(
  originalSource: IHierarchyGridItem[],
  data: IHierarchyGridItem[]
) {
  return data.map((item: IHierarchyGridItem) => {
    const originalItem = originalSource.find(
      (_) =>
        isEqual(_.path, item.path) &&
        isEqual(_.node, item.node) &&
        isEqual(_['material'], item['material'])
    );

    item.rowClass = isEqual(
      omit(item, ['id', 'isFirst', 'isLast']),
      omit(originalItem, ['id', 'isFirst', 'isLast'])
    )
      ? ''
      : '!bg-accent-200 hover:!bg-accent-500 !text-white';

    return item;
  });
}