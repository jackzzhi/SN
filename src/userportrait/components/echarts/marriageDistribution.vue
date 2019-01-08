<template>
  <div class="men_echart">
    <div class="title">
      <span class="hy_line" :style="'background-color:'+colorData"/>
      <span class="title_name">{{chartData.title}}</span>
    </div>
    <div class="men_middle clearfix">
      <ul>
        <li v-for="(item,index) in  optionList">
          <graDuation :optionMiddle="item" :peopleList="peopleList[index]"></graDuation>
        </li>
      </ul>
    </div>
    <img class="line" src="../../assets/images/hudu.png"/>
    <div class="content"><span class="content_child">{{chartData.desc}}</span></div>
  </div>
</template>

<script>
  import echarts from '@/untils/echarts'
  import graDuation from '../../components/echarts/graDuation'
  export default {
    props:{
      chartData:{
        required:true
      },
      colorData:String
    },
    data(){
      return{
        optionList:[],
        sumPel:0,
        peopleList:[]
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.assignmentData()
      })
    },
    methods:{
      assignmentData(){
        this.chartData.datas[0].series.data.forEach((item,index)=>{
          this.sumPel +=parseInt(item.value)
        })

       this.chartData.datas[0].series.data.forEach((item,index)=>{
         this.peopleList.push(item.value)
         var option= {
             series: [
               {
                 name:item.name,
                 type: 'gauge',
                 radius: '155%',
                 center: ['50%', '90%'],
                 min: 0,
                 max: 100,
                 splitNumber: 2, //刻度数量
                 startAngle: 180,
                 endAngle: 0,
                 axisLine: {
                   show: false,
                   lineStyle: {
                     width: 1,
                     color: [
                       [1, 'rgba(0,0,0,0)']
                     ]
                   }
                 }, //仪表盘轴线
                 axisLabel: {
                   show: true,
                   color: '#A6A6A6',
                   distance: 6,
                   fontSize: 8,
                   formatter: '{value}'
                 }, //刻度标签。
                 axisTick: {
                   show: true,
                   lineStyle: {
                     color: {
                       type: 'radial',
                       colorStops: [{
                         offset: 0,
                         color: '#5b96fe'
                       },

                         {
                           offset: 0.2,
                           color: '#5b96fe'
                         },

                         {
                           offset: 0.4,
                           color: '#5b96fe'
                         },

                         {
                           offset: 0.6,
                           color: '#c87aac'
                         },

                         {
                           offset: 0.8,
                           color: '#e27399'
                         },

                         {
                           offset: 1,
                           color: '#eb82a1'
                         }
                       ],
                       globalCoord: false // 缺省为 false
                     },
                     width: 1,
                     length: 20,
                   },
                   length: -5
                 }, //刻度样式
                 splitLine: {
                   show: true,
                   length: -5,
                 }, //分隔线样式
                 detail: {
                   show: false
                 },
                 pointer: {
                   show: false
                 }
               },{
                 name: item.name,
                 type: 'gauge',
                 radius: '170%',
                 min: 0,
                 max: 100,
                 center: ['50%', '90%'],
                 splitNumber: 0, //刻度数量
                 startAngle: 180,
                 endAngle: 0,
                 axisLine: {
                   show: true,
                   lineStyle: {
                     width: 3,
                     color: [
                       [1,
                         new echarts.graphic.LinearGradient(0, 0, 1, 0, [

                           {
                             offset: 0,
                             color: '#5b96fe'
                           },

                           {
                             offset: 0.2,
                             color: '#6892f5'
                           },

                           {
                             offset: 0.4,
                             color: '#898adc'
                           },

                           {
                             offset: 0.6,
                             color: '#c87aac'
                           },

                           {
                             offset: 0.8,
                             color: '#e27399'
                           },

                           {
                             offset: 1,
                             color: '#eb82a1'
                           }
                         ])
                       ]
                     ],
                   }
                 },
                 //分隔线样式。
                 splitLine: {
                   show: false,
                 },
                 axisLabel: {
                   show: false
                 },
                 axisTick: {
                   show: false
                 },
                 itemStyle: {
                   normal: {
                     color: '#5b96fe'
                   }
                 },
                 pointer: {
                   width: 2,//指针的宽度
                   length:"80%", //指针长度，按照半圆半径的百分比
                 },
                 //仪表盘详情，用于显示数据。
                 detail: {
                   show: false,
                   offsetCenter: [0, 0],
                   color: '#ddd',
                   formatter: function(params) {
                     return params
                   },
                   textStyle: {
                     fontSize: 10
                   }
                 },
                 data: [{
                   // name: "当前用户总数",
                   value: this.sumPel?100*parseInt(item.value)/this.sumPel:0
                 }]
               }
             ]
           }
         this.optionList.push(option)
       })
      },
    },
    components:{
      graDuation
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .men_echart
    margin-top 6px
    margin-left  12px
    margin-right 12px
    .title
      width 100%
      height 40px
      line-height 40px
      background-color #fff
      border-top-left-radius 5px
      border-top-right-radius 5px
      .hy_line
        width 4px
        height 40px
        float left
        vertical-align: top
        border-top-left-radius 4px
      .title_name
        padding-left 13px
        font-family PingFangSC-Regular
        font-size 16px
        color #010E4F
    .tubiao
      width 100%
      height 215px
      text-align center
    .men_middle
      width 100%
      background #fff
    .tubiao_bottom
      width 100%
      margin-top -1px
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
     margin-top -1px
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
