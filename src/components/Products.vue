<template>
  <div class='products' v-if="!isLoading && products">
    <ProductCard
      v-for='product of products'
      :key='product.id'
      :product="product"
      :product-type="productType"
    />

    <div class="pagination">
      <ProductsPagination />
    </div>
  </div>
  <div class="no-products" v-else>
    <p>There are no products of your choice</p>
  </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import ProductCard from '@/components/ProductCard.vue'
import { Iphone, Mac, ProductType, Watch } from '@/types/products'
import ProductsPagination from '@/components/ProductsPagination.vue'

@Options({
  components: { ProductsPagination, ProductCard },
  props: {
    productType: String
  }
})
export default class Products extends Vue {
  productType!: ProductType

  get products (): Iphone[] | Mac[] | Watch[] {
    return this.$store.state.pagination.paginatedProducts
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

  .no-products {
    margin-left: 20px;
  }

  .pagination {
    width: 100%;
    @include flex-centered;
  }

  @media (max-width: 767px) {
    .products {
      width: 65%;
    }
  }

  @media (max-width: 575px) {
    .products {
      width: 55%;
    }
  }
</style>
