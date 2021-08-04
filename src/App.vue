<template>
  <div id="app" class="wrapper">
    <router-view/>
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
