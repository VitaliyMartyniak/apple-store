export type Paramether = {
  name: string;
  checked: boolean;
}

export type IphoneCategories = {
  model: Paramether[];
  memory: Paramether[];
  color: Paramether[];
  hasTwoSim: Paramether[];
  condition: Paramether[];
}

export type MacCategories = {
  model: Paramether[];
  diagonal: Paramether[];
  memory: Paramether[];
  color: Paramether[];
  hasTouchBar: Paramether[];
}

export type WatchCategories = {
  generation: Paramether[];
  model: Paramether[];
  size: Paramether[];
  color: Paramether[];
  strapSeries: Paramether[];
  strapColor: Paramether[];
}
