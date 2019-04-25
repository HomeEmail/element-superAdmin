<template>
  <div>
    <h2>行内表单</h2>
    <dynamic-form input="formObj"></dynamic-form>
    <h2>典型表单</h2>
    <dynamic-form input="formObj1"></dynamic-form>
  </div>
</template>
<script>
import dynamicForm from './dynamicForm.vue';
import {formObj,formObj1} from './formDemoData.js';
export default {
  name:'formDemo',
  components:{
    dynamicForm
  },
  provide(){
    return {
      target : this.baseSelf
    }
  },
  data() {
    return {
      baseSelf:this,
      formObj,
      formObj1,
    };
  },
  created() {
    console.log('this.$route',this.$route);
  },
  computed: {},
  mounted() {},
  methods: {
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
      this.formObj.refObj.resetFields();//当开启有keep-alive，数据会缓存组件关闭前的值 导致清空不了
      //尝试这样清空数据
      // for(let key in this.formObj.paramValue){
      //   this.formObj.paramValue[key]='';
      // }
      console.log('this.data',this);
    },
  },
}
</script>
<style lang="less" scoped>
 
</style>
<style lang="less">
  // .input-text-demo{
  //   width: 300px;
  // }
</style>
