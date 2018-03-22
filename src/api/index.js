import qs from 'qs'
import service from './fetch.js'

export default {
  login (params) {
    return service(`/api/login`, qs.stringify(params), 'POST')
  },

  orgListPage (params) {
    return service(`/api/org/list`, '', 'GET')
  },
  orgCreate (params) {
    return service(`/api/org/add`, qs.stringify(params), 'POST')
  },
  orgDel (params) {
    return service(`/api/org/del`, qs.stringify(params), 'POST')
  },
  orgEdit (params) {
    return service(`/api/org/edit`, qs.stringify(params), 'POST')
  },

  teacherList (params) {
    return service(`/api/org/list`, '', 'GET')
  },
  teacherCreate (params) {
    return service(`/api/org/add`, qs.stringify(params), 'POST')
  },
  teacherDel (params) {
    return service(`/api/org/del`, qs.stringify(params), 'POST')
  },
  teacherEdit (params) {
    return service(`/api/org/edit`, qs.stringify(params), 'POST')
  },

  activityList (params) {
    return service(`/api/activity/list`, params, 'GET')
  },
  activityLinkAdd (params) {
    return service(`/api/activity/link/add`, qs.stringify(params), 'POST')
  },
  activityLinkEdit (params) {
    return service(`/api/activity/link/edit`, qs.stringify(params), 'POST')
  },
  activityDel (params) {
    return service(`/api/activity/del`, qs.stringify(params), 'POST')
  },
  activityAdd (params) {
    return service(`/api/activity/add`, qs.stringify(params), 'POST')
  },
  activityEdit (params) {
    return service(`/api/activity/edit`, qs.stringify(params), 'POST')
  }
}
