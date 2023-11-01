<template>
    <Child></Child>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    name: 'AsyncComponent',
    components: {
        Child: defineAsyncComponent(() => import(/* webpackChunkName: "async-child" */ './Child.vue'))
    }
}
</script>
