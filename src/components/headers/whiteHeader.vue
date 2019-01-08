<template>
  <div class="white-header">
    <div class="top">
      <img src="../../assets/images/backnew2.png" class="jiantou" @click="goBack" >
      <span class="news">{{title}}</span>
    </div>
    <div class="top-bg"></div>
  </div>
</template>
<script>
export default {
  props:['title'],
  methods:{
    goBack(){
      this.$router.back(-1);
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../assets/stylus/methods'
.white-header
  .top
    width 100%
    iphonefixheight(70px)
    background-color #fff
    position fixed
    text-align center
    z-index:999
    .jiantou
      position absolute
      left 21px
      iphonefixtop(37px)
      width 22px
      height 22px
    .news
      font-size 18px
      color #29354D
      font-family PingFangSC-Medium
      position absolute
      iphonefixtop(40px)
      left 50%
      transform translateX(-50%)
  .top-bg
    width 100%
    iphonefixheight(86px)
</style>

