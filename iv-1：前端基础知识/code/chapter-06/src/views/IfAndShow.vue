<template>
  <div>
    <h1 v-if="showTitle">title</h1>
    <p v-show="showContent">content</p>
    <button @click="changeTitle">changeTitle</button>
    <button @click="changeContent">changeContent</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showTitle: false,
      showContent: false,
    };
  },
  methods:{
    changeTitle(){
      this.showTitle = !this.showTitle;
    },
    changeContent(){
      this.showContent = !this.showContent;
    }
  }
}
</script>

<style lang='scss' scoped>
</style>