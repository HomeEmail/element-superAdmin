
import promise from 'es6-promise';
promise.polyfill();

import axios from 'axios';
import store from '../store';

var instance = axios.create({
  timeout: 60 * 1000
});
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//请求前拦截处
instance.interceptors.request.use(function(config){ 
  if(store.state.userInfo.token){
    config.headers.Authorization = 'Bearer '+store.state.userInfo.token;
  }
  return config;
},function(err){
  return Promise.reject(err);
});

export const getData = function (url, param, success, fail) {
  instance.get(url, {params: param})
    .then(function (response) {

      if (response.status == 200) {// && response.data.code == 1
        success(response.data);
      } else {
        fail(response.data.message);
      }
    }).catch(function (error) {
    if(error.response.status==405){//无权限操作
      fail('抱歉，您无权限做此操作！');
      return ;
    }
    console.log("getData error  "+error);
    fail('网络连接失败:'+url);
    if(error.response.status==401){//登陆验证不通过
      window.location.href='./#/Login';
      return ;
    }
  });
}

export const postDataWithForm = function (url, param, success, fail) {//param:query字符串
  instance.post(url, param)
    .then(function (response) {
      if (response.status == 200) {// && response.data.code == 1
        success(response.data);
      } else {
        fail(response.data.message);
      }
    })
    .catch(function (error) {
      if(error.response.status==405){//无权限操作
        fail('抱歉，您无权限做此操作！'+error);
        return ;
      }
      console.log("postDataWithForm error  "+error);
      fail('网络连接失败:'+url+error);
      if(error.response.status==401){//登陆验证不通过
        window.location.href='./#/Login';
        return ;
      }
    });
}


export const postDataWithJson = function(url,param,success,fail){//param:object对象
  instance({
      method:'post',
      url:url,
      params: {
      },
      data: param,//for post
      headers: {
        'Content-Type': 'application/json'
      },
      responseType:'json' //'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  })
  .then((response) => {
      if(response.status==200){//请求成功 //&&response.data.code==1
        success(response.data);
      }else{
        fail(response.data.message);
      }
  })
  .catch((error) => {
    console.log("postDataWithJson error  "+error);
    if(error.response.status==401){//登陆验证不通过
      window.location.href='./#/Login';
      return ;
    }
    if(error.response.status==405){//无权限操作
      fail('抱歉，您无权限做此操作！'+error);
      return ;
    }
    fail('网络连接失败:'+url+error);
  });
};


export async function getDataSync(url, param) {
  return new Promise((resolve,reject)=>{
    instance.get(url, {params: param})
    .then(function (response) {
      if (response.status == 200) { // && response.data.code == 1
        resolve(response.data);
      } else {
        reject(response.data.message);
      }
    }).catch(function (error) {
      console.log("getDataSync error  "+error);
      if(error.response.status==401){//登陆验证不通过
        window.location.href='./#/Login';
        return ;
      }
      if(error.response.status==405){//无权限操作
        reject('抱歉，您无权限做此操作！'+error);
        return ;
      }
      reject('网络连接失败:'+url+error);
    });
  });
  
}

export async function postDataWithFormSync(url,param){//param:query字符串
  return new Promise((resolve,reject)=>{
    instance.post(url,param)
    .then(function (response) {
      if (response.status == 200) {
        resolve(response.data);
      } else {
        reject(response.data.message);
      }
    })
    .catch(function (error) {
      console.log("postDataWithFormBysync",error);
      if(error.response.status==401){//登陆验证不通过
        window.location.href='./#/Login';
        reject('网络连接失败:'+url+error);
        return;
      }
      if(error.response.status==405){//无权限操作
        reject('抱歉，您无权限做此操作！'+error);
        return;
      }
      reject('网络连接失败:'+url+error);
    });
  });
  
}



export async function postDataWithJsonSync(url,param){//param:object对象
  return new Promise((resolve,reject)=>{
    instance({
      method:'post',
      url:url,
      params: {
      },
      data: param,//for post
      headers: {
        'Content-Type': 'application/json'
      },
      responseType:'json' //'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    })
    .then((response) => {
        if(response.status==200){//请求成功 //&&response.data.code==1
          resolve(response.data);
        }else{
          reject(response.data.message);
        }
    })
    .catch((error) => {
      console.log("postDataWithJsonAsync error  "+error);
      if(error.response.status==401){//登陆验证不通过
        window.location.href='./#/Login';
        return ;
      }
      if(error.response.status==405){//无权限操作
        reject('抱歉，您无权限做此操作！'+error);
        return ;
      }
      reject('网络连接失败:'+url+error);
    });
  });
  
};
