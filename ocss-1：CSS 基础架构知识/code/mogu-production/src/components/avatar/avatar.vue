<template>
  <div 
    class="c-avatar"
    :class="{'c-avatar--vertical': direction === 'vertical'}">
    <img
      class="c-avatar__img"
      :src="url"
      circle/>
    <span
      :class="{'c-avatar__span--vertical': direction === 'vertical'}"
      class="c-avatar__span" 
      :style="'fontSize:'+size">
      {{ text }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'CAvatar',
  props: {
    direction: {
      validator(value){
        return ['horizontal', 'vertical'].indexOf(value) !== -1;
      }
    },
    url: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 12
    },
    text: [String]
  }
}
</script>
<style lang="scss" scoped>
@include b(c-avatar) {
  @include box-center($align: center);
  @include m(vertical) {
    flex-direction: column;
  }

  @include e(span) {
    @include box-clamp(1);
    @include m(vertical){
      text-align: center;
    }
  }
}
</style>