<!--  -->
<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- <div :class="{active:isActive}"><slot name="item-text"></slot></div> -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeClore: {
      type: String,
      default: "#FF5777",
    },
  },
  data() {
    return {
      // isActive:true
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeClore } : {};
    },
  },
  methods: {
    itemClick() {
      // 判断此时的路径等不等于此时活跃页面的路径，如果等于就不跳转
      if (this.path != this.$route.path) {
        this.$router.replace(this.path);
      }
    },
  },
};
</script>


<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 15px;
  margin-top: 3px;
}

.tab-bar-item img {
  width: 25px;
  vertical-align: top;
}
/* // .active{
//   color: red;
// } */
</style>