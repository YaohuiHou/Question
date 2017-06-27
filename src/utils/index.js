import axios from 'axios'
import Interval from 'real-interval'
const COOKIE = document.cookie
const BASEURL = 'https://topic.360che.com/m/2017051701/'

// http://didi.360che.com/topic/m/weichai/
// http://topic.360che.com/m/2017051701/


function getUid(callback){	// 获取userid
	let uid = COOKIE.match(/AbcfN_ajaxuid=([^;$]+)/)
	if(uid && uid[1])
	return uid[1]
	else
	location.href = 'https://sso.360che.com/?c=login&referer=http://topic.360che.com/m/2017051701'
	// &referer=http://topic.360che.com/m/2017051701/#/
}

function getAvatar (){	// 获取头像
	let avatar = COOKIE.match(/AbcfN_avatar=([^;$]+)/)
	if(avatar && avatar[1])
	return decodeURIComponent(avatar[1])
	else
	return 'https://i.kcimg.cn/data/avatar/noavatar_big.gif-120x120.jpg'
}


function interval(nowTime,end){	// 计时

		let time = new Date();
		var t = time.getTime() - nowTime.getTime();
		let second = Math.floor((t/1000));
		if(end == 1){
			return;
		}else{
			return second;
		}
}


function actorTotal(callback){	// 获取参数人数
	axios.get(`${BASEURL}getindex.aspx?v1`)
	.then(callback)
	.catch(callback)
}

function geQuestions(callback){		// 获取问题
	axios.get(`${BASEURL}getanswer.aspx?v1`)
	.then(callback)
	.catch(callback)
}

function getRankData(callback,json){		// 获取排行榜数据
	axios.get(`${BASEURL}getrank.aspx?v1`,{params:json})
	.then(callback)
	.catch(callback)
}

function getUserData(callback){		// 获取个人中心信息
	axios.get(`${BASEURL}getuser.aspx?v1`)
	.then(callback)
	.catch(callback)
}

function addScoreData(callback,json){		// 提交分数
	axios({
	  method: 'post',
	  url: `${BASEURL}add.aspx?v1`,
	  data: json,
	  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	})
	.then(callback)
	.catch(callback)
}

function addWinningData(callback,json){		// 提交领取奖品信息
	axios.get(`${BASEURL}addwinning.aspx?v1`,{params:json})
	.then(callback)
	.catch(callback)
}

export default {
	uid: getUid,
	avatar: getAvatar,
	geQuestions,
	actorTotal,
	getRankData,
	getUserData,
	addScoreData,
	addWinningData,
	interval
}
