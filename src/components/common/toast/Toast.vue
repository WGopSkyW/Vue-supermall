<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: "",
    };
  },
  methods: {
    show(message='默认文字', duration=1500) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);
    },
  },
};
</script>
<style  scoped>
.toast {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 13px;
  border-radius: 10px;
  color: #fff;
  z-index: 999;
}
</style>