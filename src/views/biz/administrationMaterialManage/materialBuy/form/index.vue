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
        <el-form-item label="基本信息" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="申请部门" prop="dept">
          <el-input v-model="formDeptName" disabled placeholder="请输入申请部门" style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="申请时间" prop="createTime">
          <el-date-picker
            v-model="form.variables.createTime"
            type="datetime"
            placeholder="选择申请时间"
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
        <el-form-item label="申请人" prop="username">
          <el-input v-model="formUserName" disabled placeholder="请输入申请人" style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="预算（元）" prop="yusuan">
          <el-input-number v-model="form.variables.yusuan" placeholder="请输入预算（元）" style="width:100%;" :disabled="!isformdisabled":precision="2"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="采购编号" prop="caigounum">
          <el-input v-model="form.variables.caigounum" placeholder="系统自动生成采购编号" style="width:100%;" :disabled="true"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="需求部门" prop="xuqiubumen">
          <treeselect v-model="form.variables.xuqiubumen" :options="deptOptions" :show-count="true" placeholder="请选择归属部门" :disabled="!isformdisabled"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="耗材类型" prop="cailiaoleixing">
          <el-select
            v-model="form.variables.cailiaoleixing"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择耗材类型"
            style="width:100%;"
          >
            <el-option
              v-for="item in material_type"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注" prop="beizhu">
          <el-input
            v-model="form.variables.beizhu"
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
        <el-form-item label="附件" prop="fujian">
          <el-upload
            :before-upload="checkMyFileSize"
            class="upload-demo"
            :disabled="!isformdisabled"
            :headers="uploadHeaders"
            :action="uploadUrl"
            :on-success="handleAvatarSuccess"
            :file-list="fileList"
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

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="需求内容" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="mb8" v-if="isformdisabled">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddPmsCailiaoxiangqing">添加</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeletePmsCailiaoxiangqing">删除</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-table border :data="form.variables.pmsCailiaoxiangqingList" :row-class-name="rowPmsCailiaoxiangqingIndex" @selection-change="handlePmsCailiaoxiangqingSelectionChange" ref="pmsCailiaoxiangqing">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="供应商名称" prop="name">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入供应商名称" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
          <el-table-column label="材料名称" prop="qicainame">
            <template slot-scope="scope">
              <el-input v-model="scope.row.qicainame" placeholder="请输入材料名称" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
          <el-table-column label="规格型号" prop="leixing">
            <template slot-scope="scope">
              <el-input v-model="scope.row.leixing" placeholder="请输入规格型号" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
          <el-table-column label="品牌" prop="pinpai">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pinpai" placeholder="请输入品牌" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="danwei">
            <template slot-scope="scope">
              <el-input v-model="scope.row.danwei" placeholder="请输入单位" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="shuliang">
            <template slot-scope="scope">
              <el-input-number size="mini" :min=0 v-model="scope.row.shuliang" placeholder="请输入数量" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
          <el-table-column label="市场参考价" prop="jianyidanjia">
            <template slot-scope="scope">
              <el-input v-model="scope.row.jianyidanjia" placeholder="请输入市场参考价" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
          <el-table-column label="实际采购价" prop="shijiacaigoujia">
            <template slot-scope="scope">
              <el-input v-model="scope.row.shijiacaigoujia" placeholder="请输入实际采购价" :disabled="!isformdisabled"/>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px; margin-top:10px;">
      <el-col :span="12">
        <el-form-item label="市场参考总额（元）" prop="shichangcankaoTotal" label-width="200px">
          <el-input v-model="shichangcankaoTotal" disabled placeholder="请输入合计" style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="实际采购总额（元）" prop="shijicaigouTotal" label-width="200px">
          <el-input v-model="shijicaigouTotal" disabled placeholder="请输入合计" style="width:100%;" />
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</template>

<script>
import { addMaterialBuy, getMaterialBuy, updateMaterialBuy } from '@/api/biz/administrationMaterialManage/materialBuy'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import { treeselect } from '@/api/system/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  computed: {
    shichangcankaoTotal: function() {
      let num = 0.0
      this.form.variables.pmsCailiaoxiangqingList.forEach((item) => {
        num += item.shuliang * item.jianyidanjia
      })
      return num.toFixed(2)
    },
    shijicaigouTotal: function () {
      let num = 0.0
      this.form.variables.pmsCailiaoxiangqingList.forEach((item) => {
        num += item.shuliang * item.shijiacaigoujia
      })
      return num.toFixed(2)
    },
  },
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
  components: { Treeselect },
  data() {
    return {
      // 子表选中数据
      checkedPmsCailiaoxiangqing: [],
      // 耗材采购子表表格数据
      pmsCailiaoxiangqingList: [],
      material_type:[],
      deptOptions: undefined,
      isChoose:false,//项目选择框，默认false隐藏
      fujiandata: {
        fieldName: 'fujian',
        tableName: 'pms_cailiaocaigou',
      },
      fileList: [],
      car_use_type:[],
      car_belong_area:[],
      formUserName: '',
      formDeptName: '',
      form: {
        variables: {
          id: '',
          title: '',
          created: '',
          modified: '',
          creator: '',
          modificator: '',
          recycle: '',
          name: '',
          dept: '',
          projectname: '',
          time: '',
          fuzeren: '',
          num: '',
          gongyingshang: '',
          cailiao: '',
          jine: '',
          fujian: '',
          caigounum: '',
          agree: '',
          leixing: '',
          xuqiudanwei: '',
          xuqiubumen: undefined,
          shuoming: '',
          projectleixing: '',
          cast: '',
          shenqingtime: '',
          cailiaoleixing: '',
          jianyizonge: '',
          shijizonge: '',
          jieshengbi: '',
          beizhu: '',
          gysname: '',
          gsname: '',
          yusuan: '',
          qinggoubianhao: '',
          qinggouren: '',
          qinggoubumen: '',
          qinggoudanwei: '',
          xiangmujingli: '',
          qinggougys: '',
          gysmingxi: '',
          qinggoubeizhu: '',
          qinggoufujian: '',
          jsonData: '',
          parentid: '',
          pmsCailiaoxiangqingList:[
            {
               name: '',
               qicainame: '',
               leixing: '',
               pinpai: '',
               danwei: '',
               shuliang: '',
               jianyidanjia: '',
               shijiacaigoujia: '',
            }
          ],
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
        xuqiubumen: [{ required: true, message: '请选择需求部门', trigger: 'blur' }],
        cailiaoleixing: [{ required: true, message: '请选择耗材类型', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getDicts('material_type').then((response) => {
      this.material_type = response.data
    })
    this.getTreeselect();
    console.log(this.local_val)
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }

    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
    console.log(this)
  },
  methods: {
    /** 单选框选中数据 */
    handlePmsCailiaoxiangqingSelectionChange(selection) {
      /*if (selection.length > 1) {
        this.$refs.pmsCailiaoxiangqing.clearSelection();
        this.$refs.pmsCailiaoxiangqing.toggleRowSelection(selection.pop());
      } else {
        this.checkedPmsCailiaoxiangqing = selection;
      }*/
      this.checkedPmsCailiaoxiangqing = selection.sort(
        (a, b) => b.index - a.index
      )
    },
    /** 耗材采购子表序号 */
    rowPmsCailiaoxiangqingIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 耗材采购子表添加按钮操作 */
    handleAddPmsCailiaoxiangqing() {
      let obj = {};
      obj.name = "";
      obj.qicainame = "";
      obj.leixing = "";
      obj.pinpai = "";
      obj.danwei = "";
      obj.shuliang = "";
      obj.jianyidanjia = "";
      obj.shijiacaigoujia = "";
      this.form.variables.pmsCailiaoxiangqingList.push(obj);
    },
    /** 耗材采购子表删除按钮操作 */
    handleDeletePmsCailiaoxiangqing() {
      if (this.checkedPmsCailiaoxiangqing.length == 0) {
        this.$alert("请先选择要删除的耗材采购子表数据", "提示", { confirmButtonText: "确定", });
      } else {
        this.checkedPmsCailiaoxiangqing.forEach((item) => {
          this.form.variables.pmsCailiaoxiangqingList.splice(item.index, 1);
        })
        if (this.form.variables.pmsCailiaoxiangqingList.length == 0) {
          this.handleAddPmsCailiaoxiangqing()
        }
      }
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.deptOptions = response.data;
      });
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
          const procInsId = this.local_val.procInsId
          if (procInsId != '' && typeof (procInsId) != 'undefined' && procInsId != 'undefined') {
            this.completeData.instanceId = procInsId
            this.completeData.procInsId = procInsId
            // const taskId = localStorage.getItem('taskId')
            const taskId = this.local_val.taskId
            if (taskId) {
              this.completeData.taskId = taskId
            }
            console.log('审批更新逻辑', this.form)
            const updateSealmsg = await updateMaterialBuy({
              id: this.form.id,
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
            const { code, data } = await addMaterialBuy({
              ...this.form.variables,
            })
            if (code == 200) {
              this.form.id = data
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
          if( item.tableName == 'pms_cailiaocaigou' ){
            this.fileList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
          }
        })
      }
    },
    handleRemove(file, fileList) {
      // let idArr
      // if (this.form.variables.id) {
      //   idArr = fileList.map((item) => item.id)
      // } else {
      //   idArr = fileList.map((item) => item.response.data[0].fileId)
      // }
      // this.form.variables.fujian = idArr.join(';')
      let arr = this.form.variables.fujian.split(";");
      arr.splice(arr.indexOf(file.id),1);
      this.form.variables.fujian = arr.join(';')
    },
  },
  watch: {
    proData: {
      async handler(val) {
        console.log(val)
        if (val) {
          let dataArr = JSON.parse(val)
          const { data } = await getMaterialBuy(dataArr[0].id)
          this.form.variables = {
            ...data,
          }
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
        } else {
          this.form.variables.createTime = formatDate(new Date().getTime())
          const currentUser = this.$store.getters.user
          this.formUserName = currentUser.nickName
          this.form.variables.createUserId = currentUser.userId
          this.formDeptName = currentUser.dept.deptName
          this.form.variables.createDeptId = currentUser.deptId

          // initHtbh({sequnceCode: "administrationMaterialBuyNum"}).then( (res) => {
          //   this.$set(this.form.variables, 'caigounum', res.data)
          // })

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
