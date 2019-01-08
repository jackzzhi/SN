<template>
  <div class="main_wrap">
    <header-nav ref='headerNav' :activeId='0' :fixedHead="true"></header-nav>
    <mt-loadmore  class="loadmorestwo" :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore" :maxDistance="90">
      <div slot="top" class="mint-loadmore-top">
        <div class="top_tip">
          <div class="icon">
            <div class="la-ball-spin-clockwise">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <span v-show="topStatus !== 'loading'" class='txt' :class="{ 'rotate': topStatus === 'drop' }">&nbsp;&nbsp;松开刷新</span>
          <span v-show="topStatus === 'loading'" class='txt loading-txt'>正在刷新...</span>
        </div>
      </div>
      <div v-if="!isNoData">
        <look-lend-money  :tagsType="false" :currentLendData="currentLendData" :todayNearlyType="todayNearlyType" :nearlySevenDays="nearlySevenDays" :reshtime="reshtime" :todayCha="todayCha"></look-lend-money>

        <div style="background: #fff;position: relative;height: 100%">
        <financial-list-item v-for="(item,index) in bottomList" :financialData="item" :key="index" :cartindex="index" :chaList="bottomChaList[index]"></financial-list-item>
        <div class="dibu"></div>
      </div>
      </div>
      <div class="nodata" v-else="isNoData">
        <div>
          <img src="../../../../assets/images/wushuju.png"/>
        </div>
        <div class="text_wrap">

          <span>暂无相关数据</span>
        </div>
      </div>
    </mt-loadmore>

    <div class="topBar" id="goTop">
      <img src="../../../assets/images/fhdb.png" alt="" class="goTop" v-show="goTopShow" @click="goTop">
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { Browser } from '../../../../untils/common'
  import { Loadmore } from 'mint-ui'
  import financialListItem from '../../../components/financialListItem'
  import lookLendMoney from '../../../components/lookLendMoney'
  import headerNav from '@/xqpages/components/headerNav'
  export default {
    data() {
      return {
        reshtime: '正在读取',
        topStatus: '',
        goTopShow: false,
        // timer: '', //计时器
        firstLoad: true,
        isNoData:false,
        currentLendData:{},//今日出借
        todayNearlyType:'',//首页中的近七日走势图
        nearlySevenDays: {},//近七日
        bottomList:[],//首页下边list
        bottomChaList:[],//底部差值数组  {type:2减少 1增加 0不变},
        todayCha:{},// 今日出借差值  {type:2减少 1增加 0不变}
      }
    },
    computed: {
      ...mapGetters(['userid','timeBattleHomeNavs'])
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
      this.battleList(0)
      this.battleToday();
      this.battleYesterday() //获取昨日时间接口
    },
    destroyed() {
      // if (this.timer) {
      //   clearInterval(this.timer)
      // }
      if (this.timerVersion) {
        clearInterval(this.timerVersion)
      }
    },
    activated() {
      // window.scrollTo(0, 0)
      this.addListener()
      // this.timer = setInterval(() => {
      //   this.battleList(2)
      //   this.battleYesterday()
      // }, 60 * 1000)

      //原生交互
      if (window.webkit) {
        window.webkit.messageHandlers.changeStatusBarColor.postMessage({
          type: '0'
        })
      }
      if (window.messageHandlers) {
        window.messageHandlers.changeStatusBarColor('0')
      }
    },
    deactivated() {
      this.removeListener()
      // if (this.timer) {
      //   clearInterval(this.timer)
      // }
    },
    methods: {
      ...mapActions(['saveFooterCurrent', 'saveLoadingShow']),
      battleToday(){
        //接口获取今天的时间
        this.$ajax({
          method: 'get',
          url: '/mc-data/date/all',
          dataType: 'json',
          headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        })
          .then(res => {
            if (res.data.code == 200) {
              this.reshtime=res.data.data.sysTime
            }
          })
          .catch(err => {
            console.log(err)
          })
      },

      battleList(type) {
        // if(type===1){
        //   this.saveLoadingShow(false)
        // }else{
        //   this.saveLoadingShow(true)
        // }

        //订阅接口
        this.$ajax({
          method: 'post',
          url: '/saasbi/cockpit/xiangqian/list',
          dataType: 'json',
          headers: { 'Content-Type': 'application/json;charset=UTF-8' },
          data: JSON.stringify({
            token: localStorage.getItem('userid'),
            // subjectId: '403',
            subjectId: this.timeBattleHomeNavs[0].id,
            masterNo: '04'
          })
        })
        //type 0 第一次进入  1刷新   2循环器
          .then(res => {
              if (res.data.code != 500) {
                this.saveLoadingShow(false)
              }
              // 请求成功
              if (res.data.code == 200) {
                if (res.data.data&&res.data.data.length > 0) {
                  this.isNoData=false
                  let tempBottomList=[]
                  for (var i = 0; i < res.data.data.length; i++) {
                    if(res.data.data[i].id == '403'){
                      tempBottomList=res.data.data[i].datas
                    }else if(res.data.data[i].id == '405'){
                      if(tempBottomList.length>0){
                        this.nearlySevenDays=res.data.data[i]
                        this.todayNearlyType='nearlyType'//近七日走势图类型
                      }else{
                        this.isNoData=true
                      }

                    }
                  }
                  this.bottomList=[]
                  for(var j=0;j<tempBottomList.length;j++){
                    if(tempBottomList[j].itemAlias =='今日出借'){
                      this.currentLendData=tempBottomList[j].list[0]
                    }else{
                      this.bottomList.push(tempBottomList[j])
                    }
                  }

                  //type 0 第一次进入  1刷新   2循环器
                  if (type === 1) {
                    // this.$toast({ message: '刷新成功', duration: 1000 })
                    this.topCha(this.currentLendData,this.todayCha,type);
                    this.firstBottomChaList(this.bottomList,this.bottomChaList,type); //下拉刷新进入,计算列表差值
                  } else if (type === 2) {
                    this.topCha(this.currentLendData,this.todayCha,type);
                    this.firstBottomChaList(this.bottomList,this.bottomChaList,type); //定时器进入,计算列表差值
                  } else {
                    this.topCha(this.currentLendData,this.todayCha,type);
                    this.firstBottomChaList(this.bottomList,this.bottomChaList,type); //第一次进入,计算列表差值
                  }
                }else if(res.data.data==null||res.data.data.length<1){
                  this.isNoData=true
                }

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
              this.openPage();
            },
            reject=>{
              this.openPage();
            })
          .catch(err => {
            this.openPage();
            // 请求失败
            console.log(err)
            if(this.$refs.loadmore){
              this.$refs.loadmore.onTopLoaded();
            }
            // if (type === 1) {
            //   // this.$toast('刷新失败')
            // }
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
          url: '/mc-data/data/list',
          dataType: 'json',
          headers: { 'Content-Type': 'application/json;charset=UTF-8' },
          data: JSON.stringify({
            token: this.userid,
            subjectId: 403,
            masterNo: '04',
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
      },
      addListener() {
        window.addEventListener('scroll', this.handleScroll)
      },
      removeListener() {
        window.removeEventListener('scroll', this.handleScroll)
      },
      handleScroll() {
        const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        const scrollHeight =
          document.body.scrollHeight || document.documentElement.scrollHeight
        const windowHeight =
          document.body.clientHeight || document.documentElement.clientHeight
        //滚动加载更多
        // if(scrollTop + windowHeight >= scrollHeight-100){this.loadBottom() }
        //回到顶部
        if (scrollTop > 400) {
          this.goTopShow = true
          this.scrollTop = scrollTop
        } else {
          this.goTopShow = false
        }
      },
      goTop() {
        let timer = null,
          _that = this
        cancelAnimationFrame(timer)
        timer = requestAnimationFrame(function fn() {
          if (_that.scrollTop > 0) {
            _that.scrollTop -= 50
            document.body.scrollTop = document.documentElement.scrollTop =
              _that.scrollTop
            timer = requestAnimationFrame(fn)
          } else {
            cancelAnimationFrame(timer)
            _that.goTopShow = false
          }
        })
      },
      loadTop() {
        //下拉刷新
        // if (this.timer) {
        //   clearInterval(this.timer)
        // }
        setTimeout(() => {
          this.saveLoadingShow(true);
          this.battleList(1)
          this.battleToday();
          this.battleYesterday()
          // this.timer = setInterval(() => {
          //   this.battleList(2)
          //   this.battleYesterday()
          // }, 60 * 1000)
        }, 500)
      },
      handleTopChange(status) {
        this.topStatus = status
      },
      topCha(data,data2,type){
        if(type==0){//第一次进入
          data2.cha = 0;
          data2.value = data.value
          data2.type = 0
        }else{
          data2.cha = data.value-data2.value
          data2.value = data.value
          if(data2.cha>0){//增长
            data2.type = 1
          }else if(data2.cha<0){//减少
            data2.type = 2
          }else{//不变
            data2.type = 0
          }
        }
      },
      //计算差值算法
      firstBottomChaList(datas, datas2, type) {
        // console.log(datas,type)
        if(type==0){//如果是第一次进入
          for(var m = 0;m< datas.length; m++) {
            let twoList = [];
            for(var n = 0;n< datas[m].list.length;n++){
              twoList.push( {
                "cha": "0",
                "type": "0",
                "value": datas[m].list[n].value
              })
            }
            datas2.push(twoList)
            twoList = []
          }
        }

        for (var i = 0; i < datas.length; i++) {
          let twoList = [];
          for(var j = 0;j< datas[i].list.length;j++){
            var newobj = datas[i].list[j] //新对象
            var oldobj = datas2[i][j] //之前对象
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
            twoList.push(tempobj)//添加到数组当中
          }
          datas2.push(twoList)
          twoList = []
        }
        datas2.splice(0,datas.length)
      },
    },
    components: {
      Loadmore,
      financialListItem,
      lookLendMoney,
      headerNav
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus"  scoped>
  @import '../../../../assets/css/loaders.css'
  @import "./index.styl"
</style>
