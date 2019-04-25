<template>
  <div class="c-panel-wrapper my-project-container"> 
    <div class="my-project-item-container">
      <PanelExpand
        title="项目概况"
        name="projectProfile"
        :isExpand="expand.projectProfile"
        @handle-click="handleExpand"
        class="expand-style"
      />
      <div class="my-project-item-content border-shadow" v-if="expand.projectProfile">
        
        <DynamicForm input="formObj"></DynamicForm>

        <div style="height:200px">大幅拉升房价</div>
      </div>
    </div>
    <div class="my-project-item-container">
      <PanelExpand
        title="我的项目"
        name="myProject"
        :isExpand="expand.myProject"
        @handle-click="handleExpand"
        class="expand-style"
      />
      <div class="my-project-item-content border-shadow" v-if="expand.myProject">
        <div style="height:200px">大幅拉升房价</div>
      </div>
    </div>
  </div>
</template>
<script>

import PanelExpand from "../../../components/ict/panel-expand/panel-expand.vue";
import DynamicForm from './dynamicForm.vue';
import { BusiInfo, SaleContract } from "../../../components/ProJectInfo";
import {formObj} from './dataArr.js';
export default {
  name: "myProject",
  components: {
    PanelExpand,
    DynamicForm
  },
  provide(){
    return {
      target : this.baseSelf
    }
  },
  data() {
    return {
      baseSelf:this,
      expand:{
          projectProfile:true,
          myProject:true,
      },
      formObj,
    };
  },
  created() {
    console.log('this.$route',this.$route);
  },
  computed: {},
  mounted() {},
  methods: {
    handleExpand(name){
      //console.log(name);
      this.expand[name]=!this.expand[name];
    },
    onSubmit(formName){
      console.log(formName,this.formObj.paramValue,this.formObj.paramValue.startDate);
      if(!!!this.formObj.refObj) return ;
      this.formObj.refObj.validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onReset(formName){
      if(!!!this.formObj.refObj) return ;
      this.formObj.refObj.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>

.my-project-container{

}
.my-project-item-container {
  margin-bottom: 10px;
  .my-project-item-content{
    padding: 20px 20px;
  }
}
.border-shadow {
  box-shadow: 0px 5px 25px 0px rgba(146, 167, 215, 0.2);
  border-radius: 10px;
}
</style>
