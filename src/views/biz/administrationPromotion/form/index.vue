<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-18 10:38:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jshxpms-vue\src\views\flowable\formView\test.vue
-->
<template>
  <el-form
    ref="form"
    :model="form.variables"
    :rules="rules"
    label-width="140px"
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
        <el-form-item label="申请人" prop="username">
          <el-input v-model="formUserName" disabled placeholder="请输入申请人" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="申请部门" prop="dept">
          <el-input v-model="formDeptName" disabled placeholder="请输入申请部门" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
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
      <el-col :span="12">
        <el-form-item label="申请编号" prop="bianhao">
          <el-input v-model="form.variables.bianhao" disabled placeholder="系统自动生成" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="推进预算" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="协同推进人员" prop="peitongrenyuan">
          <el-input
            v-model="traininguserName"
            :disabled="!isformdisabled"
            placeholder="请选择协同推进人员"
            style="width:100%;"
            @focus="dialogName = 'participantsDialog'"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="人数" prop="gongguanrenshu">
          <template>
            <el-input-number
              v-model="form.variables.gongguanrenshu"
              step-strictly
              :step="1"
              :min="0"
              :max="9999999999"
              placeholder="请输入人数"
              style="width:100%;"
              :disabled="!isformdisabled"
            ></el-input-number>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="推进时间" prop="yanqingtime">
          <el-date-picker
            v-model="form.variables.yanqingtime"
            type="datetime"
            placeholder="选择推进时间"
            :disabled="!isformdisabled"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:100%;"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="材料种类" prop="jiushuibiaozhun">
          <el-select
            v-model="form.variables.jiushuibiaozhun"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择材料种类"
            style="width:100%;"
          >
            <el-option
              v-for="item in formMaterialList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="材料数量" prop="nums">
          <template>
            <el-input-number
              v-model="form.variables.nums"
              step-strictly
              :step="1"
              :min="0"
              :max="9999999999"
              placeholder="请输入材料数量"
              style="width:100%;"
              :disabled="!isformdisabled"
            ></el-input-number>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="推进事由" prop="beizhu">
          <el-input
            v-model="form.variables.beizhu"
            type="textarea"
            :rows="2"
            :disabled="!isformdisabled"
            placeholder="请输入推进事由"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="其他费用(元)" prop="qitafeiyong">
          <template>
            <el-input-number
              v-model="form.variables.qitafeiyong"
              :precision="2"
              :step="1"
              :min="0"
              :max="9999999999"
              placeholder="请输入其他费用"
              style="width:100%;"
              :disabled="!isformdisabled"
            ></el-input-number>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="本次推进成本(元)" prop="jine">
          <el-input v-model="computeTotalCost" disabled placeholder="系统自动计算" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注" prop="beizhu2">
          <el-input
            v-model="form.variables.beizhu2"
            type="textarea"
            :rows="2"
            :disabled="!isformdisabled"
            placeholder="请输入备注"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="附件" prop="file">
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
            :data="fileData"
            style="width:100%;"
            multiple
          >
            <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <candidateUsersDialog
      v-if="dialogName === 'participantsDialog'"
      @close="finishParticipants"
      :list="treeselectData"
    />
  </el-form>
</template>

<script>
import { save } from '@/api/biz/administrationPromotion'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import candidateUsersDialog from '@/components/Process/components/nodePanel/property/candidateUsers'
import { treeselect } from '@/api/system/dept'

export default {
  components: {  candidateUsersDialog },
  props: {
    proData: {
      type: String,
      default: () => {
        return ''
      }
    },
    local_val: {
      type: Object,
      default: {}
    },
    isformdisabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      usersList: [],
      dialogName: '',
      treeselectData: [],
      traininguserName: '',
      isChoose: false,
      fileList: [],
      fileData: {
        fieldName: 'fujian',
        tableName: 'pms_administration_promotion'
      },
      formUserName: '',
      formDeptName: '',
      form: {
        variables: {
          fujian: '',
          nums: 0,
          qitafeiyong: 0,
          zongyusuan: 0

        },
        // 必传值
        formTableName: '',
        formType: '',
        id: 0,
        formId: 0
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
        vars: ''
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      formMaterialList: [],
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        gongguanrenshu: [
          { required: true, message: '请输入人数', trigger: 'blur' }
        ],
        jiushuibiaozhun: [{ required: true, message: '请选择材料种类', trigger: 'blur' }],
        nums: [
          { required: true, message: '请输入材料数量', trigger: 'blur' }
        ],
        beizhu: [
          { required: true, message: '请输入推进事由', trigger: 'blur' }
        ],

      }
    }
  },
  created() {
    // 材料种类
    this.getDicts('project_promotion_material_type').then((res) => {
      this.formMaterialList = res.data
    })
    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }
    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
    this.gettreeselect()
  },
  methods: {
    gettreeselect() {
      treeselect().then((res) => {
        this.treeselectData = res.data.map((item) => {
          item.value = item.id
          return item
        })
      })
    },
    finishParticipants(checkList) {
      this.dialogName = ''
      this.form.variables.peitongrenyuan = checkList.map((item) => item.userId).join(',')
      this.traininguserName = checkList.map((item) => item.nickName).join(',')
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccess({ data }, file, fileList) {
      this.form.variables.fujian = this.form.variables.fujian == null ? '' : this.form.variables.fujian
      this.form.variables.fujian += `;${data[0].fileId}`
    },
    onSubmit() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          let procInsId = this.local_val.procInsId
          console.log('procInsId', procInsId)
          if (procInsId != '' && typeof (procInsId) != 'undefined' && procInsId != 'undefined') {
              this.completeData.instanceId = procInsId
              this.completeData.procInsId = procInsId
              // const taskId = localStorage.getItem('taskId')
              const taskId = this.local_val.taskId
              if (taskId) {
                this.completeData.taskId = taskId
              }
              const updateSealmsg = await save({
                id: this.form.id,
                ...this.form.variables
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

              const { code, data } = await save({
                ...this.form.variables
              })
              let totalCost = this.form.variables.jine
              let peopleNum = this.form.variables.gongguanrenshu
              let per = totalCost/peopleNum
              let selected = '0'
              if(totalCost > 2000 || per > 200){
                selected = '1'
              }
              this.form.selected = selected
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
      if (code == 200) {
        data.map((item) => {
          this.fileList.push({
            name: item.fileName,
            url: item.savePath,
            id: item.id
          })
        })
      }
    },
    handleRemove(file, fileList) {
      let idArr
      if (this.form.variables.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.form.variables.fujian = idArr.join(';')
    }
  },
  watch: {
    proData: {
      handler(val) {
        this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
        if (val) {
          let dataArr = JSON.parse(val)
          this.form.variables = {
            ...dataArr[0]
          }
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
        } else {
          const currentUser = this.$store.getters.user
          this.formUserName = currentUser.nickName
          this.formDeptName = currentUser.dept.deptName
          this.form.variables.createTime = formatDate(new Date().getTime())
        }
      },
      immediate: true
    },
    form: {
      handler(val) {
        if (val.variables.peitongrenyuan) {
          // 用户列表
          this.getUserAll().then((res) => {
            this.usersList = res
            this.traininguserName = this.selectUserNameByUserId(this.usersList, val.variables.peitongrenyuan)
          })

        }

      },
      deep: true
    }
  },
  computed: {
    computeTotalCost: function() {
      let materialCost =
        this.form.variables.jiushuibiaozhun == null
          ? 0
          : this.form.variables.jiushuibiaozhun
      let materialNum =
        this.form.variables.nums == null
          ? 0
          : this.form.variables.nums
      let otherCost =
        this.form.variables.qitafeiyong == null
          ? 0
          : this.form.variables.qitafeiyong
      let totalCost = parseFloat(
        materialCost * materialNum + otherCost
      ).toFixed(2)
      this.form.variables.jine = totalCost
      return totalCost
    }

  }
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

