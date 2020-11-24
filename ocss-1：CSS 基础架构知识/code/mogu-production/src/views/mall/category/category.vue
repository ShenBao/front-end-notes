<template>
  <c-layout class="page">

    <c-header fixed>
      <c-box-skin type="bottom">
        <c-columns
          pv6 pl10 pr20>
          <c-svg-left
            @click="goBack"
            size="40"
            :colors="['#c0c0c0', '#fff', '#c0c0c0']"
            mr10
            ></c-svg-left>
          <c-search
            class="search"
            @click="isShow = !isShow"
            text="连衣裙"
            radius2></c-search>
        </c-columns>
      </c-box-skin>
    </c-header>
    
    <c-layout
      class="content"
      horizontal>
      <c-aside class="category">
        <c-button
          class="category__item"
          :class="{'category__item--active': activeIndex == index}"
          v-for="(item, index) in categorys"
          :key="index"
          @click="changeCategory(index, item['id'])">{{item['title']}}</c-button>
      </c-aside>
      <c-content>
        <c-box-skin style="height: 100%; overflow: auto">
          <c-row>
            <c-col
              v-for="(item, index) in oneCategory"
              :key="index"
              span="8">
              <router-link :to="'/mall/goods?id='+item['id']+'&des='+item['des']">
                <c-avatar
                  class="good"
                  :url="item['image']" 
                  :text="item['des']" 
                  direction="vertical"></c-avatar>
              </router-link>  
            </c-col>
          </c-row>
        </c-box-skin>

        <!-- category 页面 -->
			  <c-category v-model:isShow="isShow"></c-category>
      </c-content>
    </c-layout>
    
  </c-layout>
</template>
<script>
import {onMounted, reactive, toRefs} from "vue";
import {getCategorys, getOneCategory} from "@/api/mall";
import col from '../../../components/grid/col.vue';
import Avatar from '../../../components/avatar/avatar.vue';
import {useRouter} from 'vue-router';

export default {
  components: { col, Avatar },
  setup(){
    const router = useRouter();
    const data = reactive({
      categorys: '',
      oneCategory: '',
      activeIndex: '',
      isShow: false
    });

    const changeCategory = (index, id) => {
      data.activeIndex = index;
      getOneCategory({id}).then(res=>{
        data.oneCategory = res.data;
      })
    }

    const goBack = () => {
      router.go(-1);
    }
    
    onMounted(() => {
      changeCategory(0, 0);

      getCategorys().then((res)=>{
        data.categorys = res.data;
      })
    })
    
    return {
      ...toRefs(data),
      changeCategory,
      goBack
    }
  }
}
</script>
<style lang="scss" scoped>
@include b(page) {
  padding-top: 92px;
}

@include b(search) {
  flex: 1;
  height: 60px;
  & ::v-deep svg {
    margin: 0 10px;
  }
}

@include b(content) {
  height: calc(100vh - 90px);
}

@include b(category) {
  @include e(item) {
    @include dimensions(180px, 90px);
    color: $color-text-secondary;

    @include m(active) {
      background: #fff;
    }
  }
}

@include b(good) {
  padding-top: 42px;
  & ::v-deep img {
    padding-bottom: 20px;
    border-radius: 0;
    @include dimensions(130px);
  }
}
</style>