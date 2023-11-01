<template>
  <div class="home">
    <!-- <h1>Home page</h1> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" @showMsg="showMsg"/> -->
    <!-- <WatchAndComputed/> -->
    <!-- <CustomEvent1/> -->
    <!-- <CustomEvent2/> -->
    <!-- <AttrsDemo/> -->
    <!-- <ProvideAndInjectDemo/> -->
    <!-- <LifeCycleDemo/> -->
    <!-- <KeepAliveDemo/> -->
    <!-- <AsyncComponentDemo/> -->
    <ErrorDemo/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import WatchAndComputed from '@/components/WatchAndComputed.vue'
// import CustomEvent1 from '@/components/CustomEvent1'
// import CustomEvent2 from '@/components/CustomEvent2'
// import AttrsDemo from '@/components/AttrsAndListeners/Level1'
// import ProvideAndInjectDemo from '@/components/ProvideAndInject/Level1'
// import LifeCycleDemo from '@/components/LifeCycle'
// import KeepAliveDemo from '@/components/KeepAlive/index'
// import AsyncComponentDemo from '@/components/AsyncComponent/index'
import ErrorDemo from '@/components/ErrorDemo'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    // WatchAndComputed,
    // CustomEvent1,
    // CustomEvent2,
    // AttrsDemo,
    // ProvideAndInjectDemo,
    // LifeCycleDemo,
    // KeepAliveDemo,
    // AsyncComponentDemo,
    ErrorDemo,
  },
  methods: {
    showMsg(msg) {
      console.log(msg)
    }
  },
}
</script>
