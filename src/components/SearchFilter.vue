<template>
  <input
    class="search-input"
    type="text"
    placeholder="I'm looking for..."
    @input="searchProducts($event.target.value)"
  />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({

})
export default class SearchFilter extends Vue {
  get searchFilter (): string {
    console.log('searchFilter', this.$store.state.products.searchFilter)
    return this.$store.state.products.searchFilter
  }

  searchProducts (value: string): void {
    this.$store.dispatch('products/searchProductsByText', value.toLowerCase())
  }
}
</script>

<style scoped lang="scss">
.search-input {
  width: 250px;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #747474;
}
</style>
