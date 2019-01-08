  /**
   * 全局过滤器
   * */
import Moment from 'moment';
const filters = {
  convertTime(value){
    Moment(value).format('YY/MM/DD hh:mm')
  },
  limitStr(v,num){
    //1季度多家房企利润跌幅超50% 去库存促销战打响
    let tmp = '';
    if(v.length > num){
      tmp = v.substring(0,num) + '...';
    }else{
      tmp = v;
    }
    return  tmp;
  },
  numToThousands(num){
    return num ? num.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,') : num;
  }
}

export default filters