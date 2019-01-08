<template>
  <div class="userWarp">
    <huaxiangHead :type="type"></huaxiangHead>
    <router-view @count="count"></router-view>
    <choose-area></choose-area>
    <!--<footer-guide v-show="$route.meta.showFooter"></footer-guide>-->
  </div>
</template>

<script>
  import huaxiangHead from '../components/header/huaxiangHead'
  import footerGuide from '@/components/footer/footerGuide'
  import chooseArea from '../components/chooseArea'

  export default {
    data () {
      return {
        type: location.href.split('/').pop() === 'fenXi' ? 1 : 0
      }
    },
    mounted() {
      this.$commonApi.collection({modelNo: 'Subject_9'}) //埋点
    },
    components: {
      footerGuide,
      chooseArea,
      huaxiangHead
    },
    methods: {
      count (value) {
        this.type = value
      }
    }
  }
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped>
</style>
