<template>
  <div class="age-echart">
    <div class="title">
      <span class="line" :style="'background-color:'+colorData"/>
      <span class="title_name">{{this.chartData.title}}</span>
    </div>
    <div class="tubiao_wap">
      <img class="bg" src="../../assets/images/echartbj.png"/>
      <div class="tubiao" ref="chart"/>
    </div>
  </div>
</template>

<script>
  import echarts from '@/untils/echarts'
  export default {
    props:{
      chartData:{
        required:true
      },
      colorData:String
    },
    data() {
      return {

      }
    },
    mounted() {
      this.$nextTick(() => {
        this.createChart()
      })

    },
    methods: {
      createChart() {
        var datalist=this.chartData.datas//数据集合
        datalist = this.addsymbolSize(datalist);//随机设置圆球大小,颜色,位置
        var datas = [];//option需要准备的数据
        for (var i = 0; i < datalist.length; i++) {
          var itemToStyle = datalist[i];
          if(itemToStyle.name.length>2){
            // itemToStyle.name=this.add_comma_toThousands(itemToStyle.name)
            itemToStyle.fontSize= 8
          }else{
            itemToStyle.fontSize= 10
          }
          datas.push({
            name: itemToStyle.name,
            value: itemToStyle.address,
            symbolSize: itemToStyle.symbolSize,
            label: {
              normal: {
                textStyle: {
                  fontSize:itemToStyle.fontSize
                }
              }
            },
            itemStyle: {
              normal: {
                color: itemToStyle.color,
                opacity: 1
              }
            },
          })
        }//生成新的数据
        var option = {
          grid: {
            show: false,
            top: 10,
            bottom: 10
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}"
          },
          xAxis: [{
            gridIndex: 0,
            type: 'value',
            show: false,
            min: 0,
            max: 100,
            nameLocation: 'middle',
            nameGap: 5
          }],
          yAxis: [{
            gridIndex: 0,
            min: 0,
            show: false,
            max: 100,
            nameLocation: 'middle',
            nameGap: 30
          }],
          series: [{
            type: 'scatter',
            symbol: 'circle',
            label: {
              normal: {
                show: true,
                formatter:function(val){
                  // return val.name.split("-").join("\n");
                 var num = val.name
                 var result = '';
                 while (num.length > 3) {
                    result = '\n' + num.slice(-3) + result;
                    num = num.slice(0, num.length - 3);
                  }
                  if (num) {
                    result = num + result;
                  }
                  return result;
                  },
                color: '#fff'
              },
            },
            data: datas
          }]
        };//设置echarts图的option

        this.myChart = echarts.init(this.$refs.chart)
        this.myChart.resize()
        this.myChart.setOption(option)
      },
      addsymbolSize(datalist){//随机设置圆球大小
          var valueNameList=[];
          var valueList=[];
          var randomNumList=[];//圆半径集合
        // var colorList=[]
          var colorList=['#75D79B','#75D79B','#75D79B','#E77296','#E77296','#E77296','#E77296','#9a98F2','#9a98F2','#5B96FF'];//圆半径集合
          var addressList=[{offset:[20, 75]},{offset:[18, 33]},{offset:[77, 67]},{offset:[65, 42]},{offset:[41, 88]},{offset:[52, 22]},{offset:[88, 47]},{offset:[65, 83]},{offset:[11, 60]},{offset:[43, 58]}];//位置集合
          addressList.splice(0,10-datalist.length);//删除多余的位置
          for (var i = 0; i < datalist.length; i++) {
            valueList.push(parseInt(datalist[i].value))
            valueNameList.push({value:parseInt(datalist[i].value),name:datalist[i].name})
            // colorList.push(datalist[i].color)
          }
          valueNameList.sort(function (obj1, obj2) {
           var val1 = obj1.value;
           var val2 = obj2.value;
           if (val1 < val2) {
             return -1;
           } else if (val1 > val2) {
             return 1;
           } else {
             return 0;
          }
         } );
         valueList.sort(function (val1, val2) {
           if (val1 < val2) {
             return -1;
           } else if (val1 > val2) {
             return 1;
           } else {
             return 0;
           }
         });
         for (var i = 0; i < valueList.length; i++) {
           if(valueList[valueList.length-1]!==valueList[0]){
           let  minSize = 30,
                maxSize = 70,
                gap = valueList[valueList.length-1] - valueList[0],//最大值和最小值的value差
                sizeGap = maxSize - minSize, //球的最大值和最小值的差值
                unitSize = sizeGap/gap; //value每增加1，该value对应的size增加unitSize
                randomNumList.push(minSize + (unitSize*(valueList[i]- valueList[0])));
           }else{
             randomNumList.push(40)
           }
         }
         randomNumList.sort();//随机数从小到大排序
         for (var i = 0; i < valueNameList.length; i++) {
            for(var j = 0; j < datalist.length; j++) {
                if(valueNameList[i].value==datalist[j].value && valueNameList[i].name==datalist[j].name){
                  datalist[j].symbolSize=randomNumList[i]
                  datalist[j].color=colorList[i]
                  datalist[j].address=addressList[i].offset
                }
            }
          }

         return datalist;
        },
      //  getRandomColor(){
      //  return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
      // },
       RandomNum(Min, Max) {
                var Range = Max - Min;
                var Rand = Math.random();
                if(Math.round(Rand * Range)==0){
                  return Min + 1;
                }else if(Math.round(Rand * Max)==Max)
                {
                  return Max - 1;
                }else{
                  var num = Min + Math.round(Rand * Range) - 1;
                  return num;
                }
           },
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
   .age-echart
    margin-top 6px
    margin-left 12px
    margin-right 12px
    .title
      width 100%
      height 40px
      line-height 40px
      background-color #fff
      border-top-left-radius 5px
      border-top-right-radius 5px
      .line
        width 4px
        height 40px
        float left
        vertical-align: top
        border-top-left-radius 5px
      .title_name
        padding-left 13px
        font-family PingFangSC-Regular
        font-size 16px
        color #010E4F
    .tubiao_wap
      width 100%
      height 287px
      position relative
      background #fff
      border-bottom-left-radius 5px
      border-bottom-right-radius 5px
      .tubiao
        width 100%
        height 287px
        text-align center
      .bg
       position absolute
       top 15px
       height 246px
       width 246px
       left 46px


</style>
