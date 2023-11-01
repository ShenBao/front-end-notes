<template>
  <div class="AComponent">
    <h1>首页</h1>
    <ul @click="handleClick">
      <li>vue的生命周期你了解多少</li>
      <li>vue父子组件生命周期调用顺序你知道吗</li>
      <li>谈谈你对keep-alive的了解</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      color: "red"
    }
  },
  activated(){
    console.log(`Home - activated`)
  },
  deactivated(){
    console.log(`Home - deactivated`)
  },
  methods:{
    handleClick(event){
      const childNodes = event.target.parentNode.childNodes;
      childNodes.forEach(childNode=>{
        childNode.style.color = "";
      })
      event.target.style.color = this.color;
    }
  }
}
</script>
<style lang="scss">
  ul>li {
    list-style: none;
  }
</style>