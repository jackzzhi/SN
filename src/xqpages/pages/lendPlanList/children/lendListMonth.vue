<template>
  <div class="lend_plan_list_content">
    <div class="content">
      <mt-loadmore class="loadmorestwo"  @top-status-change="handleTopChange" ref="loadmore" :maxDistance="90">
        <!--<div class="tab">-->
          <!--<div class="today" @click="changeRouterToday"><span>今日</span></div>-->
          <!--<div class="month" ><span class="active">本月</span></div>-->
        <!--</div>-->
        <ul class="ul_content" id="ul">
          <li v-for="(item,index) in dataItem" :key="index">
            <div class="li_content">
              <b :style="{'background':item.color}"></b>
              <p>{{item.name}}</p>
              <span class="Num">{{Math.round((item.value / score)*100) }}</span><span class="unit">%</span>
            </div>
          </li>
        </ul>
        <div  class="bottom_msg" v-show="Bottomshow2" :class="Bottomshow ? 'bottom_msg_fixed' : 'bottom_msg_fixeds'">
          <!-- <span class="line line1"></span>我是有底线的<span class="line line2"></span> -->
          <span>—&nbsp;&nbsp;向前金服&nbsp;</span>
          <b class="dots"></b>
          <span>&nbsp;向前向未来&nbsp;&nbsp;—</span>
        </div>
        </mt-loadmore>
      <div class="nodata" v-show="isNoData">
        <div>
          <img class="nodata_img" src="@/assets/images/wushuju.png"/>
        </div>
        <span class="nodata_title">暂无相关数据</span>
      </div>
      </div>
  </div>
</template>
<script>
  import { Loadmore } from 'mint-ui'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data(){
      return{
        Bottomshow:false,
        Bottomshow2:false,
        topStatus: '',
        isNoData:false,//没有数据
        dataItem:[],
        score:0
      }
    },
    created(){
      this.getDataList()
    },
    computed:{
      ...mapGetters(['userid']),
    },
    components:{
      Loadmore
    },
  mounted(){


  },
    methods: {
    	...mapActions(['saveLoadingShow']),
    	getDataList(){

        this.saveLoadingShow(true)
    		this.$ajax({
          method: 'post',
          url: '/saasbi/cockpit/xiangqian/list',
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
         token: this.userid,
            subjectId: '407',
            masterNo: '04',
            pageSize:'20'
          }),
        }).then(res=>{
         if(res.data.code!=500){this.saveLoadingShow(false)}
          if(res.data.code == 200){
            var resData = res.data.data
            // console.log(resData)
            resData.forEach((item,index)=> {
              if (item.id == 425) {
                this.dataItem = item.datas;
               // 出借计划数据处理百分比
              for (var i = 0; i < this.dataItem.length; i++) {
                this.score += parseInt(this.dataItem[i].value)
              }
              }

            })
              if(this.dataItem.length == 0){
              this.isNoData = true
                this.Bottomshow2 = false
              }else{
                this.isNoData = false
                this.Bottomshow2 = true
              }

          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.$logOut();
          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1'
            }); //退出记住密码
          } else {
            this.$toast(res.data.msg);
          }
          setTimeout(()=>{
            this.isRequested = false;
          },500);
        }).catch(function(err){// 请求失败
          console.log(err);
          this.isRequested = false;
        })
    	},
      changeRouterToday(){//今日
        this.$router.push('/lendPlanList/today?currentType='+this.$route.query.currentType);
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
    },
    updated(){
      let Body = document.querySelector('body').clientHeight;
      let TableH = document.getElementsByClassName('ul_content')[0].clientHeight;
      let listBottom = document.getElementsByClassName('ul_content')[0].offsetTop + document.getElementsByClassName('content')[0].offsetTop;
      let bottom_msg = document.getElementsByClassName('bottom_msg')[0].clientHeight;
      let Last = TableH + listBottom;
      if( (Body *1 - Last*1) > bottom_msg*1 ){
       this.Bottomshow = true
      }else{
        this.Bottomshow = false
      }
    let obj=[]
    let lastNum = document.getElementsByClassName('Num')
    for(let i = 0;i<lastNum.length-1;i++){
        obj.push(Number(lastNum[i].innerHTML))
    }
    var sum =0
    for(let j =0;j<obj.length;j++){
      sum += obj[j]
    }
    document.getElementsByClassName('Num')[lastNum.length-1].innerHTML=100-sum
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../../assets/css/loaders.css";
@import "./index.styl"

.nodata{
  width: 100%
  height: 100%
  text-align: center
  line-height: 20px
  position :relative
  margin-top: 40%

}
.nodata_img{
  width: 214px !important
  height: 157px !important}
.nodata_title{
  font-family: PingFangSC-Regular
  font-size: 14px
  color :#909090
  letter-spacing: 0
  text-align: center
}
</style>

