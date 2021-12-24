import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const rootModule = {
  namespaced: true,
  state: {  
    totalPrice: 0,
    discounts: 0,
  },
  // 同步更改state状态
  mutations: {  
    // 计算总的价格
    increment(state,pyload){
      state.totalPrice += pyload.resPrice;
    },  
    // 计算总的优惠价格
    computDiscounts(state,pyload){
      state.discounts += pyload.discounts;
    }
  },
  // 处理异步数据请求
  actions: {
    addShop (context,data) {
      new Promise((resolve) => {
        const discountsList  = [2,4,6];
        resolve(discountsList)
      }).then(res=>{
        const discounts = res[data.id];
        const resPrice = data.price - discounts;
        context.commit('increment',{
          resPrice 
        })
        context.commit('computDiscounts',{
          discounts
        })
      })
    }
  }
}

export default new Vuex.Store({
  modules: {
    rootModule
  }
})
