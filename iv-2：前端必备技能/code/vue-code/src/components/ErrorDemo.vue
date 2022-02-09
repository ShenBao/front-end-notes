<template>
    <p>error demo</p>
    <button @click="clickHandler">error</button>
</template>

<script>
export default {
    name: 'ErrorDemo',
    data() {
        return {
            num: 100
        }
    },
    methods: {
        clickHandler() {
            // try {
            //     this.num() // 报错
            // } catch (ex) {
            //     console.error('catch.....', ex)
            //     // try...catch 捕获的 error ，无法被 window.onerror 监听到
            // }

            this.num() // 报错
        }
    },
    mounted() {
        // throw new Error('mounted 报错')

        // setTimeout(() => {
        //     throw new Error('setTimeout 报错')
        // }, 1000)
    },
}
</script>