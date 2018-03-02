import axios from 'axios'


// axios配置
axios.defaults.timeout = 50000;
// axios.defaults.baseURL = 'http://10.10.17.109:31312/' // 内网地址
//axios.defaults.baseURL = 'http://mk.yonyou.com/apimas/' // 外网地址

// http request 拦截器
axios.interceptors.request.use(
  req => {
  /*  if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${store.state.token}`;
    }*/
  //  req.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    return req
  },
  err => {

     console.log('请求错误');
    return Promise.reject(err)
  }
);

// http response 拦截器
axios.interceptors.response.use(
  res => {

    return res
  },
  err => {

    if (err.response) {
      switch (err.response.status) {
        case 401:

           console.log('401,未授权');
          break;
        case 404:

           console.log('404,接口未找到');
          break;
        case 405:

           console.log('405,不支持的请求方式');
          break;
        case 500:
           console.log('500,服务器错误');
          break;
        case 502:
           console.log('502,网关错误');

          break
      }
    }
    return Promise.reject(err.response.data)
  }
);

export default axios
