import { SliderConfigs } from 'src/app/share/slider/models';
import { RangeEnum, CtptEnum, EngagementTypeEnum } from './slider.enum';

export const OPERATIONS_TYPES = {
  levelsMedium: [
    {
      name: 'Medium',
      value: CtptEnum.Medium,
      pointerColor: '#4ADE80',
      iconClassName: 'icon-ranking-no-cutting-data',
    } as SliderConfigs,
    {
      name: 'Light',
      value: CtptEnum.Light,
      pointerColor: '#4ADE80',
      iconClassName: 'icon-ranking-no-cutting-data',
    } as SliderConfigs,
    {
      name: 'Heavy',
      value: CtptEnum.Heavy,
      pointerColor: '#4ADE80',
      iconClassName: 'icon-ranking-no-cutting-data',
    } as SliderConfigs,
    {
      name: 'Not Applicable',
      value: CtptEnum.NotApplicable,
      pointerColor: '#4ADE80',
      iconClassName: 'icon-ranking-not-published',
    } as SliderConfigs,
  ],
  levelsFinishing: [
    {
      name: 'Finishing',
      value: CtptEnum.Finishing,
      pointerColor: '#4ADE80',
      iconClassName: 'icon-ranking-no-cutting-data',
    } as SliderConfigs,
    {
      name: 'Medium',
      value: CtptEnum.Medium,
      pointerColor: '#4ADE80',
      iconClassName: 'icon-ranking-no-cutting-data',
    } as SliderConfigs,
    {
      name: 'Roughing',
      value: CtptEnum.Roughing,
      pointerColor: '#4ADE80',
      iconClassName: 'icon-ranking-no-cutting-data',
    } as SliderConfigs,
    {
      name: 'Not Applicable',
      value: CtptEnum.NotApplicable,
      pointerColor: '#4ADE80',
      iconClassName: 'icon-ranking-not-published',
    } as SliderConfigs,
  ],
  levelsLowFeed: [
    {
      name: 'Low Feed',
      value: CtptEnum.LowFeed,
      pointerColor: '#4ADE80',
      iconClassName: 'icon-ranking-no-cutting-data',
    } as SliderConfigs,
    {
      name: 'Medium Feed',
      value: CtptEnum.MediumFeed,
      pointerColor: '#4ADE80',
      iconClassName: 'icon-ranking-no-cutting-data',
    } as SliderConfigs,
    {
      name: 'High Feed',
      value: CtptEnum.HighFeed,
      pointerColor: '#4ADE80',
      iconClassName: 'icon-ranking-no-cutting-data',
    } as SliderConfigs,
    {
      name: 'Not Applicable',
      value: CtptEnum.NotApplicable,
      pointerColor: '#4ADE80',
      iconClassName: 'icon-ranking-not-published',
    } as SliderConfigs,
  ],
};
export const SUP_OPERATION_RANKING_TYPES = {
  rankingLevels: [
    {
      name: 'OK',
      value: RangeEnum.Ok,
      pointerColor: '#4ADE80',
      iconClassName: 'icon-ranking-basic',
    } as SliderConfigs,
    {
      value: RangeEnum.NotRecommended,
      name: 'Not Recommended',
      pointerColor: '#FDE047',
      iconClassName: 'icon-ranking-complementary',
    } as SliderConfigs,
    {
      value: RangeEnum.NotAllowed,
      name: 'Not Allowed',
      pointerColor: '#dc2626',
      iconClassName: 'icon-ranking-not-published',
    } as SliderConfigs,
  ],
};

export const ENGAGEMENT_TYPES = [
  {
    name: 'Slot Milling',
    value: EngagementTypeEnum.SlotMilling,
  } as SliderConfigs,
  {
    name: 'End Milling',
    value: EngagementTypeEnum.EndMilling,
  } as SliderConfigs,
  {
    name: 'Face Milling',
    value: EngagementTypeEnum.FaceMilling,
  } as SliderConfigs,
  {
    name: 'Other',
    value: EngagementTypeEnum.Other,
  } as SliderConfigs,
];
