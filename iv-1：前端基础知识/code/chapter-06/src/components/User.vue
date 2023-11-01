<template>
  <div class="BComponent">
    <h1>个人中心</h1>
  </div>
</template>

<script>
export default {
  name: 'User',
  activated(){
    console.log(`User - activated`)
  },
  deactivated(){
    console.log(`User - deactivated`)
  }
}
</script>
