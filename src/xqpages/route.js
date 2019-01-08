/*
 * @Author: xixi
 * @Date: 2018-06-01 17:36:06
 * @Last Modified by:   xixi
 * @Last Modified time: 2018-06-04 17:36:06
 */

const index = r => require.ensure([], () => r(require('@/xqpages/index')), 'index');
const home = r => require.ensure([], () => r(require('@/xqpages/pages/timeBattle/timeBattle')), 'home');
const today = r => require.ensure([], () => r(require('@/xqpages/pages/timeBattle/children/Today')), 'today');
const month = r => require.ensure([], () => r(require('@/xqpages/pages/timeBattle/children/Month')), 'month');
const history = r => require.ensure([], () => r(require('@/xqpages/pages/timeBattle/children/History')), 'history');
// const lendPlanList = r => require.ensure([], () => r(require('@/xqpages/pages/lendPlanList/index')), 'lendPlanList');



const cityList = r => require.ensure([], () => r(require('@/xqpages/pages/cityList/index')), 'cityList');
const cityListPrice = r => require.ensure([], () => r(require('@/xqpages/pages/cityList/children/cityListPrice')), 'cityListPrice');
const cityListTime = r => require.ensure([], () => r(require('@/xqpages/pages/cityList/children/cityListTime')), 'cityListTime');

const plutocratList = r => require.ensure([], () => r(require('@/xqpages/pages/plutocratList/index')), 'plutocratList');
const plutocratListPrice = r => require.ensure([], () => r(require('@/xqpages/pages/plutocratList/children/plutocratListPrice')), 'plutocratListPrice');
const plutocratListTime = r => require.ensure([], () => r(require('@/xqpages/pages/plutocratList/children/plutocratListTime')), 'plutocratListTime');

// 业绩
const achievement = r => require.ensure([], () => r(require('@/xqpages/pages/achievement/index')), 'achievement');
const achievementToday = r => require.ensure([], () => r(require('@/xqpages/pages/achievement/children/achievementToday')), 'achievementToday');
const achievementMonth = r => require.ensure([], () => r(require('@/xqpages/pages/achievement/children/achievementMonth')), 'achievementMonth');

// 出借分布列表
const lendPlanList = r => require.ensure([], () => r(require('@/xqpages/pages/lendPlanList/index')), 'lendPlanList');
const lendListToday = r => require.ensure([], () => r(require('@/xqpages/pages/lendPlanList/children/lendListToday')), 'lendListToday');
const lendListMonth = r => require.ensure([], () => r(require('@/xqpages/pages/lendPlanList/children/lendListMonth')), 'lendListMonth');
//我的
const personnal = r => require.ensure([], () => r(require('@/pages/Personnal')), 'personnal');

//帮助页面
import help from '@/xqpages/components/help'

export default [{
  path: '/timebattle',
  name: 'timebattle',
  component: index,
  // redirect: '/timebattle/index',
  children: [{ //首页
      path: '/timebattle/index',
      redirect: '/timebattle/index/today',
      component: home,
      children: [{
          path: '/timebattle/index/today',
          component: today,
          meta: {
            showHeader: false,
            showFooter: true,
            keepAlive: true
          }
        },
        {
          path: '/timebattle/index/month',
          component: month,
          meta: {
            showHeader: false,
            showFooter: true,
            keepAlive: true
          }
        },
        {
          path: '/timebattle/index/history',
          component: history,
          meta: {
            showHeader: false,
            showFooter: true,
            keepAlive: true
          }
        }
      ]
    },
    {
      name: "help",
      path: '/timeBattle/help',
      component: help,
      meta: {
        showHeader: false,
        showFooter: false,
        keepAlive: true
      }
    },
    {
      path: '/cityList',
      component: cityList,
      children: [{
          path: '/cityList/price',
          component: cityListPrice,
        },
        {
          path: '/cityList/time',
          component: cityListTime,
        },
      ]
    },
    {
      path: '/plutocratList',
      component: plutocratList,
      children: [{
          path: '/plutocratList/price',
          component: plutocratListPrice,
        },
        {
          path: '/plutocratList/time',
          component: plutocratListTime,
        },
      ]
    },
    { //业绩
      path: '/achievement',
      component: achievement,
      name: 'achievement',
      redirect: '/achievement/today',
      children: [{
          path: '/achievement/today',
          component: achievementToday,
          meta: {
            showHeader: false,
            showFooter: true,
            keepAlive: true
          }
        },
        {
          path: '/achievement/month',
          component: achievementMonth,
          meta: {
            showHeader: false,
            showFooter: true,
            keepAlive: true
          }
        },
      ]
    },
    { //出借计划分布列表
      path: '/lendPlanList',
      component: lendPlanList,
      children: [{
          path: '/lendPlanList/today',
          component: lendListToday,
          meta: {
            showHeader: false,
            showFooter: false,
            keepAlive: true
          }
        },
        {
          path: '/lendPlanList/month',
          component: lendListMonth,
          meta: {
            showHeader: false,
            showFooter: false,
            keepAlive: true
          }
        },
      ]
    },
    {
      path: '/timebattle/personnal',
      component: personnal,
      meta: {
        showHeader: false,
        showFooter: true,
        keepAlive: true
      }
    },
  ],
}];
