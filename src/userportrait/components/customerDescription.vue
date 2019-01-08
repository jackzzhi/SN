<template>
    <div class="customer_description_wrap">
      <div class="top">
        <span class="text">{{chartData.title}}</span>
        <div class="right_img" @click="isZhanKai" v-show="chartData.desc.length>68"><img src="../assets/images/shouqi.png"/></div>
      </div>
      <div class="content">
        <p :class="!isKai?'zhehang':''">{{chartData.desc}}</p>
      </div>
    </div>
</template>

<script>
    export default {
      props:{
        chartData:{
          required:true
        }
      },
      data(){
        return{
          isKai:false,
        }
      },
      mounted(){
      },
      methods:{
        isZhanKai(){
          this.isKai=!this.isKai
        }
        }
    }
</script>

<style  lang="stylus" rel="stylesheet/stylus"  scoped>
  .customer_description_wrap
   margin-left  12px
   margin-right 12px
   .top
    width 100%
    height 44px
    border-top-right-radius 5px
    background-image url("../assets/images/dise.png")
    background-repeat no-repeat
    background-size 100% 100%
    line-height 44px
    .text
     font-family PingFangSC-Regular
     font-size 16px
     color #010E4F
     padding-left 17px
    .right_img
     width 44px
     height 44px
     float right
     img
      width 10px
      height 10px
      padding-top 18px
      padding-left  17px
   .content
    width 100%
    background-color #ffffff
    margin-top -4px
    padding-bottom 8px
    border-bottom-left-radius 5px
    border-bottom-right-radius 5px
    p
     font-family PingFangSC-Light
     font-size 14px
     color #010E4F
     text-indent 25px
     letter-spacing 0
     text-align justify
     line-height 23px
     padding-left 17px
     padding-right 17px
    .zhehang
     overflow  hidden
     text-overflow ellipsis
     display -webkit-box
     -webkit-line-clamp 3
     -webkit-box-orient vertical
</style>
