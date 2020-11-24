<template>
  <svg :width="size" :height="size" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" fill="white" fill-opacity="0.01" />
    <path d="M7.94977 11.9498H39.9498" :stroke="colors[0]" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7.94977 23.9498H39.9498" :stroke="colors[0]" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7.94977 35.9498H39.9498" :stroke="colors[0]" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
<script>
export default {
  name: 'CSvgButton',
  props: {
    colors: Object,
    size: {
      type: String,
      default: '24'
    }
  }
}
</script>