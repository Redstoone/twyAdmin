import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import SchoolList from '@/views/admin/schoolList'
import TeacherList from '@/views/admin/teacherList'
import ActivityList from '@/views/admin/activityList'
import NewsList from '@/views/admin/newsList'
import OpenList from '@/views/admin/OpenList'
import CourseList from '@/views/admin/CourseList'
import OrgSetting from '@/views/org/orgSetting'
import Course from '@/views/org/orgCourse'
import Teacher from '@/views/org/orgTeacher'
import Clazz from '@/views/org/orgClazz'
import Baoming from '@/views/org/orgBaoming'
import Yuyue from '@/views/org/orgYuyue'
import OrgReport from '@/views/org/orgReport'
import TeacherClazz from '@/views/teacher/teacherClazz'
import StudentArrive from '@/views/teacher/studentArrive'
import SchoolReport from '@/views/teacher/schoolReport'
import api from '../api/index.js'

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
        { path: '/school/list', component: SchoolList, meta: { type: 'superadmin' }, name: '学校网点管理' },
        { path: '/school/teacher', component: TeacherList, meta: { type: 'superadmin' }, name: '名师团队' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '活动公告管理',
      type: 'superadmin',
      children: [
        {
          path: '/news',
          component: NewsList,
          meta: { type: 'superadmin' },
          name: '活动公告'
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '艺星之路管理',
      type: 'superadmin',
      children: [
        { path: '/activity', component: ActivityList, meta: { type: 'superadmin' }, name: '艺星之路' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '课程设置',
      type: 'superadmin',
      children: [
        { path: '/course/open', component: OpenList, meta: { type: 'superadmin' }, name: '公开课内容编辑' },
        { path: '/course/intro', component: CourseList, meta: { type: 'superadmin' }, name: '课程介绍编辑' }
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
        meta: { type: 'orgadmin' },
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
          meta: { type: 'orgadmin' },
          component: Course
        },
        {
          path: '/org/teacher',
          name: '老师',
          type: 'orgadmin',
          meta: { type: 'orgadmin' },
          component: Teacher
        },
        {
          path: '/org/class',
          name: '班级',
          type: 'orgadmin',
          meta: { type: 'orgadmin' },
          component: Clazz
        }
      ]
    },
    {
      path: '/org/report',
      name: '成功单',
      hidden: true,
      type: 'orgadmin',
      meta: { type: 'orgadmin' },
      component: OrgReport
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
          meta: { type: 'orgadmin' },
          component: Baoming
        },
        {
          path: '/org/order',
          name: '微信预约体验学生处理',
          type: 'orgadmin',
          meta: { type: 'orgadmin' },
          component: Yuyue
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '班级管理',
      type: 'teacher',
      children: [
        {
          path: '/student/class',
          name: '班级管理',
          hidden: true,
          type: 'teacher',
          meta: { type: 'teacher' },
          component: TeacherClazz
        }
      ]
    },
    {
      path: '/student/arrive',
      name: '点到',
      hidden: true,
      type: 'teacher',
      meta: { type: 'teacher' },
      component: StudentArrive
    },
    {
      path: '/student/report',
      name: '成绩单',
      hidden: true,
      type: 'teacher',
      meta: { type: 'teacher' },
      component: SchoolReport
    }
  ]
})

// let registerRouteFresh = true
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (to.path === '/sso') {
    api.login({
      username: 'admin',
      password: '123456'

    }).then((res) => {
      if (res.status === 'succ') {
        this.loading = false
        let {
          message,
          code,
          data
        } = res
        if (code !== 20000) {
          this.$message({
            message: message,
            type: 'error'
          })
        } else {
          sessionStorage.setItem('user', JSON.stringify(data))
          if (data.role === 'superadmin') {
            this.$router.push({
              path: '/school/list'
            })
          } else if (data.role === 'orgadmin') {
            this.$router.push({
              path: '/org/setting'
            })
          } else if (data.role === 'teacher') {
            this.$router.push({
              path: '/student/class'
            })
          }
        }
      } else {
        this.loading = false
        this.$notify({
          message: res.message,
          type: 'error',
          duration: 0
        })
      }
    })

  } else if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else if (user && to.meta.type !== user.role) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
