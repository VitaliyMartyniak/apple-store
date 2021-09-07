<template>
  <div class="layout">
    <Header />

    <div class="container">
      <router-view />
    </div>
    <Alert />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Header from '@/components/Header.vue'
import Alert from '@/components/Alert.vue'

@Options({
  components: {
    Alert,
    Header
  }
})
export default class Layout extends Vue {
  mounted (): void {
    this.$store.dispatch('cart/getCartList')
  }
}
</script>

<style scoped lang="scss">
  .container {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    background-color: #f3f3f3;
  }
</style>
