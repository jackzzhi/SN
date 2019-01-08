<template>
  <div class="performance-box">
    <div v-show="fixedHeader" class="fixed-header">
      <common-header :newsShow='false'></common-header>
      <tabs :selected='selected'></tabs>
      <!-- <mt-navbar v-model="selected" class="tab">
          <mt-tab-item v-for="(tab,index) in datas" :key='"tabs"+index' :id="tabsTxt[index]" @click="toggleTabs(tabsTxt[index]);">
            <span class="tab-name">{{tab}}</span>
            <span class="selected_line"></span>
          </mt-tab-item>
      </mt-navbar> -->
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import tabs from './components/tabs'

  export default {
    data () {
      return {
        selected:'fox',
        // datas:JSON.parse(localStorage.getItem('performanceTabsName')),
        // tabsTxt:['fox','prince','rose','loan'],
        fixedHeader:true
      }
    },
    components:{
      tabs
    },
    created() {
      this.saveFooterCurrent(1)
    },
    activated(){
      if(this.$route.path == '/home/performance/prince'){
        this.selected = 'prince'
      }
      else if(this.$route.path == '/home/performance/rose'){
        this.selected = 'rose'
      }
      else if(this.$route.path == '/home/performance/loan'){
        this.selected = 'loan'
      }
      else{
        this.selected = 'fox'
      }
      this.$commonApi.collection({modelNo: 'Subject_2'}) //埋点
    },
    // watch:{
    //   selected(){
    //     this.toggleTabs(this.selected)
    //   }
    // },
    methods : {
      ...mapActions(['saveFooterCurrent']),
      // toggleTabs(tabText) {
      //   window.scrollTo(0,0)
      //   this.selected = tabText
      //   setTimeout(()=>{
      //     this.$router.push('/home/performance/'+tabText)
      //   },0)
      // }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .performance-box
    .fixed-header
      position fixed
      top 0
      left 0
      z-index 999999999999
      width 100%
      background #f6f8f9
    .fixed-ios-header
      position -webkit-sticky
      position sticky
      top 0
      left 0
      z-index 999999999999
      width 100%
      background #f6f8f9 
</style>
