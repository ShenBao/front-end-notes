<template>
    <p>Level1: <input v-model="name"></p>

    <Level2></Level2>
</template>

<script>
import { computed } from 'vue'
import Level2 from './Level2'

export default {
    name: 'Level1',
    components: { Level2 },
    data() {
        return {
            name: '尘墨'
        }
    },
    // provide: {
    //     info: 'aaa'
    // }
    provide() {
        return {
            info: computed(() => this.name)
        }
    }
}
</script>