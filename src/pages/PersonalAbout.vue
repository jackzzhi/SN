<template>
  <div class="personnal_wrap" >
    <blue-header title="关于"></blue-header>
    <div class="middle">
      <div class="middle-content">
        <img src="@/assets/images/guanyulogo2x.png" alt="">
        <p>司南</p>
        <!-- <i>V1.3.1</i> -->
        <i>V{{h5Version}}</i>
      </div>
      <div class="line"></div>
    </div>

    <div class="textwrap">
      <p class="jiashi">
        司南是捷越联合首款大数据商业决策支持工具，通过司南建设让管理者更直观认识数据、了解数据与使用数据，提升数据价值和数据赋能水平，让商业决策更简单、更高效。司南采用SaaS化模式建设，可以快速响应业务条线的定制化需求并且高效的进行开发和部署。通过对关键指标的监测更直观的了解业务运营情况，并对异常指标进行分析、监控和预警，及时通过多渠道进行消息推送，为您提供7*24小时数据助理服务。
      </p>
    </div>
    </div>


</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['h5Version'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .personnal_wrap
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color #f6f8f9
    margin 0
    padding 0
    .middle
     margin-top 16px
     background-color #ffffff
     text-align center
     .middle-content
       display inline-block
       margin 63px auto 0
       position relative
      img
        width 68px
        height 68px
        margin-bottom 13px
      p
        font-size 14px
        text-align center
      i
        position absolute
        right -30px
        top -10px
        font-size 10px
        color #BCC4D6
     .line
       margin-top 46px
       background-color #f6f8f9
       height 2px

    .textwrap
      padding-top 20px
      padding-bottom 20px
      width 100%
      text-align: justify;
      background-color #ffffff
      .jiashi
       font-size 14px
       color #29354D
       margin-left 29px
       margin-right 30px
       line-height 25px


</style>
