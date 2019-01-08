<template>
  <div class="lend_plan_list_content">
    <div class="lplc_content">
      <div class="jinfu_title">
        <div class="jt_left" @click="goBack">
          <img src="../../assets/images/backnew.png" alt="">
        </div>
        <div class="jt_center">
          <span>出借计划分布</span>
        </div>
      </div>
      <div class="nav-tab" :class="isIphoneX?'iphonex_content_top':''">
        <mt-navbar v-model="selected" class="tab">
          <mt-tab-item id="today" @click="toggleTabs('today');">
            <span class="tab-name">今日</span>
            <span class="selected_line"></span>
          </mt-tab-item>
          <mt-tab-item id="month" @click="toggleTabs('month');">
            <span class="tab-name">本月</span>
            <span class="selected_line"></span>
          </mt-tab-item>
        </mt-navbar>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      selected: 'today'
    }
  },
  created() {
    if (this.$route.path == '/lendPlanList/today') {
      this.selected = 'today'
    } else if (this.$route.path == '/lendPlanList/month') {
      this.selected = 'month'
    } else {
      this.selected = 'month'
    }
  },
  watch: {
    selected() {
      this.toggleTabs(this.selected)
    }
  },
  computed: {},
  methods: {
    goBack() {
      //返回
      //根据currentType判断返回到入口页面
      this.$router.push('/achievement/' + this.$route.query.currentType)
    },
    toggleTabs(tabText) {
      window.scrollTo(0, 0)
      this.selected = tabText
      this.$router.push(
        '/lendPlanList/' +
          tabText +
          '?currentType=' +
          this.$route.query.currentType
      )
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/methods'

.lplc_content
  position fixed
  width 100%
  top 0px
  z-index 2

.jt_center
  text-align center
  font-size 20px
  color #FFFFFF
  line-height 30px
  height 30px

  span
    color #fff
    font-size 18px

  img
    width 20px
    vertical-align text-top

.jt_left
  position absolute
  left 21px

.jt_left img
  width 25px

.jinfu_title
  position relative
  width 100%
  height 40px
  line-height 40px
  iphonefixpadding(20px)
  text-align center
  background-image url('../../assets/images/zhanbaotitle.png')
  background-repeat no-repeat
  background-size 100% 100%

.nav-tab
  width 100%
  background #5B96FF
  position fixed
  left 0
  iphonefixtop(59px)
  z-index 9999

  .tab
    width 32%
    margin 0 auto
    background #5b96ff

    .mint-tab-item
      padding 10px 0 6px 0

      &.is-selected
        position relative
        border-bottom none
        margin-bottom 0

        .mint-tab-item-label
          position relative

          .selected_line
            display block
            width 50%
            height 2px
            margin 5px auto 0
            background #fff

          .tab-name
            font-family PingFangSC-Semibold
            color #fff
            font-size 16px
            text-align right

      .tab-name
        font-size 16px
        color #D0ECFF
        font-weight normal
        font-family PingFangSC-Medium
        text-align right
</style>

