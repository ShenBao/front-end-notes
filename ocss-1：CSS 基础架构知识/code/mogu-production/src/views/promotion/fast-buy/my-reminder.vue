<template>
  <c-layout>

    <c-content class="content" pt20>
      <c-goods :list="goodsList"></c-goods>
    </c-content>

    <c-footer>
      <c-foot-nav
        class="footer"
        :list="footerList"
        fz26></c-foot-nav>
    </c-footer>

  </c-layout>
  
</template>
<script>
import CGoods from './goods';
import {getPromotionGoods} from '@/api/promotion';
import {onMounted, reactive, toRefs} from 'vue';
import Toast from 'vant/lib/toast';

export default {
  components:{
    CGoods
  },
  setup() {
    const data = reactive({
      goodsList: []
    });
    const footerList = [
      {
				path: '/promotion/fast-buy',
				text: '限时快抢'
			},{
				path: '/promotion/last-crazy',
        text: '即将售罄',
			},{
				path: '/promotion/my-reminder',
				text: '我的快抢',
        active: true
			}
    ];

    onMounted(()=>{
      
      Toast.loading({
				message: '加载中...',
				forbidClick: true
      });

      getPromotionGoods({status: 'myreminder'}).then((res)=>{
        data.goodsList = res.data;
      })
    })

    return {
      ...toRefs(data),
      footerList
    }
  }
}
</script>
<style lang="scss" scoped>
@include b(content) {
  padding-bottom: 100px;
}
@include b(footer) {
  height: 100px;
}
</style>