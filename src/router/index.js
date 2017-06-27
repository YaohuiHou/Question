import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello'        // 首页
import Question from '@/views/Question'  // 答题
import End from '@/views/End'            // 答题完成
import Zone from '@/views/Zone'          // 个人中心
import Exchange from '@/views/Exchange'  // 兑换
import Rank from '@/views/Rank'          // 排行榜
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/question',
      name: 'Question',
      component: Question,
      query:{}
    },
    {
      path: '/end',
      name: 'End',
      component: End,
      query:{}
    },
    {
      path: '/zone',
      name: 'Zone',
      component: Zone
    },
    {
      path: '/exchange',
      name: 'Exchange',
      component: Exchange,
      query:{}
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    }
  ]
})
