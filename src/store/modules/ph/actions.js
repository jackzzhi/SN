import * as types from "@/store/mutation-types";
export default {
  async saveUserid({commit},payload){
    commit(types.SAVE_USERID,payload)
  },
  async saveDevice({commit},payload){
    commit(types.SAVE_DEVICEInfO,payload)
  },
  async saveLoadingShow({commit},payload){
    commit(types.SAVE_LOADINGSHOW,payload)
  },
  async saveOrg({commit},org){
    commit(types.SAVE_ORG,{org})
  },
  async saveOrgCodeList({commit},payload){
    commit(types.SAVE_ORGCODELIST,payload)
  },
  async savePrinceCode({commit},payload){
    commit(types.SAVE_PROVINCECODE,payload)
  },
  async saveCityCode({commit},payload){
    commit(types.SAVE_CITYCODE,payload)
  },
  async saveOrgCodeName({commit},payload){
    commit(types.SAVE_ORGCODENAME,payload)
  }
  ,
  async saveFirstOrgCodeName({commit},payload){
    commit(types.SAVE_FIRSTORGCODENAME,payload)
  }
  ,
  async saveSecondOrgCodeName({commit},payload){
    commit(types.SAVE_SECONDORGCODENAME,payload)
  }
  ,
  async saveThirdOrgCodeName({commit},payload){
    commit(types.SAVE_THIRDORGCODENAME,payload)
  }
  ,
  async saveFooterCurrent({commit},payload){
    commit(types.SAVE_FOOTERCURRENT,payload)
  }
  ,
  async saveMsgUnreadTotal({commit},payload){
    commit(types.SAVE_MSGUNREADTOTAL,payload)
  }
  ,
  async saveNoticeUnreadTotal({commit},payload){
    commit(types.SAVE_NOTICEUNREADTOTAL,payload)
  }
  ,
  async saveNewsUnreadTotal({commit},payload){
    commit(types.SAVE_NEWSUNREADTOTAL,payload)
  }
  ,
  async saveIsAndroid({commit},payload){
    commit(types.SAVE_ISANDROID,payload)
  }
  ,
  async saveIsIOS({commit},payload){
    commit(types.SAVE_ISIOS,payload)
  }
  ,
  async saveIsIphonex({commit},payload){
    commit(types.SAVE_ISIPHONEX,payload)
  },
  async saveUserPortraitId({commit},payload){
    commit(types.SAVE_USERPORTRAITID,payload)
  },
  async savePortraitDetailId({commit},payload){
    commit(types.SAVE_PORTRAIT_DETAIL_ID,payload)
  },
  async saveUserRankId({commit},payload){
    commit(types.SAVE_USERRANKID,payload)
  },
  async saveH5Version({commit},payload){
    commit(types.SAVE_H5VERSION,payload)
  }
}

