
import ContentIndex from '@/components/ContentIndex'
import Home from '@/components/Home'
import NotFound from '@/view/404'

export default [
  {
    path: '/home',
    component: Home,//这有个router-view ,孩子节点才生效
    children: [ // 从这里开始最多两层

      {
        path:'/test',
        component:()=>import('@/view/test/test1'),
        name:'test1',
        meta:{
          title:'测试页1',
        },
      },

      {
        path:'/formDemo',
        component:r => require.ensure([], () => r(require('@/components/dynamicForm/formDemo')), 'formDemo'),
        name:'formDemo',
        meta:{
          title:'动态表单demo',
        },
      },
      
      {  //熊猫首页
        path: '/ZnHomeIndex',
        component: ContentIndex,//这有个router-view,孩子节点才生效
        meta:{
          title:'TV首页管理',
          icon:'el-icon-menu',
        },
        children: [
          {
            path: '/ZnHomeIndex/home',
            component: ()=>import('@/view/znHome/znHome'),
            name:'znHome',
            meta:{
              title:'熊猫首页',
              hideAtAsideMenu:false,
              hideAtBreadcrumbsNav:true,
              needCache:true,
              hideAtTabNav:true,
            },
          },
        ]
      },
      
      {
        path:'/welcome',
        component:()=>import('@/view/welcome'),
        name:'welcome',
        meta:{
          title:'欢迎页',
          icon:'el-icon-service',
        },
      },
    ]
  },
  {
    path: '/login',
    component: ()=>import('@/view/users/login'),
    name:'login',
    meta:{
      hideAtAsideMenu:true,
      hideAtBreadcrumbsNav:true,
      needCache:true,
      hideAtTabNav:true,
    },
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    meta:{
      hideAtAsideMenu:true,
      hideAtBreadcrumbsNav:true,
      needCache:true,
      hideAtTabNav:true,
    },
  },
  {
    path: '*',
    redirect: {path: '/login'}
  }
];
