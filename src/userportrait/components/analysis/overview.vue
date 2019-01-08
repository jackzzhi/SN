<!--  -->
<template>
  <div class="overvie_box">
    <div class="cont" v-for="(item, index) in data.datas" :key="index">
      <div class="cont_box">
        <span class="cont_number" :style="{'color': item.color}">{{item.value}}</span>
        <div ref="contDes" class="cont_des">
          <span ref="contType">{{item.name}}</span>
          <span ref="contUnit">{{item.unit}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  props: ['data'],
  methods: {},
  mounted () {
    this.$refs.contUnit.forEach((item, i) => {
      this.$refs.contDes[i].style.marginRight = item.clientWidth / 2 * (-1) + 'px'
    })
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .overvie_box
    background #fff
    border-radius 4px
    padding 35px 0 24px 0
    margin-bottom 9px
    display flex
    & > div
      height 54px
      position relative
      .cont_box
        height 100%
        width 100%
        display flex
        flex-direction column
        justify-content space-between
        align-items center
        position absolute
        top -6px
        .cont_number
          font-size 38px
          font-family DINCondensed-Bold
        .cont_des
          font-size 0
          font-family PingFangSC-Light
          span
            display inline-block
          span:nth-child(1)
            font-size 14px
            color #29354D
            margin-right 3px
          span:nth-child(2)
            font-size 20px
            -webkit-transform-origin-x 0
            -webkit-transform-origin-y 15px
            transform scale(0.5)
            color #909090
    & > div
      flex 1
    & > div:nth-child(2)
      width 40%
      border-left 1px solid #F1F3F8 
      border-right 1px solid #F1F3F8 
</style>
