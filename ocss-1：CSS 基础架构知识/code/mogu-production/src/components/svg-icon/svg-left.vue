<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none">
    <path
      d="M31 36L19 24L31 12"
      :stroke="colors[0]"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script>
export default {
  name: 'CSvgLeft',
  props: {
    colors: Object,
    size: {
      type: String,
      default: '24'
    }
  }
}
</script>