<template>
  <div>
    <div class="tcl_content">
      <div ref="idName" class="chart-wrap" :style="panStyle"></div>
      <div class="tc_content">
        <p class="title">{{chartData.name?chartData.name:'－.－'}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from '@/untils/echarts'
  export default {
    data(){
      return{
        myChart:{},
        panStyle:{
          width:110+'px',
          height:110+'px'
        }
      }
    },
    props:{
      chartData:Object,//今日出借计划分布仪表盘数据
      lendGaugeTotal:Number,//获取出借总金额
    },
    mounted(){
      this.createGrids();
    },
    methods: {
      createGrids(){
        let options = {
          series: [
            {
              name: '业务指标',
              center: ["50%", "50%"], // 默认全局居中
              type: 'gauge',
              // detail: {formatter:'{value}%'},
              data: [{value:Math.round(this.chartData.value / this.lendGaugeTotal * 100)}],
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.2, '#7BE8E7'], [0.8, '#A1D4FF'], [1, '#FFCA98']],
                  width: 6 // 这个是修改宽度的属性
                }
              },
              splitLine : { //分割线样式（及10、20等长线样式）
                length : 1,
                lineStyle : { // 属性lineStyle控制线条样式
                  width : 1
                }
              },
              axisTick : { //刻度线样式（及短线样式）
                length : 1
              },
              axisLabel : { //文字样式（及“10”、“20”等文字样式）
                fontSize : 5,
                fontFamily : "微软雅黑",
                distance : 6 //文字离表盘的距离
              },
              detail: {
                formatter : "{score|{value}%}",
                offsetCenter: [0, "70%"],
                rich : {
                  score : {
                    fontFamily : "微软雅黑",
                    fontSize : 12,
                  }
                }
              },
              pointer : { //指针样式
                length : '50%',
                width : 2,
                color : 'auto'
              }
            }
          ]
        };
        this.myChart = echarts.init(this.$refs.idName)
        this.myChart.setOption(options);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .tcl_content
      margin-left:-3%
      padding-top 5px
      .tc_content
        width:110px
        text-align:center
      .title
        font-size: 12.6px
        color: #010E4F
        margin:0 0 0 -4%
      .time
        font-size: 10.8px
        color: #6C7B8A
        margin-top:8px
        margin:8px 0 0 -4%
</style>


