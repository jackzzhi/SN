const userPortraitHome = r => require.ensure([],() => r(require('@/userportrait/home/userPortraitHome')),'userPortraitHome')
const gaiM = r => require.ensure([],() => r(require('@/userportrait/home/children/gaiM')),'gaiM')
const fenXi = r => require.ensure([],() => r(require('@/userportrait/home/children/fenXi')),'fenXi')

export default [{
  path:'/userportraithome',
  name:'userportraithome',
  component:userPortraitHome,
      children:[
        {
          path:'/userportraithome/gaim',
          component:gaiM,
          meta:{
            showHeader:false,
            showFooter:true,
            bodyColor:'#5b96ff'
          }
        },
        {
          path:'/userportraithome/fenXi',
          component:fenXi,
          meta:{
            showHeader:false,
            showFooter:true,
            bodyColor:'#5b96ff'
          }
        },
      ]
}]
