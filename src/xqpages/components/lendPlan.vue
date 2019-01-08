<template>
  <div class="today_lend_content">
    <div class="tlc_title">
      <p class="tc_left">{{lendGaugeTitle}}</p>
      <div class="tc_right" @click="toList">
        <span>更多</span>
        <img src="../../assets/images/youjiantou1.png" alt="">
      </div>
    </div>
    <div class="tcl_content">
      <lend-plan-gauge v-for="(item,index) in lendGaugeListData" :lendGaugeColor="lendGaugeColor" :lendGaugeTotal="lendGaugeTotal" :chartData="item" :key="index"></lend-plan-gauge>
    </div>
  </div>
</template>
<script>
  import lendPlanGauge from '../components/lendPlanGauge'
  export default {
    data(){
      return{

      }
    },
    created(){
    },
    components:{
      lendPlanGauge
    },
    methods: {
      //查看出借计划分布列表
      toList(){
        document.documentElement.scrollTop = 0;
        document.body.scrollTop =0;

        //currentType  true:today   false:month
        var currentTypeStr = '';
        if(this.currentType){
          currentTypeStr = 'today'
        }else{
          currentTypeStr ='month'
        }
        if(this.$route.path == '/achievement/today'){
          this.$router.push('/lendPlanList/today?currentType='+currentTypeStr)
        }else{
          this.$router.push('/lendPlanList/month?currentType='+currentTypeStr)
        }

      }
    },
    props:{
      currentType:Boolean,
      lendGaugeListData:Array,//今日出借计划分布仪表盘数据
      lendGaugeTotal:NaN,//获取出借总金额
      lendGaugeTitle:String,//今日出借计划分布title
      lendGaugeColor:Array,//获取出借计划分布仪表盘color
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .today_lend_content
    width 93%
    padding:14px 20px 15px 0px
    box-shadow: 0 4px 8px 2px rgba(137,174,240,0.15)
    border-radius: 4px
    background:#fff
    box-sizing: border-box
    margin: 0 auto 14px
    .tlc_title
      position:relative
      padding-left 17px
      &:after
        content:''
        display:block
        width: 100%
        height: 1px
        background: #F1F1F1
        position:absolute
        bottom: 0px
        right:0px
        left 14px
      overflow:hidden
      .tc_left
        font-size: 16px
        color: #010E4F
        margin:2px 0 13px 0
        float:left
      .tc_right
        float:right
        span
          font-size: 12px
          color: #29354D
        img
          width:15px
          vertical-align: text-bottom
    .tcl_content
      display: flex
      padding-left 11px
</style>

