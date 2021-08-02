<template>
  <p v-if="!cartItems.length">Cart is empty</p>
<!--  <div class="cart" v-else>-->

<!--    <div class="cart__item"-->
<!--         v-for="item of cartItems"-->
<!--         :key='item.id'-->
<!--    >-->

<!--      <div class="item__photo">-->
<!--        <img [routerLink]="['/iphone', product.id]"-->
<!--             *ngIf="product.hasTwoSim" src="../../assets/img/iphone/{{product.photo}}.jpg" alt="{{product.model}}"/>-->
<!--        <img [routerLink]="['/mac', product.id]"-->
<!--             *ngIf="product.hasTouchBar" src="../../assets/img/mac/{{product.photo}}.jpg" alt="{{product.model}}"/>-->
<!--        <img [routerLink]="['/watch', product.id]"-->
<!--             *ngIf="product.generation" src="../../assets/img/watch/{{product.photo}}.jpg" alt="{{product.model}}"/>-->
<!--      </div>-->

<!--      <div class="item__info" >-->

<!--        <p class="item__title" *ngIf="product.hasTwoSim">-->
<!--          <span *ngIf="product.condition === 'used'">used</span>-->
<!--          {{product.model}} <span>{{product.memory}}GB-->
<!--        <span *ngIf="product.hasTwoSim === 'yes'">Dual SIM</span> ({{product.color}})</span>-->
<!--        </p>-->

<!--        <p class="item__title" *ngIf="product.hasTouchBar">-->
<!--          {{product.model}} {{product.diagonal}} {{product.memory}} ({{product.color}})-->
<!--          <span *ngIf="product.hasTouchBar">with Touch Bar</span>-->
<!--        </p>-->

<!--        <p class="item__title" *ngIf="product.generation">-->
<!--          Apple Watch Series {{product.generation}} {{product.size}}mm {{product.color}} with-->
<!--          {{product.strapColor}} {{product.strapSeries}}-->
<!--        </p>-->

<!--        <p class="item__price">Price per item: {{product.price | currency}}</p>-->
<!--        <p class="item__count">Count-->
<!--          <input class="item__counter" min="1" value="{{product.countInCart}}" type="number"-->
<!--                 [(ngModel)]="product.countInCart" (change)="this.cartService.changeCartCounter(); calculateTotal()"/>-->
<!--          : {{product.countInCart * product.price | currency}}-->
<!--        </p>-->
<!--      </div>-->
<!--      <button class="btn" (click)="deleteFromCart(product, index)">Delete Item</button>-->

<!--    </div>-->

<!--    <div class="cart__submit">-->
<!--      <p class="submit__total">Total: {{total | currency}}</p>-->
<!--      <button class="btn submit__button" (click)="submitOrder()">Submit order</button>-->
<!--    </div>-->

<!--  </div>-->
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
})
export default class Cart extends Vue {
  get cartItems (): any {
    return this.$store.state.cart.items
  }
}
</script>

<style lang="scss" scoped>

</style>
