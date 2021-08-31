<template>
  <div class='products' v-if="!isLoading">
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
  productType!: ProductType

  get products (): Iphone[] | Mac[] | Watch[] {
    return this.$store.state.products.paginatedItems
  }

  get isLoading (): boolean {
    return this.$store.state.products.isLoading
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
