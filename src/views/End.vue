<template>
  <div class="container">
    <div class="congratulate">
    	<h4>恭喜您</h4>
    	<p>完成答题获得1卡路里</p>
    </div>
    <div class="score">
    	<p>得分：<var>{{score}}</var> 分</p>
        <p>耗时：{{ time }}秒</p>
        <p v-if="this.score >= 80">额外再送您{{plus}}卡路里</p>
    	<p v-if="this.score < 80">很遗憾，得分太低没有获得额外奖励</p>
    </div>
    <ul class="buttons">
    	<li @click="share" v-if="shareshowBtn">去分享</li>
    	<li>
    		<router-link to="/rank"><div>查看排行榜</div></router-link>
    	</li>
    	<li>
    		<router-link to="/zone"><div>个人中心</div></router-link>
    	</li>
    </ul>
    <Share :shareShow="shareShow" v-on:ShareView="shareBox"></Share>
  </div>
</template>

<style scoped lang="less">
	.container{
		height:100%;
		background: url("https://s.kcimg.cn/wap/images/weichai/20170519/award_bg.jpg") no-repeat 50% 50%;
		background-size: 100% 100%;
		overflow: hidden;
		.congratulate,.score{
			position: relative;
			margin:0 auto;
			padding:8px 0;
			border:1px solid #1972eb;
			color:#1972eb;
			text-align: center;
			background-color: #fff;
	    background-image: -webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, rgba(204, 204, 204, .2)), color-stop(.25, transparent), color-stop(.5, transparent), color-stop(.5, rgba(204, 204, 204, .2)), color-stop(.75, rgba(204, 204, 204, .2)), color-stop(.75, transparent), to(transparent));
      background-size: 5px 5px;
		}
		.congratulate{
			margin-top:60px;
			width: 260px;
			h4{
				font-size: 30px;
				line-height: 40px;
			}
			&::before{
				position: absolute;
				content:"";
				left:0;
				top:0;
				width:100%;
				height:20px;
				border-width:1px;
				border-style: solid;
				border-color:transparent transparent #1972eb #1972eb;
				transform: skewX(-45deg) translate(-12px,-22px);
			}
			&::after{
				position: absolute;
				content:"";
				right:0;
				top:0;
				width:84%;
				height:20px;
				border-width:1px;
				border-style: solid;
				border-color:#1972eb #1972eb transparent transparent ;
				transform: skewX(45deg) translate(12px,-22px);
			}
		}
		.score{
			margin-top: 20px;
			width: 300px;
			var{
				font-size:34px;
				vertical-align: -5px;
			}
			&::before{
				position: absolute;
				left:0;
				top:0;
				content:"";
				width:1px;
				height:22px;
				background: #1972eb;
				transform: skewX(-45deg) translate(-13px,-22px);
			}
			&::after{
				position: absolute;
				right:0;
				top:0;
				content:"";
				width:1px;
				height:22px;
				background: #1972eb;
				transform: skewX(45deg) translate(13px,-22px);
			}
		}
		.buttons{
			padding:15px 60px;
			li{
				position: relative;
				margin-top:25px;
				height:40px;
				line-height: 40px;
				font-size: 18px;
				color:#fff;
				text-align: center;
				background: #1972eb;
				border:1px solid #1972eb;
				a{
					color:#fff;
				}
			}
		}
	}
</style>
<script>
    import Router from 'vue-router'
	import Share from '../components/share'
	export default {
        components: {
			Share
		},
	  data(){
	  	return {
                showScore:false,
                shareShow:false,
                shareshowBtn:false,
				score: 0,
				plus: 1,
                time:0
	  	}
	  },
	  created (){
          var scoreNum = localStorage.getItem('scoreNum');
          if(scoreNum){
              scoreNum = JSON.parse(scoreNum);
              this.score = scoreNum.score;
              this.time = scoreNum.time/1000;
          }
          if(this.score <= 80){

              this.showScore = true;
          }else{
              this.showScore = false;
          }
          // 微信判断
          if(/MicroMessenger/i.test(navigator.userAgent)){
              this.shareshowBtn = true;
          }
	  },
	  methods: {
          share (){
              this.shareShow = true
  	  	},
          shareBox(share){
              this.shareShow = !share;
          },
	  }
	}
</script>
