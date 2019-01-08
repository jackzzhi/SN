<template>
  <div>
    <div class="tday" v-show="showTitle">
      <span>{{pageData.title?pageData.title:''}}</span>
      <img :src="!isShowContent?require('../assets/images/xiala.png'):require('../assets/images/shangla.png')" @click="isShowContent=!isShowContent">
    </div>
    <div v-show="isShowContent" class="tday_open">
      <div class="swiper" style="height: 100%">
        <mt-swipe :showIndicators="false" :auto="0" ref="mtSwipe" :continuous="false"  @change="handleChange">
          <mt-swipe-item v-for="(item,index) in newNum" :key="index"  ref="mtItem">
            <img :src="require('../assets/images/left@2x.png')" alt="" class="arr_left" @click="prev" v-show="prevShow">
            <img :src="require('../assets/images/left@2x.png')" alt="" class="arr_right" @click="next" v-show="nextShow">
            <ul>
              <li v-for="(item2,index) in item">
                <div class="one" ref="first" v-bind:style="{width: widthData}">
                  <div v-show="showType" class="one_bottom_two">
                    <span class="jsl">{{item2.name}}</span>
                    <span class="pencil">{{item2.unit}}</span></div>
                  <div :class='showType?"one_top_two":"one_top"'>
                    <span :style="{'color':numColor}">{{item2.value | numToThousands}}</span>
                  </div>
                  <div v-show="!showType" class="one_bottom">
                    <span class="jsl">{{item2.name}}</span>
                    <span class="pencil">{{item2.unit}}</span></div>
                  <div class="line"></div>
                </div>
              </li>
            </ul>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      pageData:{
        required:true
      },
      isBlueTxt:{
        type:Boolean,
        default:false
      },
     showType:{
       type:Boolean,
       default:false
     }
    },
    data() {
      return {
        isShowContent:false,
        widthData:'3.33rem',
        newNum:[],
        numColor:'#29354D', //指标数字颜色
        totalPage:0,
        prevShow:false,
        nextShow:false,
        showTitle:false
      }
    },
    mounted(){
      //生成新的数组
      if(this.pageData.title){
        //首页-今日概况,风险-
        this.newNum = this.chunk(this.pageData.datas, 3);
        this.numColor = this.isBlueTxt ? '#4e97ff' : "#29354D"
        this.showTitle=true
      }
      else{
        //业绩
        this.newNum = this.chunk(this.pageData.datas, 3);
        this.numColor = this.isBlueTxt ? '#4e97ff' : "#29354D"
      }
      this.isShowContent=true
      this.totalPage = this.newNum.length;
      //判断如果只有一屏幕
      if(this.totalPage == 1){
        this.prevShow = false;
        this.nextShow = false;
      }else{
        this.nextShow = true;
      }
    },
    watch:{
      pageData(){
        this.switchCar(0)//数据一改变swipe选中第一页
        //生成新的数组
        if(this.pageData.datas){
          //首页-今日概况
          this.newNum = this.chunk(this.pageData.datas, 3);
          this.numColor = '#4e97ff'
        }
        else{
          //业绩
          this.newNum = this.chunk(this.pageData, 3);
        }
        this.isShowContent=true
        this.totalPage = this.newNum.length;
        //判断如果只有一屏幕
        if(this.totalPage == 1){
          this.prevShow = false;
          this.nextShow = false;
        }else{
          this.nextShow = true;
        }
      }
    },
    methods:{
      //上一屏
      prev: function () {
        this.$refs.mtSwipe.prev();
      },
      //下一屏
      next: function () {
        this.$refs.mtSwipe.next();
      },
      //获取当前的下标
      handleChange(index){
        if(index == 0){
          this.prevShow = false;
          this.nextShow = true;
        }else if(index < this.totalPage-1){
          this.prevShow = true;
          this.nextShow = true;
        }else if(index == this.totalPage-1){
          this.prevShow = true;
          this.nextShow = false;
        }
        this.carIndex = index;
      },
      chunk(arr, num){
        num = num*1 || 1;
        var ret = [];
        arr.forEach(function(item, i){
          if(i % num === 0){
            ret.push([]);
          }
          ret[ret.length - 1].push(item);
        });
        return ret;
      },
      //自定义跳转，只需要传图片的下标即可
      switchCar(index){
        if(index==this.carIndex)
        {
          console.log('break off');
          return;
        }
        var callback = () => {
          if (index !== undefined) {
            var newPage = this.$refs.mtItem[index].$el;
            newPage.classList.add("is-active");
            curPage.$el.classList.remove("is-active");
            this.$refs.mtSwipe.index = index;
          }
          if (this.$refs.mtSwipe.isDone) {
            this.$refs.mtSwipe.end();
          }
          if (prevPage) {
            prevPage.$el.style.display = '';
          }
          if (nextPage) {
            nextPage.$el.style.display = '';
          }
        };
        if(index>this.carIndex) {
          var curPage = this.$refs.mtItem[this.carIndex];
          var nextPage = this.$refs.mtItem[index];
          var pageWidth= this.$refs.mtItem[0].$el.clientWidth;
          if (nextPage) {
            nextPage.$el.style.display = 'block';
            this.$refs.mtSwipe.translate(nextPage.$el, pageWidth);
          }
          // console.log(this.$refs.mtSwipe.isDone);
          this.$refs.mtSwipe.isDone = true;
          this.$refs.mtSwipe.before(curPage.$el);

          this.$refs.mtSwipe.translate(curPage.$el, -pageWidth, 100, callback);
          if (nextPage) {
            var self =this;
            var timer = setTimeout(function(){
              self.$refs.mtSwipe.translate(nextPage.$el, 0, 100);
              clearTimeout(timer);
            },50)

          }
        }else if(index<this.carIndex){
          var curPage = this.$refs.mtItem[this.carIndex];
          var prevPage = this.$refs.mtItem[index];
          var pageWidth= this.$refs.mtItem[0].$el.clientWidth;

          if (prevPage) {
            prevPage.$el.style.display = 'block';
            this.$refs.mtSwipe.translate(prevPage.$el, -pageWidth);
          }
          this.$refs.mtSwipe.isDone = true;
          this.$refs.mtSwipe.before(curPage.$el);
          this.$refs.mtSwipe.translate(curPage.$el, pageWidth, 100, callback);
          if (prevPage) {
            this.$refs.mtSwipe.translate(prevPage.$el, 0, 100);
          }
        }
      }

    }

  }

</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  .arr_left
    width:25px
    position :absolute
    left: 10px
    top:38%
    z-index:1
  .arr_right
    width:25px
    position: absolute
    top:38%
    right:10px
    transform:rotate(180deg)
    z-index:1
  .tday
    width 100%
    height 54px
    margin-top 16px
    line-height 54px
    background-color #FFFFFF
    border-bottom 1px solid  #F1F3F8
    span
      font-family PingFangSC-Medium
      font-size 18px
      color #29354D
      margin-left 19px
      letter-spacing 0
    img
      width 28px
      height 28px
      margin-top 14px
      float right
      margin-right 20px
  .tday_open
    width 100%
    height 95px
    background-color #FFFFFF
    white-space: nowrap
    overflow hidden
    -webkit-overflow-scrolling touch
    ul
      font-size 0
      margin 0
      padding 0
      height 95px
      -webkit-overflow-scrolling touch
      li
        float left
        .one
          width 3.33rem
          text-align center
          position relative
          height 96px
          .one_bottom_two
            padding-top 20px
            .jsl
              font-family PingFangSC-Light
              font-size 14px
              color #29354D
              letter-spacing 0
              text-align center
            .pencil
              font-family PingFangSC-Light
              font-size 10px
              color #909090
              letter-spacing 0
              margin-left 4px
          .one_top_two
            padding-top 10px
            span
              font-family DINCondensed-Bold
              font-size 38px
          .one_top
            padding-top 22px
            span
              font-family DINCondensed-Bold
              font-size 38px
          .one_bottom
           padding-top 8px
            .jsl
              ont-family PingFangSC-Light
              font-size 14px
              color #29354D
              letter-spacing 0
              text-align center
            .pencil
              font-family PingFangSC-Light
              font-size 10px
              color #909090
              letter-spacing 0
              margin-left 4px
          .line
            width 1px
            position absolute
            right 0px
            top 25px
            bottom 16px
            background #F1F3F8
      li:nth-child(3n+0)
        .line
          background transparent
</style>
