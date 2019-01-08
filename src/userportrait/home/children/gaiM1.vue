<template>
  <div class="gaim_wrap"  :class="isIphoneX?'iphonex_gaim_wrap':''">
    <loadmore-blue  v-show="!isNoData" ref="myloadmore" class="loadmorestwo" @loadTop='loadTop'   :isNoData='isNoData' :maxDistance="90">

    <div class="content-box">
        <div class="custome_tab">
          <div class="gaimao"><span :class="selectActiveGai?'active':''" @click="changeRouterOne">客群概貌</span></div>
          <div class="fenxi"><span :class="selectActiveFen?'active':''" @click="changeRouterTwo">客群分析</span></div>
          <!-- <div class="gaimao"><span>客群概貌</span></div> -->
        </div>
        <allecharts v-for="(item,index) in dataList" :chartData="item" :key="index"  :colorData="colorList[index-1]"></allecharts>
      </div>
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

    </loadmore-blue>
    <div class="nodata" v-show="isNoData">
      <div>
        <img src="../../../assets/images/wushuju.png"/>
      </div>
      <span>暂无相关数据</span>
    </div>
    <loading :loadingShow='loadingShow'></loading>
    <div class="topBar" :class="isIphoneX?'iphonex-top-bar':''" id="goTop">
      <img src="../../assets/images/zhiding.png" alt="" class="goTop" v-show="goTopShow" @click="goTop">
    </div>
  </div>
</template>

<script>
  import allecharts from '../../components/allecharts/allecharts'
  import {mapGetters} from 'vuex'
  import { Loadmore } from 'mint-ui'
  import loading from '../../../components/loading'
  import loadmoreBlue from '../../../components/loadmoreBlue'
    export default {
      data(){
        return{
          selectActiveGai:true,
          selectActiveFen:false,
          topStatus: '',
          goTopShow:false,
          dataList:[],
          isNoData:false,
          loadingShow:true,
          colorList:['#E77296','#75D79B','#1D6EFF','#9A98F2','#F6C583']
        }
      },
      created(){
        // 顶部状态栏展示颜色参数说明：type：“0”标识黑色；“1”标识白色
        if(this.isIOS){
          window.webkit.messageHandlers.changeStatusBarColor.postMessage({type:'0'})
        }
        if(this.isAndroid){
          window.messageHandlers.changeStatusBarColor("0")
        }
      },
      mounted(){
        window.scrollTo(0,0)
        this.addListener()
        this.yestedayTime()

      },
      computed:{
        ...mapGetters(['userid','isIphoneX','orgCodeList'])
      },
      deactivated(){
        this.removeListener()
      },
      methods:{
        yestedayTime(){
          //接口获取昨天的时间
          this.$ajax({
            method: 'get',
            url: '/mc-data/date/lastday',
            dataType: 'json',
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
          })
            .then(res => {
              this.$refs.myloadmore.changeTopStatus('succeeded')
              if (res.data.code == 200) {
                this.allList(res.data.data)
              }
            })
            .catch(err => {
              this.$refs.myloadmore.changeTopStatus('failed')
              console.log(err)
            })
        },
        allList(date){
          //昨天的时间
          let yesTimer = date
          //接口
          this.$ajax({method: 'post',url: '/mc-data/data/list',dataType: 'json', headers: {'Content-Type': 'application/json;charset=UTF-8'},
            data:JSON.stringify({
              token: this.userid,
              orgCodeList:this.orgCodeList,
              subjectId:9,
              date:yesTimer,
              masterNo:'01',
              currentPage:1,
              pageSize:6
            }),
          }).then(res=>{  // 请求成功
            this.$refs.myloadmore.changeTopStatus('succeeded')
            if(res.data.code == 200){
              this.loadingShow=false
              // this.dataList=res.data.data
              if(this.dataList==null||this.dataList.length<1){
                this.dataList=res.data.data
              }else{
                this.dataList=[]
                this.$nextTick(()=>{
                  this.dataList=res.data.data
                })
              }
              if(res.data.data==null||res.data.data.length<1){
                this.isNoData=true
              }else{
                this.isNoData=false
              }
            }
            else if(res.data.code == 301){//7天自动退出登录
              this.$logOut({
                rememberpwd:'1'
              }); //退出记住密码
            }
            else if(res.data.code == 407){ //被踢出登录，返回登录页
              this.$logOut()
            }else{
              this.$toast(res.data.msg)
            }
          }).catch(function(err){// 请求失败
            this.$refs.myloadmore.changeTopStatus('failed')
            console.log(err)
          })
        },
        changeRouterOne(){
          this.selectActiveFen = false;
          this.selectActiveGai = true;
          this.$router.push('/userportraithome/gaim')
          this.$emit('count', 0)
        },
        changeRouterTwo(){
          this.selectActiveGai = false;
          this.selectActiveFen = true;
          this.$router.push('/userportraithome/fenXi')
          this.$emit('count', 1)
        },
        loadTop() {//下拉刷新
          this.yestedayTime()
        },
        handleTopChange(status) {
          this.topStatus = status;
        },
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
          // //滚动加载更多
          // if(scrollTop + windowHeight >= scrollHeight-100  && scrollTop>10){this.loadBottom() }
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
      },
      watch: {
        orgCodeList() {
           this.loadingShow=true
           this.yestedayTime()
        }
      },
      components:{
        allecharts,
        Loadmore,
        loading,
        loadmoreBlue
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../assets/css/loaders.css'
  .gaim_wrap
    position absolute
    top 64px
    left 0
    right 0
    .custome_tab
      height 40px
      width 100%
      line-height 40px
      display flex
      padding-bottom 5px
      background-image url("../../assets/images/gaimao.png")
      background-repeat no-repeat
      background-size 100% 100%
      .gaimao
        text-align right
        padding-right 16px
        flex 1
        span
          font-size 16px
          color #fff
          font-family PingFangSC-Semibold
        .active
          padding-bottom 2px
          font-family PingFangSC-Semibold
          border-bottom 2px solid #fff
          color #fff
      .fenxi
        flex 1
        text-align left
        padding-left 16px
        span
          font-size 16px
          color #D0ECFF
          font-family PingFangSC-Semibold
          padding-bottom 2px
        .active
          padding-bottom 2px
          font-family PingFangSC-Semibold
          border-bottom 2px solid #D0ECFF
          color:#D0ECFF
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
    .loadmorestwo
     margin-bottom 0
     background #5B96FF
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
          color #fff
        .loading-txt
          padding-left 36px
        .icon
          display inline-block
          position absolute
          top 10px
          .la-ball-spin-clockwise
            width 25px
            height 25px
            div
              width 6px
              height 6px

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
    .content-box
      padding-bottom 20px
      background-color  #5B96FF
    .topBar
     position fixed
     bottom 40px
     right 12px
     img
      width 40px
      height 40px
    .iphonex-top-bar
      bottom 40px
  .iphonex_gaim_wrap
    position absolute
    top 84px
    left 0
    right 0
</style>
