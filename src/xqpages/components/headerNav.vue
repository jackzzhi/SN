<template>
  <div>
    <div class="tab-box"></div>
    <div class="tab" :class="{'fixed-head':fixedHead,'fixedBg':fixedHeadShow && fixedHead}">
      <div class="tab-item" v-show='(fixedHeadShow && fixedHead) || (!fixedHeadShow && !fixedHead)' v-for="(item,index) in tabs" :key="item.id" @click="toTabPage(index)">
        <span :class="{'active':index == activeId}">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tabs: [],
      fixedHeadShow: true,
      msiteTabsUrl:[
        '/timebattle/index/today',
        '/timebattle/index/month',
        '/timebattle/index/history'
      ],
      achievementTabsUrl:[
        '/achievement/today',
        '/achievement/month'
      ]
    }
  },
  props: {
    activeId: {
      default: 0
    },
    type: {
      default: 1
    },
    fixedHead: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['timeBattleHomeNavs','timeBattleKPINavs'])
  },
  created() {
    if (this.type == 1) {
      this.timeBattleHomeNavs.forEach((item,index) => {
        this.tabs.push({
          id:item.id,
          name:item.name,
          path:this.msiteTabsUrl[index]
        })
      })
    } else {
      this.timeBattleKPINavs.forEach((item,index) => {
        this.tabs.push({
          id:item.id,
          name:item.name,
          path:this.achievementTabsUrl[index]
        })
      })
    }
  },
  methods: {
    getActiveNavId(){
      return this.tabs[this.activeId].id
    },
    toTabPage(index) {
      window.scroll(0, 0)
      this.$router.push(this.tabs[index].path)
    },
    addListener() {
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('touchmove', this.handleScroll)
    },
    removeListener() {
      window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('touchmove', this.handleScroll)
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop

      if (scrollTop <= 2) {
        this.fixedHeadShow = false
      } else {
        this.fixedHeadShow = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/methods'
.tab-box
  width 100vw
  height 40px
  background transparent
  overflow hidden
.tab
  width 100vw
  height 40px
  line-height 40px
  background transparent
  overflow hidden
  display flex
  align-items center
  justify-content center
  z-index 9
  background-image url('../assets/images/bj2.png')
  background-repeat no-repeat
  background-size 100% 100%

  .tab-item
    float left
    margin-left 44px

    span
      font-size 16px
      color #D0ECFF
      padding-bottom 2px
      font-family PingFangSC-Regular

    .active
      padding-bottom 2px
      font-family PingFangSC-Semibold
      border-bottom 2px solid #fff
      color #fff

  .tab-item:nth-child(1)
    margin-left 0px

.tab.fixed-head
  position fixed
  iphonefixtop(68px)
  z-index -1

.tab.fixedBg
  background-image url('../assets/images/bj2.png')
  background-repeat no-repeat
  background-size 100% 100%
  z-index 10
</style>

