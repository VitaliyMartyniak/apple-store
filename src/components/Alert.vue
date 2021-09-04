<template>
  <div class="alert-wrap" :class="{ animation: text }" v-if="text">
    <div class="alert">
      <p>{{text}}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator/lib/decorators/Watch'

@Options({
})
export default class Alert extends Vue {
  timeout = 0
  @Watch('text')
  onUrlChange () {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.$store.commit('alert/setAlertText', '')
    }, 2500)
  }

  get text (): string {
    return this.$store.state.alert.alertText
  }
}
</script>

<style lang="scss" scoped>
.alert-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 25px;
  right: -300px;
  width: 200px;
  height: 40px;
  border: 1px solid var(--light-color);
  background-color: var(--detail-color);
  color: var(--light-color);
}

.animation {
  animation-name: animation;
  animation-duration: 2500ms;
  animation-fill-mode: forwards;
  animation-timing-function: linear;

  @keyframes animation {
    15% {
      right: 25px;
    }

    85% {
      right: 25px;
    }

    100% {
      right: -300px;
    }

  }
}
</style>
