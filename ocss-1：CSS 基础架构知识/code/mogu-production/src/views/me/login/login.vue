<template>
  
  <c-layout 
    class="page" 
    bg-secondary>
    
    <c-header>

      <c-box-skin type="bottom">
        <c-columns class="header">
          <c-svg-left
            @click="goBack" 
            size="30" 
            :colors="['#9c9c9c']"></c-svg-left>
          <c-button 
            class="header__title"
            fz36>密码登录</c-button>
        </c-columns>
      </c-box-skin>

    </c-header>
  
    <c-content class="login"> 
      
      <c-button>
        <img class="login__img" src="https://s10.mogucdn.com/mlcdn/c45406/190219_4ii32ja6gi9hdeb56k2487ce7eh24_60x60.png" />
      </c-button>

      <c-box-skin type="bottom">
        <input 
          class="login__input" 
          placeholder="账号：123"
          v-model="account"
          fz30/>
      </c-box-skin>

      <c-box-skin 
        type="bottom"
        mb30>
        <input 
          class="login__input" 
          placeholder="密码：123"
          v-model="password"
          fz30/>
      </c-box-skin>

      <c-button
        class="login__btn"
        @click="goLogin"
        circle bg-tertiary fz36>登录</c-button>

    </c-content>

  </c-layout>

</template>

<script>
import { reactive, toRefs } from 'vue';
import {useRouter} from 'vue-router';
import { useStore } from 'vuex';
import {login} from '@/api/me'
import Toast from 'vant/lib/toast';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const data = reactive({
      account: '',
      password: ''
    });
    
    const goBack = () => {
      router.go(-1);
    }
    const goLogin = () => {
      store.dispatch('login', {
        account: data.account,
        password: data.password
      }).then(()=>{
        Toast({
          message: "登录成功",
          onClose(){
            router.go(-1);
          }
        });
      })
    }

    return {
      ...toRefs(data),
      goBack,
      goLogin
    }
  }
}
</script>

<style lang="scss" scoped>
@include b(page) {
  height: 100vh;
}

@include b(header) {
  height: 88px;
  padding-right: 60px;
  @include e(title) {
    flex: 1;
    color: #333;
  }
}

@include b(login) {
  padding: 100px 50px 0;

  @include e(img) {
    @include dimensions(100px);
    margin-bottom: 50px;
  }
  @include e(input) {
    height: 100px;
  }
  @include e(btn) {
    margin-top: 60px;
    height: 100px;
  }
}
</style>