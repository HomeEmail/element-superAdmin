<template>
  <div class="loginBox">
    <div class="loginBg"></div>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">熊猫乐园管理后台系统</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码" @keyup.native.enter="handleSubmit2"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input type="text" v-model="ruleForm2.captcha" style="width:150px;" auto-complete="off" placeholder="验证码" @keyup.native.enter="handleSubmit2"></el-input>
        <img :src="captchaUrl" style="vertical-align: middle;" @click="reloadCaptcha()" />
      </el-form-item>
      <el-form-item style="width:100%; margin-top: 40px">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2()" :loading="logining">登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import {getCQeduData,postSaveData,postCQeduData,postDataWithFormBysync} from "../../js/network"
  import {openAlert} from "../../js/common"
  import {
    LoginUrl,
    FileProfixUrl,
    ictTestUrl,
    ictTestUrl2,
    captchaUrl
  } from "../../js/url"
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: '',
          captcha:''
        },
        rules2: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          captcha:[
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
        captchaUrl:captchaUrl,
        checked: true
      };
    },
    created: function () {
      
    },
    mounted(){
      console.log('login mounted');

      //ajax 请求测试 使用async模式 
      let param='query={"currentPage":1,"pageSize":5,"paramMap":{}}';
      let param2='';
      let _this=this;

      (async function() { //使用async到话，失败使用try catch来扑捉
        try{
          let result2=await postDataWithFormBysync(_this,ictTestUrl2,param2);
          console.log('result2 ',result2);
        }catch(err){
          console.log('result2 fail',err);
        }
        
        try{
          let result=await postDataWithFormBysync(_this,ictTestUrl,param);
          console.log('result ',result);
        }catch(err){
          console.log('result fail',err);
        }

        


      })();
      

      // postCQeduData(this,ictTestUrl2,param2,(data)=>{
      //   //success
      //   console.log('success',data);
      // },()=>{
      //   //fail
      //   console.log('fail');
      // });

      

    },
    methods: {
      getFileProfix(){
        const _this = this;
        getCQeduData(_this, FileProfixUrl, null, function (data) {
          _this.$store.state.fileProfix.audioProfix = data.audioProfix;
          _this.$store.state.fileProfix.imageProfix = data.imageProfix;
          _this.$store.commit("setFileProfix", _this.$store.state.fileProfix);
          _this.$router.push('Welcome');//去首页
        }, function (desc) {

        });
      },
      reloadCaptcha(){
        this.captchaUrl=captchaUrl+'?t='+Date.now();
      },
      handleSubmit2(ev) {
        var _this = this;
        _this.$refs.ruleForm2.validate(function (valid) {
          
          if (valid) {
            console.log('login welcome!');
            _this.logining = true;
            postSaveData(_this,LoginUrl,{
              loginName:_this.ruleForm2.account,
              passwd:_this.ruleForm2.checkPass,
              verificationCode:_this.ruleForm2.captcha
            },function(data){
              _this.$store.state.userInfo=data.data;
              _this.logining=false;
              _this.getFileProfix();
            },function(desc){
              openAlert(_this, '提示', desc, null);
            });
            
          }
        })
      }
    }
  }


</script>

<style scoped>
  .loginBox{
    height: 100%; position: relative; right: 0px; left: 0px;display: block;
  }
  .loginBg{
    background: #efefef; height: 100%;position: fixed;left: 0;top: 0;width: 100%;z-index: 0;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    position: relative;
    z-index: 1;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
    font-size: 25px;
  }

</style>
