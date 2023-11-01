<template>
  <p>receive custom event</p>
</template>

<script>
import event from '../utils/event.js'

export default {
  name: 'CustomEvent1',
  methods: {
    showMsg(msg) {
      console.log(msg)
    }
  },
  mounted() {
    event.on('showMsg', this.showMsg)
  },
  // Vue2.x beforeDestroy
  beforeUnmount() {
    event.off('showMsg', this.showMsg)
  },
}
</script>
