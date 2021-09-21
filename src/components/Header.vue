<template>
  <header class="header">
    <nav class="header__navbar">
      <router-link
        class="header__logo"
        :to="{ name: 'Home' }"
      >
        <i class="fab fa-apple" />
      </router-link>
<!--      <input class="menu-btn" id="menu-btn" type="checkbox" />-->
<!--      <label class="menu-icon" for="menu-btn"><span class="nav-icon"></span></label>-->
      <section class="header__links">
        <router-link
          :to="{ name: 'Catalog', params: { productType: 'iphone' } }"
          :class="{'active': $route.path.includes('iphone')}"
        >iPhone</router-link>
        <router-link
          :to="{ name: 'Catalog', params: { productType: 'mac' } }"
          :class="{'active': $route.path.includes('mac')}"
        >Mac</router-link>
        <router-link
          :to="{ name: 'Catalog', params: { productType: 'watch' } }"
          :class="{'active': $route.path.includes('watch')}"
        >Watch</router-link>
      </section>
      <div class="header__functionals">
        <SearchFilter />
        <CartIcon />
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CartIcon from '@/components/CartIcon.vue'
import SearchFilter from '@/components/SearchFilter.vue'

@Options({
  components: { CartIcon, SearchFilter }
})
export default class Header extends Vue {
}
</script>

<style scoped lang="scss">
@import '../shared/mixins.scss';

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 5px 0;
  box-shadow: 0 0 15px -5px rgba(0, 0, 0, 1);
  margin-bottom: 20px;
  background-color: #f3f3f3;

  &__navbar {
    @include flex-centered;
    width: 95%;
    max-width: 1400px;
    margin: 0 auto;
    justify-content: space-between;
    position: relative;
  }

  &__logo {
    font-size: 48px;
    color: var(--dark-color);

    &:hover {
      color: var(--detail-color);
    }
  }

  &__links {
    @include flex-centered;
    width: 100%;
    justify-content: flex-start;
    margin-right: auto;

    a {
      margin-left: 30px;
      padding: 15px 10px;
      border-radius: 5px;
      color: var(--dark-color);
      transition: color, background-color .2s;

      &:hover, &.active {
        color: var(--detail-color);
        background-color: #e8e8e8;
      }
    }
  }

  &__functionals {
    display: flex;
    align-items: center;
  }
}
</style>
