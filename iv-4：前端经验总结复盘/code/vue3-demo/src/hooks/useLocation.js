import { reactive, onMounted, toRefs } from 'vue'

// 模拟异步获取
function getLocation(fail) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (fail) {
                // 模拟失败
                resolve({ errno: 1, msg: fail })
            } else {
                // 模拟成功
                resolve({ errno: 0, data: { x: 100, y: 200 } })
            }
        }, 1000)
    })
}

function useLocation() {
    const info = reactive({
        isLoading: true,
        data: {},
        errMsg: ''
    })

    onMounted(async () => {
        const res = await getLocation() // 成功
        // const res = await getLocation('失败信息') // 失败
        if (res.errno === 0) {
            info.data = res.data
        } else {
            info.errMsg = res.msg
        }
        info.isLoading = false
    })

    return toRefs(info)
}

export default useLocation
