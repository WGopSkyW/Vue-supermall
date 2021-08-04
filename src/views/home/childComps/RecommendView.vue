<template>
  <div class="recommend"> 
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:"RecommendView",
  props:{
    recommends:{
      typeof:Array,
      drfault(){
        return [];
      }
    }
  }
}

</script>
<style  scoped>
.recommend{
  display:flex;
  text-align: center;
  font-size: 15px;
  padding: 15px 0;
  border-bottom: 10px solid #eee;
}

.recommend-item{
  flex: 1;
}
.recommend-item img{
  width: 70px;
  margin-bottom: 5px;
}

</style>