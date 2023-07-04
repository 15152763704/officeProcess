<template>
  <div class="app-container" ref="printContent" id="printContent">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="el-icon-document">基础信息</span>
        <el-button v-if="isread == '2'" style="float: right;" @click="handleReaded">设为已阅</el-button>
        <el-button style="float: right;" v-if="isCommitBtnShow" @click="closeThisPannel">关 闭</el-button>
        <el-button
          style="float: right; margin-right:1rem;"
          type="primary"
          @click="onSubmit"
          v-if="isCommitBtnShow"
        >提 交
        </el-button>
              <el-button
                style="float: right; margin-right:1rem;"
                 type="primary"
               @click="handleResume"
                  v-if="isTakeBack"
             >拿 回
                </el-button>
      </div>

      <!--流程处理表单模块-->
      <el-col :span="16" :offset="6" v-if="variableOpen">
        <div>
          <parser :key="new Date().getTime()" :form-conf="variablesData"/>
        </div>
      </el-col>

      <!--初始化流程加载表单信息-->
      <el-col :span="16" :offset="4" v-if="formConfOpen">
        <div class="test-form">
          <parser
            :key="new Date().getTime()"
            :form-conf="formConf"
            @submit="submitForm"
            ref="parser"
            @getData="getData"
          />
        </div>
      </el-col>
      <el-col :span="16" :offset="4" v-else>
        <!-- <iframe
          v-if="formRouterPath"
          :src="formRouterPath"
          frameborder="0"
          width="100%"
          ref="iframeId"
          height="66rem"
        ></iframe>-->
        <router-view ref="child" :flowRecordList="flowRecordList" :isCommitBtnShow="!isCommitBtnShow"
                     :isformdisabled="isformdisabled"
                     :local_val="local_val" :proData="proData"
        />
      </el-col>
    </el-card>
    <!--流程流转记录-->
    <el-card class="box-card" v-if="flowRecordList.length > 0">
      <div slot="header" class="clearfix">
        <span class="el-icon-notebook-1">审批记录</span>
      </div>
      <el-col :span="16" :offset="4">
        <div class="block">
          <el-timeline>
            <template v-for="(item,index ) in flowRecordList">
              <el-timeline-item
                :key="index"
                v-if="item.taskId"
                :icon="setIcon(item.finishTime)"
                :color="setColor(item.finishTime)"
              >
                <p style="font-weight: 700">{{ item.taskName }}</p>
                <el-card :body-style="{ padding: '1rem' }">
                  <label v-if="item.assigneeName" style="font-weight: normal;margin-right: 3rem;">
                    实际办理： {{ item.assigneeName }}
                    <el-tag size="mini" type="info">{{ item.deptName }}</el-tag>
                  </label>
                  <label
                    v-if="item.candidate"
                    style="font-weight: normal;margin-right: 3rem;"
                  >候选办理： {{ item.candidate }}</label>
                  <label style="font-weight: normal">接收时间：</label>
                  <label style="color:#8a909c;font-weight: normal">{{ item.createTime }}</label>
                  <label v-if="item.finishTime" style="margin-left: 3rem;font-weight: normal">办结时间：</label>
                  <label style="color:#8a909c;font-weight: normal">{{ item.finishTime }}</label>
                  <label v-if="item.duration" style="margin-left: 3rem;font-weight: normal">耗时：</label>
                  <label style="color:#8a909c;font-weight: normal">{{ item.duration }}</label>

                  <p v-if="item.comment">
                    <span v-if="item.comment.type === '1'">
                      审批意见:
                      <el-tag type="success">{{ item.comment.comment }}</el-tag>
                    </span>
                    <span v-if="item.comment.type === '2'">
                      退回意见:
                      <el-tag type="warning">{{ item.comment.comment }}</el-tag>
                    </span>
                    <span v-if="item.comment.type === '3'">
                      不予批准意见:
                      <el-tag type="danger">{{ item.comment.comment }}</el-tag>
                    </span>
                    <span v-if="item.comment.type === '7'">
                      拿回原因:
                      <el-tag type="info">{{ item.comment.comment }}</el-tag>
                    </span>
                  </p>
                </el-card>
              </el-timeline-item>
            </template>
          </el-timeline>
        </div>
      </el-col>
    </el-card>
    <el-card class="box-card flow-box noprint" v-if="istaskList">
      <div slot="header" class="clearfix">
        <span class="el-icon-picture-outline">流程图</span>
      </div>
      <flow :xmlData="xmlData" :taskData="taskList"></flow>
    </el-card>

    <!--审批正常流程-->
    <el-dialog :title="completeTitle" :visible.sync="completeOpen" width="30%">
      <el-row type="flex" justify="center" style="margin-bottom: 2rem;">
        <el-input v-model="taskForm.comment" :rows="4" placeholder="请输入处理意见" type="textarea"/>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button @click="completeOpen = false">取 消</el-button>
        <el-button type="primary" @click="taskComplete">确 定</el-button>
      </el-row>
    </el-dialog>

    <!--退回流程-->
    <el-dialog :title="returnTitle" :visible.sync="returnOpen" width="30%">
      <el-row type="flex" justify="center" style="margin-bottom: 2rem;">
        <el-form ref="taskForm" :model="taskForm" style="width: 100%;">
          <el-form-item
            prop="comment"
            :rules="[{ required: true, message: '请输入退回意见', trigger: 'blur' }]"
          >
            <el-input v-model="taskForm.comment" :rows="4" placeholder="请输入退回意见" type="textarea"/>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button @click="returnOpen = false">取 消</el-button>
        <el-button type="primary" @click="taskReturn">确 定</el-button>
      </el-row>
    </el-dialog>

    <!--驳回流程-->
    <el-dialog :title="rejectTitle" :visible.sync="rejectOpen" width="30%">
      <el-row type="flex" justify="center" style="margin-bottom: 2rem;">
        <el-form ref="taskForm" :model="taskForm" style="width: 100%;">
          <el-form-item
            prop="comment"
            :rules="[{ required: true, message: '请输入不予批准意见', trigger: 'blur' }]"
          >
            <el-input v-model="taskForm.comment" :rows="4" placeholder="请输入意见" type="textarea"/>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button @click="rejectOpen = false">取 消</el-button>
        <el-button type="primary" @click="taskReject">确 定</el-button>
      </el-row>
    </el-dialog>

    <!--拿回流程-->
    <el-dialog :title="resumeTitle" :visible.sync="resumeOpen" width="30%">
      <el-row type="flex" justify="center" style="margin-bottom: 2rem;">
        <el-form ref="taskForm" :model="taskForm" style="width: 100%;">
          <el-form-item
            prop="comment"
            :rules="[{ required: true, message: '请输入拿回原因', trigger: 'blur' }]"
          >
            <el-input v-model="taskForm.comment" :rows="4" placeholder="请输入拿回原因" type="textarea"/>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button @click="resumeOpen = false">取 消</el-button>
        <el-button type="primary" @click="taskResume">确 定</el-button>
      </el-row>
    </el-dialog>

    <div class="Operationbuttongroup" style="font-size: 1.4rem;" v-if="isExamineShow">
      <!--                <el-button  icon="el-icon-edit-outline" type="primary" size="mini" @click="handleDelegate">委派</el-button>-->
      <!--                <el-button  icon="el-icon-edit-outline" type="primary" size="mini" @click="handleAssign">转办</el-button>-->
      <!--                <el-button  icon="el-icon-edit-outline" type="primary" size="mini" @click="handleDelegate">签收</el-button>-->
      <el-button icon="el-icon-edit-outline" type="primary" size="medium" @click="handleComplete">审批</el-button>
      <el-button icon="el-icon-refresh-left" type="primary" size="medium" @click="handleReturn">退回</el-button>
      <el-button icon="el-icon-circle-close" type="primary" size="medium" @click="handleReject">不予批准</el-button>
    </div>
  </div>
</template>

<script>
import { doSetReaded, flowRecord } from '@/api/flowable/finished'
import Parser from '@/components/parser/Parser'
import { definitionStart, getFlowViewer, getFormDetail, getProcessVariables, readXml } from '@/api/flowable/definition'
import { complete, delegate, getNextFlowNode, newRejectTask, newReturnTask, returnList } from '@/api/flowable/todo'
import flow from '@/views/flowable/task/record/flow'
import { treeselect } from '@/api/system/dept'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Treeselect from '@riophae/vue-treeselect'
import { listUser } from '@/api/system/user'

export default {
  name: 'Record',
  components: {
    Parser,
    flow,
    Treeselect
  },
  props: {},
  data() {
    return {
      ccId: '',//抄送id，不为空表示由抄送进入该页面
      isread: '',//是否显示抄送按钮，2（待阅状态）表示需要显示，
      img: '',
      local_val: {},
      isTakeBack: false,
      //提交暂存按钮是否显示
      isCommitBtnShow: true,
      //是否显示 审批三按钮
      isExamineShow: false,
      //是否表单可编辑
      isformdisabled: true,
      // 是否加载流程变量数据
      variableOpen: false,
      proData: '',
      // 模型xml数据
      xmlData: '',
      taskList: [],
      // 部门名称
      deptName: undefined,
      // 部门树选项
      deptOptions: undefined,
      // 用户表格数据
      userList: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 查询参数
      queryParams: {
        deptId: undefined
      },
      // 遮罩层
      loading: true,
      flowRecordList: [], // 流程流转数据
      formConfCopy: {},
      src: null,
      rules: {}, // 表单校验
      variablesForm: {}, // 流程变量数据
      taskForm: {
        id: '', //记录id
        returnTaskShow: false, // 是否展示回退表单
        delegateTaskShow: false, // 是否展示回退表单
        defaultTaskShow: true, // 默认处理
        sendUserShow: false, // 审批用户
        multiple: false,
        comment: '', // 意见内容
        procInsId: '', // 流程实例编号
        instanceId: '', // 流程实例编号
        deployId: '', // 流程定义编号
        taskId: '', // 流程任务编号
        procDefId: '', // 流程编号
        vars: '',
        targetKey: '',
        values: {}
      },
      userDataList: [], // 流程候选人
      assignee: null,
      formConf: {}, // 默认表单数据
      formConfOpen: false, // 是否加载默认表单数据
      variables: [], // 流程变量数据
      variablesData: {}, // 流程变量数据
      returnTaskList: [], // 回退列表数据
      finished: 'false',
      completeTitle: null,
      completeOpen: false,
      returnTitle: null,
      returnOpen: false,
      rejectOpen: false,
      rejectTitle: null,
      resumeOpen: false,
      resumeTitle: null,
      userData: [],
      formType: '',
      formRouterPath: '',
      formTableName: '',
      formId: 0,
      istaskList: true
    }
  },
  created() {
    this.ccId = this.$route.query && this.$route.query.ccId
    this.isread = this.$route.query && this.$route.query.isread

    this.taskForm.deployId = this.$route.query && this.$route.query.deployId
    this.taskForm.taskId = this.$route.query && this.$route.query.taskId
    this.taskForm.procInsId = this.$route.query && this.$route.query.procInsId
    this.taskForm.instanceId = this.$route.query && this.$route.query.procInsId
    this.taskForm.id = this.$route.query && this.$route.query.id
    this.taskForm.tableName = this.$route.query && this.$route.query.tableName
    // 初始化表单
    this.taskForm.procDefId = this.$route.query && this.$route.query.procDefId
    localStorage.setItem('procDefId', this.taskForm.procDefId)
    this.local_val.procDefId = this.taskForm.procDefId

    //查询流程详情
    this.getFormDetail(this.taskForm.id)
    // 回显流程记录
    /*this.getFlowViewer(this.taskForm.procInsId)
    this.getModelDetail(this.taskForm.deployId)*/
    // 流程任务重获取变量表单
    if (this.taskForm.taskId) {
      this.processVariables(this.taskForm.taskId)
      this.getNextFlowNode(this.taskForm.taskId)
      localStorage.setItem('taskId', this.taskForm.taskId)
      this.local_val.taskId = this.taskForm.taskId
      this.taskForm.deployId = null
    }
    /*this.getFlowRecordList(this.taskForm.procInsId, this.taskForm.deployId)*/
    this.finished = this.$route.query && this.$route.query.finished
    this.formId = this.$route.query && this.$route.query.formId
    localStorage.setItem('formId', this.formId)
    this.local_val.formId = this.formId
  },
  mounted() {
    // // 表单数据回填，模拟异步请求场景
    // setTimeout(() => {
    //   // 请求回来的表单数据
    //   const data = {
    //     field102: '18836662555'
    //   }
    //   // 回填数据
    //   this.fillFormData(this.formConf, data)
    //   // 更新表单
    //   this.key = +new Date().getTime()
    // }, 1000)
  },
  methods: {
    //设为已阅
    handleReaded() {
      doSetReaded(this.ccId).then((res) => {
        if (res.code == 200) {
          this.msgSuccess('操作成功')
          this.goBack()
        }
      })
    },
    //关闭当前页面
    closeThisPannel() {
      // console.log(this.$store.state.tagsView.visitedViews)//所有当前可见页面
      // console.log(this.$route.path)//当前页面的路由
      this.$store.state.tagsView.visitedViews.forEach(item => {
        if (this.$route.path == item.path) {
          this.$store.dispatch('tagsView/delView', item).then(({ visitedViews }) => {
            this.toLastView(visitedViews, item)
          })
        }
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },

    onSubmit() {
      this.$refs.child.onSubmit()
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then((response) => {
        this.deptOptions = response.data
      })
    },
    /** 查询用户列表 */
    getList() {
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.userList = response.rows
          this.total = response.total
        }
      )
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id
      this.getList()
    },
    /** xml 文件 */
    getModelDetail(deployId) {
      // 发送请求，获取xml
      readXml(deployId).then((res) => {
        this.xmlData = res.data
      })
    },
    getFormDetail(id) {
      let data = {
        id: id,
        tableName: this.taskForm.tableName
      }
      if (this.taskForm.procInsId || this.taskForm.deployId) {
        if (this.taskForm.procInsId) {
          this.getFlowViewer(this.taskForm.procInsId)
        }
        if (this.taskForm.deployId) {
          this.getModelDetail(this.taskForm.deployId)
        }
        this.getFlowRecordList(this.taskForm.procInsId, this.taskForm.deployId)
        localStorage.setItem('procInsId', this.taskForm.procInsId)
        this.local_val.procInsId = this.taskForm.procInsId
      } else if (id) {
        getFormDetail(data).then((res) => {
          this.taskForm.deployId = res.data.deploymentId
          this.taskForm.procInsId = res.data.proInsId
          this.taskForm.instanceId = res.data.proInsId
          this.getFlowRecordList(
            this.taskForm.procInsId,
            this.taskForm.deployId
          )
          localStorage.setItem('procInsId', this.taskForm.procInsId)
          this.local_val.procInsId = this.taskForm.procInsId
          if (this.taskForm.procInsId) {
            this.getFlowViewer(this.taskForm.procInsId)
          }
          if (this.taskForm.deployId) {
            this.getModelDetail(this.taskForm.deployId)
          }
          /*if (
            this.taskForm.deployId != undefined &&
            this.taskForm.procInsId != undefined
          ) {*/
          let data = []
          data.push(res.data)
          this.proData = JSON.stringify(data)
          /*}*/
        })
      }
    },
    getFlowViewer(procInsId) {
      getFlowViewer(procInsId).then((res) => {
        this.taskList = res.data
      })
    },
    setIcon(val) {
      if (val) {
        return 'el-icon-check'
      } else {
        return 'el-icon-time'
      }
    },
    setColor(val) {
      if (val) {
        return '#2bc418'
      } else {
        return '#b3bdbb'
      }
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.userData = selection
      const val = selection.map((item) => item.userId)[0]
      if (val instanceof Array) {
        this.taskForm.values = {
          approval: val.join(',')
        }
      } else {
        this.taskForm.values = {
          approval: val
        }
      }
    },
    // 关闭标签
    handleClose(tag) {
      this.userData.splice(this.userData.indexOf(tag), 1)
    },
    /** 流程变量赋值 */
    handleCheckChange(val) {
      if (val instanceof Array) {
        this.taskForm.values = {
          approval: val.join(',')
        }
      } else {
        this.taskForm.values = {
          approval: val
        }
      }
    },
    /** 流程流转记录 */
    async getFlowRecordList(procInsId, deployId) {
      const params = { procInsId: procInsId, deployId: deployId }
      const { code, data } = await flowRecord(params)

      if (code == 200) {
        if (data.flowList) {
          this.flowRecordList = data.flowList
          const firstdataUserId = data.flowList[0].assigneeId //当前处理节点
          const firstdataUserIdList = data.flowList.map((item) => {
            if (!item.finishTime) {
              return item.assigneeId
            }
          })
          const lastdataUserId =
            data.flowList[data.flowList.length - 1].assigneeId //申请人节点
          if (
            firstdataUserId == lastdataUserId &&
            firstdataUserIdList.indexOf(this.$store.getters.userId + '') != -1 &&
            (data.flowList[1].comment.type == 2 || data.flowList[1].comment.type == 7)
          ) {
            console.log('------------退回后提交---------------')
            this.variableOpen = false //退回后提交
            //提交暂存按钮是否显示
            this.isCommitBtnShow = true
            //是否显示 审批三按钮
            this.isExamineShow = false
            //是否表单可编辑
            this.isformdisabled = true
          } else {
            this.variableOpen = true
            // 判断 lastdataUserId 是否是 登录账户 是则可以审批
            if (firstdataUserIdList.indexOf(this.$store.getters.userId + '') != -1) {
              console.log('------------审批---------------')
              //提交暂存按钮是否显示
              this.isCommitBtnShow = false
              //是否显示 审批三按钮
              this.isExamineShow = true
              //是否表单可编辑
              this.isformdisabled = false
            } else {
              console.log('------------详情---------------')
              //提交暂存按钮是否显示
              this.isCommitBtnShow = false
              //是否显示 审批三按钮
              this.isExamineShow = false
              //是否表单可编辑
              this.isformdisabled = false

              if (lastdataUserId == this.$store.getters.userId && data.flowList[1].assigneeId == this.$store.getters.userId) {
                this.isTakeBack = true
                this.taskForm.taskId = data.flowList[0].taskId
              }
            }
          }
          // 判断 lastdataUserId 是否是 登录账户 是则可以审批
        } else {
          console.log('------------新增---------------')
          //提交暂存按钮是否显示
          this.isCommitBtnShow = true
          //是否显示 审批三按钮
          this.isExamineShow = false
          //是否表单可编辑
          this.isformdisabled = true
        }
        if (this.taskForm.id && this.taskForm.id.indexOf('HZ') != -1) {
          console.log('------------旧数据详情详情---------------')
          //提交暂存按钮是否显示
          this.isCommitBtnShow = false
          //是否显示 审批三按钮
          this.isExamineShow = false
          //是否表单可编辑
          this.isformdisabled = false
          // 关闭流程图显示
          this.istaskList = false
        }
        this.formType = data.sysForm.formType
        localStorage.setItem('formType', this.formType)
        this.formTableName = data.sysForm.formTableName
        localStorage.setItem('formTableName', this.formTableName)
        this.formRouterPath = data.sysForm.formRouterPath

        this.local_val.formType = this.formType
        this.local_val.formTableName = this.formTableName

        if (data.formData) {
          this.formConf = data.formData
          this.formConfOpen = true
        } else if (!this.taskForm.id) {
          this.proData = JSON.stringify(data?.proData)
        }
        this.$route.query.formId = data.sysForm.formId
        const taskIdCurr = data.flowList.filter(item => item.assigneeId == this.$store.getters.userId && !item.finishTime)[0].taskId
        this.taskForm.taskId = taskIdCurr
        this.$route.query.taskId = taskIdCurr
        localStorage.setItem('formId', this.formId)
        localStorage.setItem('taskId', taskIdCurr)

        this.local_val.formId = this.formId
        this.local_val.taskId = taskIdCurr
      } else {
        this.goBack()
      }
    },
    fillFormData(form, data) {
      form.fields.forEach((item) => {
        const val = data[item.__vModel__]
        if (val) {
          item.__config__.defaultValue = val
        }
      })
    },
    /** 获取流程变量内容 */
    processVariables(taskId) {
      if (taskId) {
        // 提交流程申请时填写的表单存入了流程变量中后续任务处理时需要展示
        getProcessVariables(taskId).then((res) => {
          // this.variables = res.data.variables;
          localStorage.setItem('id', res.data.id)
          this.local_val.id = res.data.id
          this.variablesData = res.data.variables
          this.variableOpen = true
        })
      }
    },
    /** 根据当前任务或者流程设计配置的下一步节点 */
    getNextFlowNode(taskId) {
      // 根据当前任务或者流程设计配置的下一步节点 todo 暂时未涉及到考虑网关、表达式和多节点情况
      const params = { taskId: taskId }
      getNextFlowNode(params).then((res) => {
        const data = res.data
        if (data) {
          if (data.type === 'assignee') {
            this.userDataList = res.data.userList
          } else if (data.type === 'candidateUsers') {
            this.userDataList = res.data.userList
            this.taskForm.multiple = true
          } else if (data.type === 'candidateGroups') {
            res.data.roleList.forEach((role) => {
              role.userId = role.roleId
              role.nickName = role.roleName
            })
            this.userDataList = res.data.roleList
            this.taskForm.multiple = false
          } else if (data.type === 'multiInstance') {
            this.userDataList = res.data.userList
            this.taskForm.multiple = true
          }
          this.taskForm.sendUserShow = true
        }
      })
    },
    /** 审批任务选择 */
    handleComplete() {
      this.completeOpen = true
      this.completeTitle = '审批流程'
      this.getTreeselect()
    },
    /** 拿回任务选择 */
    handleResume() {
      this.resumeOpen = true
      this.resumeTitle = '拿回流程'
    },
    /** 审批任务 */
    taskComplete() {
      // if (!this.taskForm.values){
      //   this.msgError("请选择流程接收人员");
      //   return;
      // }
      // if (!this.taskForm.comment){
      //   this.msgError("请输入审批意见");
      //   return;
      // }
      complete(this.taskForm).then((response) => {
        this.msgSuccess(response.msg)
        this.goBack()
      })
    },
    /** 委派任务 */
    handleDelegate() {
      this.taskForm.delegateTaskShow = true
      this.taskForm.defaultTaskShow = false
    },
    handleAssign() {
    },
    /** 返回页面 */
    goBack() {
      // 关闭当前标签页并返回上个页面
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
    },
    /** 接收子组件传的值 */
    getData(data) {
      if (data) {
        const variables = []
        data.fields.forEach((item) => {
          let variableData = {}
          variableData.label = item.__config__.label
          // 表单值为多个选项时
          if (item.__config__.defaultValue instanceof Array) {
            const array = []
            item.__config__.defaultValue.forEach((val) => {
              array.push(val)
            })
            variableData.val = array
          } else {
            variableData.val = item.__config__.defaultValue
          }
          variables.push(variableData)
        })
        this.variables = variables
      }
    },
    /** 申请流程表单数据提交 */
    submitForm(data) {
      if (data) {
        const variables = data.valData
        const formData = data.formData
        formData.disabled = true
        formData.formBtns = false
        if (this.taskForm.procDefId) {
          variables.variables = formData
          // 启动流程并将表单数据加入流程变量
          definitionStart(
            this.taskForm.procDefId,
            JSON.stringify(variables)
          ).then((res) => {
            this.msgSuccess(res.msg)
            this.goBack()
          })
        }
      }
    },
    /** 驳回任务 */
    handleReject() {
      this.rejectOpen = true
      this.rejectTitle = '不予批准流程'
    },
    /** 驳回任务 */
    taskReject() {
      this.$refs['taskForm'].validate((valid) => {
        if (valid) {
          newRejectTask(this.taskForm).then((res) => {
            this.msgSuccess(res.msg)
            this.goBack()
          })
        }
      })
    },
    /** 可退回任务列表 */
    handleReturn() {
      this.returnOpen = true
      this.returnTitle = '退回流程'
      returnList(this.taskForm).then((res) => {
        this.returnTaskList = res.data
        this.taskForm.values = null
      })
    },
    /** 提交退回任务 */
    taskReturn() {
      this.$refs['taskForm'].validate((valid) => {
        if (valid) {
          this.taskForm.operateType = 'return'
          newReturnTask(this.taskForm).then((res) => {
            this.msgSuccess(res.msg)
            this.goBack()
          })
        }
      })
    },
    /** 拿回任务 */
    taskResume() {
      this.$refs['taskForm'].validate((valid) => {
        if (valid) {
          this.taskForm.operateType = 'resume'
          newReturnTask(this.taskForm).then((res) => {
            this.msgSuccess(res.msg)
            this.goBack()
          })
        }
      })
    },
    /** 取消回退任务按钮 */
    cancelTask() {
      this.taskForm.returnTaskShow = false
      this.taskForm.defaultTaskShow = true
      this.taskForm.sendUserShow = true
      this.returnTaskList = []
    },
    /** 委派任务 */
    submitDeleteTask() {
      this.$refs['taskForm'].validate((valid) => {
        if (valid) {
          delegate(this.taskForm).then((response) => {
            this.msgSuccess(response.msg)
            this.goBack()
          })
        }
      })
    },
    /** 取消回退任务按钮 */
    cancelDelegateTask() {
      this.taskForm.delegateTaskShow = false
      this.taskForm.defaultTaskShow = true
      this.taskForm.sendUserShow = true
      this.returnTaskList = []
    }
  }
}
</script>
<style lang="scss" scoped>
.test-form {
  margin: 1.5rem auto;
  width: 80rem;
  padding: 1.5rem;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin-bottom: 2rem;
}

.flow-box {
  // height: 40rem;
}

.el-tag + .el-tag {
  margin-left: 1rem;
}

.el-button + .el-button {
  margin-left: 1.5rem;
}

.Operationbuttongroup {
  position: fixed;
  left: 52%;
  bottom: 2rem;
  transform: translateX(-50%);
}
</style>
