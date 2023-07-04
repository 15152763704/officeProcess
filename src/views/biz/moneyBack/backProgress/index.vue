<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :inline="true" :model="queryParams" label-width="102px"
             style="margin-bottom:10px;"
    >
      <el-card class="box-card" :body-style="{ padding: '14px 15px 7px' }">
        <div slot="header" class="clearfix">
          <el-form-item label="简单搜索" prop="simpleSearch">
            <el-input style="width: 280px;"
              v-model="queryParams.simpleSearch"
              placeholder="简单搜索"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click.stop="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click.stop="resetQuery">重置</el-button>
            <el-button
              icon="el-icon-arrow-down"
              type="primary"
              size="mini"
              @click.stop="cardClick"
            >高级搜索
            </el-button>
          </el-form-item>
        </div>
        <el-collapse-transition>
          <div v-show="ifCardShow">
            <div class="my-col">
              <el-form-item label="项目编号" prop="num">
                <el-input
                  v-model="queryParams.num"
                  placeholder="请输入项目编号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="项目名称" prop="projectname">
                <el-input
                  v-model="queryParams.projectname"
                  placeholder="请输入项目名称"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="项目经理" prop="tianxieren">
                <el-input
                  v-model="queryParams.tianxieren"
                  placeholder="请输入项目经理"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="流程状态" prop="prostate">
                <el-select
                  v-model="queryParams.prostate"
                  clearable
                  placeholder="请选择流程状态"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="dict in form_process_state"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="到款金额(元)" prop="daokuanjine">
                <el-input
                  v-model="queryParams.daokuanjine"
                  placeholder="请输入到款金额"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="到账日期" prop="daozhangriqi">
                <el-date-picker
                  v-model="showTimetime"
                  type="daterange"
                  align="right"
                  value-format="yyyy-MM-dd"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  @keyup.enter.native="handleQuery"
                  @change="handletimeChangetime"
                ></el-date-picker>
              </el-form-item>
              <el-form-item></el-form-item><el-form-item></el-form-item>
            </div>
          </div>
        </el-collapse-transition>
      </el-card>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['moneyBack:backProgress:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['moneyBack:backProgress:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['moneyBack:backProgress:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['moneyBack:backProgress:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="backProgressList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="项目编号" prop="num" sortable/>
      <el-table-column align="center" label="项目名称" prop="projectname" sortable/>
      <el-table-column align="center" label="项目经理" prop="tianxieren" sortable/>
      <el-table-column align="center" label="回款节点" prop="moneyname" sortable :formatter="moneynameFormat" />
      <!--<el-table-column label="对应客户" align="center" prop="kehu" />-->
      <!--<el-table-column label="开票日期" align="center" prop="kaipiaotime" />-->
      <el-table-column align="center" label="到款金额" prop="daokuanjine" sortable/>
      <el-table-column :formatter="daozhangriqiFormat" align="center" label="到账日期" prop="daozhangriqi" sortable/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['moneyBack:backProgress:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['moneyBack:backProgress:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改回笼进度对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body width="60%">
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-row gutter="5" style="margin-bottom: 10px;">
          <el-col span="12">
            <el-form-item label="填写人" prop="createUserName">
              <el-input v-model="form.createUserName" placeholder="请输入填写人" disabled/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="部门" prop="createDeptName">
              <el-input v-model="form.createDeptName" placeholder="请输入部门" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 10px;">
          <el-col span="12">
            <el-form-item label="对应项目" prop="projectname">
              <el-input v-model="form.projectname" placeholder="请输入对应项目" disabled>
                <el-button
                  v-on:click.native="chooseProjectData"
                  slot="append"
                  icon="el-icon-third-guide"
                ></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <!--<el-col span="12">-->
          <!--<el-form-item label="项目编号" prop="num">-->
          <!--<el-input v-model="form.num" placeholder="请输入项目编号" disabled />-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col span="12">
            <el-form-item label="项目金额(元)" prop="hetongmoney">
              <el-input v-model="form.hetongmoney" placeholder="请输入项目金额" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row>-->
        <!--<el-col span="12">-->
        <!--<el-form-item label="对应客户" prop="kehu">-->
        <!--<el-input v-model="form.kehu" placeholder="请输入对应客户"  disabled />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col span="12">-->
        <!--<el-form-item label="开票日期" prop="kaipiaotime">-->
        <!--<el-input v-model="form.kaipiaotime" placeholder="请输入开票日期"  disabled />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
        <!--<el-col span="12">-->
        <!--<el-form-item label="发票类型" prop="leixing">-->
        <!--<el-input v-model="form.leixing" placeholder="请输入发票类型"  disabled />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col span="12">-->
        <!--<el-form-item label="开票金额" prop="kaipiaojine">-->
        <!--<el-input v-model="form.kaipiaojine" placeholder="请输入开票金额"  disabled />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-row style="margin-bottom: 10px;">
          <!--<el-col span="12">
            <el-form-item label="付款节点" prop="moneyname">
              <el-select v-model="form.moneyname" placeholder="请选择付款节点" style="width: 100%"
                         @change="moneyChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
          <el-col span="12">
            <el-form-item label="项目经理" prop="tianxieren">
              <el-input v-model="form.tianxieren" disabled style="width: 100%"/>
            </el-form-item>
          </el-col>

          <el-col span="12">
            <el-form-item label="到款金额(元)" prop="daokuanjine">
              <el-input-number style="width: 100%" :min=0 :precision=2 v-model="form.daokuanjine"
                               placeholder="请输入到款金额"
              />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row style="margin-bottom: 10px;">

          <el-col span="12">
            <el-form-item label="到账日期" prop="daozhangriqi">
              <el-date-picker style="width: 100%"
                              v-model="form.daozhangriqi"
                              align="right"
                              :picker-options="danpickerOptions"
                              placeholder="选择到账日期"
                              type="date"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col span="12">
            <el-form-item label="累计回笼(元)" prop="totalMoney">
              <el-input-number style="width: 100%" :min=0 :precision=2 v-model="form.totalMoney" disabled
                               placeholder="请输入累计回笼"
              />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row style="margin-bottom: 10px;">

          <el-col span="12">
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-row :gutter="4" style="padding:0 10px;" v-if="isChoose">
      <el-col :span="24">
        <!--<HetongPopup req-url="/contract/project/listAll" @choosedInvoice="choosedInvoice"/>-->
        <ProjectDialog @choosedProect="choosedInvoice" req-url="/system/productionproject/listAll"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {
  addBackProgress,
  delBackProgress,
  exportBackProgress,
  findTotalMoney,
  getBackProgress,
  listBackProgress,
  updateBackProgress
} from '@/api/biz/moneyBack/backProgress'
//import HetongPopup from '@/components/Popup/HetongPopup.vue'
import { formatDate } from '@/utils'
import { getProject } from '@/api/biz/contract/project'
import ProjectDialog from '@/components/Popup/ProductionProjectPopup.vue'


export default {
  name: 'BackProgress',
  components: {
    //HetongPopup,
    ProjectDialog
  },
  data() {
    return {
      tempTotalMoney: 0,
      fkjd: [],
      options: [],
      project_hetong_money_back_name:[],
      isChoose: false,//项目弹框，默认隐藏
      showTimetime: [],//到账日期区间
      form_process_state: [],//流程状态
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 回笼进度表格数据
      backProgressList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        created: null,
        modified: null,
        simpleSearch:'',
        creator: null,
        modificator: null,
        recycle: null,
        kehu: null,
        kaipiaotime: null,
        leixing: null,
        num: null,
        kaipiaojine: null,
        projectname: null,
        daokuanjine: null,
        daozhangriqi: null,
        hid: null,
        tianxieren: null,
        bumen: null,
        prostate: null,
        createUserName: null,
        createUserId: null,
        createDeptName: null,
        projectid: null,
        createDeptId: null,
        updateUserName: null,
        hetongmoney: null,
        updateUserId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        projectname: [{ required: true, message: '请选择对应项目', trigger: 'blur' }],
        daokuanjine: [{ required: true, message: '请输入到款金额', trigger: 'blur' }],
        daozhangriqi: [{ required: true, message: '请输入到款日期', trigger: 'blur' }],
        moneyname: [{ required: true, message: '请选择付款节点', trigger: 'blur' }]
      },
      danpickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now();
        // },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      ifCardShow: false//高级搜索
    }
  },
  computed: {
    // daokuanjineChange: function() {
    //   this.form.totalMoney = Number(this.tempTotalMoney) + Number(this.form.daokuanjine)
    //   return this.form.totalMoney
    // }
  },
  created() {
    this.getList()

    this.getDicts('project_hetong_money_back_name').then((response) => {
      this.project_hetong_money_back_name = response.data
    })

    this.getDicts('project_hetong_money_back_name').then((response) => {
      this.project_hetong_money_back_name = response.data
    })

    this.loadWarning();
  },
  methods: {
    // 合同预警入口进入--默认新增合同表单，自动带入预警项目
    loadWarning(){
      let warningObjectId = this.$route.query && this.$route.query.warningObjectId //付款节点id
      let warningObjectParentId = this.$route.query && this.$route.query.warningObjectParentId //合同id
      if( warningObjectParentId != null && warningObjectParentId != '' ){//表示从预警入口新增进入
        this.handleAdd()
        getProject(warningObjectParentId).then((res) => {
          console.log(res)
          this.choosedInvoice(res.data)
          for (let i = 0; i < res.data.fkjd.length ; i++) {
            if(res.data.fkjd[i].id == warningObjectId){
              this.$set(this.form,'moneyname',res.data.fkjd[i].moneyname)
              this.$set(this.form,'moneynameId',res.data.fkjd[i].id)
            }
          }
        })
      }
    },
    moneynameFormat(row, column) {
      return this.selectDictLabel(this.project_hetong_money_back_name, row.moneyname)
    },

    moneyChange(val) {
      this.form.moneynameId = this.getMoneyId(val).id
    },
    //选择项目
    chooseProjectData() {
      this.isChoose = !this.isChoose
    },
    //接收子组件传过来的被选择的项目
    choosedInvoice(data) {
      console.log(data)
      /*if (data) {
        this.form.projectname = data.projectname
        this.form.num = data.projectnum
        this.form.hetongId = data.id
        this.form.hetongmoney = data.hetongmoney
        this.form.projectid = data.projectid
        this.form.tianxieren = data.createUserName
        this.initTotalMoney(this.form)
        this.initfkjdOptions(data.id)
      }*/
      if(data){
        this.form.projectname = data.projectName
        this.form.num = data.projectCode
        this.form.projectid = data.id
        this.form.tianxieren = data.createUserName
        this.form.hetongmoney = data.projectAmount
        this.initTotalMoney(this.form)
        /*this.initfkjdOptions(data.id)*/
      }
      this.isChoose = false
    },
    initfkjdOptions(hetongId) {
      this.getReqAction('/contract/project/' + hetongId).then((response) => {
        this.fkjd = response.data.fkjd
        this.options = []
        if (response.data.fkjd && response.data.fkjd.length > 0) {
          for (let i = 0; i < response.data.fkjd.length; i++) {
            let obj = {
              value: response.data.fkjd[i].moneyname,
              label: this.getDictLebelByDict(response.data.fkjd[i].moneyname).dictLabel
            }
            this.options.push(obj)
          }
          console.log(this.options)
        }
      })
    },
    getDictLebelByDict(id) {
      for (let i = 0; i < this.project_hetong_money_back_name.length; i++) {
        if (id == this.project_hetong_money_back_name[i].dictValue) {
          return this.project_hetong_money_back_name[i]
        }
      }
    },
    getMoneyId(id) {
      for (let i = 0; i < this.fkjd.length; i++) {
        if (id == this.fkjd[i].moneyname) {
          return this.fkjd[i]
        }
      }
    },
    //高级搜索
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    //开票时间区间 变化事件
    handletimeChangetime(dataarr) {
      this.queryParams.daozhangriqiStart = dataarr[0]
      this.queryParams.daozhangriqiEnd = dataarr[1]
    },
    daozhangriqiFormat(row, column) {
      return formatDate(row.daozhangriqi)
    },
    /** 查询回笼进度列表 */
    getList() {
      this.loading = true
      listBackProgress(this.queryParams).then(response => {
        this.backProgressList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        title: null,
        created: null,
        modified: null,
        creator: null,
        modificator: null,
        recycle: null,
        kehu: null,
        kaipiaotime: null,
        leixing: null,
        num: null,
        kaipiaojine: null,
        projectname: null,
        daokuanjine: null,
        daozhangriqi: null,
        hid: null,
        tianxieren: null,
        bumen: null,
        prostate: null,
        createUserName: null,
        createUserId: null,
        createTime: null,
        createDeptName: null,
        projectid: null,
        createDeptId: null,
        updateUserName: null,
        updateUserId: null,
        updateTime: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.daozhangriqiStart = null
      this.queryParams.daozhangriqiEnd = null
      this.showTimetime = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.tempTotalMoney = 0
      const currentUser = this.$store.getters.user
      this.form.createUserName = currentUser.nickName
      this.form.createDeptName = currentUser.dept.deptName
      this.open = true
      this.title = '添加回笼进度'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getBackProgress(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改回笼进度'
        this.initTotalMoney(row)
      })
      /*this.initfkjdOptions(row.hetongId)*/
      /*if (!row.hetongId) {
        this.$message({
          message: '没有关联合同',
          type: 'warning'
        })
      }*/
    },
    initTotalMoney(row) {
      findTotalMoney(row).then((res) => {
        this.form.totalMoney = res.data
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBackProgress(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addBackProgress(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除回笼进度编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delBackProgress(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有回笼进度数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportBackProgress(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    }
  }
}
</script>
<style lang="scss">
  .clearfix {
    width: 100%;
    text-align: right;
    .el-input__inner{
      border-radius: 25px;
    }
  }

.el-form-item {
  margin-bottom: 10px;
}

.my-col {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;

  &:last-child {
    margin-bottom: 0;
  }

  .el-form-item {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
