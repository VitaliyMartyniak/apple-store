<template>
  <div class='products__item'>
    <div class='item__photo'>
      <img :src="require(`@/assets/img/${productType}/${product.photo}.jpg`)" :alt='product.model'/>
    </div>

    <div class="item__description" v-if="productType === 'iphone'">
      <p class='item__title'><span v-if="product.condition === 'used'">used</span>
        {{product.model}} {{product.memory}}GB
        <span v-if="product.hasTwoSim === 'yes'">Dual SIM</span> ({{product.color}})</p>
    </div>
    <div class="item__description" v-if="productType === 'mac'">
      <p class="item__title"> {{product.model}} {{product.diagonal}} {{product.memory}} ({{product.color}})
        <span v-if="product.hasTouchBar === 'yes'">with Touch Bar</span>
      </p>
    </div>
    <div class="item__description" v-if="productType === 'watch'">
      <p class="item__title">Apple Watch Series {{product.generation}}
        {{product.size}}mm {{product.color}}
        <span v-if="product.model === 'Apple Watch Sport'">Aluminium Case</span>
        <span v-if="product.model === 'Apple Watch Stainless'">Steel Case</span>
        <span v-if="product.model === 'Apple Watch Edition'">Ceramic Case</span>
        with {{product.strapColor}} {{product.strapSeries}}
      </p>
    </div>

    <hr/>
    <h3 class='item__price'>{{product.price}} $</h3>
    <!--      <button class='btn' (click)='addItem(product)'>Add to Cart</button>-->
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
export default class IphoneProductCard extends Vue {
  productType!: string
  product!: any
}
</script>
