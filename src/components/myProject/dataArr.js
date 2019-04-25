
export const formObj={
  paramValue:{ //必须有 命名不可变 //提交表单的参值 不能有子对象
    startDate:'',
    endDate:''
  },
  rules: { //必须有 命名不可变
    // name: [
    //   { required: true, message: '请输入活动名称', trigger: 'blur' },
    //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    // ],
    endDate: [
      { type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
    ],
    startDate: [
      { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
    ]
  },
  refObj:null,//表单ref对象
  name:'queryForm',//表单名称
  formConfig:{ //必须有 命名不可变
    inline:true,
    size:'mini',
    span:24,//格栅数，总共24, inline=false起作用
    className:'',
    hideRequiredAsterisk:true,//是否隐藏必填字段的标签旁边的红色星号
    formItems:[
      {
        span:8,
        prop:'startDate',
        label:'日期选择',
        size:'mini',
        labelWidth:'auto',//100px and so on || auto
        tagName:'el-date-picker',
        type:'date',
        placeholder:'开始日期',
        model:'startDate', //限制只有两层
        disabled:false,//是否禁用
        className:'',
      },
      {
        span:8,
        prop:'endDate',
        label:'至',
        size:'mini',
        labelWidth:'auto',//100px and so on || auto
        tagName:'el-date-picker',
        type:'date',
        placeholder:'结束日期',
        model:'endDate', //限制只有两层
        disabled:false,//是否禁用
        className:'',
      },
      {
        span:8,
        tagName:'div',//el-button el-button-group span div 按钮 按钮组 只是为了布局的
        child:[
          {
            tagName:'el-button',
            name:'查询',
            type:'primary',//primary '' info warning danger success text
            circle:false,//圆形按钮
            icon:'',//图标
            round:false,//圆角按钮
            plain:false,//朴素按钮
            disabled:false,//是否禁用
            loading:false,
            size:'',//medium / small / mini
            clickName:'onSubmit', //调用的方法名
            className:'',
          },
          {
            tagName:'el-button',
            name:'重置',
            type:'',//primary '' info warning danger success text
            circle:false,//圆形按钮
            icon:'',//图标
            round:false,//圆角按钮
            plain:false,//朴素按钮
            disabled:false,//是否禁用
            loading:false,
            size:'',//medium / small / mini
            clickName:'onReset', //调用的方法名
            className:'',
          }
        ]
      }
    ]
  }
  
};