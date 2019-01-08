<template>
  <div class="find_pwd_wrap" @touchmove.prevent>
    <white-header title="找回密码"></white-header>
    <div class="find_pwd_content">
      <input class="phone" type="tel" placeholder="请输入手机号"  v-model.trim="phonenumber"/>
      <div class="line"></div>
      <div class="verification_code_wrap">
        <input class="verification_code" placeholder="请输入验证码" v-model="verifyCode"/>
        <span v-show="show" :class="isRightPhone?'get_btn_code_blue':'get_btn_code'"  @click="getCode">{{code}}</span>
        <span v-show="!show" class="seconds">{{count}}s</span>
      </div>
    </div>
    <input type="button" class="next" :class="stepBlue?'nextblue':''" value="下一步" @click="nextStep"/>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          isRightPhone:"",
          phonenumber:"",
          show:true,
          count:'',
          code:'获取验证码',
          verifyCode:'',
          stepBlue:false,
          timer:null
        }
      },
      watch:{
        $route(to,from){
          if(this.timer){
            clearInterval(this.timer)
          }
          if(from.path == '/resetpassword' && to.path=='/findpassword'){
            this.isRightPhone=true
            this.phonenumber = sessionStorage.getItem("findIphone")
            this.phonenumber = this.phonenumber.substring(0, 3) + ' ' + this.phonenumber.substring(3, 7) + ' ' + this.phonenumber.substring(7, 11)
            this.show=true
            this.count=''
            this.code='获取验证码'
            this.verifyCode=''
            this.stepBlue=false
          }

          else if(to.path=='/findpassword'){
            this.isRightPhone=""
            this.phonenumber=""
            this.show=true
            this.count=''
            this.code='获取验证码'
            this.verifyCode=''
            this.stepBlue=false
          }
        },
        phonenumber:function (val,oldval) {

          if (val > oldval) {
            if (val.length === 4 || val.length === 9) {
              var pre = val.substring(0, val.length - 1);
              var last = val.substr(val.length - 1, 1);
              this.phonenumber = pre + ' ' + last;
            } else {
              this.phonenumber = val;
            }
          } else {
            if (val.length === 9 || val.length === 4) {
              this.phonenumber = this.phonenumber.trim();
            } else {
              this.phonenumber = val;
            }
          }

          var phone=this.phonenumber.replace(/\s/ig,'');
          if((/^1\d{10}$/.test(phone))&&phone.length==11){
            this.isRightPhone=true
          }else{
            this.isRightPhone=false
          }


          if(val.length>13){
            this.phonenumber = oldval
          }
          if(val.length==-1&&!(/^1/.test(val))){
            this.$toast('请输入正确手机号')
            this.phonenumber = oldval
          }
          this.phonenumber=this.phonenumber.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\u4e00-\u9fa5]/g, "");
        },
        verifyCode:function (val,oldval) {
          this.verifyCode = val.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\u4e00-\u9fa5]|\s+/g, "");
          if(val.length===6){
            this.stepBlue=true
          }else{
            this.stepBlue=false
          }

          if(val.length>6){
            this.verifyCode = oldval
          }

        }
      },
      methods:{
        goBack(){
          this.$router.back(-1)
        },
        getCode() {
          var phone=this.phonenumber.replace(/\s/ig,'');
          if(this.isRightPhone){
            //掉获取验证码接口
            this.$ajax({
              method: 'post',
              url: '/mc-user/sms/send',
              dataType: 'json',
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              data:JSON.stringify({
                phone:phone,
              }),

            }).then(res=>{
              if(res.data.code==200){

                const TIME_COUNT = 59;

                this.count = TIME_COUNT;
                this.show = false;
                if (this.timer) {clearInterval(this.timer)}
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                    this.code='重新获取验证码'
                  }
                }, 1000)

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
                this.$toast(res.data.msg)
              }
            }).catch(function(err){
              console.log(err)
            })


          }else{
            this.$toast('手机号格式不正确')
          }
        },

        nextStep(){
          var phone=this.phonenumber.replace(/\s/ig,'');
          if(this.stepBlue){
           if(this.verifyCode&&this.phonenumber){
            //掉接口
            this.$ajax({
              method: 'post',
              url: '/mc-user/sms/validate',
              dataType: 'json',
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              data:JSON.stringify({
                phone: phone,
                code:this.verifyCode
              }),

            }).then(res=>{
              if(res.data.code==200){
                if(res.data.data==1){
                  sessionStorage.setItem("findIphone",phone)
                  this.$router.push({path:'/resetpassword',query    :{phone:phone,code:this.verifyCode}})
                }else{
                  this.$toast('请输入正确验证码')
                }
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
                this.$toast(res.data.msg)
              }
            }).catch(function(err){
              console.log(err)
            })
          } else{
            this.$toast('请输入完整')
          }
          }
        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 .find_pwd_wrap
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background-color #f6f8f9
  margin 0
  padding 0
  .find_pwd_content
   width 100%
   height 113px
   background-color #fff
   .phone
    width 94%
    height 56px
    font-family PingFangSC-Light
    font-size 16px
    color #999999
    padding-left 6%
   .line
    width 94%
    height 1.5px
    margin-left 6%
    background-color #f6f8f9
   .verification_code_wrap
     width 94%
     height 56px
     line-height 56px
     padding-left 6%
     .verification_code
      width 68%
      font-family PingFangSC-Light
      font-size 16px
      color #999999
     .get_btn_code
      width 22%
      padding 3px 4px 4px 4px
      border 1px solid #BFBFBF
      border-radius 100px
      font-family: PingFangSC-Regular;
      font-size 12px
      color #727272
      letter-spacing 0.24px
      text-align center
      -webkit-appearance none
      -moz-appearance none
      -o-appearance none
      appearance none

     .get_btn_code_blue
       width 22%
       padding 3px 4px 4px 4px
       border 1px solid  #4E97FF
       border-radius 100px
       font-family: PingFangSC-Regular;
       font-size 12px
       color  #4E97FF
       letter-spacing 0.24px
       text-align center
       -webkit-appearance none
       -moz-appearance none
       -o-appearance none
       appearance none

     .seconds
      width 20%
      border 1px solid #BFBFBF
      color #727272
      padding 1px 6px 1px 6px
      border-radius 100px
      margin-left 30px
      font-family PingFangSC-Regular
      font-size 12px
      letter-spacing 0.24px
      text-align center

  .next
   margin-top 163px
   width 72%
   height 40px
   margin-left 14%
   margin-right 14%
   background #E4EFFF
   border-radius 100px
   font-family PingFangSC-Light
   font-size 15px
   color #29354D
   text-align center
   -webkit-appearance none
   -moz-appearance none
   -o-appearance none
   appearance none

  .nextblue
   background #4E97FF
   color #fff



</style>
