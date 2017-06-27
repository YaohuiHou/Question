<template>
    <div class="detail_model" v-show="ruleView">
        <div class="detail_container">
            <div class="rule-view">
                <div class="detail">
                    1、潍柴“质领心标准——新标准，新卡车人”答题活动，一共分为15期，每期10天，每天10道题目，每人每天只可提交一次。<br/>
                    2、15期答题活动结束之后，将抽取15期中的题目进行“期末考”，每天10道题目，一共10天。<br/>
                    3、凡每日参与答题活动者，均可获得卡车之家1卡路里。<br/>
                    4、每日答题，每答对一题积10分，得分排名前10名，可自由选择兑换奖品（不锈钢杯、卡车之家车贴、卡车之家定制毛巾、3M防护眼镜、电话充值卡及卡车之家订制旗），满80积分即可再次获得1卡路里，每个ID每期只能上日榜一次且只可领取一次奖品，不影响每日分数及答题时间进入期排行榜。<br/>
                    5、每期总分数，得分排名前3名，奖励搭载潍柴发动机的随机车模1个和潍柴发动机模型1个，第4-10名奖励潍柴发动机模型1个，可在期排行榜中查看得分及排名。<br/>
                    6、期末考答题每答对一题积20分，得分排名前3名，奖励搭载潍柴发动机的随机车模1个和潍柴发动机模型1个，第4-10名奖励潍柴发动机模型1个，可在期末考排行榜中查看得分及排名。<br/>
                    7、每期及期末考的积分将计入得分总排行榜。<br/>
                    8、总排行榜累计得分前5名奖励5000元现金，并且参与线下总决赛，商务大会，更有万元大奖等您来拿！<br/>
                    9、得分相同按总答题所耗时间长短排序（时间相同的情况下，按提交时间的先后顺序排序）。<br/>
                    10、奖品每2期寄出一次，马甲号不予寄出。<br/>
                    11、此活动最终所有权归潍柴动力股份有限公司所有。
                </div>
            </div>
            <div class="detail_delate" @click="remove"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['ruleView'],
    data () {
        return {
        }
    },
    methods:{
      remove (){
        this.$emit('remove',this.ruleView);
      }
    }
}
</script>
<style lang="less">
.detail_model{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background: rgba(0,0,0,0.8);
    .detail_container{
        padding: 0 20px;
        box-sizing: border-box;
        height: 400px;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -200px;
        .detail_delate{
            position:absolute;
            bottom:-50px;
            left:50%;
            margin-left:-20px;
            width:40px;
            height:40px;
            color: #fff;
            font-size: 30px;
            line-height: 40px;
            text-align: center;;
            &:after,&:before{
                content: "";
                position: absolute;
                left: 50%;
                top: 0;
                height: 30px;
                width: 1px;
                background: #fff;
            }
            &:after{
                transform: rotate(45deg);
            }
            &:before{
                transform: rotate(-45deg);
            }
        }
    }
    .rule-view{
        height: 400px;
        box-sizing: border-box;
        overflow-y: auto;
        -webkit-overflow-scrolling:touch;
        background: url("https://s.kcimg.cn/wap/images/weichai/20170519/detail_bg.jpg") no-repeat center;
        border:2px solid #1972eb;
    }
    .detail{
        font-size: 12px;
        line-height:16px;
        color: #1972eb;
        padding:12px;
    }
}
</style>
