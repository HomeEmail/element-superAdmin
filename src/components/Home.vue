<template>

<el-container>
  <el-header class="layoutHeader">
    <div class="leftTopDiv">
      <img ref="logoIndex" class="logo" src="../assets/logo.png" />
      <span class="cmsName">熊猫乐园管理后台系统</span>
    </div>
    <div class="rightTopDiv">
      <span class="userName">您好, {{userName}}</span>
      <el-button type="text" @click="handleExit()">退出</el-button>
    </div>
  </el-header>

  <el-container>
    <el-aside width="200px">
      <el-menu :default-openeds="['1','2','3','4','5']"  @open="handleOpen" @close="handleClose" :router="true" :default-active="menuDefaultActive">

        <el-menu-item index="/Welcome">
          <i class="el-icon-info"></i>
          欢迎页
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>TV维护页面</template>

          <el-menu-item index="/ZnHomeIndex/">Linux首页</el-menu-item>
          
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-service"></i>媒资</template>
          <el-menu-item-group>
            <el-menu-item index="/test">
              测试
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

  
</template>

<script>
  import {postCQeduData} from "../js/network"
  import {openAlert} from "../js/common"
  import {
    LogoutUrl
  } from "../js/url"

  export default {
    name: 'Home',
    data(){
      return {
        userName:'',
        menuDefaultActive: '' //'/ZnHomeIndex/ZnHomeAll'
      }
    },
    methods:{
      handleExit(index, row) {
        //console.log(index, row);
        let _this=this;
        postCQeduData(_this,LogoutUrl,null,function(data){
          _this.$router.push('/Login');
        },function(desc){

        });
        
      },
      handleOpen(key,keyPath){
        //console.log(key);
        //console.log(keyPath);

      },
      handleClose(key,keyPath){
        //console.log(key);
        //console.log(keyPath);
      }
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
  }
</script>


<style>
  .el-header, .el-footer {
    /*background-color: #E9EEF3;*/
    color: #222;
    text-align: center;
    overflow: hidden;
  }
  
  .el-aside {
    /*background-color: #E9EEF3;*/
    color: #222;
    text-align: left;
    
  }
  
  .el-main {
    color: #222;
    text-align: left;
    
  }
  #app,.app{
    height: 100%;
  }
  body .el-container {
    
    height: 100%;
  }
  html,body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  
</style>


<style scoped >
  
  .leftTopDiv {
    /*background: #2f6fad;*/
    float: left;
    display: inline-block;
    line-height: 60px;
    vertical-align: middle;
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
    display: inline-block;
    line-height: 60px;
  }
  .rightTopDiv .userName{
    font-size: 13px;
    color: #666;
    padding: 0px 20px;
  }

  .layoutHeader{
    border-bottom: 1px #ddd solid;
  }



</style>
