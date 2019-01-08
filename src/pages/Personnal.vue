<template>
  <div class="personnal_wrap">
    <!-- <div class="top" :class="isIphoneX?'iphonex-top':''"> -->
    <div class="top">
      <div class="img_wrap">
        <img src="@/assets/images/morentouxiang.png" @click="detail()">
        <div class="text">{{userName}}</div>
      </div>
      <img src="@/assets/images/set.png" class="goBack" @click="set()" alt="">
    </div>
    <div class="wrap_bottom">
      <div>
        <div class="about" @click="rank()" v-show="this.rankid===10">
          <div class="left">
            <img src="@/assets/images/paihangbang.png"  class="icon-about" alt="">
            <span>排行榜</span>
          </div>
          <img class="icon-jiantou" src="@/assets/images/youjiantou1.png"/>
        </div>
        <div class="line"></div>
      </div>
      <div v-if="this.kequnid==27">
        <div class="about" @click="goKeQun" >
          <div class="left">
            <img src="@/assets/images/kequnfenxi.png"  class="icon-about" alt="">
            <span >客群分析</span>
          </div>
          <img class="icon-jiantou" src="@/assets/images/youjiantou1.png"/>
        </div>
        <div class="line"></div>
      </div>
      <div v-if="this.portraitId === 29">
        <a :href="userIdToken">
          <div class="about">
              <div class="left">
                <img src="@/assets/images/usercx.png"  class="icon-about" alt="">
                <span>精准画像</span>
              </div>
              <img class="icon-jiantou" src="@/assets/images/youjiantou1.png"/>
          </div>
          <div class="line"></div>
         </a>
      </div>
      <div class="about" @click="about()" >
        <div class="left">
          <img src="@/assets/images/guanyu.png"  class="icon-about" alt="">
          <span>关于</span>
        </div>
        <img class="icon-jiantou" src="@/assets/images/youjiantou1.png"/>
    </div>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import {MessageBox} from 'mint-ui'
  import ApiCantans from '@/net/ApiCantans.vue'

  export default {
    data(){
      return{
        userName:' ',
        userIdToken:""//画像查询链接

      }
    },
    computed:{
      ...mapGetters(['userid','kequnid','portraitId','rankid'])
    },
    mounted(){
      this.saveFooterCurrent(20)
      this.dataList();
      this.userIdToken=ApiCantans.PORTRAIT_URL+this.userid
    },
    activated(){
      // 顶部状态栏展示颜色参数说明：type：“0”标识黑色；“1”标识白色
      if(window.webkit){
        window.webkit.messageHandlers.changeStatusBarColor.postMessage({type:'1'})
      }
      if(window.messageHandlers){
        window.messageHandlers.changeStatusBarColor("1")
      }
      this.$commonApi.collection({modelNo: 'Subject_4'}) //埋点
    },
    methods:{
      ...mapActions(['saveOrgCodeList','saveOrgCodeName','saveFirstOrgCodeName','saveSecondOrgCodeName','saveThirdOrgCodeName','saveFooterCurrent']),
      detail(){
        this.$router.push('/home/personaldetail')
      },
      about(){
        this.$router.push('/home/personalAbout')
      },
      set(){
        this.$router.push('/home/setting')
      },
      goKeQun(){
        // localStorage.setItem('timebattle',2)
        this.$router.push('/userportraithome/gaim');
      },
      rank(){
        this.$router.push('/leaderBoard/ranklist');
      },
      dataList(){
        this.$ajax({method: 'post',url: '/mc-user/user/token',dataType: 'json', headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            token: this.userid,
          }),
        }).then(res=>{  // 请求成功
          if(res.data.code == 200){
            let data = res.data.data;
            this.userName = data.userName;

          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1'
            }); //退出记住密码
          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.$logOut()
          }
          else{
            console.log(res.data.msg)
          }
        }).catch(function(err){
          console.log(err)
        })
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../assets/stylus/methods.styl"
  .personnal_wrap
   position fixed
   top 0
   left 0
   right 0
   bottom 54px
   background-color #f6f8f9
   .top
    width 100%
    background-color #4E97FF
    position relative
    text-align center
    .img_wrap
      iphonefixpadding(65px)
      padding-bottom 14px
      img
       width 62px
       height 62px
      .text
        color white
        margin-top 7px
        font-size 16px
        line-height 22px
        font-family PingFangSC-Medium
    .goBack
     position absolute
     right 19px
     iphonefixtop(38px)
     color white
     width 22px
     height 22px
   .wrap_bottom
    margin-top 16px
    background-color #fff
    .about
      width 100%
      height 60px
      background-color #FFFFFF
      font-size 14px
      .left
        float left
        margin-left 26px
        margin-top 20px
        .icon-about
         width 22px
         height 22px
         vertical-align middle
         margin-right 10px
        span
         font-size 18px
         vertical-align middle
         color #29354D
         font-family PingFangSC-Regular
         a
           color #29354D
      .icon-jiantou
        float right
        width 22px
        height 22px
        margin-top 20px
        margin-right 22px
    .line
      width 94%
      height 2px
      background-color #f6f6f6
      margin-left 6%

    .iphonex-top
      height 188px
      .img_wrap
        padding-top 85px
      .goBack
        top 58px
   .wrap_bottom
     margin-top 16px
     background-color #FFFFFF
      a
        color #29354D
        display block
     .about
       width 100%
       height 60px
       background-color #FFFFFF
       font-size 14px
       .left
        float left
        margin-top 20px
        margin-left 26px
        .icon-about
          width 22px
          height 22px
          vertical-align middle
          margin-right 10px
        span
          font-size 18px
          vertical-align middle
          color #29354D
          font-family PingFangSC-Regular
       .icon-jiantou
        float right
        width 22px
        height 22px
        margin-top 20px
        margin-right 22px
     .line
        width 94%
        height 2px
        background-color #f6f6f6
        margin-left 6%

   .quite
    margin-top 10px
    width 100%
    height 56px
    line-height 56px
    text-align center
    background-color #FFFFFF
    font-size 14px
    span
      font-size 16px
      vertical-align middle
      color #29354D

.mint-msgbox-btns
  .mint-msgbox-btn
    font-size 16px
.v-modal
  z-index 999999999
.mint-msgbox-wrapper
  z-index 9999999999
</style>
