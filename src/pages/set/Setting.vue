<template>
    <div class="set_wrap" @touchmove.prevent>
      <white-header title="设置"></white-header>
      <div class="modify_pwd" @click="modifyPwd">
        <span>修改登录密码</span>
        <img class="icon-jiantou" src="../../assets/images/youjiantou1.png"/>
      </div>
      <button class="quit" @click="siftyQuit">安全退出</button>
    </div>
</template>

<script>
  import {MessageBox} from 'mint-ui'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    activated(){
      // 顶部状态栏展示颜色参数说明：type：“0”标识黑色；“1”标识白色
      if(window.webkit){
        window.webkit.messageHandlers.changeStatusBarColor.postMessage({type:'0'})
      }
      if(window.messageHandlers){
        window.messageHandlers.changeStatusBarColor("0")
      }
    },
    computed:{
      ...mapGetters(['userid'])
    },
    methods:{
      ...mapActions(['saveUserid','saveOrgCodeList','saveOrgCodeName','saveFirstOrgCodeName','saveSecondOrgCodeName','saveThirdOrgCodeName']),
      goBack(){
        this.$router.back(-1)
      },
      modifyPwd(){
        this.$router.push('/home/modifyloginpwd')
      },
      siftyQuit(){
        MessageBox.confirm('确定要退出吗?',{title:''}).then(action => {
            //TODO 调登录接口
            this.$ajax({
              method: 'get',
              url: '/mc-auth/auth/logout/'+this.userid,
              dataType: 'json',
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then(res=>{
              if(res.data.code==200){
                this.$commonApi.collection({
                  modelNo: '999',
                }) //埋点
                this.$logOut(); //退出
                this.$toast({message:'退出成功',duration:1000})
              }
            }).catch(function(err){
              console.log(err)
            })
        }).catch(function(err){
        });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .set_wrap
   height: 100%
   width:100%
   position absolute
   top 0
   left 0
   right 0
   bottom 0
   background-color #f6f8f9
   margin 0
   padding 0
   .modify_pwd
    width 100%
    height 60px
    background-color #fff
    display flex
    align-items center
    span
     display: block
     font-family PingFangSC-Regular
     font-size 18px
     color #38415C
     float left
     flex 1
     margin-left 22px
    .icon-jiantou
     float right
     width 22px
     height 22px
     margin-right 22px
   .quit
    width 80%
    height 50px
    background #4E97FF
    border-radius 100px
    text-align center
    border white
    font-family PingFangSC-Light
    font-size 18px
    color #FFFFFF
    margin-left 10%
    margin-right 10%
    margin-top 187px
</style>
