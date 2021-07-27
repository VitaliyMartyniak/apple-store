<template>
  <div class='products' v-if="products">
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

  mounted (): void {
    console.log('store', this.$store.state.products.items)
  }

  get products (): any {
    return this.$store.state.products.items
  }
}
</script>

<style lang="scss" scoped>
.products {
  width: 75%;
  height: 100%;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
}
</style>
