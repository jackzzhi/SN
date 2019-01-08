<template>
  <div class="personnal_wrap" >
    <blue-header title="个人信息"></blue-header>
    <div class="middle" v-cloak>
      <div class="xingMing">
        <img src="@/assets/images/xingming.png" alt="">
        <span class="one">姓名</span>
        <span class="two" v-show="name" v-cloak>{{datas.a}}</span>
      </div>
      <div class="line"></div>
      <div class="xingMing">
        <img src="@/assets/images/bianhao.png" alt="">
        <span class="three">员工编号</span>
        <span class="two" v-show="bianhao" v-cloak>{{datas.b}}</span>
      </div>
      <div class="line"></div>
      <div class="xingMing">
        <img src="@/assets/images/jigou.png" alt="">
        <span class="one">所属机构</span>
        <span class="two" v-show="jigou" v-cloak>{{datas.c}}</span>
      </div>
      <div class="line"></div>
      <div class="xingMing">
        <img src="@/assets/images/gangwei.png" alt="">
        <span class="one">岗位</span>
        <span class="two" v-show="positionName" v-cloak>{{datas.e}}</span>
      </div>
      <div class="line"></div>
      <div class="xingMing" v-text="">
        <img src="@/assets/images/shouji1.5x.png" alt="">
        <span class="fore">手机号</span>
        <span class="two" v-text="phoneSeparated(datas.d)" v-cloak v-show="iphone"></span>
      </div>

    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data(){
      return {
        datas:{
          a:'data.userName',
          b:'data.employeeId',
          c:'data.orgName',
          d:'data.mobile',
          e:'data.positionName'
        },
        name:false,
        bianhao:false,
        jigou:false,
        iphone:false,
        positionName:false
      }
    },
    computed:{
      ...mapGetters(['userid'])
    },
    mounted(){
      this.dataList();
      this.phoneSeparated();
    },
    methods:{
     dataList(){
        this.$ajax({method: 'post',url: '/mc-user/user/token',dataType: 'json', headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            token: this.userid,
          }),
        }).then(res=>{  // 请求成功
             if(res.data.code == 200){
              let data = res.data.data;
               this.datas.a=data.userName;
               if(this.datas.a != ''){
                  this.name = true
               }
               this.datas.b=data.employeeId;
               if(this.datas.b != ''){
                 this.bianhao = true
               }
               this.datas.c = data.orgName;
               if(this.datas.c != ''){
                 this.jigou = true
               }
               this.datas.d = data.mobile;
               if(this.datas.d != ''){
                 this.iphone = true
               }
               this.datas.e = data.positionName;
               if(this.datas.e != ''){
                 this.positionName = true
               }

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
        }).catch(function(err){// 请求失败
          console.log(err)
        })
      },
      phoneSeparated(phoneNumber) {
        let tel = phoneNumber;
        if (tel) {
          tel = tel.substring(0, 3) + ' ' + tel.substring(3, 7) + ' ' + tel.substring(7, 11);
        }
        return tel;
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .personnal_wrap
    position fixed
    top 0
    left 0
    right 0
    bottom 0px
    background-color #f6f8f9
    .middle
      width 100%
      margin-top 25px
      background-color #ffffff
     .xingMing
      width 100%
      height 55px
      line-height 55px
      background-color #ffffff
      margin-bottom 1px
      img
       margin-left 22px
       margin-right 9px
       width 22px
       height 22px
       vertical-align middle
      .one
        font-size 14px
        color #909090
      .two
        font-size  14px
        float right
        margin-right 20px
        color #29354D
      .three
        font-size 14px
        color #909090
      .fore
        font-size 14px
        color #909090

     .line
      width 100%
      height 1px
      background-color #f6f8f9
      margin-left  5%

    [v-cloak]
      display: none !important;


</style>
