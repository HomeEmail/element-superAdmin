<template>
  <keep-alive :include="cacheRoutes"><router-view @close-page="removeTabByRoute"></router-view></keep-alive>
</template>
<script>
import routesConfig from '@/router/config.js';
export default {
  name:'contentRouter',
  data() {
    return {
      routes:routesConfig,
    }
  },
  computed: {
    cacheRoutes(){
      let ary=[];
      let tempFn=(a)=>{
        a.forEach((v,i)=>{
          if(!!v.meta&&!!v.meta.needCache){
            !!v.name&&ary.push(v.name);
          }
          if(!!v.children&&v.children.length>0){
            tempFn(v.children);
          }
        });
      };
      tempFn(this.routes);
      console.log('cacheRoutes',ary);
      return ary;
    },
  },
  methods: {
    removeTabByRoute(route){ //关闭指定路由，比如关闭当前路由 给路由视图的事件 close-page 这里传给上一级路由视图
      this.$emit('close-page',route);
    },
  },
  
}
</script>

