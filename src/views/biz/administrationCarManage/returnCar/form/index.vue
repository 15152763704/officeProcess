<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-10 14:19:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jshxpms-vue\src\views\flowable\formView\test.vue
-->
<template>
  <el-form
    ref="form"
    :model="form.variables"
    :rules="rules"
    label-width="120px"
    style="overflow: hidden;"
  >
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="借车信息" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="申请车辆" prop="carname">
          <el-input
            v-model="form.variables.carname"
            :disabled= true
            placeholder="请输入申请车辆"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="车牌号码" prop="num">
          <el-input
            v-model="form.variables.num"
            :disabled= true
            placeholder="请输入车牌号码"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="申请事由" prop="shenqingshiyou">
          <el-input
            v-model="form.variables.shenqingshiyou"
            :disabled=true
            placeholder="请输入申请事由"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="用途类型" prop="yongtuleixing">
          <el-input
            v-model="form.variables.yongtuleixing"
            :disabled= true
            placeholder="请输入用途类型"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="目的地" prop="mudidi">
          <el-input
            v-model="form.variables.mudidi"
            :disabled= true
            placeholder="请输入目的地"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属区域" prop="suoshuquyu">
          <el-input
            v-model="form.variables.suoshuquyu"
            :disabled= true
            placeholder="请输入所属区域"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="借用时间" prop="jieyongtime">
          <el-input
            v-model="form.variables.jieyongtime"
            :disabled= true
            placeholder="请输入借用时间"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="归还时间" prop="guihuantime">
          <el-input
            v-model="form.variables.guihuantime"
            :disabled= true
            placeholder="请输入归还时间"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="借车备注" prop="jiechebeizhu">
          <el-input rows=3 type="textarea"
                    v-model="form.variables.jiechebeizhu"
                    :disabled=true
                    placeholder="请输入借车备注"
                    style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="附件" prop="fujian">
          <el-upload
            :before-upload="checkMyFileSize"
            class="upload-demo"
            :disabled= true
            :headers="uploadHeaders"
            :action="uploadUrl"
            :on-success="handleAvatarSuccess"
            :file-list="jiecheFileList"
            :on-preview="downloadFile"
            style="width:100%;">
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="还车确认" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="还车部门" prop="dept">
          <el-input v-model="formDeptName" disabled placeholder="请输入还车部门" style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="还车时间" prop="createTime">
          <el-date-picker
            v-model="form.variables.createTime"
            type="datetime"
            placeholder="选择还车时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            disabled
            style="width:100%;"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="还车人" prop="username">
          <el-input v-model="formUserName" disabled placeholder="请输入还车人" style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="初始里程数" prop="jiechegongli">
          <el-input-number v-model="form.variables.jiechegongli" placeholder="请输入初始里程数" style="width:100%;"
                           :disabled="!isformdisabled" :min="0"
                           :precision="2"
                           :step="1" controls-position="right"
                           @change="jiecheLichengchange"
          ></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="归还里程数" prop="huanchegongli">
          <el-input-number v-model="form.variables.huanchegongli" placeholder="请输入归还里程数" style="width:100%;"
                           :disabled="!isformdisabled" :min="0"
                           :precision="2"
                           :step="1" controls-position="right"
                           @change="huancheLichengchange"
          ></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="行驶里程数" prop="xingchenggongli">
          <el-input-number v-model="form.variables.xingchenggongli" placeholder="请输入行驶里程数" style="width:100%;"
                           :disabled="true" :min="0"
                           :precision="2"
                           :step="1" controls-position="right"
          ></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="初始车况" prop="chushichekuang">
          <el-select
            v-model="form.variables.chushichekuang"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择初始车况"
            style="width:100%;"
          >
            <el-option
              v-for="item in car_damage"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="归还车况" prop="guihuanchekuang">
          <el-select
            v-model="form.variables.guihuanchekuang"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择归还车况"
            style="width:100%;"
          >
            <el-option
              v-for="item in car_damage"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>


    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="初始里程数图片" prop="chushipic" ref="chushipic">
          <el-upload
            :before-upload="checkMyFileSize"
            class="upload-demo"
            :disabled="!isformdisabled"
            :headers="uploadHeaders"
            :action="uploadUrl"
            :on-success="chushipicHandleAvatarSuccess"
            :file-list="chushipicfileList"
            :on-remove="chushipicHandleRemove"
            :on-preview="downloadFile"
            :data="chushipicdata"
            style="width:100%;"
            multiple
          >
            <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="归还里程数图片" prop="guihuanpic" ref="guihuanpic">
          <el-upload
            :before-upload="checkMyFileSize"
            class="upload-demo"
            :disabled="!isformdisabled"
            :headers="uploadHeaders"
            :action="uploadUrl"
            :on-success="guihuanpicHandleAvatarSuccess"
            :file-list="guihuanpicfileList"
            :on-remove="guihuanpicHandleRemove"
            :on-preview="downloadFile"
            :data="guihuanpicdata"
            style="width:100%;"
            multiple
          >
            <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注" prop="huanchebeizhu">
          <el-input
            v-model="form.variables.huanchebeizhu"
            type="textarea"
            :rows="3"
            :disabled="!isformdisabled"
            placeholder="请输入备注"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="附件" >
          <el-upload
            :before-upload="checkMyFileSize"
            class="upload-demo"
            :disabled="!isformdisabled"
            :headers="uploadHeaders"
            :action="uploadUrl"
            :on-success="handleAvatarSuccess"
            :file-list="fileListfujian"
            :on-remove="handleRemove"
            :on-preview="downloadFile"
            :data="fujiandata"
            style="width:100%;"
            multiple
          >
            <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { addReturnCar, updateReturnCar } from '@/api/biz/administrationCarManage/returnCar'
import { definitionStart, getFormDetail } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import AdministrationCarDialog from '@/components/Popup/AdministrationCarPopup.vue'

export default {
  props: {
    proData: {
      type: String,
      default: () => {
        return ""
      },
    },
    local_val: {
      type: Object,
      default: {}
    },
    isformdisabled: {
      type: Boolean,
      default: true,
    },
  },
  components: { AdministrationCarDialog },
  data() {
    return {
      guihuanpicfileList:[],//归还里程数附件
      chushipicfileList:[],//初始借车里程数附件
      car_damage:[],
      isChoose:false,//项目选择框，默认false隐藏
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_huancheshenqing',
      },
      chushipicdata:{
        fieldName: 'chushipic',
        tableName: 'pms_huancheshenqing',
      },
      guihuanpicdata:{
        fieldName: 'guihuanpic',
        tableName: 'pms_huancheshenqing',
      },
      jiecheFileList:[],//借车附件
      fileListfujian:[],
      car_use_type:[],
      car_belong_area:[],
      formUserName: '',
      formDeptName: '',
      form: {
        variables: {
          dept: '',
          username: '',
          reson: '',
          means: '',
          printing: '',
          company: '',
          meanscompany: '',
          beizhu: '',
          fujian: '',
          times: '',
          yingxiaono: '',
          toubiaono: '',
          shengchanno: '',
          carno:'',
          carname:'',
        },
        // 必传值
        formTableName: '',
        formType: '',
        id: 0,
        formId: 0,
      },
      isUpdate: false,
      completeData: {
        comment: '退回重新审批',
        defaultTaskShow: true,
        delegateTaskShow: false,
        deployId: null,
        instanceId: '',
        multiple: false,
        procInsId: '',
        returnTaskShow: false,
        sendUserShow: true,
        targetKey: '',
        taskId: '',
        values: {},
        vars: '',
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      meansList: [],
      formDataTypeList: [],
      formCompanyNameList: [],
      formSealTypeList: [],
      formProcessState: [],
      printingShowList: [],
      uploadHeaders: {
        Authorization: '',
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        carname: [{ required: true, message: '请输入申请车辆', trigger: 'blur' }],
        chushichekuang: [{ required: true, message: '请选择初始车况', trigger: 'blur' }],
        guihuanchekuang: [{ required: true, message: '请选择归还车况', trigger: 'blur' }],
        chushipic: [{ required: true, message: '请上传初始里程数图片', trigger: 'change' }],
        guihuanpic: [{ required: true, message: '请上传归还里程数图片', trigger: 'change' }],
      },
    }
  },
  created() {
    this.getDicts('car_damage').then((response) => {
      this.car_damage = response.data
    })

    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }

    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId

    this.form.variables.id = this.$route.query && this.$route.query.carId
    this.form.id = this.$route.query && this.$route.query.carId
    this.getJiecheDetail(this.form.variables.id);
  },
  methods: {
    //里程数变化是触发
    jiecheLichengchange(	currentValue, oldValue){
      console.log(currentValue,oldValue)
      if( this.form.variables.jiechegongli && this.form.variables.huanchegongli ){
        if(this.form.variables.huanchegongli - this.form.variables.jiechegongli < 0){
          this.$message({
            message: '还车公里数不能小于借车公里数',
            type: 'warning'
          });
          if( oldValue < currentValue ){
            this.form.variables.jiechegongli = oldValue;
          }
          return false;
        }
        this.form.variables.xingchenggongli = this.form.variables.huanchegongli - this.form.variables.jiechegongli;
      }
    },
    huancheLichengchange(	currentValue, oldValue){
      if( this.form.variables.jiechegongli && this.form.variables.huanchegongli ){
        if(this.form.variables.huanchegongli - this.form.variables.jiechegongli < 0){
          this.$message({
            message: '还车公里数不能小于借车公里数',
            type: 'warning'
          });
          if( oldValue > currentValue ){
            this.form.variables.huanchegongli = oldValue;
          }
          return false;
        }
        this.form.variables.xingchenggongli = this.form.variables.huanchegongli - this.form.variables.jiechegongli;
      }
    },

    getJiecheDetail(id){
      let data = {
        id: id,
        tableName: "pms_huancheshenqing",
      }
      if(id){
        getFormDetail(data).then((res) => {
          this.form.variables.carname = res.data.carname;
          this.form.variables.num = res.data.num;
          this.form.variables.shenqingshiyou = res.data.shenqingshiyou;
          this.form.variables.yongtuleixing = res.data.yongtuleixing;
          this.form.variables.mudidi = res.data.mudidi;
          this.form.variables.suoshuquyu = res.data.suoshuquyu;
          this.form.variables.jieyongtime = res.data.jieyongtime;
          this.form.variables.guihuantime = res.data.guihuantime;
          this.form.variables.zhuangtai = res.data.zhuangtai;
          this.form.variables.id = res.data.id;
          this.form.variables.fujian = res.data.fujian;
          this.form.variables.jiechebeizhu = res.data.jiechebeizhu;
          if(this.form.variables.fujian) {
            this.getjiecheFileDetail(this.form.variables.fujian);
          }
        })
      }
  },
    // 处理借车信息附件
    async getjiecheFileDetail(id) {
      const { code, data, msg } = await getFileDetail(id)
      console.log({ code, data, msg })
      if (code == 200) {
        data.map((item) => {
          if( item.tableName == 'pms_oa_carbook' ){
            this.jiecheFileList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
          }
        })
      }
    },
    //接收子组件传过来的被选择的项目
    choosedProect(data){
      if(data){
        this.form.variables.carno = data.carno;
        this.form.variables.carname = data.carno;
      }
      this.isChoose = false;
    },
    //选择项目
    chooseProjectData(){
      this.isChoose = true;
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.fujian =
        this.form.variables.fujian == null ? '' : this.form.variables.fujian
 this.form.variables.fujian += `;${data[0].fileId}`
      console.log( this.form.variables.fujian)
    },
    //初始里程数附件单独处理校验--上传成功，去除校验
    chushipicHandleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.fujian =
        this.form.variables.fujian == null ? '' : this.form.variables.fujian
 this.form.variables.fujian += `;${data[0].fileId}`
      this.rules.chushipic = []
      this.$refs.form.clearValidate('chushipic')
    },
    //归还里程数附件单独处理校验--上传成功，去除校验
    guihuanpicHandleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.fujian =
        this.form.variables.fujian == null ? '' : this.form.variables.fujian
      this.form.variables.fujian = this.form.variables.fujian == null ? '' : this.form.variables.fujian
 this.form.variables.fujian += `;${data[0].fileId}`
      this.rules.guihuanpic = []
      this.$refs.form.clearValidate('guihuanpic')
    },
    printingChange(arr) {
      console.log(arr, arr.length)
      this.form.variables.printing = arr.join(';')
      if (arr.length > 0) {
        this.$refs.printingCheck.clearValidate()
      } else {
        this.$refs.form.validateField('printing')
      }
    },
    onSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          // const procInsId = localStorage.getItem('procInsId')
          let procInsId = this.local_val.procInsId
          if (procInsId != '' && typeof (procInsId) != 'undefined' && procInsId != 'undefined') {
            this.completeData.instanceId = procInsId
            this.completeData.procInsId = procInsId
            // const taskId = localStorage.getItem('taskId')
            const taskId = this.local_val.taskId
            if (taskId) {
              this.completeData.taskId = taskId
            }
            console.log('审批更新逻辑', this.form)
            const updateSealmsg = await addReturnCar({
              id: this.form.variables.id,
              ...this.form.variables,
            })
            if (updateSealmsg.code == 200) {
              const completemsg = await complete(this.completeData)
              if (completemsg.code == 200) {
                this.msgSuccess(completemsg.msg)
                this.goBack()
              }
            }
          } else {
            // this.form.formTableName = localStorage.getItem('formTableName')
            // this.form.formType = localStorage.getItem('formType')
            // let procDefId = localStorage.getItem('procDefId')

            this.form.formTableName = this.local_val.formTableName
            this.form.formType = this.local_val.formType
            let procDefId = this.local_val.procDefId

            console.log('submit!', this.form)
            const { code, data } = await updateReturnCar({
              ...this.form.variables,
            })
            if (code == 200) {
              const { code, msg } = await definitionStart(procDefId, this.form)
              if (code == 200) {
                this.msgSuccess(msg)
                this.goBack()
              }
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goBack() {
      // 关闭当前标签页并返回上个页面
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
      localStorage.setItem("needLoadList","yes")
    },
    async getFileDetail(id) {
      const { code, data, msg } = await getFileDetail(id)
      console.log({ code, data, msg })
      if (code == 200) {
        data.map((item) => {
          if(item.tableName == 'pms_oa_carbook'){
            this.jiecheFileList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
          }else if (item.fieldName == 'fujian'){
            this.fileListfujian.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
          }else if (item.fieldName == 'chushipic'){
            this.chushipicfileList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
          }else if (item.fieldName == 'guihuanpic'){
            this.guihuanpicfileList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
          }
        })
      }
    },
    //初始里程数图片单独处理检验必填--删除附件，添加校验
    chushipicHandleRemove(file, filelist) {
      let arr = this.form.variables.fujian.split(";");
      arr.splice(arr.indexOf(file.id),1);
      this.form.variables.fujian = arr.join(';')
      if( filelist.length == 0 ){
        //初始里程数附件为空，动态添加校验
        this.rules.chushipic = [{ required: true, message: '请上传初始里程数图片', trigger: 'change' }]
      }
    },
    //归还里程数图片单独处理检验必填--删除附件，添加校验
    guihuanpicHandleRemove(file, filelist) {
      let arr = this.form.variables.fujian.split(";");
      arr.splice(arr.indexOf(file.id),1);
      this.form.variables.fujian = arr.join(';')
      if( filelist.length == 0 ){
        //初始里程数附件为空，动态添加校验
        this.rules.guihuanpic = [{ required: true, message: '请上传归还里程数附件', trigger: 'change' }]
      }
    },
    handleRemove(file, filelist) {
      /*let idArr
      if (this.form.variables.id) {
        idArr = this.jiecheFileList.map((item) => item.id)
        idArr = idArr.concat(this.chushipicfileList.map((item) => item.id));
        idArr = idArr.concat(this.guihuanpicfileList.map((item) => item.id));
        idArr = idArr.concat(this.fileListfujian.map((item) => item.id));
      } else {
        idArr = idArr = this.jiecheFileList.map((item) => item.response.data[0].fileId)
        idArr = idArr.concat(this.chushipicfileList.map((item) => item.response.data[0].fileId))
        idArr = idArr.concat(this.guihuanpicfileList.map((item) => item.response.data[0].fileId))
        idArr = idArr.concat(this.fileListfujian.map((item) => item.response.data[0].fileId))
      }
      idArr.splice(idArr.indexOf(file.id,1));
      this.form.variables.fujian = idArr.join(';')
      console.log(idArr)
      console.log("jiecheFileList",this.jiecheFileList)
      console.log("chushipicfileList",this.chushipicfileList)
      console.log("guihuanpicfileList",this.guihuanpicfileList)
      console.log("fileListfujian",this.fileListfujian)*/
      let arr = this.form.variables.fujian.split(";");
      arr.splice(arr.indexOf(file.id),1);
      this.form.variables.fujian = arr.join(';')
    },
  },
  watch: {
    proData: {
      handler(val) {
        console.log(val)
        if (val) {
          let dataArr = JSON.parse(val)
          this.form.variables = {
            ...dataArr[0],
          }
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
        } else {
          this.form.variables.createTime = formatDate(new Date().getTime())
          const currentUser = this.$store.getters.user
          this.form.variables.createUserName = this.formUserName = currentUser.nickName
          this.form.variables.createUserId = currentUser.userId
          this.form.variables.createDeptName = this.formDeptName = currentUser.dept.deptName
          this.form.variables.createDeptId = currentUser.deptId
        }
        this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
      },
      immediate: true,
    },
  },
}
</script>
<style scoped lang="scss">
.but-form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
