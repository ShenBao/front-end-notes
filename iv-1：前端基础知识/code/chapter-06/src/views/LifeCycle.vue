<template>
  <div class="home" ref="container">
    <p> {{ fullName }} </p>
    <button @click="handleClick">change data</button>
  </div>
</template>

<script>
export default {
  name: 'LifeCycle',
  data(){
    return {
      fullName: 'freemen'
    }
  },
  // 创建阶段
  beforeCreate(){
    // 实例刚在内存中创建出来，还没有初始化 data和 methods
    console.log(`beforeCreate`)
    console.log(`this.fullName`, this.fullName)
    console.log(`this.handleClick`, this.handleClick)
  },
  created(){
    // 实例已经在内存中创建完成，此时data和methods已经创建完成
    console.log(`created`)
    console.log(`this.fullName`, this.fullName)
    console.log(`this.handleClick`, this.handleClick)
  },
  beforeMount(){
    // 此时已经完成了模版的编译，只是还没有渲染到界面中去
    console.log(`beforeMount`)
    console.log(`this.$refs`, this.$refs.container)
  },
  mounted(){
    // 模版已经渲染到了浏览器，创建阶段结束，即将进入运行阶段
    console.log(`mounted`)
    console.log(`this.$refs`, this.$refs.container)
  }, 
  // 运行阶段
  beforeUpdate(){
    // 数据更新时调用,这里适合在更新之前访问现有的DOM
    console.log(`beforeUpdate`);
    console.log(`this.fullName `, this.fullName)
  },
  updated(){
    // 页面重新渲染完毕，页面中的数据和data保持一致
    console.log(`updated`)
    console.log(`更新结束，页面数据已更新`)
  },
  // 销毁阶段
  beforeDestroy(){
    // 实例销毁之前调用。在这一步，实例仍然完全可用。
    console.log(`beforeDestroy`)  
  },
  destroyed(){
    // 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。
    console.log(`destroyed`)  
  },  
  methods: {
    handleClick() {
      console.log(`this.fullName`, this.fullName)
      this.fullName = 'hello:' + this.fullName;
    }
  }
}
</script>
