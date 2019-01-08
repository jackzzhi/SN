<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <choose-area></choose-area>
    <footer-guide v-if='needShow' v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>

<script>
  import footerGuide from '../components/footer/footerGuide'
  import chooseArea from '../components/chooseArea'
  export default {
    components:{
      footerGuide,
      chooseArea
    },
    data() {
      return {
        needShow:true
      };
    },
    created(){
      if(localStorage.getItem("fromOtherApp") == 1){ //来自行销（优享客）时不显示footer
        this.needShow=false
      }
      else{
        this.needShow=true
      }
    }
  };
</script>
