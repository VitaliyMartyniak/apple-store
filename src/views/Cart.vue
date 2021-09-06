<template>
  <p v-if="!cartProducts.length && !isLoading">Cart is empty</p>
  <div class="cart" v-if="cartProducts.length && !isLoading">

    <div class="cart__item"
         v-for="product of cartProducts"
         :key='product.id'
    >

      <div class="item__photo">
        <img
          :to="{ name: 'SingleProduct', params: { productType: product.productType, id: product.id } }"
          :src="require(`@/assets/img/${product.productType}/${product.photo}.jpg`)"
          :alt='product.model'
        />
      </div>

      <div class="item__info" >

        <p class="item__title" v-if="product.productType === 'iphone'">
          <span v-if="product.condition === 'used'">used</span>
          {{product.model}} <span>{{product.memory}}GB
        <span v-if="product.hasTwoSim === 'yes'">Dual SIM</span> ({{product.color}})</span>
        </p>

        <p class="item__title" v-if="product.productType === 'mac'">
          {{product.model}} {{product.diagonal}} {{product.memory}} ({{product.color}})
          <span v-if="product.hasTouchBar">with Touch Bar</span>
        </p>

        <p class="item__title" v-if="product.productType === 'watch'">
          Apple Watch Series {{product.generation}} {{product.size}}mm {{product.color}} with
          {{product.strapColor}} {{product.strapSeries}}
        </p>

        <p class="item__price">Price per item: {{product.price}} $</p>
        <p class="item__count">Count
          <input
            class="item__counter"
            min="1"
            type="number"
            v-model.number="product.countInCart"
            @change="changeProductCount(product)"
          />
          : {{product.countInCart * product.price}} $
        </p>
      </div>
      <button class="btn" @click="deleteFromCart(product.id)">Delete Item</button>

    </div>

    <div class="cart__submit">
      <p class="submit__total">Total: {{totalSum}} $</p>
      <button class="btn submit__button" @click="submitOrder()">Submit order</button>
    </div>

  </div>
  <Loader
    v-if="isLoading"
  />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Iphone, Mac, Watch } from '@/types/products'
import Loader from '@/components/Loader.vue'

@Options({
  components: {
    Loader
  }
})
export default class Cart extends Vue {
  get isLoading (): boolean {
    return this.$store.state.cart.isLoading
  }

  get cartProducts (): any {
    return this.$store.state.cart.products
  }

  get totalSum (): number {
    return this.$store.getters['cart/totalSum']
  }

  mounted (): void {
    this.$store.dispatch('cart/getCartList')
  }

  changeProductCount (product: Iphone | Mac | Watch) {
    this.$store.dispatch('cart/changeProductCount', product)
  }

  deleteFromCart (id: string): void {
    this.$store.dispatch('cart/deleteProduct', id)
  }

  submitOrder (): void {
    this.$store.dispatch('cart/submitOrder')
    this.$store.commit('alert/setAlertText', 'Thank`s for your order!')
  }
}
</script>

<style lang="scss" scoped>
  .cart {
    max-width: 700px;
    margin: 0 auto 40px;
    background-color: var(--light-color);

    &__item {
      display: flex;
    }

    &__submit {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border-top: 1px solid var(--dark-color);

      .submit__total {
        margin-right: 20px;
        color: var(--detail-color);
        font-weight: bold;
      }

      .submit__button {
        margin-left: 0;
        background-color: var(--detail-color);
      }
    }
  }

  .item {

    &__photo {
      cursor: pointer;
      padding: 10px 20px;
    }

    &__info {

      p {
        margin-top: 10px;
      }
    }

    &__title {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
    }

    &__counter {
      width: 40px;
    }
  }

  .btn {
    min-width: 100px;
    height: 100%;
    display: inline-block;
    background-color: var(--dark-color);
    margin-left: auto;
    padding: 10px;
  }
</style>
