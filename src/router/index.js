import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import User from '@/views/users/User.vue'
import Rights from '@/views/roles/Rights.vue'
import Roles from '@/views/roles/Roles.vue'
import Category from '@/views/goods/category.vue'
import GoodsList from '@/views/goods/index.vue'
import GoodsAdd from '@/views/goods/Add.vue'
import Orders from '@/views/orders/List.vue'
import { Message } from '../../node_modules/element-ui'
Vue.use(Router)
// 路由的前置守卫
const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      // 设置子组件,将来子路由的切换,是在 home 中完成
      // 子路由使用之前, home组件已加载完毕
      // 用户列表
      children: [
        {
          name: 'users',
          path: '/users',
          component: User
        },
        {
          name: 'rights',
          path: '/rights',
          component: Rights
        },
        {
          name: 'roles',
          path: '/roles',
          component: Roles
        },
        {
          name: 'category',
          path: '/categories',
          component: Category
        },
        {
          name: 'good',
          path: '/goods',
          component: GoodsList
        },
        {
          name: 'goods-add',
          path: 'goods/add',
          component: GoodsAdd
        },
        {
          name: 'orders',
          path: 'orders',
          component: Orders
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  // 判断当前访问的是否是 login,如果是直接 next
  if (to.name === 'login') {
    next()
  } else {
    // 如果没有token 返回登录
    const token = sessionStorage.getItem('token')
    // 判断 token 是否存在
    if (!token) {
      // 跳转页面
      router.push({name: 'login'})
      // 提示
      Message.warning('请先登录')
      return
    }
    next()
  }
})
export default router
