<template>
  <div id="channelAllApp" ref="channelAllApp">
    <div class="breadcrumbStyle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '' }">Linux TV首页内容推荐管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="type in tvTypeList" :label="type.typeName" :name="type.typeName"
                   :key="type.typeId">
      </el-tab-pane>
    </el-tabs>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
  import {getCQeduData, postCQeduData} from "../../js/network"
  import {openAlert} from "../../js/common"
  import {IndexTypesUrl} from "../../js/url"
  export default {
    data() {
      return {
        activeName: '熊猫乐园',
        tvTypeList: [],
        typeId: 1,
        typeName: '熊猫乐园',
        templateId: 1,
        number:1
      }
    },
    created () {
      this.gettvTypeListData();
    },
    watch: {
      '$route' (to, from) {
        this.gettvTypeListData();
      }
    },
    methods: {
      handleClick(tab, event) {
        var type = this.tvTypeList[tab.index];
        this.typeId = type.typeId;
        this.typeName = type.typeName;
        this.templateId = type.templateId;
        this.changePage(type.templateId);
      },
      changePage(){
        this.$router.push({
          path: '/ZnHomeIndex/ZnHomeAll/ZnHomeRecAdd',
          query: {typeId: this.typeId, templateId: this.templateId,typeName:this.typeName}
        });
      },
      fetchData (){
        const _this = this;

        if (_this.tvTypeList) {
          var typeIndex = 0;
          if (_this.$store.state.znHomeParam&&!!_this.$store.state.znHomeParam.typeId) {
            for (var i = 0; i < _this.tvTypeList.length; i++) {
              var type = _this.tvTypeList[i];
              if (type.typeId == _this.$store.state.znHomeParam.typeId) {
                typeIndex = i;
                break;
              }
            }
          }
          _this.activeName = _this.tvTypeList[typeIndex].typeName;
        }
      },

      gettvTypeListData(){
        var _this = this;
        let loading=this.$loading({target:this.$refs.channelAllApp,fullscreen:false});
        getCQeduData(_this, IndexTypesUrl, {platformId: 0}, function (data) {
          loading.close();
          _this.tvTypeList = data.data;
          console.log(data);
          if (_this.$store.state.znHomeParam&&!!_this.$store.state.znHomeParam.typeId) {
            _this.typeId = _this.$store.state.znHomeParam.typeId;
            _this.typeName = _this.$store.state.znHomeParam.typeName;
            _this.templateId = _this.$store.state.znHomeParam.templateId;
            console.log(_this.templateId);
            _this.changePage();
          } else {
            _this.typeId = _this.tvTypeList[0].typeId;
            _this.typeName = _this.tvTypeList[0].typeName;
            _this.templateId = _this.tvTypeList[0].templateId;
            _this.$store.state.znHomeParam.typeId = _this.typeId;
            _this.$store.state.znHomeParam.typeName = _this.typeName;
            _this.$store.state.znHomeParam.templateId = _this.templateId;

            _this.changePage();
          }
          _this.fetchData();
        }, function (desc) {
          openAlert(_this, '提示', desc, null);
          loading.close();
        })
      },


    }
  }
</script>

<style>
  .el-tabs__item {
    padding: 0 16px;
    height: 42px;
    box-sizing: border-box;
    line-height: 42px;
    display: inline-block;
    list-style: none;
    font-size: 16px;
    color: #8391a5;
    position: relative;
  }
</style>
