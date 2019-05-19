<template>
  <keep-alive :include="cacheRoutes"><router-view></router-view></keep-alive>
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
  
}
</script>

