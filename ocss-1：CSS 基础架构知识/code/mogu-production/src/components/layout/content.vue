<template>
  <main class="c-content">
    <slot></slot>
  </main>
</template>
<script>
export default {
  name: 'CContent'
}
</script>
<style lang="scss" scoped>
@include b(c-content) {
  overflow: auto;
  flex: 1;
}
</style>