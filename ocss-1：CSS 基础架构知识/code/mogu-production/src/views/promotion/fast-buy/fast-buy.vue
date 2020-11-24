<template>
  <c-layout>

    <c-content class="content">

      <!-- 今日必抢 -->
      <div
        class="header"
        pa24>
        <c-magazine
          image="https://s10.mogucdn.com/mlcdn/c45406/201015_45l80j09ebiaki64i8d5309j1hg83_702x426.png"
          ph12 pv20
          radius6>
          <c-columns pb20>
            <span
              class="header__today"
              mr14
              font-tertiary>今日必抢</span>
            <c-button class="header__tips">一件也是批发价</c-button>
          </c-columns>

          <c-row 
            class="good"
            gutter="6">
            <c-col
              span="8"
              v-for="(item, index) in hotGoodList"
              :key="index">
              <c-box-skin radius4>
                <c-magazine
                  class="good__image"
                  :image="item['image']">
                  <c-button
                    class="good__number"
                    pv4 ph10
                    bga5 font-tertiary>{{ item['sell'] }}</c-button>
                </c-magazine>
                <div 
                  pa8
                  ellipsis1>{{ item['des'] }}</div>
                <c-columns pb20>
                  <div>
                    <div 
                      style="color: #ed2c48"
                      pl4><b>{{ item['price'] }}</b></div>
                    <div
                      style="color: #999; text-decoration: line-through;"
                      pl4>{{ item['oldprice'] }}</div>
                  </div>
                  <c-button
                    class="good__buy"
                    font-tertiary circle>抢</c-button>
                </c-columns>
              </c-box-skin>
            </c-col>
          </c-row>
        </c-magazine>
      </div>

      <!-- 时间轴 -->
      <c-magazine image="https://s10.mogucdn.com/mlcdn/c45406/201104_872b0le054e822e6hh4fcjf95fl92_750x117.png">
        <c-columns class="time">
          <c-button 
            class="time__container"
            v-for="(item, i) in time"
            :key="i">
            <b 
              class="time__t"
              :class="{'time__t--active': item['active']}">{{item["t"]}}</b>
            <c-button 
              class="time__status"
              :class="{'time__status--active': i == active}"
              @click="changeTime(i, item['t'])">{{item["status"]}}</c-button>
          </c-button>
        </c-columns>
      </c-magazine>
    
    
      <!-- 倒计时 -->
      <c-button class="count">
        <span pr8>——</span>
        <span pr8>距离本场活动开始还有</span>
        <c-button 
          class="count__time"
          bga10 radius2>{{hour}}</c-button>
        <span ph8>:</span>
        <c-button
          class="count__time"
          bga10 radius2>{{min}}</c-button>
        <span ph8>:</span>
        <c-button 
          class="count__time"
          bga10 radius2>{{second}}</c-button>
        <span pl8>——</span>
      </c-button>

      <!-- 商品 -->
      <c-goods :list="fastBuyGoods"></c-goods>

      <!-- 快捷导航 -->
      <c-fast-menu></c-fast-menu>

    </c-content>

    <c-footer>
      <c-foot-nav
        class="footer"
        :list="footerList"></c-foot-nav>
    </c-footer>
  </c-layout>
</template>
<script>
import {getHotGoods, getFastBuyGoods} from '@/api/promotion';
import { onMounted, reactive, toRefs } from 'vue';
import {useRouter} from 'vue-router';
import CGoods from './goods';
import Toast from 'vant/lib/toast';

export default {
  components: {
    CGoods
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      hotGoodList: [],
      hour: '',
      min: '',
      second: '',
      time: 10000000,
      active: 0,
      fastBuyGoods: []
    });
    let t = ''; 

    const timeDown = ()=> {
      const nowTime = new Date();
      const endTime = new Date();
      let leftTime = parseInt((endTime.getTime() + data.time - nowTime.getTime())/1000)
      let d = parseInt(leftTime/(24*60*60))
      let h = formate(parseInt(leftTime/(60*60)%24))
      let m = formate(parseInt(leftTime/60%60))
      let s = formate(parseInt(leftTime%60))
      data.hour = h;
      data.min = m;
      data.second = s;
    }

    const formate = (time)=> {
      if(time>=10){
        return time
      }else{
        return `0${time}`
      }
    }

    const changeTime = (i, t)=> {
      data.active = i;
      restart();
      getFastBuyGoods({time: t}).then((res)=>{
        data.fastBuyGoods = res.data;
      })
    }

    const start = ()=> {
      timeDown();
      t = setInterval(()=>{
        data.time -= 1000;
        timeDown()
      },1000)
    }

    const restart = ()=>{
      data.time = 10000000;
      clearInterval(t);
      start();
    }

    onMounted(()=>{
      
      Toast.loading({
				message: '加载中...',
				forbidClick: true
      });
      
      start();
      getHotGoods().then((res)=>{
        data.hotGoodList = res.data;
      })

      getFastBuyGoods({time: '00:00'}).then((res)=>{
        data.fastBuyGoods = res.data;
      })
    })

    const footerList = [
      {
				path: '/promotion/fast-buy',
				text: '限时快抢',
				active: true
			},{
				path: '/promotion/last-crazy',
				text: '即将售罄'
			},{
				path: '/promotion/my-reminder',
				text: '我的快抢'
			}
    ];

    const time = [
      {
        t: '00:00',
        status: '未开抢',
        active: true
      },{
        t: '03:00',
        status: '未开抢'
      },{
        t: '06:00',
        status: '未开抢'
      },{
        t: '09:00',
        status: '未开抢'
      },{
        t: '12:00',
        status: '未开抢'
      },{
        t: '15:00',
        status: '未开抢'
      },{
        t: '18:00',
        status: '未开抢'
      },{
        t: '21:00',
        status: '未开抢'
      },{
        t: '24:00',
        status: '未开抢'
      }
    ]

    return {
      ...toRefs(data),
      footerList,
      time,
      changeTime
    }
  }
}
</script>
<style lang="scss" scoped>
@include b(content) {
  padding-bottom: 100px;
}
@include b(header) {
  background: url("https://s10.mogucdn.com/mlcdn/c45406/201103_154d6c9b491c6d29af5l9a5487h6i_750x225.png") no-repeat top center / contain;
  @include e(today) {
    font-family: feichi;
    font-size: 40px;
  }

  @include e(tips) {
    @include dimensions(200px, 34px);
    border-radius: 30px 17px 17px 0/30px 17px 17px 0;
    background-color: #fff;
    color: #FF5777;
  }
}

@include b(good) {
  @include e(image) {
    height: 214px;
  }

  @include e(number) {
    @include position(absolute, bottom 10px left 0);
    border-radius: 0 0.5em 0.5em 0 / 0 0.5em 0.5em 0;
  }

  @include e(buy) {
    margin-left: 70px;
    @include dimensions(44px);
    background-image: linear-gradient(-154deg,#ff5d74,#ed2c48);
  }
}

@include b(time) {
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  @include e(container) {
    flex-direction: column;
    flex-shrink: 0;
    @include dimensions(160px, 110px);
    scroll-snap-align: center;
  }

  @include e(t) {
    font-size: 34px;
    opacity: 0.8;
    @include m(active) {
      opacity: 1;
    }
  }

  @include e(status) {
    @include dimensions(120px, 36px);
    border-radius: (36px/2);
    opacity: 0.8;
    @include m(active) {
      opacity: 1;
      background-image: linear-gradient(-126deg,#f7e6d4 7%,#fdd09f);
      color: #cd2123;
    }
  }
}

@include b(count) {
  height: 86px;
  color: #999;
  @include e(time) {
    @include dimensions(40px);
  }
}

@include b(footer) {
  height: 100px;
	font-size: 26px;
}
</style>