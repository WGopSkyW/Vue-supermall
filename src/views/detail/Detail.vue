<!--  -->
<template>
  <div id="detail">
    <!-- <div>
      {{$store.state.cartList}}
    </div> -->
    <detail-nav-bar
      ref="navbar"
      class="detail-nav-bar"
      @titleClick="titleClick"
    />
    <scroll
      class="detail-content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info ref="base" :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <deatail-comment-info ref="comment" :commentInfo="commentInfo" />
      <!-- <detail-recommend-info :recommendList="recommendList"/> -->
      <goods-list ref="recommend" :goods="recommendList" />
    </scroll>
    <!-- <toast></toast> -->
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DeatailCommentInfo from "./childComps/DeatailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
// import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";

import Scroll from "components/common/scroll/Scroll";

// import Toast from 'components/common/toast/Toast.vue';

import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DeatailCommentInfo,
    DetailBottomBar,
    // getOffsetTops:null,
    // DetailRecommendInfo,
    Scroll,
    GoodsList,
    // Toast,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      index: 0,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      // console.log(res.result);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // console.log(this.topImages)
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });
    getRecommend().then((res) => {
      // console.log(res.data)
      this.recommendList = res.data.list;
    });
    // this.getOffsetTops = debounce(()=>{
    //   this.themeTopYs = []
    //   this.themeTopYs.push(0)
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop-44)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
    //   // console.log(this.themeTopYs)
    // },100)
  },
  methods: {
    // 图片加载完成之后进行一次刷新
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getOffsetTops();
    },
    getOffsetTops() {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      //   // console.log(this.themeTopYs)
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      this.listernerBackTop(position);
      let length = this.themeTopYs.length;
      // if()
      // if(-position.y>0 && -position.y<this.themeTopYs[1]){
      //   this.$refs.navbar.currentIndex = 0;
      // }else if(-position.y>=this.themeTopYs[1] && -position.y<this.themeTopYs[2]){
      //   this.$refs.navbar.currentIndex = 1;
      // }else if(-position.y>=this.themeTopYs[2] && -position.y<this.themeTopYs[3]){
      //   this.$refs.navbar.currentIndex = 2;
      // }else{
      //   this.$refs.navbar.currentIndex = 3;
      // }
      // for(let i = 0;i<length;i++){
      //   i=+i
      //   // 只要满足一次，就不会继续执行
      //   // 这里index默认为0
      //   // position的值是一直在变化的，所以循环只要position变化一次就执行一次
      //   // 他们也有i为几的时候，只是i==3特殊需要特别拿出来
      //   if(this.index != i && -position.y >=this.themeTopYs[i] && -position.y <this.themeTopYs[i+1] && i!=length-1){
      //     this.index = i
      //     // console.log(i);
      //     this.$refs.navbar.currentIndex = this.index
      //   }else if(this.index != i && -position.y >=this.themeTopYs[i] && i==length-1){
      //     // 只有i==length-1才有资格没有闭区间，所以要特别声明
      //     this.index = i
      //     // console.log(i);
      //     this.$refs.navbar.currentIndex = this.index
      //   }

      // }
      for (let i = 0; i < length - 1; i++) {
        i = +i;
        if (
          this.index != i &&
          -position.y >= this.themeTopYs[i] &&
          -position.y < this.themeTopYs[i + 1]
        ) {
          this.index = i;
          this.$refs.navbar.currentIndex = this.index;
        }
      }
    },
    addToCart() {
      // 1.创建对象
      const obj = {};
      // 2.对象信息
      obj.iid = this.iid;
      obj.imgURL = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.newPrice = this.goods.lowNowPrice;
      // this.$store.commit('addCart',obj)
      this.$store.dispatch("addCart", obj).then((res) => {
        this.$toast.show(res, 1500);
        // console.log(res)
      });

      // console.log(obj)
    },
  },
  // updated() {
  //   this.$refs.scroll.refresh();
  // },
  mounted() {},
  destroyed() {
    // 因为之前keep-live把detail排除在外了，所以这里不能用deactivated
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
};
</script>
<style  scoped>
#detail {
  position: relative;
  background-color: #fff;
  z-index: 10;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-content {
  /* overflow: hidden; */
  /* position: absolute;
  top: 44px;
  left: 0;
  right: 0; */
  height: calc(100% - 44px - 49px);
}
</style>