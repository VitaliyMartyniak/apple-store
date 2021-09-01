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
      value: [0, 1]
    }
  },
  computed: {
    items () {
      return this.$store.state.products.items
    },
    maxPrice () {
      return this.$store.getters['products/maxPrice']
    },
    priceRange () {
      return this.$store.state.products.priceRange
    }
  },
  mounted () {
    this.setValue()
  },
  methods: {
    setValue () {
      if (this.$route.query.price) {
        console.log('route.query.price', this.$route.query.price.split(',').map(item => +item))
        this.$store.dispatch('products/setPriceRange', this.$route.query.price.split(',').map(item => +item))
        this.value = this.$route.query.price.split(',').map(item => +item)
      } else {
        this.$store.dispatch('products/setPriceRange', [0, this.maxPrice])
        this.value = [0, this.maxPrice]
      }
    },
    update () {
      this.$store.dispatch('products/setPriceRange', this.value)
    }
  },
  watch: {
    value () {
      // console.log('priceRange', this.priceRange)
      // if (this.priceRange !== [0, this.maxPrice]) {
      const query = { ...this.$route.query, price: this.value.join(',') }
      this.$router.replace({ query })
      // this.$router.push(`${this.$route.path}?price=${this.value}`)
      // }
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
