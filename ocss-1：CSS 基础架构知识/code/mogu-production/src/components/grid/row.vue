<template>
  <div class="c-row">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CRow',
  props: {
    display: {
      type: String,
      default: 'flex',
    },
    flexDirection: [String],
    flexWrap: [String],
    flexFlow: [String],
    justifyContent: [String],
    alignItems: [String],
    alignContent: [String],
    gutter: String,
    gridType: {
      type: String,
      default: 'skeleton',
      validator: function (value) {
        return ['skeleton', 'margin-offset'].indexOf(value) !== -1
      }
    }
  },
  setup() {
    return {
      displaya: 'flex'
    }
  }
}
</script>
<style lang="scss" vars="{display, gutter, flexDirection, flexWrap, flexFlow, justifyContent, alignItems, alignContent, gridType}" scoped>
.c-row {
  @include grid(
    $display: var(--display), 
    $flex-direction: var(--flexDirection),
    $flex-wrap: var(--flexWrap),
    $flex-flow: var(--flexFlow),
    $justify-content: var(--justifyContent),
    $align-items: var(--alignItems),
    $align-content: var(--alignContent),
    $gutter: var(--gutter),
    $grid-type: var(--gridType)
  )
}
</style>