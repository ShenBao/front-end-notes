<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none"
  >
    <path
      d="M26 6H42V22"
      :stroke="colors[0]"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M42 29.4737V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39V9C6 7.34315 7.34315 6 9 6L18 6"
      :stroke="colors[0]"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M25.8 22.2L41.1 6.89999"
      :stroke="colors[0]"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script>
export default {
  name: 'CSvgShare',
  props: {
    colors: Object,
    size: {
      type: String,
      default: '24'
    }
  }
}
</script>