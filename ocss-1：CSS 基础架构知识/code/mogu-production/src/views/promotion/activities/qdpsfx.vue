<template>
  <c-layout>

    <c-header>
      <div>
        <img src="https://s10.mogucdn.com/mlcdn/c45406/201126_5j65f64jla43cdlg4gch7gf6ff971_750x500.jpg_999x999.v1c0.81.webp" />
      </div>

      <div>
        <img src="https://s10.mogucdn.com/mlcdn/c45406/201126_0e23e4gdhij2ah5fg3bald8f1hcbg_750x293.jpg_999x999.v1c0.81.webp" />
      </div>
    </c-header>

    <c-content>
      
      <c-button 
        class="title"
        fz46>
        <b>百搭帽子</b>
      </c-button>

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
                  <div class="goods__tag">暖冬价</div>
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
      
    </c-content>

  </c-layout>
</template>
<script>
import {getQdpsfxGoods} from "@/api/promotion"
import { onMounted, reactive, toRefs } from 'vue'
export default {
  setup() {
    const data = reactive({
      goodsList: []
    });

    onMounted(()=>{
      getQdpsfxGoods().then((res)=>{
        data.goodsList = res.data;
      })
    })

    return {
      ...toRefs(data)
    }
  }
}
</script>
<style lang="scss" scoped>
$qdpsfx-color: #f85757;
@include b(title) {
  height: 104px;
  background: #cfdbe3;
}

@include b(goods) {
  background: #cfdbe3;
  @include e(magazine) {
    @include dimensions(100%, 348px);
  }

  @include e(tag) {
    color: $qdpsfx-color;
    border: 1Px solid $qdpsfx-color;
  }

  @include e(btn) {
    height: 56px;
    background: $qdpsfx-color;
  }
}
</style>