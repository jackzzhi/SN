<template>
  <mt-navbar v-model="selectedName" class="tab">
    <mt-tab-item v-for="(tab,index) in datas" :key='"tabs"+index' :id="tabsTxt[index]">
      <div @click="toggleTabs(tabsTxt[index])">
        <span class="tab-name">{{tab}}</span>
        <span class="selected_line"></span>
      </div>
    </mt-tab-item>
  </mt-navbar>
</template>
<script>
  export default {
    data () {
      return {
        selectedName:'fox',
        datas:JSON.parse(localStorage.getItem('performanceTabsName')),
        tabsTxt:['fox','prince','rose','loan']
      }
    },
    props:{
      selected:{
        type:String
      }
    },
    watch:{
      selected(val){
        this.toggleTabs(val)
      }
    },
    methods : {
      toggleTabs(tabText) {
        window.scrollTo(0,0)
        this.selectedName = tabText
        setTimeout(()=>{
          this.$router.push('/home/performance/'+tabText)
        },0)
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.tab
  width 100%
  height 44px
  margin-top 10px
  background-color #FFFFFF
  border-bottom 1px solid #F1F3F8
  position relative
  z-index 9

  .tab-name
    font-size 16px
    color #909090

.mint-navbar .mint-tab-item.is-selected
  border none
  position relative

  .tab-name
    color #29354D

  .selected_line
    display inline-block
    width 18px
    height 0
    border-bottom 2px solid #4E97FF
    position absolute
    bottom 3px
    left 50%
    margin-left -9px
</style>

