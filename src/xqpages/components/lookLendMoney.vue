<template>
  <div class="content">
    <!-- <div class="look_day_content_ceng" v-if="!cengShow" :class="performanceHide?'shortHeight':''"></div> -->
    <div class="look_day_content" :class="performanceType?'':'look_day_content_back head-content'" >
      <!--<mt-swipe ref="swipe"  class="swipe" :class="performanceHide?'shortHeight':''" :auto="0"  :show-indicators="false" @change="handleChange">-->
       <div  :class="performanceHide?'shortHeight':''">
        <div>
          <transition name="fade-one">
            <div class="today_lend" v-if="!performanceType" v-show="hidden">
            <div class="tl_top">
              <p class="lend_type">{{currentLendData.name}}<span class="yuan">（{{currentLendData.unit}}）</span></p>
              <div class="compar_money" v-if="!performanceHide">
                <img v-if="todayCha.type!==0" :src="todayCha.type==1?require('../assets/images/compare_up.png'):require('../assets/images/compare_down.png')" alt="">
                <span>{{Math.abs(todayCha.cha)}}</span>
                <p>较上次</p>
              </div>
            </div>
              <div class="money_content">
              <span>¥</span>
              <b>{{currentLendData.value | numToThousands}}</b>
            </div>
            <div class="refresh_time" v-if="!performanceHide">
              <img src="../assets/images/time.png" alt="">
              <span>最近刷新时间 {{reshtime}}</span>
            </div>
          </div>
          </transition>
          <transition name="fade-two">
            <div class="seven_lend" v-if="!tagsType" v-show="performanceType || !hidden">
              <div class="box-title" :style="chartTitleStyle">{{boxTitle}}</div>
                <div :style="chartStyle" ref="idName"></div>
            </div>
          </transition>
        </div>
        <!--</mt-swipe-item>-->
        <!--<div v-else-if="!tagsType">-->

        <!--</div>-->
      <!--</mt-swipe>-->
      </div>
    </div>
    <div class="btn_look" v-show="!tagsType" v-if="!performanceType">
      <div class="btn_look_content">
        <div class="sf_content">
          <div class="sf_left">
            <p class="title" v-html="hidden?'昨日出借（元）':'今日出借（元）'"></p>
            <p class="money" v-html="hidden?numToThousands(yestodayLendMoney):numToThousands(currentLendData.value)"></p>
          </div>
          <div class="sf_right" @click="changeContent">
            <img :class="hidden?'':'today_icon'" :src="hidden?require('../assets/images/chart@2x.png'):require('../assets/images/today.png')" alt="">
            <p v-html="hidden?'查看近七日':'查看今日'"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from '@/untils/echarts'
  export default {
    data(){
      return{
        hidden:true,
        myCharts:null,
        yestodayLendMoney:'',//昨日出借金额
        topOrDownMoney:'213,355',//较上次比较数值
        topOrDownFlage:false,//较上次比较icon
        chartTitleStyle:{
          fontSize: 16+'px',
          color: '#010E4F',
          paddingLeft: 17+'px',
          paddingTop: 15+'px',
          paddingBottom:14+'px'
        },
        chartStyle:{
          width:(document.documentElement.clientWidth+'px'),
          height:144+'px'
        },
        isDone: false ,// 当前动画是否执行完成
        boxTitle:''
      }
    },
    props: {
      cengShow:Boolean,//是否展示透明层
      lendData:Object,
      tagsType:Boolean,// false:查看近7日  true:仅查看金额
      performanceType:Boolean, //true:查看走势图
      titleText01:String,//图表title
      titleText02:String,//图表title
      lendTitle:String, //出借title  今日/本月
      userLendMoneyLine:Object,//今日/本月 金额走势图数据
      userActiveLine:Object,//今日/本月 用户活跃走势图数据
      lineType:String,//折线图类别
      performanceHide:Boolean, //业绩中需要隐藏的项
      currentLendData:Object,//今日 出借金额
      nearlySevenDays:Object,//近七日对象
      reshtime:String,
      todayNearlyType:String,//首页近七日的类型,
      todayCha:Object
    },
    mounted(){
      setTimeout(() => {
        this.createGrid();
      }, 50);
    },
    beforeDestroy(){
      //Echarts内存泄漏解决
      if(this.myCharts &&  !this.myCharts.isDisposed()){
        this.myCharts.clear();//释放图形资源
        this.myCharts.dispose();//销毁实例对象
        this.myCharts=null
      }
    },
    destroyed(){
      this.$destroy();
    },
    watch: {

      //出借金额走势
      userLendMoneyLine(newName) {
        this.createGrid();
      },
      //用户活跃分时走势
       userActiveLine(newName) {
        this.createGrid();
      },
      //近七日
      nearlySevenDays:function () {
        this.createGrid();
      }
    },
    methods:{
       //获取当前的下标
      handleChange(index){
        this.hidden = !this.hidden;
        this.carIndex = index;
      },
      changeContent(){
        this.hidden=!this.hidden
      },
      createGrid(){
        var thisTitle = "";
        var thisData = {};
        var dataZoom = {
          show: true,
          realtime: true,
          height: 10,
          start: 0,
          end: 20,
          handleSize: 0,//滑动条的 左右2个滑动条的大小
          type: 'inside',
        };
        if(this.lineType == 'lendMoney'){//今日出借金额走势
          thisTitle = this.titleText01;
          thisData = this.userLendMoneyLine;
        }else if(this.lineType == 'active'){//今日活跃用户分时走势
          thisTitle = this.titleText02;
          thisData = this.userActiveLine;
        }else if(this.todayNearlyType=='nearlyType'){
          if(this.nearlySevenDays.datas) {
            this.yestodayLendMoney=this.nearlySevenDays.datas[0].series[0].data[this.nearlySevenDays.datas[0].series[0].data.length-2]
            thisTitle = this.nearlySevenDays.datas[0].series[0].name;
            // thisTitle = this.nearlySevenDays.datas[0].series[0].name + '(' + this.nearlySevenDays.datas[0].series[0].unit + ')';
            thisData = this.nearlySevenDays.datas[0];
          }
        }else if(this.lineType == undefined) return
        this.boxTitle = thisTitle+'（'+thisData.series[0].unit+'）'
        let options = {
            title: {
              show:false,
              text: thisTitle+'（'+thisData.series[0].unit+'）',
              textStyle:{
                fontWeight:'normal',
                color: '#010E4F',
              }
            },
            tooltip: {
              show: true,
              trigger: 'axis',
              axisPointer: {
                type: 'line',
                lineStyle:{
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#4DC6FF' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#ADDDFF' // 100% 处的颜色
                    }],
                    globalCoord: false, // 缺省为 false
                  },
                  width:'1'//按下竖线粗细
                }
              },
              alwaysShowContent: false,
              triggerOn: 'click',
              hideDelay: 50,
              textStyle:{ // 提示内容对其方式
                align:'left',
              },
              confine: true, //是否将 tooltip 框限制在图表的区域内
              textStyle:{
                fontSize:'12'
              },
              backgroundColor: 'rgba(92,92,92,0.9)', //提示框浮层的背景颜色 '#5C5C5C'
              padding: [3, 5], //提示框浮层内边距
              formatter: function (params,ticket,callback) {
                var res = params[0].data;
                return res;
              },
            },
            grid: {
              x:30,
              y:25,
              x2:53,
              y2:10,
              containLabel: true
            },
            xAxis: {
              boundaryGap: false,
              data: thisData.axisX.data,
              axisTick: {
                show: false, //是否显示坐标轴刻度
              },
              axisLine: {
                show: false, //是否显示坐标轴轴线
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#6C7B8A'
                }
              }
            },
            yAxis: {
              type: 'value',
              splitLine: {
                lineStyle: {
                  type: 'solid',
                  color:"#F1F1F1"
                }
              },
              axisLine: {
                show: false, //是否显示坐标轴轴线
              },
              axisTick: {
                show: false, //是否显示坐标轴刻度
              },
              axisLabel: {
                show: false, //是否显示刻度标签
              },
            },
            series: [{
              data:thisData.series[0].data,
              type: 'line',
              showSymbol:'circle',
              symbolSize: 5,//拐点大小
              //symbol:'pin',
              smooth: true,
              itemStyle: {
                normal: {
                  color: "#89C3F4",
                  borderColor:'#89C3F4',
                  lineStyle:{
                    width:3,//折线宽度
                    color:"#89C3F4",//折线颜色
                  },
                  label : {//拐点数值
                    show: true,
                    color: '#6C7B8A'
                  }
                },
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, .5, [{
                    offset: 0,
                    color: '#ADDDFF'
                  }, {
                    offset: 1,
                    color: '#fff'
                  }])
                }
              },
            }]
          }
          //判断如果是近7日
          if(this.todayNearlyType!='nearlyType' && thisData.series[0].data.length>7){
            options.dataZoom = dataZoom;
          }
          if(this.$refs.idName==undefined) return;
          this.myCharts = echarts.init(this.$refs.idName)
          this.myCharts.resize();
          this.myCharts.setOption(options);



      },
      timeChange(){
        return this.reshtime.substring(11,19)
      },
      numToThousands(num){
        return num ? num.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,') : num;
      }
    }
  };

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .shortHeight
    height:152px !important
    .money_content
      margin-top 26px !important
  .sf_content
    display: flex
    justify-content: space-between
    overflow:hidden
    .sf_right
      border-left: 1px dashed #E6E6E6
      padding: 0 0 0 20px
      img
        width:70px
        margin:3px 0 0 0
      .today_icon
        width: 50px
        margin:0 10px 5px
      p
        font-size: 14px
        color: #4787FB
    .sf_left
      padding:2px 0
      .title
        font-size: 16px
        color: #A6A6A6
        text-align:left
      .money
        font-size: 24px
        color: #010E4F
        font-family: CenturyGothic;
        text-align:left
        margin:10px 0 0 0
  .refresh_time
    margin:40px 0 0 0
    text-align:center
  .refresh_time img
    width:13px
  .refresh_time  span
      font-size: 14px
      color: #8D92A9
      vertical-align: top
  .money_content
    text-align:center
    margin-top:26px
    span
      font-size: 24px
      color: #010E4F
      font-family: PingFangSC-Medium;
    b
      font-size: 36px
      color: #010E4F
      font-family: CenturyGothicBold
  .tl_top
    overflow:hidden
  .look_day_content
    font-size 16px
    background-size:100%
    padding:0px 13px 0px
    position:relative
    z-index:2
  .look_day_content_back
    background:#5b96ff url("../assets/images/background@2x_02.png") no-repeat bottom
  .look_day_content_ceng
    width:100vw
    height:186px
    position absolute
    z-index 3
  .look_day_content>div
    background :#fff
    width:100%
    height:190px
    box-sizing: border-box
    box-shadow: 0 4px 8px 2px rgba(137,174,240,0.15)
    .compar_money
      padding-right 15px
      padding-top 10px
      float:right
      text-align right
      span
        font-size: 16px
        color: #010E4F
        line-height:22px
      p
        font-size: 14px
        color: #8D92A9
    .compar_money img
      width:10px
    .lend_type
      padding-left 17px
      padding-top 15px
      padding-bottom:14px
      font-size: 16px
      color: #010E4F
      float:left
      .yuan
        font-size: 16px
        color: #010E4F
  .look_day_content.head-content>div
    background:#fff url("../assets/images/disecopy@2x.png") no-repeat top
    background-size:100%
    overflow hidden
    .seven_lend
     font-size 16px;
     .box-title
      font-size: 16px
      color: #010E4F
      padding-left 17px
      padding-top 4px
  .btn_look
    box-sizing:border-box
    width: 100%
    padding: 0 23px
    color:#000
    text-align:center
    margin-top:-10px
    z-index:1
    background #f6f8f9
    .btn_look_content
      background: #FFFFFF
      box-shadow: 0 4px 8px 2px rgba(137,174,240,0.15)
      border-radius: 4px
      padding:29px 13px 19px
  .hidden
    display:none
.content
  padding-bottom 14px
  background #f6f8f9
  width 100vw
  overflow:hidden

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.fade-one-enter-active{
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
}
.fade-one-enter, .fade-one-leave-active {
  opacity: 0;
  -webkit-transform: translateX(100%);
  transform: translateX(100%)
}
.fade-one-leave-active, .fade-one-enter {
  opacity: 0;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}
.fade-two-enter-active{
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
  /*opacity: 0.1;*/
}
.fade-two-enter, .fade-two-leave-active {
  /*opacity: 0;*/
  -webkit-transform: translateX(100%);
  transform: translateX(100%)
}
</style>

