<template>

<div class="layoutPage">
  <div class="layoutHeader">
    <div class="leftTopDiv">
      <img ref="logoIndex" class="logo" src="../assets/logo.png" />
      <span class="cmsName">管理后台系统</span>
    </div>
    <div class="rightTopDiv">
      <span class="userName">您好, {{userName}}</span>
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
    <div class="mainBox" :style="mainBoxCss">
      <router-view></router-view>
    </div>
  </div>

</div>

  
</template>

<script>
  import routesConfig from '@/router/config.js';
  import asideMenuItem from './asideMenuItem.vue';

  import {
    LogoutUrl
  } from "../js/url";

  export default {
    name: 'Home',
    data(){
      return {
        userName:'',
        menuDefaultActive: '', //'/ZnHomeIndex/ZnHomeAll'
        routes:routesConfig,
        asideWidth:250,
        isCollapse: false,
      }
    },
    computed:{
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
    },
    components:{
      asideMenuItem,
    },
    methods:{
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
    watch:{
      '$route': function (to, from) {
        //console.log(to,from);
        
      }
    },
    mounted(){
      
      this.menuDefaultActive=this.$route.path;
    },
    created(){
      this.userName= 'user1';//this.$store.state.userInfo.userName;
    },
    activated(){

    },
    destroyed(){

    }
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
      }
    }
    .el-submenu__icon-arrow {
      right: 10px;
      margin-top: -4px;
    }
  }
  
</style>


<style scoped >
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
  }
  .mainBox{
    overflow:auto;
    height: 100%;
    left:200px;
    position: absolute;
    right: 0px;
    top:0px;
    z-index: 1;
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
