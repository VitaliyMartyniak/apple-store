<template>
  <slider @change="update" :max="maxPrice" :min="minPrice" v-model="value"></slider>
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
    minPrice () {
      return this.$store.getters['products/minPrice']
    },
    maxPrice () {
      return this.$store.getters['products/maxPrice']
    },
    priceRange () {
      return this.$store.state.filters.priceRange
    }
  },
  mounted () {
    this.setValue()
  },
  methods: {
    setValue () {
      if (this.$route.query.price) {
        this.$store.dispatch('filters/setPriceRange', this.$route.query.price.split(',').map(item => +item))
        this.value = this.$route.query.price.split(',').map(item => +item)
      } else {
        this.$store.dispatch('filters/setPriceRange', [this.minPrice, this.maxPrice])
        this.value = [this.minPrice, this.maxPrice]
      }
    },
    update () {
      this.$store.commit('filters/completeSetup')
      this.$store.dispatch('filters/setPriceRange', this.value)
      let query = { ...this.$route.query, page: 1 }
      query = { ...query, price: this.value.join(',') }
      this.$router.replace({ query })
    }
  }
  // watch: {
  //   value () {
  //     // console.log('priceRange', this.priceRange)
  //     // if (this.priceRange !== [0, this.maxPrice]) {
  //     if (this.setupedFromUrl) {
  //       const query = { ...this.$route.query, price: this.value.join(',') }
  //       this.$router.replace({ query })
  //     }
  //     // this.$router.push(`${this.$route.path}?price=${this.value}`)
  //     // }
  //   }
  // }
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
