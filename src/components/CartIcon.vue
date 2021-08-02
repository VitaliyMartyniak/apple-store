<template>
  <router-link class="cart__link" :to="{name: 'Cart'}">
    <i class="fas fa-shopping-cart icon"></i>
    <span class="cart__counter" v-if="cartCounter">{{cartCounter}}</span>
  </router-link>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
})
export default class CartIcon extends Vue {
  get cartCounter (): number {
    return this.$store.getters['cart/counter']
  }
}
</script>

<style lang="scss" scoped>
  .icon {
    font-size: 20px;
    margin-left: 40px;
    cursor: pointer;
    color: var(--dark-color);

    &:hover {
      color: var(--detail-color);
    }
  }

  .cart__link {
    position: relative;
  }

  .cart__counter {
    position: absolute;
    top: -10px;
    display: inline-block;
    font-size: 10px;
    background-color: var(--detail-color);
    padding: 2px 4px;
    border-radius: 5px;
    color: var(--light-color);
  }
</style>
