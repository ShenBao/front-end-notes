<template>
  <c-box-skin
    type="bottom">
    <c-columns class="c-launch">
      <img
        class="c-launch__logo"
        src="https://s10.mogucdn.com/mlcdn/c45406/190219_4ii32ja6gi9hdeb56k2487ce7eh24_60x60.png"
        ml30 mr20/>
      <div class="c-launch__download">
        <span
          style="color: #000"
          mb10>蘑菇街  总有高手帮你挑</span>
        <c-columns>
          <c-svg-star
            size="9"
            :colors="['#f3ad4a', '#f3ad4a']"
            mr6></c-svg-star>
          <c-svg-star
            size="9"
            :colors="['#f3ad4a', '#f3ad4a']"
            mr6></c-svg-star>
          <c-svg-star
            size="9"
            :colors="['#f3ad4a', '#f3ad4a']"
            mr6></c-svg-star>
          <c-svg-star
            size="9"
            :colors="['#f3ad4a', '#f3ad4a']"
            mr6></c-svg-star>
            <c-svg-star
            size="9"
            :colors="['#f3ad4a', '#f3ad4a']"></c-svg-star>
          <span
            style="color: #8e8e92"
            ml20>超过2亿用户已下载</span>
        </c-columns>
      </div>
      <c-button
        class="c-launch__button"
        @click="goAppStore"
        radius4>打开APP</c-button>
    </c-columns>
  </c-box-skin>
</template>
<script>
import {isAndroid, isIOS} from '@/utils/tools';
export default {
  name: 'CLaunch',
  setup() {
    const goAppStore = ()=>{
      if(isAndroid) {
        location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.mogujie&ckey=CK1420464319516&acm=3.mce.1_10_1lmzu.134879.0.8GeF8sh7WvWu5.pos_870-m_504761-sd_119';
      } else if(isIOS) {
        location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.mogujie&ckey=CK1420464319516&acm=3.mce.1_10_1lmzu.134879.0.8GeF8sh7WvWu5.pos_870-m_504761-sd_119';
      }
    }

    return {
      goAppStore
    }
  }
}
</script>
<style lang="scss" scoped>
@include b(c-launch) {
  height: 94px;
  @include e(logo) {
    @include dimensions(60px);
  }

  @include e(download) {
    @include grid($flex-direction: column);
  }

  @include e(button) {
    @include dimensions(150px, 50px);
    @include t-color-primary("background");
    margin-left: 120px;
  }
}
</style>