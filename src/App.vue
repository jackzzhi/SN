<template>
  <div>
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <loading :loadingShow='loadingShow'></loading>
    <updateAppWin :update="updateApp" :updateData="updateData" :mustUpdate="mustUpdate" :newVersion='newVersion' @closeUpdateWin='closeUpdateWin'></updateAppWin>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Base64 } from 'js-base64'
import updateAppWin from './components/updateAppWin'

export default {
  data() {
    return {
      loadingTimer: null,
      updateApp: false,
      mustUpdate: false,
      updateData: {}, //更新app相关数据

      version: '',
      phoneVersion: '',
      newVersion: '',
      urlDatas: {
        //处理链接带过来的参数
        userid: this.$route.query.userid, //用户token
        guidePage: this.$route.query.guidePage, //是否进入向导页面，0不进入，1进入
        pid: this.$route.query.pid, //设备id
        phoneVersion: this.$route.query.phoneVersion, //设备类型
        userType: this.$route.query.userType, //用户类型
        mobile: this.$route.query.m, //记住密码
        pwd: this.$route.query.p, //记住密码
        version: this.$route.query.version, //当前版本号
        //行销对接接收到的参数
        fromApp: this.$route.query.fromApp, //来源, 'NMKP'-来自行销(优享客)app
        userNum: this.$route.query.userNum, //来源带过来的加密的员工编号
        sign: this.$route.query.sign //来源带过来的加密的密码
      }
    }
  },
  computed: {
    ...mapGetters(['loadingShow', 'deviceinfo'])
  },
  components: {
    updateAppWin
  },
  created() {
    window.showNotificationMsg = this.showNotificationMsg //原生调h5的全局方法
    window.getUnReadMsgNum = this.getUnReadMsgNum //原生调h5的全局方法
    this.initPage()
    this.getSoftVersion() //获取当前h5版本号
  },
  mounted() {
    this.toUpdateApp()
  },
  methods: {
    ...mapActions([
      'saveUserid',
      'saveDevice',
      'saveIsAndroid',
      'saveIsIOS',
      'saveLoadingShow',
      'saveH5Version'
    ]),
    initPage() {
      //判断当前机型
      if (window.messageHandlers) {
        this.saveIsAndroid(true)
      } else {
        this.saveIsAndroid(false)
      }
      if (window.webkit) {
        this.saveIsIOS(true)
      } else {
        this.saveIsIOS(false)
      }
      this.urlDatasHandle()
      this.goToPage()
    },
    urlDatasHandle() {
      //ios杀死进程会清缓存，需要保存必要的参数
      if (this.urlDatas.mobile) {
        localStorage.setItem('mobile', this.urlDatas.mobile)
        localStorage.setItem('pwd', this.urlDatas.pwd)
      }
      if(this.urlDatas.userid){
        this.saveUserid(this.urlDatas.userid) //记住tocken
        if(this.urlDatas.pwd){
          localStorage.setItem('account', Base64.decode(this.urlDatas.mobile))
          localStorage.setItem("masterNo",this.urlDatas.userType)
        }//保存用户名,ios可能会清缓存，导致账号被清除，无法走埋点
      }
      this.$commonApi.collection({modelNo:"000"})//启动时埋点
      var deviceinfo = {
        pid: this.urlDatas.pid,
        phoneVersion: this.urlDatas.phoneVersion
      }
      this.saveDevice(deviceinfo)
      this.version = this.urlDatas.version ? 'v' + this.urlDatas.version : ''
      this.phoneVersion = this.urlDatas.phoneVersion
        ? this.urlDatas.phoneVersion
        : ''
    },
    goToPage() {
      localStorage.setItem('fromOtherApp', 0)
      if (this.urlDatas.fromApp === 'NMKP') {
        localStorage.setItem('fromOtherApp', 1)
        this.externalLogin('app_02', this.urlDatas.userNum, this.urlDatas.sign)
      } 
      else if (this.urlDatas.userid) {
        //app已登录,进入首页
        if (this.urlDatas.userType == 99 || this.urlDatas.userType == "'99'") {
          //战报，向前理财
          this.$router.push('/home/timebattle')
        }
        if (this.urlDatas.userType == '04' || this.urlDatas.userType == "'04'") {
          //新理财
          this.$router.push('/timebattle')
        }
        else {
          this.$router.push('/home/msite')
        }
      } 
      else if (this.urlDatas.guidePage == 1) {
        //进入向导页面
        this.$router.push('/guidePage')
      } 
      else if (this.urlDatas.guidePage == 0) {
        //进入登录界面
        this.$router.push('/login')
      } 
      else if (this.$route.path == '/app') {
        //进入登录界面
        this.$router.push('/login')
      }
    },
    showNotificationMsg(msg_id) {
      // 打开push消息
      this.$router.push({
        name: 'detail',
        query: {
          from: 'app',
          itemid: msg_id
        }
      })
    },
    getUnReadMsgNum(userid) {
      //获得未读消息总数
      this.$ajax({
        method: 'get',
        url: '/mc-message/message/unread' + '/' + userid,
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      })
        .then(res => {
          if (res.data.code == 200) {
            let total = 0
            if (res.data.data) {
              total = res.data.data.total || 0
            }
            //调用原生方法,告诉原生未读消息和公告总数，供app角标展示
            let numStr = total.toString()
            if (window.webkit) {
              window.webkit.messageHandlers.unreadMsgNum.postMessage({
                num: numStr
              })
            }
            if (window.messageHandlers) {
              window.messageHandlers.unreadMsgNum(numStr)
            }
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    toUpdateApp() {
      //更新app,updateContent
      this.$ajax({
        method: 'post',
        url: '/mc-auth/sys/app/version',
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: {
          sysVersion: this.phoneVersion
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            let data = res.data.data
            if (
              this.version &&
              data.version.toLowerCase() != this.version.toLowerCase()
            ) {
              this.newVersion = data.version.toLowerCase()
              //需要更新app
              this.updateData = {
                updateContent: data.updateContent.replace(/[;；]/g, '；<br/>'),
                sysType: data.sysType, //1表示ios,2表示安卓
                downloadUrl: data.downloadUrl
              }
              //data.updateType 1表示强制更新
              this.mustUpdate = data.updateType == '1' ? true : false
              this.updateApp = true
            }
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    closeUpdateWin() {
      this.updateApp = false
    },
    UrlDecode(str) {
      //解码：https://www.xuebuyuan.com/14772.html
      var ret = ''
      for (var i = 0; i < str.length; i++) {
        var chr = str.charAt(i)
        if (chr == '+') {
          ret += ' '
        } else if (chr == '%') {
          var asc = str.substring(i + 1, i + 3)
          if (parseInt('0x' + asc) > 0x7f) {
            ret += asc2str(parseInt('0x' + asc + str.substring(i + 4, i + 6)))
            i += 5
          } else {
            ret += asc2str(parseInt('0x' + asc))
            i += 2
          }
        } else {
          ret += chr
        }
      }
      return ret
    },
    externalLogin(channelNum, employeeId, sign) {
      this.$ajax({
        method: 'post',
        url: '/mc-auth/auth/login/external',
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: {
          channel: channelNum, //系统来源(提供) 优享客app_02
          employeeId: employeeId, //员工编号
          sign: sign //加密串(加密规则跟秘钥提供)
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            let data = res.data.data
            // "data": {
            //     "userName": "xxx",
            //     "headImage": "",
            //     "employeeId": "xxxx",
            //     "orgName": "全国",
            //     "phone": "18000000000",
            //     "token": "410619527AF045BE48F4D63EB1F82413",
            //     "masterNo": "01"
            // }
            // localStorage.getItem("account",data.phone)//用户名
            // localStorage.setItem("masterNo",data.masterNo)//用户主体，普惠是01，理财是99
            this.saveUserid(data.token)
            this.getTabs(data.token)
          } else {
            this.$router.replace('/noData')
            console.error(res.data.msg)
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    getTabs(token) {
      this.$ajax({
        method: 'post',
        url: '/mc-data/data/subject/list',
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: JSON.stringify({
          token: token,
          masterNo: '02'
        })
      })
        .then(res => {
          // 请求成功
          if (res.data.code == 200) {
            //业绩的页面tab
            let performanceTabs = res.data.data[1].children //四个tab的名字
            let performanceTabsId = [],
              performanceTabsName = []
            performanceTabs.forEach(item => {
              performanceTabsId.push(item.id)
              performanceTabsName.push(item.name)
            })
            localStorage.setItem(
              'performanceTabsIds',
              JSON.stringify(performanceTabsId)
            )
            localStorage.setItem(
              'performanceTabsName',
              JSON.stringify(performanceTabsName)
            )
            this.$router.replace('/home/performance')
          } else {
            this.$router.replace('/noData')
            console.log(res.data.msg)
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    getSoftVersion() {
      //请求H5页面的版本号
      this.$ajax({
        method: 'post',
        url: '/mc-auth/sys/soft/version',
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: {
          sysVersion: ''
        }
      })
        .then(res => {
          // 请求成功
          if (res.data.code == 200) {
            this.saveH5Version(res.data.data.version)
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    }
  },
  watch: {
    loadingShow() {
      if (this.loadingShow) {
        if (this.loadingTimer) {
          clearTimeout(this.loadingTimer)
        }
        this.loadingTimer = setTimeout(() => {
          if (this.loadingShow) {
            this.$router.push('/brokennetwork')
            this.saveLoadingShow(false)
          }
        }, 10 * 1000)
      } else {
        if (this.loadingTimer) {
          clearTimeout(this.loadingTimer)
        }
      }
    },
    $route(to, from) {
      if (to.path === '/login') {
        localStorage.setItem('fromOtherApp', 0)
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import './assets/stylus/reset'
@import './assets/fonts/font'
</style>
