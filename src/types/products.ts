export type ProductType = 'iphone'|'mac'|'watch'

export type Iphone = {
  model: string;
  memory: number;
  color: string;
  hasTwoSim: string;
  condition: string;
  price: number;
  photo: string;
  countInCart?: number;
  id?: string;
}

export type Mac = {
  model: string;
  diagonal: string;
  memory: string;
  color: string;
  hasTouchBar: string;
  price: number;
  photo: string;
  countInCart?: number;
  id?: string;
}

export type Watch = {
  generation: number;
  model: string;
  size: number;
  color: string;
  strapSeries: string;
  strapColor: string;
  price: number;
  photo: string;
  countInCart?: number;
  id?: string;
}
