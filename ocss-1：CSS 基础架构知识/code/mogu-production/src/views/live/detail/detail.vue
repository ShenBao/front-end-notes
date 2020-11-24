<template>
	<div class="page">
		<header>
			<c-columns>
				<c-columns
					class="anchor"
					pa16 mt20 ml14 mb14
					bga1 circle>
					<c-avatar
						class="anchor__avatar"
						:text="live['name']"
						:url="live['avatar']"
						font-tertiary></c-avatar>
					<c-button
						class="anchor__follow"
						:class="{'anchor__follow--isFocus': live['isFocus']}"
						@click="live['isFocus'] = !live['isFocus']"
						ml10 pa10 
						circle>{{live['isFocus'] ? "已关注" : "关注" }}</c-button>
				</c-columns>
			</c-columns>
		</header>

		<div 
			class="content"
			ml14>
			
			<c-button
				class="good"
				radius4 bga1>
				<c-magazine
					class="good__magazine"
					v-for="(item, index) in live['goods']"
					:key="index"
					radius6
					:image="item['image']">
					<c-button
						class="good__status"
						>待秒杀</c-button>
					<c-button
						class="good__price"
						pa6
						bga7>{{ item["price"] }}</c-button>
				</c-magazine>
			</c-button>

			<video 
				class="content__video"
				:src="live['video']"
				type="video/mp4"
				autoplay="autoplay" 
				loop="loop"
				muted="muted"></video>

		</div>

		<footer class="footer">

			<c-columns
				class="footer__box"
				pt20 ph24 pb24>
				<c-columns>
					<img 
						class="footer__img" 
						src="https://s10.mogucdn.com/mlcdn/c45406/200901_2fib9eb2clidj808d84f5ffaj224e_90x90.gif"
						pr18/>
				</c-columns>
				<c-columns>
					<div 
						pa10 ml22
						bga3 circle>
						<c-svg-thumbs size="24" :colors="['#fff', '#fff']"></c-svg-thumbs>
					</div>
				</c-columns>
			</c-columns>
		</footer>
	</div>
</template>
<script>
import {getLivesById} from '@/api/live'
import { onMounted, reactive, toRefs } from 'vue'
import {useRoute, useRouter} from 'vue-router';
import Toast from 'vant/lib/toast';

export default {
	setup() {
		const route = useRoute();
    const router = useRouter();
		const data = reactive({
			live: {}
		});
		
		onMounted(()=>{
			const id = route.query.id || 0;

			Toast.loading({
				message: '加载中...',
				forbidClick: true
			});
			
			getLivesById({id}).then((res)=>{
				data.live = res.data;
			})
		})

		return {
			...toRefs(data)
		}
	}
}
</script>
<style scoped lang="scss">
@include b(page) {
	@include position(absolute, top 0 left 0 right 0 bottom 0);
	@include dimensions(100vw, 100vh);
	display: flex;
	flex-direction: column;
}

@include b(anchor) {
	@include e(avatar) {
		& ::v-deep img {
			@include dimensions(70px);
			margin-right: 10px;
		}
	}

	@include e(follow) {
		background-image: linear-gradient(133deg,#ff5777,#ff469f);

		@include m(isFocus) {
			background: #ecbbd3;
		}
	}
}

@include b(content) {
	@include e(video) {
		@include position(fixed, top 0 left 0 right 0 bottom 0);
		@include dimensions(100vw, 100vh);
		z-index: -1;
	}
}

@include b(good) {
	@include dimensions(150px, 140px);
	
	@include e(magazine) {
		@include dimensions(130px, 120px);
	}
	
	@include e(status) {
		@include position(absolute, top 0 left 0);
		@include dimensions(88px, 40px);
		border-radius: 6Px 0/6Px 0;
		background-image: linear-gradient(90deg,#aba3fb,#948afb);
	}

	@include e(price) {
		@include position(absolute, bottom 0 left 0);
		border-radius: 0 6Px/0 6Px;
	}
}

@include b(chat) {
	@include dimensions(550px, 440px);
	overflow-y: scroll;
	@include e(item) {
		width: fit-content;
	}
}

@include b(footer) {
	margin-top: auto;
	@include e(box) {
		justify-content: space-between;
	}

	@include e(img) {
		@include dimensions(90px);
	}
	
	@include e(danmu) {
		@include dimensions(190px, 70px);
		line-height: 70px;
	}
}
</style>





