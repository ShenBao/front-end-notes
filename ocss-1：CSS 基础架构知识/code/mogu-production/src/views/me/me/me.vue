<template>

  <c-layout>

    <c-header>
      <c-launch></c-launch>
    </c-header>

    <c-content class="user">
      
      <c-box-skin
        class="user__box"
        mh20 mb20>
        <c-avatar
          class="user__avatar" 
          :url="user['avatar']"
          :text="user['account']"
          direction="vertical"
          ></c-avatar>
      </c-box-skin>

      <c-button 
        class="user__logout"
        @click="logout"
        mh20
        fz30 radius4>退出登录</c-button>

    </c-content>

    <c-footer>
      <c-foot-nav 
        class="footer"
        :list="list" 
        fz32></c-foot-nav>
    </c-footer>

  </c-layout>

</template>
<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import {useRouter} from 'vue-router';
import Toast from 'vant/lib/toast';
import {getMe} from '@/api/me';
export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const list = [
			{
				path: '/mall/home',
				text: '首页',
			},{
				path: '/mall/store',
				text: '商城'
			},{
				path: '/live/home',
				text: '直播'
			},{
				path: '/me/me',
				text: '我',
				active: true
			}
    ];

    const user = computed(()=>{
      return store.state
    })

    const logout = ()=>{
      store.dispatch('logout');
      Toast({
        message: '已退出',
        onClose(){
          router.push('/mall/home');
        }
      });
    }

    onMounted(()=>{
      getMe();
    })

    return {
      list,
      user,
      logout
    }
  }
}
</script>
<style lang="scss" scoped>
@include b(footer) {
	height: 100px;
}

@include b(user) {
  padding-top: 90px;
  background: url('https://s10.mogucdn.com/mlcdn/c45406/190819_1j85g48lc84kk8deg00f66fk53dlc_750x229.png') no-repeat top center;
  background-size: 100%;

  @include e(box) {
    position: relative;
    border-radius: 12px;
    height: 200px;
  }

  @include e(avatar) {
    @include center-translate($direction: horizontal);
    top: -60px;
    @include dimensions(120px, auto);
    & ::v-deep img {
      border: 3Px solid #fff;
      margin-bottom: 30px;
    }
  }

  @include e(logout) {
    height: 80px;
    @include t-color-primary("background");
  }
}
</style>