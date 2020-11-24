<template>
  <div class="c-columns">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CColumns'
}
</script>
<style lang="scss" scoped>
@include b(c-columns) {
  @include grid($align-items: center);
}
</style>