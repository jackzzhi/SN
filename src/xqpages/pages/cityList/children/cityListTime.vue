<template>
  <div>
  <div class="wrapper-citylist-price">
    <table class="table">
      <tr>
        <th class="first">{{this.Header[0]}}</th>
        <th class="second">{{this.Header[1]}}</th>
        <th>{{this.Header[2]}}</th>
      </tr>
      <tr v-for='(item, index) in listData'>
        <template v-for='items in item'>
            <td>{{items}}</td>
          </template>
      </tr>

    </table>
  </div>
    <div class="nodata" v-show="isNoData">
      <div>
        <img class="nodata_img" src="@/assets/images/wushuju.png"/>
      </div>
      <span class="nodata_title">暂无相关数据</span>
    </div>
    <div  class="bottom_msg"  v-show="Bottomshow2" :class="Bottomshow?'bottom_msg_fixed':'bottom_msg_fiseds'">
      <span>—&nbsp;&nbsp;向前金服&nbsp;</span>
        <b class="dots"></b>
        <span>&nbsp;向前向未来&nbsp;&nbsp;—</span>
    </div>
    <div class="topBar" id="goTop">
      <img src="@/assets/images/zhiding.png" alt="" class="goTop" v-show="goTopShow" @click="goTop">
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  export default {
    data(){
      return {
        Header:[],
        // listData:[],
        listData:[],
        Bottomshow:false,
        Bottomshow2:false,
        bottomLoading:false,
        isNomle_bottom:false,// 判断到底部标识
        isNoData:false,//暂无数据
        goTopShow:false,// 返回顶部
        isRequested:false,//请求成功后执行下次请求表示
        page:1,
        bottomFixed:true,
        _scrollTop:0,
        flag:true,
        subjectId:null
      }
    },
    components:{
    },
    computed:{
      ...mapGetters(['userid']),
    },
    created(){


    },
    destroyed() {
      this.addListener()
      // this.removeListener()
    },
    mounted(){
      this.getDataList();

    this.$nextTick(()=>{
        window.scrollTo(0,0);
        this.addListener();
      })
    },
    methods:{
      ...mapActions(['saveLoadingShow']),
      goTop(){
        let timer = null,_that = this;
        cancelAnimationFrame(timer)
        timer = requestAnimationFrame(function fn(){
          if(_that.scrollTop>0){
            _that.scrollTop-=50;
            document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
            timer = requestAnimationFrame(fn);
          }else {
            cancelAnimationFrame(timer);
            _that.goTopShow = false;
          }
        })
      },
      getDataList(){
        if(this.isRequested) {
          return false;
        }
         if(this.$route.query.currentType === 'today'){
        	this.subjectId = 406
//      	console.log(this.subjectId)
        }else{
        	this.subjectId = 407
        }

        this.isRequested = true;
        this.saveLoadingShow(true)
        let token = this.userid;
        this.$ajax({
          method: 'post',
          url: '/saasbi/cockpit/xiangqian/list',
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
//          token: this.userid,
          	token:this.userid,
            subjectId: '' + this.subjectId,
            masterNo: '04',
            pageSize:'20'
          }),
        }).then(res=>{  // 请求成功
          if(res.data.code!=500){this.saveLoadingShow(false)}
          if(res.data.code == 200){
            var resData = res.data.data
            // console.log(resData)
            resData.forEach((item,index)=>{
              if(item.id == 415){
                this.listData = item.datas[0].rows;
                this.Header = item.datas[0].header;
              }
              if(this.subjectId == 407){

                if(item.id == 434){
                  // console.log(item.datas)
                  this.listData = item.datas[0].rows;
                  this.Header = item.datas[0].header;
                }
              }
            })


            // 判断没有任何数据的时候显示的是无数据提示
            if(this.listData.length == 0){
              this.isNoData = true
              this.Bottomshow2 =false
            }else{
              this.isNoData = false
              this.Bottomshow2 = true
            }
          }else if(res.data.code == 407){ //被踢出登录，返回登录页
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
      loadBottom() {// 加载更多数据
        if(this.isNomle_bottom) return;
        this.bottomLoading = true;

        setTimeout(()=>{
          this.getDataList();
        },500);
      },
      addListener(){
        window.addEventListener('scroll', this.handleScroll);
      },
      handleScroll () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        //回到顶部
        if(scrollTop > 400){
          this.goTopShow = false;
          this.scrollTop = scrollTop;
        }
        else{
          this.goTopShow = false;
        }
      },
    },
    watch:{
    },
    updated(){
      let Body = document.querySelector('body').clientHeight;
      let TableH = document.getElementsByClassName('table')[0].clientHeight;
      let listBottom = document.getElementsByClassName('table')[0].offsetTop;
      let bottom_msg = document.getElementsByClassName('bottom_msg')[0].clientHeight;
      let Last = TableH + listBottom;
      if( (Body *1 - Last*1) > bottom_msg*1 ){
        this.Bottomshow = true
      }else{
        this.Bottomshow = false
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './index.styl';
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
