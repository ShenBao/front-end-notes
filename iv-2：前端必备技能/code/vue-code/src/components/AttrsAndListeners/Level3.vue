<template>
    <p>Level3</p>

    <HelloWorld msg="hello 尘墨" ref="hello1"/>
</template>

<script>
import HelloWorld from '../HelloWorld'

export default {
    name: 'Level3',
    components: { HelloWorld },
    props: ['x'],
    emits: ['getX'],
    inheritAttrs: false,
    data() {
        return {
        }
    },
    created() {
        // console.log('level3', Object.keys(this.$attrs)) // 是 props 和 emits 后补
    },
    mounted() {
        // console.log(this.$parent.getX())
        console.log(this.$refs.hello1.name)
    },
}
</script>