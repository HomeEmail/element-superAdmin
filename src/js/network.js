/**
 * Created by fute on 17/4/5.
 */
import promise from 'es6-promise';
promise.polyfill();

import axios from 'axios';
import store from '../store';

var instance = axios.create({
  timeout: 60 * 1000
});
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.request.use(function(config){
  if(store.state.userInfo.token){
    config.headers.Authorization = 'Bearer '+store.state.userInfo.token;
  }
  return config;
},function(err){
  return Promise.reject(err);
});

export const getCQeduData = function (context, url, param, success, fail) {
  instance.get(url, {params: param})
    .then(function (response) {

      if (response.status == 200 && response.data.code == 1) {
        success(response.data);
      } else {
        fail(response.data.message);
      }
    }).catch(function (error) {
    if(error.response.status==405){//无权限操作
      fail('抱歉，您无权限做此操作！');
      return ;
    }
    console.log("getCQeduData error  "+error);
    fail('网络连接失败:'+url);
    if(error.response.status==401){//登陆验证不通过
      window.location.href='./#/Login';
      return ;
    }
  });
}

export const postCQeduData = function (context, url, param, success, fail) {
  instance.post(url, param)
    .then(function (response) {
      if (response.status == 200 && response.data.code == 1) {
        success(response.data);
      } else {
        fail(response.data.message);
      }
    })
    .catch(function (error) {
      if(error.response.status==405){//无权限操作
        fail('抱歉，您无权限做此操作！');
        return ;
      }
      console.log("postCQeduData error  "+error);
      fail('网络连接失败:'+url);
      if(error.response.status==401){//登陆验证不通过
        window.location.href='./#/Login';
        return ;
      }
    });
}

export async function postDataWithFormBysync(context,url,param){
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
      if(error.response.status==405){//无权限操作
        reject('抱歉，您无权限做此操作！'+error);
      
      }
      console.log("postDataWithFormBysync",error);
      if(error.response.status==401){//登陆验证不通过
        window.location.href='./#/Login';
        reject('网络连接失败:'+url+error);
      }
      reject('网络连接失败:'+url+error);
    });
  });
  
}

export const postSaveData = function(context,url,param,success,fail){
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
      if(response.status==200&&response.data.code==1){//请求成功
          success(response.data);
      }else{
        fail(response.data.message);
      }
  })
  .catch((error) => {
    if(error.response.status==405){//无权限操作
      fail('抱歉，您无权限做此操作！');
      return ;
    }
    console.log("postSaveData error  "+error);
    fail('网络连接失败:'+url);
    if(error.response.status==401){//登陆验证不通过
      window.location.href='./#/Login';
      return ;
    }
  });
};



