<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none">
    <path
      d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z"
      :fill="colors[1]"
      :stroke="colors[0]"
      stroke-width="4"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script>
export default {
  name: 'CSvgStar',
  props: {
    colors: Object,
    size: {
      type: String,
      default: '24'
    }
  }
}
</script>