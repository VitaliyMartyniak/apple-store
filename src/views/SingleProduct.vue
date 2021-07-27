<template>
  <div class="item" v-if="product">
    <div class="item__photo">
      <img :src="require(`@/assets/img/${productType}/${product.photo}.jpg`)" alt="{{product.model}}"/>
    </div>
<!--    <div class="item__data">-->
<!--      <p class="item__title">Apple Watch Series {{product.generation}} {{product.size}}mm-->
<!--        {{product.color}} with {{product.strapColor}} {{product.strapSeries}}</p>-->
<!--      <ul class="menu">Parameters-->
<!--        <li class="menu__item"><span class="item__parameter">Generation:</span>Apple Watch Series {{product.generation}}</li>-->
<!--        <li class="menu__item"><span class="item__parameter">Model:</span>{{product.model}}</li>-->
<!--        <li class="menu__item"><span class="item__parameter">Size:</span>{{product.size}}mm</li>-->
<!--        <li class="menu__item"><span class="item__parameter">Color:</span> {{product.color}}</li>-->
<!--        <li class="menu__item"><span class="item__parameter">Strap Series</span> {{product.strapSeries}}</li>-->
<!--        <li class="menu__item"><span class="item__parameter">Strap Color</span> {{product.strapColor}}</li>-->
<!--        <li class="menu__item"><span class="item__parameter">Price:</span> {{product.price}} $</li>-->
<!--      </ul>-->
<!--      <button class="btn" (click)="addItem(product)">Add to Cart</button>-->
<!--    </div>-->
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
