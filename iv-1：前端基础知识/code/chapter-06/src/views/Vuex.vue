<template>
  <div class="vuex-demo">
    <h1>饿了吧</h1> 
    <ul>
      <li v-for="(shop,index) in list" :key="index">
        <span>{{shop.name}}</span>
        <span>{{shop.price}}</span>
        <span class="add-btn" @click="addShop(shop)">+</span>
      </li>
    </ul>  
    <p>
      <span class="total-price">总价格:{{totalPrice}}</span>
      <span>总优惠:{{discounts}}</span>
    </p> 
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  data(){
    return {
      list:[{
        id: 0, 
        name:"鱼香肉丝",
        price: 14,
      },{
        id: 1, 
        name: "糖醋里脊",
        price: 20,
      },{
        id:2, 
        name: "红烧排骨",
        price: 28,
      }]
    }
  },
  computed: {
    ...mapState({
      totalPrice: state => state.rootModule.totalPrice,
      discounts: state => state.rootModule.discounts
    })
  },
  methods:{
    addShop(shop){
      this.$store.dispatch('rootModule/addShop',shop)
    }
  }
}
</script>

<style lang='scss' scoped>
  .vuex-demo {
    h1{
      color:#000;
      font-size: 20px;
    }
    ul>li{
      list-style: none;
      margin-top: 20px;
    }
    .add-btn{
      display: inline-block;
      width:20px;
      height:20px;
      line-height: 20px;
      border: 1px solid #000;
      border-radius: 50%;
      cursor: pointer;
      margin-left: 20px;
    }
    .total-price {
      margin-right: 10px
    }
  }
</style>