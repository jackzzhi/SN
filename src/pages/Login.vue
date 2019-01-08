<template>
  <div class="element">
    <div class="login-main">
      <div class="logo">
        <img src="@/assets/images/logo2x.png">
        <span class="img_content">司南</span>
      </div>
      <div class="phone">
        <img class="shouji" src="@/assets/images/shouji2.png">
        <input
          :class="showHuiXian?'inputPhone':'inputPhoneBlue'"
          type="tel"
          id="box"
          placeholder="请输入手机号"
          v-model.trim="phonenumber"
          onpaste="return false"
          @blur="lostFocus"
          @focus="focus"
        />
        <img class="del" src="@/assets/images/shanchun.png" @click="deletephone" v-show="showdele">
      </div>
      <div class="pwd">
        <img class="mima" src="@/assets/images/mima2.png">
        <input
          :class="showMiHuiXian ? 'inputPassword' : 'inputPasswordBlue'"
          :type="pwdType"
          id="pass"
          placeholder="请输入密码"
          v-model="password"
          maxlength="20"
          onpaste="return false"
          @focus='onFocus'
          @blur="onBlur"
        />
        <div class="img-box">
          <img class="biyan" :src="pwdDefault ? require('@/assets/images/biyan.png') : require('@/assets/images/zhengyan.png')" @click="pwdchangetype">
        </div>
      </div>
      <div class="forget_pwd" @click="forgetPwd">忘记密码</div>
      <button type="button" @click="login()" style="cursor:pointer" :class="btndefault?'sure':'sureblue'">登录</button>
      <div :class="emptyShow?'empty-block':'empty-none'"></div>
    </div>
    <div class="login_bottom"></div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { Base64 } from 'js-base64' //加密Base64.encode('123456')，解密Base64.decode(m)
import { mapActions, mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      phonenumber: '',
      password: '',
      pid: '',
      phoneVersion: '',
      phoneMaxLength: 11,
      showdele: false,
      pwdDefault: true,
      pwdType: 'password',
      btnback: true,
      btndefault: true,
      flag: '', //是否踢出别处登录的账号，1为是
      showHuiXian: true,
      showMiHuiXian: true,
      passwordInputTimer: null,
      emptyShow: true,
      rememberStatus: true

    }
  },
  computed: {
    ...mapGetters(['deviceinfo', 'isIOS', 'isAndroid', 'userid'])
  },
  created() {
    // 顶部状态栏展示颜色参数说明：type：“0”标识黑色；“1”标识白色
    if (this.isIOS) {
      window.webkit.messageHandlers.changeStatusBarColor.postMessage({
        type: '0'
      })
    }
    if (this.isAndroid) {
      window.messageHandlers.changeStatusBarColor('0')
    }
  },
  mounted() {
    this.pid = this.deviceinfo.pid //设备id
    this.phoneVersion = this.deviceinfo.phoneVersion //设备类型
    this.loadUserInfo()
    this.openPage()
  },
  methods: {
    ...mapActions([
      'saveUserid',
      'saveOrgCodeList',
      'saveOrgCodeName',
      'saveFirstOrgCodeName',
      'saveSecondOrgCodeName',
      'saveThirdOrgCodeName',
      'saveFooterCurrent',
      'saveLoadingShow'
    ]),
    login() {
      let phone = this.phonenumber.replace(/\s/gi, '')
      if (!this.btndefault) {
        this.saveLoadingShow(true)
        //TODO 调登录接口
        this.$ajax({
          method: 'post',
          url: '/mc-auth/auth/login',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          data: JSON.stringify({
            phone: phone,
            pwd: md5(this.password),
            deviceUuid: this.pid,
            sysVersion: this.phoneVersion,
            flag: this.flag
          })
        })
          .then(
            res => {
              this.saveLoadingShow(false)
              let data = res.data
              if (data.code === 200) {
                this.$toast({ message: '登录成功', duration: 1000 })
                this.clearOrgInfo() //清除机构信息

                localStorage.setItem('account', data.data.phone) //保存用户名
                localStorage.setItem('masterNo', data.data.masterNo) //用户主体，普惠是01，理财是99,新理财是04
                this.saveUserid(data.data.token) //用户tocken

                this.$commonApi.collection({
                  modelNo: '001', //菜单id
                }) //登录成功埋点

                this.rememberAccount() //记住账号密码
                this.initSomeState() //初始化一些state
                this.goToNextPage(data.data.masterNo) //跳转页面
              } else if (data.code === 555) {
                //目前是代码更新版本阶段，跳到登录页，并存一个旧页面的标识
                this.$toast({
                  message: '系统升级更新中，请稍后登录……',
                  duration: 3 * 1000
                })
                localStorage.setItem('changing', '1')
              } else if (data.code === 300) {
                MessageBox.confirm('是否退出已登录的帐号', {
                  confirmButtonText: '是',
                  cancelButtonText: '否'
                }).then(action => {
                  this.flag = 1
                  this.login()
                })
              } else if (data.code === 407) {
                //被踢出登录，返回登录页
                this.$logOut()
              } else {
                this.$toast(data.msg)
              }
            },
            reject => {
              this.$toast('网络请求失败，请稍后重试')
              this.saveLoadingShow(false)
            }
          )
          .catch(err => {
            this.saveLoadingShow(false)
            console.log(err)
          })
      }
    },
    initSomeState(){
      this.$store.dispatch('saveUserPortraitId','');//清除客群id
      this.$store.dispatch('saveUserRankId','');//清除客群id
      this.$store.dispatch('savePortraitDetailId','');//清除精准画像id
    },
    goToNextPage(userType) {
      //判断进入哪个页面
      if (userType && userType === '99') {
       // 理财
        this.$router.push('/home/timebattle')
      }
      else if(userType && userType === '04'){
        //新理财
        this.$router.push('/timebattle')
      }else {
        //普惠
        this.$router.push('/home/msite')
      }
      //与ios原生交互
      if (this.isIOS) {
        window.webkit.messageHandlers.saveUserId.postMessage({
          type: '1',
          userId: this.userid,
          userType: userType,
          m: localStorage.getItem('mobile')
            ? localStorage.getItem('mobile')
            : '',
          p: localStorage.getItem('pwd') ? localStorage.getItem('pwd') : ''
        })
      }
      //与安卓原生交互
      if (this.isAndroid) {
        window.messageHandlers.saveUserId(
          JSON.stringify({ userId: this.userid, userType: userType })
        )
      }
    },
    rememberAccount() {
      //记住手机号和密码
      if (this.rememberStatus) {
        localStorage.setItem('mobile', Base64.encode(this.phonenumber))
        localStorage.setItem('pwd', Base64.encode(this.password))
      } else {
        localStorage.removeItem('mobile')
        localStorage.removeItem('pwd')
      }
    },
    clearOrgInfo() {
      /*
         *清空机构选择器
         */
      this.saveOrgCodeList([])
      this.saveOrgCodeName('')
      this.saveSecondOrgCodeName('')
      this.saveThirdOrgCodeName('')
      this.saveFirstOrgCodeName('')
    },
    loadUserInfo() {
      let mobile = localStorage.getItem('mobile')
      let pwd = localStorage.getItem('pwd')
      if (mobile) {
        this.phonenumber = Base64.decode(mobile)
        this.password = pwd ? Base64.decode(pwd) : ''
      }
    },
    deletephone() {
      this.phonenumber = ''
    },
    pwdchangetype() {
      this.pwdDefault = !this.pwdDefault
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
    },
    onFocus() {
      if (this.isAndroid) {
        // 解决安卓手机，键盘遮挡输入框的问题
        this.emptyShow = true
        this.passwordInputTimer = setInterval(() => {
          //设置一个计时器，时间设置与软键盘弹出所需时间相近
          document.getElementById('pass').scrollIntoView()
        }, 100)
      }
      this.showdele = false
    },
    onBlur() {
      if (this.isAndroid) {
        this.emptyShow = false
        clearInterval(this.passwordInputTimer)
      }
      window.scrollTo(0, 0)
    },
    forgetPwd() {
      this.$router.push('/findpassword')
    },
    lostFocus() {
      this.showdele = false
      window.scrollTo(0, 0)
    },
    focus() {
      if (this.phonenumber) {
        this.showdele = true
      }
    },
    openPage() {
      this.$nextTick(() => {
        setTimeout(() => {
          // 告诉原生，我的页面加载完成，可以关闭你的启动页面了;首次启动APP，延迟启动页面展示关闭启动页交互：
          if (window.webkit) {
            window.webkit.messageHandlers.removePromptView.postMessage({
              type: '1'
            })
          }
          if (window.messageHandlers) {
            window.messageHandlers.closeStart('close')
          }
          if (localStorage.getItem('changing') !== '1') {
            // 原生过渡层消失
            if (window.webkit) {
              // “1”标识显示原生加载页面  “2”是移除原生加载页面
              window.webkit.messageHandlers.showOrCloseLoadingView.postMessage({
                type: '2'
              })
            }
            if (window.messageHandlers) {
              window.messageHandlers.stopLoading('stop')
            }
          }
        }, 1000)
      })
    },
    set_text_value_position(obj, spos){
          var tobj = document.getElementById(obj);
          if(spos<0)
            spos = tobj.value.length;
          if(tobj.setSelectionRange){ //兼容火狐,谷歌
            setTimeout(function(){
                tobj.setSelectionRange(spos, spos);
                tobj.focus();}
              ,0);
          }else if(tobj.createTextRange){ //兼容IE
            var rng = tobj.createTextRange();
            rng.move('character', spos);
            rng.select();
          }
      }
  },
  watch: {
    password: function(val, oldval) {
      //禁止输入汉字，表情，特殊字符
      this.password = val.replace(
        /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\u4e00-\u9fa5]|\s+/g,
        ''
      )
      //密码框文字样式
      this.showMiHuiXian = val ? false : true
      //验证手机号格式是否正确
      let phone = this.phonenumber.replace(/\s/gi, '')
      if (/^1[0345678]\d{9}$/.test(phone)) {
        if(this.password.length >= 6){
          this.btndefault = false
        }
        else{
          this.btndefault = true
        }
      }
      else {
        this.$toast({ message: '请输入正确手机号' })
        this.password = ''
      }
    },
    phonenumber: function(val, oldval) {
      //不允许输入特殊字符
      this.phonenumber = val.replace(
        /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\u4e00-\u9fa5]/g,
        ''
      )
      //输入框样式
      this.showHuiXian = val ? false : true
      //是否显示删除图标
      const phoneInput = document.getElementById('box');
      if (phoneInput == document.activeElement && this.phonenumber) {
        this.showdele = true
      } else {
        this.showdele = false
      }
      if (val.length > oldval.length) {
         let phone = val.replace(/\s/gi, '').split("")
         if (val.length === 4 || val.length === 9) {
           var pre = val.substring(0, val.length - 1)
           var last = val.substr(val.length - 1, 1)
           this.phonenumber = pre + ' ' + last
           this.set_text_value_position('box',phoneInput.selectionEnd+1)
         }else if(phone.length === 11){
           phone.forEach((item, index) => {
             if (index === 3 || index === 7) {
               phone[index] = ' ' + item
             }
           })
           this.phonenumber = phone.join("")
         }  else if(val.length>13){
           this.phonenumber = oldval
         } else{
           this.phonenumber = val
         }
      }
      //若第一位不是1，则清空
      if (val.length > oldval.length && !/^1/.test(val)) {
        this.$toast('请输入正确手机号')
        this.phonenumber = oldval
      }
      //验证登录按钮状态
      let phone2 = this.phonenumber.replace(/\s/gi, '')
      this.password = this.phonenumber ? this.password : ''
      if (/^1[0345678]\d{9}$/.test(phone2) && this.password.length >= 6) {
        this.btndefault = false
      } else {
        this.btndefault = true
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../assets/stylus/methods.styl"
.element
  position fixed
  text-align center
  top 0px
  height 100vh
  width 100vw
  overflow-y auto
  background #fff

  .login-main
    background transparent
    position relative
    z-index 20
    top 0px
    text-align center

  .logo
    iphonefixpadding(66px)
    img
      width 80px
      height 80px

    span
      display block
      font-family FZZZHUNHJW--GB1-0
      color #29354D
      margin-top 15px
      font-weight bold
      font-size 20px
  .phone
    margin-top 80px
    position relative
    z-index 20

    .shouji
      width 24px
      height 24px
      vertical-align middle

    .inputPhone
      width 262px
      height 24px
      margin-left 12px
      font-family PingFangSC-Light
      font-size 18px
      padding-bottom 5px
      color #29354d
      border-radius 0px 0px
      border-bottom 1px solid #E6E6E6

    .inputPhoneBlue
      width 262px
      height 24px
      margin-left 12px
      font-family PingFangSC-Light
      font-size 18px
      padding-bottom 5px
      color #29354d
      border-radius 0px 0px
      border-bottom 1px solid #ADCFFF

    .del
      position absolute
      right 40px
      bottom 5px
      width 20px
      height 20px

  .pwd
    margin-top 46px
    position relative
    z-index 20

    .mima
      width 24px
      height 24px
      vertical-align middle

    .inputPassword
      width 262px
      height 24px
      margin-left 12px
      font-family PingFangSC-Light
      font-size 18px
      padding-bottom 5px
      color #29354d
      border-radius 0px 0px
      border-bottom 1px solid #E6E6E6

    .inputPasswordBlue
      width 262px
      height 24px
      margin-left 12px
      font-family PingFangSC-Light
      font-size 18px
      padding-bottom 5px
      color #29354d
      border-radius 0px 0px
      border-bottom 1px solid #ADCFFF

    .img-box
      display inline-block
      background #fff
      padding 2px 4px
      position absolute
      right 36px
      bottom 3px

    .biyan
      width 20px
      height 20px

  input::-webkit-input-placeholder
    color #999999
    font-size 18px

  .forget_pwd
    margin-top 10px
    margin-right 36px
    font-size 14px
    color #999999
    position absolute
    right 0px

  .re-pwd
    float left
    margin-left 40px
    color #999999
    font-size 14px

  .sure
    width 300px
    height 50px
    background-color #c9dfff
    border white
    font-size 18px
    border-radius 100px
    color white
    margin-top 46px
    z-index 300

  .sureblue
    width 300px
    height 50px
    background-color #4E97FF
    border white
    font-size 18px
    border-radius 100px
    color white
    margin-top 47px
    z-index 300

  .login_bottom
    position fixed
    bottom 0
    left 0
    height 25vh
    width 100vw
    text-align center
    background #fff url('../assets/images/hailang.png') no-repeat bottom
    background-size contain
    z-index 9

  .empty-none
    height 0
    transition all ease-in-out 0.2s

  .empty-block
    width 100%
    height 260px
    background-color transparent
    transition all ease-in-out 0s

.mint-msgbox-btns
  .mint-msgbox-btn
    font-size 16px
</style>
