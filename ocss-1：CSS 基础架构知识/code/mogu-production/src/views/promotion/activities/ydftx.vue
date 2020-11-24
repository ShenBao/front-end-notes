<template>
  <c-layout>
    
    <c-header>
      <div>
        <img src="https://s10.mogucdn.com/mlcdn/c45406/201125_501jf1ibj4jel6h4e5kl35l1bii91_750x500.jpg_999x999.v1c0.81.webp"/>
      </div>
      <div>
        <img src="https://s10.mogucdn.com/mlcdn/c45406/201125_35ch7g48aga10hg71kjd4l0i736l7_750x370.jpg_999x999.v1c0.81.webp"/>
      </div>
    </c-header>
    
    <c-content>
      <!-- 热销爆款闭眼入 -->
      <div>
        <div>
          <img src="https://s10.mogucdn.com/mlcdn/c45406/201125_407g9jcka47f48bbf2i6i4dd36ia8_750x149.jpg_999x999.v1c0.81.webp" />
        </div>
        <div
          v-for="(item, index) in hotList"
          :key="index">
          <img 
            :src="item['image']" />
        </div>
      </div>

      <!-- 更多精选 -->
      <div>
        <div>
          <img src="https://s10.mogucdn.com/mlcdn/c45406/201125_38dc5be13j1f28ee24j49adc4ake1_750x146.jpg_999x999.v1c0.81.webp" />
        </div>

        <c-row 
          class="goods" 
          gutter="8"
          ph16 pt16>
          <c-col 
            span="12"
            v-for="(item, index) in goodsList"
            :key="index"
            mb16
            radius2>
            <c-box-skin>
              <router-link :to="'/mall/goods-detail?id='+item['id']">
                <c-magazine 
                  class="goods__magazine" 
                  :image="item['image']"></c-magazine>
                <div pa14>
                  <p
                    pv10
                    ellipsis1>{{ item["des"]}} </p>
                  <c-columns pb8>
                    <div class="goods__tag">活动价</div>
                    <span
                      fz32>{{ item['price'] }}</span>
                    <span 
                      decoration>{{ item['oldprice']}}</span>
                  </c-columns>
                  <c-button 
                    class="goods__btn"
                    radius2>立即购买</c-button>
                </div>
              </router-link>
            </c-box-skin>
          </c-col>
        </c-row>
      </div>
      
    </c-content>

  </c-layout>
</template>
<script>
import {getYdftxGoods} from "@/api/promotion"
import {onMounted, reactive, toRefs} from 'vue'
export default {
  setup() {
    const data = reactive({
      hotList: [],
      goodsList: []
    })
    
    onMounted(()=>{
      getYdftxGoods().then((res)=>{
        data.hotList = res.data.hot;
        data.goodsList = res.data.goods;
      })
    })

    return {
      ...toRefs(data)
    }
  }
}
</script>
<style lang="scss" scoped>
$ydftx-color: #5476AE;

@include b(goods) {
  background: #fce690;
  @include e(magazine) {
    @include dimensions(100%, 348px);
  }

  @include e(tag) {
    color: $ydftx-color;
    border: 1Px solid $ydftx-color;
  }

  @include e(btn) {
    height: 56px;
    background: $ydftx-color;
  }
}
</style>