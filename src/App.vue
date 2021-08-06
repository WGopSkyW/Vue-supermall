<template>
  <div id="app" class="wrapper">
    <keep-alive exclude="Detail">
    <router-view/>
    </keep-alive>
    <main-tabbar></main-tabbar>
  </div>
</template>

<script>
import MainTabbar from 'components/content/mainTabbar/MainTabbar'

export default {
    name: 'app',
    components: {
     MainTabbar
    }
  }
</script>

<style>
@import "assets/css/base.css";

</style>
