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
    return service(`/api/org/info`, params, 'GET')
  }
}
