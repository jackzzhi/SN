<template>
  <div class="xq_header_content">
    <div class="box_content" id="content">
      <headerNav :activeId='0' :type="2" :fixedHead="true"></headerNav>
        <mt-loadmore class="loadmorestwo"  :top-method="loadTop"  @top-status-change="handleTopChange" ref="loadmore" :maxDistance="90">
          <div slot="top" class="mint-loadmore-top">
            <div class="top_tip">
              <div slot="top" class="mint-loadmore-top">
                <div class="top_tip">
                <div class="icon">
                  <div class="la-ball-spin-clockwise">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <span v-show="topStatus !== 'loading'" class='txt' :class="{ 'rotate': topStatus === 'drop' }">&nbsp;&nbsp;松开刷新</span>
                <span v-show="topStatus === 'loading'"  class='txt loading-txt'>正在刷新...</span>
                </div>
              </div>
            </div>
          </div>
          <div class="main-wrap" ref="boxList" v-if="!isNoData">
            <look-lend-money v-if="todayLendMoneyData.value!=undefined" :currentLendData="todayLendMoneyData" :tagsType="true" :performanceHide="true"></look-lend-money>
            <city-transaction v-if="todayCityTranscationList.length !=0" :currentType="currentType" :marqueeList="todayCityTranscationList" :currentCityTransactionData="todayCityTransaction"></city-transaction>
            <look-lend-money   v-if="todayUserLendMoneyLineTitle !=''" :cengShow="true" :lineType="todayLineType01" :userLendMoneyLine="todayUserLendMoneyLine" :performanceType="true" :titleText01="todayUserLendMoneyLineTitle"></look-lend-money>
            <look-lend-money v-if="todayUserActiveLineTitle != ''"  :cengShow="true" :lineType="todayLineType02" :userActiveLine="todayUserActiveLine" :performanceType="true" :titleText02="todayUserActiveLineTitle"></look-lend-money>
            <four-tab :registerUserData="todayRegisterUser" v-if="todayRegisterUser.length !=0"></four-tab>
            <nabob-ranking v-if="todayNabobRankingTitle !=''" :nabobRankingList="todayNabobRankingList" :nabobRankingTitle="todayNabobRankingTitle" :currentType="currentType"></nabob-ranking>
            <performance-ranking v-if="todayPerformanceRankingList.length != 0" :performanceRankingTotal="todayPerformanceRankingTotal" :performanceRankingList="todayPerformanceRankingList" :performanceRankingTitle="todayPerformanceRankingTitle" :currentType="currentType"></performance-ranking>
            <lend-plan v-if="todayLendGaugeTitle !=''"  :lendGaugeTitle="todayLendGaugeTitle" :lendGaugeTotal="todayLendGaugeTotal" :lendGaugeListData="todayLendGaugeList"  :currentType="currentType"></lend-plan>
          </div>
          <div class="nodata" v-else="isNoData">
            <div>
              <img class="nodata_img" src="@/assets/images/wushuju.png"/>
            </div>
            <div class="text_wrap">
              <span class="nodata_title">暂无相关数据</span>
            </div>
          </div>
        </mt-loadmore>

        <div class="topBar" id="goTop">
          <img src="../../../assets/images/fhdb.png" alt="" class="goTop" v-show="goTopShow" @click="goTop">
        </div>
      </div>
  </div>
</template>
<script>
  import lendPlan from '../../../components/lendPlan'
  import performanceRanking from '../../../components/performancerRanking'
  import nabobRanking from '../../../components/nabobRanking'
  import fourTab from '../../../components/fourTab'
  import lookLendMoney from '../../../components/lookLendMoney'
  import cityTransaction from '../../../components/cityTransaction'
  import { Loadmore } from 'mint-ui'
  import {mapActions,mapGetters} from 'vuex'
  import headerNav from '@/xqpages/components/headerNav'

  export default {
    data(){
      return{
        topStatus: '',
        currentType:true,//true:今日   false:本月
        goTopShow:false,
        todayLendMoneyData:{},//今日出借金额
        todayCityTransaction:{},//今日城市出借笔数
        todayCityTranscationList:[],//今日城市出借列表
        todayUserLendMoneyLine:{},//今日出借金额走势
        todayUserLendMoneyLineTitle:"",//今日出借金额走势title
        todayUserActiveLine:{},//今日用户活跃分时走势数据
        todayUserActiveLineTitle:"",//今日用户活跃分时走势title
        todayRegisterUser:[],//今日注册用户
        todayPerformanceRankingTitle:{},//今日业绩排行title
        todayPerformanceRankingList:[],//今日业绩排行list
        todayPerformanceRankingTotal:0,//获取今日业绩排行总金额
        todayLendGaugeList:[],//今日出借计划分布
        todayLendGaugeTitle:"",//今日出借计划分布title
        todayLendGaugeTotal:0,//获取出借总金额
        todayLendGaugeColor:[],//获取出借计划分布仪表盘color
        todayNabobRankingList:[],//今日富豪排行列表
        todayNabobRankingTitle:"",//今日富豪排行title
        isNoData:false,//暂无数据,
        todayLineType01:"",//type=lendMoney  今日出借金额走势图
        todayLineType02:"",//type=active   今日用户活跃分时走势
      }
    },
    created(){
      this.saveLoadingShow(true);
      this.getTodayData();
    },
    mounted(){
      this.addListener();
    },
    deactivated(){
      this.removeListener()
    },
    props:{
      arrShow:Boolean
    },
    computed:{
      ...mapGetters(['orgCodeName','userid','timeBattleKPINavs'])
    },
    components:{
      lendPlan,
      performanceRanking,
      nabobRanking,
      fourTab,
      lookLendMoney,
      cityTransaction,
      headerNav
    },
    methods: {
      ...mapActions(['saveFooterCurrent','saveLoadingShow']),
      news(){//进入消息列表
        this.$router.push('/news/newList')
      },
      //本月
      changeRouterMonth(){
        this.$router.push('/achievement/month');
      },
      loadTop() {//下拉刷新
        setTimeout(()=>{
          this.saveLoadingShow(true);
          this.getTodayData();
          this.$refs.loadmore.onTopLoaded();
        },1000)
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      getTodayData(){
        this.$ajax({
          method: 'post',
          url: '/saasbi/cockpit/xiangqian/list',
          dataType: 'json',
          headers: { 'Content-Type': 'application/json;charset=UTF-8' },
          data: JSON.stringify({
            token: this.userid,
            // subjectId: '406',
            subjectId: this.timeBattleKPINavs[0].id,
            masterNo: '04',
            pageSize: '20'
          })
        })
        .then(res => {
          if(res.data.code != 500){this.saveLoadingShow(false);}
          if (res.data.code == 200) {
            var resData = res.data.data;
            if(resData == null || resData.length == 0){
              this.isNoData = true;
            }else{
              this.isNoData = false;
            }
            resData.forEach((item,index)=>{
              if(item.id == 406){//今日出借金额
                this.todayLendMoneyData = item.datas[0];
              }else if(item.id == 407){//城市出借笔数
                this.todayCityTransaction = item.datas[0];
              }else if(item.id == 408){//城市交易列表
                this.todayCityTranscationList = item.datas[0].rows;
              }else if(item.id == 409){//今日出借金额走势
                this.todayUserLendMoneyLine = item.datas[0];//今日出借金额走势数据
                this.todayUserLendMoneyLineTitle = item.title;//今日出借金额走势title
                this.todayLineType01 = 'lendMoney'
              }else if(item.id == 410){//今日用户活跃分时走势
                this.todayUserActiveLine = item.datas[0];//今日用户活跃分时走势数据
                this.todayUserActiveLineTitle = item.title;//今日用户活跃分时走势title
                this.todayLineType02 = 'active'
              }else if(item.id == 411){//今日注册用户
                this.todayRegisterUser = item.datas;
              }else if(item.id == 417){//今日业绩排行
                this.todayPerformanceRankingTitle = item;//今日业绩排行title
                this.todayPerformanceRankingList = item.datas[0].list;//今日业绩排行list
                //获取排行总金额
                var resData = item.datas[0].list;
                this.todayPerformanceRankingTotal = 0;
                resData.forEach((items,indexs)=>{
                  this.todayPerformanceRankingTotal += parseInt(items.value);
                });
              }else if(item.id == 412){//今日出借计划分布
            this.todayLendGaugeList = item.datas.slice(0,3)//出借计划分布仪表盘数据
                //获取出借总金额
                var resDatas = item.datas;
                this.todayLendGaugeTotal = 0;
                resDatas.forEach((items,indexs)=>{
                  this.todayLendGaugeTotal += parseInt(items.value);
                });

                //今日出借计划分布title
                this.todayLendGaugeTitle = '今日出借计划分布';

                //今日出借计划分布仪表盘color
                // this.todayLendGaugeColor = item.datas[0].series.color;
              }
              else if(item.id == 413){//今日富豪排行
                //今日富豪排行列表
                //为了排序而排序   顺序：2、1、3
                var arr = item.datas[0].rows;
                this.todayNabobRankingList = [];
                arr.forEach((items,index) => {
                  if(index ==1){
                    this.todayNabobRankingList.push(items);
                    this.todayNabobRankingList.push(arr[0]);
                    this.todayNabobRankingList.push(arr[2]);
                  }
                });
                this.todayNabobRankingTitle = item.title;//今日富豪排行title
              }
            });
          } else {
            console.log(res.data.msg)
          }
        })
        .catch(function(err) {
          console.log(err)
        })
      },
      addListener(){
        window.addEventListener('scroll', this.handleScroll)
      },
      removeListener(){
        window.removeEventListener('scroll', this.handleScroll)
      },
      handleScroll () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        const windowHeight = document.body.clientHeight || document.documentElement.clientHeight
        //回到顶部
        if(scrollTop>400){
          this.goTopShow=true
          this.scrollTop = scrollTop
        }
        else{
          this.goTopShow=false
        }
      },
      //返回到顶部
      goTop(){
        let timer=null,_that=this;
        cancelAnimationFrame(timer)
        timer=requestAnimationFrame(function fn(){
          if(_that.scrollTop>0){
            _that.scrollTop-=50;
            document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
            timer=requestAnimationFrame(fn)
          }else {
            cancelAnimationFrame(timer);
            _that.goTopShow=false;
          }
        })
      },
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../../assets/css/loaders.css";
@import './index.styl';
</style>

