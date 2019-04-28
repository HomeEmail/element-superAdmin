import Vue from 'vue'
import Router from 'vue-router'

import routes from './config.js'

//import Login from '@/components/users/Login'
//import formDemo from '@/components/dynamicForm/formDemo'


//熊猫Linux首页
// import ZnHomeAdd from '@/components/znHome/ZnHomeAdd'
// import ZnHomeAll from '@/components/znHome/ZnHomeAll'
// import ZnHomeRecAdd from '@/components/znHome/ZnHomeRecAdd'

// r就是resolve// 路由也是正常的写法 这种是官方推荐的写的 按模块划分懒加载 
//第一个参数是个数组，标明依赖的模块，这些会提前加载，第二个是回调函数，在这个回调函数里面的require的文件会被单独打包成一个chunk,不会和主文件打包在一起，这样就生成了两个chunk,第一次加载时只加载主文件，当点击时就会加载单独打包的chunk。
// const ZnHomeAdd = r => require.ensure([], () => r(require('../components/znHome/ZnHomeAdd')), 'ZnHomeAdd');
// const ZnHomeAll = r => require.ensure([], () => r(require('../components/znHome/ZnHomeAll')), 'ZnHomeAll');
// const ZnHomeRecAdd = r => require.ensure([], () => r(require('../components/znHome/ZnHomeRecAdd')), 'ZnHomeRecAdd');



//欢迎页
//import Welcome from '@/components/welcome'

//import test1 from '@/components/test/test1'
//const test1 = r => require.ensure([], () => r(require('@/components/test/test1')), 'test1');

Vue.use(Router)

export default new Router({
  mode: 'history',//hash //history模式下webpact配置 assetsPublicPath 改成 / ;hash模式下则为空
  routes
});
