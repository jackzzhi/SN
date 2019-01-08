<template>
    <div class="today_item">
      <!--<div class="item_wrap"  v-show="isOpen">-->
        <!--<img v-if="cartindex===0" class="cart" src="../assets/images/fense.png"/>-->
        <!--<img v-if="cartindex===1" class="cart" src="../assets/images/lvse.png"/>-->
        <!--<img v-if="cartindex===2" class="cart" src="../assets/images/zise.png"/>-->
        <!--<img v-if="cartindex===3" class="cart" src="../assets/images/chengse.png"/>-->
        <!--<div class="item_top">-->
          <!--<span>{{financialData.list[0].name}}</span>-->
          <!--<img src="../assets/images/blackup.png" @click="open"/>-->
        <!--</div>-->
        <!--<div class="item_bottom">-->
          <!--<span class="num">{{financialData.list[0].value | numToThousands}}</span>-->
          <!--<div class="zengfu">-->
            <!--<img v-show="chaList[0].type!==0" :src="chaList[0].type==1?require('../assets/images/redup.png'):require('../assets/images/greenjiantou.png')"/>-->
            <!--<span>{{chaList[0].cha}}</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <ul v-show="isOpen">
        <li  v-for="(item,index) in financialData.list" :style ="chooseCard(index,item)">
          <img v-if="index===0&&cartindex==0" class="cart" src="../assets/images/fense.png"/>
          <img v-if="index===0&&cartindex==1" class="cart" src="../assets/images/lvse.png"/>
          <img v-if="index===0&&cartindex==2" class="cart" src="../assets/images/zise.png"/>
          <img v-if="index===0&&cartindex==3" class="cart" src="../assets/images/chengse.png"/>
          <div class="item_top" :class="index===0?'item_top_two':''" >
            <span :class="index===0?'text_one':''">{{item.name}}<span class="yuan">（{{item.unit}}）</span></span>
            <!--<img v-show="index===0" @click="open" src="../assets/images/shouqi1.png"/>-->
          </div>
          <div class="item_bottom">
            <span class="num">{{item.value | numToThousands}}</span>
            <div class="zengfu">
              <img  v-show="chaList[index].type!==0" :src="chaList[index].type==1?require('../assets/images/redup.png'):require('../assets/images/greenjiantou.png')"/>
              <span v-show="chaList[index].type!==0" :class="chaList[index].type==1?'redText':'greenText'">{{chaList[index].cha}}</span>
              <span v-show="chaList[index].type==0">{{chaList[index].cha}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  export default {
    props:{
      financialData:{
        required:true
      },
      cartindex:Number,
      chaList:Array
    },
    data(){
      return{
        isOpen:true,
        iconArr:[
          {backgroundImage: "url(" + require("../assets/images/card1.png") + ")"},
          {backgroundImage: "url(" + require("../assets/images/card2.png") + ")"},
          {backgroundImage: "url(" + require("../assets/images/card3.png") + ")"},
          {backgroundImage: "url(" + require("../assets/images/card4.png") + ")"},
          {backgroundImage: "url(" + require("../assets/images/homezd.png") + ")"}
         ]
       }
    },
    mounted(){

    },
    methods:{
      open(){
        this.isOpen=!this.isOpen
      },
      chooseCard(index,item){
        if(index===0){
          if(this.financialData.list.length==1){
            return this.iconArr[4]
          }else {
            return this.iconArr[0]
          }
        }else if(index===1){
          if(this.financialData.list.length==2){
            return this.iconArr[3]
          }else {
            return this.iconArr[1]
          }
        }else if(index===this.financialData.list.length-1){
          return this.iconArr[3]
        }else{
          return this.iconArr[2]
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.today_item
  padding 0 8px
  background #f6f8f9
  .item_wrap
   padding-left 17px
   background-image url("../assets/images/homezd.png")
   background-size 100% 100%
   background-repeat no-repeat
   margin-top -4px
   position relative
   .cart
    position absolute
    top 5px
    left 6px
    width 4px
    height 40px
   .item_top
    padding-top 28px
    span
     font-family PingFangSC-Regular
     font-size 16px
     color #A6A6A6
    img
     width 10px
     height 10px
     float right
     padding-top 3px
     padding-right 20px
   .item_bottom:after{
      content:""
      display:block
      position:absolute
      width: 1px
      border-right:1px dashed #E6E6E6
      height:25px
      top: 15px
      left:47%
    }
   .item_bottom
     position:relative
     padding-top 16px
     padding-bottom 28px
     .num
       font-family CenturyGothic
       font-size 24px
       color #010E4F
       position:relative
     .zengfu
      float right
      padding-top 5px
      padding-right 26px
      img
       width 10px
       height 11px
      span
       font-family PingFangSC-Light
       font-size 16px
       color #010e4f
      .redText
        color #FF6666
      .greenText
        color #00CD1F
  ul
    list-style none
    margin-top -4px
    li
      background-repeat no-repeat
      background-size 100% 100%
      padding-left 17px
      position relative
      .cart
        position absolute
        top 5px
        left 6px
        width 4px
        height 40px
      .item_top
        padding-top 16px
        span
          font-family PingFangSC-Regular
          font-size 16px
          color #A6A6A6
        .text_one
          font-family PingFangSC-Regular
          font-size 16px
        img
          width 10px
          height 10px
          float right
          padding-top 3px
          padding-right 20px
      .item_top_two
        padding-top 28px
      .item_bottom
        padding-top 16px
        padding-bottom 28px
        position:relative
        .num
          font-family CenturyGothic
          font-size 24px
          color #010E4F
        .zengfu
          float right
          padding-top 5px
          padding-right 26px
          img
            width 10px
            height 11px
          span
            font-family PingFangSC-Light
            font-size 16px
            color #010e4f
          .redText
            color #FF6666
          .greenText
            color #00CD1F
      .item_bottom:after{
        content:""
        display:block
        position:absolute
        width: 1px
        border-right:1px dashed #E6E6E6
        height:25px
        top: 15px
        left:47%
      }

</style>
