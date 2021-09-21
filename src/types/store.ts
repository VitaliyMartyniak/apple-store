import { Iphone, Mac, Watch } from '@/types/products'
import { IphoneCategories, MacCategories, WatchCategories } from '@/types/filters'

export interface AlertState {
  alertText: string
}

export interface CartState {
  products: (Iphone|Mac|Watch)[],
  isLoading: boolean
}

export interface FiltersState {
  filteredProducts: Iphone[] | Mac[] | Watch[],
  priceRange: number[],
  categories: IphoneCategories | MacCategories | WatchCategories,
  productsOrder: string,
  searchFilter: string,
  userMadeChages: boolean
}

export interface PaginationState {
  paginatedProducts: Iphone[] | Mac[] | Watch[],
  page: number,
  pageSize: number,
  pageCount: number
}

export interface ProductsState {
  products: Iphone[] | Mac[] | Watch[],
  singleProduct: Iphone | Mac | Watch,
  isLoading: boolean
}

export interface RootState {
  alert: AlertState,
  cart: CartState,
  filters: FiltersState,
  products: ProductsState
}
