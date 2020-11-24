<template>
  <c-layout>
    <c-content>
      <div :class="$style.header">
        <div :class="$style.header__content">
          <ul :class="$style.nav">
            <li :class="$style.nav__li"></li>
            <li :class="$style.nav__li">1</li>
            <li :class="$style.nav__li">1</li>
            <li :class="$style.nav__li">1</li>
          </ul>
          <ul :class="$style.list">
            <li></li>
          </ul>
        </div>
      </div>
    </c-content>
    <c-footer>
      
    </c-footer>
  </c-layout>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" module>
.header {
  background: {
    image: url("../../assets/fastbuy-bg.png");
    repeat: no-repeat;
    position: top left;
  };
  padding: 24px;
  &__content {
    padding: 20px;
    background: yellow;
  }
}
</style>