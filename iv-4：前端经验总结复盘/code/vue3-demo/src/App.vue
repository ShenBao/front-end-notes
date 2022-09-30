<template>
  <button @click="toggleFlag">Toggle flag</button>
  <hr>

  <HelloWorld msg="Welcome to Your Vue.js App"/>

  <!-- <title-test></title-test> -->

  <!-- <location-test></location-test> -->

  <!-- <VModelTest v-model="name"></VModelTest> -->
  <!-- <p>{{name}}</p> -->

  <!-- <my-header level="1" title="张三"></my-header> -->

  <!-- <HeartBeat v-if="flag"></HeartBeat> -->
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import TitleTest from './components/TitleTest'
// import LocationTest from './components/LocationTest'
// import VModelTest from './components/VModelTest'
// import MyHeader from './components/FunctionalComponent.js'
// import HeartBeat from './components/HeartBeat'

export default {
  name: 'App',
  components: {
    HelloWorld,
    // TitleTest,
    // LocationTest,
    // VModelTest,
    // MyHeader,
    // HeartBeat
  },
  data() {
    return {
      name: '张三',
      flag: true,
    }
  },
  methods: {
    toggleFlag() {
      this.flag = !this.flag
    }
  },
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
