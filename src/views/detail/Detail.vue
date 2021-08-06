<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" />
    <scroll class="detail-content" ref="scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop, GoodsParam} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo:{}
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      console.log(res);
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
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
  updated() {
    this.$refs.scroll.refresh();
  },
};
</script>
<style  scoped>
#detail {
  position: relative;
  background-color: #fff;
  z-index: 9;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-content {
  /* overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0; */
  height: calc(100% - 44px);
}
</style>