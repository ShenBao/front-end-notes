<template>
  <div class="c-col">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "CCol",
  props: {
    col: {
      type: [String, Number],
      validator: function (value) {
        return ['initial', 'auto', 'equal', 'none', 'breakpoint'].indexOf(value) !== -1
      }
    },
    gridColumns: {
      type: [Number],
      default: 12
    },
    colOffset: String,
    gutter: {
      type: [String, Object],
      default: '30px'
    },
    condensed: {
      type: Boolean,
      default: false
    },
    alignSelf: {
      type: String,
      validator: function (value) {
        return ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'].indexOf(value) !== -1
      }
    },
    flexGrow: {
      type: Number,
      default: 0
    },
    flexShrink: {
      type: Number,
      default: 1
    },
    flexBasis: {
      type: Number,
      default: 'auto'
    },
    order: Number,
    gridType: {
      type: String,
      default: 'skeleton',
      validator: function (value) {
        return ['skeleton', 'margin-offset'].indexOf(value) !== -1
      }
    },
    lastChild: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      a: 10
    }
  }
}
</script>
<style lang="scss" vars="{col, gridColumns, colOffset, gutter, condensed, alignSelf, flexGrow, flexShrink, flexBasis, order, gridType, lastChild}" scoped>
.c-col {
  @include grid-col(
		$col: var(--col),
		$grid-columns: var(--gridColumns),
    $col-offset: var(--colOffset),
		$gutter: var(--gutter),
		$condensed: var(--condensed),
		$align-self: var(--alignSelf),
		$flex-grow: var(--flexGrow),
		$flex-shrink: var(--flexShrink),
		$flex-basis: var(--flexBasis),
		$order: var(--order),
		$grid-type: var(--gridType),
		$last-child: var(--lastChild)
	)
}
</style>