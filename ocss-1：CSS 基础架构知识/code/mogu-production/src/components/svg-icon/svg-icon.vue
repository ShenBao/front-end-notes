<template>
  <svg class="svg-icon">
    <use :xlink:href="iconName"/>
  </svg>
</template>
<script>
import {computed, toRefs} from 'vue';
export default {
  name: 'CSvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const {iconClass} = toRefs(props);
    console.log(1111, iconClass.value);
    const iconName = computed(() => `#icon-${iconClass.value}`)
    return {
      iconName
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  @include dimensions(1em, 1em);
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>