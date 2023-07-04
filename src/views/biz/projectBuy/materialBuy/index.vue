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
              <el-form-item label="项目名称" prop="xmmc">
                <el-input
                  v-model="queryParams.xmmc"
                  placeholder="请输入项目名称"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="项目编号" prop="num">
                <el-input
                  v-model="queryParams.num"
                  placeholder="请输入项目编号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="请购编号" prop="qinggoubianhao">
                <el-input
                  v-model="queryParams.qinggoubianhao"
                  placeholder="请输入请购编号"
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
              <el-form-item label="申请人" prop="createUserName">
                <el-input
                  v-model="queryParams.createUserName"
                  placeholder="请输入申请人"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请部门" prop="createDeptName">
                <el-input
                  v-model="queryParams.createDeptName"
                  placeholder="请输入申请部门"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="申请日期" prop="createTime">
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
              <el-form-item></el-form-item>
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
          v-hasPermi="['projectBuy:materialBuy:add']"
        >新增申请
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="materialBuyList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="请购编号" prop="qinggoubianhao" sortable/>
      <el-table-column align="center" label="项目编号" prop="num" sortable/>
      <el-table-column align="center" label="项目名称" prop="xmmc" sortable/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请部门" prop="createDeptName" sortable/>
      <el-table-column align="center" label="申请时间" prop="createTime" sortable/>
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
            v-hasPermi="['peopleChange:neetApply:edit']"
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

    <!-- 添加或修改货物请购对话框 -->
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
        <el-form-item label="申请人" prop="name">
          <el-input v-model="form.name" placeholder="请输入申请人"/>
        </el-form-item>
        <el-form-item label="是否同意" prop="agree">
          <el-input v-model="form.agree" placeholder="请输入是否同意"/>
        </el-form-item>
        <el-form-item label="申请部门" prop="dept">
          <el-input v-model="form.dept" placeholder="请输入申请部门"/>
        </el-form-item>
        <el-form-item label="申请时间" prop="time">
          <el-input v-model="form.time" placeholder="请输入申请时间"/>
        </el-form-item>
        <el-form-item label="项目名称" prop="xmmc">
          <el-input v-model="form.xmmc" placeholder="请输入项目名称"/>
        </el-form-item>
        <el-form-item label="项目编号" prop="num">
          <el-input v-model="form.num" placeholder="请输入项目编号"/>
        </el-form-item>
        <el-form-item label="收货单位" prop="projectdirector">
          <el-input v-model="form.projectdirector" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="附件" prop="fujian">
          <el-input v-model="form.fujian" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="采购明细" prop="caigoumingxi">
          <el-input v-model="form.caigoumingxi" placeholder="请输入采购明细"/>
        </el-form-item>
        <el-form-item label="日期" prop="datetime">
          <el-input v-model="form.datetime" placeholder="请输入日期"/>
        </el-form-item>
        <el-form-item label="请购编号" prop="qinggoubianhao">
          <el-input v-model="form.qinggoubianhao" placeholder="请输入请购编号"/>
        </el-form-item>
        <el-form-item label="请购单位" prop="qinggoudanwei">
          <el-input v-model="form.qinggoudanwei" placeholder="请输入请购单位"/>
        </el-form-item>
        <el-form-item label="userid" prop="userid">
          <el-input v-model="form.userid" placeholder="请输入userid"/>
        </el-form-item>
        <el-form-item label="供应商" prop="gongyingshang">
          <el-input v-model="form.gongyingshang" placeholder="请输入供应商"/>
        </el-form-item>
        <el-form-item label="到货日期" prop="dhtime">
          <el-input v-model="form.dhtime" placeholder="请输入到货日期"/>
        </el-form-item>
        <el-form-item label="流程状态" prop="prostate">
          <el-input v-model="form.prostate" placeholder="请输入流程状态"/>
        </el-form-item>
        <el-form-item label="创建人" prop="createUserName">
          <el-input v-model="form.createUserName" placeholder="请输入创建人"/>
        </el-form-item>
        <el-form-item label="创建人id" prop="createUserId">
          <el-input v-model="form.createUserId" placeholder="请输入创建人id"/>
        </el-form-item>
        <el-form-item label="创建人部门名称" prop="createDeptName">
          <el-input v-model="form.createDeptName" placeholder="请输入创建人部门名称"/>
        </el-form-item>
        <el-form-item label="创建人部门id" prop="createDeptId">
          <el-input v-model="form.createDeptId" placeholder="请输入创建人部门id"/>
        </el-form-item>
        <el-form-item label="修改人名称" prop="updateUserName">
          <el-input v-model="form.updateUserName" placeholder="请输入修改人名称"/>
        </el-form-item>
        <el-form-item label="修改人id" prop="updateUserId">
          <el-input v-model="form.updateUserId" placeholder="请输入修改人id"/>
        </el-form-item>
        <el-divider content-position="center">货物请购子表信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddPmsClfl">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeletePmsClfl">删除</el-button>
          </el-col>
        </el-row>
        <el-table ref="pmsClfl" :data="pmsClflList" :row-class-name="rowPmsClflIndex"
                  @selection-change="handlePmsClflSelectionChange"
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
          <el-table-column label="材料名称" prop="cailiaoname">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cailiaoname" placeholder="请输入材料名称"/>
            </template>
          </el-table-column>
          <el-table-column label="规格型号" prop="guige">
            <template slot-scope="scope">
              <el-input v-model="scope.row.guige" placeholder="请输入规格型号"/>
            </template>
          </el-table-column>
          <el-table-column label="品牌" prop="pinpai">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pinpai" placeholder="请输入品牌"/>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="danwei">
            <template slot-scope="scope">
              <el-input v-model="scope.row.danwei" placeholder="请输入单位"/>
            </template>
          </el-table-column>
          <el-table-column label="物品数量" prop="num">
            <template slot-scope="scope">
              <el-input v-model="scope.row.num" placeholder="请输入物品数量"/>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="beizhu">
            <template slot-scope="scope">
              <el-input v-model="scope.row.beizhu" placeholder="请输入备注"/>
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
  addMaterialBuy,
  delMaterialBuy,
  exportMaterialBuy,
  exportMaterialBuyChildTemplate,
  getMaterialBuy,
  listMaterialBuy,
  updateMaterialBuy
} from '@/api/biz/projectBuy/materialBuy'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'MaterialBuy',
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedPmsClfl: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 货物请购表格数据
      materialBuyList: [],
      // 货物请购子表表格数据
      pmsClflList: [],
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
        creator: null,
        modificator: null,
        simpleSearch:'',
        recycle: null,
        name: null,
        agree: null,
        dept: null,
        time: null,
        xmmc: null,
        num: null,
        projectdirector: null,
        beizhu: null,
        fujian: null,
        caigoumingxi: null,
        datetime: null,
        qinggoubianhao: null,
        qinggoudanwei: null,
        userid: null,
        gongyingshang: null,
        dhtime: null,
        prostate: null,
        createUserName: null,
        createUserId: null,
        createDeptName: null,
        createDeptId: null,
        updateUserName: null,
        updateUserId: null,
        createTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      ifCardShow: false,//搜索框默认隐藏.
      form_process_state: [],
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
      showTimetime: []

    }
  },
  created() {
    this.getList()

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
    //离职时间区间 变化事件
    handletimeChangetime(dataarr) {
      console.log(dataarr)
      this.queryParams.createTimeStart = dataarr[0]
      this.queryParams.createTimeEnd = dataarr[1]
    },
    prostateFormat(row, column) {
      return this.selectDictLabel(this.form_process_state, row.prostate)
    },
    //高级搜索
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询货物请购列表 */
    getList() {
      this.loading = true
      listMaterialBuy(this.queryParams).then(response => {
        this.materialBuyList = response.rows
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
        name: null,
        agree: null,
        dept: null,
        time: null,
        xmmc: null,
        num: null,
        projectdirector: null,
        beizhu: null,
        fujian: null,
        caigoumingxi: null,
        datetime: null,
        qinggoubianhao: null,
        qinggoudanwei: null,
        userid: null,
        gongyingshang: null,
        dhtime: null,
        prostate: null,
        createUserName: null,
        createUserId: null,
        createTime: null,
        createDeptName: null,
        createDeptId: null,
        updateUserName: null,
        updateUserId: null,
        updateTime: null
      }
      this.pmsClflList = []
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.createTimeStart = ''
      this.queryParams.createTimeEnd = ''
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
    /** 详情 流程流转记录 */
    async handleFlowRecord(row) {
      const { data } = await getFlowInfoByFlowId({
        flowId: 'process_xqiaxwot'
      })
      this.$router.push({
        path: '/task/record/index/projectBuyMaterialBuy',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_materialcost'
        }
      })
    },
    /** 新增按钮操作 */
    async handleAdd() {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_xqiaxwot'
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
        path: '/task/record/index/projectBuyMaterialBuy',
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
      getMaterialBuy(id).then(response => {
        this.form = response.data
        this.pmsClflList = response.data.pmsClflList
        this.open = true
        this.title = '修改货物请购'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.pmsClflList = this.pmsClflList
          if (this.form.id != null) {
            updateMaterialBuy(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addMaterialBuy(this.form).then(response => {
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
      this.$confirm('是否确认删除货物请购编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delMaterialBuy(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 货物请购子表序号 */
    rowPmsClflIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 货物请购子表添加按钮操作 */
    handleAddPmsClfl() {
      let obj = {}
      obj.title = ''
      obj.created = ''
      obj.modified = ''
      obj.creator = ''
      obj.modificator = ''
      obj.recycle = ''
      obj.cailiaoname = ''
      obj.guige = ''
      obj.pinpai = ''
      obj.danwei = ''
      obj.num = ''
      obj.beizhu = ''
      obj.parentid = ''
      this.pmsClflList.push(obj)
    },
    /** 货物请购子表删除按钮操作 */
    handleDeletePmsClfl() {
      if (this.checkedPmsClfl.length == 0) {
        this.$alert('请先选择要删除的货物请购子表数据', '提示', { confirmButtonText: '确定' })
      } else {
        this.pmsClflList.splice(this.checkedPmsClfl[0].index - 1, 1)
      }
    },
    /** 单选框选中数据 */
    handlePmsClflSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.pmsClfl.clearSelection()
        this.$refs.pmsClfl.toggleRowSelection(selection.pop())
      } else {
        this.checkedPmsClfl = selection
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有货物请购数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMaterialBuy(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    },
    handleExportChildTemplate() {
      exportMaterialBuyChildTemplate().then(response => {
        this.download(response.msg)
      })
    }
  }
}
</script>
<style scoped lang="scss">
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
