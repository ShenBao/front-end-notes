import { ref, onMounted, watch } from 'vue'

function useTitle() {
    const titleRef = ref('')

    onMounted(() => {
        titleRef.value = document.title
    })

    // 监听 title 的修改
    watch(titleRef, (newVal, oldVal) => {
        if (newVal !== oldVal) {
            document.title = newVal
        }
    })

    return titleRef
}

export default useTitle
