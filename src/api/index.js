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
  }
}
