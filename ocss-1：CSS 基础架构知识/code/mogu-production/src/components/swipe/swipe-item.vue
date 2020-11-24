<template>
  <div class="c-swipe-item">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CSwipeItem'
}
</script>
<style lang="scss" scoped>
@include b(c-swipe-item) {
  display: inline-block;
  @include dimensions(100%, auto);
  scroll-snap-align: center;
}
</style>