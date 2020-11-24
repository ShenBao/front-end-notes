<template>
  <c-box-skin
    v-for="(item, index) in list"
    :key="index"
    mh24 mb18
    radius6>
    <c-columns class="store">
      <c-magazine
        class="store__image"
        :image="item['image']"></c-magazine>
      <div 
        class="store__box"
        pv24 ph18>
        <div 
          class="store__title"
          pb30
          ellipsis1>{{ item['title'] }}</div>
      <c-columns>
        <div 
          class="store__progress"
          mr10></div>
        <span>剩余{{ item['progress'] }}件</span>
      </c-columns>
      <c-columns>
        <div>
          <div 
            class="store__price"
            pb8 pt20>
            <b>¥</b>
            {{ item['price'] }}
            <span>¥{{ item['oldprice'] }}</span>
          </div>
          <div style="color: #999">{{ item['tips'] }}</div>
        </div>
        <c-button class="store__buy">立即购买</c-button>
      </c-columns>
      </div>
    </c-columns>
  </c-box-skin>
</template>
<script>
export default {
  name: 'CGoods',
  props: {
    list: Array
  }
}
</script>
<style lang="scss" scoped>
@include b(store) {
  align-items: stretch;
  @include e(image) {
    @include dimensions(246px);
  }

  @include e(box) {
    flex: 1;
  }

  @include e(title) {
    font-size: 28px;
  }

  @include e(progress) {
    @include dimensions(280px, 28px);
    border-radius: (28px/2);
    background-color: #ffd9de;
  }

  @include e(buy) {
    @include dimensions(182px, 54px);
    border-radius: (54px/2);
    background-color: #e95160;
  }

  @include e(price) {
    width: 250px;
    font-size: 40px;
    color: #ed2c48;
    b, span {
      font-size: 26px;
    }
    span {
      color: #999;
    }
  }
}
</style>