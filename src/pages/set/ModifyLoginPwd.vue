<template>
  <div class="modify_wrap" @touchmove.prevent>
    <white-header title="修改登录密码"></white-header>
    <div class="modify_content">
      <input class="one" id="e" placeholder="请输入原登录密码" v-model="originalPwd"  maxlength="20"/>
      <div class="line"></div>
      <input class="one" id="f" placeholder="请输入6-20位数字或字母新密码" v-model="pwdFirst"  maxlength="20"/>
      <div class="line"></div>
      <input class="one" id="g" placeholder="请再次输入新密码" v-model="pwdSecond"  maxlength="20"/>
      <div class="modify_forget_pwd" @click="modifyForgetPwd">忘记密码</div>

    </div>
    <button  class="sure" :class="isBlue?'sureBlue':''"  @click="sureModifyLogin">确认</button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import md5 from 'js-md5';
  export default {
    data(){
      return{
        originalPwd:'',
        pwdFirst:'',
        pwdSecond:'',
        new:'',
        newOne:'',
        newTwo:'',
        isBlue:false
      }
    },
    computed:{...mapGetters(['userid'])},
    methods:{
      goBack(){
        this.$router.back(-1)
      },
      sureModifyLogin(){
        if(this.isBlue){
          if(this.newOne===this.newTwo){
            //掉接口
            this.$ajax({
              method: 'post',
              url: '/mc-user/pwd/update',
              dataType: 'json',
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              data:JSON.stringify({
                token:this.userid,
                code: md5(this.new),
                password:md5(this.newOne),
              }),

            }).then(res=>{
              if(res.data.code==200){
                this.$toast({message:'登录密码修改成功',duration:400})
                setTimeout(()=>{
                  this.$logOut()
                },2000)
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
            this.$toast('新密码输入不一致')
          }

        }
      },
      modifyForgetPwd(){
        this.$router.push('/findpassword')
      }
    },
    watch:{
      originalPwd:function (val,oldval) {
        this.originalPwd = val.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\u4e00-\u9fa5]|\s+/g, "");
        if(val.length>oldval.length){
          if(this.new===''){
            this.new = this.originalPwd
          }else{
            this.new = this.new+val.substring(val.length-1,val.length)
          }
        }else if(val.length<oldval.length){
          this.new = this.new.substring(0,this.new.length-1)
        }

        this.originalPwd=this.originalPwd.replace(/./g,'*');

        if(this.new.length>=6&&this.newOne.length>=6&&this.newTwo.length>=6){
             this.isBlue=true
        }else{
          this.isBlue=false
        }

      },
      pwdFirst:function (val,oldval) {
        this.pwdFirst = val.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\u4e00-\u9fa5]|\s+/g, "");
        if(val.length>oldval.length){
          if(this.newOne===''){
            this.newOne = val
          }else{
            this.newOne = this.newOne+val.substring(val.length-1,val.length)
          }
        }else if(val.length<oldval.length){
          this.newOne = this.newOne.substring(0,this.newOne.length-1)
        }

        this.pwdFirst=this.pwdFirst.replace(/./g,'*');

        if(this.new.length>=6&&this.newOne.length>=6&&this.newTwo.length>=6){
          this.isBlue=true
        }else{
          this.isBlue=false
        }
      },
      pwdSecond:function (val,oldval) {
        this.pwdSecond = val.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\u4e00-\u9fa5]|\s+/g, "");
        if(val.length>oldval.length){
          if(this.newTwo===''){
            this.newTwo = val
          }else{
            this.newTwo = this.newTwo+val.substring(val.length-1,val.length)
          }
        }else if(val.length<oldval.length){
          this.newTwo = this.newTwo.substring(0,this.newTwo.length-1)
        }

        this.pwdSecond=this.pwdSecond.replace(/./g,'*');

        if(this.new.length>=6&&this.newOne.length>=6&&this.newTwo.length>=6){
          this.isBlue=true
        }else{
          this.isBlue=false
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 .modify_wrap
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background-color #f6f8f9
  margin 0
  padding 0
  .modify_content
   width 100%
   height 171px
   background-color #fff
   .one
    width 94%
    height 56px
    margin-left 6%
    font-family PingFangSC-Regular
    font-size 16px
    color #999999
   .line
    width 94%
    height 1.5px
    margin-left 6%
    background-color #f6f8f9
   .modify_forget_pwd
    margin-top 10px
    margin-right 20px
    font-size 14px
    float right
    color #999999
  .sure
   width 72%
   height 40px
   line-height 40px
   text-align center
   margin-top 67px
   background #E4EFFF
   border-radius 100px
   border white
   margin-left 14%
   margin-right 14%
   font-family PingFangSC-Light
   font-size 15px
   color #29354D
   -webkit-appearance none
   -moz-appearance none
   -o-appearance none
   appearance none
  .sureBlue
   background #4E97FF
   color #fff
</style>
