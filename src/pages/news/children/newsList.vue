<template>
  <div class="personnal_wrap" id="wrapper">
    <white-header title="我的消息"></white-header>
    <div class="nodata" v-if="isNoData">
      <div>
        <img src="@/assets/images/wushuju.png"/>
      </div>
      <span>暂无相关数据</span>
    </div>
      <div class="list">
          <div class="sign " v-for="(item, index) in dataLists" :key="index" @click="toDetail(item.id)">
              <div class="sign1" v-show="item.sendTime">{{item.sendTime}}</div>
              <div class="sign2">
                <p class="sign2-1" :class="timeBarType(item.msgStatus)">{{item.title}}</p>
                <img src="@/assets/images/news.png"  width="100%"/>
                <div class="sign2-2" :class="timeBarType(item.msgStatus)" v-html='item.content'></div>
              </div>
              <div class="sign3" >
                  <span class="sign3-1" :class="timeBarType(item.msgStatus)">查看详情</span>
                <img src="@/assets/images/youjiantou1.png" :class="timeBarType(item.msgStatus)"/>
              </div>
          </div>
    </div>
    <div slot="bottom" class="mint-loadmore-bottom" v-show="bottomLoading">
      <div class="icon"><mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner></div>
      <span>正在加载...</span>
    </div>
    <div v-show="isNomle_bottom && !isNoData" class="no-data mint-loadmore-bottom"><span class="line line1"></span>我是有底线的<span class="line line2"></span></div>
    <div class="topBar" id="goTop">
      <img src="@/assets/images/zhiding.png" alt="" class="goTop" v-show="goTopShow" @click="goTop">
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name:'newRemind',
    data(){
      return {
        isNomle_bottom:false,// 判断到底部标识
        isRequested:false,//请求成功后执行下次请求表示
        dataLists:[],
        sendTimeNews:true,
        page:1,
        title: '',
        goTopShow:false,
        bottomLoading:false,
        isNoData:false,//暂无数据
        currentPageName:'newRemind',
        query:{
        },
        touchstartY:0//touchstart的y坐标
      }
    },
    computed:{
      ...mapGetters(['userid']),
    },
    created(){
      this.toGetUnReadMsgNum();
      this.dataList();
    },
    mounted(){
      this.$nextTick(()=>{
        window.scrollTo(0,0);
        this.scrollAddListener();
        this.touchAddListener()
      })
    },
    beforeDestroy(){
      this.scrollRemoveListener()
      this.touchRemoveListener()
    },
    methods:{
      ...mapActions(['saveLoadingShow']),
      toDetail(id){
        this.$router.push({
          path:'/news/detail',
          query:{
            'to':'newsDetail',
            'itemid':id
          }});
      },
      scrollAddListener(){
        window.addEventListener('scroll', this.handleScroll);
      },
      scrollRemoveListener(){
        window.removeEventListener('scroll', this.handleScroll);
      },
      handleScroll () {
        if(this.currentPageName ==='newRemind'){
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
          const windowHeight = document.body.clientHeight || document.documentElement.clientHeight
        //滚动加载更多
        if(scrollTop + windowHeight >= scrollHeight-100){ 
          this.loadBottom(); 
        }
        //回到顶部
        if(scrollTop > 400){
          this.goTopShow = false;
          this.scrollTop = scrollTop;
        } else {
          this.goTopShow = false;
        }
      }
      },
      loadBottom() {// 加载更多数据
        if(this.isNomle_bottom) return;
        this.bottomLoading = true;
        setTimeout(()=>{
          this.dataList();
        },500);
      },
      goTop(){
        let timer = null, 
            _that = this;
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn(){
          if(_that.scrollTop>0){
            _that.scrollTop-=50;
            document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
            timer = requestAnimationFrame(fn)
          }else {
            cancelAnimationFrame(timer);
            _that.goTopShow=false;
          }
        })
      },
      timeBarType(msgStatus) {
        if(msgStatus == 0) return 'b';//没看过
        if(msgStatus == 1) return 'a';//看过
      },
      dataList(){
        if(this.isRequested) {
          return false;
        }
        this.isRequested = true;
        this.saveLoadingShow(true);

        this.$ajax({
          method: 'post',
          url: '/mc-message/message/list',
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            token: this.userid,
            currentPage:this.page,
          }),
        }).then(res=>{
          if(res.data.code != 500){this.saveLoadingShow(false);}
          if(res.data.code == 200){

            // 判断没有任何数据的时候显示的是无数据提示
            if(res.data.data && res.data.data.length<1 && this.page===1){
              this.isNoData = true;
               return;
            }
            // 加载到最后一页没有数据的情况
            else if(res.data.data.length<1 && this.page !==1){
              this.isNomle_bottom = true;
              this.bottomLoading = false;
              return;

              // 返回有数据就把 原dataPlanLists和返回数据合并数组
            } else {
              this.dataLists = this.dataLists.concat(res.data.data);
              this.page++;
            }

          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1' 
            }); //退出记住密码
          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页

            this.$router.push('/login');
            if(window.webkit){
              window.webkit.messageHandlers.deleteUserId.postMessage({
                type:'2',userId:''
              })
            }
          }else{
            this.$toast(res.data.msg)
          }
          setTimeout(()=>{
            this.isRequested = false;
          },500)
        }).catch(function(err){// 请求失败
          console.log(err);
          this.isRequested = false;
        })
      },
      toGetUnReadMsgNum(){ //告诉原生未读消息数量
        this.$ajax({
          method: 'get',
          url: '/mc-message/message/unread'+'/'+this.userid,
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
        }).then(res=>{
          if(res.data.code == 200){
            let num = res.data.data.total
            if(num!=null){
              let numStr = num.toString()
              //调用原生方法
              if(window.webkit){
                window.webkit.messageHandlers.unreadMsgNum.postMessage({num:numStr})
              }
            }
          }
        }).catch(function(err){
          console.log(err);
        })
      },
      touchAddListener(){
        const wrapper = document.getElementById('wrapper');
        const that = this
        wrapper.addEventListener( 'touchstart', function (ev) {
            var events = ev.touches[ 0 ] || ev;
            that.touchstartY = events.clientY;
        }, false );

        wrapper.addEventListener( 'touchmove', function (ev) {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let events = ev.touches[ 0 ] || ev;
            // 下拉时并且页面已经到顶部时
            if (events.clientY > that.touchstartY && scrollTop <= 0) {
              ev.preventDefault();
            }
        }, false );
      },
      touchRemoveListener(){
        const wrapper = document.getElementById('wrapper');
        const that = this
        if(!wrapper) return;
        wrapper.removeEventListener( 'touchstart', function (ev) {
            var events = ev.touches[ 0 ] || ev;
            that.touchstartY = events.clientY;
        }, false );

        wrapper.removeEventListener( 'touchmove', function (ev) {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let events = ev.touches[ 0 ] || ev;
            // 下拉时并且页面已经到顶部时
            if (events.clientY > that.touchstartY && scrollTop <= 0) {
              ev.preventDefault();
            }
        }, false );
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import 'list.styl'
.mint-loadmore-bottom
  height 40px
  line-height 40px
  display: flex
  align-items: center
  text-align: center
  justify-content: center
  .icon
    display inline-block
    margin 0 10px
.no-data
  height 54px
  line-height 54px
  font-size 14px
  color #909090
  display flex
  align-items center
  justify-content center
  span
    display inline-block
    width 68px
    height 3px
    margin 0 20px;
    background-size 68px 3px;
    background-repeat no-repeat
    &.line1
      background-image url("../../../assets/images/line1.png")
    &.line2
      background-image url("../../../assets/images/line2.png")
</style>
