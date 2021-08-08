<template>
  <div class="bottom-bar">
    <div class="check-button">
      <check-button
        :class="{ selectAll: isSelectAll }"
        @click.native="selectAll"
      />
      <span>全选</span>
    </div>

    <div class="calculate">
      <span>合计：￥{{ calculate }}</span>
    </div>
    <div class="all-item" @click="clickCal">
      <span>去计算：{{ cartLength }}</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";

export default {
  components: { CheckButton },
  name: "BottomBar",
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
    calculate() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.newPrice * item.count;
        }, 0)
        .toFixed(2);
    },
    cartLength() {
      return this.$store.getters.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      // if (this.cartList == 0) return false;
      // return !this.cartList.find((item) => !item.checked);
      return (
        this.cartList.length !== 0 &&
        this.cartList.every((item) => item.checked)
      );
    },
  },
  methods: {
    selectAll() {
      if (this.isSelectAll) {
        // for (let item of this.cartList) {
        //   item.checked = false;
        // }
        this.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        // for (let item of this.cartList) {
        //   item.checked = true;
        // }
        this.cartList.forEach((item) => {
          item.checked = true;
        });
      }

      // isSelectAll = true
    },
    clickCal() {
      if (this.cartList.length == 0) {
        this.$toast.show("购物车为空");
      } else if (this.cartList.every((item) => !item.checked)) {
        this.$toast.show("未选中商品");
      }
    },
  },
};
</script>
<style  scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  display: flex;
}
.check-button {
  display: flex;
  align-items: center;
  margin: auto 10px;
}
.calculate {
  display: flex;
  align-items: center;
  margin: auto 10px;
}
.all-item {
  display: flex;
  align-items: center;
  margin-left: auto;
  width: 27%;
  padding-left: 10px;
  background-color: #ff5777;
  color: #fff;
}
.selectAll {
  background-color: #ff5777;
}
</style>