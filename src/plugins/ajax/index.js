/**
 * Created by licong on 2018/3/5.
 */
import axios from 'axios';
import {merge} from 'lodash'

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))
// axios.defaults.withCredentials = true;

const globalOptions = {
  withCredentials: true,
  //baseURL: window.location.protocol + '//' + window.location.host + '/',
  baseURL: 'http://192.168.212.29:3000',
  //baseURL: 'http://192.168.212.50:3000',
  // baseURL: '/api',
  timeout: 60000,
  headers: {
    'axios-header': 'axios'
  }
};

function checkStatus(response) {
  if (!response || response.status === 200 || response.status === 201 || response.status === 304) {
    return response
  }
  return {
    data: {
      code: -404,
      message: response.statusText,
      data: response.statusText
    }
  }
}

function checkCode(res) {
  if (res && res.data.code === -404) {
    alert(res.data.message)
  }
  return res
}

function checkTimeout(res) {
  console.log('checkTimeout')
  if (res && res.data.data === 'Not Login') {
    localStorage.clear()
    location.reload('/login')
    return res
  } else {
    return res
  }
}

/**
 * 对所有请求添加时间戳
 */
function convertURL(url) {
  // 获取时间戳
  // var timstamp = (new Date()).valueOf();
  // // 将时间戳信息拼接到url上
  // if (url.indexOf('?') >= 0) {
  //   url = url + '&t=' + timstamp;
  // } else {
  //   url = url + '?t=' + timstamp;
  // }
  return url;
}

export default {
  basePath () {
    return globalOptions.baseURL;
  },
  post (url, data, config) {
    let options = {};
    if (typeof config !== 'undefined') {
      options = merge(globalOptions, config);
    } else {
      options = globalOptions;
    }
    return axios.post(convertURL(url), data, options).then(checkStatus).then(checkCode).then(checkTimeout)
  },
  get (url, params, config) {
    let options = {};
    if (typeof config !== 'undefined') {
      options = merge(globalOptions, {params: params}, config)
    } else {
      options = merge(globalOptions, {params: params});
    }
    return axios.get(convertURL(url), options).then(checkStatus).then(checkCode).then(checkTimeout)
  }
}
