<template>
    <p>watch and computed</p>
    <p>姓名：<input v-model="name"> 城市：<input v-model="city"></p>
    <p>个人信息：{{userInfo}}</p>
</template>

<script>
export default {
    data() {
        return {
            name: '尘墨',
            city: '北京'
        }
    },
    watch: {
        name(newValue, oldValue) {
            console.log('watch name', newValue, oldValue)
        }
    },
    computed: {
        userInfo() {
            // 有缓存
            return this.name + this.city
        }
    },
    methods: {
        getUserInfo() {
            // 无缓存
            return this.name + this.city
        }
    },
}
</script>