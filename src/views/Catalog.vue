<template>
<!--  <div class="catalog">-->
<!--    <h1>This is {{product}} Catalog</h1>-->
<!--  </div>-->

  <CatalogOptions
    v-if="loaded"
  />

  <div class="main">
    <ProductFilters
      v-if="loaded"
    />

    <Products
      v-if="loaded"
      :productType="productType"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CatalogOptions from '@/components/CatalogOptions.vue'
import ProductFilters from '@/components/ProductFilters.vue'
import Products from '@/components/Products.vue'
import { Watch as WatchDecorator } from 'vue-property-decorator/lib/decorators/Watch'
// import { ProductType } from '@/types/products'

@Options({
  components: {
    Products,
    ProductFilters,
    CatalogOptions
  }
})
export default class Catalog extends Vue {
  loaded = false
  path = null
  @WatchDecorator('$route', { immediate: true, deep: true })
  onUrlChange (newRoute: any) {
    console.log('newRoute', newRoute)
    if (!this.path || this.path !== newRoute.params.productType) {
      this.$store.dispatch('products/getItems', newRoute.params.productType)
      this.path = newRoute.params.productType
      this.loaded = false
      console.log('works')
    }
    if (this.$route.query.page) {
      this.$store.dispatch('products/setupPagination', +this.$route.query.page)
    } else {
      this.$store.dispatch('products/setupPagination', 1)
    }
    setTimeout(() => {
      this.loaded = true
    }, 0)
  }

  get productType (): string | string[] {
    return this.$route.params.productType
  }
  // msg!: string
}
</script>

<style lang="scss" scoped>
  .main {
    max-width: 1400px;
    display: flex;
  }
</style>
