
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
    inline:true, //是否是行内表单
    size:'mini',
    span:24,//格栅数，总共24, inline=false起作用
    className:'',
    hideRequiredAsterisk:true,//是否隐藏必填字段的标签旁边的红色星号
    labelPosition:'right',//表单域标签的位置right/left/top，如果值为 left 或者 right 时，则需要设置 label-width
    labelWidth:'',//表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
    labelSuffix:'',//表单域标签的后缀	
    showMessage:true,//是否显示校验错误信息	
    inlineMessage:false,//是否以行内形式展示校验信息	
    statusIcon:false,//是否在输入框中显示校验结果反馈图标	
    formItems:[
      {
        span:8,
        prop:'startDate',
        label:'日期选择',
        size:'mini',
        labelWidth:'auto',//100px and so on || auto

        tagName:'el-date-picker',
        type:'date',//year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange
        placeholder:'开始日期',
        model:'startDate', //限制只有一层
        disabled:false,//是否禁用
        startPlaceholder:'',//范围选择时开始日期的占位内容
        endPlaceholder:'',//范围选择时结束日期的占位内容
        format:'',//显示在输入框中的格式	
        valueFormat:'',//可选，绑定值的格式,不指定则绑定值为 Date 对象
        rangeSeparator	:'',//选择范围时的分隔符	
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
        model:'endDate', //限制只有一层
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



export const formObj1={
  paramValue:{ //必须有 命名不可变 //提交表单的参值 不能有子对象
    name:'',
    dateRange:'',//时间范围[date1,date2]
    date1:'',
    time1:'',
    topicTime:'',
    topicDate:'',
    topicDateTime:'',
  },
  rules: { //必须有 命名不可变
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
  },
  refObj:null,//表单ref对象
  name:'formObj1',//表单名称
  formConfig:{ //必须有 命名不可变
    inline:false,//是否是行内表单
    size:'mini',
    span:24,//格栅数，总共24, inline=false起作用
    className:'',
    hideRequiredAsterisk:true,//是否隐藏必填字段的标签旁边的红色星号
    labelPosition:'right',//表单域标签的位置right/left/top，如果值为 left 或者 right 时，则需要设置 label-width
    labelWidth:'100px',//表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
    labelSuffix:'',//表单域标签的后缀	
    showMessage:true,//是否显示校验错误信息	
    inlineMessage:false,//是否以行内形式展示校验信息	
    statusIcon:false,//是否在输入框中显示校验结果反馈图标	
    formItems:[
      {
        span:12,
        prop:'name',
        label:'活动名称',
        size:'mini',//medium / small / mini
        labelWidth:'auto',//100px and so on || auto

        tagName:'el-input',
        type:'text',//text，textarea 和其他 原生 input 的 type 值
        placeholder:'请输入活动名称',
        model:'name', //限制只有一层
        disabled:false,//是否禁用
        rows:2,//输入框行数，只对 type="textarea" 有效
        autosize:false,//自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }
        className:'input-text-demo',
        clearable:true,
      },
      {
        span:12,
        prop:'dateRange',
        label:'日期范围',
        size:'mini',
        labelWidth:'auto',//100px and so on || auto

        tagName:'el-date-picker',
        type:'daterange',//year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange
        placeholder:'日期范围',
        model:'dateRange', //限制只有一层
        disabled:false,//是否禁用
        startPlaceholder:'开始日期',//范围选择时开始日期的占位内容
        endPlaceholder:'结束日期',//范围选择时结束日期的占位内容
        format:'',//显示在输入框中的格式	
        valueFormat:'',//可选，绑定值的格式,不指定则绑定值为 Date 对象
        rangeSeparator:'至',//选择范围时的分隔符	
        className:'',
      },
      {
        span:12,
        prop:'date1',
        label:'日期时间选择',
        size:'mini',
        labelWidth:'auto',//100px and so on || auto

        tagName:'el-date-picker',
        type:'datetime',//year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange
        placeholder:'日期时间',
        model:'date1', //限制只有一层
        disabled:false,//是否禁用
        startPlaceholder:'',//范围选择时开始日期的占位内容
        endPlaceholder:'',//范围选择时结束日期的占位内容
        format:'',//显示在输入框中的格式	
        valueFormat:'yyyy-MM-dd HH:mm:ss',//可选，绑定值的格式,不指定则绑定值为 Date 对象
        rangeSeparator:'',//选择范围时的分隔符	
        className:'',
      },
      {
        span:12,
        prop:'time1',
        label:'时间选择',
        size:'mini',
        labelWidth:'auto',//100px and so on || auto

        tagName:'el-time-picker',
        placeholder:'时间',
        model:'time1', //限制只有一层
        disabled:false,//是否禁用
        isRange:false,//是否为时间范围选择，仅对<el-time-picker>有效
        startPlaceholder:'',//范围选择时开始日期的占位内容
        endPlaceholder:'',//范围选择时结束日期的占位内容
        valueFormat:'',//可选，绑定值的格式,不指定则绑定值为 Date 对象 //HH:mm:ss
        rangeSeparator:'',//选择范围时的分隔符	
        pickerOptions:'',//当前时间日期选择器特有的选项参考下表 Object
        className:'',
      },
      {
        span:24,
        prop:'topicDateTime',
        label:'活动时间',
        size:'mini',
        tagName:'',
        child:[
          {
            tagName:'el-date-picker',
            type:'date',//year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange
            placeholder:'日期',
            model:'topicDate', //限制只有一层
            disabled:false,//是否禁用
            valueFormat:'yyyy-MM-dd',//可选，绑定值的格式,不指定则绑定值为 Date 对象
            className:'',
          },
          {
            tagName:'span',
            name:' - ',
            style:{
              padding:'0px 0px'
            },
            className:'',
          },
          {
            tagName:'el-time-picker',
            placeholder:'时间',
            model:'topicTime', //限制只有一层
            disabled:false,//是否禁用
            valueFormat:'',//可选，绑定值的格式,不指定则绑定值为 Date 对象 //HH:mm:ss
            pickerOptions:'',//当前时间日期选择器特有的选项参考下表 Object
            className:'',
          },
        ]
      }
    ]
  }
  
};