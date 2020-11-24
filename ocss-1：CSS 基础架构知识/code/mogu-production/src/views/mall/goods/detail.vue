<template>
  <c-layout>
    
    <c-header>
      <c-launch></c-launch>
    </c-header>

    <c-content>

      <!-- 轮播广告位 -->
      <c-box-skin
        class="adsense"
        mb20 pt20>

        <c-button
          class="adsense__back"
          @click="goBack"
          circle bga4>
          <c-svg-left 
            size="30" 
            :colors="['#fff']"></c-svg-left>
        </c-button>

        <c-swipe>
          <c-swipe-item 
            class="adsense__img"
            v-for="(item, index) in goods['banners']"
            :key="index" 
            ph20>
            <img :src="item"/>
          </c-swipe-item>
        </c-swipe>

        <c-columns
          ph20 pt30 pb20>
          <div>
            <span>¥</span>
            <span class="adsense__price">{{ goods["price"] }}</span>
          </div>
          <div pl10>
            <div
              style="color: #999"
              decoration>{{ goods["oldprice"] }}</div>
            <div pt10>
              <span
                style="background: #fbe9ee"
                ph6 
                font-quaternary>{{ goods["discount"] }}</span>
            </div>
          </div>
        </c-columns>

        <div
          class="adsense__des"
          pl20
          ellipsis2 fz30>{{ goods["title"] }}</div>

        <c-columns 
          class="adsense__free"
          ph30>免邮费</c-columns>

      </c-box-skin>

      <!-- 服务项 -->
      <c-box-skin 
        pa20 mb20>
        <c-columns>
          <c-svg-check 
            size="18" 
            :colors="['#ea4c66','#fff','#ea4c66']"></c-svg-check>
          <span 
            mr20>72小时发货</span>
          <c-svg-check 
            size="18" 
            :colors="['#ea4c66','#fff','#ea4c66']"
            ml30></c-svg-check>
          <span
            mr30>7天无理由退货</span>
          <c-svg-check 
            size="18" 
            :colors="['#ea4c66','#fff','#ea4c66']"></c-svg-check>
          <span>延误必赔</span>
        </c-columns>
      </c-box-skin>

      <!-- 图文详情 -->
      <c-box-skin>
        <div 
          pa30
          fz30 font-quaternary>图文详情</div>
        <div 
          v-for="(item, index) in goods['picture']"
          :key="index">
          <img :src="item" />
        </div>
      </c-box-skin>

      <!-- 快捷导航 -->
      <c-fast-menu></c-fast-menu>

    </c-content>

  </c-layout>
</template>
<script>
import {getGoodsDetailById} from '@/api/mall';
import {useRoute, useRouter} from 'vue-router';
import {Swipe, SwipeItem} from '@/components/swipe';
import { onMounted, reactive, toRefs } from 'vue';
import Toast from 'vant/lib/toast';

export default {
  components: {
		CSwipe: Swipe,
		CSwipeItem: SwipeItem
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const data = reactive({
      goods: {} 
    })

    const goBack = ()=>{
      router.go(-1);
    }
    
    onMounted(res=>{
      const id = route.query.id || 0;

      Toast.loading({
				message: '加载中...',
				forbidClick: true
			});

      getGoodsDetailById({id}).then(res=>{
        data.goods = res.data;
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
@include b(adsense) {
  position: relative;
  @include e(back) {
    @include position(absolute, top 20px left 20px);
    @include dimensions(88px);
  }

  @include e(img) {
    @include dimensions(520px, 780px);
  }

  @include e(free) {
    height: 68px;
    color: #999;
  }

  @include e(price) {
    font-size: 72px;
  }

  @include e(des) {
    width: 516px;
  }
}
</style>