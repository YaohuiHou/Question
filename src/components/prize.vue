<template>
	<div class="prize-item" :class="[ isget != 0 ? 'isget' : '']">
		<router-link :to="{ path: '/exchange', query: { id: captcha ,type:number,rank:rank }}">{{ prizes[number].title }}</router-link>
		<img :src="prizes[number].figure" alt="">
	</div>
</template>
<script>
	export default{
		props:['number','captcha','isget','rank'],
		data(){
			return {
				prizes: [
                    {},
					{
						title: '领取每日答题前十名奖',
						figure: 'https://s.kcimg.cn/wap/images/weichai/20170519/award_limit1.png'
					},
					{
						title: '领取每期答题前十名奖',
						figure: 'https://s.kcimg.cn/wap/images/weichai/20170519/award_limit2.png'
					},
					{
						title: '领取期末答题前十名奖',
						figure: 'https://s.kcimg.cn/wap/images/weichai/20170519/award_limit2.png'
					}
				]
			}
		},
  	  created (){
	  }
	}
</script>
<style scoped lang="less">
	.prize-item{
		&.isget{
			opacity: 0.6;
			background: rgba(0,0,0,.4);
			position: relative;
			&:after{
				content: "";
				position: absolute;
				left: 0;
				top:0;
				width: 100%;
				height: 50px;
				z-index: 10;
			}
		}
		a{
				position: relative;
				color:#1972eb;
				display: block;
				 &:before{
					position:absolute;
					left:14px;
					top:0;
					content:"";
					width: 33px;
					height:41px;
					background: url("https://s.kcimg.cn/wap/images/weichai/20170519/medal.png");
					background-size: cover
				}
			}
			img{
				position: absolute;
				right:5px;
				top:6px;
				width: 45px;
				height: 38px;
			}
	}
</style>
