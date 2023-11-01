<template>
  <p><button @click="trigger">trigger custom event</button></p>
</template>

<script>
import event from '../utils/event.js'

export default {
  name: 'CustomEvent2',
  methods: {
    trigger() {
      event.emit('showMsg', 'hello custom event')
    }
  },
}
</script>
