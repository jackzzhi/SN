<template>
  <div>
    <div v-show="fixedHeader" class="fixed-header">
      <common-header :newsShow='false'></common-header>
    </div>
    <div class="container tab-container" :class="{'iphonex-tab-container':isIphoneX,'iphonex-loadmores':isIphoneX}">
      <loadmore ref="myloadmore" @loadTop='loadTop'>
        <div class="msite_wrap">
          <tab-echarts ref="tabEcharts" :currentView="currentView" @changeLoadState='changeLoadState' @changeNoData='changeNoData' :subjectId='3'></tab-echarts>
        </div>
      </loadmore>
      <div class="topBar" :class="isIphoneX?'iphonex-top-bar':''" id="goTop">
        <img src="@/assets/images/zhiding.png" alt="" class="goTop" v-show="goTopShow" @click="goTop">
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import loadmore from '../components/loadmore'

export default {
  data() {
    return {
      currentView: '/home/riskData',
      allLoaded: false,
      isShowDownLoad: false,
      bottomLoading: false, //底部滚动加载中图标
      isNoData: false, //没有数据
      isNomle_bottom: false, //我是有底线的

      fixedHeader: true,
      goTopShow: false
    }
  },
  computed: {
    ...mapGetters(['userid', 'isIphoneX'])
  },
  components: {
    loadmore
  },
  activated() {
    this.saveFooterCurrent(2)
    window.scrollTo(0, 0)
    this.addListener()
    this.$commonApi.collection({ modelNo: 'Subject_3' }) //埋点
  },
  deactivated() {
    this.removeListener()
  },
  methods: {
    ...mapActions(['saveFooterCurrent']),
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
      //滚动加载更多
      if (scrollTop + windowHeight >= scrollHeight - 100) {
        this.loadBottom()
      }
      //回到顶部
      if (scrollTop > 400) {
        this.goTopShow = true
        this.scrollTop = scrollTop
      } else {
        this.goTopShow = false
      }
    },
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
    loadTop() {
      // 下拉刷新
      this.$refs.tabEcharts.dataList(
        1,
        () => {
          this.$refs.myloadmore.changeTopStatus('succeeded')
        },
        () => {
          this.$refs.myloadmore.changeTopStatus('failed')
        }
      )
    },
    loadBottom() {
      // 加载更多数据
      if (this.isNomle_bottom) return
      this.bottomLoading = true
      setTimeout(() => {
        this.$refs.tabEcharts.dataList()
      }, 500)
    },
    changeNoData(status) {
      //是否是无数据状态或者小于两条数据
      this.isNoData = status
    },
    changeLoadState(status) {
      //改变当前组件是否加载完毕状态，（供子组件调用）
      // console.log("allLoaded:"+status)
      this.bottomLoading = false
      this.allLoaded = status
      if (this.allLoaded) {
        this.isNomle_bottom = true
      } else {
        this.isNomle_bottom = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import 'performance/children/style.styl'

.fixed-header
  position fixed
  top 0
  left 0
  z-index 999999999999
  width 100%
  background #f6f8f9

.fixed-ios-header
  position -webkit-sticky
  position sticky
  top 0
  left 0
  z-index 999999999999
  width 100%
  background #f6f8f9

.tab-container
  padding-top 64px

.tab-container.iphonex-tab-container
  padding-top 84px
</style>