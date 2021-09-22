<template>
  <div class="item" v-if="product && !isLoading">
    <div class="item__photo">
      <img :src="require(`@/assets/img/${productType}/${product.photo}.jpg`)" alt="{{product.model}}"/>
    </div>
    <div class="item__data">
      <div v-if="productType === 'iphone'">
        <p class="item__title"><span v-if="product.condition === 'used'">used</span> {{product.model}} {{product.memory}}GB
          <span v-if="product.hasTwoSim === 'yes'">Dual SIM</span> ({{product.color}})</p>
        <ul class="menu">Parameters
          <li class="menu__item"><span class="item__parameter">Model:</span> {{product.model}}</li>
          <li class="menu__item"><span class="item__parameter">Memory:</span> {{product.memory}}GB</li>
          <li class="menu__item"><span class="item__parameter">Color:</span> {{product.color}}</li>
          <li class="menu__item"><span class="item__parameter">Has 2 SIM:</span> {{product.hasTwoSim}}</li>
          <li class="menu__item"><span class="item__parameter">Condition:</span> {{product.condition}}</li>
          <li class="menu__item"><span class="item__parameter">Price:</span> {{product.price}} $</li>
        </ul>
      </div>
      <div v-if="productType === 'mac'">
        <p class="item__title">{{product.diagonal}} {{product.model}} {{product.memory}}
          <span v-if="product.hasTouchBar === 'yes'">with Touch Bar</span> ({{product.color}})</p>
        <ul class="menu">Parameters
          <li class="menu__item"><span class="item__parameter">Model:</span> {{product.model}}</li>
          <li class="menu__item"><span class="item__parameter">Diagonal:</span> {{product.diagonal}}</li>
          <li class="menu__item"><span class="item__parameter">Memory:</span> {{product.memory}}</li>
          <li class="menu__item"><span class="item__parameter">Color:</span> {{product.color}}</li>
          <li class="menu__item"><span class="item__parameter">Has Touch Bar:</span> {{product.hasTouchBar}}</li>
          <li class="menu__item"><span class="item__parameter">Price:</span> {{product.price}} $</li>
        </ul>
      </div>
      <div v-if="productType === 'watch'">
        <p class="item__title">Apple Watch Series {{product.generation}} {{product.size}}mm
          {{product.color}} with {{product.strapColor}} {{product.strapSeries}}</p>
        <ul class="menu">Parameters
          <li class="menu__item"><span class="item__parameter">Generation:</span>Apple Watch Series {{product.generation}}</li>
          <li class="menu__item"><span class="item__parameter">Model:</span>{{product.model}}</li>
          <li class="menu__item"><span class="item__parameter">Size:</span>{{product.size}}mm</li>
          <li class="menu__item"><span class="item__parameter">Color:</span> {{product.color}}</li>
          <li class="menu__item"><span class="item__parameter">Strap Series</span> {{product.strapSeries}}</li>
          <li class="menu__item"><span class="item__parameter">Strap Color</span> {{product.strapColor}}</li>
          <li class="menu__item"><span class="item__parameter">Price:</span> {{product.price}} $</li>
        </ul>
      </div>
      <button class="btn" @click="addProduct(product)">Add to Cart</button>
    </div>
  </div>
  <Loader
    v-if="isLoading"
  />
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import { Iphone, Mac, Watch } from '@/types/products'
import Loader from '@/components/Loader.vue'

@Options({
  components: {
    Loader
  }
})
export default class SingleProduct extends Vue {
  get productType (): string | string[] {
    return this.$route.params.productType
  }

  get product (): Iphone | Mac | Watch | undefined {
    return this.$store.state.products.singleProduct
  }

  get isLoading (): boolean {
    return this.$store.state.products.isLoading
  }

  mounted () {
    this.$store.dispatch('products/loadSingleProduct', { productType: this.productType, id: this.$route.params.id })
  }

  unmounted () {
    this.$store.commit('products/setSingleProduct', null)
  }

  addProduct (product: Iphone | Mac | Watch) {
    const selectedProduct = { ...product, productType: this.productType }
    this.$store.dispatch('cart/addProduct', selectedProduct)
    this.$store.commit('alert/setAlertText', 'Product added to cart')
  }
}
</script>

<style lang="scss" scoped>
.item {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  background-color: var(--light-color);

  &__data {
    width: 40%;
  }

  &__title {
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    margin: 40px 0 20px;
  }

  &__parameter {
    font-weight: bold;
  }
}

img {
  height: 400px;
}

.menu {
  display: flex;
  flex-direction: column;
  font-weight: bold;

  &__item {
    display: flex;
    justify-content: space-between;
    font-weight: normal;
    margin: 10px 0 0;
  }
}

.btn {
  width: 100%;
  padding: 10px 0;
  margin-top: 20px;
  font-size: 16px;
  display: inline-block;
  background-color: var(--detail-color);

  &:hover {
    background-color: #2456ff;
  }
}

@media (max-width: 767px) {
  .item {
    flex-direction: column;
    align-items: center;

    &__data {
      width: 70%;
    }
  }

  img {
    height: 300px;
  }

  .item__data {
    margin-right: 20px;
    margin-bottom: 30px;
  }
}
</style>
