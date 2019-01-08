<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="div1">
          <div class="container">
            <img class="logo" src="@/assets/images/guidepage/page_icon1.png" ref="images1"/>
            <span class="sp1">管理及分析的多样性</span>
            <span class="sp2">支持多类用户群及主题分析</span>
            <img class="p1" src="@/assets/images/guidepage/p1.png"/>
          </div>
        </div>
      </div>
      <div class="swiper-slide">
        <div class="div2">
          <div class="container">
            <img class="logo" src="../assets/images/guidepage/page_icon2.png" ref="images2"/>
            <span class="sp1">数据关系探查及分析</span>
            <span class="sp2">支持数据间关系探查和钻取分析</span>
            <img class="p1" src="@/assets/images/guidepage/p2.png"/>
          </div>
      </div>
   </div>
      <div class="swiper-slide">
       <div class="div3">
         <div class="container">
           <img class="logo" src="@/assets/images/guidepage/page_icon3.png" ref="images3"/>
            <span class="sp1">一站式（One-Stop）决策支持</span>
            <span class="sp2">支持多样图表展示及KPI预警消息推送</span>
            <div class="bottom">
              <img class="p2" src="@/assets/images/guidepage/p3.png"/>
              <span class="p3"  @click="goto()">立即体验</span>
            </div>
         </div>
       </div>
   </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'

export default {
  created(){
    // 顶部状态栏展示颜色参数说明：type：“0”标识黑色；“1”标识白色
    if(window.webkit){
      window.webkit.messageHandlers.changeStatusBarColor.postMessage({type:'0'})
    }
    if(window.messageHandlers){
      window.messageHandlers.changeStatusBarColor("0")
    }
  },
  mounted(){
    var mySwiper = new Swiper('.swiper-container', {
      resistanceRatio : 0
    })
    this.$nextTick(()=>{
      setTimeout(()=>{
        // 告诉原生，我的页面加载完成，可以关闭你的启动页面了;首次启动APP，延迟启动页面展示关闭启动页交互：
        if (window.webkit) {
          window.webkit.messageHandlers.removePromptView.postMessage({ type: '1' })
        }
        if (window.messageHandlers) {
          window.messageHandlers.closeStart('close')
        }
        if (localStorage.getItem('changing') !== '1') {
          // 原生过渡层消失
          if (window.webkit) {
            // “1”标识显示原生加载页面  “2”是移除原生加载页面
            window.webkit.messageHandlers.showOrCloseLoadingView.postMessage({
              type: '2'
            })
          }
          if (window.messageHandlers) {
            window.messageHandlers.stopLoading('stop')
          }
        }
      },1000)
    })
  },
  methods: {
    goto(){
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .swiper-container
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    height 100vh
    width 100vw
    background-color #ffffff
    .div1
      background #55B8EB
      width 100vw
      height 100vh
      text-align center
    .div2
      background #FFB43F
      width 100vw
      text-align center
      height 100vh
    .div3
      background #6588F2
      width 100vw
      height 100vh
      text-align center
    .sp1
      margin-top 100px
      display block
      font-size 18px
      color white
      font-family: PingFangSC-Medium;
    .sp2
      margin-top 10px
      display block
      font-size 14px
      color white
      font-family: PingFangSC-Regular;
    .p1
      display block
      width 45px
      height 12px
      margin 90px auto 0
    .container
      position absolute
      left 50%
      top 50%
      transform translate(-50%,-50%)
    .p2
      margin-top 24.2px
    .p3
      margin-left auto
      margin-right auto
      display block
      margin-top 20.2px
      width 200px
      height 40px
      background transparent
      border 1px solid #FFFFFF
      color white
      font-family PingFangSC-Light
      font-size 15px
      line-height 40px
      border-radius 100px
    .logo
      width 100vw
      height  277px
      position:relative;
      animation-name:myfirst;
      animation-duration:1.5s;
      animation-timing-function:linear;
      animation-iteration-count:infinite;
      animation-direction:alternate;
      @keyframes myfirst
        0%   {left:0px; top:0px;}
        25%  {left:0px; top:10px;}
        50%  {left:0px; top:20px;}
        75%  {left:0px; top:10px;}
        100%  {left:0px; top:0px;}

</style>

