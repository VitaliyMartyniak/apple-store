<template>
  <input
    v-if="$route.path.includes('catalog')"
    class="search-input"
    type="text"
    placeholder="I'm looking for..."
    :value="searchFilter"
    @input="searchProducts($event.target.value)"
  />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({

})
export default class SearchFilter extends Vue {
  get searchFilter (): string {
    return this.$store.state.filters.searchFilter
  }

  mounted (): void {
    if (this.$route.query.text) {
      this.$store.dispatch('filters/searchProductsByText', this.$route.query.text.toString().toLowerCase())
    }
  }

  searchProducts (value: string): void {
    let query
    if (value) {
      query = { ...this.$route.query, text: value }
    } else {
      const queryWithoutText = { ...this.$route.query }
      delete queryWithoutText.text
      query = { ...queryWithoutText }
    }
    query = { ...query, page: 1 }
    this.$router.replace({ query })
    this.$store.dispatch('filters/searchProductsByText', value.toLowerCase())
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

@media (max-width: 450px) {
  .search-input {
    width: 160px;
  }
}
</style>
