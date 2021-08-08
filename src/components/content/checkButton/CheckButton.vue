<template>
  <div
    class="check-button"
    :class="{ 'selector-active': checked }"
  >
    <img src="~/assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style  scoped>
.check-button {
  border: 2px solid;
  border-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
}
.selector-active {
  background-color: #ff5777;
}
/* img{
  width: 100%;
} */
</style>