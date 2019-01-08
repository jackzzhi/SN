<template>
  <div class="gender_echart">
    <div class="title">
      <span class="line" :style="'background-color:'+colorData"/>
      <span class="title_name">{{chartData.title}}</span>
    </div>
    <ul>
      <li v-for="(item,index) in chartData.datas[0].axisY.data" :key="index">
        <div class="nan_wrap">
         <div class="img_wrap">
          <img v-if="item==='男'" src="../../assets/images/nan.png"/>
          <img v-if="item==='女'" src="../../assets/images/nv.png"/>
          <img v-if="item==='未知'" src="../../assets/images/qita.png"/>
          <span v-if="item==='男'" class="nan_text">{{item}}</span>
          <span v-if="item==='女'" class="nv_text">{{item}}</span>
          <span v-if="item==='未知'" class="wz_text">{{item}}</span>
        </div>
         <div class="xian_wrap" id="bar">
          <div class="pel" :style="widthList[index]<1?'width:50px':'width:'+widthList[index]+'px;'"><span>{{chartData.datas[0].series[0].key[index]}}</span></div>
          <div class="huixian" ></div>
          <div v-show="item==='男'" class="lanxian" :style="'width:'+widthList[index]+'px;'"></div>
          <div v-show="item==='女'" class="fenxian" :style="'width:'+widthList[index]+'px;'"></div>
          <div v-show="item==='未知'" class="zixian" :style="'width:'+widthList[index]+'px;'"></div>
        </div>
         <div class="text_wrap" >
            <!--<span class="text">{{zhanbiList[index]}}%</span>-->
           <span class="text">{{zhanbiList[index]*100|numFilter}}%</span>
          </div>
        </div>
      </li>
    </ul>
    <img class="line" src="../../assets/images/hudu.png"/>
    <div class="content"><span class="content_child">{{chartData.desc}}</span></div>
  </div>
</template>

<script>
    export default {
      props:{
        chartData:{
          required:true
        },
        colorData:String
      },
      data(){
        return{
          zhanbiList:[],//占比数组
          widthList:[],//宽度数组
          // xianColorList:['#5B96FF','#E77296','#9A98F2'],
        }
      },
       mounted(){
         this.$nextTick(() => {
           for(var i=0;i<this.chartData.datas[0].series[0].data.length;i++){
             this.zhanbiList.push(this.chartData.datas[0].series[0].data[i])
           }
           for(var i=0;i<this.zhanbiList.length;i++){
             this.widthList.push(this.zhanbiList[i]*document.getElementById("bar").offsetWidth)
           }
         })
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
  .gender_echart
    margin-top 6px
    margin-left  12px
    margin-right 12px
    .title
      width 100%
      height 40px
      line-height 40px
      background-color #fff
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      .line
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
    ul
     list-style none
     padding-bottom 20px
     background-color #fff
     li
      .nan_wrap
       height 77px
       display flex
       align-items center
       .img_wrap
         text-align center
         margin-left 10px
         width 40px
         height 33px
         img
          width 12px
          height 33px
         span
          display block
          font-family PingFangSC-Light
          font-size 12px
          letter-spacing 0
         .nan_text
           color #5B96FF
         .nv_text
           color #E77296
         .wz_text
           color #9A98F2
       .xian_wrap
         margin-right 8px
         width 6.5rem
         .pel
          text-align center
          span
           font-family PingFangSC-Regular
           font-size 12px
           color #010E4F
           letter-spacing 0
           text-align justify
           line-height 23px
        .huixian
         height 6px
         width 100%
         background-color  #EDEDED
        .lanxian
         height 6px
         background-color  #5B96FF
         margin-top -6px
        .fenxian
         height 6px
         background-color  #E77296
         margin-top -6px
        .zixian
         height 6px
         background-color  #9A98F2
         margin-top -6px
       .text_wrap
         padding-top 23px
         width 10px
         .text
          font-family PingFangSC-Regular
          font-size 11px
          color #010E4F
    .line
     width 100%
    .content
      padding 10px 10px 10px 14px
      margin-top -2px
      width 100%-36px
      background #fff
      border-bottom-left-radius: 4px
      border-bottom-right-radius: 4px
      .content_child
        margin-top 10px
        margin-bottom 10px
        ont-family: PingFangSC-Light
        font-size: 14px
        color: #A6A6A6
        letter-spacing: 0
        line-height: 23px

</style>
