<template>
    <p>Title {{titleRef}} <input v-model="titleRef"></p>
</template>

<script>
import useTitle from '../hooks/useTitle.js'

export default {
  name: 'TitleTest',
  setup() {
    const titleRef = useTitle()

    setTimeout(() => {
      titleRef.value = '新标题'
    }, 1000)

    return {
      titleRef
    }
  }
}
</script>