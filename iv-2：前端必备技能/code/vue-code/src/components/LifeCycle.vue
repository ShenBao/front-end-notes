<template>
    <p>life cycle demo</p>
    <ul>
        <li v-for="(index, num) in nums" :key="index">{{num}}</li>
    </ul>
</template>

<script>
export default {
    name: 'LifeCycleDemo',
    data() {
        return {
            nums: [10, 20, 30]
        }
    },
    methods: {
        getNums() {
            return this.nums
        }
    },
    beforeCreate() {
        console.info('-----beforeCreate-----')
        console.info('nums', this.nums)
        console.info('getNums', this.getNums)
    },
    created() {
        console.info('-----created-----')
        console.info('nums', this.nums)
        console.info('getNums', this.getNums)
    },
    beforeMount() {
        console.info('-----beforeMount-----')
        console.info('$el', this.$el)
    },
    mounted() {
        console.info('-----mounted-----')
        console.info('$el', this.$el)
    },
}
</script>