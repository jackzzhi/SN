<template>
  <div class="age-echart">
    <div class="title">
      <span class="line" :style="'background-color:'+colorData"/>
      <span class="age_title">{{chartData.title}}</span>
    </div>
    <div class="tubiao_wap">
      <div class="tubiao" ref="chart"></div>
      <img class="bg" src="../../assets/images/xuelibj.png"/>
    </div>
    <div class="tubiao_bottom clearfix">
      <!--<ul>-->
        <!--<li v-for="item in option.series[0].data" >-->
          <!--<div class="wrap">-->
            <!--<p class="kuai" :style="{'background-color': item.itemStyle.normal.color}"/>-->
            <!--<span class="mindl">{{item.name}}:{{item.value}}人</span>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
      <ul>
        <li v-for="(item,index) in chartData.datas[0].series.data">
          <div class="wrap">
            <p class="kuai" :style="{'background-color': chartData.datas[0].series.color[index]}"/>
            <span class="mindl" >{{item.name}}:{{item.value}}人</span>
          </div>
        </li>
      </ul>
    </div>
    <img class="line" src="../../assets/images/hudu.png"/>
    <div class="content"><span class="content_child">{{chartData.desc}}</span></div>
  </div>
</template>

<script>
  // import echarts from '@/untils/echarts'
import echarts from 'echarts'
  export default {
    props:{
      chartData:{
        required:true
      },
      colorData:String
    },
    data(){
      return{
          option:{
          backgroundColor: '#fff',
          series: [{
            hoverAnimation:false,
            silent:true,
            name: this.chartData.title,
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(30, 144, 255，0.5)'
              },
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(194, 194, 194, 0.5)'
              }
            },
            data: [],
            label: {
            },
            labelLine: {
            }
          }]
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.assignmentData()
        this.createChart()
      })

    },
    methods: {
      assignmentData(){
        var ageDatas=[]
        for(var i=0;i<this.chartData.datas[0].series.data.length;i++){
          var data = {
            value: this.chartData.datas[0].series.data[i].value,
            name: this.chartData.datas[0].series.data[i].name,
            itemStyle: {
              normal: {
                color: this.chartData.datas[0].series.color[i]
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: this.chartData.datas[0].series.color[i]
                },
                length: 12,
                length2: 8
              }
            },
            label: {
              normal: {
                formatter: '{b}:{d}%',
                textStyle: {
                  fontSize:10,
                  color: this.chartData.datas[0].series.color[i],
                  fontFamily: "PingFangSC-Regular"
                }
              }
            }
          }
          ageDatas.push(data)
        }

        this.option.series[0].data=ageDatas.sort(function (a, b) {
          return a.value - b.value
        })
      },
      createChart() {
        this.myChart = echarts.init(this.$refs.chart)
        this.myChart.resize()
        this.myChart.setOption(this.option)
      }

    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .age-echart
    margin-top 6px
    margin-left  12px
    margin-right 12px
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
      height 217px
      position relative
      background #fff
      border-bottom-left-radius 5px
      border-bottom-right-radius 5px
      .bg
       position absolute
       top 21px
       height 173px
       width 173px
       left 89px
      .tubiao
       width 100%
       height 215px
       text-align center
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
    .clearfix:after
      content: "."
      display: block
      height: 0
      clear: both
      visibility: hidden
    .clearfix
      zoom 1
    .content
      padding 10px 10px 10px 14px
      margin-top -2px
      width 100%-36px
      background #fff
      border-bottom-left-radius: 5px
      border-bottom-right-radius: 5px
      .content_child
       margin-top 10px
       margin-bottom 10px
       ont-family: PingFangSC-Light
       font-size: 14px
       color: #A6A6A6
       letter-spacing: 0
       line-height: 23px

</style>
