import axios from 'axios'
import qs from 'qs'
import vue from 'vue'
axios.defaults.timeout = 15000; //响应时间
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
// axios.defaults.baseURL = '你的接口地址';   //配置接口地址

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  vue.$vux.toast.show({
    text: '错误的传参',
    type: 'cancel'
  });
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  //对响应数据做些事
  if (!res) {
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  return Promise.reject(error);
});

//返回一个Promise(发送post请求)
function post(url, params, mConfig) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
  if (params) {
    params.device_uuid = localStorage.getItem('device_uuid') || '123';;
    params.device_model = localStorage.getItem('device_model') || '123';;
  } 
  return new Promise((resolve, reject) => {
    axios.post(url, params, mConfig)
      .then(response => {
        let failureCallback = mConfig ? mConfig.failureCallback : null;
        let alertErr = mConfig ? mConfig.alertErr : null;
        let $loading = document.getElementById('JS_loading');
        $loading.style.display = 'none';
        if (response.data.code == 401) {
          vue.$vux.toast.show({
            text: response.data.msg,
            type: 'cancel'
          });
          vue.$router.push({
            path: '/login'
          });
          return false;
        }
        if (response.data.code !== 200) {
          if (failureCallback) {
            failureCallback(response.data);
          }
          if (alertErr !== 'no') {
            if(response.data.msg=='catalog id 不能为空。'){
              vue.$vux.toast.show({
                text: '请先新建收藏夹！',
                type: 'cancel'
              }); 
            }else{
              vue.$vux.toast.show({
                text: response.data.msg,
                type: 'cancel'
              });

            }
          }
          return false;
        }
        resolve(response.data);
      }, err => {
        console.log(err);
        reject(err);
      })
      .catch((error) => {
        console.log(error);
        reject(error)
      })
  })
}
//返回一个Promise(发送put请求)
function put(url, params, mConfig) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
  if (params) {
    params.device_uuid = localStorage.getItem('device_uuid') || '123';;
    params.device_model = localStorage.getItem('device_model') || '123';;
  } 
  return new Promise((resolve, reject) => {
    axios.put(url, params, mConfig)
      .then(response => {
        let failureCallback = mConfig ? mConfig.failureCallback : null;
        let alertErr = mConfig ? mConfig.alertErr : null;
        let $loading = document.getElementById('JS_loading');
        $loading.style.display = 'none';
        if (response.data.code == 401) {
          vue.$router.push({
            path: '/login'
          });
          return false;
        }
        if (response.data.code !== 200) {
          if (failureCallback) {
            failureCallback(response.data);
          }
          if (alertErr !== 'no') {
            vue.$vux.toast.show({
              text: response.data.msg,
              type: 'cancel'
            });
          }
          return false;
        }
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}
////返回一个Promise(发送get请求)
function get(url, param, mConfig) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
  if (param) {
    param.device_uuid = localStorage.getItem('device_uuid') || '123';;
    param.device_model = localStorage.getItem('device_model') || '123';;
  } 
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: param
      })
      .then(response => {
        let isJump = mConfig ? mConfig.jump : null;
        let failureCallback = mConfig ? mConfig.failureCallback : null;
        let alertErr = mConfig ? mConfig.alertErr : null;
        let $loading = document.getElementById('JS_loading');
        $loading.style.display = 'none';
        if (response.data.code == 401) {
          if (isJump == 'no') { //判断是否登录 不跳转
            resolve(response.data);
          } else {
            vue.$router.push({
              path: '/login'
            });
            return false;
          }
        }
        if (response.data.code !== 200) {
          if (alertErr !== 'no') {
            vue.$vux.toast.show({
              text: response.data.msg,
              type: 'cancel'
            });
          }
          return false;
        }
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
////返回一个Promise(发送delete请求)
function del(url, param, mConfig) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
  if (param) {
    param.device_uuid = localStorage.getItem('device_uuid') || '123';;
    param.device_model = localStorage.getItem('device_model') || '123';;
  } 
  return new Promise((resolve, reject) => {
    axios.delete(url, {
        params: param
      })
      .then(response => {
        let failureCallback = mConfig ? mConfig.failureCallback : null;
        let alertErr = mConfig ? mConfig.alertErr : null;
        let $loading = document.getElementById('JS_loading');
        $loading.style.display = 'none';
        if (response.data.code == 401) {
          vue.$router.push({
            path: '/login'
          });
          return false;
        }
        if (response.data.code !== 200) {
          if (alertErr !== 'no') {
            vue.$vux.toast.show({
              text: response.data.msg,
              type: 'cancel'
            });
          }
          return false;
        }
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  get,
  post,
  put,
  del
}
