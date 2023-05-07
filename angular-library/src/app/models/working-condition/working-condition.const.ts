import { CutccEnum, FixEnum, WkpsccEnum } from "../enums";

interface ColorConfig {
  colorClass: string;
  colorHex: string;
}

interface ColorLevel {
  first: ColorConfig;
  second: ColorConfig;
  third: ColorConfig;
}

export type LevelConfig = {
  id: string;
  name: string;
  icon: string;
} & ColorConfig;

const COLOR_LEVEL: ColorLevel = {
  first: {
    colorClass: 'bg-red-400',
    colorHex: '#f87171',
  },
  second: {
    colorClass: 'bg-yellow-400',
    colorHex: '#facc15',
  },
  third: {
    colorClass: 'bg-green-400',
    colorHex: '#4ade80',
  },
};

export const WORKING_CONDITION_CONFIGS = {
  wkpscc: {
    [WkpsccEnum.PreMachined]: {
      id: 'premachined',
      name: 'Pre-machined',
      icon: 'icon-skin-premachined',
      ...COLOR_LEVEL.first,
    } as LevelConfig,
    [WkpsccEnum.LightSkin]: {
      id: 'lightskin',
      name: 'Light skin',
      icon: 'icon-skin-light',
      ...COLOR_LEVEL.second,
    } as LevelConfig,
    [WkpsccEnum.HeavySkin]: {
      id: 'heavyskin',
      name: 'Heavy skin',
      icon: 'icon-skin-hard',
      ...COLOR_LEVEL.third,
    } as LevelConfig,
  },
  cutcc: {
    [CutccEnum.ContinuousCut]: {
      id: 'continuouscut',
      name: 'Continuous cut',
      icon: 'icon-fix-stability-continuous-cut',
      ...COLOR_LEVEL.first,
    } as LevelConfig,
    [CutccEnum.VaryingDepth]: {
      id: 'varyingdepth',
      name: 'Varying depth',
      icon: 'icon-fix-stability-varying-depth',
      ...COLOR_LEVEL.second,
    } as LevelConfig,
    [CutccEnum.Interruptions]: {
      id: 'interruptions',
      name: 'Interruptions',
      icon: 'icon-fix-stability-interruptions',
      ...COLOR_LEVEL.third,
    } as LevelConfig,
  },
  fix: {
    [FixEnum.ExcellentStability]: {
      id: 'excellentstability',
      name: 'Excellent stability',
      icon: 'icon-stability-excellent',
      ...COLOR_LEVEL.first,
    } as LevelConfig,
    [FixEnum.GoodStability]: {
      id: 'goodstability',
      name: 'Good stability',
      icon: 'icon-stability-good',
      ...COLOR_LEVEL.second,
    } as LevelConfig,
    [FixEnum.LowStability]: {
      id: 'lowstability',
      name: 'Low stability',
      icon: 'icon-stability-poor',
      ...COLOR_LEVEL.third,
    } as LevelConfig,
  },
};
