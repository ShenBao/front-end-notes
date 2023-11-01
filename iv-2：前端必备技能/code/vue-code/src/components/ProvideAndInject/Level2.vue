<template>
    <p>Level2 {{info}}</p>
    <Level3></Level3>
</template>

<script>
import Level3 from './Level3'

export default {
    name: 'Level2',
    components: { Level3 },
    inject: ['info']
}
</script>