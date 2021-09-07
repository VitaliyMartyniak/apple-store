<template>
  <h1>Welcome to Apple Store</h1>
  <h2>Choose the product, You're interested in</h2>
  <div class="products">
    <router-link
      class="product__link iphones"
      :to="{ name: 'Catalog', params: { productType: 'iphone' } }"
    >
      <span>iPhone</span>
    </router-link>
    <router-link
      class="product__link macs"
      :to="{ name: 'Catalog', params: { productType: 'mac' } }"
    >
      <span>Mac</span>
    </router-link>
    <router-link
      class="product__link watches"
      :to="{ name: 'Catalog', params: { productType: 'watch' } }"
    >
      <span>Watch</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
})
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
@import '../shared/mixins.scss';
  h1, h2 {
    text-align: center;
  }

  h1 {
    margin: 20vh auto 20px;
  }

  h2 {
    margin-bottom: 30px;
  }

  .products {
    display: flex;
    justify-content: space-around;

    .product__link {
      @include flex-centered;
      align-items: flex-end;
      width: 30%;
      height: 225px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      font-size: 30px;
      color: #fff;

      &:hover {
        box-shadow: 0 0 15px -5px rgba(0,0,0,0.75);
      }

      &.iphones {
        background-image: url('../assets/img/backgrounds/iphones-background.jpeg');
      }

      &.macs {
        background-image: url('../assets/img/backgrounds/macs-background.jpeg');
      }

      &.watches {
        background-image: url('../assets/img/backgrounds/watches-background.jpeg');
      }

      span {
        margin-bottom: 20px;
      }
    }
  }
</style>
