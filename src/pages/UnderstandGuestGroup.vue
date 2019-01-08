<template>
  <div class="guest_group_wrap" >
    <white-header title="了解客群分析"></white-header>
    <div class="wrap_explain">
      <p>根据客群放款率和逾期率，通过挖掘算法，对普惠客群不同特征进行组合分析，识别出转化倾向高、逾期风险低的客群特征，辅助决策。</p>
    </div>
    <div class="quota_explain">指标说明</div>
    <div class="quota_list" v-for="(item, i) in listData" :key="i" @click="showQuotaCont(i)">
      <div class="li_name">
        <span>{{item.name}}</span>
        <img :src="isShowCont === i ? imgUp : imgDown"/>
      </div>
      <div class="li_cont" v-show="isShowCont === i">
        <div class="title">{{item.title}}</div>
        <div class="cont" v-if="item.cont">
          <img :src="imgLight"/>
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
    data(){
      return {
        imgDown: arrowDown,
        imgUp: arrowUp,
        imgLight: light,
        showNum: null,
        isShowCont: 0,
        listData: [{
          name: '进件数',
          title: '该机构（门店|分部|大区|全国）截止目前全部进件数。',
          cont: ''
        }, {
          name: '放款数',
          title: '该机构（门店|分部|大区|全国）截止目前全部放款进件数。',
          cont: ''
        }, {
          name: 'M3逾期数',
          title: '该机构（门店|分部|大区|全国）截止一年前放款、当前M3逾期的进件数。',
          cont: ''
        }, {
          name: '平均放款率',
          title: '放款数/进件数。',
          cont: ''
        }, {
          name: '平均逾期率',
          title: 'M3逾期数/一年前放款数。',
          cont: '针对逾期分析，需要一年观察期，故锁定一年前放款客户。'
        }, {
          name: '放款率分析',
          title: '对客群不同特征进行自由组合，形成细分客群，对其放款率与平均放款率进行比较，提炼出放款率最高和最低的客群及特征，进行图表展示，其中高于放款率客群为优质客群，低于放款率客群为一般客群。',
          cont: ''
        }, {
          name: '逾期率分析',
          title: '对客群不同特征进行自由组合，形成细分客群，对其M3逾期率与平均M3逾期率进行比较，提炼出逾期率最高和最低的客群及特征，进行图表展示，其中高于逾期率客群为高风险客群，低于逾期率客群为低风险客群。',
          cont: '针对部分机构，由于特征区分不明显或样本量过少，可能没有数据，针对细分客群，最多是4个，每个客群的组合特征最多是3个。'
        }]
      }
    },
    methods: {
      showQuotaCont (index) {
        // this.isShowCont.splice(index, 1, !this.isShowCont[index])
        // this.isShowCont = [false, false, false, false, false, false, false]
        // this.$set(this.isShowCont, index, !this.isShowCont[index])
        if (index === this.isShowCont) {
          this.isShowCont = null
        } else {
          this.isShowCont = index
        }
        // this.isShowCont = index
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .guest_group_wrap
    background-color #f6f8f9
    margin 0
    padding 0
    padding-bottom 50px
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
          width: 19px
          height: 20px
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
          padding-right 22px
        .cont
          margin-top 10px
          line-height 20px
          position relative
          color #29354D
          padding-left 22px
          padding-right 41px
          img
            position absolute
            left 0
            top 0
            width 20px
            height 19px
</style>
