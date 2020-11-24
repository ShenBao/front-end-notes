<template>
  <div class="c-fast-menu">
    
    <div 
      class="c-fast-menu__mask"
      v-if="show"
      bga7></div>
    
    <div class="c-fast-menu__box">
      
      <c-columns
        class="c-fast-menu__container"
        :class="{'c-fast-menu__container--home': show}"
        mt26 pr10>
        <c-button class="c-fast-menu__title">首页</c-button>
        <router-link to="/mall/home">
          <c-button 
            class="c-fast-menu__icon"
            bg-secondary circle>
            <c-svg-home :colors="['#696969', '#fff', '#696969', '#fff']"></c-svg-home>
          </c-button>
        </router-link>
      </c-columns>

      <c-columns
        class="c-fast-menu__container"
        :class="{'c-fast-menu__container--theme': show}"
        @click="showPop = !showPop"
        mt26 pr10>
        <c-button class="c-fast-menu__title">主题</c-button>
        <c-button                  
          class="c-fast-menu__icon"
          bg-secondary circle>
          <c-svg-theme :colors="['#696969', '#fff']"></c-svg-theme>
        </c-button>
      </c-columns>

      <c-button 
        class="c-fast-menu__btn"
        @click="show = !show"
        mt26
        circle bga7>
        快捷<br/>导航
      </c-button>
      <van-popup v-model:show="showPop" position="top">
        <c-row pv30>
          <c-col span="8">
            <c-button>
              <div
                class="c-fast-menu__theme c-fast-menu__theme--default"
                @click="changeTheme('default')"
                circle></div>
            </c-button>
          </c-col>
          <c-col span="8">
            <c-button>
              <div
                class="c-fast-menu__theme c-fast-menu__theme--warm"
                @click="changeTheme('warm')"
                circle></div>
            </c-button>
          </c-col>
          <c-col span="8">
            <c-button>
              <div
                class="c-fast-menu__theme c-fast-menu__theme--cool"
                @click="changeTheme('cool')"
                circle></div>
            </c-button>
          </c-col>
        </c-row>
      </van-popup>
    </div>
    
  </div>
</template>
<script>
import { reactive, toRefs, createApp } from 'vue';
import Popup from 'vant/lib/popup';
import 'vant/lib/popup/style';

export default {
  name: 'CFastMenu',
  components: {
    vanPopup: Popup
  },
  setup() {
    const data = reactive({
      show: false,
      showPop: false
    })

    const changeTheme = style => {
      let theme = '';
      if(style == 'default') {
        theme = 'default'
      }else if(style == 'warm'){
        theme = 'warm'
      }else{
        theme = 'cool'
      }
      data.show = !data.show;
      data.showPop = !data.showPop;
      window.document.documentElement.setAttribute(
        "data-theme",
        theme
      );
    }
    return {
      ...toRefs(data),
      changeTheme
    }
  }
}
</script>
<style lang="scss" scoped>
@include b(c-fast-menu){
  @include e(mask) {
    @include position(fixed, top 0 bottom 0 right 0 left 0);
    z-index: 20;
  }

  @include e(box) {
    @include position(fixed, bottom 120px right 20px);
    @include grid($flex-direction: column, $align-items: flex-end);
    z-index: 30;
  }

  @include e(container) {
    @include position(fixed, bottom 120px);
    opacity: 0;
    transition: all .3s;
    @include m(home) {
      @include position(fixed, bottom 340px right 20px);
      opacity: 1;
    }

    @include m(theme) {
      @include position(fixed, bottom 240px right 20px);
      opacity: 1;
    }
  }
 
  @include e(title) {
    @include dimensions(126px, 80px);
  }

  @include e(icon) {
    @include dimensions(80px);
  }

  @include e(btn) {
    position: relative;
    @include dimensions(100px);
  }

  @include e(theme) {
    @include dimensions(100px);

    @include m(default) {
      background: #FF5777;
    }

    @include m(cool) {
      background: #409EFF;
    }

    @include m(warm) {
      background: #F9CC03;
    }
  }
}
</style>
