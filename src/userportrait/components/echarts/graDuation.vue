<template>
  <div class="men_item" >
    <div class="men_item_echart" ref="chartMiddle"></div>
    <div class="optionMiddleContent">
      <span class="sp1">{{optionMiddle.series[0].name}}:{{optionMiddle.series[1].data[0].value|numFilter}}%</span>
      <span class="sp2">{{peopleList}}人</span>
    </div>
  </div>
</template>

<script>
  import echarts from '@/untils/echarts'
  export default {
    props: {
      optionMiddle: {
        required: true
      },
      peopleList:String
    },
    mounted() {
      this.$nextTick(() => {
        this.createChart()
      })
    },
    methods: {
      createChart() {
        var myChartMiddle = echarts.init(this.$refs.chartMiddle)
        myChartMiddle.resize()
        myChartMiddle.setOption(this.optionMiddle)
      }
    },
    filters: {
      numFilter(value) {
        // 截取当前数据到小数点后两位
        let realVal = Number(value).toFixed(2)
        // num.toFixed(2)获取的是字符串
        return Number(realVal)
      }
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .men_item
    float left
    width 50%
    background #fff
    .men_item_echart
      padding-top 10px
      width 100%
      height 75px
    .optionMiddleContent
      width 100%
      text-align center
      .sp1
        padding-top 12.5px
        display  block
        font-family PingFangSC-Regular
        font-size 12px
        color #010E4F
        letter-spacing 0
        text-align center
      .sp2
        display  block
        font-family PingFangSC-Regular
        font-size 12px
        color #010E4F
        letter-spacing 0
        text-align center
        padding-top 5px
        padding-bottom  15px
</style>
