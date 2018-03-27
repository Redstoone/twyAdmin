import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import SchoolList from '@/views/admin/schoolList'
// import TeacherList from '@/views/admin/teacherList'
import ActivityList from '@/views/admin/activityList'
import NewsList from '@/views/admin/newsList'
import OrgSetting from '@/views/org/orgSetting'
import Course from '@/views/org/orgCourse'
import Teacher from '@/views/org/orgTeacher'
import Clazz from '@/views/org/orgClazz'
import Baoming from '@/views/org/orgBaoming'
// import TeacherClazz from '@/views/teacher/teacherClazz'
import StudentArrive from '@/views/teacher/studentArrive'
import SchoolReport from '@/views/teacher/schoolReport'

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
      path: '/',
      component: Home,
      name: '课程设置',
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
      type: 'orgadmin',
      children: [{
        path: '/org/setting',
        name: '网点设置',
        type: 'orgadmin',
        component: OrgSetting
      }]
    },
    {
      path: '/',
      component: Home,
      name: '教学管理',
      type: 'orgadmin',
      children: [
        {
          path: '/org/course',
          name: '课程',
          type: 'orgadmin',
          component: Course
        },
        {
          path: '/org/teacher',
          name: '老师',
          type: 'orgadmin',
          component: Teacher
        },
        {
          path: '/org/class',
          name: '班级',
          type: 'orgadmin',
          component: Clazz
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '报名管理',
      type: 'orgadmin',
      children: [
        {
          path: '/org/signup',
          name: '微信报名学生处理',
          type: 'orgadmin',
          component: Baoming
        },
        {
          path: '/org/order',
          name: '微信预约体验学生处理',
          type: 'orgadmin',
          component: Baoming
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '班级管理',
      type: 'teacher',
      children: [
        // {
        //   path: '/clazz/1',
        //   name: '芭蕾A班',
        //   type: 'teacher',
        //   component: TacherClazz
        // },
        // {
        //   path: '/clazz/2',
        //   name: '芭蕾B班',
        //   type: 'teacher',
        //   component: TacherClazz
        // }
      ]
    },
    {
      path: '/student/arrive',
      name: '点到',
      hidden: true,
      type: 'teacher',
      component: StudentArrive
    },
    {
      path: '/student/report',
      name: '成绩单',
      hidden: true,
      type: 'teacher',
      component: SchoolReport
    }
  ]
})

// let registerRouteFresh = true
router.beforeEach((to, from, next) => {
  // if (registerRouteFresh) {
  //   router.addRoutes(routes)
  //   store.commit('setRuleRoutes', _routes)
  //   registerRouteFresh = false
  // }
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
