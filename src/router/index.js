import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import SchoolList from '@/views/admin/schoolList'
// import TeacherList from '@/views/admin/teacherList'
import ActivityList from '@/views/admin/activityList'
import NewsList from '@/views/admin/newsList'
import OrgSetting from '@/views/org/orgSetting'

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
      type: 'superadmin',
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
      type: 'superadmin',
      children: [
        { path: '/activity',
          component: ActivityList,
          name: '活动编辑与发布'
        },
        { path: '/news', component: NewsList, name: '新闻公告管理' }
      ]
    },
    {
      path: '/course',
      component: Home,
      name: '课程设置',
      iconCls: 'el-icon-message',
      type: 'superadmin',
      children: [
        { path: '/course/content', component: Login, name: '公开课内容编辑' },
        { path: '/course/intro', component: Login, name: '课程介绍编辑' }
      ]
    },

    {
      path: '/',
      component: Home,
      name: '网点管理',
      iconCls: 'el-icon-message',
      type: 'orgadmin',
      children: [{
        path: '/org/setting',
        name: '网点设置',
        type: 'orgadmin',
        component: OrgSetting
      }]
    },
    {
      path: '/org/teacher',
      name: '老师',
      type: 'orgadmin',
      component: Login
    },
    {
      path: '/org/class',
      name: '班级',
      type: 'orgadmin',
      component: Login
    },
    {
      path: '/signup',
      name: '微信报名学生处理',
      type: 'orgadmin',
      component: Login
    },
    {
      path: '/',
      name: '微信预约体验学生处理',
      type: 'orgadmin',
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
    next()
  }
})

export default router
