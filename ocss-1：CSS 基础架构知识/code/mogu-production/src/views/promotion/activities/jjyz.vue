<template>
  <c-layout>
    
    <c-header>
      <div>
        <img src="https://s10.mogucdn.com/mlcdn/c45406/201125_378c6h6k4ad7711g7hd76lhl49916_750x500.jpg_999x999.v1c0.81.webp"/>
      </div>
      <div>
        <img src="https://s10.mogucdn.com/mlcdn/c45406/201125_6c44kha5eb7iajag40ike1dg924g1_750x500.jpg_999x999.v1c0.81.webp"/>
      </div>
      <div>
        <img src="https://s10.mogucdn.com/mlcdn/c45406/201125_25ack97kc84jgj1gb2g8le2164lg4_750x226.jpg_999x999.v1c0.81.webp"/>
      </div>
    </c-header>
    
    <c-content>
      <!-- 官方推荐 -->
      <div>
        <div>
          <img src="https://s10.mogucdn.com/mlcdn/c45406/201125_70g97ce3jb909e7g0d92jd1ll91kg_750x123.jpg_999x999.v1c0.81.webp" />
        </div>
        <div
          v-for="(item, index) in hotList"
          :key="index"
          >
          <img 
            :src="item['image']" />
        </div>
      </div>

      <!-- 更多推荐 -->
      <div>
        <div>
          <img src="https://s10.mogucdn.com/mlcdn/c45406/201125_4fl96aeijf175ka3i776aih68kj2k_750x153.jpg_999x999.v1c0.81.webp" />
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
                    <div class="goods__tag">特惠精选</div>
                    <span fz32>{{ item['price'] }}</span>
                    <span decoration>{{ item['oldprice']}}</span>
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
import {getJjyzGoods} from "@/api/promotion"
import {onMounted, reactive, toRefs} from 'vue'
export default {
  setup() {
    const data = reactive({
      hotList: [],
      goodsList: []
    })
    
    onMounted(()=>{
      getJjyzGoods().then((res)=>{
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
$jjyz-color: #567C8F;

@include b(goods) {
  background: $jjyz-color;
  @include e(magazine) {
    @include dimensions(100%, 348px);
  }

  @include e(tag) {
    color: $jjyz-color;
    border: 1Px solid $jjyz-color;
  }

  @include e(btn) {
    height: 56px;
    background: $jjyz-color;
  }
}
</style>