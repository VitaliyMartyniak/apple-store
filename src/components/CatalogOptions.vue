<template>
  <div class="options">
    <ul class="menu">
      <li class="menu__item">Sorting order
        <section class="dropdown">
          <ul class="dropdown__menu">
            <li class="dropdown__item" @click="setOrder('desc')">High to Low</li>
            <li class="dropdown__item" @click="setOrder('asc')">Low to High</li>
          </ul>
        </section>
      </li>
    </ul>

    <ul class="menu">
      <li class="menu__item">Show
        <section class="dropdown">
          <ul class="dropdown__menu">
            <li class="dropdown__item" @click="setItemsPerPage(9)">9 items</li>
            <li class="dropdown__item" @click="setItemsPerPage(18)">18 items</li>
          </ul>
        </section>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
})
export default class CatalogOptions extends Vue {
  setOrder (value: string) {
    this.$store.dispatch('products/setProductsOrder', value)
  }

  setItemsPerPage (value: number) {
    this.$store.dispatch('products/setPageSize', value)
  }
}
</script>

<style lang="scss" scoped>
  .options {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 50px;
  }

  .menu {
    display: flex;

    &__item {
      margin: 0 2rem;
      position: relative;

      &:hover .dropdown {
        display: block;
      }

      .dropdown {
        padding-top: 5px;
        width: 90px;
        display: none;
        position: absolute;
        background-color: #f3f3f3;

        &__menu {
          display: flex;
          flex-direction: column;

          .dropdown__item {
            cursor: pointer;
            padding: 2px;
            font-size: 13px;

            &:hover {
              color: var(--detail-color);
            }
          }
        }
      }
    }
  }
</style>
