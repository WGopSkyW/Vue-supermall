import {debounce} from "common/utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin ={
  data() {
    return {
      itemImgListener:null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,100);
    this.itemImgListener = ()=>{refresh()};
    this.$bus.$on('itemImageLoad',this.itemImgListener);
  },
}


export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listernerBackTop(position){
      this.isShowBackTop = (-position.y) > 1000;
    }
  }
}