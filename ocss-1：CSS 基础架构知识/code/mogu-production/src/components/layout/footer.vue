<template>
  <footer class="c-footer">
    <slot></slot>
  </footer>
</template>
<script>
export default {
  name: 'CFooter'
}
</script>
<style lang="scss" scoped>
@include b(c-footer) {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
</style>