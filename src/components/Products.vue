<template>
  <div class='products'>
    <ProductCard
      v-for='product of products'
      :key='product.id'
      :product-type="productType"
      :product="product"
    />
  </div>
<!--  <div class='catalog'>-->
<!--    <ng-container *ngIf='(products-->
<!--      | priceFilter: minPrice: maxPrice-->
<!--      | iphoneParameterFilter: modelsToFilter: conditionsToFilter:-->
<!--      colorsToFilter: memoriesToFilter: hasTwoSimsToFilter-->
<!--      | orderFilter: itemsOrder-->
<!--      | textFilter: textFilter-->
<!--      | paginate: { itemsPerPage: itemsPerPage, currentPage: currentPage }) as result'>-->

<!--      <div class='catalog__item' *ngFor='let product of result'>-->
<!--        <div class='item__photo' [routerLink]='['/iphone', product.id]'>-->
<!--          <img src='../../assets/img/iphone/{{product.photo}}.jpg' alt='{{product.model}}'/>-->
<!--        </div>-->
<!--        <p class='item__title'><span *ngIf='product.condition === 'used''>used</span>-->
<!--          {{product.model}} {{product.memory}}GB-->
<!--          <span *ngIf='product.hasTwoSim === 'yes''>Dual SIM</span> ({{product.color}})</p>-->
<!--        <hr/>-->
<!--        <h3 class='item__price'>{{product.price | currency}}</h3>-->
<!--        <button class='btn' (click)='addItem(product)'>Add to Cart</button>-->
<!--      </div>-->

<!--      <span *ngIf='!result.length'>No items found</span>-->
<!--      <pagination-controls *ngIf='result.length' class='catalog__pagination'-->
<!--                           (pageChange)='changeCurrentPage($event)'></pagination-controls>-->
<!--    </ng-container>-->
<!--  </div>-->
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import ProductCard from '@/components/ProductCard.vue'

@Options({
  components: { ProductCard },
  props: {
    productType: String
  }
})
export default class Products extends Vue {
  productType!: string
  products = [
    {
      model: 'iPhone 11 Pro Max',
      color: 'Midnight Green',
      memory: 64,
      hasTwoSim: 'no',
      condition: 'new',
      price: 1249,
      photo: '11pro-green',
      countInCart: 1,
      id: '1'
    },
    {
      model: 'iPhone 11 Pro Max',
      color: 'Space Gray',
      memory: 256,
      hasTwoSim: 'yes',
      condition: 'used',
      price: 1299,
      photo: '11pro-space',
      countInCart: 1,
      id: '2'
    },
    {
      model: 'iPhone 11 Pro Max',
      color: 'Silver',
      memory: 256,
      hasTwoSim: 'no',
      condition: 'used',
      price: 1199,
      photo: '11pro-silver',
      countInCart: 1,
      id: '3'
    }
  ]

  getProductPhoto (product: any): string {
    return '@/assets/img/' + this.productType + '/' + product.photo + '.jpg'
  }
}
</script>
