<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none">
    <path
      d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z"
      :fill="colors[1]"
      :stroke="colors[0]"
      stroke-width="4"
      stroke-linejoin="round"
    />
    <path
      d="M26.6568 14.3431C25.2091 12.8954 23.2091 12 21 12C18.7909 12 16.7909 12.8954 15.3431 14.3431"
      :stroke="colors[2]"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M33.2218 33.2218L41.7071 41.7071"
      :stroke="colors[0]"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script>
export default {
  name: 'CSvgSearch',
  props: {
    colors: Object,
    size: {
      type: String,
      default: '24'
    }
  }
}
</script>