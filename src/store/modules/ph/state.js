export default {
  userid:localStorage.getItem('userid')?localStorage.getItem('userid'):'',
  deviceinfo:{},
  //loadingShow
  loadingShow:false,
  //机构选择模块
  org:{},
  orgCodeList:[], //组织机构
  orgCodeName:'',//默认机构选中的文字展示
  provinceCodeNum:'', //组织机构省份code
  cityCodeNum:'', //组织机构市级code
  firstOrgCodeName:'',//第一级机构名
  secondOrgCodeName:'',//第二级机构名
  thirdOrgCodeName:'',//第三级机构名

  footerCurrent:0, //底部导航选中的index

  isIOS:false, //当前是否为ios机型
  isAndroid:false, //当前是否为Android机型
  isIphoneX:false, //当前是否为iphonex机型

  msgUnreadTotal:0, //未读消息数量
  noticeUnreadTotal:0,//未读公告数量
  newsUnreadTotal:0,//未读消息和公告总数量


  kequnid:'',//客群id
  portraitId:'',//精准画像
  rankid:'',//排行榜id

  h5Version:"",//当前页面的版本号
}
