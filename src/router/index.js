import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
// import NotFound from '@/views/login'

Vue.use(Router)
const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    // {
    //   path: '/404',
    //   component: NotFound,
    //   name: '',
    //   hidden: true
    // }
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
