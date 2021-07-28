<template>
<!--  <div class="catalog">-->
<!--    <h1>This is {{product}} Catalog</h1>-->
<!--  </div>-->

  <CatalogOptions />

  <div class="main">
    <ProductFilters />

    <Products
      :productType="productType"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CatalogOptions from '@/components/CatalogOptions.vue'
import ProductFilters from '@/components/ProductFilters.vue'
import Products from '@/components/Products.vue'

@Options({
  components: {
    Products,
    ProductFilters,
    CatalogOptions
  }

  // props: {
  //   msg: String
  // }
})
export default class Catalog extends Vue {
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
