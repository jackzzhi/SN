<template>
  <div class="wrapper-plutocratList-price">
    <div class="content-plutocratList-price"  v-show="tables">
      <div class="plutocratList-price">
        <div class="title">{{this.Title}}富豪排行TOP3</div>
        <div class="plutocratList-price-hd" >
          <div v-for="(item,index) in todayNabobRankingList" :key="index">
            <div class="item" v-if="index ==0" >
              <div class="two"></div>
              <div class="person">
                <span v-if="indexs == 2 && index==0" v-for="(items,indexs) in item" :key="indexs">{{items}}</span>
                <span v-if="indexs == 1 && index==0" v-for="(items,indexs) in item" :key="indexs">{{items}}</span>
              </div>
              <p class="price"> <span v-if="indexs == 4 && index==0"  v-for="(items,indexs) in item" :key="indexs">{{items}}</span>万</p>
              <p class="time" v-if="indexs == 3 && index==0"  v-for="(items,indexs) in item" :key="indexs">{{items}}</p>
            </div>
            <div class="item" v-if="index ==1">
              <div class="one"></div>
              <div class="person">
                <span v-if="indexs == 2 && index==1" v-for="(items,indexs) in item" :key="indexs">{{items}}</span>
                <span v-if="indexs == 1 && index==1" v-for="(items,indexs) in item" :key="indexs">{{items}}</span>
              </div>
              <p class="price"> <span v-if="indexs == 4 && index==1"  v-for="(items,indexs) in item" :key="indexs">{{items}}</span>万</p>
              <p class="time" v-if="indexs == 3 && index==1"  v-for="(items,indexs) in item" :key="indexs">{{items}}</p>
            </div>
            <div class="item" v-if="index ==2">
              <div class="three"></div>
              <div class="person">
                <span v-if="indexs == 2 && index==2" v-for="(items,indexs) in item" :key="indexs">{{items}}</span>
                <span v-if="indexs == 1 && index==2" v-for="(items,indexs) in item" :key="indexs">{{items}}</span>
              </div>
              <p class="price"> <span v-if="indexs == 4 && index==2"  v-for="(items,indexs) in item" :key="indexs">{{items}}</span>万</p>
              <p class="time" v-if="indexs == 3 && index==2"  v-for="(items,indexs) in item" :key="indexs">{{items}}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="hr"></div>


    <div class="table" ref="table">
      <div class="th-block" v-show="tables">
        <div class="th">排名</div>
        <div class="th">姓名</div>
        <div class="th">详情</div>
        <div class="th">明细</div>
      </div>
      <div class="content-block" v-for="(item,key) in listData">
        <div class="content-block-hd">
          <div class="td one" v-if="key+1===1"></div>
          <div class="td two" v-else-if="key+1===2"></div>
          <div class="td three" v-else-if="key+1===3"></div>
          <div class="td normal" v-else="key+1<4">{{key+1}}</div>
          <div class="td td2">{{item.rows[1]}}</div>
          <div class="td">
            <span class="city">{{item.rows[2]}}</span>
            <span class="price">{{item.rows[5]}}<span class="wan">万</span></span>
            <p class="time">{{item.rows[3]}}</p>
          </div>
          <div class="td shouqi" :class="item.detailShow?'zhankai':'shouqi'" @click="toggle(item)"></div>
        </div>
        <div class="content-block-detail" v-show="item.detailShow">

          <div class="content-block-detail-tr" v-for="(val,index) in item.children">
            <div class="item">{{val.rows[4]}}</div>
            <div class="item price">{{val.rows[5]}}<span class="wan">万</span></div>
            <div class="time">{{val.rows[3]}}</div>
            <div class="line"></div>
          </div>

        </div>

      </div>
    </div>
    <div class="bottom_msg" v-show="Bottomshow2" :class="Bottomshow?'bottom_msg_fixed':'bottom_msg_fixeds'">
        <span>—&nbsp;&nbsp;向前金服&nbsp;</span>
        <b class="dots"></b>
        <span>&nbsp;向前向未来&nbsp;&nbsp;—</span>
    </div>
    <div class="topBar" id="goTop" v-show="goTopShow">
      <img src="@/assets/images/zhiding.png" alt="" class="goTop"  @click="goTop">
    </div>
    <div class="nodata" v-show="isNoData">
      <div>
        <img class="nodata_img" src="@/assets/images/wushuju.png"/>
      </div>
      <span class="nodata_title">暂无相关数据</span>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data(){
      return {
        listData:[],
        todayNabobRankingList:[],
        Bottomshow:false,
        Bottomshow2:false,
        tables:false,
        bottomLoading:false,
        isNomle_bottom:false,// 判断到底部标识
        isNoData:false,//暂无数据
        goTopShow:false,// 返回顶部
        isRequested:false,//请求成功后执行下次请求表示
        page:1,
        isSorrowShow:false,
        detailList:[],
        Title:''
      }
    },
    components:{
    },
    computed:{
      ...mapGetters(['userid'])
    },
    destroyed() {
      this.addListener()
    },
    created(){
      this.getDataList();
    },
    mounted(){
      this.$nextTick(()=>{
        window.scrollTo(0,0);
        this.addListener();
      })
    },
    methods:{
      ...mapActions(['saveLoadingShow']),
      toggle(item){
        if(item.detailShow){
          this.$set(item,'detailShow',false);
        } else {
          this.$set(item,'detailShow',true);
        }
      },
      goTop(){
        let timer = null,_that = this;
        cancelAnimationFrame(timer)
        timer=requestAnimationFrame(function fn(){
          if(_that.scrollTop>0){
            _that.scrollTop-=50;
            document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
            timer=requestAnimationFrame(fn)
          }else {
            cancelAnimationFrame(timer);
            _that.goTopShow=false;
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
        this.saveLoadingShow(true);
        var token = this.userid;
//      console.log(token)
        this.$ajax({
          method: 'post',
          url: '/saasbi/cockpit/xiangqian/list',
          dataType: 'json',
          headers: { 'Content-Type': 'application/json;charset=UTF-8' },
          data: JSON.stringify({
//          token: token,
            token:this.userid,
            subjectId: '' + this.subjectId,
            masterNo: '04',
            pageSize:'20'
          })
        }).then(res=>{  // 请求成功
          if(res.data.code!=500){this.saveLoadingShow(false)}
          if(res.data.code == 200){
            var resData = res.data.data
            resData.forEach((item,index)=>{
              if(item.id == 413){

                var arr = item.datas[0].rows;
                this.todayNabobRankingList = [];
                arr.forEach((items,index) => {
                  if(index ==1){
                    this.todayNabobRankingList.push(items);
                    this.todayNabobRankingList.push(arr[0]);
                    this.todayNabobRankingList.push(arr[2]);
                  }
                });
                this.Title = '今日'
              }else if(item.id == 414){
                this.listData = item.datas[0].dataes
              }
              if(this.subjectId == 407){

                if(item.id == 426){
                  var arr = item.datas[0].rows;
                  this.todayNabobRankingList = [];
                  arr.forEach((items,index) => {
                    if(index ==1){
                      this.todayNabobRankingList.push(items);
                      this.todayNabobRankingList.push(arr[0]);
                      this.todayNabobRankingList.push(arr[2]);
                    }
                  });
                  this.Title = '本月'
                }else if(item.id == 427){
                  this.listData = item.datas[0].dataes
                }
              }
            //判断无数据状态
            if(this.todayNabobRankingList.length == 0 || this.listData.length == 0){
              this.isNoData = true
              this.Bottomshow2 = false
              this.tables = false
            }else{
              this.isNoData = false
              this.Bottomshow2 = true
              this.tables = true
            }
            })


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
        // this.bottomLoading = true;
        setTimeout(()=>{
          // this.getDataList();
        },500);
      },
      addListener(){
        window.addEventListener('scroll', this.handleScroll);
      },
      removeListener(){
        window.removeEventListener('scroll', this.handleScroll);
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
      listData:{
　　　  handler(curVal,oldVal){
　　　　 // console.log(curVal,oldVal)
　　　　},
　　　　deep:true
　　　}
    },
    updated(){
      let Body = document.querySelector('body').clientHeight;
      let TableH = document.getElementsByClassName('wrapper')[0].clientHeight;
      let listBottom = document.getElementsByClassName('wrapper')[0].offsetTop;
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
