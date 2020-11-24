<template>
  <c-columns class="c-search">
    <c-svg-search
      size="16"
      :colors="['#bbb', '#F1F1F1', '#F1F1F1']"></c-svg-search>
    <span>{{ text }}</span>
  </c-columns>
</template>
<script>
export default {
  name: 'CSearch',
  props: {
    text: String
  }
}
</script>
<style lang="scss" scoped>
@include b(c-search) {
  background-color: $background-color-primary;
}
</style>