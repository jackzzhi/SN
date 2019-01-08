<template>
  <div class="guest_group_wrap">
    <white-header title="了解向前金服实时战报"></white-header>
    <!-- <div class="wrap_explain">
      <p>通过挖掘算法，针对普惠客群不同特征进行足有组合，结合客群放款率和逾期率进行分析，识别出转化倾向高、逾期风险低的客群特征，辅助决策。</p>
    </div> -->
    <div class="quota_explain">指标说明</div>
    <div class="quota_list" v-for="(item, i) in listData" :key="i" @click="showQuotaCont(i)">
      <div class="li_name" v-if="item.children">
        <span>{{item.children[0].name}}</span>
        <img v-if="item.children[0].name" :src="isShowCont[i] ? imgDown : imgUp" />
      </div>

      <div class="li_name" v-else>
        <span>{{item.name}}</span>
        <img :src="isShowCont[i] ? imgDown : imgUp" />
      </div>

      <div class="li_cont" v-show="isShowCont[i]" v-if="item.children.length>0" v-for="(items,index) in item.children" :key="index">
        <div class="title">{{items.title}}</div>
        <div class="cont">
          <img :src="imgLight" />
          <p>{{items.cont}}</p>
        </div>
      </div>
      <div class="li_cont" v-show="isShowCont[i]" v-if="item.children== undefined">
        <div class="title">{{item.title}}</div>
        <div class="cont">
          <img :src="imgLight" />
          <p>{{item.cont}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import arrowDown from '@/assets/images/arrow_down.png'
import arrowUp from '@/assets/images/arrow_up.png'
import light from '@/assets/images/light.png'
export default {
  data() {
    return {
      imgDown: arrowDown,
      imgUp: arrowUp,
      imgLight: light,
      showNum: null,
      isShowCont: [false, false, false, false, false, false, false],
      listData: [
        {
          name: '出借金额',
          title: '',
          cont: '统计期内成功出借的金额'
        },
        {
          name: '申请转让金额',
          title: '',
          cont: '统计期内出借用户申请转让的金额（含紧急转让）'
        },
        {
          name: '实际转让金额',
          title: '',
          cont: '统计期内出借用户实际转让成功金额（含紧急转让）'
        },
        {
          name: '累计转让排队金额',
          title: '',
          cont: '统计期内申请转让尚未成功转让的出借金额'
        },
        {
          name: '累计出借排队金额',
          title: '',
          cont: '统计期内成功出借尚未撮合债权的金额'
        },
        {
          name: '累计到期未申请转让金额',
          title: '',
          cont: '统计期内出借已到期但并未申请转让的金额'
        }
      ]
    }
  },
  methods: {
    showQuotaCont(index) {
      // this.isShowCont.splice(index, 1, !this.isShowCont[index])
      this.$set(this.isShowCont, index, !this.isShowCont[index])
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.guest_group_wrap
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background-color #f6f8f9
  margin 0
  padding 0
  font-family PingFangSC-Regular

  .wrap_explain
    padding 14px 20px
    background #fff
    margin-bottom 11px

    p
      font-size 16px
      color #29354D
      letter-spacing 0
      line-height 22px

  .quota_explain
    font-size 16px
    color #6E757F
    letter-spacing 0.62px
    line-height 24px
    padding-left 20px
    margin-bottom 10px

  .quota_list
    .li_name
      height 52px
      border-bottom 1px solid #F1F3F8
      background #fff
      padding-left 20px
      font-size 16px
      color #29354D
      letter-spacing 0
      line-height 52px
      position relative

      img
        position absolute
        top 18px
        right 20px
        width 25px

    .li_cont
      padding-left 20px
      font-size 14px
      color #6E757F
      padding-top 15px
      padding-bottom 11px
      background #fff
      border-bottom 1px solid #F1F3F8

      .title
        line-height 21px

      .cont
        line-height 20px
        position relative
        color #29354D
        padding-left 22px

        img
          position absolute
          left 0
          top 0
          width 17px
</style>
