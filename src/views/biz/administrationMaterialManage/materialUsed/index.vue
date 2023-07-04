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
              <el-form-item label="申请部门" prop="createDeptName">
                <el-input
                  v-model="queryParams.createDeptName"
                  placeholder="请输入申请部门"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请人" prop="createUserName">
                <el-input
                  v-model="queryParams.createUserName"
                  placeholder="请输入申请人"
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
              <el-form-item label="用途类型" prop="yongtu">
                <el-select
                  v-model="queryParams.yongtu"
                  clearable
                  placeholder="请选择用途类型"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="dict in admini_material_usetype"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="领用事由" prop="reason">
                <el-input
                  v-model="queryParams.reason"
                  placeholder="请输入领用事由"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请时间" prop="time">
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
              <el-form-item/>
              <el-form-item/>
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
          v-hasPermi="['administrationMaterialManage:materialUsed:add']"
        >新增申请
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="materialUsedList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="申请部门" prop="createDeptName" sortable/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请时间" prop="createTime" sortable/>
      <el-table-column align="center" label="领用事由" prop="reason" sortable/>
      <el-table-column :formatter="adminiMaterialUsertypeFormat" align="center" label="用途类型" prop="yongtu" sortable/>
      <el-table-column :formatter="prostateFormat" align="center" label="流程状态" prop="prostate" sortable/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="(scope.row.prostate == '0' || scope.row.prostate == '2' || scope.row.prostate == '4') && $store.getters.user.userId == scope.row.createUserId"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click.native="handleDelete(scope.row)"
          >删除
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleFlowRecord(scope.row)"
            v-hasPermi="['administrationMaterialManage:materialUsed:edit']"
          >详情
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

    <!-- 添加或修改耗材领用对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="创建时间" prop="created">
          <el-input v-model="form.created" placeholder="请输入创建时间"/>
        </el-form-item>
        <el-form-item label="最后更新时间" prop="modified">
          <el-input v-model="form.modified" placeholder="请输入最后更新时间"/>
        </el-form-item>
        <el-form-item label="创建者id" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建者id"/>
        </el-form-item>
        <el-form-item label="最后更新人id" prop="modificator">
          <el-input v-model="form.modificator" placeholder="请输入最后更新人id"/>
        </el-form-item>
        <el-form-item label="回收站标记" prop="recycle">
          <el-input v-model="form.recycle" placeholder="请输入回收站标记"/>
        </el-form-item>
        <el-form-item label="申请部门" prop="partment">
          <el-input v-model="form.partment" placeholder="请输入申请部门"/>
        </el-form-item>
        <el-form-item label="申请人" prop="people">
          <el-input v-model="form.people" placeholder="请输入申请人"/>
        </el-form-item>
        <el-form-item label="申请时间" prop="time">
          <el-input v-model="form.time" placeholder="请输入申请时间"/>
        </el-form-item>
        <el-form-item label="领用事由" prop="reason">
          <el-input v-model="form.reason" placeholder="请输入领用事由"/>
        </el-form-item>
        <el-form-item label="userid" prop="userid">
          <el-input v-model="form.userid" placeholder="请输入userid"/>
        </el-form-item>
        <el-form-item label="详情" prop="xiangqin">
          <el-input v-model="form.xiangqin" placeholder="请输入详情"/>
        </el-form-item>
        <el-form-item label="用途类型" prop="yongtu">
          <el-input v-model="form.yongtu" placeholder="请输入用途类型"/>
        </el-form-item>
        <el-form-item label="附件" prop="fujian">
          <el-input v-model="form.fujian" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="是否同意" prop="agree">
          <el-input v-model="form.agree" placeholder="请输入是否同意"/>
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-divider content-position="center">耗材领用子表信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddTzOaOfficeNews">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDeleteTzOaOfficeNews">删除
            </el-button>
          </el-col>
        </el-row>
        <el-table ref="tzOaOfficeNews" :data="tzOaOfficeNewsList"
                  :row-class-name="rowTzOaOfficeNewsIndex" @selection-change="handleTzOaOfficeNewsSelectionChange"
        >
          <el-table-column align="center" type="selection" width="50"/>
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column label="标题" prop="title">
            <template slot-scope="scope">
              <el-input v-model="scope.row.title" placeholder="请输入标题"/>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="created">
            <template slot-scope="scope">
              <el-input v-model="scope.row.created" placeholder="请输入创建时间"/>
            </template>
          </el-table-column>
          <el-table-column label="最后更新时间" prop="modified">
            <template slot-scope="scope">
              <el-input v-model="scope.row.modified" placeholder="请输入最后更新时间"/>
            </template>
          </el-table-column>
          <el-table-column label="创建者id" prop="creator">
            <template slot-scope="scope">
              <el-input v-model="scope.row.creator" placeholder="请输入创建者id"/>
            </template>
          </el-table-column>
          <el-table-column label="最后更新人id" prop="modificator">
            <template slot-scope="scope">
              <el-input v-model="scope.row.modificator" placeholder="请输入最后更新人id"/>
            </template>
          </el-table-column>
          <el-table-column label="回收站标记" prop="recycle">
            <template slot-scope="scope">
              <el-input v-model="scope.row.recycle" placeholder="请输入回收站标记"/>
            </template>
          </el-table-column>
          <el-table-column label="供应商名称" prop="name">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入供应商名称"/>
            </template>
          </el-table-column>
          <el-table-column label="规格型号" prop="xinghao">
            <template slot-scope="scope">
              <el-input v-model="scope.row.xinghao" placeholder="请输入规格型号"/>
            </template>
          </el-table-column>
          <el-table-column label="物品编号" prop="code">
            <template slot-scope="scope">
              <el-input v-model="scope.row.code" placeholder="请输入物品编号"/>
            </template>
          </el-table-column>
          <el-table-column label="物品数量" prop="num">
            <template slot-scope="scope">
              <el-input v-model="scope.row.num" placeholder="请输入物品数量"/>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="danwei">
            <template slot-scope="scope">
              <el-input v-model="scope.row.danwei" placeholder="请输入单位"/>
            </template>
          </el-table-column>
          <el-table-column label="PARENTID" prop="parentid">
            <template slot-scope="scope">
              <el-input v-model="scope.row.parentid" placeholder="请输入PARENTID"/>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addMaterialUsed,
  delMaterialUsed,
  exportMaterialUsed,
  getMaterialUsed,
  listMaterialUsed,
  updateMaterialUsed
} from '@/api/biz/administrationMaterialManage/materialUsed'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'MaterialUsed',
  components: {},
  data() {
    return {
      //流程状态
      form_process_state: [],
      //申请时间
      showTimetime: '',
      //高级搜索
      ifCardShow: false,
      // 显示搜索条件
      showSearch: true,
      admini_material_usetype: [],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedTzOaOfficeNews: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 耗材领用表格数据
      materialUsedList: [],
      // 耗材领用子表表格数据
      tzOaOfficeNewsList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        createDeptName: null,
        prostate: null,
        createUserName: null,
        pageNum: 1,
        pageSize: 10,
        title: null,
        simpleSearch:'',
        created: null,
        modified: null,
        creator: null,
        modificator: null,
        recycle: null,
        partment: null,
        people: null,
        time: null,
        reason: null,
        userid: null,
        xiangqin: null,
        yongtu: null,
        fujian: null,
        agree: null,
        beizhu: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
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
      }
    }
  },
  created() {
    this.getList()

    this.getDicts('admini_material_usetype').then((response) => {
      this.admini_material_usetype = response.data
    })
    this.getDicts('form_process_state').then((response) => {
      this.form_process_state = response.data
    })
  },
  activated(){
    if(localStorage.getItem("needLoadList") === "yes"){
      this.resetQuery()
      localStorage.setItem("needLoadList",undefined)
    }
  },
  methods: {
    prostateFormat(row, column) {
      return this.selectDictLabel(this.form_process_state, row.prostate)
    },
    adminiMaterialUsertypeFormat(row, column) {
      return this.selectDictLabel(this.admini_material_usetype, row.yongtu)
    },
    //条件申请时间
    handletimeChangetime(dataarr) {
      this.queryParams.timesStarttime = dataarr[0]
      this.queryParams.timesEndtime = dataarr[1]
    },
    //高级搜索
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询耗材领用列表 */
    getList() {
      this.loading = true
      listMaterialUsed(this.queryParams).then(response => {
        this.materialUsedList = response.rows
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
        partment: null,
        people: null,
        time: null,
        reason: null,
        userid: null,
        xiangqin: null,
        yongtu: null,
        fujian: null,
        agree: null,
        beizhu: null
      }
      this.tzOaOfficeNewsList = []
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.timesStarttime = ''
      this.queryParams.timesEndtime = ''
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
    /** 流程流转记录 */
    async handleFlowRecord(row) {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_vm08rslm'
      })
      this.$router.push({
        path: '/task/record/index/administrationMaterialUse',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_bangong'
        }
      })
    },
    /** 新增流程 */
    async handleAdd() {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_vm08rslm'
      })
      if (code == 200) {
        this.handleStartProcess(data)
      }
    },
    /**  发起流程申请 */
    handleStartProcess(row) {
      localStorage.setItem('proData', '')
      localStorage.setItem('procInsId', '')
      this.$router.push({
        path: '/task/record/index/administrationMaterialUse',
        query: {
          deployId: row.deploymentId,
          procDefId: row.id,
          formId: row.formId
        }
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getMaterialUsed(id).then(response => {
        this.form = response.data
        this.tzOaOfficeNewsList = response.data.tzOaOfficeNewsList
        this.open = true
        this.title = '修改耗材领用'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.tzOaOfficeNewsList = this.tzOaOfficeNewsList
          if (this.form.id != null) {
            updateMaterialUsed(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addMaterialUsed(this.form).then(response => {
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
      this.$confirm('是否确认删除耗材领用编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delMaterialUsed(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 耗材领用子表序号 */
    rowTzOaOfficeNewsIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 耗材领用子表添加按钮操作 */
    handleAddTzOaOfficeNews() {
      let obj = {}
      obj.title = ''
      obj.created = ''
      obj.modified = ''
      obj.creator = ''
      obj.modificator = ''
      obj.recycle = ''
      obj.name = ''
      obj.xinghao = ''
      obj.code = ''
      obj.num = ''
      obj.danwei = ''
      obj.parentid = ''
      this.tzOaOfficeNewsList.push(obj)
    },
    /** 耗材领用子表删除按钮操作 */
    handleDeleteTzOaOfficeNews() {
      if (this.checkedTzOaOfficeNews.length == 0) {
        this.$alert('请先选择要删除的耗材领用子表数据', '提示', { confirmButtonText: '确定' })
      } else {
        this.tzOaOfficeNewsList.splice(this.checkedTzOaOfficeNews[0].index - 1, 1)
      }
    },
    /** 单选框选中数据 */
    handleTzOaOfficeNewsSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.tzOaOfficeNews.clearSelection()
        this.$refs.tzOaOfficeNews.toggleRowSelection(selection.pop())
      } else {
        this.checkedTzOaOfficeNews = selection
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有耗材领用数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMaterialUsed(queryParams)
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
