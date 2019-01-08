<template>
  <div class="container tab-container" :class="{'iphonex-tab-container':isIphoneX,'iphonex-loadmores':isIphoneX}">
    <loadmore ref="myloadmore" @loadTop='loadTop'>
      <div class="msite_wrap">
        <tab-echarts ref="tabEcharts" :currentView="currentView" @changeLoadState='changeLoadState' @changeNoData='changeNoData' :subjectId='subjectId'></tab-echarts>
      </div>
    </loadmore>
    <div class="topBar" :class="isIphoneX?'iphonex-top-bar':''" id="goTop">
      <img src="@/assets/images/zhiding.png" alt="" class="goTop" v-show="goTopShow" @click="goTop">
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import loadmore from '../../../components/loadmore'

export default {
  data() {
    return {
      currentView: '/home/performance/rose',
      subjectId: JSON.parse(localStorage.getItem('performanceTabsIds'))[2],
      allLoaded: false,
      isNoData: false, //没有数据
      bottomLoading: false, //底部滚动加载中图标
      isNomle_bottom: false, //我是有底线的

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
    window.scrollTo(0, 0)
    this.addListener()
    this.$commonApi.collection({
      modelNo:
        'Subject_' + JSON.parse(localStorage.getItem('performanceTabsIds'))[2]
    }) //埋点
  },
  deactivated() {
    this.removeListener()
  },
  watch: {
    selected() {
      this.toggleTabs(this.selected)
    }
  },
  methods: {
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
      if (scrollTop + windowHeight >= scrollHeight - 100 && scrollTop > 10) {
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
@import 'style.styl'
</style>

