<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none">
    <path
      d="M9 18V42H39V18L24 6L9 18Z"
      :fill="colors[1]"
    />
    <path
      d="M9 42V18L4 22L24 6L44 22L39 18V42H9Z"
      :stroke="colors[0]"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19 29V42H29V29H19Z"
      :fill="colors[3]"
      :stroke="colors[2]"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <path
      d="M9 42H39"
      :stroke="colors[0]"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>
<script>
export default {
  name: 'CSvgHome',
  props: {
    colors: Object,
    size: {
      type: String,
      default: '24'
    }
  }
}
</script>