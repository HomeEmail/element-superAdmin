import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/users/Login'

import ContentIndex from '@/components/ContentIndex'

import Home from '@/components/Home'

import NotFound from '@/components/404'

//熊猫Linux首页
// import ZnHomeAdd from '@/components/znHome/ZnHomeAdd'
// import ZnHomeAll from '@/components/znHome/ZnHomeAll'
// import ZnHomeRecAdd from '@/components/znHome/ZnHomeRecAdd'

// r就是resolve// 路由也是正常的写法 这种是官方推荐的写的 按模块划分懒加载 
//第一个参数是个数组，标明依赖的模块，这些会提前加载，第二个是回调函数，在这个回调函数里面的require的文件会被单独打包成一个chunk,不会和主文件打包在一起，这样就生成了两个chunk,第一次加载时只加载主文件，当点击时就会加载单独打包的chunk。
const ZnHomeAdd = r => require.ensure([], () => r(require('../components/znHome/ZnHomeAdd')), 'ZnHomeAdd');
const ZnHomeAll = r => require.ensure([], () => r(require('../components/znHome/ZnHomeAll')), 'ZnHomeAll');
const ZnHomeRecAdd = r => require.ensure([], () => r(require('../components/znHome/ZnHomeRecAdd')), 'ZnHomeRecAdd');



//欢迎页
import Welcome from '@/components/welcome'

import test1 from '@/components/test/test1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      component: Home,
      children: [
        {
          path:'/test',
          component:test1,
          children: [
            {
              path: '/test1',
              component: test1,
              children: [
                // {
                //   path: '',
                //   component: RecommendAdd
                // },
                // {
                //   path: 'RecommendAdd',
                //   component: RecommendAdd
                // }
              ]
            }
          ]
        },
        
        {  //熊猫首页
          path: '/ZnHomeIndex',
          component: ContentIndex,
          children: [
            {
              path: '',
              component: ZnHomeAll
            },
            {
              path: 'ZnHomeAll',
              component: ZnHomeAll,
              children: [
                {
                  path: 'ZnHomeRecAdd',
                  component: ZnHomeRecAdd
                }
              ]
            },
            {
              path: 'ZnHomeAdd',
              component: ZnHomeAdd
            }
          ]
        },
        
        {
          path:'/Welcome',
          component:ContentIndex,
          children:[
            {
              path: '',
              component: Welcome
            }
          ]
        },
        {
          path:'',
          component:Welcome
        }
      ]
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/404',
      component: NotFound,
      name: ''
    },
    {
      path: '*',
      redirect: {path: '/Login'}
    }
  ]
})
