<template>
  <div>
    <div class="msite_head">
      <div class="msite_top">
        <div class="city-box" @click="chooseArea">
          <span class="city_all">{{this.orgCodeName}}</span>
          <img class="city_open" src="../../assets/images/zhankai.png">
        </div>
        <div v-show="newsShow" class="img_wrap" @click="news()"><img src="../../assets/images/xiaoxi.png"/></div>
        <span class="text_right" v-show="newsShow && newsUnreadTotal>0"></span>
      </div>
    </div>
  </div>
</template>
<script>
  import Bus from '../bus.js'
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return{
        interval:null,
        newsUnreadTotal:0
      }
    },
    props:{
      newsShow:{
        type:Boolean,
        default:true
      }
    },
    computed:{
      ...mapGetters(['userid','deviceinfo','orgCodeList','orgCodeName'])
    },
    activated(){
      //获得未读消息数量
      if(this.newsShow){
        this.getNewsUnreadTotal()
        this.newsTimer = setInterval(() => {
          this.getNewsUnreadTotal()
        }, 3000);
      }

      // 顶部状态栏展示颜色参数说明：type：“0”标识黑色；“1”标识白色
      if(window.webkit){
        window.webkit.messageHandlers.changeStatusBarColor.postMessage({type:'0'})
      }
      if(window.messageHandlers){
        window.messageHandlers.changeStatusBarColor("0")
      }
    },
    deactivated(){
      if(this.newsShow){
        clearInterval(this.newsTimer)
      }
    },
    methods:{
      chooseArea(){
        Bus.$emit('msg','打开选择机构弹框')
      },
      news(){//进入消息列表
        this.$router.push('/news/newsAndNotice')
      },
      //获得未读消息数量
      getNewsUnreadTotal(){
        this.$ajax({method: 'get',url: '/mc-message/message/unread'+'/'+this.userid,dataType: 'json', headers: {'Content-Type': 'application/json;charset=UTF-8'},
        }).then(res=>{
          if(res.data.code == 200){
            if(!res.data.data) return;
            this.newsUnreadTotal  = res.data.data.total || 0
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
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/methods'
 .msite_head
    width 100%
    height 34px
    iphonefixpadding(30px)
    text-align center
    position relative
    background-color white
    border-bottom 0.5px solid #f1f1f1
    .city-box
      width 200px
      position absolute
      iphonefixtop(30px)
      left 50%
      margin-left -100px
    .city_all
      font-size 20px
      line-height 32px
    .city_open
      padding-left 2px
      width 20px
      height 20px
      position relative
      top 3px
    .img_wrap
      width 25px
      height 25px
      position absolute
      right 10px
      bottom 3px
      background-size 100%
      background-repeat no-repeat
      background-position center
      img
        width 20px
        height 20px
    .text_right
      font-size 9px
      background-color red
      position absolute
      right 9px
      iphonefixtop(34px)
      color white
      border-radius 50px
      min-width 6px
      height 6px
</style>
