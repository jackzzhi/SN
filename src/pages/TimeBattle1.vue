<template>
  <div>
    <div class="jinfu_wrap">
      <div class="jinfu_title" :class="isIphoneX?'timebattle_iphonex_head':''">
        <p>向前金服实时战报</p>
        <img src="@/assets/images/bangzhu@2x.png" alt="" @click="toHelp">
      </div>
      <mt-loadmore class="loadmorestwo" :class="isIphoneX?'loadmores_iphonex_two':''" :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore" :maxDistance="90">
        <div class="jinfu_content">
          <div class="content_warp">
            <div class="top_one">
              <div class="top_one_first_wrap">
                <p class="today_chujie">{{todayLoan[0].name}}({{todayLoan[0].unit}})</p>
                <div class="top_one_first_right">
                  <span v-if="chazhione[0].cha==0">{{chazhione[0].cha}}</span>
                  <span v-else>{{chazhione[0].cha|numFormat}}</span>
                  <img v-if="chazhione[0].type!=''" v-show="chazhione[0].type!==0" :src="chazhione[0].type==1?require('../assets/images/whitetop.png'):require('../assets/images/whitedown.png')">
                </div>
              </div>
              <div class="bijiao">
                <span>较上次</span>
              </div>
              <div class="top_one_second_wrap">
                <span class="money">￥</span>
                <span class="number">{{todayLoan[0].value|numFormat}}</span>
              </div>
              <div class="top_one_bottom_wrap">
                <span>{{reshtime}}</span>
              </div>
              <p class="top_one_zuori_chujie_title">昨日出借(元)</p>
              <p class="top_one_zuori_chujie_number">{{yesNumber|numFormat}}</p>
            </div>
            <div class="list_item_wrap" v-for='today,index in todayLoan'>
              <div v-if='index>0' class="liw_contet">
                <p class="title">{{today.name}}({{today.unit}})</p>
                <p class="number" :class="isIphoneX?'msite_iphonex_number':''">{{today.value|numFormat}}</p>
                <div class="list_item_wrap_right">
                  <img v-if="chazhione[index].type!=''" v-show="chazhione[index].type!==0" :src="chazhione[index].type==1?require('../assets/images/shangjiantou.png'):require('../assets/images/greenjiantou.png')" />
                  <span v-if="chazhione[index].cha==0">{{chazhione[index].cha}}</span>
                  <span v-else>{{chazhione[index].cha|numFormat}}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="content_warp wrap_two" :class="isIphoneX?'msite_iphonex_magin_top':''">
            <div class="top_two">
              <div class="top_one_first_wrap_two">
                <p class="today_chujie_two">{{monthLoan[0].name}}({{monthLoan[0].unit}})</p>
                <div class="top_one_first_right">
                  <span v-if="chazhitwo[0].cha==0">{{chazhitwo[0].cha}}</span>
                  <span v-else>{{chazhitwo[0].cha|numFormat}}</span>
                  <img v-if="chazhitwo[0].type!=''" v-show="chazhitwo[0].type!==0" :src="chazhitwo[0].type==1?require('../assets/images/whitetop.png'):require('../assets/images/whitedown.png')">
                </div>
              </div>
              <div class="bijiao">
                <span>较上次</span>
              </div>
              <div class="top_one_second_wrap">
                <span class="money">￥</span>
                <span class="number">{{monthLoan[0].value|numFormat}}</span>
              </div>
              <div class="top_one_bottom_wrap">
                <span>{{reshtime}}</span>
              </div>
            </div>
            <div class="list_item_wrap_two" v-for='month,index in monthLoan'>
              <div class="liw_contet" v-if='index>0'>
                <p class="title_two">{{month.name}}({{month.unit}})</p>
                <p class="number_two" :class="isIphoneX?'msite_iphonex_bottmo_list':''">{{month.value|numFormat}}</p>
                <div class="list_item_wrap_right_two">
                  <img v-if="chazhitwo[index].type!=''" v-show="chazhitwo[index].type!==0" :src="chazhitwo[index].type==1?require('../assets/images/shangjiantou.png'):require('../assets/images/greenjiantou.png')">
                  <span v-if="chazhitwo[index].cha==0">{{chazhitwo[index].cha}}</span>
                  <span v-else>{{chazhitwo[index].cha|numFormat}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="content_warp wrap_three" :class="isIphoneX?'msite_iphonex_magin_top':''">
            <div class="top_three"></div>
            <div class="list_item_wrap_two" v-for='history,index in historyLoan'>
              <div class="liw_contet">
                <p class="title_two">{{history.name}}({{history.unit}})</p>
                <p class="number_two" :class="isIphoneX?'msite_iphonex_bottmo_list':''">{{history.value|numFormat}}</p>
                <div class="list_item_wrap_right_two">
                  <img v-if="chazhithree[index].type!=''" v-show="chazhithree[index].type!==0" :src="chazhithree[index].type==1?require('../assets/images/shangjiantou.png'):require('../assets/images/greenjiantou.png')">
                  <span v-if="chazhithree[index].cha==0">{{chazhithree[index].cha}}</span>
                  <span v-else>{{chazhithree[index].cha|numFormat}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div :class="isIphoneX?'iphonex-bottom':'dibu'">
          <span>— 向前金服 · 向前向未来 —</span>
        </div> -->
        <div class="dibubottom"></div>
        <div slot="top" class="mint-loadmore-top">
          <div class="top_tip">
            <div class="icon">
              <mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner>
            </div>
            <span v-show="topStatus !== 'loading'" class='txt' :class="{ 'rotate': topStatus === 'drop' }">&nbsp;&nbsp;松开刷新</span>
            <span v-show="topStatus === 'loading'" class='txt loading-txt'>正在刷新...</span>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loadmore } from 'mint-ui'
import footerGuide from '../components/footer/footerGuide'
export default {
  data() {
    return {
      reshtime: '正在读取',
      topStatus: '',
      timer: '', //计时器
      timerVersion: '', //计时器
      yesNumber: '',
      firstLoad: true,
      firstDate: '',
      todayLoan: [
        { name: '今日出借', value: '0', unit: '元' },
        { name: '今日申请转让', value: '0', unit: '元' },
        { name: '今日实际转让', value: '0', unit: '元' }
      ], //今日出借
      monthLoan: [
        { name: '当月出借', value: '0', unit: '元' },
        { name: '当月申请转让', value: '0', unit: '元' },
        { name: '当月实际转让', value: '0', unit: '元' }
      ], //当月出借
      historyLoan: [
        { name: '累计转让排队', value: '0', unit: '元' },
        { name: '累计出借排队', value: '0', unit: '元' },
        { name: '累计到期未申请转让', value: '0', unit: '元' }
      ], //历史出借
      chazhione: [
        { value: '0', cha: '0', type: '' },
        { value: '0', cha: '0', type: '' },
        { value: '0', cha: '0', type: '' }
      ],
      chazhitwo: [
        { value: '0', cha: '0', type: '' },
        { value: '0', cha: '0', type: '' },
        { value: '0', cha: '0', type: '' }
      ],
      chazhithree: [
        { value: '0', cha: '0', type: '' },
        { value: '0', cha: '0', type: '' },
        { value: '0', cha: '0', type: '' }
      ]
    }
  },
  computed: {
    ...mapGetters(['userid', 'h5Version', 'isIphoneX'])
  },
  beforeCreate() {
    if (localStorage.getItem('changing') === '1') {
      //系统更新维护或者升级后，需要重新刷新一下页面，加载最新的页面代码
      localStorage.setItem('changing', '0')
      // 原生过渡层出现
      if (window.webkit) {
        // “1”标识显示原生加载页面  “2”是移除原生加载页面
        window.webkit.messageHandlers.showOrCloseLoadingView.postMessage({
          type: '1'
        })
      }
      if (window.messageHandlers) {
        window.messageHandlers.startLoading('start')
      }
      //刷新页面
      setTimeout(() => {
        location.reload()
      }, 0)
    }
  },
  created() {
    // 第一次请求数据
    this.battleToday()
    this.battleYesterday()
    this.getSoftVersion()
    // 初始化状态
    this.saveFooterCurrent(0)
    if (window.webkit) {
      window.webkit.messageHandlers.changeStatusBarColor.postMessage({
        type: '0'
      })
    }
    if (window.messageHandlers) {
      window.messageHandlers.changeStatusBarColor('0')
    }
  },
  activated() {
    this.saveFooterCurrent(0)
    this.timer = setInterval(() => {
      this.battleList(2)
      this.battleYesterday()
    }, 60 * 1000)
    this.timerVersion = setInterval(() => {
      this.getSoftVersion()
    }, 5 * 1000)
  },
  deactivated() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.timerVersion) {
      clearInterval(this.timerVersion)
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.timerVersion) {
      clearInterval(this.timerVersion)
    }
  },
  methods: {
    ...mapActions(['saveFooterCurrent', 'saveLoadingShow']),
    toHelp() {
      //帮助中心
      if (this.timer) {
        clearInterval(this.timer)
      }
      if (this.timerVersion) {
        clearInterval(this.timerVersion)
      }
      this.$router.push('/home/TimeBattleHelp')
    },
    battleList(type) {
      if (type === 1) {
        this.saveLoadingShow(false)
      } else {
        this.saveLoadingShow(true)
      }
      //订阅接口

      this.$ajax({
        method: 'post',
        url: '/mc-data/data/xqzb/list',
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: JSON.stringify({
          token: localStorage.getItem('userid'),
          subjectId: 99,
          masterNo: 99,
          date: this.firstDate
        })
      })
        .then(
          res => {
            if (res.data.code != 500) {
              this.saveLoadingShow(false)
            }
            // 请求成功
            if (res.data.code == 200) {
              let dataLen = res.data.data.length
              if (dataLen > 0) {
                for (let i = 0; i < dataLen; i++) {
                  if (res.data.data[i].id == '990002') {
                    //当月出借
                    let datas = res.data.data[i].datas
                    if (this.monthLoan.length === datas.length) {
                      this.monthLoan = datas
                    } else {
                      datas.forEach((item, index) => {
                        this.monthLoan[index] = item
                      })
                    }
                  } else if (res.data.data[i].id == '990001') {
                    //今日出借
                    let datas = res.data.data[i].datas
                    if (this.todayLoan.length === datas.length) {
                      this.todayLoan = datas
                    } else {
                      datas.forEach((item, index) => {
                        this.todayLoan[index] = item
                      })
                    }
                  } else if (res.data.data[i].id == '990003') {
                    //历史出借
                    let datas = res.data.data[i].datas
                    if (this.historyLoan.length === datas.length) {
                      this.historyLoan = datas
                    } else {
                      datas.forEach((item, index) => {
                        this.historyLoan[index] = item
                      })
                    }
                  }
                }
              }
              if (type === 1) {
                this.$toast({ message: '刷新成功', duration: 400 })
                this.jisuanchazhi(this.todayLoan, this.chazhione) //计算上部差值
                this.jisuanchazhi(this.monthLoan, this.chazhitwo) //计算下部差值
                this.jisuanchazhi(this.historyLoan, this.chazhithree) //计算下部差值
              } else if (type === 2) {
                this.jisuanchazhi(this.todayLoan, this.chazhione) //计算上部差值
                this.jisuanchazhi(this.monthLoan, this.chazhitwo) //计算下部差值
                this.jisuanchazhi(this.historyLoan, this.chazhithree) //计算下部差值
              } else {
                //第一次进入
                //设置今日增长数据
                if (this.todayLoan) {
                  for (var i = 0; i < this.todayLoan.length; i++) {
                    var tempobj1 = {} //临时对象
                    tempobj1.cha = 0
                    tempobj1.type = 0
                    tempobj1.value = this.todayLoan[i].value
                    this.chazhione.push(tempobj1)
                  }
                  this.chazhione.splice(0, 3) //删除前四个
                }
                //设置当月增长数据
                if (this.monthLoan) {
                  for (var i = 0; i < this.monthLoan.length; i++) {
                    var tempobj2 = {} //临时对象
                    tempobj2.cha = 0
                    tempobj2.type = 0
                    tempobj2.value = this.monthLoan[i].value
                    this.chazhitwo.push(tempobj2)
                  }
                  this.chazhitwo.splice(0, 3) //删除前四个
                }
                //设置历史增长数据
                if (this.historyLoan) {
                  for (var i = 0; i < this.historyLoan.length; i++) {
                    var tempobj3 = {} //临时对象
                    tempobj3.cha = 0
                    tempobj3.type = 0
                    tempobj3.value = this.historyLoan[i].value
                    this.chazhithree.push(tempobj3)
                  }
                  this.chazhithree.splice(0, 3) //删除前三个
                }
              }
              var date = new Date()
              var h = date.getHours()
              var m = date.getMinutes() //获取分钟
              var s = date.getSeconds()
              if (h < 10) {
                h = '0' + h
              }
              if (m < 10) {
                m = '0' + m
              }
              if (s < 10) {
                s = '0' + s
              }
              this.reshtime = '最近刷新时间 ' + h + ':' + m + ':' + s
              this.$refs.loadmore.onTopLoaded()
            } else if (res.data.code == 555) {
              //目前是代码更新版本阶段，跳到登录页，并存一个旧页面的标识
              this.$toast({
                message: '系统升级更新中，请稍后登录……',
                duration: 3 * 1000
              })
              localStorage.setItem('changing', '1')
              //被踢出登录，返回登录页
              this.$logOut()
            } else if (res.data.code == 301) {
              //7天自动退出登录
              this.$logOut({
                rememberpwd: '1'
              }) //退出记住密码
            } else if (res.data.code == 407) {
              //被踢出登录，返回登录页
              this.$logOut()
            }
            this.openPage()
          },
          reject => {
            this.openPage()
          }
        )
        .catch(err => {
          this.openPage()
          // 请求失败
          console.log(err)
          this.$refs.loadmore.onTopLoaded()
          // if (type === 1) {
          //   // this.$toast('刷新失败')
          // }
        })
    },
    battleToday() {
      //接口获取今天的时间
      this.$ajax({
        method: 'get',
        url: '/mc-data/date/all',
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.firstDate = res.data.data.bizDt
            this.battleList(0)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    battleYesterday() {
      //接口获取昨天的时间
      this.$ajax({
        method: 'get',
        url: '/mc-data/date/lastday',
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.battleYesterdayList(res.data.data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    battleYesterdayList(date) {
      //昨天的时间
      let yesTimer = date
      //订阅接口
      this.$ajax({
        method: 'post',
        url: '/mc-data/data/xqzb/list',
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: JSON.stringify({
          token: this.userid,
          subjectId: 99,
          masterNo: 99,
          date: yesTimer
        })
      })
        .then(res => {
          // 请求成功
          if (res.data.code == 200) {
            if (
              res.data.data &&
              res.data.data[0] &&
              res.data.data[0].datas &&
              res.data.data[0].datas[0]
            ) {
              this.yesNumber = res.data.data[0].datas[0].value
            } else {
              this.yesNumber = '0'
            }
          } else if (res.data.code == 555) {
            //目前是代码更新版本阶段，跳到登录页，并存一个旧页面的标识
            this.$toast({
              message: '系统升级更新中，请稍后登录……',
              duration: 3 * 1000
            })
            localStorage.setItem('changing', '1')
            //被踢出登录，返回登录页
            this.$logOut()
          } else if (res.data.code == 407) {
            //被踢出登录，返回登录页
            this.$logOut()
          }
        })
        .catch(err => {
          // 请求失败
          console.log(err)
        })
    },
    loadTop() {
      //下拉刷新
      setTimeout(() => {
        this.battleList(1)
        this.battleYesterday()
      }, 500)
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.battleList(2)
        this.battleYesterday()
      }, 60 * 1000)
    },
    //计算差值算法
    jisuanchazhi(datas, datas2) {
      if (datas) {
        for (var i = 0; i < datas.length; i++) {
          var newobj = datas[i] //新对象
          var oldobj = datas2[i] //之前对象
          var tempobj = {} //临时对象
          if (newobj.value - oldobj.value > 0) {
            //最新的值-之前的值>0  增长
            tempobj.cha = newobj.value - oldobj.value
            tempobj.type = 1
          } else if (newobj.value - oldobj.value === 0) {
            //最新值-之前值=0 稳定
            tempobj.cha = newobj.value - oldobj.value
            tempobj.type = 0
          } else {
            //最新值-之前值<0 减少
            tempobj.cha = oldobj.value - newobj.value
            tempobj.type = 2
          }
          tempobj.value = newobj.value
          datas2.push(tempobj) //添加到数组当中
        }
        datas2.splice(0, 3) //删除前三个
      }
    },
    handleTopChange(status) {
      this.topStatus = status
    },
    getSoftVersion() {
      // 获取当前h5的版本号
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
            if (this.h5Version !== res.data.data.version) {
              // 原生过渡层出现
              if (window.webkit) {
                // “1”标识显示原生加载页面  “2”是移除原生加载页面
                window.webkit.messageHandlers.showOrCloseLoadingView.postMessage(
                  {
                    type: '1'
                  }
                )
              }
              if (window.messageHandlers) {
                window.messageHandlers.startLoading('start')
              }
              //刷新页面
              setTimeout(() => {
                location.reload()
              }, 0)
            }
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    openPage() {
      setTimeout(() => {
        this.$nextTick(() => {
          if (this.firstLoad === true) {
            this.firstLoad = false
          } else {
            return
          }
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
        })
      }, 2000)
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == '/home/timebattle') {
        if (window.webkit) {
          window.webkit.messageHandlers.changeStatusBarColor.postMessage({
            type: '0'
          })
        }
        if (window.messageHandlers) {
          window.messageHandlers.changeStatusBarColor('0')
        }
        if (this.timer) {
          clearInterval(this.timer)
        }
        this.timer = setInterval(() => {
          this.battleList(2)
        }, 60000)
      }
    }
  },
  components: {
    Loadmore,
    footerGuide
  },
  filters: {
    numFormat(num) {
      if (num) {
        return num.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.liw_contet
  border-bottom 1px solid #e4e4e4

.loadmorestwo
  background-color #f6f8f9
  margin-bottom 0
  padding-top 70px

  .mint-loadmore-top
    height 50px

    .top_tip
      width 100%
      height 50px
      position relative

      img
        position absolute
        top 10px
        left 3.866667rem
        width 25px
        height 25px

      .txt
        padding-left 30px
        font-size 13px
        color #29354D

      .loading-txt
        padding-left 36px

      .icon
        display inline-block
        position absolute
        top 10px

      .reush_tip
        position absolute
        left 0
        top 16px
        width 100%
        height 20px

        .txt
          padding-left 0px
          font-size 10px
          color #29354D

.loadmores_iphonex_two
  padding-top 90px

.jinfu_wrap
  position absolute
  top 0
  left 0
  right 0
  bottom 54px
  background-color #fff

  .jinfu_title
    position relative
    width 100%
    height 50px
    line-height 50px
    padding-top 20px
    position fixed
    background-color #fff
    z-index 200

    img
      width 20px
      position absolute
      right 20px
      bottom 15px

    p
      font-family PingFangSC-Medium
      font-size 18px
      text-align center
      font-weight normal
      font-stretch normal
      letter-spacing 0px
      color #29354D

    .imgRotate
      animation-name go
      animation-duration 1.5s
      animation-iteration-count infinite

      @keyframes go
        0%
          transform rotateZ(0)

        100%
          transform rotateZ(360deg)

  .timebattle_iphonex_head
    padding-top 40px

  .jinfu_content
    width 100%

    .wrap_two, .wrap_three
      padding-top 13px

    .content_warp
      width 100%
      background-color #fff
      margin-bottom 18px

      .top_one
        width 100%
        background-image url('../assets/images/bg_blue.png')
        background-repeat no-repeat
        background-size 100%
        height 290px

        .top_one_first_wrap
          display flex

          .today_chujie
            padding-top 27px
            padding-left 32px
            font-family PingFangSC-Medium
            font-size 18px
            font-weight normal
            font-stretch normal
            color #ffffff

          .top_one_first_right
            flex 1
            padding-top 27px

            img
              width 12px
              height 12px
              padding-top 2px
              float right

            span
              font-family PingFangSC-Regular
              font-size 16px
              color #FFFFFF
              float right
              padding-left 8px
              padding-right 27px

        .bijiao
          width 100%
          height 20px
          margin-top 5px

          span
            font-family PingFangSC-Regular
            font-size 14px
            color #FFFFFF
            float right
            padding-right 28px

        .top_one_second_wrap
          width 100%
          margin-top 10px
          text-align center

          .money
            font-size 17px
            color #FFFFFF

          .number
            font-family DINCondensed-Bold
            font-size 60px
            color #FFFFFF
            font-weight bold

        .top_one_bottom_wrap
          width 100%
          margin-top 15px
          text-align center

          span
            font-family PingFangSC-Regular
            font-size 14px
            color #FFFFFF

        .top_one_zuori_chujie_title
          margin-top 40px
          font-size 13px
          color #2D7DFF
          font-family PingFangSC-Medium
          padding-left 32px

        .top_one_zuori_chujie_number
          padding-left 32px
          font-size 22px
          padding-top 13px
          color #29354D
          font-family DINAlternate-Bold
          padding-bottom 12px

        .today_chujie_number
          font-family DINAlternate-Bold
          font-size 30px
          width 496px
          padding-top 20px
          font-weight normal
          font-stretch normal
          padding-bottom 12px
          color #5c93fa

        .line
          width auto
          margin-right 20px
          height 0.5px
          background-color #e4e4e4

      .top_two
        width 100%
        background-image url('../assets/images/bg_orange.png')
        background-repeat no-repeat
        background-size 100%
        height 220px

        .top_one_first_wrap_two
          display flex

          .today_chujie_two
            padding-top 27px
            padding-left 32px
            font-family PingFangSC-Medium
            font-size 18px
            font-weight normal
            font-stretch normal
            color #ffffff

          .top_one_first_right
            flex 1
            padding-top 27px

            img
              width 12px
              height 12px
              padding-top 2px
              float right

            span
              font-family PingFangSC-Regular
              font-size 16px
              color #FFFFFF
              float right
              padding-left 8px
              padding-right 27px

        .bijiao
          width 100%
          height 20px
          margin-top 5px

          span
            font-family PingFangSC-Regular
            font-size 14px
            color #FFFFFF
            float right
            padding-right 28px

        .top_one_second_wrap
          margin-top 10px
          text-align center

          .money
            font-size 17px
            color #FFFFFF

          .number
            font-family DINCondensed-Bold
            font-size 60px
            color #FFFFFF

        .top_one_bottom_wrap
          width 100%
          margin-top 15px
          text-align center

          span
            font-family PingFangSC-Regular
            font-size 14px
            color #FFFFFF

      .top_three
        width 100%
        background-image url('../assets/images/bg_history.png')
        background-repeat no-repeat
        background-size 100%
        height 135px

        .top_one_first_wrap_two
          display flex

          .today_chujie_two
            padding-top 27px
            padding-left 32px
            font-family PingFangSC-Medium
            font-size 18px
            font-weight normal
            font-stretch normal
            color #ffffff

          .top_one_first_right
            flex 1
            padding-top 27px

            img
              width 12px
              height 12px
              padding-top 2px
              float right

            span
              font-family PingFangSC-Regular
              font-size 16px
              color #FFFFFF
              float right
              padding-left 8px
              padding-right 27px

        .bijiao
          width 100%
          height 20px
          margin-top 5px

          span
            font-family PingFangSC-Regular
            font-size 14px
            color #FFFFFF
            float right
            padding-right 28px

        .top_one_second_wrap
          margin-top 10px
          text-align center

          .money
            font-size 17px
            color #FFFFFF

          .number
            font-family DINCondensed-Bold
            font-size 60px
            color #FFFFFF

        .top_one_bottom_wrap
          width 100%
          margin-top 15px
          text-align center

          span
            font-family PingFangSC-Regular
            font-size 14px
            color #FFFFFF

      .today_chujie_number_two
        color #fca53c
        font-size 25px
        font-family DINAlternate-Bold
        padding-top 10px
        padding-bottom 6px

      .msite_iphonex_bottmo_title
        padding-top 20px
        padding-bottom 12px

      .line
        width auto
        margin-right 20px
        height 0.5px
        background-color #e4e4e4

      .list_item_wrap
        width 100%
        padding-left 20px
        position relative
        box-sizing border-box

        .title
          padding-top 12px
          font-size 12px
          color #858585
          font-family PingFangSC-Medium

        .number
          font-size 20px
          padding-top 12px
          color #000
          font-family DINAlternate-Bold
          padding-bottom 12px

        .msite_iphonex_number
          padding-bottom 16px
          padding-top 16px

        .list_item_wrap_right
          position absolute
          right 15px
          top 40px

          img
            width 11px
            height 11px

          span
            font-family PingFangSC-Regular
            font-size 16px
            color #29354D

        .line
          width auto
          margin-right 10px
          height 0.5px
          margin-left 10px
          background-color #e4e4e4

      .list_item_wrap_two
        width 100%
        position relative
        padding-left 20px
        box-sizing border-box

        .title_two
          padding-top 10px
          font-size 12px
          color #858585
          font-family PingFangSC-Medium

        .number_two
          font-size 20px
          padding-top 10px
          color #000
          font-family DINAlternate-Bold
          padding-bottom 10px

        .msite_iphonex_bottmo_list
          padding-top 14px
          padding-bottom 14px

        .list_item_wrap_right_two
          position absolute
          right 15px
          top 35px

          img
            width 11px
            height 11px

          span
            font-family PingFangSC-Regular
            font-size 16px
            color #29354D

        .line_two
          width auto
          margin-right 10px
          height 0.5px
          margin-left 10px
          background-color #e4e4e4

  .dibu
    height 40px
    text-align center
    line-height 40px

    span
      color gray
      font-size 12px

  .iphonex-bottom
    height 60px
    text-align center
    line-height 60px

    span
      color gray
      font-size 12px

  .dibubottom
    width 100%
    height 60px

.nodata
  width 100%
  height 100%
  margin-top 120px
  text-align center
  line-height 30px

  img
    width 214px
    height 157px

  span
    font-family PingFangSC-Regular
    font-size 14px
    color #909090
    letter-spacing 0
    text-align center

.history_title
  font-size 28px
  color #FFFFFF
  font-family DINCondensed-Bold
  padding 0 46px
  line-height 135px
</style>
