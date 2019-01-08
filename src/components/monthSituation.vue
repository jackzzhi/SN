<template>
    <div class="month_situation_wrap">
      <div class="month_situation_title">
        <span>{{monthData.title?monthData.title:''}}</span>
        <img :src="!isShowContent?require('../assets/images/xiala.png'):require('../assets/images/shangla.png')" @click="isShowContent=!isShowContent">
      </div>
      <ul v-show="isShowContent">
        <li v-for="(item1,index) in monthData.datas" >
          <div class="main_content">
            <div class="left_content">
              <div class="jinshen_title">
                <img v-show="item1.itemAlias=='进审'" src="../assets/images/jinshen.png" />
                <img v-show="item1.itemAlias=='审批'" src="../assets/images/shenpi.png" />
                <img v-show="item1.itemAlias=='批转'" src="../assets/images/pizhuan.png" />
                <img v-show="item1.itemAlias=='业绩'" src="../assets/images/yeji.png" />
                <img v-show="item1.itemAlias=='其它'" src="../assets/images/qita.png" />
                <span>{{item1.itemAlias}}</span>
              </div>
            </div>
            <div class="right_content">
            <div class="li_item" v-for="(item2,index1) in item1.list">
              <div class="one_bottom">
                <span class="jsl">{{item2.name}}</span>
                <span class="pencil">{{item2.unit}}</span>
              </div>
              <div class="one_top">
                <span>{{item2.value}}</span>
              </div>
            </div>
          </div>
          </div>
          <div class="bottom_line" :class="index==monthData.datas.length-1?'vishidden':''"><img class="line" src="../assets/images/group.png"/></div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
      props:{
        monthData:{
          required:true
        }
      },
      data(){
        return{
          isShowContent:true,
        }
      },
      mounted(){
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus"  scoped>
.month_situation_wrap
  background-color #fff
  .month_situation_title
    width 100%
    height 54px
    margin-top 16px
    line-height 54px
    background-color #FFFFFF
    border-bottom 1px solid  #F1F3F8
    span
      font-family PingFangSC-Medium
      font-size 18px
      color #29354D
      margin-left 19px
      letter-spacing 0
    img
      width 28px
      height 28px
      margin-top 14px
      float right
      margin-right 20px
  li
   width 100%
   .main_content
     overflow hidden
     padding-bottom 9px
     padding-top 12px
     .left_content
      width 37.3%
      float left
      background-color #fff
      .jinshen_title
       margin-left 20px
       img
        width 16px
        height 18px
        float left
        margin-top 10px
       span
        font-family PingFangSC-Regular
        float left
        color #29354D
        font-size 16px
        margin-top 11px
        margin-left 5px
     .right_content
      width 62.7%
      float left
      background-color #fff
      .li_item
       width 50%
       float left
       padding-top  15px
       .one_bottom
        .jsl
         font-family PingFangSC-Light
         font-size 14px
         color #29354D
         letter-spacing 0
        .pencil
         font-family PingFangSC-Light
         font-size 10px
         color #909090
         letter-spacing 0


       .one_top
        margin-top 8px
        span
         font-family PingFangSC-Regular
         font-size 20px
         color #4E97FF

   .bottom_line
     height 10px
     width 90%
     padding-left 10%
     .line
      width 100%
      height 1px

   .vishidden
    visibility hidden
</style>
