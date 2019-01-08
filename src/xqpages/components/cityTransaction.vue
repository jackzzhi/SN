<template>
  <div class="blue_back">
    <div class="city_transaction_content">
        <div class="ctc_top" @click="toList">
          <span class="ct_first_title">{{currentCityTransactionData.name}}</span>
          <span class="ct_second_title">各城市门店交易动态实况</span>
          <div class="ctc_right">
            <span>{{currentCityTransactionData.value+currentCityTransactionData.unit}}</span>更新
          </div>
        </div>
        <div class="ctc_bottom">
          <div class="marquee_box">
            <ul class="marquee_list" :class="{marquee_top:animate}">
              <li v-for="(item, index) in marqueeList" :key="index">
                <div class="cb_li">
                  <span class="city" v-for="(items, indexs) in item" :key="indexs" v-if="indexs==0">{{items}}</span>
                  <span class="num" v-for="(items, indexs) in item" :key="indexs" v-if="indexs==1">{{items}}</span>
                  <span class="time" v-for="(items, indexs) in item" :key="indexs" v-if="indexs==2">{{items}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import {PubSub} from "pubsub-js";
  export default {
    props:{
      currentType:Boolean,
      currentCityTransactionData:Object,// 城市出借笔数以及标题
      marqueeList:Array,//城市出借列表
    },
    data(){
      return{
        timers:null,
        updateCount:'12',//更新笔数
        animate: false,
      }
    },
    created() {
      setInterval(this.showMarquee, 2000);
    },
    beforeDestroy() {
      //清除定时器
      PubSub.subscribe('stopTimers',(msg,data)=>{
        clearInterval(this.timers)
      })
    },
    methods: {
      toList(){
        var currentTypeStr = '';
        if(this.currentType){
          currentTypeStr = 'today'
        }else{
          currentTypeStr ='month'
        }
        this.$router.push('../cityList/price?currentType='+currentTypeStr)

      },
      showMarquee() {
        var that = this;
        that.animate = true;
        that.timers = setTimeout(()=>{
          that.marqueeList.push(that.marqueeList[0]);
          that.marqueeList.shift();
          that.animate = false;
        },500)
        PubSub.publish('stopTimers');
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .blue_back
    background #f6f8f9
    padding 0 0 14px 0
  .marquee_box
    display: block
    position: relative
    width: 100%
    height: 30px
    overflow: hidden
  .marquee_list
    display: block
    position: absolute
    top: 0
    left: 0
    width:100%
  .marquee_top
    transition: all 0.5s
    margin-top: -30px
  .marquee_list li
    height: 30px
    line-height: 30px
    font-size: 14px
  .marquee_list li span
    padding: 0 2px;
  .city_transaction_content
    width: 93.3%
    padding:14px 20px 5px 17px
    box-shadow: 0 4px 8px 2px rgba(137,174,240,0.15)
    border-radius: 4px
    background:#fff
    box-sizing: border-box
    margin: 0 auto
    .ctc_bottom
      padding:5px 0 0 0
      .cb_li
        width:100%
        .city,.num
          font-size: 12.6px
          color: #29354D
        .num
          margin-left:50px
        .time
          float:right
          font-size: 10.8px
          color: #6C7B8A
    .ctc_top
      position:relative
      border-bottom:1px solid #F1F3F8
      padding-bottom:14px
      .ct_first_title
        font-size: 16px
        color: #29354D
      .ct_second_title
        font-size: 10.8px
        color: #6c7b8a
      .ctc_right
        position: absolute
        right: 0px
        top: 4px
        font-size: 12px
        color: #001700
        span
          font-size: 14px
</style>

