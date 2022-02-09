<template>
    <button @click="toggle">切换</button>

    <keep-alive>
        <Child1 v-if="num === 1"></Child1>
        <Child2 v-else></Child2>
    </keep-alive>
</template>

<script>
import Child1 from './Child1'
import Child2 from './Child2.vue'

export default {
    components: { Child1, Child2 },
    data() {
        return {
            num: 1
        }
    },
    methods: {
        toggle() {
            if (this.num === 1) {
                this.num = 2
            } else {
                this.num = 1
            }
        }
    },
}
</script>
