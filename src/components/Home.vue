<template>

<div class="layoutPage">
  <div class="layoutHeader">
    <div class="leftTopDiv">
      <img ref="logoIndex" class="logo" src="../assets/logo.png" />
      <span class="cmsName">管理后台系统</span>
    </div>
    <div class="rightTopDiv">
      <span class="userName">您好, {{userInfo.userName}}</span>
      <el-button type="text" @click="handleExit()">退出</el-button>
    </div>
  </div>

  <div class="layoutCenter">
    <div class="asideBox" :style="asideBoxCss">
      <el-menu @open="handleOpen" @close="handleClose" :router="true" :collapse="isCollapse" :default-active="menuDefaultActive">
        <aside-menu-item :routes="routes"></aside-menu-item>
      </el-menu>

      <div class="asideCollapseBtLine" @click="collapseBtClick"><i :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"></i></div> <!-- el-icon-d-arrow-right -->
    </div>
    <div class="topBreadcrumb" :style="mainBoxCss">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
        <el-breadcrumb-item v-for="(item,index) in breadcrumbData" :key="item" :style="{fontWeight:index<(breadcrumbData.length-1)?'bold':'normal'}">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="topTab" :style="mainBoxCss">
      <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
        <el-tab-pane
          v-for="(item) in editableTabs"
          :key="item.meta.uniqueName"
          :label="item.meta.uniqueName"
          :name="item.meta.uniqueName"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="mainBox" :style="mainBoxCss">
      <keep-alive :include="cacheRoutes"><router-view @close-page="removeTabByRoute"></router-view></keep-alive>
    </div>
  </div>

</div>

  
</template>

<script>
  import routesConfig from '@/router/config.js';
  import asideMenuItem from './asideMenuItem.vue';
  import { mapState,mapMutations,mapGetters,mapActions } from 'vuex';
  import {
    LogoutUrl
  } from "../js/url";

  export default {
    name: 'Home',
    data(){
      return {
        menuDefaultActive: '', //'/ZnHomeIndex/ZnHomeAll'
        routes:routesConfig,
        asideWidth:250,
        isCollapse: false,
        editableTabsValue:'',//当前的tab
        editableTabs: [
          //route对象
        ],
        lastRoute:{},
      }
    },
    computed:{
      ...mapState(['userInfo']),
      breadcrumbData(){
        let ary=[];
        this.$route.matched.forEach((v,i)=>{
          if(!!v.meta.title) ary.push(v.meta.title);
        });
        return ary;
      },
      asideBoxCss(){
        return {
          width:this.asideWidth+'px',
        };
      },
      mainBoxCss(){
        return {
          left:this.asideWidth+'px',
        };
      },
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
    components:{
      asideMenuItem,
    },
    watch:{
      '$route': function (to, from) {
        console.log('to',to,'from',from);
        console.log('editableTabs',this.editableTabs);
        this.lastRoute=from;
        this.addRouteToTabs({...to});
        this.menuDefaultActive=to.path;
      
      }
    },
    created(){
      console.log('Home.vue created route',this.$route);
      this.addRouteToTabs({...this.$route});

    },
    mounted(){
      
      this.menuDefaultActive=this.$route.path;
      console.log('menuDefaultActive',this.menuDefaultActive);
    },
    activated(){

    },
    destroyed(){

    },
    methods:{
      createTabFromRoute(route){
        let obj={query:{},params:{},meta:{},name:null};
        let {query,params,meta,name}=route;
        obj.name=name;
        for(let key in query){
          if(query.hasOwnProperty(key)) obj.query[key]=query[key];
        }
        for(let k in params){
          if(params.hasOwnProperty(k)) obj.params[k]=params[k];
        }
        for(let kk in meta){
          if(meta.hasOwnProperty(kk)) obj.meta[kk]=meta[kk];
        }
        return obj;
      },
      getRouteUniqueName(route){
        let {query,params,name,meta} = {...route};
        let strAry=[];
        strAry.push(meta.title||name);
        for(let key in query){
          strAry.push(query[key]);
        }
        for(let k in params){
          strAry.push(params[k]);
        }
        console.log('getRouteUniqueName',strAry.join('|'));
        return strAry.join('|');
      },
      checkRouteUniqueNameIsInTabs(uniqueName){
        let b=false;
        this.editableTabs.forEach((v,i)=>{
          if(v.meta.uniqueName==uniqueName){
            b=true;
          }
        });
        return b;
      },
      addRouteToTabs(to){
        let obj=this.createTabFromRoute(to);//JSON.parse(JSON.stringify(to));//JSON.parse(JSON.stringify(target));
        let name=this.getRouteUniqueName(obj);
        this.editableTabsValue=name;

        if(this.checkRouteUniqueNameIsInTabs(name)) return 0;
        let too={...obj};
        too.meta.uniqueName=name;
        //too.name=name;
        this.editableTabs.push(too);
      },
      clickTab(tab){
        console.log('clickTab',tab,'editableTabsValue',this.editableTabsValue);
        
        let targetName=this.editableTabsValue;//tab.name;
        if(targetName==this.$route.meta.uniqueName){
          console.log('不用切换');
          return 0;
        };

        let tabs = this.editableTabs;

        let nextTab=null;
        
        tabs.forEach((tab, index) => {
          if (tab.meta.uniqueName === targetName) {
            nextTab = tabs[index];
          }
        });
        
        if(!!!nextTab) return;

        this.$router.push({...nextTab});
      },
      removeTab(targetName,isGoBack) {
        let tabs = this.editableTabs;
        if(!!!tabs||tabs.length<=1) return;//规定最后一个tab不能移除
        let nextTab=null;
        if(!isGoBack){
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.meta.uniqueName === targetName) {
                nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.meta.uniqueName;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
        }else{
          nextTab=this.createTabFromRoute(this.lastRoute);
        }
        this.editableTabs = tabs.filter(tab => tab.meta.uniqueName !== targetName);

        this.$router.push({...nextTab});
      },
      removeTabByRoute(route){ //关闭指定路由，比如关闭当前路由 给路由视图的事件 close-page 关闭后应当返回上一个路由
        this.removeTab(this.getRouteUniqueName(route),true);
      },
      collapseBtClick(){
        this.isCollapse=!this.isCollapse;
        this.asideWidth=this.isCollapse?'64':'250';
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleExit(index, row) {
        //console.log(index, row);
        let _this=this;
       
        
      },
    },
  };
</script>


<style lang="less">
 
  html,body,.app,#app{
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  
  .layoutPage .el-submenu .el-menu-item,.layoutPage .el-menu-item,.layoutPage .el-submenu__title,.layoutPage .el-submenu .el-submenu__title{
    white-space: normal;
    height: auto;
    line-height: normal;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .layoutPage .el-menu--collapse {
    .el-submenu .el-menu-item,.el-menu-item,.el-submenu__title,.el-submenu .el-submenu__title{
      height: 56px;
      line-height: 56px;
      padding-top: 0px;
      padding-bottom: 0px;
      padding: 0px 20px;
      white-space: nowrap;
      .submenuTitle{
        padding-left: 64px;
        display: none;
      }
    }
    .el-submenu__icon-arrow {
      right: 10px;
      margin-top: -4px;
    }
  }
  
</style>


<style scoped lang="less" >
  
  .asideCollapseBtLine{
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
  }
  
  .el-submenu__title span{
    line-height: 20px;
  }

  .layoutPage{
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .layoutHeader{
    border-bottom: 1px #ddd solid;
    height: 60px;
    overflow: hidden;
    position: relative;
    z-index: 3;
  }
  .layoutCenter{
    position: absolute;
    top: 61px;
    left: 0px;
    width:100%;
    bottom:0px;
  }
  .asideBox{
    height: 100%;
    width:200px;
    border-right: solid 1px #e6e6e6;
    position: relative;
    z-index: 2;
    overflow:auto;
    transition: all 300ms;
    box-shadow: 0px 4px 6px 0px #dddddd;
  }
  .topBreadcrumb{
    left:200px;
    position: absolute;
    right: 0px;
    top:0px;
    height: 40px;
    z-index: 1;
    padding: 0px 20px;
    transition: all 300ms;
    .el-breadcrumb{
      line-height: 40px;
      font-size: 15px;
    }
  }
  .topTab{
    left:200px;
    position: absolute;
    right: 0px;
    top:40px;
    height: 41px;
    z-index: 1;
    transition: all 300ms;
  }
  .mainBox{
    overflow:auto;
    left:200px;
    position: absolute;
    right: 0px;
    top:81px;
    bottom: 0px;
    z-index: 1;
    transition: all 300ms;
  }
  .el-menu{
    border-right:0px;
  }

  .leftTopDiv {
    /*background: #2f6fad;*/
    
    display: inline-block;
    line-height: 60px;
    vertical-align: middle;
    padding-left:20px;
  }

  .leftTopDiv .logo{
    vertical-align: middle;
    height: 40px;
    box-shadow: 0px 0px 10px 1px #ccc;

  }

  .leftTopDiv .cmsName {
    font-size: 22px;
    color: #0e83fc;
    vertical-align: middle;
    padding: 0px 10px;
  }

  .rightTopDiv {
    float: right;
    line-height: 60px;
    padding-right:20px;
  }
  .rightTopDiv .userName{
    font-size: 13px;
    color: #666;
    padding: 0px 20px;
  }



</style>
