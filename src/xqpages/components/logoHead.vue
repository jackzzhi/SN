<template>
  <div class="jinfu_title">
    <div class="center">
      <div class="left" @click="news()">
        <img class="msg_left" src="../assets/images/mesage.png" />
        <div class="dian" v-show="newsUnreadTotal>0"></div>
      </div>
      <img class="title_zb" src="../assets/images/zbtitle.png" />
      <div class="right" @click="toHelpPage()" v-show="rightHelp">
        <img class="msg_right" src="../assets/images/help.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      newsUnreadTotal: 0
    }
  },
  props: {
    rightHelp: Boolean
  },
  computed: {
    ...mapGetters(['userid'])
  },
  activated() {
    this.getNewsUnreadTotal()
    this.newsTimer = setInterval(() => {
      this.getNewsUnreadTotal()
    }, 3000)
  },
  deactivated() {
    clearInterval(this.newsTimer)
  },
  methods: {
    //获得未读消息数量
    getNewsUnreadTotal() {
      this.$ajax({
        method: 'get',
        url: '/mc-message/message/unread' + '/' + this.userid,
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      })
        .then(res => {
          if (res.data.code == 200) {
            if (!res.data.data) return
            this.newsUnreadTotal = res.data.data.total || 0
          } else if (res.data.code == 301) {
            //7天自动退出登录
            this.$logOut({
              rememberpwd: '1'
            }) //退出记住密码
          } else if (res.data.code == 407) {
            //被踢出登录，返回登录页
            this.$logOut()
          } else {
            console.log(res.data.msg)
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    news() {
      //进入消息列表
      this.$router.push('/news/newsAndNotice')
    },
    toHelpPage() {
      //进入消息列表
      this.$router.push('/timeBattle/help')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/methods'
.jinfu_title
  width 100%
  iphonefixpadding(20px)
  position fixed
  z-index 200
  background-image url('../assets/images/zhanbaotitle.png')
  background-repeat no-repeat
  background-size 100% 100%

  .center
    height 50px
    line-height 50px
    text-align center
    position relative

    .title_zb
      width 180px
      height 18px

  .right
    height 50px
    width 50px
    position absolute
    bottom 0
    right 0

    .msg_right
      width 20px
      height 20px
      float right
      margin-right 20px
      margin-top 10px

  .left
    height 50px
    width 50px
    position absolute
    bottom 0
    left 0

    .msg_left
      width 19px
      height 19px
      float left
      margin-left 20px
      margin-top 10px

    .dian
      width 4px
      height 4px
      background-color red
      border-radius 50px
      position absolute
      right 14px
      top 12px

  .imgRotate
    animation-name go
    animation-duration 1.5s
    animation-iteration-count infinite

    @keyframes go
      0%
        transform rotateZ(0)

      100%
        transform rotateZ(360deg)
</style>

