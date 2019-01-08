<template>
  <div class="age-echart">
    <div class="title">
      <span class="age_title">{{data1.title}}</span>
    </div>
    <div class="tubiao_wap">
      <div v-if="this.data1.datas[0].axisX.data.length === 1" class="tubiao tubiao_analyse tubiao2" ref="chart1"></div>
      <div class="tubiao tubiao_analyse tubiao1" ref="chart"></div>
    </div>
    <img class="line" src="../../assets/images/hudu.png"/>
    <div class="data_tag">
      <div class="data_tag_cont" v-for="(item, i) in data2.datas" :key="i">
        <div class="tag_title" :style="{color: item.list[1].color}">
          <i :style="iBlockStyle"></i>
          <span class="tag_type">{{item.itemAlias}}</span>
          <span>{{item.list[1].value}}</span>
          <span class="unit">{{item.list[1].unit}}</span>
          <span :class="'level ' + levelType[item.list[item.list.length - 1].value]">{{item.list[item.list.length - 1].value}}</span>
        </div>
        <div class="tag_cont">
          <button ref="tagBtn" v-for="(val, index) in item.list.slice(2, -1)" :key="index" :style="{color: val.color, 'border-color': val.color}" v-if="val.value">{{val.value}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
  export default {
    data(){
      return{
        dataType: ['客群1', '客群2', '客群3', '客群4'],
        levelType: {
          '优质': 'level_0',
          '一般': 'level_1',
          '高风险': 'level_2',
          '低风险': 'level_3'
        },
        iBlockStyle: null
      }
    },
    // 关于data2的取值问题，data2下面的选项为客群选项，客群下面的list为展示的各项数据，list数组的第零个元素为后端排序所有的，不需要展示，list数组的第一个元素为人数的数据，list数组的最后一个元素为对于客群的评级，一般有优秀、一般、高风险、低风险这四个，list中间剩余的数据就是需要展示的标签数据
    props: ['data1', 'data2'],
    mounted() {
      // this.$nextTick(() => {
        // this.createChart()
      // })
      this.createChart()
      this.iBlockStyle = {
        'background-image': 'linear-gradient(-180deg, ' + this.data1.datas[0].series[0].color.split(',')[1] +' 0%, ' + this.data1.datas[0].series[0].color.split(',')[0] + ' 100%)'
      }
      this.$refs.tagBtn.forEach(item => {
        item.style.height = item.offsetHeight + 'px'
      })
    },
    methods: {
      createChart() {
        let series = this.data1.datas[0].series
        let min = this.data1.datas[0].axisY.left.min
        let max = this.data1.datas[0].axisY.left.max
        let boxWidth = this.$refs.chart.clientWidth
        let option = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'line',       // 默认为直线，可选为：'line' | 'shadow'
              // z: 0
              // label: {}
            },
            formatter: (params) => { //格式化数据
              let len = params.length,
                  lastReturn =params[0].name;
              for (let i=0; i<len; i++) {
                if(this.data1.datas[0].series[i].unit === "%"){ //如果单位是百分号的加上百分号
                  lastReturn = lastReturn + "<br/>" + params[i].seriesName + "：" + params[i].value + '%'
                }
                else{
                  lastReturn = lastReturn + "<br/>" + params[i].seriesName + "：" + params[i].value
                }
              }
              return lastReturn
            },
            textStyle: {
              align: 'left'
            }
          },
          grid: {
            top: 57,
            left: this.data1.datas[0].axisX.data.length === 1 ? 140 : 14,
            right: this.data1.datas[0].axisX.data.length === 1 ? 140 : 14,
            bottom: 20,
            containLabel: true
          },
          legend: {
            // data: [{
            //   name: '客群放款率',
            //   // icon: 'square'
            //   icon: 'path://M0 0h1024v1024H0z'
            // }, {
            //   name: '平均放款率',
            //   textStyle: {
            //     // color: 'red'
            //   },
            //   icon: 'line',
            //   itemWidth: 17
            // }],
            data: series.map((item, index) => {
              switch(index) {
                case 0:
                  return {
                    name: item.name,
                    icon: 'path://M0 0h1024v1024H0z'
                  }
                case 1:
                  return {
                    name: item.name,
                    icon: 'line',
                  }
              }
            }),
            textStyle: {
              fontFamily: 'PingFangSC-Regular',
              fontSize: 12,
              color: '#29354D'
            },
            right: 28,
            itemHeight: 9,
            itemWidth: 17,
            padding: [5, 0, 5, 5]
          },
          xAxis : [{
            type : 'category',
            data : this.data1.datas[0].axisX.data,
            // boundaryGap: false,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#F1F1F1'
              }
            },
            axisLabel: {
              color: '#29354D',
              fontSize: 14
            }
          }],
          yAxis : [{
            type : 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#F1F1F1'
              }
            },
            min: min,
            max: max,
            interval: (min != max) ? ((max-min) / 9) : (max / 9),
          }, {
            type : 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }],
          series : [{
            name: series[0].name,
            type: series[0].type,
            barWidth: 14,
            data: series[0].data.map((item) => {
              return item * 1
            }), 
            itemStyle: {
              barBorderRadius: [7, 7, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: series[0].color.split(',')[1]
              }, {
                offset: 1,
                color:  series[0].color.split(',')[0]
              }])
            },
            label: {
              show: series[0].valueShow === '1',
              position: 'top',
              color: '#6E757F',
              formatter: '{c}' + series[0].unit,
              fontFamily: 'PingFangSC-Regular',
              fontSize: 14
            }
          }, {
            name: series[1].name,
            type: series[1].type,
            data: series[1].data.map((item) => {
              return item * 1
            }),
            symbol: 'none',
            itemStyle: {
              color: series[1].color
            },
            lineStyle: {
              width: 1
            },
            markPoint: {
              symbol: 'line'
            },
            markLine : {
              data : [[{
                type: 'average',
                x: boxWidth * 0.1
                // x: 0
              }, {
                type: 'average',
                x: boxWidth * 0.9
              }]],
              label: {
                show: false
              },
              symbolSize: [0, 0],
              lineStyle: {
                width: 2,
                type: 'solid'
              }
            }
            // silent: true
          }]
        };
        let option1 = {
          grid: {
            top: 57,
            left: 14,
            right: 14,
            bottom: 20,
            containLabel: true
          },
          xAxis : [{
            // type : 'category',
            data : this.data1.datas[0].axisX.data,
            // boundaryGap: false,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#F1F1F1'
              }
            },
            axisLabel: {
              color: '#29354D',
              fontSize: 14
            }
          }],
          yAxis : [{
            type : 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#F1F1F1'
              }
            },
            min: min,
            max: max,
            interval: (min != max) ? ((max-min) / 9) : (max / 9),
          }, {
            type : 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }],
          series : [{
            name: series[0].name,
            type: series[0].type,
            barWidth: 14,
            data: series[0].data.map((item) => {
              return item * 1
            }), 
            itemStyle: {
              barBorderRadius: [7, 7, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#fff'
              }, {
                offset: 1,
                color: '#fff'
              }])
            },
            label: {
              show: series[0].valueShow === '1',
              position: 'top',
              color: '#6E757F',
              formatter: '',
              fontFamily: 'PingFangSC-Regular',
              fontSize: 14
            }
          }, {
            name: series[1].name,
            type: series[1].type,
            data: [],
            symbol: 'none',
            itemStyle: {
              color: series[1].color
            },
            lineStyle: {
              width: 1
            },
            markPoint: {
              symbol: 'line'
            },
            markLine : {
              data : [[{
                type: 'average',
                x: boxWidth * 0.1
                // x: 0
              }, {
                type: 'average',
                x: boxWidth * 0.9
              }]],
              label: {
                show: false
              },
              symbolSize: [0, 0],
              lineStyle: {
                width: 2,
                type: 'solid'
              }
            }
            // silent: true
          }]
        };
        // option.legend.data = series.map((item, index) => {
        //   switch(index) {
        //     case 0:
        //       return {
        //         name: item.name,
                
        //       }
        //   }
        // })
        this.myChart = echarts.init(this.$refs.chart)
        this.myChart.resize()
        this.myChart.setOption(option)
        if (this.data1.datas[0].axisX.data.length === 1) {
          this.myChart1 = echarts.init(this.$refs.chart1)
          this.myChart1.resize()
          this.myChart1.setOption(option1)
        }
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .age-echart
    margin-bottom 9px
    .title
      width 100%
      height 40px
      line-height 40px
      background-color #fff
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      .line
        width 4px
        float left
        height 40px
        vertical-align: top
        border-top-left-radius 4px
      .age_title
        padding-left 13px
        font-family PingFangSC-Regular
        font-size 16px
        color #010E4F
    .tubiao_wap
      width 100%
      height 270px
      position relative
      background #fff
      .bg
       position absolute
       top 27px
       height 160px
       width 161px
       left 95px
      .tubiao
       width 100%
       height 270px
       text-align center
      .tubiao1
        position: absolute
        top: 0
        right: 0
    .tubiao_bottom
      width 100%
      margin-top -3px
      background-color #fff
      ul
        display: block;
        li
          height 30px
          float left
          width 50%
          text-align center
          .wrap
            height 30px
            padding-left 30px
            line-height 30px
            background #fff
            .kuai
              width 11px
              height 11px
              float left
              margin-top 6px
            .mindl
              float left
              padding-left 6px
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #010E4F;
              letter-spacing: 0;
              text-align: justify;
              line-height: 23px;
    .line
     width 100%
     display: block
    .clearfix:after
      content: "."
      display: block
      height: 0
      clear: both
      visibility: hidden
    .clearfix
      zoom 1
    .data_tag
      padding: 0 6px
      background-color: #fff
      .data_tag_cont
        padding: 10px 0 0 0
        font-family: PingFangSC-Regular
        border-bottom: 1px dashed #AFAFAF
        .tag_title
          height: 20px
          line-height: 20px
          padding-left: 8px
          font-size: 0
          color: #010E4F
          position: relative
          margin-bottom: 16px
          i
            display: inline-block
            width: 11px
            height: 11px
            margin-right: 8px
            background-image: linear-gradient(-180deg, #AFC8FF 0%, #5B96FF 100%)
          span
            font-size: 16px
          .tag_type
            margin-right: 32px
          .unit
            font-size: 12px
          .level
            display inline-block
            position: absolute
            top: 0
            right: 8px
            padding 8px 10px 8px
            height 24px
            line-height 1
            border-radius 4px
            font-size 24px
            text-align center
            color #fff
            -webkit-transform-origin-x 100%
            -webkit-transform-origin-y 0
            transform scale(.5)
          .level_0
            background #50E3C2
          .level_1
            background #A1B8DD
          .level_2
            background #FF5555
          .level_3
            background #FFC86F
        .tag_cont
          padding-left: 27px
          font-size: 0
          button
            height: 26px
            padding: 0 15px;
            border: 1px solid #0051E0
            border-radius: 13px
            margin-right: 12px
            margin-bottom 12px
            font-size: 14px
            background: #fff
      .data_tag_cont:last-child
        border-bottom: 0

</style>
<style>
  .tubiao_analyse div:nth-child(2){
    z-index: 0!important;
  }
</style>

