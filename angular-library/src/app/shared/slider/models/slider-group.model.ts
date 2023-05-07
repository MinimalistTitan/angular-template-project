export interface SliderConfigs {
  name?: string;
  iconClassName?: string;
  value?: number;
  pointerColor?: string;
  disabled?: boolean;
  title?: string;
}

export interface SliderItem {
  value: number;
  highValue?: number;
  key: string;
}
