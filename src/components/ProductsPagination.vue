<template>
  <v-pagination
    v-model="page"
    :pages="pageCount"
    active-color="#DCEDFF"
    @update:modelValue="changePageHandler"
  />
</template>

<script lang="ts">
import VPagination from '@hennge/vue3-pagination'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'
import { Options, Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator/lib/decorators/Watch'

@Options({
  components: { VPagination }
})
export default class ProductsPagination extends Vue {
  get page (): number {
    return this.$store.state.products.page
  }

  get pageCount (): number {
    return this.$store.state.products.pageCount
  }

  changePageHandler (page: number) {
    this.$store.commit('products/completeSetup')
    const query = { ...this.$route.query, page }
    this.$router.replace({ query })
    this.$store.dispatch('products/setupPagination', page)
  }
}
</script>

<style lang="scss" scoped>

</style>
