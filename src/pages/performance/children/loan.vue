<template>
  <div>
    <mt-loadmore  class="loadmores tab-container"  :top-method="loadTop"  ref="loadmore"  @top-status-change="handleTopChange"  :maxDistance="90">
        <div class="msite_wrap">
          <tab-echarts  ref="tabEcharts" :currentView="currentView" @changeLoadState='changeLoadState' @changeNoData='changeNoData'  :subjectId='subjectId'></tab-echarts>
        </div>
        <div v-show="isNomle_bottom && !isNoData" class="no-data mint-loadmore-bottom"><span class="line line1"></span>我是有底线的<span class="line line2"></span></div>
        <div slot="top" class="mint-loadmore-top">
          <div class="icon"><mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner></div>
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">松开刷新</span>
          <span v-show="topStatus === 'loading'">正在刷新...</span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom" v-show="bottomLoading">
          <div class="icon"><mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner></div>
          <span>正在加载...</span>
        </div>
      </mt-loadmore>
      <div class="topBar"  id="goTop">
        <img src="@/assets/images/zhiding.png" alt="" class="goTop" v-show="goTopShow" @click="goTop">
      </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
  import {Loadmore} from 'mint-ui'

  export default {
    data () {
      return {
        currentView: '/home/performance/loan',
        subjectId:JSON.parse(localStorage.getItem('performanceTabsIds'))[3],

        topStatus: '',
        bottomStatus: '',
        allLoaded: false,
        isShowDownLoad: false,
        bottomLoading:false,//底部滚动加载中图标
        isNoData:false,//没有数据
        isNomle_bottom:false//我是有底线的

        ,fixedHeader:true,
        goTopShow:false
      }
    },
    computed:{
      ...mapGetters(['userid'])
    },
    components: {
      Loadmore
    },
    activated(){
      window.scrollTo(0,0)
      this.addListener()
      this.$commonApi.collection({modelNo: 'Subject_'+JSON.parse(localStorage.getItem('performanceTabsIds'))[3]}) //埋点
    },
    deactivated(){
      this.removeListener()
    },
    watch:{
      selected(){
        this.toggleTabs(this.selected)
      }
    },
    methods : {
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
        //滚动加载更多
        if(scrollTop + windowHeight >= scrollHeight-100  && scrollTop>10){this.loadBottom() }
        //回到顶部
        if(scrollTop>400){
          this.goTopShow=true
          this.scrollTop = scrollTop
        }
        else{
          this.goTopShow=false
        }
      },
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
      loadTop() { // 下拉刷新
        this.$refs.tabEcharts.dataList(1,()=>{
          this.$refs.loadmore.onTopLoaded()
        },()=>{
          this.$refs.loadmore.onTopLoaded()
        });
      },
      loadBottom() {// 加载更多数据
        if(this.isNomle_bottom) return;
        this.bottomLoading = true
        setTimeout(()=>{
           this.$refs.tabEcharts.dataList()
        },500)
      },
      handleTopChange(status) {//刷新监听
        this.topStatus = status;
      },
      changeNoData(status){ //是否是无数据状态或者小于两条数据
        this.isNoData=status
      },
      changeLoadState(status){ //改变当前组件是否加载完毕状态，（供子组件调用）
        // console.log("allLoaded:"+status)
        this.bottomLoading = false
        this.allLoaded = status;
        if(this.allLoaded){
          this.isNomle_bottom = true
        }
        else{
          this.isNomle_bottom = false
        }
      }
    },
  };
</script>

<style lang="stylus" scoped>
  @import 'style.styl'
</style>

