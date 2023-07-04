<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="120px"
      style="margin-bottom:20px;"
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
            >高级搜索</el-button>
          </el-form-item>
        </div>
        <el-collapse-transition>
          <div v-show="ifCardShow">
            <div class="my-col">
              <el-form-item label="个人资质名称" prop="name">
                <el-input
                  v-model="queryParams.name"
                  placeholder="请输入个人资质名称"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="公司名称" prop="parentid">
                <el-select v-model="queryParams.parentid" placeholder="请选择公司名称" clearable size="small">
                  <el-option
                    v-for="dict in parentidOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="创建人" prop="createUserName">
                <el-input
                  v-model="queryParams.createUserName"
                  placeholder="请输入申请人"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="添加时间">
                <el-date-picker
                  v-model="daterangeCreateTime"
                  size="small"
                  style="width: 240px"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="datachange"
                ></el-date-picker>
              </el-form-item>
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
          v-hasPermi="['qualifications:grzizhixiangqing:add']"
        >新增
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
          v-hasPermi="['system:user:remove']"
        >删除
        </el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['qualifications:grzizhixiangqing:export']"
        >导出</el-button>
      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="resetQuery"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="grzizhixiangqingList"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="个人资质名称" prop="name" sortable/>
      <el-table-column
        label="公司名称"
        sortable
        align="center"
        prop="cname"
        :formatter="parentidFormat"
      />
      <el-table-column label="添加时间" sortable align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['qualifications:grzizhixiangqing:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['qualifications:grzizhixiangqing:remove']"
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

    <!-- 添加或修改个人资质详情对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="40%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="个人资质" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
        <div class="my-col">
          <el-form-item label="公司名称" prop="name">
            <el-select v-model="form.parentid" clearable placeholder="请选择公司名称" size="small">
              <el-option
                v-for="dict in parentidOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="添加时间">
            <el-date-picker v-model="addtime" disabled type="datetime"></el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="资质详情" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
        <!-- 动态表单 -->
        <el-row type="flex" justify="end" style="margin-bottom:10px;">
          <el-col :span="3">
            <el-button @click="addDomain" type="primary">添 加</el-button>
          </el-col>
        </el-row>
        <el-table ref="table" :data="form.names" border prop="names" size="small" tooltip-effect="dark">
          <template>
            <el-table-column label="证书名称" align="center" header-align="center">
              <template slot-scope="scope">
                <el-form-item
                  class="noleftform"
                  :prop="scope.row.name"
                  style="width: 100%;margin-bottom:0;"
                >
                  <el-input v-model="scope.row.name" placeholder="请输入证书名称"/>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" header-align="center">
              <template slot-scope="scope">
                <el-form-item class="noleftform" style="width: 100%;margin-bottom:0;">
                  <el-button @click.prevent="removeDomain(scope.row)" type="text">删除</el-button>
                </el-form-item>
              </template>
            </el-table-column>
          </template>
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
  addGrzizhixiangqing,
  delGrzizhixiangqing,
  exportGrzizhixiangqing,
  getGrzizhixiangqing,
  listGrzizhixiangqing,
  updateGrzizhixiangqing
} from '@/api/biz/grzizhixiangqing'

export default {
  name: 'Grzizhixiangqing',
  components: {},
  data() {
    return {
      ifCardShow:false,
      addtime: new Date(),
      // 选择创建人id
      issingleCascader: false,
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
      // 个人资质详情表格数据
      grzizhixiangqingList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 公司名称字典
      parentidOptions: [],
      // 添加时间时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        simpleSearch:'',
        parentid: null,
        createUserName: null,
        startTime: null,
        endTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parentid: [
          { required: true, message: '公司名称不能为空', trigger: 'change' }
        ],
        names: [
          { required: true, message: '证书名称不能为空', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('form_company_name').then((response) => {
      this.parentidOptions = response.data
    })
  },
  methods: {
    //高级搜索
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    createClear() {
      this.queryParams.createUserId = null
    },
    datachange(date) {
      if (date == null) {
        this.queryParams.startTime = null
        this.queryParams.endTime = null
      }
    },
    removeDomain(item) {
      var index = this.form.names.indexOf(item)
      if (index !== -1) {
        this.form.names.splice(index, 1)
      }
    },
    addDomain() {
      this.form.names.push({
        name: '',
        key: Date.now()
      })
    },
    /** 查询个人资质详情列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.startTime = this.daterangeCreateTime[0]
        this.queryParams.endTime = this.daterangeCreateTime[1]
      }
      listGrzizhixiangqing(this.queryParams).then((response) => {
        this.grzizhixiangqingList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 公司名称字典翻译
    parentidFormat(row, column) {
      return this.selectDictLabel(this.parentidOptions, row.cname)
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
        names: [
          {
            name: '',
            key: Date.now()
          }
        ],
        parentid: null
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
      this.createUserName = ''
      this.daterangeCreateTime = []
      this.queryParams.startTime = null
      this.queryParams.endTime = null
      this.queryParams.createUserId = null
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加个人资质'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getGrzizhixiangqing(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改个人资质'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateGrzizhixiangqing(this.form).then((response) => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addGrzizhixiangqing(this.form).then((response) => {
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
      this.$confirm(
        '是否确认删除个人资质详情编号为"' + ids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delGrzizhixiangqing(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有个人资质详情数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportGrzizhixiangqing(queryParams)
        })
        .then((response) => {
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

.my-col {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.el-form-item {
  flex: 1;
  margin-bottom: 0;
}
</style>
<style lang="scss">
.noleftform {
  div {
    margin-left: 0 !important;
  }
}
</style>
