import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import HomeContainer from '@/components/HomeContainer'
import ShopContainer from '@/components/ShopContainer'
import SearchContainer from '@/components/SearchContainer'
import MemberContainer from '@/components/MemberContainer'
import Newslist from '@/components/news/Newslist'
import Newsinfo from '@/components/news/Newsinfo'
import photoList from '@/components/photos/photoList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeContainer
    },
    {
      path: '/shop',
      name: 'Shop',
      component: ShopContainer
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchContainer
    },
    {
      path: '/member',
      name: 'Member',
      component: MemberContainer
    },
    {
      path: '/home/newslist',
      name: 'Newslist',
      component: Newslist
    },
    {
      path: '/home/newsinfo/:id',
      name: 'Newsinfo',
      component: Newsinfo,
      props: true // 启用 props 来接收 路由的参数
    },
    {
      path: '/home/photolist',
      name: 'photoList',
      component: photoList,
    }
  ],
  linkActiveClass: 'mui-active'
})
