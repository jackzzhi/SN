<template>
 <div class="reset_pwd_wrap" @touchmove.prevent>
   <white-header title="找回密码"></white-header>
   <div class="find_pwd_content">
       <input class="phone" id="b" placeholder="请输入6-20位新密码" v-model="password" maxlength="20"/>
       <div class="line"></div>
       <div class="white_again_wrap">
         <input class="white_again" id="c" placeholder="请再次输入新密码" v-model="passwordTwo" maxlength="20"/>
       </div>
   </div>
   <input type="button" class="next" :class="isClickStep?'nextStepBlue':''" value="确定" @click="resetNext"/>
 </div>
</template>

<script>
  import md5 from 'js-md5';
    export default {
      data(){
        return{
          password:'',
          passwordTwo:'',
          newpwd:'',
          newpwdTwo:'',
          isClickStep:false
        }
      },
      watch:{
        password:function (val,oldval) {
          this.password = val.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\u4e00-\u9fa5]|\s+/g, "");
          if(val.length>oldval.length){
            if(this.newpwd == ''){
              this.newpwd = this.password
            }else{
              this.newpwd = this.newpwd+val.substring(val.length-1,val.length)
            }
          }
          else if(val.length<oldval.length){
            this.newpwd = this.newpwd.substring(0,this.newpwd.length-1)
          }
          this.password=this.password.replace(/./g,'*');

          if(this.newpwd.length>=6&&this.newpwdTwo.length>=6){
            this.isClickStep=true
          }else{
            this.isClickStep=false
          }
        },

        passwordTwo:function (val,oldval) {
          this.passwordTwo = val.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\u4e00-\u9fa5]|\s+/g, "");
          if(val.length>oldval.length){
            if(this.newpwdTwo===''){
              this.newpwdTwo = val
            }else{
              this.newpwdTwo = this.newpwdTwo+val.substring(val.length-1,val.length)
            }
          }else if(val.length<oldval.length){
            this.newpwdTwo = this.newpwdTwo.substring(0,this.newpwdTwo.length-1)
          }
          this.passwordTwo=this.passwordTwo.replace(/./g,'*');

          if(this.newpwd.length>=6&&this.newpwdTwo.length>=6){
            this.isClickStep=true
          }else{
            this.isClickStep=false
          }

        }
      },
      methods:{
        goBack(){
          this.$router.back(-1)
        },

        resetNext(){
          if(this.isClickStep){
            if(this.newpwd===this.newpwdTwo){
              var phone=this.$route.query.phone
              var code=this.$route.query.code
              var pwd=this.newpwd
              //掉接口
              this.$ajax({
                method: 'post',
                url: '/mc-user/pwd/find',
                dataType: 'json',
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                data:JSON.stringify({
                  phone: phone,
                  code:code,
                  password:md5(pwd)
                }),

              }).then(res=>{
                if(res.data.code==200){
                  this.$toast({message:'设置密码成功',duration:400})
                  setTimeout(()=>{
                    this.$logOut()
                  },1000)

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
              this.$toast('两次输入不一致')
            }
          }

        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 .reset_pwd_wrap
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
    height 1px
    margin-left 6%
    background-color #f6f8f9
   .white_again_wrap
     width 94%
     height 56px
     line-height 56px
     padding-left 6%
     .white_again
      width 68%
      font-family PingFangSC-Light
      font-size 16px
      color #999999



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
  .nextStepBlue
   background #4E97FF
   color #fff
</style>
