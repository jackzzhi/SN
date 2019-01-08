<template>
  <div class="top">
    <img src="../../assets/images/backnew.png" class="jiantou" @click="goBack">
    <span class="aBout">{{title}}</span>
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
.top
  width 100%
  height 70px
  background-color #4E97FF
  text-align center
  position relative
  iphonefixpadding(0px)
  .jiantou
    position absolute
    left 21px
    iphonefixtop(37px)
    width 22px
    height 22px
  .aBout
    font-size 18px
    color #FFFFFF
    position absolute
    iphonefixtop(40px) 
    left 50%
    transform translateX(-50%)
    font-family PingFangSC-Medium
</style>

