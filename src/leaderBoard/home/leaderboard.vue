<template>
  <div class="leaderBoardContent">
    <div class="msite_head">
      <div class="msite_top">
        <img src="../../assets/images/backnew.png" class="jiantou" @click="goBack">
        <span>{{rankDetailsDataTitleName}}</span>
      </div>
      <div class="tab_box">
        <mt-navbar v-model="selected" class="tab">
          <mt-tab-item v-for="(tab,index) in dataName" :key='"tabs"+index' :id="tabsTxt[index]" @click="toggleTabs(tabsTxt[index]);">
            <span class="tab-name">{{tab}}</span>
            <span class="selected_line" v-if="dataName.length==2" :class="dataName.length == 2 ? 'selected_line_two':''"></span>
            <span class="selected_line" v-if="dataName.length==1" :class="dataName.length == 1 ? 'selected_line_one':''"></span>
            <span class="selected_line" v-if="dataName.length>2"></span>
          </mt-tab-item>
        </mt-navbar>
      </div>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selected: "nationalStore",
      dataName: [],
      dataId: [],
      tabsTxt: ["nationalStore", "nationalDivision", "regionalStore"],
      rankDetailsDataTitleName:localStorage.getItem('rankDetailsDataTitleName')
    };
  },
  created() {
    var arrName = [],
    arrId = [];
    JSON.parse(localStorage.getItem('rankDetailsData')).forEach((item,index)=>{
      arrName.push(item.name);
      arrId.push(item.id);
    })
    this.dataName = arrName;
    this.dataId = arrId;
    localStorage.setItem('rankDetailsDataId',JSON.stringify(arrId))
  },
  components: {},
  activated() {
    // 顶部状态栏展示颜色参数说明：type：“0”标识黑色；“1”标识白色
    if (window.webkit) {
      window.webkit.messageHandlers.changeStatusBarColor.postMessage({
        type: "0"
      });
    }
    if (window.messageHandlers) {
      window.messageHandlers.changeStatusBarColor("0");
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.push("/leaderBoard/ranklist");
    },
    toggleTabs(tabText) {
      window.scrollTo(0, 0);
      this.selected = tabText;
      setTimeout(() => {
        this.$router.push("/leaderBoard/" + tabText);
      }, 0);
    }
  },
  computed: {
    ...mapGetters(["deviceinfo"])
  },
  watch: {
    selected() {
      this.toggleTabs(this.selected);
    }
  }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../assets/stylus/methods.styl"
.tab_box
  overflow hidden
  background #F6F8F9
.msite_head {
  width 100%
  height 34px
  iphonefixpadding(30px)
  text-align center
  position fixed
  z-index 100
  background #4E97FF

  .msite_top {
    color #ffffff
    font-size 18px
    padding 0 0 15px 0
    text-align center
    font-family PingFangSC-Semibold
  }
  .msite_top span {
    font-family PingFangSC-Semibold
    font-size 18px
  }

  .jiantou {
    position absolute
    left 0px
    padding-left 10px
    margin-top -2px
    width 20px
    height 20px
  }
}



.tab {
  width 100%
  height 44px
  margin-top 10px
  background-color #FFFFFF
  border-bottom 1px solid #F1F3F8
  position relative
  z-index 9

  .tab-name {
    font-size 16px
    color #909090
  }
}

.mint-navbar .mint-tab-item.is-selected {
  border none
  position relative

  .tab-name {
    color #29354D
    font-family PingFangSC-Semibold
  }

  .selected_line {
    display inline-block
    width 63px
    height 0
    border-bottom 2px solid #4E97FF
    position absolute
    bottom 3px
    left 40px
    margin-left -9px
  }
  .selected_line_two{
    left: 72px
  }
  .selected_line_one{
    left: 164px
  }
}

.fixed-header {
  position fixed
  top 0
  left 0
  z-index 999999999999
  width 100%
  background #f6f8f9
}

.fixed-ios-header {
  position -webkit-sticky
  position sticky
  top 0
  left 0
  z-index 999999999999
  width 100%
  background #f6f8f9
}
</style>
