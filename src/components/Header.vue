<template>
  <header class="header">
    <nav class="header__navbar">
      <router-link
        class="header__logo"
        :to="{ name: 'Catalog', params: { productType: 'iphone' } }"
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
<!--        <a class="feedback" routerLinkActive="active" routerLink="/feedback">Feedbacks</a>-->
      </section>
      <div class="header__functionals">
<!--        <input #textFilter class="search-input" type="text" placeholder="I'm looking for... ex.: 'iphone 8'"-->
<!--               (input)="sendText(textFilter.value)"/>-->

        <CartIcon />
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CartIcon from '@/components/CartIcon.vue'

@Options({
  components: { CartIcon }

  // props: {
  //   msg: String
  // }
})
export default class Header extends Vue {
  // msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

    //.menu-btn {
    //  position: absolute;
    //
    //  &:checked ~ .header__links {
    //    width: 200px;
    //    background-color: #e5e5e5;
    //    top: 63px;
    //    position: absolute;
    //    max-height: 400px;
    //  }
    //
    //  &:checked ~ .menu-icon .nav-icon {
    //    background-color: transparent;
    //  }
    //
    //  &:checked ~ .menu-icon .nav-icon::before {
    //    transform: rotate(-45deg);
    //    top: 0;
    //  }
    //
    //  &:checked ~ .menu-icon .nav-icon::after {
    //    transform: rotate(45deg);
    //    top: 0;
    //  }
    //}
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

      //&.feedback {
      //  margin-left: auto;
      //  margin-right: 10px;
      //}
    }
  }

  //&__functionals {
  //  display: flex;
  //  align-items: center;
  //}
}

//.search-input {
//  width: 250px;
//  padding: 5px;
//  border-radius: 5px;
//  outline: none;
//  border: 1px solid #747474;
//}

//@media (max-width: 767px) {
//  .header {
//
//    .menu-icon {
//      position: relative;
//      cursor: pointer;
//      margin-left: 30px;
//      margin-right: auto;
//
//      .nav-icon {
//        background-color: #333;
//        display: block;
//        height: 2px;
//        width: 18px;
//        position: relative;
//        transition: background .2s ease-out;
//
//        &::before {
//          background-color: #333;
//          content: "";
//          display: block;
//          height: 100%;
//          width: 100%;
//          position: absolute;
//          transition: transform .2s ease-out;
//          top: 5px;
//        }
//
//        &::after {
//          background-color: #333;
//          content: "";
//          display: block;
//          height: 100%;
//          width: 100%;
//          position: absolute;
//          transition: transform .2s ease-out;
//          top: -5px;
//        }
//      }
//    }
//
//    .header__links {
//      max-height: 0;
//      display: flex;
//      flex-direction: column;
//      overflow: hidden;
//
//      a {
//        width: 100%;
//        display: block;
//        padding: 20px;
//        margin-left: 0;
//        border-radius: 0;
//      }
//    }
//  }
//}
</style>
