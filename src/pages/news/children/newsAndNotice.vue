<template>
  <div class="personnal_wrap" >
    <white-header title="消息提醒"></white-header>
    <div class="bottom">
      <div class="item_wrap" @click="news1()">
        <div class="item_left">
          <img src="@/assets/images/wodexiaoxi.png" />
          <div class="item_count" v-show="datasmsgTotal"><span>{{datasmsgTotal}}<i v-show="jia" class="text_rightJia">+</i></span></div>
        </div>
        <div class="item_right">
          <span class="item_title">我的消息</span>
          <span class="item_content" v-html="content"></span>
          <span class="item_time" v-show="sendTime">{{sendTime}}</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="item_wrap" @click="news2()">
        <div class="item_left">
          <img src="@/assets/images/pingtaigonggao.png" />
          <div class="item_count" v-show="datasNoticeTotal"><span>{{ datasNoticeTotal}}<i v-show="jiaP" class="text_rightJia">+</i></span></div>
        </div>
        <div class="item_right">
          <span class="item_title">平台公告</span>
          <span class="item_content" v-html="contentplan"></span>
          <span class="item_time" v-show="sendTimeplan">{{sendTimeplan}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  export default {
    data(){
      return {
      content:'',
      sendTime:'',
      datasmsgTotal:'',
      datasNoticeTotal:'',
      datasTotalNews:true,
      sendTimeNews:true,
      contentplan:'暂无消息',
      sendTimeplan:'',
      jia:false,
      jiaP:false,
      clickMsgIsOrNo:false,//是否可点击消息
      clickGongIsOrNo:false,//是否可点击公告
      }
    },
    computed:{
      ...mapGetters(['userid'])
    },
    created(){
      this.dataList();
      this.dataListTotal();
      this.dataPlan();
    },
    methods:{
      ...mapActions(['saveLoadingShow']),
      news1(){
         if(this.clickMsgIsOrNo){
          this.$router.push('/news/newsList')
        }
      },
      news2(){
        if(this.clickGongIsOrNo) {
          this.$router.push('/news/noticeList')
        }
      },
      // 消息接口
      dataList(){
        this.saveLoadingShow(true)
        this.$ajax({
          method: 'post',
          url: '/mc-message/message/list',
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            token: this.userid,
          }),
        }).then(res=>{  // 请求成功
          if(res.data.code != 500){this.saveLoadingShow(false);}
          if(res.data.code == 200){
            if(res.data.data.length==0||(res.data.data[0].content&&res.data.data[0].content=="")){
              this.content="暂无消息"
              this.clickMsgIsOrNo=false
            }else{
              this.content = res.data.data[0].content;
              this.clickMsgIsOrNo=true
              this.sendTime = res.data.data[0].sendTime;
            }
          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1' 
            }); //退出记住密码
          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.$logOut()
          }else{
            this.$toast(res.data.msg)
          }
        }).catch(function(err){// 请求失败
          console.log(err)
        })
      },
      dataListTotal(){
        this.$ajax({
          method: 'get',
          url: '/mc-message/message/unread'+'/'+this.userid,
          dataType: 'json', 
          headers: {'Content-Type': 'application/json;charset=UTF-8'},

        }).then(res=>{
          if(res.data.code == 200){
            this.datasmsgTotal = res.data.data.msgTotal;
              // 我的消息数目
            if(this.datasmsgTotal > 99){
              this.datasmsgTotal = 99;
              this.jia = true
             }else{
              this.datasmsgTotal = this.datasmsgTotal;
              this.jia = false;
            }

            this.datasNoticeTotal = res.data.data.noticeTotal;
            // 平台公告数目
            if(this.datasNoticeTotal > 99){
              this.datasNoticeTotal = 99;
              this.jiaP = true
            }else{
              this.datasNoticeTotal = this.datasNoticeTotal;
              this.jiaP = false
            }
            //告诉原生未读消息和公告总数量
            let num = res.data.data.total
            if(num || num==0){
              let numStr = num.toString()
              //调用原生方法
              if(window.webkit){
                window.webkit.messageHandlers.unreadMsgNum.postMessage({num:numStr})
              }
              if(window.messageHandlers){
                window.messageHandlers.unreadMsgNum(numStr)
              }
            }
          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1' 
            }); //退出记住密码
          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.$logOut()
          }else{
            this.$toast(res.data.msg)
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      dataPlan(){
        this.saveLoadingShow(true)
        let token= this.userid;
        this.$ajax({
          method: 'post',
          url: '/mc-message/message/notice/list',
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            token: this.userid,
          }),
        }).then(res=>{  // 请求成功
          if(res.data.code != 500){this.saveLoadingShow(false);}
          if(res.data.code == 200){
            if(res.data.data.length==0||(res.data.data[0].content&&res.data.data[0].content=="")){
              this.contentplan="暂无公告"
              this.clickGongIsOrNo=false
            }else{
              this.contentplan = res.data.data[0].content;
              this.clickGongIsOrNo=true
              this.sendTimeplan = res.data.data[0].sendTime;
            }
          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1' 
            }); //退出记住密码
          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.$logOut()
          }else{
            this.$toast(res.data.msg)
          }
        }).catch(function(err){// 请求失败
          console.log(err)
        })
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .personnal_wrap
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color #f6f8f9
    margin 0
    padding 0 
    .bottom
      background #fff
    .item_wrap
     width 100%
     height 70px
     display flex
     .item_left
      width 71px
      height 100%
      position relative
      background white
      img
       margin-top 18px
       margin-left 18.5px
       width 34px
       height 34px
      .item_count
       position absolute
       width 20px
       height 12px
       top 14px
       left  40px
       text-align center
       background #FF4300
       border-radius 100px
       padding 2px 3px 2px 3px
       span
         font-family: PingFangSC-Regular;
         font-size: 9pt !important;
         color: #FFFFFF;
     .item_right
       flex 1
       height 100%
       position relative
       background white
       .item_title
        position absolute
        top 16px
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #29354D;
        letter-spacing: 0;
       .item_content
          position absolute
          top 36px
          width 239px
          height 24px
          line-height 24px
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #909090;
          overflow: hidden;
          letter-spacing: 0;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space:nowrap;
       .item_time
          position absolute
          top 16px
          right 20px
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #999999;
          letter-spacing: 0;
    .line
     margin-left 5.3%
     width 94.7%
     height 1px
     background #F1F3F8
</style>
