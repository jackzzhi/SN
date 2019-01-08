<template>
  <div>
    <div class="msite_head">
      <div class="msite_top">
        <img src="../../assets/images/backnew.png" class="jiantou" @click="goBack">
        <div class="city-box" @click="chooseArea">
          <span class="city_all">{{this.orgCodeName}}</span>
          <img class="city_open" src="../../assets/images/zhankai.png">
        </div>
        <img v-show="type === 1" class="guest_group_help" src="../../assets/images/help.png" alt="" @click="openHelp">
      </div>
    </div>
  </div>
</template>
<script>
  import Bus from '../bus.js'
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return{
        interval:null,
        newsUnreadTotal:0
      }
    },
    props: ['type'],
    computed:{
      ...mapGetters(['userid','deviceinfo','orgCodeList','orgCodeName'])
    },
    activated(){
      // 顶部状态栏展示颜色参数说明：type：“0”标识黑色；“1”标识白色
      if(window.webkit){
        window.webkit.messageHandlers.changeStatusBarColor.postMessage({type:'0'})
      }
      if(window.messageHandlers){
        window.messageHandlers.changeStatusBarColor("0")
      }
    },
    methods:{
      chooseArea(){
        Bus.$emit('msg','打开选择机构弹框')
      },
      goBack(){
        this.$router.push('/home/personnal');
      },
      openHelp () {
        this.$router.push('/UnderstandGuestGroup')
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../assets/stylus/methods.styl"
  .msite_head
    width 100%
    height 34px
    iphonefixpadding(30px)
    text-align center
    position fixed
    z-index 100
    background-image url("../../assets/images/tou.png")
    background-repeat no-repeat
    background-size 100% 100%
    text-align center
    .msite_top
      position: relative
    .jiantou
      // float left
      position: absolute
      top: 2px
      left: 10px
      // padding-left 10px
      // padding-top 2px
      width 20px
      height 20px
    .city-box
      display: inline-block
      iphonefixtop(30px)
      // width 200px
      // position absolute
      // top 30px
      // left 50%
      // margin-left -100px
      .city_all
       font-size 20px
       line-height 32px
       color #fff
       font-family PingFangSC-Medium
      .city_open
       padding-left 2px
       width 15px
       height 15px
       position relative
    .guest_group_help {
      // float right;
      position: absolute
      top: 2px
      right: 10px
      // padding-right 10px
      // padding-top 2px
      width 20px
      height 20px
    }

</style>
