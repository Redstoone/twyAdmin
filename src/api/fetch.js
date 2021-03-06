import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

let user = sessionStorage.getItem('user')
if (user) {
  user = JSON.parse(user)
}
const service = function (url, data, method = 'GET', headers = {}) {
  return new Promise((resolve, reject) => {
    let options = {
      'method': method,
      'url': process.env.NODE_ENV === 'production' ? 'http://api.twyxedu.com' + process.env.BASE_API + url : process.env.BASE_API + url,
      // 'url': process.env.BASE_API + url,
      'headers': headers && typeof headers === 'object' ? headers : {}
    }
    options.headers['X-Requested-Page'] = 'json'
    if (options.headers && options.headers.accesstoken) {
    } else if (user && user.accesstoken) {
      options.headers['accesstoken'] = user.accesstoken
    }
    options[method === 'GET' ? 'params' : 'data'] = data
    axios(options).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      reject(error)
    })
  })
}

export default service
