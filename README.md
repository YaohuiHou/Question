# Question

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 接口文档

## 请求说明
    正式接口：http://topic.360che.com
    
    调用方式：GET/POST
    
    提交信息的时间 中文需要编码
    


## 首页信息

        域名 + /m/2017051701/getindex.aspx

#### 返回值

```
    {
        result: 1,
        data: {
            allcount: "103",    //数量
            img: "https://img8.kcimg.cn/HW_Image/2017/0519/0519091647.jpg!340",    //图片
            url: "http://www.360che.com"    //链接
        }
    }

```


## 是否参加过

        域名 + /m/2017051701/getisgame.aspx

#### 返回值

```
{
    result: 1,
    data: 
    {
        mess: "已参加"
    }
}

{
    result: 0,
    data: 
    {
        mess: "未参加"
    }
}

```


## 答题信息

        域名 + /m/2017051701/getanswer.aspx

#### 返回值

```
    {
        result: 1,
        data: 
        {
            number: "1",
            answerId: "14",
            infodata: 
            [
                {
                    id: "124", //题目id
                    title: "潍柴WP13产品具有优秀的低温适用性，（ ）度可实现无辅助措施冷启动。",//题目
                    answer: "QQ==",//答案
                    problems: "[-15 ℃,-5 ℃,-10 ℃]"
                },
                ...
            ]
        }
    }

```


## 提交答题信息

        域名 + /m/2017051701/add.aspx

#### 参数说明

参数名称 | 参数类型 | 是否必选 | 备注
---|---|---|---
answerid | int |1|答题信息接口里面的answerId
score | int |1|分数
scoretime | int |1|时间
number | int |1|答题信息接口里面的number
answer | string |1|[{\"题目id\":\"答案\"},{\"题目id\":\"答案\"}]

#### 返回值

```
{
    result: 1,
    data: 
    {
        mess: "提交成功"
    }
}

{
    result: 0,
    data: 
    {
        mess: "错误信息"
    }
}

```


## 个人中心

        域名 + /m/2017051701/getuser.aspx

#### 返回值

```
{
    result: 1,
    data: 
    {
        img: "https://i.kcimg.cn/data/avatar/noavatar_big.gif-120x120.jpg", //头像
        name: "vanwade",//名称
        allscore: "520",//总分数
        score: "90",//当天分数
        allpoints: "11",//卡路里
        infodata: 
        [
            {
                id: "3",//奖项id，提交获奖信息时需要
                gettype: "1", //获奖类型1:日奖  2:期奖 3:总奖
                rank:"1"//排名
                isget: "0"//是否领奖 0否 1是
            },
            ...

        ]
    }
}

```



## 提交获奖信息

        域名 + /m/2017051701/addwinning.aspx

#### 参数说明

参数名称 | 参数类型 | 是否必选 | 备注
---|---|---|---
winningid | int |1|个人中心里面的id
name | string |1|名称
tel | string |1|电话
address | string |1|地址
wanning | string |1|奖品

#### 返回值

```
{
    result: 1,
    data: 
    {
        mess: "提交成功"
    }
}

{
    result: 0,
    data: 
    {
        mess: "错误信息"
    }
}

```



## 榜单

        域名 + /m/2017051701/getrank.aspx
        
#### 参数说明

参数名称 | 参数类型 | 是否必选 | 备注
---|---|---|---
gettype | int |1|排行榜类型1:日榜  2:期榜 3:总榜

#### 返回值

```
{
    result: 1,
    data: 
    {
        rank: "2",//我的排名 没有时为空
        img: "https://i.kcimg.cn/data/avatar/noavatar_big.gif-120x120.jpg",//我的头像 没有时为空
        name: "vanwade",//我的姓名 没有时为空
        Score: "60",//我的分数 没有时为空
        scoretime: "100",//我的时间 没有时为空
        infodata:
        [
            {
                rank: "1",//排名
                img: "https://i.kcimg.cn/data/avatar/noavatar_big.gif-120x120.jpg",//头像
                name: "vanwade",//姓名
                Score: "70",//分数
                scoretime: "100"//时间
            },
            ...

        ]
    }
}

```


