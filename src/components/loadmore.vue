<template>
  <mt-loadmore ref="loadmore" class="loadmores" :top-method="loadTop" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded||isNoData||!needBottom" :maxDistance="90">
    <slot>

    </slot>
    <!--可以为列表顶部和底部的加载提示区域提供自定义的 HTML 模板-->
    <div v-show="allLoaded && !isNoData" class="no-data mint-loadmore-bottom">
      <span class="line line1"></span>我是有底线的
      <span class="line line2"></span>
    </div>
    <div slot="top" class="mint-loadmore-top">
      <div class="top_tip">
        <div class="icon" v-show="topStatus === 'loading'">
          <mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner>
        </div>
        <span v-show="topStatus === 'pull'" class='txt'>&nbsp;&nbsp;下拉刷新</span>
        <span v-show="topStatus === 'drop'" class='txt'>&nbsp;&nbsp;松开刷新</span>
        <span v-show="topStatus === 'loading'" class='txt loading-txt'>正在刷新...</span>
        <span v-show="topStatus === 'succeeded'" class='txt'>刷新成功</span>
        <span v-show="topStatus === 'failed'" class='txt'>刷新失败</span>
        <div v-show="topStatus !== 'loading'" class="reush_tip">
          <span class="txt">{{rank}}</span>
        </div>
      </div>
    </div>

    <div slot="bottom" class="mint-loadmore-bottom" v-show="isShowDownLoad && !allLoaded && !isNoData">
      <img v-show="bottomStatus !== 'loading'" src=".././assets/images/rush_icon.png" />
      <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">上拉加载更多</span>
      <div v-show="bottomStatus === 'loading'" class="icon">
        <mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner>
      </div>
      <span v-show="bottomStatus === 'loading'">正在加载...</span>
    </div>
  </mt-loadmore>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loadmore } from 'mint-ui'

export default {
  data() {
    return {
      topStatus: '', //下拉刷新状态
      bottomStatus: '', //上拉加载状态
      isShowDownLoad: false,//显示加载更多文字
      isNomle_bottom: false //我是有底线的
    }
  },
  props:{
    //是否需要下拉加载
    needBottom:{
      type:Boolean,
      default:false
    },
    //上拉加载到底
    allLoaded:{
      type:Boolean,
      default:false
    },
    //上部排名
    rank:{
      default:''
    },
    isNoData:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    ...mapGetters(['isIphoneX'])
  },
  components: {
    Loadmore
  },
  methods: {
    loadTop() {
      this.$emit('loadTop')
    },
    changeTopStatus(status) {
      this.topStatus = status //'succeeded'刷新成功， ‘failed’刷新失败
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded()
      }, 1000)
    },
    loadBottom() {
      this.$emit('loadBottom')
      // 加载更多数据
      setTimeout(() => {
        this.$refs.loadmore.onBottomLoaded();
      }, 500)
    },
    handleTopChange(status) {
      //刷新监听
      this.topStatus = status
      if(status !=='pull'){
        this.isShowDownLoad = false //初始化底部加载显示状态为false
      }
    },
    handleBottomChange(status) {
      if (status == 'drop') {
        this.isShowDownLoad = true //显示加载更多文字
      }
      this.bottomStatus = status
    }
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
.loadmores
  position relative
  background-color #f6f8f9
  padding-bottom 68px
  margin-bottom 0

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
        padding-left 5px
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
  padding-top 64px

.iphonex-loadmores
  padding-bottom 88px

.iphonex-tab-container
  padding-top 84px

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
