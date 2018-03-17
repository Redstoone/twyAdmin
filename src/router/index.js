import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import SchoolList from '@/views/admin/schoolList'
import TeacherList from '@/views/admin/teacherList'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      name: '学校管理',
      iconCls: 'el-icon-message',
      type: 'superAdmin',
      children: [
        { path: '/school/list', component: SchoolList, name: '学校网点管理' }
        // { path: '/school/teacher', component: TeacherList, name: '名师团队' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '活动新闻公告管理',
      iconCls: 'el-icon-message',
      type: 'superAdmin',
      children: [
        { path: '/news/edit', component: Login, name: '活动编辑与发布' },
        { path: '/news/list', component: Login, name: '新闻公告管理' }
      ]
    },
    {
      path: '/course',
      component: Home,
      name: '课程设置',
      iconCls: 'el-icon-message',
      type: 'superAdmin',
      children: [
        { path: '/course/content', component: Login, name: '公开课内容编辑' },
        { path: '/course/intro', component: Login, name: '课程介绍编辑' }
      ]
    },

    {
      path: '/org/setting',
      name: '网点设置',
      type: 'orgAdmin',
      component: Login
    },
    {
      path: '/org/teacher',
      name: '老师',
      type: 'orgAdmin',
      component: Login
    },
    {
      path: '/org/class',
      name: '班级',
      type: 'orgAdmin',
      component: Login
    },
    {
      path: '/signup',
      name: '微信报名学生处理',
      type: 'orgAdmin',
      component: Login
    },
    {
      path: '/',
      name: '微信预约体验学生处理',
      type: 'orgAdmin',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    console.log(user)
    next()
  }
})

export default router
