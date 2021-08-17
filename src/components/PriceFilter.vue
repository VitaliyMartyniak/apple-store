<template>
  <slider @update="update" v-if="mounted" :max="maxPrice" v-model="value"></slider>
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
      value: null,
      mounted: false
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
  watch: {
    $route () {
      console.log(this.$route)
      this.setValue()
    }
  },
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
      // this.$store.commit('products/setValue', [0, this.maxPrice])
      // let result = 0
      // this.items.forEach((item) => {
      //   if (item.price > result) {
      //     result = item.price
      //   }
      // })
      // console.log('this.maxPrice', this.maxPrice)
      this.value = [0, this.maxPrice]
      this.mounted = true
    },
    update () {
      // this.$store.commit('products/setValue', this.value)
      console.log('this.value', this.value)
    }
  }
}
</script>

<style lang="scss">
@import 'node_modules/@vueform/slider/themes/default.scss';
</style>
