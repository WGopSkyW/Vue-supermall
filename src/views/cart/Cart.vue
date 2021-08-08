<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <scroll class="cart-content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from "vuex";

import CartList from "./childComps/CartList.vue";
import BottomBar from './childComps/BottomBar.vue';

import Scroll from "../../components/common/scroll/Scroll.vue";


export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    BottomBar,
  },
  computed: {
    // 普通写法
    // cartLength(){
    //   // return this.$store.getters.cartLength

    // }

    // map解构写法
    ...mapGetters(["cartLength"]),

    // map解构写法之给变量起名字
    // ...mapGetters({
    //   cartLength：'cartLength'
    // })
  },
  activated() {
    this.$refs.scroll.refresh()
  },
};
</script>

<style scoped>
#cart {
  height: 100vh;
}
.cart-nav {
  position: relative;
  background-color: #ff5777;
  color: #fff;
  z-index: 11;
}
.cart-content {
  height: calc(100% - 44px - 49px - 40px);
}
</style>
