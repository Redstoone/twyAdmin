import qs from 'qs'
import service from './fetch.js'

export default {
  login (params) {
    return service(`/api/login`, qs.stringify(params), 'POST')
  }
}
