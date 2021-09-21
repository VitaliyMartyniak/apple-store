export type ProductType = 'iphone'|'mac'|'watch'

export interface Iphone {
  [k: string]: string | number | undefined;
  model: string;
  memory: number;
  color: string;
  hasTwoSim: string;
  condition: string;
  price: number;
  photo: string;
  productType?: string,
  countInCart?: number;
  id?: string;
}

export interface Mac {
  [k: string]: string | number | undefined;
  model: string;
  diagonal: string;
  memory: string;
  color: string;
  hasTouchBar: string;
  price: number;
  photo: string;
  productType?: string,
  countInCart?: number;
  id?: string;
}

export interface Watch {
  [k: string]: string | number | undefined;
  generation: string;
  model: string;
  size: number;
  color: string;
  strapSeries: string;
  strapColor: string;
  price: number;
  photo: string;
  productType?: string,
  countInCart?: number;
  id?: string;
}
