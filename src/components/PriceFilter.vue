<template>
  <slider @change="update" :max="maxPrice" v-model="value"></slider>
<!--            <slider [(value)]="minPrice" [(highValue)]="maxPrice" [options]="options"-->
<!--                        (valueChange)="priceOnChange(minPrice, maxPrice)"></slider>-->
</template>

<script>
import Slider from '@vueform/slider'

export default {
  components: {
    Slider
  },
  data () {
    return {
      value: [0, 0]
      // maxPrice: null
    }
  },
  computed: {
    items () {
      return this.$store.state.products.items
    },
    maxPrice () {
      return this.$store.getters['products/maxPrice']
    }
    // value () {
    //   return this.$store.getters['products/value']
    // }
  },
  // watch: {
  //   $route () {
  //     console.log(this.$route)
  //     this.setValue()
  //   }
  // },
  mounted () {
    console.log('mounted')
    this.setValue()
  },
  unmounted () {
    console.log('unmounted')
  },
  methods: {
    setValue () {
      console.log('setValue')
      this.$store.dispatch('products/setPriceFilter', this.maxPrice)
      this.value = [0, this.maxPrice]
    },
    update () {
      this.$store.dispatch('products/setPriceRange', this.value)
      // this.$store.dispatch('products/filterItems')
      // this.$store.dispatch('products/setupPagination')
    }
  }
}
</script>

<style lang="scss">
@import 'node_modules/@vueform/slider/themes/default.scss';
</style>
