<!--  -->
<template>
  <div>
    <goods-list :goods="recommendList"/>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList"


export default {
 name:'DetailRecommendInfo',
 props:{
   recommendList:{
     type:Array,
     default(){
       return []
     }
   }
 },
 components:{
   GoodsList
 }
}

</script>
<style  scoped>
</style>