<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  mounted() {
    window.onerror = function (msg, source, line, column, error) {
      console.info('window.onerror----', msg, source, line, column, error)
    }
    // window.addEventListener('error', event => {
    //   console.info('window error', event)
    // })
  },
  errorCaptured: (err, vm, info) => {
    console.info('errorCaptured----', err, vm, info)
    // return false
  },
}
</script>
