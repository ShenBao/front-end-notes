<template>
  <div>

    <c-box-skin 
      class="tv" 
      v-for="(item, index) in list"
      :key="index"
      mb20 ph25 pt16 pb30>

      <c-avatar 
        class="tv__avatar"
        :url="item['avatarImage']"
        :text="item['avatarDes']"
        mb24></c-avatar>

      <div>
        <video 
          class="tv__video" 
          :src="item['video']"
          controls="controls"></video>    
      </div>

      <p
        pt30 pb20 pr20
        fz28>
        {{ item['des'] }}
      </p>

      <p class="tv__info">
        {{ item['info'] }}
      </p>

    </c-box-skin>

  </div>
</template>
<script>
import {getBrandVideosById} from '@/api/mall';
import {useRoute, useRouter} from 'vue-router';
import { onMounted, reactive, toRefs } from 'vue';
import boxSkin from '../../../components/box-skin/box-skin.vue';
export default {
  components: { boxSkin },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const data = reactive({
      list: []
    });

    onMounted(()=>{
      const id = route.query.id || 0;
      getBrandVideosById({id}).then((res)=>{
        data.list = res.data;
      })
    })

    return {
      ...toRefs(data)
    }
  }
}
</script>
<style lang="scss" scoped>
@include b(tv) {
  @include e(avatar) {
    & ::v-deep img {
      margin-right: 20px;
      @include dimensions(80px);
    }
  }

  @include e(video) {
    width: 100%;
    max-height: 800px;
    background: #000;
  }

  @include e(info) {
    color: #999;
  }
}
</style>