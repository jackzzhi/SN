import axios from 'axios'

const COMMON_API = {
    /**
   * 埋点方法
   * @param {Object} 
   * @description 埋点约定：
   * //系统级别，app表示司南app: sysNo: "app" 
   * //模块级别（页面级别）modelNo：
   * 000启动、001登录、999退出；
   * 格式：资源类型_资源ID  （biz_subject表）
   * Subject_1  普惠首页、Subject_2 普惠业绩、Subject_4 我的、Subject_5  业绩-业务、Subject_6 业绩-转化、Subject_7 业绩-审批、Subject_8 业绩-进审、Subject_3 普惠风险
   * Subject_9  我的-客群分析
   * 待定      我的-排行榜
   * //操作级别
   * optionNo: 资源类型_资源ID，资源ID取info表
   * 举例：data_item_资源ID
   */
  async collection(params){
    if(!localStorage.getItem("account")) return;
    axios({
      method: 'post',
      url: '/saasbi/event/log/collection',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data:{
        account:localStorage.getItem("account").replace(/\s/gi, ''),//用户名
        masterNo:localStorage.getItem("masterNo"),//用户主体no  , 普惠是“01”， 理财是“99”
        sysNo:"app",//系统级名称，app表示司南app
        modelNo:params.modelNo,//模块级（页面级别）
        optionNo:params.optionNo ? params.optionNo : 'nothing',//操作动作编号，如点击页面中的某个图标什么的
        params:[],//操作动作参数
      }
    })
  }
}

export default COMMON_API