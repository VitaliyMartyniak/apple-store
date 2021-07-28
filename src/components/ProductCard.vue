<template>
  <div class='item'>
    <div class='item__photo'>
      <router-link :to="{ name: 'SingleProduct', params: { productType, id: product.id } }">
        <img :src="require(`@/assets/img/${productType}/${product.photo}.jpg`)" :alt='product.model'/>
      </router-link>
    </div>

    <div class="item__description" v-if="productType === 'iphone'">
      <p><span v-if="product.condition === 'used'">used</span>
        {{product.model}} {{product.memory}}GB
        <span v-if="product.hasTwoSim === 'yes'">Dual SIM</span> ({{product.color}})</p>
    </div>
    <div class="item__description" v-if="productType === 'mac'">
      <p> {{product.model}} {{product.diagonal}} {{product.memory}} ({{product.color}})
        <span v-if="product.hasTouchBar === 'yes'">with Touch Bar</span>
      </p>
    </div>
    <div class="item__description" v-if="productType === 'watch'">
      <p>Apple Watch Series {{product.generation}}
        {{product.size}}mm {{product.color}}
        <span v-if="product.model === 'Apple Watch Sport'">Aluminium Case</span>
        <span v-if="product.model === 'Apple Watch Stainless'">Steel Case</span>
        <span v-if="product.model === 'Apple Watch Edition'">Ceramic Case</span>
        with {{product.strapColor}} {{product.strapSeries}}
      </p>
    </div>

    <hr/>
    <h3 class='item__price'>{{product.price}} $</h3>
    <button class='btn' @click='addItem(product)'>Add to Cart</button>
  </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    productType: String,
    product: Object
  }
})
export default class ProductCard extends Vue {
  productType!: string
  product!: any
}
</script>

<style lang="scss" scoped>
  .item {
    display: flex;
    flex-direction: column;
    width: 31%;
    background-color: var(--light-color);
    text-align: center;
    padding: 0 20px 20px;
    cursor: pointer;
    transition: box-shadow .2s;
    margin-bottom: 20px;
    margin-left: 2.3%;

    &__photo {
      display: flex;
      justify-content: center;
      margin-top: 5px;
      margin-bottom: 20px;
    }

    &__description {
      height: auto;
      width: 80%;
      margin: 0 auto auto;
    }

    &__price {
      margin: 10px 0;
    }

    &:hover {
       box-shadow: 0 0 15px -5px rgba(0,0,0,0.75);
     }
  }

  hr {
    margin-top: 10px;
  }

  .btn {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    display: inline-block;
    background-color: var(--detail-color);

    &:hover {
      background-color: #2456ff;
    }
  }
</style>
