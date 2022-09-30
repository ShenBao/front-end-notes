<template>
  <div>
    <p>心跳</p>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
export default {
  name: 'HeartBeat',
  setup() {
      const timerRef = ref(0)

      onMounted(() => {
          function fn() {
              console.log('hello')
              timerRef.value = setTimeout(fn, 1000) // “心跳”尽量避免用 setInterval 会有坑
          }
          timerRef.value = setTimeout(fn, 1000)
      })

      onBeforeUnmount(() => {
          console.log('destroy')
          clearTimeout(timerRef.value) // 组件销毁时，一定清除定时器
      })
  }
}
</script>
