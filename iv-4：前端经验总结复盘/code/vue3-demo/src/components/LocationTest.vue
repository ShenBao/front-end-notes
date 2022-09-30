<template>
    <p>location test</p>

    <div v-if="isLoading">loading</div>
    <div v-else>
        <div v-if="errMsg">{{errMsg}}</div>
        <div v-else>{{JSON.stringify(data)}}</div>
    </div>
</template>

<script>
import useLocation from '../hooks/useLocation.js'

export default {
  name: 'LocationTest',
  setup() {
    const { isLoading, data, errMsg } = useLocation()

    return {
        isLoading,
        data,
        errMsg
    }
  }
}
</script>