/**
 * Created by fute on 17/4/11.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const fileProfix = {
  imageProfix: "",    //图片前缀
  audioProfix: ""     //音频前缀
}
const userInfo = {
  userName:''
}

const state = {
  fileProfix: fileProfix, //文件前缀
  userInfo: userInfo,
}

/* 从本地存储读取数据 */
for (var item in state) {
  localStorage.getItem(item) ?
    state[item] = JSON.parse(localStorage.getItem(item)) : false;
}

const mutations = {
  setFileProfix(state, data) {
    Object.assign(state.fileProfix, data);
    localStorage.setItem('fileProfix', JSON.stringify(data));
  }
}

export default  new Vuex.Store({
  state,
  mutations
})
