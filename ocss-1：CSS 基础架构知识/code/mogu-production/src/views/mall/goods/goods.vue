<template>
  <c-layout>
    
    <c-header class="header" fixed>
      <c-box-skin type="bottom">
        <c-columns>
          <c-svg-left
            @click="goBack"
            size="30"
            :colors="['#9c9c9c']"
            pl20></c-svg-left>
          <c-button 
            class="header__title"
            fz30>{{ title }}</c-button>
        </c-columns>
      </c-box-skin>
    </c-header>

    <c-content class="goods">
      <c-row gutter="8" ph16>
        <c-col
          v-for="(item, index) in list"
          :key="index"
          span="12"
          mb16
          radius4>
          <c-box-skin>
            <router-link :to="'/mall/goods-detail?id='+item['id']">
              <c-magazine 
                class="goods__magazine" 
                :image="item['image']"></c-magazine>
              <div
                ml14 mr14 mt16 mb22
                ellipsis2>{{ item['des'] }}</div>
              <c-columns 
                style="justify-content: space-between;"
                ph14 pb12>
                <b>{{ item['price'] }}</b>
                <c-button 
                  style="color:#999">
                  <span>{{ item['collect'] }}</span>
                  <c-svg-star size="16" :colors="['#e8e8e8', '#fff']"></c-svg-star>
                </c-button>
              </c-columns>
            </router-link>
          </c-box-skin>
        </c-col>
      </c-row>

      <!-- 快捷导航 -->
			<c-fast-menu></c-fast-menu>
      
    </c-content>

  </c-layout>
</template>
<script>
import {getCategoryGoods} from '@/api/mall.js';
import {useRoute, useRouter} from 'vue-router';
import { onMounted, reactive, toRefs } from 'vue';
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const data = reactive({
      title: '',
      list: []
    });

    const goBack = () => {
      router.go(-1);
    }
    
    onMounted(()=>{
      const id = route.query.id || 0;
      data.title = route.query.des || '';
      getCategoryGoods({id}).then(res=>{
        data.list = res.data;
      })
    })

    return {
      ...toRefs(data),
      goBack
    }
  }
}
</script>
<style lang="scss" scoped>
@include b(header) {
  @include e(title) {
    @include dimensions(590px, 88px);
    color: #5E5E5E;
  }
}

@include b(goods) {
  padding-top: 100px;
  @include e(magazine) {
    height: 470px;
  }
}
</style>