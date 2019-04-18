<template>
    <div style="margin: 10px;padding-bottom: 20px; width: 100%">
        <div id="rootDiv" ref="rootDiv" style=" width: 592px;height: 300px">
            <div style="position: relative;">
                <el-button id="btn1"
                           :style="{backgroundImage: 'url(' + recommendInfo1.imgUrl + ')'}"
                           @click="setRecommendInfo(0)">{{recommendInfo1.name}}
                </el-button>
                <el-button id="btn2"
                           :style="{backgroundImage: 'url(' + recommendInfo2.imgUrl + ')'}"
                           @click="setRecommendInfo(1)">{{recommendInfo2.name}}
                </el-button>
                <el-button id="btn3"
                           :style="{backgroundImage: 'url(' + recommendInfo3.imgUrl + ')'}"
                           @click="setRecommendInfo(2)">{{recommendInfo3.name}}
                </el-button>
                <el-button id="btn4"
                           :style="{backgroundImage: 'url(' + recommendInfo4.imgUrl + ')'}"
                           @click="setRecommendInfo(3)">{{recommendInfo4.name}}
                </el-button>
                <el-button id="btn5"
                           :style="{backgroundImage: 'url(' + recommendInfo5.imgUrl + ')'}"
                           @click="setRecommendInfo(4)">{{recommendInfo5.name}}
                </el-button>
                <el-button id="btn6"
                           :style="{backgroundImage: 'url(' + recommendInfo6.imgUrl + ')'}"
                           @click="setRecommendInfo(5)">{{recommendInfo6.name}}
                </el-button>
                <el-button id="btn7"
                           :style="{backgroundImage: 'url(' + recommendInfo7.imgUrl + ')'}"
                           @click="setRecommendInfo(6)">{{recommendInfo7.name}}
                </el-button>
                <el-button id="btn8"
                           :style="{backgroundImage: 'url(' + recommendInfo8.imgUrl + ')'}"
                           @click="setRecommendInfo(7)">{{recommendInfo8.name}}
                </el-button>
                <el-button id="btn9"
                           :style="{backgroundImage: 'url(' + recommendInfo9.imgUrl + ')'}"
                           @click="setRecommendInfo(8)">{{recommendInfo9.name}}
                </el-button>
                <el-button id="btn10"
                           :style="{backgroundImage: 'url(' + recommendInfo10.imgUrl + ')'}"
                           @click="setRecommendInfo(9)">{{recommendInfo10.name}}
                </el-button>
                <el-button id="btn11"
                           :style="{backgroundImage: 'url(' + recommendInfo11.imgUrl + ')'}"
                           @click="setRecommendInfo(10)">{{recommendInfo11.name}}
                </el-button>
                 <el-button id="btn12"
                           :style="{backgroundImage: 'url(' + recommendInfo12.imgUrl + ')'}"
                           @click="setRecommendInfo(11)">{{recommendInfo12.name}}
                </el-button>

            </div>
        </div>
      
        <div class="channelInfo">
            <div style="padding-bottom:20px;">第<b>{{programFilterData.number}}</b>个位置内容列表</div>
            <div>
                <el-button type="primary" plain @click="handleAdd()">新增横幅</el-button>
            </div>
        </div>
        <el-table
            ref="VedioListTable"
            :data="vedioTypeList"
            border
            max-height="400"
            v-loading="listLoading"
            tooltip-effect="dark"
            style="width: 100%;margin-bottom:20px;"
            @selection-change="handleSelectionChange">
            <el-table-column
                    prop="id"
                    label="编号"
                    width="60">
            </el-table-column>
            <el-table-column
                    prop="priority"
                    label="权重"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="ableTime"
                    label="生效时间"
                    width="160"
                    :formatter="formatterAbleTime">
            </el-table-column>
            <el-table-column
                    prop="disableTime"
                    label="失效时间"
                    width="160"
                    :formatter="formatterDisableTime">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="80"
                    :formatter="formatterStatus">
            </el-table-column>
          <el-table-column
                    prop="name"
                    label="标题"
                    >
            </el-table-column>
            <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    width="160"
                    :formatter="formatterUpdateTime">
            </el-table-column>
            <el-table-column
                    prop="auditBy"
                    width="80"
                    label="审核人">
            </el-table-column>
            <el-table-column label="操作" width="380">
                <template scope="scope">
                    <el-button
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="small"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button
                            size="small"
                            @click="handleReview(scope.$index, scope.row, 1)">转已审
                    </el-button>
                    <el-button
                            size="small"
                            @click="handleReview(scope.$index, scope.row, 2)">转未审
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="channelInfo">
            <div>
                <el-button type="primary" plain @click="handleAdd()">新增横幅</el-button>
            </div>
        </div>

        <el-pagination
                style="padding-top: 20px;text-align:center;"
                @current-change="handleCurPageChange"
                @size-change="handleSizeChange"
                layout="total,sizes,prev, pager, next,jumper"
                :page-sizes="[10, 20, 40, 70]"
                :page-size="programFilterData.pageSize"
                :current-page="programFilterData.pageNo"
                :total="listCount">
        </el-pagination>

    </div>
</template>
<script>
    import {getCQeduData, postCQeduData} from "../../js/network"
    import {openAlert, openMessage, deepCopy, openConfirm} from "../../js/common"
    import {
	    	IndexListUrl,
	    	IndexDeleteUrl,
	    	IndexAuditeUrl,
            IndexPageUrl} from "../../js/url"
    import {Loading} from 'element-ui';

    export default{
        data(){
            return {
                vedioTypeList: [],
                fullscreenLoading: false,
                typeId: '',
                recommendInfoList: [],
                recommendInfo: {
                    name: '',
                    imgUrl: '',
                    href: '',
                },
                recommendInfo1: {
                    name: '推荐1',
                    imgUrl: '',
                    href: '',
                },
                recommendInfo2: {
                    name: '推荐2',
                    imgUrl: '',
                    href: '',
                },
                recommendInfo3: {
                    name: '推荐3',
                    imgUrl: '',
                    href: '',
                },
                recommendInfo4: {
                    name: '推荐4',
                    imgUrl: '',
                    href: '',
                },
                recommendInfo5: {
                    name: '推荐5',
                    typeId: '',
                    imgUrl: '',
                    href: '',
                },
                recommendInfo6: {
                    name: '推荐6',
                    typeId: '',
                    imgUrl: '',
                    href: '',
                },
                recommendInfo7: {
                    name: '推荐7',
                    imgUrl: '',
                    href: '',
                },
                recommendInfo8: {
                    name: '推荐8',
                    imgUrl: '',
                    href: '',
                },
                recommendInfo9: {
                    name: '推荐9',
                    imgUrl: '',
                    href: '',
                },
                recommendInfo10: {
                    name: '推荐10',
                    imgUrl: '',
                    href: '',
                },
                recommendInfo11: {
                    name: '推荐11',
                    imgUrl: '',
                    href: '',
                },
                  recommendInfo12: {
                    name: '推荐12',
                    imgUrl: '',
                    href: '',
                },

                listCount: 0,
                listLoading: false,
                programFilterData: {
                    templateId: '',
                    typeId: '',
                    typeName:'',
                    number: '1',
                    pageNo: 1,
                    pageSize: 10,
                },
                lastNumber:1
            }
        },
        created () {
            // 组件创建完后获取数据
            this.initData();
        },
        beforeRouteLeave: function (to, from, next) {
            //this.$store.state.znHomeParam=this.programFilterData;
            next();
        },
        methods: {
            initData () {
                this.recommendInfo1.name = '推荐1';
                this.recommendInfo1.imgUrl = '';
                this.recommendInfo1.href = '';

                this.recommendInfo2.name = '推荐2';
                this.recommendInfo2.imgUrl = '';
                this.recommendInfo2.href = '';

                this.recommendInfo3.name = '推荐3';
                this.recommendInfo3.imgUrl = '';
                this.recommendInfo3.href = '';

                this.recommendInfo4.name = '推荐4';
                this.recommendInfo4.imgUrl = '';
                this.recommendInfo4.href = '';

                this.recommendInfo5.name = '推荐5';
                this.recommendInfo5.imgUrl = '';
                this.recommendInfo5.href = '';

                this.recommendInfo6.name = '推荐6';
                this.recommendInfo6.imgUrl = '';
                this.recommendInfo6.href = '';

                this.recommendInfo7.name = '推荐7';
                this.recommendInfo7.imgUrl = '';
                this.recommendInfo7.href = '';

                this.recommendInfo8.name = '推荐8';
                this.recommendInfo8.imgUrl = '';
                this.recommendInfo8.href = '';

                this.recommendInfo9.name = '推荐9';
                this.recommendInfo9.imgUrl = '';
                this.recommendInfo9.href = '';

                this.recommendInfo10.name = '推荐10';
                this.recommendInfo10.imgUrl = '';
                this.recommendInfo10.href = '';

                this.recommendInfo11.name = '推荐11';
                this.recommendInfo11.imgUrl = '';
                this.recommendInfo11.href = '';

                this.recommendInfo12.name = '推荐12';
                this.recommendInfo12.imgUrl = '';
                this.recommendInfo12.href = '';



                this.recommendInfoList[0] = this.recommendInfo1;
                this.recommendInfoList[1] = this.recommendInfo2;
                this.recommendInfoList[2] = this.recommendInfo3;
                this.recommendInfoList[3] = this.recommendInfo4;
                this.recommendInfoList[4] = this.recommendInfo5;
                this.recommendInfoList[5] = this.recommendInfo6;
                this.recommendInfoList[6] = this.recommendInfo7;
                this.recommendInfoList[7] = this.recommendInfo8;
                this.recommendInfoList[8] = this.recommendInfo9;
                this.recommendInfoList[9] = this.recommendInfo10;
                this.recommendInfoList[10] = this.recommendInfo11;
                this.recommendInfoList[11] = this.recommendInfo12;


                this.recommendInfo = this.recommendInfo1;
                if (this.$store.state.znHomeParam&&!!this.$store.state.znHomeParam.typeId) {
                    this.programFilterData.typeId = this.$store.state.znHomeParam.typeId;
                    this.programFilterData.typeName = this.$store.state.znHomeParam.typeName;
                    this.programFilterData.templateId = this.$store.state.znHomeParam.templateId;
                    this.programFilterData.number = this.$store.state.znHomeParam.number;//从1开始
                }else{
                    this.programFilterData.typeId = this.$route.query.typeId;
                    this.$store.state.znHomeParam.typeId=this.$route.query.typeId;

                    this.programFilterData.typeName = this.$route.query.typeName;

                    this.programFilterData.templateId=this.$route.query.templateId;
                    this.$store.state.znHomeParam.templateId=this.$route.query.templateId;
                }

                

                this.getIndexData();
                this.getTvHomeListData();
            },
            setRecommendInfo(val) {
                this.recommendInfo = this.recommendInfoList[val];
                this.lastNumber=this.programFilterData.number;
                this.programFilterData.number = val + 1;
                this.getTvHomeListData();
            },

            isArray(o){
                return Object.prototype.toString.call(o) == '[object Array]';
            },
            getIndexData(){
                var _this = this;
                var loadingInstance = Loading.service({fullscreen: false, target: this.$refs.rootDiv});
                getCQeduData(_this, IndexPageUrl, {"typeId": _this.programFilterData.typeId}, function (data) {
                    loadingInstance.close();
                    var indexArr = data.data;
                    if (!(indexArr instanceof Array)) {
                        return;
                    }
                    for (var i = 0; i < indexArr.length; i++) {
                        _this.recommendInfoList[i].href = indexArr[i].href;
                        _this.recommendInfoList[i].imgUrl = _this.$store.state.fileProfix.imageProfix + indexArr[i].imgUrl;
                    }

                    _this.recommendInfo = _this.recommendInfo1;
                }, function (desc) {
                    loadingInstance.close();
                    openAlert(_this, '提示', desc, null);
                })
            },
            getTvHomeListData(){
                var _this = this;
                
                _this.listLoading = true;
                getCQeduData(_this, IndexListUrl, _this.programFilterData, function (data) {
                    _this.listLoading = false;
                    _this.vedioTypeList = data.data;
                    _this.listCount = data.count;

                    document.getElementById('btn'+_this.lastNumber).style.border="0px #9C27B0 solid";
                    document.getElementById('btn'+_this.programFilterData.number).style.border="3px #9C27B0 solid";

                }, function (desc) {
                    openAlert(_this, '提示', desc, null);
                    _this.listLoading = false;
                })
            },
            commitTvHomeData(){
                /*var _this = this;
                _this.fullscreenLoading = true;
                var indexArr = [];
                for (var i = 0; i < _this.recommendInfoList.length; i++) {
                    indexArr.push(deepCopy(_this.recommendInfoList[i]));
                    var info = indexArr[i];
                    info.imgUrl = info.imgUrl.replace(this.$store.state.fileProfix.imageProfix, "");
                }
                var indexJsonData = JSON.stringify(indexArr);
                getCQeduData(_this, TvHomeAddUrl, {"jsonStr": indexJsonData, "typeId": _this.typeId}, function (data) {
                    openMessage(_this, '保存成功', 'success');
                    _this.fullscreenLoading = false;
                }, function (desc) {
                    openAlert(_this, '提示', desc, null);
                    _this.fullscreenLoading = false;
                })*/
            },
            handleImgSuccess(res, file) {
                this.recommendInfo.imgUrl = this.$store.state.fileProfix.imageProfix + file.response.data;
            },
            handleImgRemove(){
                this.recommendInfo.imgUrl = '';
            },
            handleAdd(index, row) {
                this.$store.state.znHomeParam = {};
                this.$store.state.znHomeParam.typeId = this.programFilterData.typeId;
                this.$store.state.znHomeParam.number = this.programFilterData.number;
                this.$store.state.znHomeParam.templateId=this.programFilterData.templateId;
                this.$store.state.znHomeParam.typeName = this.programFilterData.typeName;
                this.$store.state.znHomeParam.edit = false;
                this.$router.push('/ZnHomeIndex/ZnHomeAdd');
            },
            handleEdit(index, row) {
                this.$store.state.znHomeParam = row;
                this.$store.state.znHomeParam.typeName = this.programFilterData.typeName;
                this.$store.state.znHomeParam.templateId=this.programFilterData.templateId;
                this.$store.state.znHomeParam.typeId=this.programFilterData.typeId;
                if(!!row.ableTime){
                    this.$store.state.znHomeParam.ableTime = new Date(row.ableTime).Format("yyyy-MM-dd hh:mm:ss");
                }
                if(!!row.disableTime){
                    this.$store.state.znHomeParam.disableTime = new Date(row.disableTime).Format("yyyy-MM-dd hh:mm:ss");
                }
                
                this.$store.state.znHomeParam.edit = true;
                this.$router.push('/ZnHomeIndex/ZnHomeAdd');
            },
            formatterAbleTime(row, column){
                return new Date(row.ableTime).Format("yyyy-MM-dd hh:mm:ss");
            },
            formatterDisableTime(row, column){
                return new Date(row.disableTime).Format("yyyy-MM-dd hh:mm:ss");
            },
            formatterUpdateTime(row, column){
                return new Date(row.updateTime).Format("yyyy-MM-dd hh:mm:ss");
            },
            formatterStatus(row, column){
                if (row.status == 0) {
                    return '待审核';
                } else if (row.status == 1) {
                    return '通过';
                } else if (row.status == 2) {
                    return '不通过';
                } else if (row.status == 2) {
                    return '已下架';
                } else {
                    return '未审';
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            handleCurPageChange(val){
                this.programFilterData.pageNo = val;
                this.getTvHomeListData();
            },

            handleSizeChange(val){
                this.programFilterData.pageSize = val;
                this.getTvHomeListData();
            },
            handleReview(index, row, status) {
                const _this = this;
                getCQeduData(_this, IndexAuditeUrl, {id: row.id, status: status}, function (data) {
                    _this.getIndexData();
                    _this.getTvHomeListData();
                    openMessage(_this, "操作成功", 'success');
                }, function (desc) {
                    openAlert(_this, '提示', desc, null);
                })
            },

            handleDelete(index, row) {
                const _this = this;
                openConfirm(_this, '提示', "确认要删除编号 " + row.id, function () {
                    getCQeduData(this, IndexDeleteUrl, {id: row.id}, function (data) {
                        _this.getTvHomeListData();
                    }, function (desc) {
                        openAlert(_this, '提示', desc, null);
                    })
                }, null);
            },
        }
    }
</script>
<style>

    #btn1 > span,#btn2 > span,#btn3 > span,#btn4 > span,#btn5 > span,#btn6 > span,#btn7 > span,#btn8 > span,#btn9 > span,#btn10 > span,#btn11 > span,#btn12 > span,#btn13 > span{
        background-color: rgba(0,0,0,0.4);
        padding: 8px 12px;
        color: #fff;
        border-radius: 5px;
        font-size: 14px;
    }
    #btn1 {
        position: absolute;
        top: 0px;
        left: 10px;
        width: 105px;
        height: 40px;
        margin-left: 0px;
        background-size: 100% 100%;
        border-radius: 10px;
    }

    #btn2 {
        position: absolute;
        top: 0px;
        left: 125px;
        width: 260px;
        height: 160px;
        margin-left: 0px;
        background-size: 100% 100%;
        border-radius: 10px;
    }

    #btn3 {
        position: absolute;
        top: 0px;
        left: 400px;
        width: 130px;
        height: 160px;
        margin-left: 0px;
        background-size: 100% 100%;
        border-radius: 10px;
    }

    #btn4 {
        position: absolute;
        top: 0px;
        left: 545px;
        width: 130px;
        height: 75px;
        margin-left: 0px;
        background-size: 100% 100%;
        border-radius: 10px;
    }

    #btn5 {
        position: absolute;
        top: 50px;
        left: 10px;
        width: 105px;
        height: 40px;
        margin-left: 0px;
        background-size: 100% 100%;
        border-radius: 10px;
    }

    #btn6 {
        position: absolute;
        top: 100px;
        left: 10px;
        width: 105px;
        height: 60px;
        margin-left: 0px;
        background-size: 100% 100%;
        border-radius: 10px;
    }
     #btn7 {
        position: absolute;
        top: 85px;
        left: 545px;
        width: 130px;
        height: 75px;
        margin-left: 0px;
        background-size: 100% 100%;
        border-radius: 10px;
    }



    #btn8 {
        position: absolute;
        top: 170px;
        left: 20px;
        width: 105px;
        height: 105px;
        margin-left: 0px;
        background-size: 100% 100%;
        border-radius: 10px;
    }

    #btn9 {
        position: absolute;
        top: 170px;
        left: 155px;
        width: 105px;
        height: 105px;
        margin-left: 0px;
        background-size: 100% 100%;
        border-radius: 10px;
    }

    #btn10 {
        position: absolute;
        top: 170px;
        left: 290px;
        width: 105px;
        height: 105px;
        margin-left: 0px;
        background-size: 100% 100%;
        border-radius: 10px;
    }

    #btn11 {
        position: absolute;
        top: 170px;
        left: 427px;
        width: 105px;
         height: 105px;
        margin-left: 0px;
        background-size: 100% 100%;
        border-radius: 10px;
    }

    #btn12 {
        position: absolute;
        top: 170px;
        left: 560px;
        width: 105px;
         height: 105px;
        margin-left: 0px;
        background-size: 100% 100%;
        border-radius: 10px;
    }


</style>
