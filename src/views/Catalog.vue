<template>
  <CatalogOptions
    v-if="!isLoading"
  />

  <div
    class="main"
    v-if="!isLoading">
    <ProductFilters/>

    <Products
      :productType="productType"
    />
  </div>
  <Loader
    v-if="isLoading"
  />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CatalogOptions from '@/components/CatalogOptions.vue'
import ProductFilters from '@/components/ProductFilters.vue'
import Products from '@/components/Products.vue'
import { Watch as WatchDecorator } from 'vue-property-decorator/lib/decorators/Watch'
import { Iphone, Mac, Watch } from '@/types/products'
import Loader from '@/components/Loader.vue'

@Options({
  components: {
    Loader,
    Products,
    ProductFilters,
    CatalogOptions
  }
})
export default class Catalog extends Vue {
  path: any = null
  @WatchDecorator('$route', { immediate: true, deep: true })
  onUrlChange (newRoute: any) {
    if ((!this.path || this.path !== newRoute.params.productType) && newRoute.name === 'Catalog') {
      this.$store.commit('filters/setCategories', {})
      this.$store.dispatch('products/loadAll', newRoute)
      this.path = newRoute.params.productType
    }
  }

  get productType (): string | string[] {
    return this.$route.params.productType
  }

  get isLoading (): boolean {
    return this.$store.state.products.isLoading
  }

  get products (): Iphone[] | Mac[] | Watch[] {
    return this.$store.state.pagination.paginatedProducts
  }
}
</script>

<style lang="scss" scoped>
  .main {
    max-width: 1400px;
    display: flex;
  }
</style>
