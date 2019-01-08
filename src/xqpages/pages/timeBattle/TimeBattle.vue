<template>
  <div class="timeBattle_warp">
    <logo-head :rightHelp="true"></logo-head>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  /**
   * 理财首页需要注意的点： 1. ****页面数据接口请求成功后调用原生的“关闭启动页”的方法
   * 2. 页面h5版本号定时请求，供更新生产环境后自动reload使用（reload前调用原生遮罩做过渡，页面加载完成后关闭过渡页）
   */
  import {mapActions, mapGetters } from 'vuex'
  import LogoHead from "../../components/logoHead";
  export default {
    components: {LogoHead},
    data() {
      return {
        timerVersion: null, //版本号请求计时器
      }
    },
    computed: {
      ...mapGetters(['h5Version','userid'])
    },
    activated() {
      this.saveFooterCurrent(0)
      this.timerVersion = setInterval(() => {
        this.getSoftVersion()
      }, 5 * 1000)
    },
    deactivated() {
      if (this.timerVersion) {
        clearInterval(this.timerVersion)
      }
    },
    methods: {
      ...mapActions(['saveFooterCurrent']),
      getSoftVersion() {
        // 获取当前h5的版本号
        this.$ajax({
          method: 'post',
          url: '/mc-auth/sys/soft/version',
          dataType: 'json',
          headers: { 'Content-Type': 'application/json;charset=UTF-8' },
          data: {
            sysVersion: ''
          }
        })
          .then(res => {
            // 请求成功
            if (res.data.code == 200) {
              if (this.h5Version !== res.data.data.version) {
                // 原生过渡层出现
                if (window.webkit) {
                  // “1”标识显示原生加载页面  “2”是移除原生加载页面
                  window.webkit.messageHandlers.showOrCloseLoadingView.postMessage(
                    {
                      type: '1'
                    }
                  )
                }
                if (window.messageHandlers) {
                  window.messageHandlers.startLoading('start')
                }
                //刷新页面
                setTimeout(() => {
                  location.reload()
                }, 0)
              }
            }
          })
          .catch(function(err) {
            console.log(err)
          })
      },


    }
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
