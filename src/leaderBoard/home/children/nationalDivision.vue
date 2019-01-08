<template>
  <div class="content tab-container">
    <ul class="ul_content ul-content2" ref="tabelTiTle" v-show="!isNoData && fixedHeaderShow">
        <div class="white_line fixed-header">
          <li class="ul_header">
            <label v-for="(item,index) in dataList.header" :key="index">
              <div v-if="item.indexOf('/')>0" v-html="replaceSpan(item)"></div>
              <div v-else>{{item}}</div>
            </label>
          </li>
        </div>
    </ul>
    <mt-loadmore :maxDistance="90" class="loadmores"  :top-method="loadTop"  ref="loadmore"  @top-status-change="handleTopChange">
      <div class="line"></div>
      <div class="nodata" v-show="isNoData">
        <div>
          <img class="nodata_img" src="@/assets/images/wushuju.png"/>
        </div>
        <span class="nodata_title">暂无相关数据</span>
      </div>
      <ul class="ul_content" v-show="!isNoData">
        <div class="white_line"  :style="fixedHeaderShow ? {opacity:0} : {opacity:1}">
          <li class="ul_header">
            <label v-for="(item,index) in dataList.header" :key="index">
              <div v-if="item.indexOf('/')>0" v-html="replaceSpan(item)"></div>
              <div v-else>{{item}}</div>
            </label>
          </li>
        </div>
        <li v-for="(item,index) in dataList.rows" :key="index" :id="dataList.rank == index+1 && dataList.rank !=null && dataList.rank !=''?'current':''">
          <label v-for="(items,indexs) in item" :key="indexs">
            <div class="pai" v-if="indexs == 0 && index==0">
              <b>
                <img src="../../assets/images/jin.png" alt="">
              </b>
            </div>
            <div class="pai" v-if="indexs == 0 && index==1">
              <b>
                <img src="../../assets/images/yin.png" alt="">
              </b>
            </div>
            <div class="pai" v-if="indexs == 0 && index==2">
              <b>
                <img src="../../assets/images/tong.png" alt="">
              </b>
            </div>
            <div class="pai" v-if="index != 0 && index !=1 && index!=2 && indexs == 0">
              <span v-if="index < part_01" class="circle_yellow">{{items}}</span>
              <span v-if="index >= part_01 && index < part_02" class="circle_orange">{{items}}</span>
              <span v-if="index >= part_02 && index < part_03" class="circle_blue">{{items}}</span>
              <span v-if="index >= part_03 && index < part_04" class="circle_pruple">{{items}}</span>
            </div>
            <div v-if="indexs > 0 && indexs<item.length -2">{{items}}</div>
            <div v-if="indexs==item.length -2">{{items}}</div>
            <div class="arr" v-if="indexs == item.length-1">
              <img v-if="items!=0" :src="items>0?require('../../assets/images/up.png'):require('../../assets/images/down.png')" alt="">
              <span :class="items<0?'fontGreen':'fontRed'" v-html="items>0?items:items.toString().substr(1)"></span>
              <span v-if="items==0">{{items}}</span>
            </div>
          </label>
        </li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <div class="icon"><mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner></div>
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">松开刷新</span>
        <span v-show="topStatus === 'loading'">正在刷新...</span>
      </div>
    </mt-loadmore>
    <div class="topBar" id="goTop">
      <img src="../../assets/images/zhiding.png" alt="" class="goTop" v-show="goTopShow" @click="goTop">
    </div>
    <my-ranking :rankingTop ="rankingTop" :rankingStatus="rankingStatus" :ranking="ranking" v-if="rankingStatus"></my-ranking>
  </div>
</template>
<script>
  import myRanking from '../../components/myRanking/myRanking'
  import {Loadmore} from 'mint-ui'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data(){
      return{
        topStatus: '',
        bottomStatus: '',
        allLoaded: false,
        goTopShow:false,
        isShowDownLoad: false,
        bottomLoading:false,//底部滚动加载中图标
        isNoData:false,//没有数据
        rankingTop:0,//当前排名距离顶部距离
        ranking:'',
        rankingStatus:false,//是否超过一屏
        dataList:{},
        mean:0,
        part_01:0,
        part_02:0,
        part_03:0,
        part_04:0,
        subjectId:JSON.parse(localStorage.getItem('rankDetailsDataId'))[1],
        fixedHeaderShow:false,
        scrollTopPrev:0
      }
    },
    components: {
      myRanking,
      Loadmore
    },
    computed:{
      ...mapGetters(['isIphoneX','userid']),
    },
    activated(){
      window.scrollTo(0,0)
      this.addListener()
    },
    deactivated(){
      this.removeListener()
    },
    watch:{
      selected(){
        this.toggleTabs(this.selected)
      },
      dataList(value){  //当dom渲染成功后判断排名是否在首页展示
        this.$nextTick(function () {
          //判断排名是否在首屏
          this.isFirstScreen();
        })
      }
    },
    created(){
      this.saveLoadingShow(true);
      this.genData();
      this.isFirstScreen();
    },
    methods : {
      ...mapActions(['saveLoadingShow']),
      addListener(){
        window.addEventListener('scroll', this.handleScroll)
      },
      removeListener(){
        window.removeEventListener('scroll', this.handleScroll)
      },
      handleScroll () {
        this.isFirstScreen();
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
        setTimeout(()=>{
          this.genData();
          this.$refs.loadmore.onTopLoaded()
        },1000)
      },
      handleTopChange(status) {//刷新监听
        this.topStatus = status;
      },
      replaceSpan(value){
        var arr = [];
        arr = value.split('/');
        return arr[0]+'/<span style="font-size:10px;color:#001700">'+arr[1]+'</span>'
      },
      isFirstScreen(){//判断排名是否在首屏
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //滚动事件监听的间隔
        if(Math.abs(scrollTop-this.scrollTopPrev) < 10 && Math.abs(scrollTop-this.scrollTopPrev) !=0){
          return;
        }
        else{
          this.scrollTopPrev = scrollTop
        }

        const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        const windowHeight = document.body.clientHeight || document.documentElement.clientHeight;

        // const tabelTiTleHeight = this.$refs.tabelTiTle.clientHeight;//表头的高度
        // 表头出现时机
        if(scrollTop <= 10){
          this.fixedHeaderShow = false
        }
        else{
          this.fixedHeaderShow = true
        }
        //回到顶部
        if(scrollTop>400){
          this.goTopShow=true
          this.scrollTop = scrollTop
        }
        else{
          this.goTopShow=false;
        }

        //判断是否为iphoneX机型
        var iphonexHeight=0;
        if(this.$store.getters.isIphoneX){
          iphonexHeight = 135;
        }else{
          iphonexHeight = 115;
        }

        //判断排名是否在首屏
        //0 < 我的排名距离内容顶部的距离 - 滚动条滚动的距离  <= 可视区域高度
        var currentDom = document.getElementById('current');
        if(this.dataList.rank !=null && this.dataList.rank !=''){
          if(currentDom.offsetTop-scrollTop+iphonexHeight+currentDom.clientHeight<=windowHeight && currentDom.offsetTop-scrollTop>=0){
            this.rankingStatus = false;
          }else{
            this.rankingStatus = true;
          }
          this.rankingTop = currentDom.offsetTop-iphonexHeight-10-(windowHeight/2-iphonexHeight)+45+37;
          //10:tab与表头白色间距10像素
          //45:表头距离tab的距离
          //37:表格内容区域距顶部的距离
        }
      },
      genData(){ //获取全国分部
        var that = this;
        that.$ajax({
          method: 'post',
          url: '/mc-data/data/list',
          dataType: 'json',
          headers: { 'Content-Type': 'application/json;charset=UTF-8' },
          data: JSON.stringify({
            token: that.userid,
            subjectId:that.subjectId,
            masterNo:"01"
          })
        })
        .then(res => {
          if (res.data.code == 200) {
            that.saveLoadingShow(false);
            //判断是否无数据
            if(res.data != 0 && res.data != '' && res.data != undefined && res.data !=null ){
              that.dataList = res.data.data[0].datas[0];
              that.ranking = res.data.data[0].datas[0].rank;
              that.isNoData = false;
            }else{
              that.isNoData = true;
            }

            //平均分四分
            that.mean = parseInt(that.dataList.rows.length/4);
            that.part_01 = that.mean;
            that.part_02 = that.mean*2;
            that.part_03 = that.mean*3;
            that.part_04 = that.mean*4+that.dataList.rows.length%4;
          }
          else if(res.data.code == 301){//7天自动退出登录
            that.saveLoadingShow(false);
            that.$logOut({
              rememberpwd:'1'
            }); //退出记住密码
          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页
            that.saveLoadingShow(false);
            that.$logOut()
          }
          else{
            that.saveLoadingShow(false);
            console.log(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import 'style.styl'
@import "../../../assets/stylus/methods.styl"
#current
  background #FFF9E6
  div
    font-family PingFangSC-Semibold
    line-height 15px
.line
  width 100%
  height 10px
  background #fff
.ul_content li:nth-child(2n+2)
  background #F9F9F9
.ul_content li:nth-child(2n+1)
  background #fff
.ul_content li
  &.ul_header
    background #E7F1FF
  display flex
  justify-content space-around
  padding 10px 0
  font-size 14px
  color #29354D
  background pink
  label
    display flex
    justify-content space-around
    width 100%
  div
    width 100%
    position relative
    text-align center
    line-height 16px
    .small_font
      font-size 10px
      color #001700
  .pai b
    position absolute
    width 100%
    left 0px
    top -5px
  .pai
    img
      width 21px
      height 26px
    span
      color #29354d
      border-radius 15px
      line-height 16px
      height 16px
      width 36px
      text-align center
      display inline-block
      box-sizing border-box
    .circle_yellow
      background #FFFFB4
    .circle_orange
      background #FFE7B6
    .circle_blue
      background #DEEDFF
    .circle_pruple
      background #E9E3FF
  .arr
    img
      width 10px
      height auto !important
    .fontRed
      color #FF6666
    .fontGreen
      color #4DB75D
    .fontBlank
      color #001700
    span
      width 10px
      text-align right
      display inline-block

.ul_content .white_relative
    position relative
.nodata
    width 100%
    height 100%
    text-align center
    line-height 20px
    position relative
    margin-top 40%
  .nodata_img
    width 214px !important
    height 157px !important
  .nodata_title
    font-family PingFangSC-Regular
    font-size 14px
    color #909090
    letter-spacing 0
    text-align center

</style>
