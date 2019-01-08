import * as types from "@/store/mutation-types";

export default {
  [types.SAVE_TIMEBATTLE_HOME_NAVS](state,res){
   state.timeBattleHomeNavs = res
   localStorage.setItem('timeBattleHomeNavs',JSON.stringify(res))
  },
  [types.SAVE_TIMEBATTLE_KPI_NAVS](state,res){
   state.timeBattleKPINavs = res
   localStorage.setItem('timeBattleKPINavs',JSON.stringify(res))
  }
}
