<template>
  <slider @change="update" :max="maxPrice" v-model="value"></slider>
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
    }
  },
  computed: {
    items () {
      return this.$store.state.products.items
    },
    maxPrice () {
      return this.$store.getters['products/maxPrice']
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
      this.value = [0, this.maxPrice]
    },
    update () {
      this.$store.dispatch('products/setPriceRange', this.value)
    }
  }
}
</script>

<style lang="scss">
@import 'node_modules/@vueform/slider/themes/default.scss';

.slider-connect {
  background-color: var(--detail-color);
}

.slider-tooltip {
  border: 1px solid var(--detail-color);
  background: var(--detail-color);
}
</style>
