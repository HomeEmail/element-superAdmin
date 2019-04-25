<template>
  <el-form :inline="from[input].formConfig.inline" :model="from[input].paramValue" :rules="from[input].rules" :ref="from[input].name" :size="from[input].formConfig.size" :hideRequiredAsterisk="from[input].formConfig.hideRequiredAsterisk" :labelPosition="from[input].formConfig.labelPosition" :labelWidth="from[input].formConfig.labelWidth" :labelSuffix="from[input].formConfig.labelSuffix" :showMessage="from[input].formConfig.showMessage" :inlineMessage="from[input].formConfig.inlineMessage" :statusIcon="from[input].formConfig.statusIcon" :class="from[input].formConfig.className" v-if="!!from[input].formConfig.formItems&&!!from[input].formConfig.formItems.length">
    <el-form-item v-for="(item,index) in from[input].formConfig.formItems" :key="`index-${index}`" :label="item.label" :prop="item.prop" :style="{width:(from[input].formConfig.inline?'auto':parseFloat((item.span/24)*100,10)+'%'),display:'inline-block'}">

      
      
      <template v-if="!!item.child&&!!item.child.length">
        <template v-for="(item2,index2) in item.child">
          <!-- 适配各种输入组件 -->
          <el-input 
            v-if="item2.tagName=='el-input'" :key="`index2-${index2}`"
            v-model="from[input].paramValue[item2.model]"
            :type="item2.type"
            :rows="item2.rows"
            :autosize="item2.autosize"
            :placeholder="item2.placeholder"
            :disabled="item2.disabled"
            :class="item2.className"
            :clearable="item2.clearable"
            >
          </el-input>
          <span 
            v-if="item2.tagName=='span'" :key="`index2-${index2}`"
            :style="item2.style"
            :class="item2.className">
            {{item2.name}}
          </span>
          <div 
            v-if="item2.tagName=='div'" :key="`index2-${index2}`"
            :class="item2.className">
            {{item2.name}}
          </div>
          <el-date-picker
            v-if="item2.tagName=='el-date-picker'" :key="`index2-${index2}`"
            v-model="from[input].paramValue[item2.model]"
            :type="item2.type"
            :placeholder="item2.placeholder"
            :disabled="item2.disabled"
            :startPlaceholder="item2.startPlaceholder"
            :endPlaceholder="item2.endPlaceholder"
            :format="item2.format"
            :valueFormat="item2.valueFormat"
            :rangeSeparator="item2.rangeSeparator"
            :class="item2.className">
          </el-date-picker>
          <el-time-picker :key="`index2-${index2}`"
            v-if="item2.tagName=='el-time-picker'"
            v-model="from[input].paramValue[item2.model]"
            :placeholder="item2.placeholder"
            :disabled="item2.disabled"
            :startPlaceholder="item2.startPlaceholder"
            :endPlaceholder="item2.endPlaceholder"
            :rangeSeparator="item2.rangeSeparator"
            :valueFormat="item2.valueFormat"
            :pickerOptions="item2.pickerOptions"
            :isRange="item2.isRange"
            :class="item2.className">
          </el-time-picker>
          <el-button v-if="item2.tagName=='el-button'" :key="`index2-${index2}`"
            :icon="item2.icon"
            :type="item2.type"
            :circle="item2.circle"
            :round="item2.round"
            :plain="item2.plain"
            :disabled="item2.disabled"
            :size="item2.size"
            @click="from[item2.clickName](from[input].name)"
            :class="item2.className">
            {{item2.name}}
          </el-button>
          <el-button-group v-if="item.tagName=='el-button-group'" :key="`index2-${index2}`">
            <el-button v-if="item2.tagName=='el-button'"
              :icon="item2.icon"
              :type="item2.type"
              :circle="item2.circle"
              :round="item2.round"
              :plain="item2.plain"
              :disabled="item2.disabled"
              :size="item2.size"
              @click="from[item2.clickName](from[input].name)"
              :class="item2.className">
              {{item2.name}}
            </el-button>
          </el-button-group>
          
        </template>
      </template>
      <template v-else>
        <!-- 适配各种输入组件 -->
        <el-input 
          v-if="item.tagName=='el-input'"
          v-model="from[input].paramValue[item.model]"
          :type="item.type"
          :rows="item.rows"
          :autosize="item.autosize"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :class="item.className"
          :clearable="item.clearable"
          >
        </el-input>
        <span 
          v-if="item.tagName=='span'"
          :style="item.style"
          :class="item.className">
          {{item.name}}
        </span>
        <div 
          v-if="item.tagName=='div'"
          :class="item.className">
          {{item.name}}
        </div>
        <el-date-picker
          v-if="item.tagName=='el-date-picker'"
          v-model="from[input].paramValue[item.model]"
          :type="item.type"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :startPlaceholder="item.startPlaceholder"
          :endPlaceholder="item.endPlaceholder"
          :format="item.format"
          :valueFormat="item.valueFormat"
          :rangeSeparator="item.rangeSeparator"
          :class="item.className">
        </el-date-picker>
        <el-time-picker
          v-if="item.tagName=='el-time-picker'"
          v-model="from[input].paramValue[item.model]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :startPlaceholder="item.startPlaceholder"
          :endPlaceholder="item.endPlaceholder"
          :rangeSeparator="item.rangeSeparator"
          :valueFormat="item.valueFormat"
          :pickerOptions="item.pickerOptions"
          :isRange="item.isRange"
          :class="item.className">
        </el-time-picker>
        <el-button v-if="item.tagName=='el-button'"
          :icon="item.icon"
          :type="item.type"
          :circle="item.circle"
          :round="item.round"
          :plain="item.plain"
          :disabled="item.disabled"
          :size="item.size"
          @click="from[item.clickName](from[input].name)"
          :class="item.className">
          {{item.name}}
        </el-button>
        <el-button-group v-if="item.tagName=='el-button-group'">
          <el-button v-if="item.tagName=='el-button'"
            :icon="item.icon"
            :type="item.type"
            :circle="item.circle"
            :round="item.round"
            :plain="item.plain"
            :disabled="item.disabled"
            :size="item.size"
            @click="from[item.clickName](from[input].name)"
            :class="item.className">
            {{item.name}}
          </el-button>
        </el-button-group>

      </template>

    </el-form-item>

  </el-form>
</template>

<script>
export default {
  name:'dynamicForm',
  inject:['target'],
  data(){
    return {
      from:this.target
    };
  },
  props: {
    input:{
      type:String,
      required:true
    },
  },
  computed:{
    
  },
  created(){
    
  },
  mounted(){
    this.from[this.input].refObj=this.$refs[this.from[this.input].name];
    //console.log('dynamicForm created',this.from[this.input].name,this.$refs,this.$refs[this.from[this.input].name],this.from[this.input].refObj);
  },
  destroyed(){

  }
}
</script>
<style lang="less" scoped>

</style>
