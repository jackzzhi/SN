import * as types from "@/store/mutation-types";
export default {
  async saveTimeBattleHomeNavs({commit},payload){
    commit(types.SAVE_TIMEBATTLE_HOME_NAVS,payload)
  },
  async saveTimeBattleKPINavs({commit},payload){
    commit(types.SAVE_TIMEBATTLE_KPI_NAVS,payload)
  }
}

