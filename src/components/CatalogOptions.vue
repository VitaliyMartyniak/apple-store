<template>
  <p>Here would be options!</p>
<!--  <div class="options">-->
<!--    <ul class="menu">-->
<!--      <li class="menu__item">Sorting order-->
<!--        <section class="dropdown">-->
<!--          <ul class="dropdown__menu">-->
<!--            <li class="dropdown__item" (click)="setOrder('desc')">High to Low</li>-->
<!--            <li class="dropdown__item" (click)="setOrder('asc')">Low to High</li>-->
<!--          </ul>-->
<!--        </section>-->
<!--      </li>-->
<!--    </ul>-->

<!--    <ul class="menu">-->
<!--      <li class="menu__item">Show-->
<!--        <section class="dropdown">-->
<!--          <ul class="dropdown__menu">-->
<!--            <li class="dropdown__item" (click)="setItemsPerPage(9)">9 items</li>-->
<!--            <li class="dropdown__item" (click)="setItemsPerPage(18)">18 items</li>-->
<!--          </ul>-->
<!--        </section>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </div>-->
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  // props: {
  //   msg: String
  // }
})
export default class CatalogOptions extends Vue {
  // msg!: string
}
</script>
