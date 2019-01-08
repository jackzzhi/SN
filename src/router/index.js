import Vue from 'vue'
import Router from 'vue-router'

const Login = r => require.ensure([], () => r(require('@/pages/Login')), 'Login');
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'Home');
const Msite = r => require.ensure([], () => r(require('@/pages/Msite')), 'Msite');
const Performance = r => require.ensure([], () => r(require('@/pages/performance/index')), 'Performance');
const Fox = r => require.ensure([], () => r(require('@/pages/performance/children/fox')), 'Fox');
const Prince = r => require.ensure([], () => r(require('@/pages/performance/children/prince')), 'Prince');
const Rose = r => require.ensure([], () => r(require('@/pages/performance/children/rose')), 'Rose');
const Loan = r => require.ensure([], () => r(require('@/pages/performance/children/loan')), 'Loan');
const riskData = r => require.ensure([], () => r(require('@/pages/riskData')), 'riskData');
const Personnal = r => require.ensure([], () => r(require('@/pages/Personnal')), 'Personnal');
const Personaldetail = r => require.ensure([], () => r(require('@/pages/Personaldetail')), 'Personaldetail');
const PersonalAbout = r => require.ensure([], () => r(require('@/pages/PersonalAbout')), 'PersonalAbout');
const GuidePage = r => require.ensure([], () => r(require('@/pages/GuidePage')), 'GuidePage');
// const BrokenNetwork = r => require.ensure([], () => r(require('@/pages/BrokenNetwork')), 'BrokenNetwork');
import BrokenNetwork from '@/pages/BrokenNetwork'
const noData = r => require.ensure([], () => r(require('@/pages/noData')), 'noData');
const news = r => require.ensure([], () => r(require('@/pages/news/index')), 'news');
const newsAndNotice = r => require.ensure([], () => r(require('@/pages/news/children/newsAndNotice')), 'newsAndNotice');
const newsList = r => require.ensure([], () => r(require('@/pages/news/children/newsList')), 'newsList');
const noticeList = r => require.ensure([], () => r(require('@/pages/news/children/noticeList')), 'noticeList');
const detail = r => require.ensure([], () => r(require('@/pages/news/children/detail')), 'detail');
const FindPassword = r => require.ensure([], () => r(require('@/pages/pwds/FindPassword')), 'FindPassword');
const ResetPassword = r => require.ensure([], () => r(require('@/pages/pwds/ResetPassword')), 'ResetPassword');
const Setting = r => require.ensure([], () => r(require('@/pages/set/Setting')), 'Setting');
const ModifyLoginPwd = r => require.ensure([], () => r(require('@/pages/set/ModifyLoginPwd')), 'ModifyLoginPwd');
const UnderstandGuestGroup = r => require.ensure([], () => r(require('@/pages/UnderstandGuestGroup')), 'UnderstandGuestGroup');

const TimeBattle = r => require.ensure([], () => r(require('@/pages/TimeBattle')), 'TimeBattle');
const TimeBattleHelp = r => require.ensure([], () => r(require('@/pages/TimeBattleHelp')), 'TimeBattleHelp');

const pageRoute = r => require.ensure([], () => r(require('@/pages/pageRoute')), 'pageRoute');
/**
 * 向前金服实时战报
 */
import XQhome from '@/xqpages/route';
import UPhome from '@/userportrait/router/index';
import LBhome from '@/leaderBoard/router/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/home',
      component:Home,
      children:[
        {
          path:'/home/msite',
          component:Msite,
          meta:{
            showHeader:true,
            showFooter:true,
            keepAlive:true
          }
        },
        {
          path:'/home/performance',
          component:Performance,
          redirect:'/home/performance/fox',
          children:[
            {
              path:'/home/performance/fox',
              component:Fox,
              meta:{
                showHeader:true,
                showFooter:true,
                keepAlive:true
              }
            },
            {
              path:'/home/performance/prince',
              component:Prince,
              meta:{
                showHeader:true,
                showFooter:true,
                keepAlive:true
              }
            },
            {
              path:'/home/performance/rose',
              component:Rose,
              meta:{
                showHeader:true,
                showFooter:true,
                keepAlive:true
              }
            },
            {
              path:'/home/performance/loan',
              component:Loan,
              meta:{
                showHeader:true,
                showFooter:true,
                keepAlive:true
              }
            }
          ]
        },
        {
          path:'/home/riskData',
          component:riskData,
          meta:{
            showHeader:true,
            showFooter:true,
            keepAlive:true
          }
        },
        {
          path:'/home/timebattle',
          component:TimeBattle,
          meta:{
            showHeader:false,
            showFooter:true,
            keepAlive:true
          }
        },
        {
          path:'/home/TimeBattleHelp',
          component:TimeBattleHelp,
          meta:{
            showHeader:false,
            showFooter:false,
            keepAlive:true
          }
        },
        {
          path:'/home/personnal',
          component:Personnal,
          meta:{
            showHeader:false,
            showFooter:true,
            keepAlive:true
          }
        },
        {
          path:'/home/personaldetail',
          component:Personaldetail,
          meta:{
            showHeader:false,
            showFooter:false,
            keepAlive:true
          }
        },
        {
          path:'/home/personalAbout',
          component:PersonalAbout,
          meta:{
            showHeader:false,
            showFooter:false,
            keepAlive:true
          }
        },
        {
          path:'/home/setting',
          component:Setting,
          meta:{
            showHeader:false,
            showFooter:false,
            keepAlive:true
          }
        },
        {
          path:'/home/modifyloginpwd',
          component:ModifyLoginPwd,
          meta:{
            showHeader:false,
            showFooter:false,
            keepAlive:false
          }
        }
      ]
    },
    {
      path:'/news',
      component:news,
      redirect : '/news/newsAndNotice',
      children:[
        {
          path:'/news/newsAndNotice',
          component:newsAndNotice
        },
        {
          path:'/news/newsList',
          component:newsList
        },
        {
          path:'/news/noticeList',
          component:noticeList
        },
        {
          name:'detail',
          path:'/news/detail',
          component:detail
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/findpassword',
      component:FindPassword
    },
    {
      path:'/resetpassword',
      component:ResetPassword
    },
    {
      path:'/guidePage',
      component:GuidePage
    },
    {
      path:'/brokennetwork',
      component:BrokenNetwork
    },
    {
      path:'/noData',
      component:noData
    },
    {
      path: '/UnderstandGuestGroup',
      name: 'UnderstandGuestGroup',
      component: UnderstandGuestGroup
    },
    {
      path:'/',
      redirect : '/login'
    },
    {
      path:'/pageRoute',
      name : '页面路由预览',
      component: pageRoute
    },
    ...XQhome,
    ...UPhome,
    ...LBhome
  ]
})

