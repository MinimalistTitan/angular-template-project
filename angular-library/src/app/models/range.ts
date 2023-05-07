import { IDictionary } from './base.interface';
import { RangeEnum } from './enums';

export const RANGE_STYLES: IDictionary<{
    color: string;
    icon: string;
    hexColor?: string;
  }> = {
    [RangeEnum.Ok]: {
      color: 'bg-green-400',
      hexColor: '#34D399',
      icon: 'icon-ranking-basic',
    },
    [RangeEnum.NotRecommended]: {
      color: 'bg-yellow-300',
      hexColor: '#FCD34D',
      icon: 'icon-ranking-complementary',
    },
    [RangeEnum.NotAllowed]: {
      color: 'bg-red-600',
      hexColor: '#DC2626',
      icon: 'icon-ranking-not-published',
    },
  };