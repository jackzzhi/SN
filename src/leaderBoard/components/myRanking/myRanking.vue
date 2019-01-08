<template>
    <div class="box" @click="goPosition">
      <img src="../../assets/images/sortName.png" alt="" class="img_mine">
      <img src="../../assets/images/mineSortName.png" alt="" class="img_text">
      <span>{{ranking}}</span>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data(){
      return{

      }
    },
    props:{
      ranking:String,
      rankingTop:Number,
      rankingStatus:Boolean//是否为第一屏
    },
    mounted(){
    },
    components:{

    },
    methods:{
      goPosition(){
        if(this.rankingStatus){
          scrollTo(0,this.rankingTop)
        }
      }
    }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../assets/stylus/methods.styl"
.box
  position fixed
  bottom 0px
  left 0px
  width 100%
  padding-top 16px
  padding-left 0
  padding-right 0
  iphonefixpaddingb(16px)
  background #FFF9E6
  text-align center
  .img_mine
    width 23px
  .img_text
    width 72px
  span
    color #FF6666
    width 44px
    height 16px
    background #fff
    border 1px solid #FF6666
    border-radius 10px
    vertical-align bottom
    margin 0 0 0 5px
    font-size 16px
    line-height 17.5px
    display inline-block
</style>
