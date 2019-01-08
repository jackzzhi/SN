<template>
    <div class="net_wrap">
       <div class="duanwang_img_wrap">
         <img src="@/assets/images/wushuju.png"/>
       </div>
       <div class="text_wrap"><span>暂无数据</span></div>
    </div>
</template>

<script>
    export default {
      name: "BrokenNetwork",
      created(){
        // 顶部状态栏展示颜色参数说明：type：“0”标识黑色；“1”标识白色
        if(window.webkit){
          window.webkit.messageHandlers.changeStatusBarColor.postMessage({type:'0'})
        }
        if(window.messageHandlers){
          window.messageHandlers.changeStatusBarColor("0")
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .net_wrap
   position absolute
   top 0
   left 0
   right 0
   bottom 0
   background-color #f6f8f9
   text-align center
   .duanwang_img_wrap
    margin-top 185px
    margin-left 69px
    margin-right 92px
    img
     width 214px
     height 157px


   .text_wrap
    width 112px
    height 20px
    margin-top 11px
    margin-left 136px
    margin-right 127px
    span
     font-family PingFangSC-Regular
     font-size 14px
     color #909090
     letter-spacing 0
</style>
