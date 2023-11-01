<template>
  <div class="hello">
    <p id="p1">{{msg}}</p>
    <ul id="ul1">
      <li v-for="(num) in list" :key="num">{{num}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      list: [10, 20, 30]
    }
  },
  mounted() {
    const p1 = document.getElementById('p1')
    console.log('p1 html', p1.innerHTML)

    const ul1 = document.getElementById('ul1')
    console.log('ul1 html 1', ul1.innerHTML)

    setTimeout(() => {
      this.list.push(40)
    }, 1500)
  },
  updated() {
    const ul1 = document.getElementById('ul1')
    console.log('ul1 html 2', ul1.innerHTML)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
