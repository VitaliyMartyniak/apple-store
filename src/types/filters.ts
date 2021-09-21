export interface Parameter {
  name: string;
  checked: boolean;
}

export interface UrlCategories {
  [k: string]: string[] | undefined;
  model?: string[];
  memory?: string[];
  color?: string[];
  hasTwoSim?: string[];
  condition?: string[];
  diagonal?: string[];
  hasTouchBar?: string[];
  generation?: string[];
  size?: string[];
  strapSeries?: string[];
  strapColor?: string[];
}

export interface IphoneCategories {
  [k: string]: Parameter[];
  model: Parameter[];
  memory: Parameter[];
  color: Parameter[];
  hasTwoSim: Parameter[];
  condition: Parameter[];
}

export interface MacCategories {
  [k: string]: Parameter[];
  model: Parameter[];
  diagonal: Parameter[];
  memory: Parameter[];
  color: Parameter[];
  hasTouchBar: Parameter[];
}

export interface WatchCategories {
  [k: string]: Parameter[];
  generation: Parameter[];
  model: Parameter[];
  size: Parameter[];
  color: Parameter[];
  strapSeries: Parameter[];
  strapColor: Parameter[];
}
