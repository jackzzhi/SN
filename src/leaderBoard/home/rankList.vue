<template>
  <div class="rank_wrap">
    <div class="msite_head">
      <div class="msite_top">
        <img src="../../assets/images/backnew.png" class="jiantou" @click="goBack">
        <span>排行榜</span>
      </div>
    </div>
    <ul>
      <li v-for="(item,index) in rankListData" :key="index" @click="toDetails(item.children,item.name)">
        <div class="rank_item">
          <div class="left">
            <img v-if="item.id==11" src="../assets/images/yewue.png"  class="icon-about" alt="">
            <img v-if="item.id==12" src="../assets/images/jinshen.png"  class="icon-about" alt="">
            <img v-if="item.id==13" src="../assets/images/C-M1.png"  class="icon-about" alt="">
            <img v-if="item.id==14" src="../assets/images/liuru.png"  class="icon-about" alt="">
            <span>{{item.name}}</span>
          </div>
          <img class="icon-jiantou" src="@/assets/images/youjiantou1.png"/>
        </div>
        <div class="line"></div>
      </li>
    </ul>
  </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
      data(){
        return{
          rankListData:''
        }
      },
      created(){
        this.$commonApi.collection({modelNo:'Subject_10'})//埋点
        this.rankListData = JSON.parse(localStorage.getItem('rankListData')).children;
      },
      methods:{
        goBack(){
          this.$router.push('/home/personnal');
        },
        toDetails(children,name){
          localStorage.setItem('rankDetailsData',JSON.stringify(children));
          localStorage.setItem('rankDetailsDataTitleName',name);
          this.$router.push('/leaderBoard/nationalStore')
        }
      },
      computed: {
        ...mapGetters(["deviceinfo"])
      },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../assets/stylus/methods.styl"
  .msite_head {
    width 100%
    height 34px
    iphonefixpadding(30px)
    text-align center
    z-index 100
    background #4E97FF

    .msite_top {
      color #ffffff
      font-size 18px
      padding 0 0 15px 0
      text-align center
      font-family PingFangSC-Semibold
    }
    .msite_top span {
      font-family PingFangSC-Semibold
      font-size 18px
    }

    .jiantou {
      position absolute
      left 0px
      padding-left 10px
      margin-top -2px
      width 20px
      height 20px
    }
  }


  .rank_wrap
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color #f6f8f9
    margin 0
    padding 0
    ul
     list-style none
     margin-top 16px
     background-color #FFFFFF
     li
      .rank_item
         width 100%
         height 73px
         font-size 14px
         .left
           float left
           margin-top 20px
           margin-left 26px
           .icon-about
             width 34px
             height 34px
             vertical-align middle
             margin-right 10px
           span
             font-size 16px
             vertical-align middle
             color #29354D
             font-family PingFangSC-Regular
         .icon-jiantou
           float right
           width 22px
           height 22px
           margin-top 27px
           margin-right 22px
      .line
        width 94%
        height 2px
        background-color #f6f6f6
        margin-left 6%

</style>
