export default {
  userid:state=>state.userid,
  deviceinfo:state=>state.deviceinfo,
  //loadingShow
  loadingShow:state=>state.loadingShow,
  //机构选择
  org:state=>state.org,
  orgCodeList:state=>state.orgCodeList, //组织机构
  orgCodeName:state=>state.orgCodeName,//默认机构选中的文字展示
  provinceCodeNum:state=>state.provinceCodeNum,//默认机构选中的省份code
  cityCodeNum:state=>state.cityCodeNum,//默认机构选中的省份code
  firstOrgCodeName:state=>state.firstOrgCodeName,
  secondOrgCodeName:state=>state.secondOrgCodeName,
  thirdOrgCodeName:state=>state.thirdOrgCodeName,
  //底部导航
  footerCurrent:state=>state.footerCurrent,
  //机型判断
  isAndroid:state=>state.isAndroid,
  isIOS:state=>state.isIOS,
  isIphoneX:state=>state.isIphoneX,
  //未读消息和公告条数
  msgUnreadTotal:state=>state.msgUnreadTotal,
  noticeUnreadTotal:state=>state.noticeUnreadTotal,
  newsUnreadTotal:state=>state.newsUnreadTotal,

  //我的
  kequnid:state=>state.kequnid,
  portraitId:state=>state.portraitId,
  rankid:state=>state.rankid,
  h5Version:state=>state.h5Version,
}
