/**
 * Created by fute on 17/4/11.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const fileProfix = {
  imageProfix: "",    //图片前缀
  audioProfix: ""     //音频前缀
};
const userInfo = {
  userName:''
};
const todos = [
  { id: 1, text: '...', done: true },
  { id: 2, text: '...', done: false }
];

const state = { //组件上用mapState
  fileProfix, //文件前缀
  userInfo,
  todos,
};

/* 从本地存储读取数据 */
for (var item in state) {
  localStorage.getItem(item) ? state[item] = JSON.parse(localStorage.getItem(item)) : false;
}

//要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法 如store.commit('setFileProfix')
//可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）
//mutation 必须是同步函数
const mutations = { //组件上用 mapMutations
  setFileProfix(state, payload) {
    Object.assign(state.fileProfix, payload);
    localStorage.setItem('fileProfix', JSON.stringify(payload));
  },

};
//getters可以认为是 store 的计算属性,接受 state 作为其第一个参数,Getter 也可以接受其他 getter 作为第二个参数
//可以以属性的形式访问这些值 如store.getters.doneTodos;在任何组件中使用它 this.$store.getters.doneTodosCount
//getter 返回一个函数，来实现给 getter 传参
const getters = { //mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
  doneTodos: state => {
    return state.todos.filter(todo => todo.done);
  },
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length;
  },
};

export default  new Vuex.Store({
  state,
  mutations,
  getters,
});
