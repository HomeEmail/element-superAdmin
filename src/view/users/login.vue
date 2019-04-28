<template>
  <div class="loginBox">
    <div class="loginBg"></div>
    <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">管理后台系统</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input type="text" v-model="ruleForm2.captcha" style="width:150px;" auto-complete="off" placeholder="验证码" @keyup.native.enter="handleSubmit"></el-input>
        <img :src="captchaUrl" style="vertical-align: middle;" @click="reloadCaptcha()" />
      </el-form-item>
      <el-form-item style="width:100%; margin-top: 40px">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit()" :loading="logining">登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import {getData,postDataWithJson,postDataWithForm,postDataWithFormSync,postDataWithJsonSync,getDataSync} from "../../js/network"
  import {openAlert} from "../../js/common"
  import {
    LoginUrl,
    FileProfixUrl,
    ictTestUrl,
    ictTestUrl2,
    captchaUrl
  } from "../../js/url"
  export default {
    name:'login',
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: '',
          captcha:''
        },
        rules: {
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

      //this.ajaxDemo();//demo

    },
    methods: {
      async ajaxDemo(){
        //ajax 请求测试 使用async模式 
        let param='query={"currentPage":1,"pageSize":5,"paramMap":{}}';
        let param2='';
        let _this=this;

        
        //使用async到话，失败使用try catch来扑捉
        try{
          let result2=await postDataWithFormSync(ictTestUrl2,param2);
          console.log('result2 ',result2);
        }catch(err){
          console.log('result2 fail',err);
        }
        // try{
        //   let result=await postDataWithFormSync(ictTestUrl,param);
        //   console.log('result ',result);
        // }catch(err){
        //   console.log('result fail',err);
        // }

        // postDataWithForm(ictTestUrl2,param2,(data)=>{
        //   //success
        //   console.log('success',data);
        // },()=>{
        //   //fail
        //   console.log('fail');
        // });

      },
      async getFileProfix(){
        const _this = this;
        this.$router.push('welcome');//去首页 //test
        return 0;
        
        try{
          let data=await getDataSync(FileProfixUrl,null);
          //this.$store.state.fileProfix.audioProfix = data.audioProfix;//不推荐这种直接赋值更新状态
          //this.$store.state.fileProfix.imageProfix = data.imageProfix;
          this.$store.commit("setFileProfix", data);//通过提交commit来更新数据状态
          this.$router.push('welcome');//去首页
        }catch(err){
          openAlert(_this,'提示',err,null);
        }
       
      },
      reloadCaptcha(){
        this.captchaUrl=captchaUrl+'?t='+Date.now();
      },
      async handleSubmit(ev) {
        var _this = this;

        _this.getFileProfix();//test 
        return 0;

        _this.$refs.ruleForm2.validate(function (valid) {
          
          if (valid) {
            console.log('login welcome!');
            _this.logining = true;
            (async ()=>{ //async/await样例
              try {
                let data=await postDataWithJsonSync(LoginUrl,{
                  loginName:_this.ruleForm2.account,
                  passwd:_this.ruleForm2.checkPass,
                  verificationCode:_this.ruleForm2.captcha
                });
                _this.$store.state.userInfo=data.data;//不推荐直接赋值
                _this.logining=false;
                _this.getFileProfix();
              } catch (error) {
                _this.logining=false;
                openAlert(_this, '提示', error, null);
              }
            })();
            

            // postDataWithJson(LoginUrl,{ //普通回调方式样例
            //   loginName:_this.ruleForm2.account,
            //   passwd:_this.ruleForm2.checkPass,
            //   verificationCode:_this.ruleForm2.captcha
            // },function(data){
            //   _this.$store.state.userInfo=data.data;
            //   _this.logining=false;
            //   _this.getFileProfix();
            // },function(desc){
            //   _this.logining=false;
            //   openAlert(_this, '提示', desc, null);
            // });
            
          }
        })
      }
    }
  }


</script>

<style scoped lang="less">
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
