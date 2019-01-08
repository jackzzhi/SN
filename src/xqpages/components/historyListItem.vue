<template>
  <div class="history_item_wrap">
    <ul>
      <li>
        <div>
          <span class="text">转让排队金额</span>
          <span class="num">22222222222</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:{
      historyList:Array
    },
    mounted(){
      console.log(this.historyList)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus"  scoped>
.history_item_wrap
  padding 18px 13px
  ul
    list-style none
    li
     width 100%
     height 64px
     background-color #fff
     border-bottom 1px dashed #E6E6E6

     div
      width 100%
      height 100%
      .num
       font-family CenturyGothic
       font-size 20px
       color #010E4F
       float right
       padding-top 24px
       padding-right 10px
      .text
       font-family PingFangSC-Regular
       font-size 16px
       color #A6A6A6
       float left
       padding-left 10px
       padding-top 24px
      .text:after{
        content:""
        display:block
        position:absolute
        width: 1px
        border-right:1px dashed #E6E6E6
        height:25px
        top: 270px
        left:47%
      }
</style>
