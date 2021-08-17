<template>
  <div class="filters">
    <div class="filter">
      <p class="filter__title">Price</p>
        <div class="filter__price">
          <PriceFilter />
        </div>
    </div>

<!--    <div class="filter">-->
<!--      <p class="filter__title">Model</p>-->
<!--      <div class="filter__element" *ngFor="let model of modelCategories">-->
<!--        <label class="filter__label">-->
<!--          <input type="checkbox" [checked]="model.checked"-->
<!--                 (change)="setChanges($event, model,-->
<!--             'modelsToFilter', 'modelCategories')">-->
<!--          <i class="far fa-square"></i>-->
<!--          <i class="far fa-check-square"></i>-->
<!--          <span class="filter__name">{{model.name}}</span>-->
<!--        </label>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="filter">-->
<!--      <p class="filter__title">New or used?</p>-->
<!--      <div class="filter__element" *ngFor="let condition of conditionCategories">-->
<!--        <label class="filter__label">-->
<!--          <input type="checkbox" [checked]="condition.checked"-->
<!--                 (change)="setChanges($event, condition,-->
<!--             'conditionsToFilter', 'conditionCategories')">-->
<!--          <i class="far fa-square"></i>-->
<!--          <i class="far fa-check-square"></i>-->
<!--          <span class="filter__name">{{condition.name}}</span>-->
<!--        </label>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="filter">-->
<!--      <p class="filter__title">Memory</p>-->
<!--      <div class="filter__element" *ngFor="let memory of memoryCategories">-->
<!--        <label class="filter__label">-->
<!--          <input type="checkbox" [checked]="memory.checked"-->
<!--                 (change)="setChanges($event, memory,-->
<!--             'memoriesToFilter', 'memoryCategories')">-->
<!--          <i class="far fa-square"></i>-->
<!--          <i class="far fa-check-square"></i>-->
<!--          <span class="filter__name">{{memory.name}}GB</span>-->
<!--        </label>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="filter">-->
<!--      <p class="filter__title">Color</p>-->
<!--      <div class="filter__element" *ngFor="let color of colorCategories">-->
<!--        <label class="filter__label">-->
<!--          <input type="checkbox" [checked]="color.checked"-->
<!--                 (change)="setChanges($event, color,-->
<!--             'colorsToFilter', 'colorCategories')">-->
<!--          <i class="far fa-square"></i>-->
<!--          <i class="far fa-check-square"></i>-->
<!--          <span class="filter__name">{{color.name}}</span>-->
<!--        </label>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="filter">-->
<!--      <p class="filter__title">Has 2 Sim?</p>-->
<!--      <div class="filter__element" *ngFor="let hasTwoSim of hasTwoSimCategories">-->
<!--        <label class="filter__label">-->
<!--          <input type="checkbox" [checked]="hasTwoSim.checked"-->
<!--                 (change)="setChanges($event, hasTwoSim,-->
<!--             'hasTwoSimsToFilter', 'hasTwoSimCategories')">-->
<!--          <i class="far fa-square"></i>-->
<!--          <i class="far fa-check-square"></i>-->
<!--          <span class="filter__name">{{hasTwoSim.name}}</span>-->
<!--        </label>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import PriceFilter from '@/components/PriceFilter'

export default {
  components: {
    PriceFilter
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
</style>
