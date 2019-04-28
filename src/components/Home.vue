<template>

<div class="layoutPage">
  <div class="layoutHeader">
    <div class="leftTopDiv">
      <img ref="logoIndex" class="logo" src="../assets/logo.png" />
      <span class="cmsName">熊猫乐园管理后台系统</span>
    </div>
    <div class="rightTopDiv">
      <span class="userName">您好, {{userName}}</span>
      <el-button type="text" @click="handleExit()">退出</el-button>
    </div>
  </div>

  <div class="layoutCenter">
    <div class="asideBox">
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
    </div>
    <div class="mainBox">
      <router-view></router-view>
    </div>
  </div>

</div>

  
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
 
  html,body,.app,#app{
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }

  
  
</style>


<style scoped >
  
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
    padding-left:200px;
    position: absolute;
    left: 0px;
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
    display: inline-block;
    line-height: 60px;
    padding-right:20px;
  }
  .rightTopDiv .userName{
    font-size: 13px;
    color: #666;
    padding: 0px 20px;
  }



</style>
