<template>
  <div class="main_wrap">
    <header-nav :activeId='2' :type="1" :fixedHead="true"></header-nav>
    <mt-loadmore class="loadmorestwo" :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore" :maxDistance="90">
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
      <div class="photo_wrap">
        <div class="photo_content">
          <div class="text">
            <span>历史累计</span>
          </div>
          <div class="img_content">
            <img src="../../../assets/images/lishi.png">
          </div>
        </div>

      </div>
      <div class="history_item_wrap">
        <ul>
          <li v-for="(item,index) in historyList" :class="localNow(index)">
            <img v-if="index===0" class="cart" src="../../../assets/images/chengse.png" />
            <div>
              <span class="text">{{item.name}}<span class="yuan">（{{item.unit}}）</span></span>
              <span class="num">{{item.value|numToThousands}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="dibu_lishi"></div>
      <!--<history-list-item :historyList="historyList"></history-list-item>-->
    </mt-loadmore>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import headerNav from '@/xqpages/components/headerNav'
import { Loadmore } from 'mint-ui'
// import HistoryListItem from "../../../components/historyListItem";
export default {
  data() {
    return {
      historyList: [],
      topStatus: ''
    }
  },
  mounted() {
    this.battleList()
  },
  methods: {
    ...mapActions(['saveLoadingShow']),
    battleList() {
      //历史接口
      this.$ajax({
        method: 'post',
        url: '/saasbi/cockpit/xiangqian/list',
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: JSON.stringify({
          token: localStorage.getItem('userid'),
          // subjectId: '409',
          subjectId: this.timeBattleHomeNavs[2].id,
          masterNo: '04'
        })
      })
        .then(
          res => {
            if (res.data.code == 200) {
              if (res.data.code != 500) {
                this.saveLoadingShow(false)
              }
              if (res.data.data && res.data.data.length > 0) {
                this.historyList = res.data.data[0].datas
              }
              this.$refs.loadmore.onTopLoaded()
            }
          },
          reject => {}
        )
        .catch(err => {
          // 请求失败
          console.log(err)
        })
    },
    localNow(index) {
      if (index === 0) {
        return 'isFirstItem'
      } else if (index === this.historyList.length - 1) {
        return 'isLastItem'
      }
    },
    loadTop() {
      //下拉刷新
      setTimeout(() => {
        this.saveLoadingShow(true)
        this.battleList()
      }, 1000)
    },
    handleTopChange(status) {
      this.topStatus = status
    }
  },
  computed: {
    ...mapGetters(['userid', 'isIphoneX','timeBattleHomeNavs'])
  },
  components: {
    // HistoryListItem,
    headerNav,
    Loadmore
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus"  scoped>
@import '../../../../assets/css/loaders.css'

@import "./index.styl"

  .photo_wrap
    width 100%
    height 200px
    z-index 2
    background #5b96ff url('../../../assets/images/background@2x_02.png') no-repeat bottom
    .photo_content
     width 93%
     padding-left 3.5%
     padding-right 3.5%
     height 190px
     .text
      width 100%
      height 36px
      background-color #fff
      background-image url("../../../assets/images/lishidise.png")
      background-size 100% 100%
      background-repeat no-repeat
      border-top-left-radius 5px
      border-top-right-radius 5px
      span
       float left
       font-family PingFangSC-Regular
       font-size 16px
       color #010E4F
       padding-left 17px
       padding-top 14px
     .img_content
       height 154px
       padding 0 38px;
       background-color #fff
       z-index 3
       border-bottom-left-radius 5px
       border-bottom-right-radius 5px
       box-shadow: 0 4px 8px 2px rgba(137,174,240,0.15);
       img
          width 100%
          height auto

  .history_item_wrap
    padding 8px 13px 0px 13px
    background-color #f6f8f9

    ul
      list-style none

      .isFirstItem
        border-top-left-radius 5px
        border-top-right-radius 5px

      .isLastItem
        border-bottom 0px dashed #E6E6E6
        border-bottom-left-radius 5px
        border-bottom-right-radius 5px

      li
        position relative
        width 100%
        height 69px
        background-color #fff
        border-bottom 1px dashed #E6E6E6

        .cart
          position absolute
          width 4px
          height 40px

        div
          width 100%
          height 100%

          .num
            font-family CenturyGothic
            font-size 20px
            color #010E4F
            float right
            padding-right 10px
            height 69px
            line-height 69px

          .text
            font-family PingFangSC-Regular
            font-size 16px
            color #A6A6A6
            float left
            padding-left 10px
            height 69px
            line-height 69px

          .text:after
            content ''
            display block
            position absolute
            width 1px
            border-right 1px dashed #E6E6E6
            height 24px
            top 24px
            left 60%

    .dibu
      width 100%
      height 50px
      background-color #f6f8f9

  .dibu_lishi
    width 100%
    height 64px
    background-color #f6f8f9
  .dibu_lishi_iphoneX
    height 84px
</style>
