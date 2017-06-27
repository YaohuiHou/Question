<template>
    <div class="rank">
        <header>
            <div class="rank-title">
                <span  @click="change(index)" v-bind:class="{selected : item.selected }" v-for="(item , index) in title">{{item.name}}</span>
            </div>
        </header>
        <ul class="rank-list">
            <li v-if="noneRank" v-for="(item , index) in rankList.infodata"  v-bind:class="[index <= 2 ? ('rank'+index) : '']">
                <span class="rank-id">{{ item.rank }}</span>
                <span class="rank-img">
                    <figure>
                        <img :src="item.img" alt=""/>
                    </figure>
                </span>
                <span class="rank-name">{{ item.name }}</span>
                <span class="rank-number">
                    <em class="rank-num">{{item.score}}分</em>
                    <em class="rank-time">{{conversion(item.scoretime)}}</em>
                </span>
                <span class="rank-reward" v-if="index < 10">
                    <em>奖</em>
                </span>
            </li>
            <li v-show="RankIng" class="rank-text">
                {{ rankText }}
            </li>
        </ul>
        <footer v-if="rankList.rank && rankList.rank > -1">
            <span :class="['rank-id', rankList.rank > 0 ? '' : 'notrank' ]">{{ rankList.rank }}</span>
            <span class="rank-img">
                <figure>
                    <img :src="rankList.img" alt=""/>
                </figure>
            </span>
            <span class="rank-name">{{ rankList.name }}</span>
            <span class="rank-number">
                <em class="rank-num">{{rankList.score}}分</em>
                <em class="rank-time">{{ conversion(rankList.scoretime) }}</em>
            </span>
        </footer>
        <div class="ranked"  v-if="rankList.rank && rankList.rank == -2">
            <p>哇哦~本期获过奖了，留给其他兄弟吧~</p>
        </div>
    </div>
</template>
<script>
import utils from "../utils";
export default {
    components: {},
    data(){
        return {
            RankIng:false,
            noneRank:true,
            rankText : "成绩还没有统计完成呦",
            selected:'selected',
            title : [
                {'name': '每日获奖','selected' : true},
                {'name': '期榜','selected' : false},
                {'name': '总榜','selected' : false},
            ],
            rank:[],
            index:0,
            rankList : {
                rank:0,
                img:'https://i.kcimg.cn/data/avatar/noavatar_big.gif-120x120.jpg',
                name:'1222',
                number:'50000',
                time:'10分20秒22',
                infodata:[],
            }
        }
    },
    created (){
        var me = this;
        // 请求第一期
        utils.getRankData(me.axiosRank);
    },
    methods: {
      change (index){       // 选择
          var me = this;
          this.title.forEach(function(ele){
              ele.selected = false;
          });
          this.title[index].selected = true;
          index++;
        //   请求排行
        utils.getRankData(me.axiosRank,{'gettype':index});
      },
      conversion(n){
          if(n<10000) n = n*1000;
          let hour=Math.floor((n/3600000)%24);
          let min=Math.floor((n/60000)%60);
          let sec=Math.floor((n/1000)%60);
          let surplus = Math.round( (n/1000 - Math.floor(n/1000)) *1000);
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            surplus = surplus < 100 ? "0" + surplus : surplus;
            surplus = surplus < 10 ? "0" + surplus : surplus;
          var time;
          if(hour > 0){
              time = hour+"时"+min+"分"+sec+"."+surplus+"秒"
          }else if(hour <= 0 && min > 0){
              time = min+"分"+sec+"."+surplus+"秒"
          }else{
              time = sec+"."+surplus+"秒"
          }
          return time;
      },
      axiosRank (res){        // 请求
          if( res.status == 200){
              var data = res.data.data;
              this.rankList = data;
              if(data.infodata.length > 0){
                  this.RankIng = false;
                  this.noneRank = true;
              }else{
                  this.RankIng = true;
                  this.noneRank = false;
              }
          }
      }
  }
}
</script>
<style scoped lang="less">
    .rank{
        width: 100%;
        height: 100%;
        position: relative;
        padding: 55px 15px 85px 15px;
        overflow: auto;
        box-sizing: border-box;
		-webkit-overflow-scrolling:touch;
        background: #1972eb;
        >header{
            width: 100%;
            position: fixed;
            left: 0;
            top: 0px;
            background: #1972eb;
            z-index: 10;
            .rank-title{
                padding: 15px 15px 0;
                display: flex;
            }
            span{
                flex: 1;
                height: 40px;
                text-align: center;
                line-height: 40px;
                font-size: 18px;
                color: #fff;
                &.selected{
                    background-color: rgba(255, 255, 255, .5);
                }
            }
        }
        ul,li{
            list-style: none;
        }
        em{
            font-style: normal;
        }
        .rank-list{
            background: #fff;
            min-height: 100%;
            li{
                border-bottom: 1px solid #8fb7df;
                height: 75px;
                position: relative;
                span{
                    float: left;
                    height: 75px;
                }
                &.rank-text{
                    padding-top: 55px;
                    line-height: 20px;
                    font-size: 16px;
                    color: #aaa;
                    text-align: center;
                    border: none;
                }
                &.rank0{
                    .rank-id{
                        color: #fdd745;
                    }
                    .rank-img figure{
                        border: 1px solid #fdd745;
                        box-sizing: border-box;
                        position: relative;
                        &:before{
                            content: "";
                            position: absolute;
                            width: 22px;
                            height: 18px;
                            background: url("https://s.kcimg.cn/wap/images/weichai/20170519/nober1.png") no-repeat;
                            background-size: 100%;
                            right: -4px;
                            top: -11px;
                        }
                    }
                }
                &.rank1{
                    .rank-id{
                        color: #bbb8b7;
                    }
                    .rank-img figure{
                        border: 1px solid #bbb8b7;
                        box-sizing: border-box;
                        position: relative;
                        &:before{
                            content: "";
                            position: absolute;
                            width: 22px;
                            height: 18px;
                            background: url("https://s.kcimg.cn/wap/images/weichai/20170519/nober2.png") no-repeat;
                            background-size: 100%;
                            right: -4px;
                            top: -11px;
                        }
                    }
                }
                &.rank2{
                    .rank-id{
                        color: #e79c44;
                    }
                    .rank-img figure{
                        border: 1px solid #e79c44;
                        box-sizing: border-box;
                        position: relative;
                        &:before{
                            content: "";
                            position: absolute;
                            width: 22px;
                            height: 18px;
                            background: url("https://s.kcimg.cn/wap/images/weichai/20170519/nober3.png") no-repeat;
                            background-size: 100%;
                            right: -4px;
                            top: -11px;
                        }
                    }
                }
                .rank-id{
                    line-height: 75px;
                    width: 36px;
                    text-align: center;
                    font-size: 18px;
                    color: #202020;
                }
                .rank-img{
                    width: 56px;
                    figure{
                        margin-top: 13px;
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                }
                .rank-name{
                    line-height: 75px;
                    overflow: hidden;
                    width: 75px;
                    font-size: 12px;
                    color: #6a6a6a;
                }
                .rank-number{
                    width: 76px;
                    padding-top: 20px;
                    box-sizing: border-box;
                    em{
                        display: block;
                    }
                    .rank-num{
                        color: #1972eb;
                        font-size: 18px;
                        line-height: 20px;
                    }
                    .rank-time{
                        font-size: 10px;
                        color: #aaa;
                        line-height: 14px;
                    }
                }
                .rank-reward{
                    position: absolute;
                    right: 10px;
                    top: 0;
                    width: 35px;
                    em{
                        position: absolute;
                        top: 50%;
                        left: 0;
                        margin-top: -10px;
                        width: 35px;
                        height: 20px;
                        border-radius: 10px;
                        background-color: #eb1919;
                        font-size: 12px;
                        color: #ffb8b8;
                        line-height: 20px;
                        text-align: center;
                    }
                }
            }
        }
        footer{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 75px;
            padding-top: 10px;
            background-color: #fff;
            border-top: 1px solid #ccc;
            display: flex;
            span{
                line-height: 75px;
            }
            .rank-id{
                font-size: 15px;
                width: 60px;
                color: #202020;
                text-align: center;
            }
            .notrank{
                font-size: 0;
            }
            .rank-img{
                width: 68px;
                figure{
                    margin-top: 10px;
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .rank-name{
                line-height: 75px;
                overflow: hidden;
                width: 100px;
                font-size: 14px;
                color: #6a6a6a;
            }
            .rank-number{
                padding-top: 16px;
                box-sizing: border-box;
                em{
                    display: block;
                }
                .rank-num{
                    color: #1972eb;
                    font-size: 22px;
                    line-height: 26px;
                }
                .rank-time{
                    font-size: 12px;
                    color: #aaa;
                    line-height: 16px;
                }
            }
        }
        .ranked{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 75px;
            background-color: #fff;
            border-top: 1px solid #ccc;
            p{
                color: #1972eb;
                text-align: center;
                line-height: 75px;
                font-size: 16px;
            }
        }
    }
</style>
