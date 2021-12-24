<template>
  <div class="root">
    <button @click="changeComponent">切换页面</button>
    <keep-alive>
      <component :is="view"></component>
    </keep-alive>
  </div>
</template>

<script>

import Home from '../components/Home.vue'
import User from '../components/User.vue'

export default {
  components: {
    Home,
    User
  },
  data () {
    return {
      view: "Home"
    }
  },
  methods: {
    changeComponent(){
      const currentView = this.view;
      this.view = currentView==="Home"?"User":"Home"
    }
  }
}

</script>
<style lang='scss' scoped>
  .text {
    cursor: pointer;
  }
</style>

