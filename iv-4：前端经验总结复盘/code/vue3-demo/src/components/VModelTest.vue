<template>
    <p> v-model test <input :value="modelValue" @input="inputHandler"> </p>
</template>

<script>
export default {
    name: 'VModelTest',
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    setup(props, context) {
        console.log('props', props) // 避免 props unUsed 报错

        function inputHandler(e) {
            context.emit('update:modelValue', e.target.value)
        }

        return {
            inputHandler
        }
    },
}
</script>