<!--  -->
<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      count:0,
      imagesLength:0,
    }
  },
  methods: {
    imgLoad(){
      // 因为imgLoad（）的调用次数与图片张数相同，但是我们不想每次加载完成一张图片就发送一次刷新，而是等图片加载完成之后，在发送
      // 通过++this.count可以记录当前调用的次数，只要当调用次数等于图片张数时，说明图片加载完成，可以发送刷新了
      // 判断, 所有的图片都加载完了, 那么进行一次回调就可以了.
      if(++this.count === this.imagesLength){
        this.$emit('imageLoad')
      }
      //  this.$emit('imageLoad')
    }
  },
  // 只有detailInfo属性的里面数组的长度发生改变，watch才会执行，不然会一直缓存结果，就不用每次调用属性获取长度
  watch:{
    detailInfo(){
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
};
</script>
<style  scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list img {
  width: 100%;
}
</style>