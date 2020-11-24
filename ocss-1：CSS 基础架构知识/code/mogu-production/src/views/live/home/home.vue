<template>
	<c-layout>

		<c-header fixed>
			<c-launch></c-launch>
		</c-header>

		<c-content class="content">
			<c-box-skin>
				<div 
					class="live"
					v-for="(item, index) in liveList"
					:key="index"
					ph24>
					<router-link :to="'/live/detail?id='+item['id']">
						<c-magazine
							class="live__container"
							:image="item['background']">
							<c-avatar
								class="live__header"
								:url="item['avatar']"
								:text="item['name']"
								pv18></c-avatar>
							<c-button 
								class="live__status" 
								pl10 pr10
								bga2 radius4>直播中 | {{ item["watchNum"] }}</c-button>
							<span 
								class="live__title"
								font-tertiary fz32>{{ item["liveTitle"] }}</span>
							<c-columns>
								<c-magazine
									class="product"
									v-for="(goodsItem, index) in item['goods']"
									:key="index"
									:image="goodsItem['image']"
									mr10>
									<div 
										class="product__des"
										font-tertiary>{{ goodsItem['price'] }}</div>
								</c-magazine>
							</c-columns>
							<div class="chat">
								<c-avatar
									class="chat__header"
									url="https://s5.mogucdn.com/mlcdn/c45406/201015_49kl85i184k4gg6cf247eeg0ijl33_400x400.jpg_100x100.jpg"
									text="小仙子"
									font-tertiary></c-avatar>
							</div>
						</c-magazine>
					</router-link>
				</div>
			</c-box-skin>
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
import {getLives} from '@/api/live';
import { onMounted, reactive, toRefs } from 'vue';
import Toast from 'vant/lib/toast';
export default {
	setup() {
		const data = reactive({
			liveList: []
		});

		onMounted(()=>{
			
			Toast.loading({
				message: '加载中...',
				forbidClick: true
			});

			getLives().then((res)=>{
				data.liveList = res.data;
			})
		})

		const list = [
			{
				path: '/mall/home',
				text: '首页'
			},{
				path: '/mall/store',
				text: '商城'
			},{
				path: '/live/home',
				text: '直播',
				active: true
			},{
				path: '/me/me',
				text: '我'
			}
		];

		return {
			...toRefs(data),
			list
		}
	}
}
</script>
<style lang="scss" scoped>
@include b(content) {
	padding-top: 94px;
	padding-bottom: 100px;
}

@include b(live) {
	padding-top: 84px;
	@include e(container) {
		position: relative;
		height: 400px;
		border-radius: 4Px 4Px 0 0/4Px 4Px 0 0;
	}

	@include e(header) {
		@include position(absolute, top -80px left 24px);
		& ::v-deep img {
			margin-right: 15px;
			@include dimensions(90px);
			border: 2Px solid #fff;
		}
	}

	@include e(status) {
		@include position(absolute, top 140px left 24px);
		height: 40px;
	}

	@include e(title) {
		@include position(absolute, top 200px left 24px);
		text-shadow: 0 1px 2px rgba(0,0,0,.35);
	}
}

@include b(product) {
	@include position(absolute, top 260px left 24px);
	@include dimensions(120px);
	@include e(des) {
		padding-top: 83px;
		padding-left: 10px;
		text-shadow: 0 1px 2px rgba(0,0,0,.35);
	}
}

@include b(chat) {
	@include position(absolute, bottom 20px right 20px);
	@include dimensions(240px, 120px);
	@include e(header) {
		text-shadow: 0 1px 2px rgba(0,0,0,.35);
		& ::v-deep img {
			@include dimensions(28px);
			margin-right: 5px;
		}
	}
}

@include b(footer) {
	height: 100px;
}
</style>