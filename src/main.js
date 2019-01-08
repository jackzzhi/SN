//初始化vue
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import filters from './untils/filters'

//api
import axios from 'axios'
import ApiCantans from './net/ApiCantans.vue'
import commonApi from './api/common'

axios.defaults.baseURL = ApiCantans.BASE_URL;
Vue.prototype.$ajax = axios;
Vue.prototype.$commonApi = commonApi;

//mintUI
import MintUI  from 'mint-ui'
import {Toast, MessageBox, Swipe, SwipeItem, Checkbox} from 'mint-ui'
import 'lib-flexible/flexible';

Vue.use(MintUI );
//cube-ui
import Cube from 'cube-ui'

Vue.use(Cube)

Vue.prototype.$toast = Toast;
Vue.prototype.$MessageBox = MessageBox;
Vue.component('my-swipe', Swipe);
Vue.component('my-swipeitem', SwipeItem);
//判断浏览器
import {Browser} from './untils/common'
Vue.prototype.$Browser = Browser;

//自定义组件
import loading from './components/loading/loading'
Vue.component('loading', loading);
import commonHeader from './components/headers/commonHeader'//选择机构头部
Vue.component('commonHeader', commonHeader);
import whiteHeader from './components/headers/whiteHeader' //白底头部
Vue.component('whiteHeader', whiteHeader);
import blueHeader from './components/headers/blueHeader' //蓝色头部，个人信息等
Vue.component('blueHeader', blueHeader);
import tabEcharts from './components/tabEcharts'
Vue.component('tabEcharts', tabEcharts);
import chartBox from './components/chartBox'
Vue.component(chartBox.name, chartBox);
import pageSwiper from './components/pageSwiper'
Vue.component('page-swiper', pageSwiper);
import monthSituation from './components/monthSituation'
Vue.component('month-situation', monthSituation);
// 理财
import financialListItem from './xqpages/components/financialListItem'
Vue.component('financial-list-item',financialListItem)
import lookLendMoney from './xqpages/components/lookLendMoney.vue'
Vue.component('look-lend-money',lookLendMoney)
// 用户画像（客群分析）
import huaxiangHead from './userportrait/components/header/huaxiangHead'
Vue.component('huaxiang-head', huaxiangHead);
import customerDescription from './userportrait/components/customerDescription'
Vue.component('customer-description',customerDescription)

//注册全局过滤器
for (let key in filters){
  Vue.filter(key,filters[key])
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/**
 * @name 退出登录
 * @param obj [Object] 记住手机号但是删除密码（情况：1.用户点退出按钮；2.用户被顶下；3.用户修改完新的密码）
 * obj.rememberpwd=='1'表示7天自动退出，记住密码
 */
Vue.prototype.$logOut = function(obj){
  let removepwdVal = '';
  this.$router.push('/login');
  this.$store.dispatch('saveUserid','');
  this.$store.dispatch('saveUserPortraitId','');//清除客群id
  this.$store.dispatch('saveUserRankId','');//清除客群id
  this.$store.dispatch('savePortraitDetailId','');//清除精准画像id
  if(obj && obj.rememberpwd=='1'){
    removepwdVal='0'
  }
  else{
    localStorage.setItem("pwd",'')
    localStorage.setItem('account', '')
    removepwdVal='1'
  }
  if(window.webkit){
    window.webkit.messageHandlers.deleteUserId.postMessage({type:'2',userId:'',removepwd:removepwdVal})
    //removepwd, 1 清除密码， 0 不清除
  }
  if(window.messageHandlers){
    window.messageHandlers.deleteUserId();
  }
}

/**
 * @name 全局钩子
 * @description 在路由跳转时做相应的处理
 */
router.beforeEach((to, from, next) => {
  /* 更改body的底色*/
  if(to.meta.bodyColor){
    document.getElementsByTagName("body")[0].style.background=to.meta.bodyColor
    // document.getElementsByTagName("body")[0].style.backgroundImage='linear-gradient(120deg, #155799, #159957)';
  }
  else{
    document.getElementsByTagName("body")[0].style.background='#f6f8f9'//普通的body背景色
  }
  next()
})


