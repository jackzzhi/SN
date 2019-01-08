<template>
  <div class="page">
    <div v-show="fixedHeader" class="fixed-header">
      <common-header></common-header>
    </div>
    <mt-loadmore style="position:relative;" class="loadmores" :class="{'fixed-container':fixedHeader}" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" :maxDistance="90">
      <div class="msite_wrap">
        <div class="swiper">
          <mt-swipe :auto="4000">
            <!-- <mt-swipe-item><router-link :to="{name:'newPlan',params:{itemid:this.detailId}}"><img src="../assets/images/lunbo3.png"></router-link></mt-swipe-item>-->
            <mt-swipe-item><img src="../assets/images/bannertu.jpg"></mt-swipe-item>
          </mt-swipe>
        </div>
        <page-swiper v-if="swiperDataList.length>0" v-for='(item,index) in swiperDataList' :pageData="item" :key='item+""+index' :isBlueTxt="true" :showType=showMenDian></page-swiper>
        <month-situation v-if="monthSituationList.title" :monthData="monthSituationList"></month-situation>
        <div v-if='dataLists.length>0'>
          <chart-box v-for="item in dataLists" :chartData="item" :key='item.id'></chart-box>
        </div>
        <div v-if='progressBarDatas.length>0'>
          <progress-bar v-for="item in progressBarDatas" :key='item.title' :progressBarData='item'></progress-bar>
        </div>
        <div class="nodata" v-show="isNoData">
          <div>
            <img src="../assets/images/wushuju.png" />
          </div>
          <span>暂无相关数据</span>
        </div>
        <div class="nomle_bottom" v-show="isNomle_bottom"></div>
      </div>
      <!--可以为列表顶部和底部的加载提示区域提供自定义的 HTML 模板-->
      <div v-show="isNomle_bottom && !isNoData" class="no-data mint-loadmore-bottom">
        <span class="line line1"></span>我是有底线的
        <span class="line line2"></span>
      </div>
      <div slot="top" class="mint-loadmore-top">
        <div class="top_tip">
          <div class="icon">
            <mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner>
          </div>
          <span v-show="topStatus !== 'loading'" class='txt' :class="{ 'rotate': topStatus === 'drop' }">&nbsp;&nbsp;松开刷新</span>
          <span v-show="topStatus === 'loading'" class='txt loading-txt'>正在刷新...</span>
          <div v-show="topStatus !== 'loading'" class="reush_tip">
            <span class="txt">{{rank}}</span>
          </div>
        </div>
      </div>

      <div slot="bottom" class="mint-loadmore-bottom" v-show="isShowDownLoad && !isNoData && !isNomle_bottom">
        <img v-show="bottomStatus !== 'loading'" src=".././assets/images/rush_icon.png" />
        <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">上拉加载更多</span>
        <div v-show="bottomStatus === 'loading'" class="icon">
          <mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner>
        </div>
        <span v-show="bottomStatus === 'loading'">正在加载...</span>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loadmore } from 'mint-ui'
import pageSwiper from '../components/pageSwiper'
import monthSituation from '../components/monthSituation'
import progressBar from '../components/progressBar'

export default {
  data() {
    return {
      topStatus: '',
      bottomStatus: '',
      allLoaded: false,
      isShowDownLoad: false,
      showForm: true,
      updatePage: false,

      isNoData: false, //没有数据
      isNomle_bottom: false, //我是有底线的
      situations: [],
      datas: '',
      dataLists: [],
      swiperDataList: [], //数据列表区域，如今日概况
      situationstoday: {}, //今日概况
      situationsrenwu: {}, //任务达成率
      monthSituationList: {}, //门店的本月概况
      progressBarDatas: [], //排行榜
      showMenDian: false,
      widthData: '3.33rem',
      rank: '',
      detailId: '',
      fixedHeader: true
    }
  },
  computed: {
    ...mapGetters([
      'userid',
      'deviceinfo',
      'orgCodeList',
      'orgCodeName'
    ])
  },
  components: {
    Loadmore,
    pageSwiper,
    monthSituation,
    progressBar
  },
  watch: {
    orgCodeList() {
      this.updatePage = true
      if (this.$route.path == '/home/msite' && this.updatePage) {
        this.saveLoadingShow(true)
        this.getDingyueData()
        this.updatePage = false
      }
    },
    $route(to, from) {
      if (to.path == '/home/msite' && this.updatePage) {
        this.saveLoadingShow(true)
        this.getDingyueData()
        this.updatePage = false
      }
    }
  },
  created() {
    this.saveFooterCurrent(0)
    if (this.orgCodeList.length > 0) {
      this.saveLoadingShow(true)
      this.getDingyueData() //订阅借口
    }
    this.getRank()
  },
  mounted() {
    this.openPage()
  },
  activated(){
    this.$commonApi.collection({ modelNo: 'Subject_1' }) //埋点
  },
  methods: {
    ...mapActions(['saveFooterCurrent', 'saveLoadingShow']),
    getGongList() {
      let token = this.userid
      this.$ajax({
        method: 'get',
        url: '/mc-message/message/notice/list' + '/' + token,
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: JSON.stringify({
          token: this.userid
        })
      })
        .then(res => {
          // 请求成功
          if (res.data.code == 200) {
            if (res.data.data && res.data.data.length > 1) {
              this.detailId = res.data.data[0].id
            }
          } else if (res.data.code == 301) {
            //7天自动退出登录
            this.$logOut({
              rememberpwd: '1'
            }) //退出记住密码
          } else if (res.data.code == 407) {
            //被踢出登录，返回登录页
            this.$logOut()
          } else {
            this.$toast(res.data.msg)
          }
        })
        .catch(function(err) {
          // 请求失败
          console.log(err)
        })
    },
    loadTop() {
      // 刷新
      setTimeout(() => {
        this.getRank()
        this.getDingyueData() //调订阅接口
      }, 1000)
    },
    loadBottom() {
      // 加载更多数据
      setTimeout(() => {
        this.allLoaded = true // 若数据已全部获取完毕
        this.isNomle_bottom = true
        //this.$refs.loadmore.onBottomLoaded();
      }, 500)
    },
    handleTopChange(status) {
      //刷新监听
      this.topStatus = status
    },
    handleBottomChange(status) {
      if (status == 'drop') {
        this.isShowDownLoad = true //显示加载更多文字
      }
      this.bottomStatus = status
    },
    //订阅接口(无组织id)
    getDingyueData() {
      //因暂无分页功能，先设置假的上拉加载效果，初始化为false
      this.isShowDownLoad = false
      this.allLoaded = false
      this.isNomle_bottom = false
      this.isNoData = false
      // //订阅接口
      this.$ajax({
        method: 'post',
        url: '/mc-data/data/list',
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: JSON.stringify({
          token: this.userid,
          orgCodeList: this.orgCodeList,
          subjectId: 1
        })
      })
        .then(res => {
          // 请求成功
          if (res.data.code != 500) {
            this.saveLoadingShow(false)
          }
          if (this.$refs.loadmore) {
            this.$refs.loadmore.onTopLoaded()
          }
          if (res.data.code == 200) {
            this.situations = res.data.data ? res.data.data : []
            var newlist = [],
              swiperDatas = [],
              monthDatas = {},
              pBarDatas = [],
              showMD = false

            for (var i = 0; i < this.situations.length; i++) {
              if (this.situations[i].displayMode == '11') {
                //司南的今日概况
                swiperDatas.push(this.situations[i])
                showMD = false
              } else if (this.situations[i].displayMode == '14') {
                //门店的今日概况
                swiperDatas.push(this.situations[i])
                showMD = true
              } else if (this.situations[i].displayMode == '15') {
                //门店的本月概况
                monthDatas = this.situations[i]
              } else if (this.situations[i].displayMode == '23') {
                //排行榜
                pBarDatas.push(this.situations[i])
              } else {
                newlist.push(this.situations[i])
              }
            }
            this.dataLists = []
            this.swiperDataList = []
            this.progressBarDatas = []
            this.$nextTick(() => {
              this.dataLists = this.dataLists.concat(newlist)
              this.swiperDataList = swiperDatas
              this.progressBarDatas = pBarDatas
              this.showMenDian = showMD
              this.monthSituationList = monthDatas
              if (
                this.swiperDataList.length <= 0 &&
                this.dataLists.length <= 0 &&
                !this.monthSituationList.title &&
                this.progressBarDatas.length <= 0
              ) {
                this.isNoData = true
              } else {
                this.isNoData = false
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
        })
        .catch(err => {
          if (this.$refs.loadmore) {
            this.$refs.loadmore.onTopLoaded()
          }
          console.log(err)
        })
    },
    //获得排名
    getRank() {
      this.$ajax({
        method: 'get',
        url: '/mc-message/message/refresh/' + this.userid,
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      })
        .then(res => {
          if (res.data.code == 200) {
            res.data.data ? (this.rank = res.data.data.title) : ''
          } else {
            console.log(res.data.msg)
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    openPage() {
      this.$nextTick(() => {
        setTimeout(() => {
          // 告诉原生，我的页面加载完成，可以关闭你的启动页面了;首次启动APP，延迟启动页面展示关闭启动页交互：
          if (window.webkit) {
            window.webkit.messageHandlers.removePromptView.postMessage({
              type: '1'
            })
          }
          if (window.messageHandlers) {
            window.messageHandlers.closeStart('close')
          }
          if (localStorage.getItem('changing') !== '1') {
            // 原生过渡层消失
            if (window.webkit) {
              // “1”标识显示原生加载页面  “2”是移除原生加载页面
              window.webkit.messageHandlers.showOrCloseLoadingView.postMessage({
                type: '2'
              })
            }
            if (window.messageHandlers) {
              window.messageHandlers.stopLoading('stop')
            }
          }
        }, 1000)
      })
    }
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../assets/stylus/methods.styl"
.loadmores
  background-color #f6f8f9
  margin-bottom 0
  iphonefixpaddingb(68px)
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

.mint-loadmore-bottom
  display flex
  align-items center
  text-align center
  justify-content center
  margin-bottom -20px

  .icon
    display inline-block
    margin 0 10px

img
  width 26px
  height 26px
  margin-right 2px

span
  ont-family PingFangSC-Regular
  font-size 14px
  color #29354D

.msite_wrap
  width 100%
  height 100%
  background-color #f6f8f9
  overflow hidden

  .swiper
    height 130px
    width 100%

    img
      width 100%
      height 100%

  .renwu_finish
    width 100%
    height 54px
    margin-top 16px
    line-height 54px
    background-color #FFFFFF

    span
      font-family PingFangSC-Medium
      font-size 18px
      color #29354D
      margin-left 19px
      letter-spacing 0

    .biao
      width 28px
      height 28px
      margin-top 14px
      float right
      margin-right 20px

    .qie
      width 28px
      height 28px
      margin-top 14px
      float right
      margin-right 20px

  .renwu_open
    width 100%
    margin-top 1px

    .form_show
      width 100%
      border-bottom 1px solid #ffffff

      .form_top
        width 100%
        height 36px
        display flex
        line-height 36px
        background-color #E7F1FF

        .form_top_kongge
          width 93.75px
          float left

        ul
          list-style none
          width 100%
          display flex

          li
            float left
            flex 1
            text-align center

        span
          font-family PingFangSC-Regular
          font-size 14px
          color #29354D
          letter-spacing 0

      .form_bottom
        width 100%
        display flex
        font-size 14px

        .form_bottom_left
          list-style none
          width 93.75px
          margin 0
          padding 0

          li
            height 36px
            text-align center
            line-height 36px
            color black

          .bgchange
            background-color white

        .form_bottom_right
          list-style none
          margin 0
          padding 0
          display flex
          width 100%

          .form_bottom_right_li
            text-align center
            color black
            float left
            flex 1

            .form_bottom_right_ul
              list-style none
              margin 0
              padding 0

              li
                line-height 36px
                display float
                height 36px

              .bgchange
                background-color white

        .bgrow
          background-color white

        span
          ont-family PingFangSC-Regular
          font-size 14px
          color #29354D
          letter-spacing 0
          text-align center
          line-height 36px
          flex 1

    .echart_tu
      min_width 375px
      width 100vw
      padding-top 10px
      height 300px
      background-color #ffffff
      color #000000

  .nodata
    width 100%
    height 100%
    margin-top 100px
    text-align center
    line-height 20px

    img
      width 214px
      height 157px

    span
      font-family PingFangSC-Regular
      font-size 14px
      color #909090
      letter-spacing 0
      text-align center

  .nomle_bottom
    width 100%
    text-align center

.fixed-header
  position fixed
  top 0
  left 0
  z-index 999999999999
  width 100%
  background #f6f8f9

.fixed-container
  iphonefixpadding(64px)



.no-data
  height 54px
  line-height 54px
  font-size 14px
  color #909090
  display flex
  align-items center
  justify-content center

  span
    display inline-block
    width 68px
    height 3px
    margin 0 20px
    background-size 68px 3px
    background-repeat no-repeat

  span.line1
    background-image url('../assets/images/line1.png')

  span.line2
    background-image url('../assets/images/line2.png')

.mint-loadmore-bottom
  height 40px
  line-height 40px
  display flex
  align-items center
  text-align center
  justify-content center
</style>
