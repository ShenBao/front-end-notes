<template>
  <router-view/>
</template>
<script>
import {onMounted} from 'vue'
export default {
  setup() {
    onMounted(() =>{
      window.document.documentElement.setAttribute(
        "data-theme",
        "default"
      );
    })
  }
}
</script>
<style lang="scss">
</style>