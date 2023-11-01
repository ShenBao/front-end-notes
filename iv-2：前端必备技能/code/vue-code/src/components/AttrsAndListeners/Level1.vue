<template>
    <p>Level1</p>
    <Level2
        :a="a"
        :b="b"
        :c="c"
        @getA="getA" 
        @getB="getB"
        @getC="getC"
    ></Level2>
</template>

<script>
import Level2 from './Level2'

export default {
    name: 'Level1',
    components: { Level2 },
    data() {
        return {
            a: 'aaa',
            b: 'bbb',
            c: 'ccc'
        }
    },
    methods: {
        getA() {
            return this.a
        },
        getB() {
            return this.b
        },
        getC() {
            return this.c
        }
    }
}
</script>