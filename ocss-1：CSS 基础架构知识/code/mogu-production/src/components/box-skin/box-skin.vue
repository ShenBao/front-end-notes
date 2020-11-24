<template>
  <div
    class="c-box-skin"
    :class="type? 'c-box-skin--'+type: ''">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CBoxSkin',
  props: {
    type: {
      validator: function (value) {
        return ['top', 'bottom'].indexOf(value) !== -1
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@include b(c-box-skin) {
  background-color: $background-color-secondary;
  @include m(top) {
    border-top: $border-base;
  }
  @include m(bottom) {
    border-bottom: $border-base;
  }
}
</style>