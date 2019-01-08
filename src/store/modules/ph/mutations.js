import * as types from "@/store/mutation-types";

export default {
  [types.SAVE_USERID](state,res){
   state.userid=res
   localStorage.setItem('userid',res)
  },
  [types.SAVE_DEVICEInfO](state,res){
   state.deviceinfo=res
  },
  [types.SAVE_LOADINGSHOW](state,res){
    state.loadingShow=res
  },
  [types.SAVE_ORG](state,res){
    state.org=res
  },
  [types.SAVE_ORGCODELIST](state,res){
    state.orgCodeList=res
  }
  ,
  [types.SAVE_PROVINCECODE](state,res){
    state.provinceCodeNum=res
  }
  ,
  [types.SAVE_CITYCODE](state,res){
    state.cityCodeNum=res
  }
  ,
  [types.SAVE_ORGCODENAME](state,res){
    state.orgCodeName=res
  }
  ,
  [types.SAVE_FIRSTORGCODENAME](state,res){
    state.firstOrgCodeName=res
  }
  ,
  [types.SAVE_SECONDORGCODENAME](state,res){
    state.secondOrgCodeName=res
  }
  ,
  [types.SAVE_THIRDORGCODENAME](state,res){
    state.thirdOrgCodeName=res
  }
  ,
  [types.SAVE_FOOTERCURRENT](state,res){
    state.footerCurrent=res
  }
  ,
  [types.SAVE_MSGUNREADTOTAL](state,res){
    state.msgUnreadTotal=res
  }
  ,
  [types.SAVE_NOTICEUNREADTOTAL](state,res){
    state.noticeUnreadTotal=res
  }
  ,
  [types.SAVE_NEWSUNREADTOTAL](state,res){
    state.newsUnreadTotal=res
  }
  ,
  [types.SAVE_ISIOS](state,res){
    state.isIOS = res
  }
  ,
  [types.SAVE_ISANDROID](state,res){
    state.isAndroid = res
  }
  ,
  [types.SAVE_ISIPHONEX](state,res){
    state.isIphoneX = res
  },
  [types.SAVE_USERPORTRAITID](state,res){
    state.kequnid = res
  },
  [types.SAVE_PORTRAIT_DETAIL_ID](state,res){
    state.portraitId = res
  },
  [types.SAVE_USERRANKID](state,res){
    state.rankid = res
  },
  [types.SAVE_H5VERSION](state,res){
    state.h5Version = res
  }
}
