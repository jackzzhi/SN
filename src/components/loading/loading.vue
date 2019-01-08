<template>
  <div class="loading-box" v-if="loadingShow">
    <div class="thickdiv"></div>
    <div class="loading">
      <lottie  id="lottie" :options="options" :height="80" :width="80" v-on:animCreated="handleAnimation"/>
    </div>
  </div>
</template>
<script>
import Lottie from 'vue-lottie';
import * as animationData from './loading.json';
/*
*悠享客loading
*/ 
import * as animationDataYxk from './loadingyxk.json';
export default {
  data(){
    return {
      defaultOptions: {animationData: animationData},
      defaultOptionsYxk:{animationData: animationDataYxk},
      animationSpeed: 1
    }
  },
  props:{
    loadingShow:{
      default:false
    }
  },
  computed:{
    options(){
      return localStorage.getItem("fromOtherApp") == 1 ? this.defaultOptionsYxk : this.defaultOptions
    }
  },
  components: {
    'lottie': Lottie
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.loading-box
    .thickdiv
      width 100vw
      height 100vh
      background #000
      position fixed
      opacity 0.3
      top 0
      left 0
      z-index 999999999999999
    .loading
      width 100px
      height 100px
      color #000
      position fixed
      top 43vh
      left 36vw
      text-align center
      z-index 9999999999999999
      border-radius 10px
      img
        width 100px
        height 100px
</style>


