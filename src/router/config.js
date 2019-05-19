
import Home from '@/components/Home'
import contentRouter from '@/components/contentRouter.vue'
import NotFound from '@/view/404'

export default [
  { 
    path: '/wc',
    component: Home,//这有个router-view,孩子节点才生效
    name:'wc',
    meta:{
      title:'欢迎',
      icon:'el-icon-service',
      hideAtAsideMenu:true,
      hideAtBreadcrumbsNav:true,
      hideAtTabNav:true,
    },
    children: [
      {
        path:'/welcome3',
        component:()=>import('@/view/welcome'),
        name:'welcome3',
        meta:{
          title:'欢迎页3',
          icon:'el-icon-service',
        },
      },
    ],
  },
  
  { 
    path: '/home2',
    component: Home,//这有个router-view,孩子节点才生效
    name:'home2',
    meta:{
      title:'TV首页管理',
      icon:'el-icon-menu',
    },
    children: [
      {
        path: '/home/panda',
        component: ()=>import('@/view/znHome/znHome'),
        name:'znHome',
        meta:{
          title:'熊猫首页熊猫首页熊猫首页熊猫首页',
          hideAtAsideMenu:false,
          hideAtBreadcrumbsNav:true,
          needCache:true,
          hideAtTabNav:true,
        },
      },

    ]
  },
  
  
  { 
    path: '/home3',
    component: Home,//这有个router-view,孩子节点才生效
    name:'home3',
    meta:{
      title:'菜单组1',
      icon:'el-icon-menu',
    },
    children: [
      {
        path:'/test',
        component:()=>import('@/view/test/test1'),
        name:'test1',
        meta:{
          title:'测试页1测试页1测试页1测试页1测试页1',
          needCache:true,
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
      {
        path:'/parentChildren',
        component:r => require.ensure([], () => r(require('@/view/parentChildren/parent')), 'parent'),
        name:'parent',
        meta:{
          title:'父子通讯demo',
        },
      },
      {
        component:contentRouter,
        path:'/contentRouter44',
        name:'contentRouter',//contentRouter组件下有孩子的，这个层级的name要和组件contentRouter里的name一样，这样孩子的缓冲打开才能生效
        meta:{
          title:'小学欧迪芬',
          icon:'el-icon-service',
          needCache:true,
        },
        children: [
          {
            path:'/welcome4',
            component:()=>import('@/view/welcome'),
            name:'welcome', //如打开里缓存 name 要和组件里的name一样才能缓存
            meta:{
              title:'欢迎页4欢迎页4欢迎页4欢迎页4欢迎页4',
              needCache:true,
              //icon:'el-icon-service',
            },
          },
        ],
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
    redirect: {path: '/login'},
    meta:{
      hideAtAsideMenu:true,
      hideAtBreadcrumbsNav:true,
      needCache:true,
      hideAtTabNav:true,
    },
  }
];
