<template>
  <div class='products' v-if="products">
    <ProductCard
      v-for='product of products'
      :key='product.id'
      :product="product"
      :product-type="productType"
    />

    <div class="pagination">
      <Pagination />
    </div>
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
import { Iphone, Mac, ProductType, Watch } from '@/types/products'
import Pagination from '@/components/ProductsPagination.vue'

@Options({
  components: { Pagination, ProductCard },
  props: {
    productType: String
  }
})
export default class Products extends Vue {
  // @WatchDecorator('$route', { immediate: true, deep: true })
  // onUrlChange (newRoute: any) {
  //   this.$store.dispatch('products/getItems', newRoute.params.productType)
  //   if (this.$route.query.page) {
  //     this.$store.dispatch('products/setupPagination', +this.$route.query.page)
  //   } else {
  //     this.$store.dispatch('products/setupPagination', 1)
  //   }
  // }

  productType!: ProductType

  get products (): Iphone[] | Mac[] | Watch[] {
    return this.$store.state.products.paginatedItems
  }
}
</script>

<style lang="scss" scoped>
@import '../shared/mixins.scss';
.products {
  width: 75%;
  height: 100%;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
}

.pagination {
  width: 100%;
  @include flex-centered;
}
</style>
