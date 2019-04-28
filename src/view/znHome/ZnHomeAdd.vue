<template>
  <div id="TvHomeAdd">
    <div class="breadcrumbStyle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/ZnHomeIndex/ZnHomeAll' }">Linux TV首页内容推荐管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{pageTitle}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="TvHomeContent">
      <div class="videoAddItem">
        <p class="selectTitle">标题</p>
        <el-input style="width: 680px" v-model="znHomeParam.name" placeholder="请输入标题"></el-input>
      </div>
      <div class="videoAddItem">
        <p class="selectTitle">权重</p>
        <el-input style="width: 680px" v-model="znHomeParam.priority" placeholder="请输入权重"></el-input>
      </div>
      <div class="videoAddItem">
        <p class="selectTitle">vodId</p>
        <el-input style="width: 680px" v-model="znHomeParam.vodId" placeholder="请输入vodId"></el-input>
      </div>
      <div class="videoAddItem">
        <p class="selectTitle">生效时间</p>
        <el-date-picker v-model="ableTime" type="datetime" placeholder="生效时间">
        </el-date-picker>
        <p class="selectTitle">失效时间</p>
        <el-date-picker v-model="disableTime" type="datetime" placeholder="失效时间">
        </el-date-picker>

      </div>
      <div class="videoAddItem">
        <p class="selectTitle">跳转链接</p>
        <el-input style="width: 680px" v-model="znHomeParam.href" placeholder="请输入跳转链接"></el-input>
      </div>
      <div class="videoAddItem">
        <p class="uploadLeftTip">配图</p>
        <el-upload class="uploadRightContent" action="/cqedu-cms-web/system/uploadFile/image.utvgo"
                   :on-success="handleImg1Success" :on-remove="handleImg1Remove" :file-list="smallImageList"
                   list-type="picture">
          <el-button class="uploadRightBtn uploadRightBtnWidth">点击上传</el-button>

        </el-upload>
      </div>
      <div class="videoAddItem">
        <p class="selectTitle"></p>
        <el-button class="saveBtn" type="primary" @click="handleSaveBanner()"  v-loading.fullscreen.lock="fullscreenLoading">
          保存
        </el-button>
        <el-button class="saveBtn" type="info" @click="handleBack()">
          返回
        </el-button>
      </div>

    </div>
  </div>

</template>

<script>
  import {getCQeduData} from "../../js/network"
  import {openAlert, openMessage} from "../../js/common"
  import {
    IndexInsertUrl,
    IndexUpdateUrl,
  } from "../../js/url"

  export default {
    data() {
      return {
        znHomeParam: {
          priority: '', // 权重
          name: '', // 标题
          href: '',     //跳转连接
          imgUrl: '',   //上传图片
          typeId: '',   //
          number: '',   //数值
          vodId: '',     //vodId值
          ableTime: '',     //生效时间
          disableTime: ''     //失效时间
        },
        ableTime:'',
        disableTime:'',
        smallImageList: [],
        bigImageList: [],
        isUpdate: false,
        fullscreenLoading: false,
        pageTitle: "新增横幅",
        smallImage: '', // 小图（800*400）
      }

    },
    created: function () {
      if (!this.$store.state.znHomeParam.edit) {
        console.log('add:',this.$store.state.znHomeParam);
        this.znHomeParam.typeId = this.$store.state.znHomeParam.typeId;
        this.znHomeParam.number = this.$store.state.znHomeParam.number;
        this.znHomeParam.templateId = this.$store.state.znHomeParam.templateId;
        //console.log(this.$store.state.znHomeParam.templateId);
        this.pageTitle = "新增横幅 (" + this.$store.state.znHomeParam.typeName + " - 第"+this.znHomeParam.number+"位置)";
      } else {
        console.log('edit:',this.$store.state.znHomeParam);
        if(!!this.$store.state.znHomeParam.ableTime){
          this.ableTime=new Date(this.$store.state.znHomeParam.ableTime);
        }
        if(!!this.$store.state.znHomeParam.disableTime){
          this.disableTime=new Date(this.$store.state.znHomeParam.disableTime);
        }
        this.znHomeParam = this.$store.state.znHomeParam;
        if (this.znHomeParam.smallImage != "") {
          this.smallImageList[0] = {
            name: '图片1(小图)',
            url: this.$store.state.fileProfix.imageProfix + this.znHomeParam.imgUrl
          };
        }
        
        this.pageTitle = "编辑横幅 (" + this.$store.state.znHomeParam.typeName + " - 第"+this.znHomeParam.number+"位置)";
        this.isUpdate = true;
      }
    },
    methods: {
      handleBack(){
        history.back();
      },
      handleSaveBanner(){
        const _this = this;

        _this.fullscreenLoading = true;
        if (_this.ableTime instanceof Date) {
          _this.znHomeParam.ableTime = _this.ableTime.Format("yyyy-MM-dd hh:mm:ss");
        }
        if (_this.disableTime instanceof Date) {
          _this.znHomeParam.disableTime = _this.disableTime.Format("yyyy-MM-dd hh:mm:ss");
        }
        delete _this.znHomeParam.createTime;
        delete _this.znHomeParam.updateTime;
        delete _this.znHomeParam.auditeTime;
        delete _this.znHomeParam.labelIds;
        delete _this.znHomeParam.createBy;
        delete _this.znHomeParam.editeBy;
        delete _this.znHomeParam.auditBy;
        delete _this.znHomeParam.edit;
        delete _this.znHomeParam.status;

        if (_this.isUpdate) {
          getCQeduData(_this, IndexUpdateUrl, _this.znHomeParam, function (data) {
            console.log(data);
            openMessage(_this, '更新横幅成功', 'success');
            _this.fullscreenLoading = false;
            _this.$router.go(-1);
          }, function (desc) {
            openAlert(_this, '提示1', desc, null);
            _this.fullscreenLoading = false;
          })
        } else {
          getCQeduData(_this, IndexInsertUrl, _this.znHomeParam, function (data) {
            openMessage(_this, '添加横幅成功', 'success');
            _this.fullscreenLoading = false;
            _this.$router.go(-1);
          }, function (desc) {
            openAlert(_this, '提示2', desc, null);
            _this.fullscreenLoading = false;
          })
        }
      },

      handleSelectLabel() {
        this.visibleDialogLabel = true;
      },
      handleImg1Success(res, file) {
        console.log(file)
        this.znHomeParam.imgUrl = file.response.data;
        console.log(this.znHomeParam.imgUrl)
      },
      handleImg1Remove() {
        this.znHomeParam.imgUrl = '';
      }
    }
  }
</script>

<style>
 

</style>
