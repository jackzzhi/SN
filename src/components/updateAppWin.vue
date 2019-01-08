<template>
  <div class="update-app-win" v-show='update'>
    <div class="thickdiv"></div>
    <div class="main-box">
      <div class="top">
        <div class="top-txt">
          <p>发现新版本</p>
          <p>{{newVersion}}</p>
        </div>
        <img src="../assets/images/update.png">
      </div>
      <div class="main" @touchmove.stop>
        <div class="content" v-html="updateData.updateContent" @touchmove.stop></div>
        <div class="buttons-box">
          <button v-if='mustUpdate' type="button" class="long-blue" @click="updateApp">立即升级</button>
          <div v-else class="dubble-btns">
            <button type="button" class="line-btn" @click="closeUpdateWin">以后再说</button>
            <button type="button" class="blue-btn" @click="updateApp">立即升级</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    update:{
      type:Boolean,
      default:false
    },
    mustUpdate:{
     type:Boolean,
     default:false 
    },
    updateData:{
      type:Object,
      required:true
    },
    newVersion:{
      type:String,
      required:true
    }
  },
  watch:{
    update(val){
      if(val){
        document.body.style.position = 'fixed'
        document.body.style.overflow = 'hidden'
      }
      else{
        document.body.style.position = 'absolute'
        document.body.style.overflow = 'auto'
      }
    }
  },
  methods:{
    updateApp(){
      //调用原生方法
      if(this.updateData.sysType == '1' && window.webkit){
        window.webkit.messageHandlers.appUpdate.postMessage({updateUrl:this.updateData.downloadUrl})
      }
      if(this.updateData.sysType == '2' && window.messageHandlers){
        window.messageHandlers.appUpdate(this.updateData.downloadUrl)
      }
    },
    closeUpdateWin(){
      this.$emit('closeUpdateWin')
    }
  }
}
</script>
<style lang="stylus" scoped>
.update-app-win
  width 100vw
  height 100vh
  position fixed
  top 0
  left 0
  z-index 999999999999999
  .thickdiv
    width 100vw
    height 100vh
    background rgba(0,0,0,.3)
  .main-box
    width 286px
    min-height 310px
    position absolute
    left 50%
    top 50%
    transform translate(-50%,-50%)
    .top
      position relative
      img 
        width 286px
        height 137px
        vertical-align bottom
      .top-txt
        font-size 20px
        color #E7F3FF
        line-height 24px
        position absolute
        top 46px
        left 15px
    .main
      position relative
      top -5px
      background #fff
      padding  5px 15px 15px
      border-bottom-left-radius 7px
      border-bottom-right-radius 7px
      .content
        color #656E7B
        font-size 14px
        line-height 28px
        max-height 140px
        overflow-y auto
        word-break break-all
        word-wrap break-word
        -webkit-overflow-scrolling: touch
      .buttons-box
        padding-top 10px
        .long-blue
          width 100%
          height 44px
          background #4E97FF
          font-family PingFangSC-Medium
          font-size 18px
          color #fff
          border-radius 100px
        .dubble-btns
          display flex
          justify-content space-between
          padding-left 10px
          padding-right 10px
          .line-btn
            width 108px
            height 44px
            border 1px solid #4E97FF
            font-family PingFangSC-Medium
            font-size 18px
            color #4E97FF
            border-radius 100px
            background #fff
          .blue-btn
            width 110px
            height 44px
            background #4E97FF
            font-family PingFangSC-Medium
            font-size 18px
            color #fff
            border-radius 100px
</style>


