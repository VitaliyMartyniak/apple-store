<template>
  <div class="filters">
    <div class="filter">
      <p class="filter__title">Price</p>
      <div class="filter__price">
        <PriceFilter />
      </div>
    </div>

    <div v-for="(category, name) in categories" :key="name">
      <div class="filter">
        <p
          class="filter__title"
          v-if="name === 'hasTwoSim'"
        >Has Two Sim?</p>
        <p
          class="filter__title"
          v-else-if="name === 'hasTouchBar'"
        >Has Touch Bar?</p>
        <p
          class="filter__title"
          v-else-if="name === 'strapSeries'"
        >Strap Series</p>
        <p
          class="filter__title"
          v-else-if="name === 'strapColor'"
        >Strap Color</p>
        <p class="filter__title" v-else>
          {{ capitalise(name) }}
        </p>
        <div class="filter__element" v-for="param of category" :key="param.name">
          <label class="filter__label">
            <input type="checkbox" hidden v-model="param.checked" @change="updateUrlCategories(name, param)">
            <i class="far fa-square" v-if="!param.checked"></i>
            <i class="far fa-check-square" v-if="param.checked"></i>
            <span class="filter__name">{{name === 'generation' ? 'Apple Watch Series' : ''}} {{param.name}} {{name === 'memory' ? 'GB' : ''}} {{name === 'size' ? 'mm' : ''}}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import PriceFilter from '@/components/PriceFilter.vue'
import _ from 'lodash'
import { Parameter } from '@/types/filters'

@Options({
  components: { PriceFilter }
})
export default class ProductFilters extends Vue {
  mounted () {
    this.$store.dispatch('filters/formCategories')
    if (this.$route.query.categories) {
      const categories = JSON.parse(this.$route.query.categories.toString())
      this.$store.dispatch('filters/setCategoriesFromUrl', categories)
    }
  }

  get categories (): any {
    return this.$store.state.filters.categories
  }

  updateUrlCategories (categoryName: string, param: Parameter): any {
    let categories: any = {}
    if (this.$route.query.categories) {
      categories = JSON.parse(this.$route.query.categories.toString())
    }
    if (param.checked) {
      if (!categories[categoryName]) {
        categories[categoryName] = param.name.toString()
      } else {
        categories[categoryName] += `,${param.name.toString()}`
      }
    } else {
      categories[categoryName] = categories[categoryName]
        .split(',')
        .filter((item: string) => item !== param.name.toString())
        .join(',')
      if (!categories[categoryName]) {
        delete categories[categoryName]
      }
    }
    let query = {}
    if (_.isEmpty(categories)) {
      const queryWithoutCategories = { ...this.$route.query }
      delete queryWithoutCategories.categories
      query = { ...queryWithoutCategories }
    } else {
      query = { ...this.$route.query, categories: JSON.stringify(categories) }
    }
    query = { ...query, page: 1 }
    this.$router.replace({ query })
    this.$store.commit('filters/makeChanges')
    this.$store.dispatch('filters/updateCategories')
  }

  capitalise (word : string): string {
    return word[0].toUpperCase() + word.slice(1).toLowerCase()
  }
}
</script>

<style lang="scss">
  .filters {
    width: 23%;
    height: 100%;
    background-color: var(--light-color);
    padding: 20px;
  }

  .filter {
    margin-bottom: 20px;

    &__title {
      font-size: 20px;
      margin-bottom: 15px;
      font-weight: bold;
    }

    &__price {
      width: 92%;
      margin: 50px auto 0;
    }

    &__element {
      margin-bottom: 10px;
    }

    &__label {
      cursor: pointer;
    }

    &__name {
      margin-left: 5px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  input[type='checkbox']:checked ~ .fa-check-square {
    color: var(--detail-color);
  }

  input[type='checkbox']:checked ~ .filter__name {
    color: var(--detail-color);
  }
</style>
