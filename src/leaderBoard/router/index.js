const leaderBoard = r => require.ensure([],() => r(require('@/leaderBoard/home/leaderboard')),'leaderBoard')
const nationalStore = r => require.ensure([],() => r(require('@/leaderBoard/home/children/nationalStore')),'nationalStore')//全国门店
const nationalDivision = r => require.ensure([],() => r(require('@/leaderBoard/home/children/nationalDivision')),'nationalDivision')//全国分部
const regionalStore = r => require.ensure([],() => r(require('@/leaderBoard/home/children/regionalStore')),'regionalStore')//区域门店
const rankList = r => require.ensure([], () => r(require('@/leaderBoard/home/rankList')), 'rankList');

export default [
  {
    path:'/leaderBoard/ranklist',
    component:rankList,
    meta:{
      showHeader:false,
      showFooter:false
    }
  },
  {
  path:'/leaderBoard',
  name:'leaderBoard',
  component:leaderBoard,
      children:[
        {
          path:'/leaderBoard/nationalStore',
          component:nationalStore,
          meta:{
            showHeader:false,
            showFooter:true
          }
        },
        {
          path:'/leaderBoard/nationalDivision',
          component:nationalDivision,
          meta:{
            showHeader:false,
            showFooter:true
          }
        },{
          path:'/leaderBoard/regionalStore',
          component:regionalStore,
          meta:{
            showHeader:false,
            showFooter:true
          }
        },
  ]
}]
