<template>
  <div class="xq_header_content">
    <div class="box_content" id="content">
      <headerNav :activeId='1' :type="2" :fixedHead="true"></headerNav>
      <mt-loadmore class="loadmorestwo" :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore" :maxDistance="90">
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
                <span v-show="topStatus === 'loading'" class='txt loading-txt'>正在刷新...</span>
              </div>
            </div>
          </div>
        </div>
        <div class="main-wrap" v-if="!isNoData">
          <look-lend-money v-if="monthLendMoneyData.value!=undefined" :currentLendData="monthLendMoneyData" :tagsType="true" :performanceHide="true"></look-lend-money>
          <city-transaction v-if="monthCityTranscationList.length !=0" :currentType="currentType" :marqueeList="monthCityTranscationList" :currentCityTransactionData="monthCityTransaction"></city-transaction>
          <look-lend-money v-if="monthUserLendMoneyLineTitle !=''" :cengShow="true" :lineType="monthLineType01" :userLendMoneyLine="monthUserLendMoneyLine" :performanceType="true" :titleText01="monthUserLendMoneyLineTitle"></look-lend-money>
          <look-lend-money v-if="monthUserActiveLineTitle != ''" :cengShow="true" :lineType="monthLineType02" :userActiveLine="monthUserActiveLine" :performanceType="true" :titleText02="monthUserActiveLineTitle"></look-lend-money>
          <four-tab :registerUserData="monthRegisterUser" v-if="monthRegisterUser.length !=0"></four-tab>
          <nabob-ranking v-if="monthNabobRankingTitle !=''" :nabobRankingList="monthNabobRankingList" :nabobRankingTitle="monthNabobRankingTitle" :currentType="currentType"></nabob-ranking>
          <performance-ranking v-if="monthPerformanceRankingList.length != 0" :performanceRankingTotal="monthPerformanceRankingTotal" :performanceRankingList="monthPerformanceRankingList" :performanceRankingTitle="monthPerformanceRankingTitle" :currentType="currentType"></performance-ranking>
          <lend-plan v-if="monthLendGaugeTitle !=''" :lendGaugeTitle="monthLendGaugeTitle" :lendGaugeTotal="monthLendGaugeTotal" :lendGaugeListData="monthLendGaugeList" :currentType="currentType"></lend-plan>
        </div>
        <div class="nodata" v-else="isNoData">
          <div>
            <img class="nodata_img" src="@/assets/images/wushuju.png" />
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
import { mapActions, mapGetters } from 'vuex'
import headerNav from '@/xqpages/components/headerNav'
export default {
  data() {
    return {
      topStatus: '',
      currentType: false, //true:今日   false:本月
      goTopShow: false,
      monthLendMoneyData: {}, //本月出借金额
      monthCityTransaction: {}, //本月城市出借笔数
      monthCityTranscationList: [], //本月城市出借列表
      monthUserLendMoneyLine: {}, //本月出借金额走势
      monthUserLendMoneyLineTitle: '', //本月出借金额走势title
      monthUserActiveLine: {}, //本月用户活跃分时走势数据
      monthUserActiveLineTitle: '', //本月用户活跃分时走势title
      monthRegisterUser: [], //本月注册用户
      monthPerformanceRankingTitle: {}, //本月业绩排行title
      monthPerformanceRankingList: [], //本月业绩排行list
      monthPerformanceRankingTotal: 0, //获取本月业绩排行总金额
      monthLendGaugeList: [], //本月出借计划分布
      monthLendGaugeTitle: '', //本月出借计划分布title
      monthLendGaugeTotal: 0, //获取出借总金额
      monthLendGaugeColor: [], //获取出借计划分布仪表盘color
      monthNabobRankingList: [], //本月富豪排行列表
      monthNabobRankingTitle: '', //本月富豪排行title
      isNoData: false, //暂无数据,
      monthLineType01: '', //type=lendMoney  本月出借金额走势图
      monthLineType02: '', //type=active   本月用户活跃分时走势
    }
  },
  created() {
    this.saveLoadingShow(true)
    this.getMonthData()
  },
  mounted() {
    this.addListener()
  },
  destroyed() {
    this.removeListener()
  },
  activated() {
    this.addListener()
  },
  deactivated() {
    this.removeListener()
  },
  props: {
    arrShow: Boolean
  },
  computed: {
    ...mapGetters(['orgCodeName', 'userid','timeBattleKPINavs'])
  },
  components: {
    lendPlan,
    performanceRanking,
    nabobRanking,
    fourTab,
    lookLendMoney,
    cityTransaction,
    headerNav
  },
  methods: {
    ...mapActions(['saveFooterCurrent', 'saveLoadingShow']),
    news() {
      //进入消息列表
      this.$router.push('/news/newList')
    },
    //今日
    changeRouterToday() {
      this.$router.push('/achievement/today')
    },
    loadTop() {
      //下拉刷新
      setTimeout(() => {
        this.saveLoadingShow(true)
        this.getMonthData()
        this.$refs.loadmore.onTopLoaded()
      }, 1000)
    },
    handleTopChange(status) {
      this.topStatus = status
    },
    getMonthData() {
      this.$ajax({
        method: 'post',
        url: '/saasbi/cockpit/xiangqian/list',
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: JSON.stringify({
          token: this.userid,
          // subjectId: 407,
          subjectId: this.timeBattleKPINavs[1].id,
          masterNo: '04',
          pageSize: '20'
        })
      })
        .then(res => {
          if(res.data.code != 500){this.saveLoadingShow(false);}
          if (res.data.code == 200) {
            var resData = res.data.data
            if (resData == null || resData.length == 0) {
              this.isNoData = true
            } else {
              this.isNoData = false
            }
            resData.forEach((item, index) => {
              if (item.id == 419) {
                //本月出借金额
                this.monthLendMoneyData = item.datas[0]
              } else if (item.id == 420) {
                //城市出借笔数
                this.monthCityTransaction = item.datas[0]
              } else if (item.id == 421) {
                //城市交易列表
                this.monthCityTranscationList = item.datas[0].rows
              } else if (item.id == 422) {
                //本月出借金额走势
                this.monthUserLendMoneyLine = item.datas[0] //本月出借金额走势数据
                this.monthUserLendMoneyLineTitle = item.title //本月出借金额走势title
                this.monthLineType01 = 'lendMoney'
              } else if (item.id == 423) {
                //本月用户活跃分时走势
                this.monthUserActiveLine = item.datas[0] //本月用户活跃分时走势数据
                this.monthUserActiveLineTitle = item.title //本月用户活跃分时走势title
                this.monthLineType02 = 'active'
              } else if (item.id == 424) {
                //本月注册用户
                this.monthRegisterUser = item.datas
              } else if (item.id == 430) {
                //本月业绩排行
                this.monthPerformanceRankingTitle = item //本月业绩排行title
                this.monthPerformanceRankingList = item.datas[0].list //本月业绩排行list
                //获取排行总金额
                var resData = item.datas[0].list
                this.monthPerformanceRankingTotal = 0
                resData.forEach((items, indexs) => {
                  this.monthPerformanceRankingTotal += parseInt(items.value)
                })
              } else if (item.id == 425) {
                //本月出借计划分布
              this.monthLendGaugeList = item.datas.slice(0,3)//出借计划分布仪表盘数据
                //获取出借总金额
                var resDatas = item.datas
                this.monthLendGaugeTotal = 0
                resDatas.forEach((items, indexs) => {
                  this.monthLendGaugeTotal += parseInt(items.value)
                })

                //本月出借计划分布title
                this.monthLendGaugeTitle = '本月出借计划分布'
              } else if (item.id == 426) {
                //本月富豪排行
                //本月富豪排行列表
                //为了排序而排序   顺序：2、1、3
                var arr = item.datas[0].rows
                this.monthNabobRankingList = []
                arr.forEach((items, index) => {
                  if (index == 1) {
                    this.monthNabobRankingList.push(items)
                    this.monthNabobRankingList.push(arr[0])
                    this.monthNabobRankingList.push(arr[2])
                  }
                })
                this.monthNabobRankingTitle = item.title //本月富豪排行title
              }
            })
          } else if (res.data.code == 301) {
            //7天自动退出登录
            this.$logOut({
              rememberpwd: '1'
            }) //退出记住密码
          } else if (res.data.code == 407) {
            //被踢出登录，返回登录页
            this.$logOut()
          } else {
            console.log(res.data.msg)
          }
          this.saveLoadingShow(false)
        })

        .catch(err => {
          this.saveLoadingShow(false)
          console.log(err)
        })
    },
    //返回到顶部
    goTop() {
      let timer = null,
        _that = this
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 50
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
          _that.goTopShow = false
        }
      })
    },
    addListener() {
      window.addEventListener('scroll', this.handleScroll)
    },
    removeListener() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      const scrollHeight =
        document.body.scrollHeight || document.documentElement.scrollHeight
      const windowHeight =
        document.body.clientHeight || document.documentElement.clientHeight
      //回到顶部
      if (scrollTop > 400) {
        this.goTopShow = true
        this.scrollTop = scrollTop
      } else {
        this.goTopShow = false
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../../assets/css/loaders.css'
@import './index.styl'
</style>

