<template>
  <div class="container">
    <!-- <header>
    	答题所用时间：<var id="timetotal">{{content}}秒</var>
    </header> -->
    <div v-bind:class="{ 'visible': visible }">
        <div class="question">
        	{{ node+1 }}、{{question}}
        </div>
        <ul class="answers">
        	<li v-if="answer.text != 0" v-for="(answer,index) in answers" @click="judge(index)" :class="answer.resultClass">
        		<answer :message="answer.text" :sort="sortList[index]"/>
        	</li>
        </ul>
    </div>
    <aside class="tips" v-if="tips">
    	<span class="close" @click="close">×</span>
    	{{tips}}
    </aside>
    <Toast :toastView="toastView" :toastText="toastText" v-on:toastbox="toastMeg"></Toast>
  </div>
</template>

<style scoped lang="less">
	.container{
		height:100%;
		padding:0 15px 0 22px;
		background: url("https://s.kcimg.cn/wap/images/weichai/20170519/center_bg.jpg") no-repeat 50% 50%;
		background-size: 100% 100%;
		overflow: auto;
		-webkit-overflow-scrolling:touch;
		> header{
			height:45px;
			line-height: 45px;
			text-align: right;
			font-size: 12px;
			color:#1972eb;
			var{
				font-size: 16px;
				font-weight: 700;
			}
		}
		.top-coner{
			position: absolute;
			left:0;
			top:0;
			content:"";
			width: 100%;
			height:8px;
			border:1px solid #2579ec;
			transform: skewX(-30deg) translate(-4px,-10px);
		}
		.right-coner{
			position: absolute;
			right:0;
			top:0;
			content:"";
			width: 7px;
			height:100%;
			border:1px solid #2579ec;
			box-sizing: border-box;
			transform: skewY(-62deg) translate(7px,8px);
			z-index: 1;
		}
        .visible{
            transition: all 0.5s ease-in-out 0.8s;
            transform:translate3d(-250%,0,0);
        }
		.question{
			position: relative;
			margin-top:20px;
			padding:10px;
			color: #fff;
			font-size: 14px;
			line-height: 22px;
			border:1px solid #2579ec;
			background-color: #2579ec;
			box-sizing: border-box;
			&::before{
				.top-coner;
			}
			&::after{
				.right-coner;
			}
		}
		.answers{
            li{
				position: relative;
				margin-top:20px;
				padding:11px 15px;
				font-style: 14px;
				line-height: 22px;
				min-height:44px;
				box-sizing: border-box;
				border:1px solid #2579ec;
				background: #fff;
				&::before{
					.top-coner;
				}
				&::after{
					.right-coner;
				}
				&.wrong{
					color:#fff;
					border-color:#eb1919;
					background: #eb1919;
					&::before{
						border-color:#eb1919
					}
					&::after{
						border-color:#eb1919
					}
				}
				&.right{
					color:#fff;
					background:#1972eb
				}
			}
		}
		.tips{
			position: fixed;
			bottom:0;
			left:0;
			width: 100%;
			height:30px;
			line-height: 30px;
			color:#fff;
			text-align: center;
			background: rgba(0,0,0,.5);
			.close{
				position: absolute;
				left:0;
				top:0;
				width:30px;
				height:30px;
				font-size:20px;
			}
		}
	}
</style>
<script>
    var CryptoJS = require("crypto-js");
    var AES = require("crypto-js/aes");
    var SHA256 = require("crypto-js/sha256");
    import Toast from '../components/toast'
	import answer from '../components/answer'
	import utils from "../utils";
	export default {
		components: {
  		answer,Toast
  	},
	  data(){
	  	return {
                answers : true,
                visible : false,
                toastView : false,
                toastText : '',        // 错误文案
				tips: '获得80分即可再奖励1卡路里',
				question: '',
				oldChooseIndex: null,
                node : 0,
				content: '0',  //时间
                number:'1',      //期
                answerid:0,
                captcha:"",
                correct:'',     // 正确答案
                correctIndex : '',
                scoreNum : 0,      //分数
                answerArr : "",     //提交
                correctId : '',
                sortList : ['A','B','C','D','E','F'],
                infodata:[

                ],
				answers: [],
                nowTime:'',
                key: "360chetopictruck"
	  	}
	  },
	  created (){
        //   获取uid
        this.uid = utils.uid()
        // this.uid = "138074"
        // key
        if( this.uid.length < 8){
            this.uidPadLeft(this.uid,8);
        }
        this.key = CryptoJS.enc.Latin1.parse( this.uid +""+this.key );
        this.iv = CryptoJS.enc.Latin1.parse('360chetopictruck');
        var me = this;
        // 获取问题
        utils.geQuestions(function(res){
            if( res.status == 200){
                if(res.data.result == 0){
                    me.toastView = true;
                    me.toastText = res.data.data.mess;
                    return;
                }
                var data = res.data.data;
                me.infodata = data.infodata;
                me.number = data.number
                me.answerid = data.answerid
                me.captcha = data.captcha
                    // me.answerid = "96"
                    // me.captcha = "FE915179D1CFC86C4E39AB3BC0649D6CABFCFA355DBD55863F3417A37807470A5D983AD833AFF109A553BDABAA8A09CF"
                me.fetch(0);

                // 时间
                // let nowTime = new Date();
                // me.nowTime = nowTime;
            	// me.timer = setInterval(function(){
                //     me.content = utils.interval(nowTime);
                // },1000);
            }

        })

        // 移除缓存
        var scoreNum = localStorage.getItem('scoreNum');
        if(scoreNum){
            scoreNum = JSON.parse(scoreNum);
            localStorage.removeItem('scoreNum');
        }

	  },
	  methods: {
          toastMeg ( judge ){     //弹窗
              this.toastView = !judge;
              this.$router.push("/")
          },
          judge (index){      //判断对错
            let item = this.answers[index];
            if(this.oldChooseIndex != null){
                return;
            }
            	//this.answers[this.oldChooseIndex].resultClass = ''
                if(this.answers.length > this.correctIndex) {
                    if(item['isRight']){
                		item.resultClass = 'right';
                    // 记录分数
                    this.scoreNum = parseInt(this.scoreNum,"10") + 10;
                	}else{
                		item.resultClass = 'wrong';
                        this.answers[this.correctIndex].resultClass = 'right';
                	}
                }else{
                    item.resultClass = 'right';
                    // 记录分数
                    this.scoreNum = parseInt(this.scoreNum,"10") + 10;
                    index = this.correctIndex;
                }


            // 答题
            // var Dana = this.sortList[index];
            // var arr = {'id':this.correctId,'correct':Dana};

            this.answerArr += this.sortList[index];

            	this.oldChooseIndex = index;

            // 完成定时
            var me = this;
            me.visible = true;
            var time = setTimeout(function(){
                me.oldChooseIndex = null;
                if( (me.infodata.length - 1) <= me.node){
                    me.end();
                }else{
                    me.next();
                    me.visible = false;
                }
                clearTimeout(time);
            },1300)

	  	},
        uidPadLeft(uid,n){   // 补全字符串
            uid = "0" + uid.toString();
            if(uid.length < n){
                this.uidPadLeft(uid,n)
            }else{
                this.uid = uid;
            }
        },
        encrypted(str){    //加密
            var me = this;
            // 字符串加密
            var key = CryptoJS.enc.Latin1.parse(str);
            // var iv = CryptoJS.enc.Latin1.parse('360chetopictruck');

            var encrypted = CryptoJS.AES.encrypt(key, me.key, {
                iv: me.iv,
                mode:CryptoJS.mode.CBC,
                padding:CryptoJS.pad.ZeroPadding
            });

            // 转换为字符串
            encrypted = encrypted.toString();
            return encrypted;
        },
        decrypted(encrypted){    //解密
            var me = this;
            var decrypted = CryptoJS.AES.decrypt(encrypted, me.key, {
                iv: me.iv,padding:CryptoJS.pad.ZeroPadding
            });

            // 转换为 utf8 字符串
            decrypted = CryptoJS.enc.Latin1.stringify(decrypted);
            return decrypted;
        },
	  	fetch (i){        //渲染
            // 问题
                if( i > 9 ) return;
                this.question = this.infodata[i].title ;
                // id
                // this.correctId = this.infodata[i].id
                // 正确答案
                this.correct = this.decrypted(this.infodata[i].answer);
                var correctNum;
                var me = this;
                this.sortList.forEach(function(ele,i){
                    if(me.correct == ele){
                        correctNum = i;
                    }
                });
                this.correctIndex = correctNum;

                // 选项
                me.answers=[];
                this.infodata[i].problems.forEach(function(ele,index){
                    var obj = {};
                    obj.text = ele;
                    obj.resultClass = '',
                    obj.isRight = false;
                    if( correctNum == index) obj.isRight = true;
                    me.answers.push(obj)
                });

	  	},
	  	next (){        // 下一题
            var me = this;
                this.node ++;
                this.fetch(this.node);
	  	},
	  	end (){
            var me = this;

            // 停止计时
            // clearInterval(this.timer);
            // utils.interval(me.nowTime,1);

            var dataObj = 'answerid=' +me.answerid;
            dataObj += '&score='+ encodeURIComponent(me.encrypted(me.scoreNum.toString()));
            // dataObj += '&scoretime=' + encodeURIComponent(me.encrypted(me.content.toString()));
            dataObj += '&number=' + me.number;
            dataObj += '&answer='+ encodeURIComponent(me.encrypted(me.answerArr));
            dataObj += '&captcha='+me.captcha;
            utils.addScoreData(function(res){
                if( res.status == 200){
                    var data = res.data;
                    if(data.result == 1){
                        try {
                              var SCORE = {
                                'score': me.scoreNum,
                                'time':data.data.mess
                              }
                              localStorage.setItem('scoreNum',JSON.stringify(SCORE));
                            } catch(e){};
                        me.$router.push({ path: '/end', query: { num: me.scoreNum,time:data.data.mess}})
                    }else{
                        me.toastView = true;
                        me.toastText = data.data.mess;
                    }
                }
            },dataObj)

	  	},
	  	close (){
	  		this.tips = ''
	  	}
	  }
	}
</script>
