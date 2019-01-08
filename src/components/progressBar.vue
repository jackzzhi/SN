<template>
  <div class="performance_ranking_content">
    <div class="tlc_title">
      <p class="tc_left">{{progressBarData.title}}</p>
    </div>
    <div class="tcl_content">
      <div v-for="(item,index) in progressBarData.datas">
        <div class="tc_li">
          <div class="tl_money">
            <span>{{item.unitNm}}</span>
          </div>
          <span class="tl_title">{{item.title}}</span>
          <div class="tl_hr_content">
            <span>
              <div class="tl_hr_bar" :style="{'width':(item.value)*100+'%'}"></div>
            </span>
          </div>
        </div>
        <div class="txt-container" v-html="item.desc">
          <!-- <p>与上一名放款金额相差<span class="blue-txt">5000</span>元</p>
          <p>排名224名的人次共<span class="blue-txt">5</span>名</p> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
      }
    },
    props:{
      progressBarData:{
        type:Object,
        require:true
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .performance_ranking_content
    background-color #fff
    .tlc_title
      width 100%
      height 54px
      margin-top 16px
      line-height 54px
      background-color #FFFFFF
      border-bottom 2px solid  #F6F8F9
      .tc_left
        font-family PingFangSC-Medium
        font-size 18px
        color #29354D
        margin-left 19px
        letter-spacing 0
    .tcl_content
      padding 0 25px 15px
      .tc_li
        .tl_money
          text-align:right
          font-size: 12px
          color: #29354D
          margin:20px 0 10px 0
          span
            font-size: 16px
        position:relative
        .tl_title
          position:absolute
          top: 0px
          font-size: 14px
          color: #666
        .tl_hr_content
          span
            display:block
            overflow:hidden
            box-shadow: 0 0 1px 1px rgba(39,114,255,0.30) inset
            border-radius:10px
        .tl_hr_bar
          height: 10px
          -webkit-border-radius: 10px
          -moz-border-radius: 10px
          border-radius: 10px
          background-image: linear-gradient(225deg, #65B2FF 0%, #7DC9FF 100%)
      .txt-container
        font-size 12px
        line-height 22px
        text-align center
        margin-top 20px
        color #666
        .blue-txt 
          color #4e97ff
          font-size: 14px
          padding-left 3px
          padding-right 3px
</style>

