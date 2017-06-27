<template>
  <div class="home" v-bind:class="{visible : homeVisible }">
      <div class="home_logo"></div>
      <div class="home_title1">
          <img src="https://s.kcimg.cn/wap/images/weichai/20170519/home_title1.png" />
      </div>
      <div class="home_title2">
          <img src="https://s.kcimg.cn/wap/images/weichai/20170519/home_title2.png" alt="">
      </div>
      <div class="home_img">
          <p class="home_peple">已有<span>{{ allcount }}</span>参与</p>
          <a :href="linkurl">
              <img :src="imgurl" alt="">
          </a>
      </div>
      <div class="start_question">
            <ul>
                <li class="start_left" @click="goin('/question')"><div>开始答题</div></li>
                <li class="start_right" @click="ruleView = !ruleView">活动规则</li>
                <li class="start_bottom" @click="go('/rank')"><div>查看排行榜</div></li>
                <li class="start_bottom" @click="goin('/zone')"><div>个人中心</div></li>
            </ul>
      </div>
      <Rule :ruleView="ruleView" v-on:remove="removeMessage"></Rule>
  </div>
</template>

<script>
import Rule from '../components/rule'
import utils from "../utils";
export default {
    components: { Rule },
    data () {
        return {
            ruleView : false,
            visible : 'visible',
            homeVisible : false,
            allcount : '',
            linkurl : '',
            imgurl : ''

        }
    },
    created (){
        var me = this;
        var time = setTimeout(function(){
            me.homeVisible = true;
            clearTimeout(time)
        },500);
        // 参与人数
        utils.actorTotal(me.actor);

    },
    methods:{
        removeMessage (r){
            this.ruleView = !r
        },
        getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        goin (route){       // 登录
            // 获取uid 登录
            // this.uid = utils.uid()
            // if(this.uid){
                if (this.$route) {
                  this.$router.push(route)
                  return ;
                }
            // }
        },
        go(route){
            if (this.$route) {
              this.$router.push(route)
              return ;
            }
        },
        actor (res){        //  首页
            if( res.status == 200){
                var data = res.data.data;
                this.allcount = data.allcount;
                this.linkurl = data.url;
                this.imgurl = data.img;
            }
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    @import "../assets/css/hello.less";

</style>
