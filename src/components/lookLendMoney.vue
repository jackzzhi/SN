<template>
  <div class="content">
    <div class="look_day_content">
      <mt-swipe ref="swipe"  class="swipe" :auto="0"  :show-indicators="false" @change="handleChange">
        <mt-swipe-item >
          <div class="today_lend">
            <div class="tl_top">
              <p class="lend_type">{{tagsType?'本月':'今日'}}出借 (元)</p>
              <div class="compar_money">
                <img :src="topOrDownFlage?require('../assets/images/image-xq/compare_up.png'):require('../assets/images/image-xq/compare_down.png')" alt="">
                <span>{{topOrDownMoney}}</span>
                <p>较上次</p>
              </div>
            </div>
            <div class="money_content">
              <span>¥</span>
              <b>{{todayLendMoney}}</b>
            </div>
            <div class="refresh_time">
              <img src="@/assets/images/image-xq/time.png" alt="">
              <span>最近刷新时间 {{refreshTime}}</span>
            </div>
          </div>
        </mt-swipe-item>
        <mt-swipe-item v-if="!tagsType">
          <div class="seven_lend" >
            <div ref="idName" class="chart-wrap" :style="chartStyle"></div>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="btn_look" v-show="!tagsType">
      <div class="btn_look_content">
        <div class="sf_content">
          <div class="sf_left">
            <p class="title" v-html="hidden?'昨日出借 (元)':'今日出借 (元)'"></p>
            <p class="money" v-html="hidden?yestodayLendMoney:todayLendMoney"></p>
          </div>
          <div class="sf_right" @click="changeContent">
            <img :class="hidden?'':'today_icon'" :src="hidden?require('../assets/images/image-xq/chart@2x.png'):require('../assets/images/image-xq/today.png')" alt="">
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
        myChart:null,
        todayLendMoney:'65,565,566,888',//今日出借金额
        yestodayLendMoney:'65,565,566',//昨日出借金额
        topOrDownMoney:'213,355',//较上次比较数值
        topOrDownFlage:false,//较上次比较icon
        refreshTime:'10:32:50',
        tagsType:false,
        chartStyle:{
          width:(document.documentElement.clientWidth-60 || document.body.clientWidth-60)+'px',
          height:190+'px'
        },
      }
    },
    mounted(){
      this.$nextTick(() =>{
        this.createGrid();
      });
    },
    methods:{
      //获取当前的下标
      handleChange(index){
        this.hidden = !this.hidden;
        this.carIndex = index;
      },
      changeContent(){
        this.$refs.swipe.next();
      },
      createGrid(){
        let options = {
          title: {
            text: '近7日出借金额走势 (万元)'
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
            left: '4%',
            right: '4%',
            bottom: '12%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [20, 21, 22, 23, 24, 25, 26],
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
                type: 'solid'
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
            data: [630, 861, 618, 620, 830, 730, 860],
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
        this.myChart = echarts.init(this.$refs.idName)
        this.myChart.resize();
        this.myChart.setOption(options);
      }
    },
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
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
        text-align:left
        margin:10px 0 0 0
  .refresh_time
    margin:37px 0 0 0
    text-align:center
  .refresh_time img
    width:13px
  .refresh_time  span
      font-size: 14px
      color: #8D92A9
      vertical-align: top
  .money_content
    text-align:center
    margin-top:35px
    span
      font-size: 24px
      color: #010E4F
      font-family: DINCondensed-Bold
    b
      font-size: 36px
      color: #010E4F
      font-family: DINCondensed-Bold
  .tl_top
    overflow:hidden
  .look_day_content
    padding:0 13px
    position:relative
    z-index:2
  .look_day_content>div
    border-radius: 4px
    overflow:hidden
    width:100%
    height:190px
    background :#fff url("../assets/images/image-xq/disecopy@2x.png") no-repeat top
    background-size:100%
    box-sizing: border-box
    box-shadow: 0 4px 8px 2px rgba(137,174,240,0.15)
    padding:14px 17px 0
    .compar_money
      float:right
      span
        font-size: 16px
        color: #010E4F
        line-height:22px
      p
        font-size: 14px
        color: #8D92A9
        text-align:right
    .compar_money img
      width:10px
    .lend_type
      font-size: 16px
      color: #010E4F
      float:left
  .btn_look
    box-sizing:border-box
    width: 100%
    padding: 0 23px
    color:#000
    text-align:center
    margin-top:-10px
    z-index:1
    .btn_look_content
      background: #FFFFFF
      box-shadow: 0 4px 8px 2px rgba(137,174,240,0.15)
      border-radius: 4px
      padding:29px 13px 19px
  .hidden
    display:none

</style>

