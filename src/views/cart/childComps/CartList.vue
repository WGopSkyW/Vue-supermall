<template>
  <div class="cart-list">
    <cart-list-item
      v-for="item in cartList"
      :key="item.iid"
      :itemInfo="item"
    ></cart-list-item>
    <!-- {{cartList}} -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll.vue";
import CartListItem from "./CartListItem.vue";

export default {
  components: { Scroll },
  name: "CartList",
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
  },

};
</script>
<style  scoped>
</style>