<template>
    <p>child2</p>
</template>

<script>
export default {
    name: 'Child2',
    created() {
        console.log('child2 created') // keep-alive 中只创建一次
    },
    activated() {
        console.log('child2 activated')
    },
    deactivated() {
        console.log('child2 deactivated')
    }
}
</script>
