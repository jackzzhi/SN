<template>
  <div class="footer" v-if='tabs.length>0 && tabs[0]!==undefined'>
    <div v-for='(item,index) of tabs' :class='{on:index === footerCurrent}' @click="changeColors(index)">
      <img v-if='footerCurrent>=tabs.length' :src="index===tabs.length-1?item.iconSelect:item.icon">
      <img v-else :src="index===footerCurrent?item.iconSelect:item.icon">
      <p v-if='footerCurrent>=tabs.length' :class="{on:index===tabs.length-1}" >{{item&&item.name}}</p>
      <p v-else :class="{on:index===footerCurrent}" >{{item&&item.name}}</p>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {mapActions,mapGetters} from 'vuex'
  export default{
    data(){
      return {
        tabs:[],
        normalTabs:[
          {
            id:1,
            name:"首页",
            push:"/home/msite",
            icon:require('../../assets/images/tabicon/home.png'),
            iconSelect:require('../../assets/images/tabicon/home-blue.png')
          },
          {
            id:2,
            name:"业绩",
            push:"/home/performance",
            icon:require('../../assets/images/tabicon/datas.png'),
            iconSelect:require('../../assets/images/tabicon/datas-blue.png')
          },
          {
            id:3,
            name:"风险",
            push:"/home/riskData",
            icon:require('../../assets/images/tabicon/risk.png'),
            iconSelect:require('../../assets/images/tabicon/risk-blue.png')
          },
          {
            id:4,
            name:"我的",
            push:"/home/personnal",
            icon:require('../../assets/images/tabicon/user.png'),
            iconSelect:require('../../assets/images/tabicon/user-blue.png')
          }
        ],
        timeBattleTabs:[
          {
            name:"业绩",
            push:"/home/timebattle",
            icon:require('../../assets/images/tabicon/datas.png'),
            iconSelect:require('../../assets/images/tabicon/datas-blue.png')
          },
          {
            name:"我的",
            push:"/home/personnal",
            icon:require('../../assets/images/tabicon/user.png'),
            iconSelect:require('../../assets/images/tabicon/user-blue.png')
          }
        ],
        timeBattleNewTabs:[
          {
            id: 402,
            name:"首页",
            push:"/timeBattle/index",
            icon:require('../../assets/images/tabicon-xq/shouye-hei@2x.png'),
            iconSelect:require('../../assets/images/tabicon-xq/shouye-lan@2x.png')
          },
           {
             id: 405,
             name:"业绩",
             push:"/achievement/today",
             icon:require('../../assets/images/tabicon-xq/yeji-hei@2x.png'),
             iconSelect:require('../../assets/images/tabicon-xq/yeji-lan@2x.png')
           },
          {
            id: 410,
            name:"我的",
            push:"/timebattle/personnal",
            icon:require('../../assets/images/tabicon-xq/wode-hei@2x.png'),
            iconSelect:require('../../assets/images/tabicon-xq/wode-lan@2x.png')
          }
        ]
      }
    },
    computed:{
      ...mapGetters(['footerCurrent','userid'])
    },
    created(){
      if(localStorage.getItem('masterNo') == '99'){
        //理财用户
        this.tabs = this.timeBattleTabs
      }
      else{
        //普惠用户，新理财用户
        this.getTabs()
      }
    },
    methods:{
      ...mapActions(['saveFooterCurrent','saveUserPortraitId','savePortraitDetailId','saveUserRankId','saveTimeBattleHomeNavs','saveTimeBattleKPINavs']),
      getTabs(){
        let masterNo = localStorage.getItem('masterNo') ? localStorage.getItem('masterNo') : '01'//用户主体，01为普惠，02为理财
        let ajaxParams={
            token: this.userid,
            masterNo: masterNo
          }
        this.$ajax({method: 'post',url: '/mc-data/data/subject/list',dataType: 'json', headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify(ajaxParams)
        }).then(res=>{  // 请求成功
          if(res.data.code == 200){
            let data = res.data.data,
            currentTabs=[],
            rankList=[];
            data.forEach((item,index)=>{
              if(masterNo=='' || masterNo == '01'){
                this.normalTabs.forEach(tab => {
                  if(tab.id == item.id){
                    currentTabs.push(tab)
                  }
                })
              }
              else if(masterNo == '04'){
                this.timeBattleNewTabs.forEach(tab => {
                  if(tab.id == item.id){
                    currentTabs.push(tab)
                  }
                })
              }
              if(item.id == 4){//我的
                this.saveUserRankId('');
                item.children.forEach((items,indexs)=>{
                  if(items.id == 10){//排行榜
                    this.saveUserRankId(items.id)
                    localStorage.setItem('rankListData',JSON.stringify(items))
                  }
                  //客群分析
                  if(items.id == 27){
                    this.saveUserPortraitId(items.id)
                  }
                  //精准画像
                  if(items.id == 29){
                    this.savePortraitDetailId(items.id)
                  }
                })
              }
              else if(item.id == 2){//普惠-业绩
                //业绩的页面tab
                let performanceTabs = item.children; //四个tab的名字
                let performanceTabsId=[],
                  performanceTabsName=[];
                performanceTabs.forEach((item)=>{
                  performanceTabsId.push(item.id)
                  performanceTabsName.push(item.name)
                })
                localStorage.setItem('performanceTabsIds',JSON.stringify(performanceTabsId))
                localStorage.setItem('performanceTabsName',JSON.stringify(performanceTabsName))
              }
              else if(item.id == 402){//新理财 - 首页
                this.saveTimeBattleHomeNavs(item.children)
                if(this.$route.path == '/timebattle'){
                  this.$router.push('/timebattle/index')
                }
              }
              else if(item.id == 405){//新理财 - 业绩
                this.saveTimeBattleKPINavs(item.children)
              }
            })
            this.tabs = currentTabs
          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1'
            }); //退出记住密码
          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.$logOut()
          }else{
            console.log(res.data.msg)
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      changeColors(index){
        this.saveFooterCurrent(index)
        this.$router.push(this.tabs[index].push)
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/methods'
  .footer
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    background #ffffff
    width: 100%
    border-top 0.5px solid #f1f1f1
    z-index 99999999
    iphonefixheight(56px)
    div
      text-align center
      flex: 1;
      img
        width: 21px;
        height: 20px;
        -webkit-margin-before: 11px;
        -webkit-margin-after: 0em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
      p
       color #29354D
       font-size 10px
       -webkit-margin-before: 5px;
       -webkit-margin-after: 0em;
       -webkit-margin-start: 0px;
       -webkit-margin-end: 0px;
    .on
      color #4E97FF
</style>
