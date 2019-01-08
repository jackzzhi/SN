
<template>
  <div class="money">
    <div class="chart">
      <div class="chart-inner" @click="changeContent">
        <span class="chartTitle">{{chartData.title}}</span>
        <img :src="imgDefault?require('../assets/images/biaoge.png'):require('../assets/images/shuju2x.png')" class="money-1">
      </div>
      <img :src="!isRenwuShow?require('../assets/images/xiala.png'):require('../assets/images/shangla.png')" class="money-2" @click="spread">
    </div>
    <div class="content-wrap" v-show="show">
      <div v-if='isCircle && !showForm' class="circle-txt">{{circleMiddleTxt}}</div>
      <transition name='slide-fade'>
        <div ref="idName" class="chart-wrap" v-if="chartData" v-show ='!showForm' :style="chartStyle"></div>
      </transition>
      <transition name='slide-fade2'>
        <div class="renwu_open"  v-show="showForm">
          <div class="form_show">
            <ul class="form_bottom">
              <!-- 竖向表头s -->
              <!-- 横图 -->
              <ul v-if='chartDetailData.axisX&&chartDetailData.axisX.data'><li class="form_top"></li><li :class="(index+1)%2==0?'bgrow':''" v-for="(item,index) in chartDetailData.axisX.data" :key="index">{{item}}</li></ul>
              <!-- 竖图 -->
              <ul v-if='chartDetailData.axisY&&chartDetailData.axisY.data'><li class="form_top"></li><li :class="(index+1)%2==0?'bgrow':''" v-for="(item,index) in chartDetailData.axisY.data" :key="index">{{item}}</li></ul>
              <!-- 饼图或者环形图 -->
              <ul v-if='chartDetailData.pieLegend'><li class="form_top"></li><li :class="(index+1)%2==0?'bgrow':''" v-for="(item,index) in chartDetailData.pieLegend.data" :key="index">{{item}}</li></ul>
              <!-- 竖向表头e -->
              <!-- 值s -->
              <ul v-if='chartDetailData.pieLegend'>
                <li class="form_top" v-if='chartDetailData.pieLegend'>{{chartDetailData.name}}</li>
                <li :class="(index+1)%2==0?'bgrow':''" v-for="(item,index) in chartDetailData.series.data" :key="index">{{(item.unit=='%'?item.value+'%':item.value) | numToThousands}}</li>
              </ul>
              <ul v-else v-for="series in chartDetailData.series">
                <li class="form_top">{{series.name}}</li>
                <li :class="(index+1)%2==0?'bgrow':''" v-for="(item,index) in series.data" :key="index">{{(series.unit=='%'?item+'%':item) | numToThousands}}</li>
              </ul>
              <!-- 值e -->
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import echarts from '@/untils/echarts'
  export default {
    name:"chartBox",
    props:{
      chartData:{
        required:true
      }
    },
    data(){
      return{
        show:true,
        imgDefault:true,
        isRenwuShow:true,
        showForm:false,
        isCircle:false, //环形图
        circleMiddleTxt:'', //环形图中间显示文字
        chartStyle:{
          minWidth:(document.documentElement.clientWidth || document.body.clientWidth)+'px',
          height:284+'px'
        },
        myChart:null
      }
    },
    computed:{
      chartDetailData(){
        return this.chartData.datas[0]
      }
    },
    mounted(){
      this.$nextTick(() =>{
        this.createChartBox();
      });
    },
    beforeDestroy(){
      //Echarts内存泄漏解决
      if(this.myChart &&  !this.myChart.isDisposed()){
        this.myChart.clear();//释放图形资源
        this.myChart.dispose();//销毁实例对象
        this.myChart=null
      }
    },
    destroyed(){
      this.$destroy();
    },
    methods:{
      formatNum(strNum) {
        // 加千分位
        if(strNum.length <= 3) {
            return strNum;
        }
        if(!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
            return strNum;
        }
        var a = RegExp.$1,
            b = RegExp.$2,
            c = RegExp.$3;
        var re = new RegExp();
        re.compile("(\\d)(\\d{3})(,|$)");
        while(re.test(b)) {
            b = b.replace(re, "$1,$2$3");
        }
        return a + "" + b + "" + c;
      },
      changeContent(){
        this.imgDefault=!this.imgDefault;
        this.showForm=!this.showForm;
      },
      spread(){
        this.show = !this.show;
        this.isRenwuShow=!this.isRenwuShow;
      },
      createChartBox(){
        let seriesTxt = [],
            seriesSettings = [],//系列列表
            legendSetting = {}, //图例组件设置
            yAxisSetting= [], //y轴设置
            xAxisSetting= [], //x轴设置
            colors = [], //图表数据项颜色集合
            serierTitle='', //图表单位
            options;  //图标全部设置
        if(this.chartDetailData.pieLegend){ //如果是环形或者圆形, 无多种类型图表组合图的情况
          legendSetting=this.chartDetailData.pieLegend
          legendSetting.x2='10'
          legendSetting.itemWidth = 17
          legendSetting.itemHeight = 9
          legendSetting.textStyle = {
            color:"#29354D"
          }
          let seriesItems = this.chartDetailData.series;
          let legendData = [] //饼状和环形图的数据项
          seriesItems.data.forEach((element,index) => {
            legendData.push({
              name:element.name,
              value:element.value,
              label:{//单独设置标签和标线是否显示，数值为0时不显示
                show: element.value!=0,
              },
              labelLine: {
                show: element.value!=0
              }
            })
          });
          this.isCircle = seriesItems.radius&&seriesItems.radius.length>0 //是环形图的话，中间会显示文字
          this.circleMiddleTxt =  this.chartDetailData.name//是环形图的话，中间显示的文字内容

          seriesSettings.push({
            name: this.chartDetailData.name,
            type: 'pie',
            radius:seriesItems.radius&&seriesItems.radius.length>0 ? seriesItems.radius : '70%',//环形返回数组，圆形返回字符串，如'50%'
            data: legendData,
            color:seriesItems.color,
            label: {
                normal: {
                  textStyle : {
                    fontWeight : 'normal',
                    fontSize : 14
                  },
                  position: 'outside',
                  color:'#29354d',
                  formatter:(argument)=>{
                    return this.formatNum(argument.value)
                  }
                }
            }
          });

          options = {
            title: { text:serierTitle,x:20,y:10,textStyle:{fontSize:12,color:'#ABABAB'}},
            tooltip: [
              {	trigger: 'item',
                formatter: "{a}</br>{b} : {d}%",
              }],
            grid:{
              top:40,
              containLabel: true,
              show:false,
              left:0,
            }, //去掉边框
            legend:legendSetting,
            series:seriesSettings
          }
        } else {
        // 图例常规设置设置s
          legendSetting={
            itemGap:20,
            itemWidth:17,
            itemHeight:9,
            x2: '10',
            data:seriesTxt,
            textStyle:{
              color:"#29354D"
            }
          }
          //只有一条数据项是不用显示图例
          if(this.chartDetailData.series.length>1){
            legendSetting.show=true
          }
          else{
            legendSetting.show=false
          }
        // 图例常规设置设置e
        // 表格单位设置 s
          if(this.chartDetailData.axisY.left == null){
            serierTitle =''
          }else{
            serierTitle = this.chartDetailData.axisY.left.unit  //表格单位
          }
        // 表格单位设置 e
          xAxisSetting = {
              axisLine: {show: false},
              axisTick: {show: false},
              axisLabel: {
                interval: 0,
                formatter:function(value,index)
                {
                  var ret = "";//拼接加\n返回的类目项
                  var maxLength = 8;//每项显示文字个数
                  var valLength = value.length;//X轴类目项的文字个数
                  var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                  if (rowN > 1)//如果类目项的文字大于3,
                  {
                      for (var i = 0; i < rowN; i++) {
                          var temp = "";//每次截取的字符串
                          var start = i * maxLength;//开始截取的位置
                          var end = start + maxLength;//结束截取的位置
                          //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                          temp = value.substring(start, end) + "\n";
                          ret += temp; //凭借最终的字符串
                      }
                      return ret;
                  }
                  else {
                      return value;
                  }

                }
              }
            }
          if(this.chartDetailData.axisX && this.chartDetailData.axisX.data){
            xAxisSetting.type = this.chartDetailData.axisX.data ? 'category' :'value'
            xAxisSetting.data=this.chartDetailData.axisX.data
          }
          else{
              xAxisSetting.axisLabel.textStyle=this.chartDetailData.axisY.data?{
                color: '#fff'
              }:{}
          }
          if(this.chartDetailData.axisY.data){ //纵向展示，一般是柱形图
              let min = parseFloat(this.chartDetailData.axisX.min),
              max =parseFloat(this.chartDetailData.axisX.max),
              lineNum = 9; //显示几条北京线
              this.chartDetailData.axisY.data.forEach((item)=>{
                if(item.length>5){ //如果有轴的文字字数超过5个字就显示6条，否则显示十条
                  lineNum=6
                }
              })
              yAxisSetting.push({
                show:true,
                splitLine: { //背景线
                  show: false
                }, //坐标轴在 grid 区域中的分隔线。在这里即横线
                axisLine: {show: false},
                axisTick: {show: false},
                type: 'category',
                data: this.chartDetailData.axisY.data
              })
              xAxisSetting.min=min
              xAxisSetting.max=max
              xAxisSetting.interval=(min != max)?((max-min)/lineNum) : (max/lineNum)
              xAxisSetting.splitLine={ //背景线
                  show: true,
                  lineStyle:{
                  color:"#F1F1F1"}
                }
            }

            if(this.chartDetailData.axisY.left){ //y轴主轴
              let min = parseFloat(this.chartDetailData.axisY.left.min),
              max =parseFloat(this.chartDetailData.axisY.left.max);
              yAxisSetting.push({
                splitLine: {//背景线
                  show: true,
                  lineStyle:{
                  color:"#F1F1F1"}
                },
                axisLine: {show: false},
                axisTick: {show: false},
                min:min,
                max:max,
                interval: (min != max)?((max-min)/7) : (max/7),
                axisLabel: {textStyle: {fontSize:'0'}},
                type:'value'
              })
            }
            if(this.chartDetailData.axisY.right!=null){ //y轴次轴
              let min = parseFloat(this.chartDetailData.axisY.right.min),
              max =parseFloat(this.chartDetailData.axisY.right.max);
              yAxisSetting.push({
                splitLine: { //背景线
                  show: true,
                  lineStyle:{
                    color:"#F1F1F1"
                  }
                },
                axisLine: {show: false},
                axisTick: {show: false},
                min:min,
                max:max,
                interval: (min != max)?((max-min)/7) : (max/7),
                axisLabel: {textStyle: {fontSize:'0'}},
                type:'value'
              })
            }
          //每个数据项系列的设置
          for(let i=0; i<this.chartDetailData.series.length; i++){
            let seriesItem = this.chartDetailData.series[i];
            seriesTxt.push(seriesItem.name);
            let seriesSettingsOption = {
              name: seriesItem.name,
              type: seriesItem.type, //图表类型

              label: {
                normal: {
                  textStyle : {
                    fontWeight : 'normal',
                    fontSize : 14
                  },
                  show: seriesItem.valueShow!=0, //节点是否显示数值
                  formatter:seriesItem.unit==='%'?'{c}%':'{c}',
                  position: this.chartDetailData.axisY.data?'right':'top',//默认每个节点上方显示数值，纵向图显示在右边
                  formatter:(p)=>{
                    if(seriesItem.unit==='%'){
                      return p.value+'%'
                    }
                    else{
                      return this.formatNum(p.value);
                    }
                  }
                }
              }
            }
            //如果有次轴，就代表max和min大小值不同
            if(this.chartDetailData.axisY.right!=null){
              if(yAxisSetting.length >= parseInt(seriesItem.axisType)){
                seriesSettingsOption.yAxisIndex = parseInt(seriesItem.axisType)-1
              }
              else{
                seriesSettingsOption.yAxisIndex = yAxisSetting.length-1
              }
            }
            //如果是柱形图s
            if(seriesItem.type==='bar'){
              // seriesSettingsOption.barWidth = '25%' //支持设置成相对于类目宽度的百分比
              seriesSettingsOption.barMaxWidth = '10'; //给他设置个最大宽度，不让他太宽
              seriesSettingsOption.itemStyle = {
                normal: {
                  barBorderRadius: 5
                },
                emphasis: {
                  barBorderRadius: 0
                }
              };
              let _barDatas = seriesItem.data; //  柱状图中 的series中data的值

             // 初始化colorlist变量为[]
              let colorlist = [];

              if(seriesItem.colorList){
                colorlist = seriesItem.colorList; //  柱状图中 的series中color的值
              }

              // 初始化barDatasList变量为[]
              let barDatasList = [];

              //  遍历 data的值  赋值给数组barDatasList的每一个 {}
              _barDatas.forEach(function(ele, index){
                barDatasList.push({
                  value:ele,
                });
              });

              //  组合 barDatasList  中的data和colorlist 成为对象
              //  {value:'',color:''}格式
              //  遍历 data的值  赋值个数组中的 {}
              barDatasList.forEach(function(ele, index){
                ele.color = colorlist[index];
              });

              // 初始化colorlist变量为[]
              seriesSettingsOption.data = [];

              barDatasList.forEach(function(ele, index){
                seriesSettingsOption.data.push({
                  value:ele.value,
                  itemStyle:{
                    color:ele.color
                  }
                });
              });
            } else {
              // seriesSettingsOption.data = seriesItem.data.concat(seriesItem.data);
              seriesSettingsOption.data = [].concat(seriesItem.data);
            }
            //如果是柱形图e
            //如果是面积图s
            if(seriesItem.type=='line'&&seriesItem.areaStyle==1){
              seriesSettingsOption.areaStyle={ //面积图渐变色
                normal: {
                  opacity: 0.5,
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1, [{
                      offset: 0,
                      color: '#C0E2F9'
                    },
                      {
                        offset: 1,
                        color: '#fff'
                      }
                    ]
                  )
                }
              }
              xAxisSetting.boundaryGap =false
              xAxisSetting.splitLine={ //背景线
                  show: true,
                  lineStyle:{
                  color:"#F1F1F1"
                }
              }
            }
            //如果是面积图e
            //如果是折线图s
            if(seriesItem.type=='line'){
              // 折线图节点圆点设置s
              seriesSettingsOption.symbol = "circle" //设定为实心点,emptyCircle为空心
              seriesSettingsOption.symbolSize  = 6  //圆点大小
              seriesSettingsOption.showSymbol = (seriesItem.symbolShow!=0);//是否显示折线图的小圆点

              if(seriesSettingsOption.data.length<=1){ //单个数据的折线图点击出现重影问题解决
                seriesSettingsOption.hoverAnimation= false
              }
              // 折线图节点圆点设置e
            }
            //如果是折线图e

            seriesSettings.push(seriesSettingsOption);

            // 颜色
            if(seriesItem.color){
              colors.push(seriesItem.color)
            }
            else{
              colors.push('#83BAFF')
            }
          }
          // 饼状和环形图以外的图表
          options = {
            title: {
              text:(serierTitle=='%'||serierTitle=='笔')?"":serierTitle,
              x:10,
              y:10,
              textStyle:{
                fontSize:12,
                color:'#ABABAB'
              }
            },
            legend:legendSetting,
            color:colors,
            grid:{ //直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴
              x:20,
              y:legendSetting.show?50:20,
              x2:(serierTitle=='%'||serierTitle=='笔')?20:25,
              y2:20,
              containLabel: true,
              show:false
            },
            tooltip:
              {
                trigger: 'axis',
                formatter:(params)=>{ //格式化数据
                  let len = params.length,
                      lastReturn =params[0].name;
                  for(let i=0; i<len; i++){
                    if(this.chartDetailData.series[i].unit=="%"){ //如果单位是百分号的加上百分号
                      lastReturn = lastReturn + "<br/>" + params[i].seriesName + "：" + params[i].value + '%'
                    }
                    else{
                      lastReturn = lastReturn + "<br/>" + params[i].seriesName + "：" + params[i].value
                    }
                  }
                  return lastReturn
                }
            },
            xAxis: xAxisSetting,
            yAxis:yAxisSetting.length>0 ? yAxisSetting : '',
            series:seriesSettings,
            // dataZoom:[
            //   {
            //     type: 'slider',
            //     show: false, //flase直接隐藏图形
            //     xAxisIndex: [0],
            //     left: '9%', //滚动条靠左侧的百分比
            //     bottom: -5,
            //     start: 0,//滚动条的起始位置
            //     end: 50 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
            //   },
            //   {
            //     type: 'inside',
            //     show: false,
            //     start: 0,
            //     end: 50
            //   }
	          // ],
          }
        }
        this.myChart = echarts.init(this.$refs.idName)
        this.myChart.resize();
        this.myChart.setOption(options);
      }
    }
  };

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .money
    width 100%
    margin-top 16px
    padding-top 10px
    position: relative
    background-color #FFFFFF
   .chart
     display flex
     border-bottom 2px solid #F6F8F9
     padding 6px 0 16px 0
     line-height 22px
     postion relative
     .chart-inner
      display flex
      flex 1
  .chartTitle
      font-family PingFangSC-Medium
      font-size 18px
      color #29354D
      margin-left 19px
      float left
      flex 1
    .money-1
      width 28px
      height 28px
      position absolute
      top 14px
      right 67px
    .money-2
      width 28px
      height 28px
      position absolute
      top 14px
      right 20px
  .content-wrap
    position relative
   .circle-txt
     font-family PingFangSC-Light
     font-size 14px
     color #29354D
     position absolute
     top 50%
     left 50%
     transform translate(-50%, -50%)
   .chart-wrap
      display block
      min-width 375px
      width 100vw
      height 284px
      margin-top 10px


  .renwu_open
    width 100%
    margin 0
    margin-top 1px
    .form_show
      width 100%
      border-bottom 1px solid #ffffff
      .form_bottom
        width 100%
        display flex
        padding 0
        margin 0
        background-color #f6f8f9
        .bgrow
          background-color #fff
        ul
          list-style none
          margin 0
          padding 0
          flex 1
          li
            height 36px
            text-align center
            line-height 36px
            color black
            padding 0
            margin 0
          li.form_top
            width 100%
            height 36px
            display flex
            line-height 36px
            background-color #E7F1FF
            font-size 14px
            color #29354D
            letter-spacing 0
            text-align center
            align-items: center;
            justify-content: center;
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
   .slide-fade-enter-active{
     -webkit-transition: all .2s ease;
     transition: all .2s ease;
   }
   .slide-fade-enter, .slide-fade-leave-active {
     opacity: 0;
     -webkit-transform: translateX(100%);
     transform: translateX(100%)
   }
   .slide-fade-leave-active, .slide-fade-enter {
     opacity: 0;
     -webkit-transform: translateX(-100%);
     transform: translateX(-100%);
   }
   .slide-fade2-enter-active{
     -webkit-transition: all .2s ease;
     transition: all .2s ease;
   }
   .slide-fade2-enter, .slide-fade2-leave-active {
     opacity: 0;
     -webkit-transform: translateX(100%);
     transform: translateX(100%)
   }
</style>
