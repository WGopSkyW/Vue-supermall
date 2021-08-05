<!--  -->
<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad"></img>
      </a>
  </swiper-item>
  </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      typeof: Array,
      // 类型是对象或者数组时, 默认值必须是一个函数
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false,
    }
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>
<style  scoped>
</style>