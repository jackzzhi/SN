<template>
  <div class="wrapper">
    <div class="fixed-top">
      <!--<xqheader :arrShow="true" :messageIconShow="false" :backUrl="`/achievement/${$route.query.currentType}`"></xqheader>-->
      <div class="lplc_content">
        <div class="jinfu_title">
          <div class="jt_left" @click="goBack">
            <img src="../../assets/images/backnew.png" alt="">
          </div>
          <div class="jt_center">
            <span>城市交易</span>
          </div>
        </div>
      </div>
      <div class="nav-tab">
        <mt-navbar v-model="selected" class="tab">
            <mt-tab-item id="price" @click="toggleTabs('price');">
              <span class="tab-name">金额</span>
              <span class="selected_line"></span>
            </mt-tab-item>
            <mt-tab-item id="time" @click="toggleTabs('time');">
              <span class="tab-name">时间</span>
              <span class="selected_line"></span>
            </mt-tab-item>
        </mt-navbar>
      </div>

    </div>
    <choose-area></choose-area>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import chooseArea from '@/components/chooseArea';
  import xqheader from '@/xqpages/components/xqHeaderSelectCity.vue';
  export default {
    data(){
      return {
        selected:'price'
      }
    },
    components:{
      chooseArea,
      xqheader
    },
    computed:{
      ...mapGetters(['orgCodeName'])
    },
    created(){
      if(this.$route.path == '/cityList/price'){
        this.selected = 'price'
      }
      else if(this.$route.path == '/cityList/time'){
        this.selected = 'time'
      }
      else{
        this.selected = 'price'
      }

    },
    watch:{
      selected(){
        this.toggleTabs(this.selected)
      }

    },
    methods : {
      ...mapActions(['saveFooterCurrent']),
      //今日
      toggleTabs(tabText) {
        window.scrollTo(0,0)
        this.selected = tabText
        this.$router.push('/cityList/'+tabText+'?currentType='+this.$route.query.currentType)
      },
      chooseArea(){
        Bus.$emit('msg','打开选择机构弹框');
      },
      goBack(){//返回
        //根据currentType判断返回到入口页面
        this.$router.push('/achievement/'+this.$route.query.currentType);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './index.styl';
.lplc_content
  position fixed
  width 100%
  top 0px
  z-index 2
.jt_center
  text-align:center
  font-size: 20px
  color: #FFFFFF
  line-height:30px
  height:30px
  span
    color:#fff
    font-size: 18px
  img
    width:20px
    vertical-align: text-top
.jt_left
  position:absolute
  left:21px
.jt_left img
  width:25px
.jinfu_title
  position:relative
  width 100%
  height 40px
  line-height 40px
  iphonefixpadding(20px)
  text-align center
  background-image url("../../assets/images/zhanbaotitle.png")
  background-repeat no-repeat
  background-size 100% 100%

</style>
