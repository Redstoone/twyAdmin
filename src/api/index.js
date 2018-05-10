import qs from 'qs'
import service from './fetch.js'

export const typewww = 'application/x-www-form-urlencoded'

export default {
  login (params) {
    return service(`/api/login`, params, 'GET')
  },

  orgListPage (params) {
    return service(`/api/org/list`, '', 'GET')
  },
  orgPub (params) {
    return service(`/api/org/pub`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgCreate (params) {
    return service(`/api/org/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgDel (params) {
    return service(`/api/org/del`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgEdit (params) {
    return service(`/api/org/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },

  teacherList (params) {
    return service(`/api/org/list`, '', 'GET')
  },
  teacherCreate (params) {
    return service(`/api/org/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  teacherDel (params) {
    return service(`/api/org/del`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  teacherEdit (params) {
    return service(`/api/org/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },

  activityList (params) {
    return service(`/api/activity/list`, params, 'GET')
  },
  activityDetail (params) {
    return service(`/api/activity/detail`, params, 'GET')
  },
  activityLinkAdd (params) {
    return service(`/api/activity/link/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  activityLinkEdit (params) {
    return service(`/api/activity/link/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  activityDel (params) {
    return service(`/api/activity/del`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  activityAdd (params) {
    return service(`/api/activity/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  activityEdit (params) {
    return service(`/api/activity/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },

  newsList (params) {
    return service(`/api/news/list`, params, 'GET')
  },
  newsDetail (params) {
    return service(`/api/news/detail`, params, 'GET')
  },
  newsLinkAdd (params) {
    return service(`/api/news/link/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  newsLinkEdit (params) {
    return service(`/api/news/link/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  newsDel (params) {
    return service(`/api/news/del`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  newsAdd (params) {
    return service(`/api/news/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  newsEdit (params) {
    return service(`/api/news/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },

  orgInfo (params) {
    let user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user.accesstoken)
    return service(`/api/org/info`, params, 'GET', { 'accesstoken': user.accesstoken })
  },
  orgCourseAdd (params) {
    return service(`/api/course/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgCourseList (params) {
    return service(`/api/course/list`, params, 'GET')
  },
  orgCourseDel (params) {
    return service(`/api/course/del`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgCourseEdit (params) {
    return service(`/api/course/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgCourseRelease (params) {
    return service(`/api/course/release`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgCourseOrder (params) {
    return service(`/api/course/order`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },

  orgTeacherAdd (params) {
    return service(`/api/teacher/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgTeacherEdit (params) {
    return service(`/api/teacher/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgTeacherList (params) {
    return service(`/api/teacher/list`, params, 'GET')
  },
  orgTeacherDel (params) {
    return service(`/api/teacher/del`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgTeacherClazz (params) {
    return service(`/api/teacher/clazz`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },

  orgClazzAdd (params) {
    return service(`/api/clazz/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgClazzEdit (params) {
    return service(`/api/clazz/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgClazzDel (params) {
    return service(`/api/clazz/del`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgClazzList (params) {
    return service(`/api/clazz/list`, params, 'GET')
  },

  orgStudentAdd (params) {
    return service(`/api/student/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgStudentDel (params) {
    return service(`/api/student/del`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgStudentList (params) {
    return service(`/api/student/list`, params, 'GET')
  },
  orgStudentExport (params) {
    return service(`/api/student/export`, params, 'GET')
  },

  orgCourseStudentList (params) {
    return service(`/api/course/student/list`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgCourseClazz (params) {
    return service(`/api/course/clazzs`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgCourseAddClazz (params) {
    return service(`/api/course/add/clazz`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  orgCourseStudentDel (params) {
    return service(`/api/course/student/del`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  studentReportSend (params) {
    return service(`/api/student/report/send`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  studentArrive (params) {
    return service(`/api/student/arrive `, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  studentReport (params) {
    return service(`/api/student/report`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  studentReportEdit (params) {
    return service(`/api/student/report/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },

  studentPayStatus (params) {
    return service(`/api/course/student/paystatus`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  studentContantStatus (params) {
    return service(`/api/course/student/contactstatus`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  teacherClazz (params) {
    return service(`/api/teacher/clazz`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },

  openCalzzAdd (params) {
    return service(`/api/show/clazz/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  openCalzzLinkAdd (params) {
    return service(`/api/show/clazz/link/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  openCalzzDel (params) {
    return service(`/api/show/clazz/del`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  openCalzzEdit (params) {
    return service(`/api/show/clazz/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  openCalzzLinkEdit (params) {
    return service(`/api/show/clazz/link/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  openCalzzList (params) {
    return service(`/api/show/clazz/list`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  openCalzzDetail (params) {
    return service(`/api/show/clazz/detail`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },

  openCourseAdd (params) {
    return service(`/api/show/course/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  openCourseDel (params) {
    return service(`/api/show/course/del`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  openCourseEdit (params) {
    return service(`/api/show/course/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  openCourseList (params) {
    return service(`/api/show/course/list`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  openCourseNumEdit (params) {
    return service(`/api/show/course/num/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },

  showTeacherList (params) {
    return service(`/api/show/teacher/list`, params, 'GET')
  },
  showTeacherDel (params) {
    return service(`/api/show/teacher/del`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  showTeacherAdd (params) {
    return service(`/api/show/teacher/add`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  showTeacherEdit (params) {
    return service(`/api/show/teacher/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  },
  showTeacherNumEdit (params) {
    return service(`/api/show/teacher/num/edit`, qs.stringify(params), 'POST', { 'Content-Type': typewww })
  }
}
