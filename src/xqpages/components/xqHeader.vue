<template>
  <div class="xq_header_content">
    <xq-header-select-city></xq-header-select-city>
    <div class="box_content" id="content">
        <mt-loadmore class="loadmorestwo"  :top-method="loadTop"  @top-status-change="handleTopChange" ref="loadmore" :maxDistance="90">
          <div class="tab">
            <div class="today" @click="changeRouterToday"><span :class="selectActiveDay?'active':''">今日</span></div>
            <div class="month" @click="changeRouterMonth"><span :class="selectActiveMonth?'active':''">本月</span></div>
          </div>
          <div slot="top" class="mint-loadmore-top">
            <div class="top_tip">
              <div class="icon"><mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner></div>
              <span v-show="topStatus !== 'loading'" class='txt' :class="{ 'rotate': topStatus === 'drop' }">&nbsp;&nbsp;松开刷新</span>
              <span v-show="topStatus === 'loading'"  class='txt loading-txt'>正在刷新...</span>
            </div>
          </div>
          <div style="height:100%;position:relative">
            <look-lend-money :tagsType="true" :lendTitle="currentType?'今日出借 (元)':'本月出借 (元)'" :performanceHide="true"></look-lend-money>
            <city-transaction></city-transaction>
            <look-lend-money :performanceType="true" :titleText="currentType?'今日出借金额走势 (万元)':'本月出借金额走势 (万元)'"></look-lend-money>
            <look-lend-money :performanceType="true" :titleText="currentType?'今日用户活跃分时走势':'本月用户活跃分时走势'"></look-lend-money>
            <four-tab></four-tab>
            <nabob-ranking :currentType="currentType"></nabob-ranking>
            <performance-ranking :currentType="currentType"></performance-ranking>
            <lend-plan  :currentType="currentType"></lend-plan>
          </div>
        </mt-loadmore>
        <div class="topBar" id="goTop" v-show="isActive">
          <img src="../assets/images/fhdb.png" alt="" class="goTop"  @click="goTop">
        </div>
      </div>
  </div>
</template>
<script>
  import xqHeaderSelectCity from '../components/xqHeaderSelectCity'
  import lendPlan from '../components/lendPlan'
  import performanceRanking from '../components/performancerRanking'
  import nabobRanking from '../components/nabobRanking'
  import fourTab from '../components/fourTab'
  import lookLendMoney from '../components/lookLendMoney'
  import cityTransaction from '../components/cityTransaction'
  import { Loadmore } from 'mint-ui'
  import Bus from '../../components/bus.js'
  import {mapActions,mapGetters} from 'vuex'

  export default {
    data(){
      return{
        selectActiveDay:true,
        selectActiveMonth:false,
        topStatus: '',
        currentType:true,//true:今日   false:本月
        isActive:false
      }
    },
    created(){
      var that = this;
      var scrollTop = 0;
      window.onscroll=function(){
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop>400) {
          that.isActive=true;
        }else {
          that.isActive=false;
        }
      }
    },
    mounted(){

    },
    props:{
      arrShow:Boolean
    },
    computed:{
      ...mapGetters(['orgCodeName'])
    },
    components:{
      lendPlan,
      performanceRanking,
      nabobRanking,
      fourTab,
      lookLendMoney,
      cityTransaction,
      xqHeaderSelectCity
    },
    methods: {
      ...mapActions(['saveFooterCurrent']),
      news(){//进入消息列表
        this.$router.push('/news/newList')
      },
      //返回到顶部
      goTop(){
          let timer = null;
          timer = setInterval(function () {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop
          let ispeed = Math.floor(-osTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
          this.isTop = true
          if (osTop === 0) {
            clearInterval(timer)
          }
        },30)
      },
      //今日
      changeRouterToday(){
        this.selectActiveMonth = false;
        this.selectActiveDay = true;
        this.currentType = true;
      },
      //本月
      changeRouterMonth(){
        this.selectActiveDay = false;
        this.selectActiveMonth = true;
        this.currentType = false;
      },
      loadTop() {//下拉刷新
        setTimeout(()=>{
          this.$refs.loadmore.onTopLoaded();
        },1000)
      },
      handleTopChange(status) {
        this.topStatus = status;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .topBar
    position fixed
    bottom 60px
    right 20px
    width:40px
    height:40px
    img
      width 40px
      height 40px
  .jt_right
    position:absolute
    right:0px
    top:20px
    .right
      .msg_right
        width 17px
        height 18px
        float right
        margin-right 20px
        margin-top 10px
      .dian
        width 4px
        height 4px
        background-color red
        border-radius 50px
        position absolute
        right 22px
        top 12px
  .jt_center
    text-align:center
    font-size: 20px
    color: #FFFFFF
    line-height:35px
    height:35px
    img
      width:20px
      vertical-align: text-top
  .jt_left
    position:absolute
    left:21px
  .jt_left img
    width:25px
  .box_content
    position:absolute
    overflow:hidden
    top: 60px
    z-index:1
  .tab
    height 40px
    width 100%
    line-height 40px
    background:pink url("../assets/images/bj2.png")
    background-repeat no-repeat
    background-size 100% 100%
    display flex
    .today
      text-align right
      flex 1
      padding-right 15px
      span
        font-size 16px
        color #D0ECFF
        font-family PingFangSC-Semibold
      .active
        padding-bottom 2px
        font-family PingFangSC-Semibold
        border-bottom 2px solid #fff
        color:#fff
    .month
      flex 1
      text-align left
      padding-left 15px
      span
        font-size 16px
        color #D0ECFF
        font-family PingFangSC-Semibold
        padding-bottom 2px
      .active
        padding-bottom 2px
        font-family PingFangSC-Semibold
        border-bottom 2px solid #fff
        color:#fff

.mint-loadmore-top
  height 50px
  .top_tip
    width 100%
    height 50px
    position relative
    img
      position absolute
      top 10px
      left 3.866667rem
      width 25px
      height 25px
    .txt
      padding-left 30px
      font-size 13px
      color #29354D
    .loading-txt
      padding-left 36px
    .icon
      display inline-block
      position absolute
      top 10px
    .reush_tip
      position absolute
      left 0
      top 16px
      width 100%
      height 20px
      .txt
        padding-left 0px
        font-size 10px
        color #29354D

</style>

