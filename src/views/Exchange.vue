<template>
    <div class="award">
        <header v-if="number == 1">
            <h3>每日答题前十名奖 <span>请选择奖品</span></h3>
            <ul class="answers">
                <li v-for="(item,index) in answers" >
                    <figure @click="change(index)"  v-bind:class="{selected : item.selected }">
                        <img :src="item.url">
                    </figure>
                </li>
            </ul>
        </header>
        <div v-if="number >= 2">
            <header v-if="rank <= 3">
                <h3>每期答题前三名奖 <span>请选择奖品</span></h3>
                <div class="prize-img">
                    <img src="https://s.kcimg.cn/wap/images/weichai/20170519/award_one1.png">
                </div>
            </header>
            <header  v-if="rank > 3">
                <h3>每期答题前十名奖 <span>请选择奖品</span></h3>
                <div class="prize-img">
                    <img src="https://s.kcimg.cn/wap/images/weichai/20170519/award_one2.png">
                </div>
            </header>
        </div>
        <form class="addinfo" @submit.prevent="submit">
            <label>
                <em>姓名：</em>
                <input type="text" name="name" value="" v-model="form.name" maxlength="10">
            </label>
            <label>
                <em>电话：</em>
                <input type="tel" maxlength="11" name="tel" v-model="form.tel">
            </label>
            <label>
                <em>住址：</em>
                <input type="text" name="address" value="" v-model="form.address" maxlength="50">
            </label>
            <div class="submit">
                <button type="submit">提交</button>
            </div>
        </form>
        <Toast :toastView="toastView" :toastBack="toastBack" :toastText="toastText" v-on:toastbox="toastMeg"></Toast>
    </div>
</template>

<style scoped lang="less">
    .award{
        height:100%;
				background: url("https://s.kcimg.cn/wap/images/weichai/20170519/award_bg.jpg") no-repeat 50% 50%;
				background-size: 100% 100%;
				overflow: auto;
				-webkit-overflow-scrolling:touch;
        header{
            padding: 15px 15px 0;
            h3{
                height: 40px;
                line-height: 30px;
                text-align: center;
                font-size: 18px;
                color: #1972eb;
                margin-bottom: 15px;
                span{
                    display: block;
                    line-height: 20px;
                    font-size: 12px;
                }
            }
            .prize-img{
                width: 90px;
                height: 90px;
                border: 2px solid #1972eb;
                overflow: hidden;
                margin: 0 auto;
                border-radius: 50%;
                img{
                    width: 100%;
                }
            }
            .answers{
                display: flex;
                flex-wrap:wrap;
                justify-content:space-around;
                li{
                    width: 33%;
                    margin-bottom: 8px;
                    figure{
                        width: 75px;
                        height: 75px;
                        border-radius: 50%;
                        overflow: hidden;
                        margin: 0 auto;
                        img{
                            max-width: 100%;
                        }
                        &.selected{
                            border: 2px solid #1972eb;
                            box-sizing: border-box;
                        }
                    }
                }
            }
        }
        .addinfo{
            padding: 10px 50px 0 50px;
            label,.submit{
                display: block;
                width: 100%;
                height: 40px;
                position: relative;
                transform: skew(-20deg);
                border: 1px solid #1972eb;
                padding: 10px 0 10px 70px;
                box-sizing: border-box;
                overflow: hidden;
                background: #fff;
                margin-bottom: 15px;
                em{
                    font-style: normal;
                    position: absolute;
                    left: 10px;
                    top: 0;
                    line-height: 40px;
                    color: #83b0ec;
                    font-size: 18px;
                    transform: skew(20deg);
                }
                input{
                    display: block;
                    transform: skew(20deg);
                    color: #aaa;
                    font-size: 18px;
                    line-height: 20px;
                    width: 100%;
                    padding-right: 5px;
                    box-sizing: border-box;
                }
            }
            .submit{
                padding: 0;
                background: #1972eb;
                button{
                    transform: skew(20deg);
                    font-size: 18px;
                    color: #fff;
                    text-align: center;
                    width: 100%;
                    height: 40px;
                    background: transparent;
                }
            }
        }
    }
</style>

<script>
    import Toast from '../components/toast'
    import utils from "../utils"
	export default {
        components: {
			Toast
		},
	  data(){
	  	return {
            toastView : false,
            toastBack:0,
            toastText : '',        // 错误文案
            selected:'selected',  // 选中
            number:2,               // 期数
            rank:3,                 //排名
            id:2,                   //id
            selectedIndex:'',
            form : {
                name: '',
                tel: '',
                address:'',
                captcha:'',
                wanning:''
            },
			answers: [
              {url:'https://s.kcimg.cn/wap/images/weichai/20170519/award_1.png',selected:false,name:'杯子'},
              {url:'https://s.kcimg.cn/wap/images/weichai/20170519/award_3.png',selected:false,name:'车贴'},
              {url:'https://s.kcimg.cn/wap/images/weichai/20170519/award_2.png',selected:false,name:'毛巾'},
              {url:'https://s.kcimg.cn/wap/images/weichai/20170519/award_4.png',selected:false,name:'护目镜'},
              {url:'https://s.kcimg.cn/wap/images/weichai/20170519/award_5.png',selected:false,name:'充值卡'},
              {url:'https://s.kcimg.cn/wap/images/weichai/20170519/award_6.png',selected:false,name:'卡车之家'},
            ]
	  	}
	  },
	  created (){
        //  期数 排名 id
        if(this.$route && this.$route.query){
            this.number = this.$route.query.type;
            this.rank = this.$route.query.rank;
            this.form.captcha = this.$route.query.id;
        }
	  },
	  methods: {
	  	change (index){     //奖品
            this.answers.forEach(function(ele){
                ele.selected = false;
            });
            this.answers[index].selected = true;
            this.selectedIndex = index;
            this.form.wanning = escape(this.answers[index].name)
	  	},
        toastMeg ( judge ){     //弹窗
            this.toastView = !judge;
            if(this.toastBack == 1){
                this.$router.push('/zone');
            }
        },
        submit: function(event) {
            var me = this;
            if( this.number == 1){
                // 日榜
                if( this.form.wanning == ''){
                    me.toastText = '请选择奖品！';
                    me.toastView = true;
                    return;
                }
            }else{
                if( this.rank <= 3 ){
                    this.form.wanning = escape('车模+发动机')
                }else{
                    this.form.wanning = escape('发动机')
                }
            }
            // 验证
            if( this.form.name.length <= 0){
                me.toastText = '请输入您的姓名！';
                me.toastView = true;
                return;
            }
            if(this.form.tel && !(/^1(([38]\d)|(4[57])|(5[012356789])|(7[0678]))\d{8}$/.test(this.form.tel))){
                me.toastText = '请输入正确的联系电话！';
                me.toastView = true;
                return;
            };
            if( this.form.address <= 0){
                me.toastText = '请输入您的住址！';
                me.toastView = true;
                return;
            }
            this.form.name = escape(this.form.name);
            this.form.address = escape(this.form.address);
            utils.addWinningData(function(res){
                if( res.status == 200){
                    var data = res.data.data;
                    me.toastText = data.mess;
                    me.toastBack = 1;
                    me.toastView = true;
                    me.form.name = unescape(me.form.name);
                    me.form.address = unescape(me.form.address);
                }
            },this.form)
        }
	  }
	}
</script>
