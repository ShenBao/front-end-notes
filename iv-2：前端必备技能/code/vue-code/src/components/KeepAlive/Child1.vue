<template>
    <p>child1</p>
</template>

<script>
export default {
    name: 'Child1',
    created() {
        console.log('child1 created') // keep-alive 中只创建一次
    },
    activated() {
        console.log('child1 activated')
    },
    deactivated() {
        console.log('child1 deactivated')
    }
}
</script>
