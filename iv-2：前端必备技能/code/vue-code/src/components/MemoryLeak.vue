<template>
  <p>Memory Leak Demo</p>
</template>

<script>
export default {
  name: 'Memory Leak Demo',
  data() {
    return {
      arr: [10, 20, 30], // 数组 对象
    }
  },
  methods: {
    printArr() {
        console.log(this.arr)
    }
  },
  mounted() {
      window.addEventListener('resize', this.printArr)
      // 自定义事件也是这样
  },
  // Vue2 - beforeDestroy
  beforeUnmount() {
      window.removeEventListener('resize', this.printArr)
  },
}
</script>
