<template>
  <div class="container">
    <div class="score-info">
    	<figure class="avatar">
    		<img :src="img" />
    	</figure>
    	<div class="total">
	    	<p class="weight">总得分：{{totalScore}}分</p>
	    	<p class="weight">今日得分：{{todayScore}}分</p>
	    	<p>已获得{{calorie}}卡路里</p>
    	</div>
    </div>
    <dl class="prizes">
    	<dt>获得的奖品</dt>
    	<dd v-for="(item,index) in infodata">
    		<Prize :number="item.gettype" :captcha='item.captcha' :isget="item.isget" :rank="item.rank"/>
    	</dd>
    </dl>
    <ul class="buttons">
    	<li @click="share" v-if="shareshow">去分享</li>
    	<li>
    		<router-link to="/rank"><div>查看排行榜</div></router-link>
    	</li>
    </ul>
    <Share :shareShow="shareShow" v-on:ShareView="shareBox"></Share>
  </div>
</template>

<style scoped lang="less">
	.container{
		height:100%;
		background: url("https://s.kcimg.cn/wap/images/weichai/20170519/center_bg.jpg") no-repeat 50% 50%;
		background-size: 100% 100%;
		overflow: auto;
		-webkit-overflow-scrolling:touch;
		.score-info{
			position: relative;
			height:168px;
			padding:28px 15px 0;
			color:#fff;
			display: flex;
			z-index: 1;
			box-sizing: border-box;
			&:before{
				position: absolute;
				left:0;
				top:0;
				width: 100%;
				height:118px;
				content:"";
				border:1px solid #287bec;
				background: #fff;
				transform: skewX(-40deg) translate(-13%,5px);
				z-index: -2;
			}
			&:after{
				position: absolute;
				left:0;
				top:0;
				width: 100%;
				height:120px;
				content:"";
				background: #1972eb;
				transform: skewX(-40deg) translate(-15%,10px);
				z-index: -1;
			}
			.avatar{
				margin-right:15px;
                margin-top: 14px;
				width: 50px;
				height: 50px;
				border-radius: 50%;
				border:2px solid #fff;
				overflow: hidden;
				img{
					width: 100%;
                    height: 100%;
				}
			}
			.weight{
				font-size:18px;
				font-weight: 700;
			}
		}
		.prizes{
			padding:0 30px 100px;
			text-align: center;
			dt{
				font-size:18px;
				color:#555
			}
			dd{
				position: relative;
				margin-top:25px;
				color:#1972eb;
				height:50px;
				line-height: 50px;
				border:1px solid #1972eb;
				background: #fff;
				background-image: -webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, rgba(204, 204, 204, .2)), color-stop(.25, transparent), color-stop(.5, transparent), color-stop(.5, rgba(204, 204, 204, .2)), color-stop(.75, rgba(204, 204, 204, .2)), color-stop(.75, transparent), to(transparent));
      	background-size: 5px 5px;
				&::before{
					position: absolute;
					content:"";
					left:0;
					top:0;
					width:100%;
					height:10px;
					border-width:1px;
					border-style: solid;
					border-color:transparent transparent #1972eb #1972eb;
					transform: skewX(-45deg) translate(-7px,-12px);
				}
				&::after{
					position: absolute;
					content:"";
					right:0;
					top:0;
					width:93%;
					height:10px;
					border-width:1px;
					border-style: solid;
					border-color:#1972eb #1972eb transparent transparent ;
					transform: skewX(45deg) translate(7px,-12px);
				}
			}
		}
		.buttons{
			position: fixed;
			left:0;
			bottom:0;
			width: 100%;
			padding:35px 25px;
			display: flex;
			box-sizing: border-box;
			li{
				margin:0 5px;
				flex:1;
				height:40px;
				line-height: 40px;
				font-size: 18px;
				color:#fff;
				text-align: center;
				background: #1972eb;
				a{
					color:#fff;
				}
			}
		}
	}
</style>
<script>
	import utils from "../utils"
    import Prize from '../components/prize'
	import Share from '../components/share'
	export default {
		components: {
			Prize,Share
		},
	  data(){
	  	return {
				totalScore: 0,
				todayScore: 0,
				calorie: 0,
                prizeId : '0',
                isget : '',
                img:"",
                shareShow:false,
                shareshow:false,
                infodata:[]
	  	}
	  },
	  created (){
        //   头像
        var me = this;
	  	this.avatar = utils.avatar();
        // 请求
        utils.getUserData(me.userData);
        // 微信判断
        if(/MicroMessenger/i.test(navigator.userAgent)){
            this.shareshow = true;
        }
	  },
	  methods: {
	  	share (){
            this.shareShow = true
	  	},
        shareBox(share){
            this.shareShow = !share;
        },
        userData (res){         // 个人中心信息
            if( res.status == 200){
                var data = res.data.data;
                this.totalScore = data.allscore;
                this.todayScore = data.score;
                this.calorie = data.allpoints;
                this.infodata = data.infodata;
                this.img = data.img;
            }
        }
	  }
	}
</script>
