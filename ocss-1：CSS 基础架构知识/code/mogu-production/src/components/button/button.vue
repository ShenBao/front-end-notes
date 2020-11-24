<template>
  <div
    class="c-button">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CButton',
  props: {
    text: {
      type: String,
      require: true
    }
  }
}
</script>
<style lang="scss" scoped>
@include b(c-button) {
  @include box-center;
  color: $color-text-tertiary;
}
</style>