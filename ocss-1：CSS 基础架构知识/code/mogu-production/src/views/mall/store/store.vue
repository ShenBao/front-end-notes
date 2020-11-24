<template>
	<c-layout>
		<c-header>
			<c-launch></c-launch>
			<c-box-skin type="bottom">
				<c-columns>
					<router-link to="/mall/category">
						<c-svg-button
							size="30" 
							:colors="['#c0c0c0']"
							ml30 mr20></c-svg-button>
					</router-link>
					<c-search 
						class="search"
						@click="isShow = !isShow"
						text="睡衣"
						mt15 mb15 mr20
						radius4></c-search>
					<c-svg-more
						@click="goChat"
						size="24"
						:colors="['#c0c0c0', '#fff', '#c0c0c0']"></c-svg-more>
				</c-columns>
			</c-box-skin>
		</c-header>
		
    <c-content>

      <c-box-skin>

        <!-- 促销活动 -->
        <c-row
          gutter="10"
          ph12 pv18>
          <c-col
            v-for="(item, index) in promotionList"
            :key="index"
            span="6">
            <router-link :to="item['path']">
              <c-magazine
                class="promotion"
                :image="item['image']"
                radius4>
                <div class="promotion__span">{{ item['title'] }}</div>
              </c-magazine>
            </router-link>
          </c-col>
        </c-row>

        <!-- 导航栏 -->
				<c-row
					class="nav"
					pb6>
					<c-col
						v-for="(item, index) in categoryList"
						:key="index"
						span="4-8">
						<c-avatar
							class="nav__item"
							@click="goGoods(item['id'], item['title'])"
							direction="vertical"
							:url="item['image']"
							:text="item['title']"
							pv10></c-avatar>
					</c-col>	
				</c-row>
			</c-box-skin>
      
			<!-- 商品列表 -->
			<c-row
				class="good"
				gutter="6"
				pa12>
				<c-col span="12">
					<router-link
						v-for="(item, index) in brandList[0]['list']"
						:key="index" 
						:to="{path: '/mall/brand-video', query: { id: item['id'] }}">
						<c-box-skin
							class="good__item"
							mb12
							radius4>
							<img
								class="good__img"
								:src="item['image']" />
							<div
								class="good__box"
								pv24 ph12>
								<p
									class="good__des"
									mb10>
									{{ item['des'] }}
								</p>
								<c-avatar
									class="good__avatar"
									:url="item['avatarImage']"
									:text="item['avatarDes']"
									></c-avatar>
							</div>
						</c-box-skin>
					</router-link>
				</c-col>
				<c-col span="12">
					<router-link
						v-for="(item, index) in brandList[1]['list']"
						:key="index" 
						:to="{path: '/mall/brand-video', query: { id: item['id'] }}">
						<c-box-skin
							class="good__item"
							mb12
							radius4>
							<img
								class="good__img"
								:src="item['image']" />
							<div
								class="good__box"
								pv24 ph12>
								<p	
									class="good__des"
									mb10>
									{{ item['des'] }}
								</p>
								<c-avatar
									class="good__avatar"
									:url="item['avatarImage']"
									:text="item['avatarDes']"
									></c-avatar>
							</div>
						</c-box-skin>
					</router-link>
				</c-col>
			</c-row>

			<!-- category 页面 -->
			<c-category v-model:isShow="isShow"></c-category>

		</c-content>
		
    <c-footer>
			<c-foot-nav
				class="footer"
				:list="list"></c-foot-nav>
		</c-footer>
	</c-layout>
</template>
<script>
import CAvatar from '@/components/avatar';
import {Swipe, SwipeItem} from '@/components/swipe';
import { onMounted, reactive, toRefs } from 'vue';
import {getRecommendatoryCategorys, getBanners, getBrandVideos, getPromotions} from '@/api/mall';
import {getChats} from '@/api/me';
import {useRouter} from 'vue-router';
import Toast from 'vant/lib/toast';

export default {
	components: {
		CAvatar,
		CSwipe: Swipe,
		CSwipeItem: SwipeItem
	},
	setup() {
		const data = reactive({
			isShow: false,
			categoryList: [],
			swipeList: [],
			brandList: [
				{list:[]},
				{list:[]}
			],
			promotionList: []
    })

		const router = useRouter();

		const goGoods = (id, title)=>{
			router.push({ path: '/mall/goods', query: { id: id, des: title }})
		}

		const goChat = ()=>{
			getChats().then(res=>{
				Toast(res.data);
			})
		}
		
		onMounted(()=>{

			Toast.loading({
				message: '加载中...',
				forbidClick: true
			});

			getPromotions().then((res)=>{
				data.promotionList = res.data;
			})
			
			getRecommendatoryCategorys().then((res)=>{
				data.categoryList = res.data;
			})

			getBanners().then((res)=>{
				data.swipeList = res.data;
			})

			getBrandVideos().then((res)=>{
				data.brandList = res.data;
			})

		})

		const list = [
			{
				path: '/mall/home',
				text: '首页',
			},{
				path: '/mall/store',
				text: '商城',
				active: true
			},{
				path: '/live/home',
				text: '直播'
			},{
				path: '/me/me',
				text: '我'
			}
    ];

		return {
			...toRefs(data),
			list,
			goGoods,
			goChat
		}
	}
}
</script>
<style lang="scss" scoped>
@include b(search) {
	@include dimensions(530px, 60px);
	@include t-shadow;
	& ::v-deep svg {
		margin-left: 20px;
		margin-right: 10px;
	}
}

@include b(swipe) {
	@include e(img) {
		@include dimensions(100%, auto);
	}
}

@include b(promotion) {
  @include dimensions(165px);
  text-align: center;
  color: #fff;
  @include e(span) {
    padding-top: 120px;
    font-size: 28px;
  }
}

@include b(nav) {
	& ::v-deep .van-col--4-8 {
		width: 20%;
	}
	@include e(item) {
		& ::v-deep img {
			padding-bottom: 10px;
			@include dimensions(100px);
		}
	}
}

@include b(good) {
	@include e(item) {
		overflow: hidden;
	}
	@include e(des) {
		@include box-clamp(2);
	}
	@include e(avatar) {
		max-width: 348px;
		& ::v-deep img{
			@include dimensions(50px);
			padding-right: 10px;
		}
		& ::v-deep span {
			font-weight: 700;
		}
	}
}

@include b(footer) {
	height: 100px;
	font-size: 32px;
}
</style>