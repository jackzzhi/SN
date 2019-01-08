<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
    <choose-area></choose-area>
  </div>
</template>
<script>
import chooseArea from '@/components/chooseArea'
import footerGuide from '@/components/footer/footerGuide'
export default {
  components: {
    chooseArea,
    footerGuide
  }
}
</script>
<style lang="stylus">
@import '../assets/stylus/methods'
.topBar
  position fixed
  iphonefixbottom(60px) 
  right 20px
  img
    width 40px
    height 40px
</style>


