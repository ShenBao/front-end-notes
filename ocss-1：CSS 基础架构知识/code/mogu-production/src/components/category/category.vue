<template>
  <c-layout
    class="c-category"
    v-if="isShow">

    <c-header class="header">
      <c-box-skin type="bottom">
        <c-columns class="header__container">
  
          <c-svg-left
            size="38"
            @click="hide"
            :colors="['#9c9c9c']"></c-svg-left>
          
          <input 
            class="header__input"
            v-model="des"
            pl10 
            radius6/>

          <span
            @click="search"
            ph16
            fz28 font-secondary
            >搜索</span>

        </c-columns>
      </c-box-skin>
    </c-header>

    <c-content>
      <c-box-skin class="c-category__content">
        <c-columns pa20>
          <c-svg-star 
            size="16" 
            :colors="['#999', '#fff']"
            mr6></c-svg-star>
          <span style="color: #999">热门搜索</span>
        </c-columns>

        <c-columns style="flex-wrap: wrap">
          <router-link
            v-for="(item, index) in categorys"
            :key="index"
            :to="'/mall/goods?id='+item['id']+'&des='+item['title']">
            <div
              class="c-category__goods"
              ph22 pv10 ml20 mb30
              font-secondary radius6>{{ item['title'] }}</div>
          </router-link>
        </c-columns>
        
      </c-box-skin>
    </c-content>

  </c-layout>
</template>
<script>
import {useRouter} from 'vue-router';
import {getHotCategorys, getGoodsId} from '@/api/mall.js';
import { onMounted, reactive, toRefs } from 'vue';
export default {
  name: 'CCategory',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const router = useRouter();
    const data = reactive({
      categorys: [],
      des: ''
    });

    const hide = ()=>{
      emit('update:isShow', !props.isShow);
    }

    const search = ()=> {
      getGoodsId({name: 0}).then((res)=>{
        const result = res.data;
        router.push({ path: '/mall/goods', query: { id: result['id'], des: data.des }})
      })
    }

    onMounted(()=>{
      getHotCategorys().then((res)=>{
        data.categorys = res.data;
      })
    })

    return {
      ...toRefs(data),
      hide,
      search
    }
  }
}
</script>
<style lang="scss" scoped>
@include b(c-category) {
  z-index: 9999;
  @include position(fixed, top 0 right 0 bottom 0 left 0);
  @include e(content) {
    height: calc(100vh - 90px);
  }

  @include e(goods) {
    border: 1px solid #f5f5f5;
  }
}

@include b(header) {
  @include e(container) {
    height: 90px;
  }

  @include e(input) {
    flex: 1;
    height: 50px;
    border: 1Px solid #aaa;
    &:focus {
      @include t-border;
    }
  }
}
</style>