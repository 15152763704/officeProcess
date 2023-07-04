<template>
  <div>
    <x-form ref="xForm" v-model="formData" :config="formConfig">
      <template #executionListener>
        <el-badge :value="executionListenerLength">
          <el-button size="small" @click="dialogName = 'executionListenerDialog'">编辑</el-button>
        </el-badge>
      </template>
      <template #taskListener>
        <el-badge :value="taskListenerLength">
          <el-button size="small" @click="dialogName = 'taskListenerDialog'">编辑</el-button>
        </el-badge>
      </template>
      <template #multiInstance>
        <el-badge :is-dot="hasMultiInstance">
          <el-button size="small" @click="dialogName = 'multiInstanceDialog'">编辑</el-button>
        </el-badge>
      </template>
    </x-form>
    <executionListenerDialog
      v-if="dialogName === 'executionListenerDialog'"
      :element="element"
      :modeler="modeler"
      @close="finishExecutionListener"
    />
    <taskListenerDialog
      v-if="dialogName === 'taskListenerDialog'"
      :element="element"
      :modeler="modeler"
      @close="finishTaskListener"
    />
    <multiInstanceDialog
      v-if="dialogName === 'multiInstanceDialog'"
      :element="element"
      :modeler="modeler"
      @close="finishMultiInstance"
    />
    <singleCascaderDialog
      v-if="dialogName === 'singleCascaderDialog'"
      @close="finishsingleCascader"
      :list="treeselectData"
    />
    <candidateUsersDialog
      v-if="dialogName === 'candidateUsersDialog'"
      @close="finishCandidateUsers"
      :list="treeselectData"
    />
    <candidateUsersDialog
      v-if="dialogName === 'ccusersDialog'"
      @close="finishCcusers"
      :list="treeselectData"
    />
  </div>
</template>

<script>
import mixinPanel from '../../common/mixinPanel'
import executionListenerDialog from './property/executionListener'
import taskListenerDialog from './property/taskListener'
import multiInstanceDialog from './property/multiInstance'
import { commonParse, userTaskParse } from '../../common/parseElement'
import singleCascaderDialog from './property/singleCascader'
import candidateUsersDialog from './property/candidateUsers'
import { treeselect } from '@/api/system/dept'

export default {
  components: {
    executionListenerDialog,
    taskListenerDialog,
    multiInstanceDialog,
    singleCascaderDialog,
    candidateUsersDialog
  },
  mixins: [mixinPanel],
  props: {
    users: {
      type: Array,
      required: true
    },
    groups: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      treeselectData: [],
      userTypeOption: [
        { label: '指定人员', value: 'assignee' },
        { label: '指定群组', value: 'candidateUsers' }
        // { label: '相对关系', value: 'candidateGroups' },
      ],
      dataTypeOption: [
        { label: '固定', value: 'fixed' },
        { label: '动态', value: 'dynamic' }
      ],
      dialogName: '',
      executionListenerLength: 0,
      taskListenerLength: 0,
      hasMultiInstance: false,
      hasSingleCascader: false,
      hasCandidateUsers: false,
      formData: {},
      check: '',
      checkList: '',
      ccusersList: ''
    }
  },
  computed: {
    formConfig() {
      const _this = this
      return {
        inline: false,
        item: [
          {
            xType: 'input',
            name: 'id',
            label: '节点 id',
            rules: [{ required: true, message: 'Id 不能为空' }]
          },
          {
            xType: 'input',
            name: 'name',
            label: '节点名称',
            rules: [{ required: true, message: '节点名称不能为空' }]
          },
          {
            xType: 'input',
            name: 'documentation',
            label: '节点描述'
          },
          {
            xType: 'slot',
            name: 'executionListener',
            label: '执行监听器'
          },
          {
            xType: 'slot',
            name: 'taskListener',
            label: '任务监听器',
            show: !!_this.showConfig.taskListener
          },
          {
            xType: 'select',
            name: 'userType',
            label: '人员类型',
            dic: _this.userTypeOption,
            show: !!_this.showConfig.userType
          },
          {
            xType: 'radio',
            name: 'dataType',
            label: '指定方式',
            dic: _this.dataTypeOption,
            show: !!_this.showConfig.dataType,
            rules: [{ required: true, message: '请指定方式' }]
          },
          {
            xType: 'select',
            name: 'relationship',
            label: '相对关系',
            dic: [
              {
                value: '0',
                label: '申请人'
              },
              {
                value: '1',
                label: '中心主任'
              },
              {
                value: '2',
                label: '部门经理'
              },
              {
                value: '3',
                label: '分管副总'
              },
              {
                value: '-1',
                label: '自定义'
              }
            ],
            show:
              !!_this.showConfig.assignee &&
              _this.formData.userType === 'assignee' &&
              _this.formData.dataType === 'dynamic',
            change: (e) => {
              console.log(123,e)
              if (this.formData.dataType === 'dynamic') {
                if(e != '-1'){
                  // this.check.userId = '#{approval}'
                  this.formData.assignee = '#{approval}'
                  this.updateProperties({ 'flowable:assignee': '#{approval}' })
                }else{
                  this.formData.assignee = '#{formColVar}'
                  this.updateProperties({ 'flowable:assignee': '#{formColVar}' })
                }

              }
            }
          },
          {
            xType: 'input',
            name: 'assignee',
            label: '指定人员',
            value: this.check.userId,
            placeholder:
              this.formData.dataType === 'dynamic'
                ? '#{approval}'
                : '请点击选择人员',
            focus: () => {
              if (_this.formData.dataType !== 'dynamic') {
                this.dialogName = 'singleCascaderDialog'
              }
            },
            show:
              !!_this.showConfig.assignee &&
              _this.formData.userType === 'assignee'
          },
          {
            xType: 'input',
            name: 'assignee',
            label: '指定群组',
            value: this.checkList,
            focus: () => {
              this.dialogName = 'candidateUsersDialog'
              if (_this.formData.dataType === 'dynamic') {
                this.updateProperties({ 'flowable:assignee': '#{approval}' })
                this.check.userId = '#{approval}'
                this.formData.assignee = '#{approval}'
              }
            },
            show:
              !!_this.showConfig.candidateUsers &&
              _this.formData.userType === 'candidateUsers'
          },
          {
            xType: 'slot',
            name: 'multiInstance',
            label: '多实例'
          },
          {
            xType: 'switch',
            name: 'async',
            label: '异步',
            activeText: '是',
            inactiveText: '否',
            show: !!_this.showConfig.async
          },
          {
            xType: 'input',
            name: 'ccusers',
            label: '抄送人员',
            value: this.ccusersList,
            focus: () => (this.dialogName = 'ccusersDialog')
          },
          {
            xType: 'input',
            name: 'priority',
            label: '优先级',
            show: !!_this.showConfig.priority
          },
          {
            xType: 'input',
            name: 'formKey',
            label: '表单标识key',
            show: !!_this.showConfig.formKey
          },
          {
            xType: 'input',
            name: 'skipExpression',
            label: '跳过表达式',
            show: !!_this.showConfig.skipExpression
          },
          {
            xType: 'switch',
            name: 'isForCompensation',
            label: '是否为补偿',
            activeText: '是',
            inactiveText: '否',
            show: !!_this.showConfig.isForCompensation
          },
          {
            xType: 'switch',
            name: 'triggerable',
            label: '服务任务可触发',
            activeText: '是',
            inactiveText: '否',
            show: !!_this.showConfig.triggerable
          },
          {
            xType: 'switch',
            name: 'autoStoreVariables',
            label: '自动存储变量',
            activeText: '是',
            inactiveText: '否',
            show: !!_this.showConfig.autoStoreVariables
          },
          {
            xType: 'input',
            name: 'ruleVariablesInput',
            label: '输入变量',
            show: !!_this.showConfig.ruleVariablesInput
          },
          {
            xType: 'input',
            name: 'rules',
            label: '规则',
            show: !!_this.showConfig.rules
          },
          {
            xType: 'input',
            name: 'resultVariable',
            label: '结果变量',
            show: !!_this.showConfig.resultVariable
          },
          {
            xType: 'switch',
            name: 'exclude',
            label: '排除',
            activeText: '是',
            inactiveText: '否',
            show: !!_this.showConfig.exclude
          },
          {
            xType: 'input',
            name: 'class',
            label: '类',
            show: !!_this.showConfig.class
          },
          {
            xType: 'datePicker',
            type: 'datetime',
            name: 'dueDate',
            label: '到期时间',
            show: !!_this.showConfig.dueDate
          }
        ]
      }
    }
  },
  watch: {
    'formData.userType': function(val, oldVal) {
      console.log('formData.userType', val, oldVal)

      // if (oldVal && this.formData.dataType !== 'dynamic') {
      //   const types = ['assignee', 'candidateUsers', 'candidateGroups']
      //   types.forEach((type) => {
      //     delete this.element.businessObject.$attrs[`flowable:${type}`]
      //     delete this.formData[type]
      //   })
      // }
      console.log('this.showConfig.candidateUsers ', this.showConfig.candidateUsers)
      console.log('this.formData.userType ', this.formData.userType)
      // this.dataTypeOption[1].disabled = val === 'candidateUsers'
      if (val === 'candidateUsers') {
        this.updateProperties({ 'flowable:dataType': 'fixed' })
        this.formData.dataType = 'fixed'

      }
      this.updateProperties({ 'flowable:userType': val })
      this.formData.userType = val
    },
    // 动态选择流程执行人
    'formData.dataType': function(val) {
      console.log('formData.dataType', val)

      const that = this
      this.updateProperties({ 'flowable:dataType': val })
      if (val === 'dynamic' && that.formData.userType === 'assignee') {
        this.updateProperties({ 'flowable:userType': that.formData.userType })
      }
      // 切换时 删除之前选中的值
      // const types = ['assignee', 'candidateUsers', 'candidateGroups']
      // if (this.formData.dataType !== 'dynamic') {
      //   types.forEach((type) => {
      //     delete this.element.businessObject.$attrs[`flowable:${type}`]
      //     delete this.formData[type]
      //   })
      // }
      // 传值到父组件
      const params = {
        dataType: val,
        userType: this.formData.userType
      }
      this.$emit('dataType', params)
    },
    // 'formData.assignee': function (val) {
    //   if (this.formData.userType !== 'assignee') {
    //     delete this.element.businessObject.$attrs[`flowable:assignee`]
    //     return
    //   }
    //   console.log('formData.assignee', val)
    //   this.updateProperties({ 'flowable:assignee': val })
    // },
    // 'formData.candidateUsers': function(val) {
    //   console.log('formData.candidateUsers', val)

      // if (this.formData.userType !== 'candidateUsers') {
      //   delete this.element.businessObject.$attrs[`flowable:candidateUsers`]
      //   return
      // }
    //   this.updateProperties({ 'flowable:mutipleUsers': val?.join(',') })
    // },
    'formData.relationship': function(val) {
      console.log('formData.relationship', val)
      // if (this.formData.userType !== 'assignee') {
      //   delete this.element.businessObject.$attrs[`flowable:assignee`]
      //   return
      // }
      if (val) {
        this.updateProperties({ 'flowable:relationship': val })
      }
    },
    'formData.async': function(val) {
      if (val === '') val = null
      this.updateProperties({ 'flowable:async': true })
    },
    'formData.dueDate': function(val) {
      if (val === '') val = null
      this.updateProperties({ 'flowable:dueDate': val })
    },
    'formData.formKey': function(val) {
      if (val === '') val = null
      this.updateProperties({ 'flowable:formKey': val })
    },
    'formData.priority': function(val) {
      if (val === '') val = null
      this.updateProperties({ 'flowable:priority': val })
    },
    'formData.skipExpression': function(val) {
      if (val === '') val = null
      this.updateProperties({ 'flowable:skipExpression': val })
    },
    'formData.isForCompensation': function(val) {
      if (val === '') val = null
      this.updateProperties({ isForCompensation: val })
    },
    'formData.triggerable': function(val) {
      if (val === '') val = null
      this.updateProperties({ 'flowable:triggerable': val })
    },
    'formData.class': function(val) {
      if (val === '') val = null
      this.updateProperties({ 'flowable:class': val })
    },
    'formData.autoStoreVariables': function(val) {
      if (val === '') val = null
      this.updateProperties({ 'flowable:autoStoreVariables': val })
    },
    'formData.exclude': function(val) {
      if (val === '') val = null
      this.updateProperties({ 'flowable:exclude': val })
    },
    'formData.ruleVariablesInput': function(val) {
      if (val === '') val = null
      this.updateProperties({ 'flowable:ruleVariablesInput': val })
    },
    'formData.rules': function(val) {
      if (val === '') val = null
      this.updateProperties({ 'flowable:rules': val })
    },
    'formData.resultVariable': function(val) {
      if (val === '') val = null
      this.updateProperties({ 'flowable:resultVariable': val })
    }
  },
  created() {
    let cache = commonParse(this.element)
    cache = userTaskParse(cache)
    this.formData = cache
    this.computedExecutionListenerLength()
    this.computedTaskListenerLength()
    this.computedHasMultiInstance()
    this.computedHasSingleCascader()
    this.computedHasCandidateUsers()
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
    computedExecutionListenerLength() {
      this.executionListenerLength =
        this.element.businessObject.extensionElements?.values?.filter(
          (item) => item.$type === 'flowable:ExecutionListener'
        ).length ?? 0
    },
    computedTaskListenerLength() {
      this.taskListenerLength =
        this.element.businessObject.extensionElements?.values?.filter(
          (item) => item.$type === 'flowable:TaskListener'
        ).length ?? 0
    },
    computedHasMultiInstance() {
      this.hasMultiInstance = !!this.element.businessObject.loopCharacteristics
    },
    computedHasSingleCascader() {
      this.hasSingleCascader = !!this.element.businessObject.loopCharacteristics
    },
    computedHasCandidateUsers() {
      this.hasCandidateUsers = !!this.element.businessObject.loopCharacteristics
    },
    finishExecutionListener() {
      if (this.dialogName === 'executionListenerDialog') {
        this.computedExecutionListenerLength()
      }
      this.dialogName = ''
    },
    finishTaskListener() {
      if (this.dialogName === 'taskListenerDialog') {
        this.computedTaskListenerLength()
      }
      this.dialogName = ''
    },
    finishMultiInstance() {
      if (this.dialogName === 'multiInstanceDialog') {
        this.computedHasMultiInstance()
      }
      this.dialogName = ''
    },
    finishsingleCascader(check) {
      if (this.dialogName === 'singleCascaderDialog') {
        this.computedHasSingleCascader()
      }
      this.dialogName = ''
      console.log('check', check)
      this.formData.assignee = check.userId
      this.updateProperties({ 'flowable:assignee': check.userId })
      this.check = check
      delete this.formData.candidateUsers
    },
    finishCandidateUsers(checkList) {
      if (this.dialogName === 'candidateUsersDialog') {
        this.computedHasCandidateUsers()
      }
      this.dialogName = ''
      let checkArr = checkList.map((item) => item.userId).join(',')
      this.formData.assignee = checkArr
      this.updateProperties({ 'flowable:mutipleUsers': checkArr })
      this.checkList = checkArr
      // delete this.formData.assignee
    },
    finishCcusers(checkList) {
      if (this.dialogName === 'ccusersDialog') {
        this.computedHasCandidateUsers()
      }
      this.dialogName = ''
      let checkArr = checkList.map((item) => item.userId).join(',')
      this.formData.ccusers = checkArr
      this.updateProperties({ 'flowable:ccusers': checkArr })
      this.ccusersList = checkArr
    }
  }
}
</script>

<style></style>
