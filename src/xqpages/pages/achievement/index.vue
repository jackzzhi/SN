<template>
  <div>
   <logo-head :rightHelp="false"></logo-head>

    <!-- 缓存一级页面 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loadmore } from 'mint-ui'
import footerGuide from '@/components/footer/footerGuide'
import logoHead from '../../components/logoHead'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['userid', 'h5Version', 'isIphoneX'])
  },
  beforeCreate() {
    if (localStorage.getItem('changing') === '1') {
      //系统更新维护或者升级后，需要重新刷新一下页面，加载最新的页面代码
      localStorage.setItem('changing', '0')
      // 原生过渡层出现
      if (window.webkit) {
        // “1”标识显示原生加载页面  “2”是移除原生加载页面
        window.webkit.messageHandlers.showOrCloseLoadingView.postMessage({
          type: '1'
        })
      }
      if (window.messageHandlers) {
        window.messageHandlers.startLoading('start')
      }
    }
  },
  created() {
    this.saveFooterCurrent(1)
    //原生交互
    if (window.webkit) {
      window.webkit.messageHandlers.changeStatusBarColor.postMessage({
        type: '0'
      })
    }
    if (window.messageHandlers) {
      window.messageHandlers.changeStatusBarColor('0')
    }
  },
  methods: {
    ...mapActions(['saveFooterCurrent', 'saveLoadingShow']),
    news() {
      //进入消息列表
      this.$router.push('/news/newsAndNotice')
    }
  },
  components:{logoHead}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.jinfu_content
  width 100%

  .content_warp
    width 100%
    background-color #fff

    .top_one
      width 100%
      background-image url('../../assets/images/backgrou.png')
      background-repeat no-repeat
      background-size 100%
      height 290px

      .top_one_first_wrap
        display flex

        .today_chujie
          padding-top 27px
          padding-left 32px
          font-family PingFangSC-Medium
          font-size 18px
          font-weight normal
          font-stretch normal
          color #ffffff

        .top_one_first_right
          flex 1
          padding-top 27px

          img
            width 12px
            height 12px
            padding-top 2px
            float right

          span
            font-family PingFangSC-Regular
            font-size 16px
            color #FFFFFF
            float right
            padding-left 8px
            padding-right 27px

      .bijiao
        width 100%
        height 20px
        margin-top 5px

        span
          font-family PingFangSC-Regular
          font-size 14px
          color #FFFFFF
          float right
          padding-right 28px

      .top_one_second_wrap
        width 100%
        margin-top 10px
        text-align center

        .money
          font-size 17px
          color #FFFFFF

        .number
          font-family DINCondensed-Bold
          font-size 60px
          color #FFFFFF

      .top_one_bottom_wrap
        width 100%
        margin-top 15px
        text-align center

        span
          font-family PingFangSC-Regular
          font-size 14px
          color #FFFFFF

      .top_one_zuori_chujie_title
        margin-top 40px
        font-size 13px
        color #2D7DFF
        font-family PingFangSC-Medium
        padding-left 32px

      .top_one_zuori_chujie_number
        padding-left 32px
        font-size 22px
        padding-top 13px
        color #29354D
        font-family DINAlternate-Bold
        padding-bottom 12px

      .today_chujie_number
        font-family DINAlternate-Bold
        font-size 30px
        width 496px
        padding-top 20px
        font-weight normal
        font-stretch normal
        padding-bottom 12px
        color #5c93fa

      .line
        width auto
        margin-right 20px
        height 0.5px
        background-color #e4e4e4

    .top_two
      width 100%
      background-image url('../../assets/images/cheng.png')
      background-repeat no-repeat
      background-size 100%
      height 220px

      .top_one_first_wrap_two
        display flex

        .today_chujie_two
          padding-top 27px
          padding-left 32px
          font-family PingFangSC-Medium
          font-size 18px
          font-weight normal
          font-stretch normal
          color #ffffff

        .top_one_first_right
          flex 1
          padding-top 27px

          img
            width 12px
            height 12px
            padding-top 2px
            float right

          span
            font-family PingFangSC-Regular
            font-size 16px
            color #FFFFFF
            float right
            padding-left 8px
            padding-right 27px

      .bijiao
        width 100%
        height 20px
        margin-top 5px

        span
          font-family PingFangSC-Regular
          font-size 14px
          color #FFFFFF
          float right
          padding-right 28px

      .top_one_second_wrap
        margin-top 10px
        text-align center

        .money
          font-size 17px
          color #FFFFFF

        .number
          font-family DINCondensed-Bold
          font-size 60px
          color #FFFFFF

      .top_one_bottom_wrap
        width 100%
        margin-top 15px
        text-align center

        span
          font-family PingFangSC-Regular
          font-size 14px
          color #FFFFFF

    .today_chujie_number_two
      color #fca53c
      font-size 25px
      font-family DINAlternate-Bold
      padding-top 10px
      padding-bottom 6px

    .msite_iphonex_bottmo_title
      padding-top 20px
      padding-bottom 12px

    .line
      width auto
      margin-right 20px
      height 0.5px
      background-color #e4e4e4

    .list_item_wrap
      width 100%
      padding-left 10px
      position relative

      .title
        padding-top 12px
        font-size 12px
        color #858585
        font-family PingFangSC-Medium
        padding-left 10px

      .number
        padding-left 12px
        font-size 20px
        padding-top 12px
        color #000
        font-family DINAlternate-Bold
        padding-bottom 12px

      .msite_iphonex_number
        padding-bottom 16px
        padding-top 16px

      .list_item_wrap_right
        position absolute
        right 25px
        top 40px

        img
          width 11px
          height 11px

        span
          font-family PingFangSC-Regular
          font-size 16px
          color #38415C

      .line
        width auto
        margin-right 10px
        height 0.5px
        margin-left 10px
        background-color #e4e4e4

    .list_item_wrap_two
      width 100%
      position relative
      padding-left 10px

      .title_two
        padding-top 10px
        font-size 12px
        color #858585
        padding-left 10px
        font-family PingFangSC-Medium

      .number_two
        padding-left 10px
        font-size 20px
        padding-top 10px
        font-weight bold
        color #000
        font-family DINAlternate-Bold
        padding-bottom 10px

      .msite_iphonex_bottmo_list
        padding-top 14px
        padding-bottom 14px

      .list_item_wrap_right_two
        position absolute
        right 25px
        top 35px

        img
          width 11px
          height 11px

        span
          font-family PingFangSC-Regular
          font-size 16px
          color #38415C

      .line_two
        width auto
        margin-right 10px
        height 0.5px
        margin-left 10px
        background-color #e4e4e4

  .magin_top
    margin-top 5px

  .msite_iphonex_magin_top
    margin-top 10px

.dibu
  height 40px
  text-align center
  line-height 40px

  span
    color gray
    font-size 12px

.iphonex-bottom
  height 60px
  text-align center
  line-height 60px

  span
    color gray
    font-size 12px

.dibubottom
  width 100%
  height 60px

.nodata
  width 100%
  height 100%
  margin-top 120px
  text-align center
  line-height 30px

  img
    width 214px
    height 157px

  span
    font-family PingFangSC-Regular
    font-size 14px
    color #909090
    letter-spacing 0
    text-align center
</style>
