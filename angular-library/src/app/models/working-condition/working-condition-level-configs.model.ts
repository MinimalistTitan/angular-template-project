
import { SliderConfigs } from 'src/app/share/slider/models';
import {
  LevelConfig,
  WORKING_CONDITION_CONFIGS,
} from './working-condition.const';
import { CutccEnum, FixEnum, WkpsccEnum } from '../enums';

export interface WorkingConditionTypesConfig {
  wkpscc?: Array<SliderConfigs>;
  fix?: Array<SliderConfigs>;
  cutcc?: Array<SliderConfigs>;
}

export const WORKING_CONDITION_TYPES_CONFIG: WorkingConditionTypesConfig = {
  wkpscc: [
    WkpsccEnum.PreMachined,
    WkpsccEnum.LightSkin,
    WkpsccEnum.HeavySkin,
  ].map((level) => {
    const { name, icon, colorHex } = WORKING_CONDITION_CONFIGS.wkpscc[
      level
    ] as LevelConfig;
    return {
      name,
      iconClassName: icon,
      value: level,
      pointerColor: colorHex,
    };
  }),
  cutcc: [
    CutccEnum.ContinuousCut,
    CutccEnum.VaryingDepth,
    CutccEnum.Interruptions,
  ].map((level) => {
    const { name, icon, colorHex } = WORKING_CONDITION_CONFIGS.cutcc[
      level
    ] as LevelConfig;
    return {
      name,
      iconClassName: icon,
      value: level,
      pointerColor: colorHex,
    };
  }),

  fix: [
    FixEnum.ExcellentStability,
    FixEnum.GoodStability,
    FixEnum.LowStability,
  ].map((level) => {
    const { name, icon, colorHex } = WORKING_CONDITION_CONFIGS.fix[
      level
    ] as LevelConfig;
    return {
      name,
      iconClassName: icon,
      value: level,
      pointerColor: colorHex,
    };
  }),
};

export type WorkingConditionLevel = keyof WorkingConditionTypesConfig;

export const SLIDER_GROUP_NAME = {
  wkpscc: 'SKIN',
  cutcc: 'CUTTING CONDITION',
  fix: 'FIXTURE STABILITY',
};

export type WorkingConditionType = 'fix' | 'cutcc' | 'wkpscc';

export const WORKING_CONDITION_TYPES = ['wkpscc', 'cutcc', 'fix'];
