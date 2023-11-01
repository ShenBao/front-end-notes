<template>
  <h1 @click="clickHandler">{{ msg }}</h1>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  emits: ['showMsg'], // Vue3
  data() {
    return {
      name: 'hello-world'
    }
  },
  methods: {
    clickHandler() {
      this.$emit('showMsg', 'hello world')
    }
  },
}
</script>
