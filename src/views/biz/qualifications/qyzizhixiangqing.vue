<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      style="margin-bottom:10px;">
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
              <el-form-item label="发放时间">
                <el-date-picker
                  v-model="daterangeCreated"
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
              <el-form-item label="所属公司" prop="company">
                <el-select v-model="queryParams.company" placeholder="请选择所属公司" clearable size="small">
                  <el-option
                    v-for="dict in companyOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="资质名称" prop="name">
                <el-input
                  v-model="queryParams.name"
                  placeholder="请输入资质名称"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
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
          v-hasPermi="['system:qyzizhixiangqing:add']"
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
      <right-toolbar :showSearch.sync="showSearch" @queryTable="resetQuery"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="qyzizhixiangqingList"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column label="发放时间" sortable align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="所属公司"
        sortable
        align="center"
        prop="company"
        :formatter="companyFormat"
      />
      <el-table-column align="center" label="资质名称" prop="name" sortable/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:qyzizhixiangqing:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:qyzizhixiangqing:remove']"
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

    <!-- 添加或修改企业资质详情对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="添加人" prop="createUserName" style="width: 100%;">
            <el-input v-model="createUserName" disabled placeholder="请输入创建人" style="width: 100%;"/>
          </el-form-item>
          <el-form-item label="添加时间" prop="createTime" style="width: 100%;">
            <el-date-picker
              v-model="form.createTime"
              align="right"
              type="date"
              disabled
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择添加时间"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </div>
        <!-- 动态表单 -->
        <el-row type="flex" justify="end" style="margin-bottom:10px;">
          <el-col :span="2">
            <el-button @click="addDomain" type="primary">添 加</el-button>
          </el-col>
        </el-row>
        <el-table :data="form.domains" tooltip-effect="dark" size="small" ref="table" border>
          <template>
            <el-table-column label="公司名称" align="center" header-align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="scope.row.company"
                  style="width: 100%;margin-bottom:0;"
                  class="noleftform"
                >
                  <el-select v-model="scope.row.company" placeholder="请选择公司名称" style="width: 100%;">
                    <el-option
                      v-for="dict in companyOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
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
                <el-form-item
                  class="noleftform"
                  :prop="scope.row.name"
                  style="width: 100%;margin-bottom:0;"
                >
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
  addQyzizhixiangqing,
  delQyzizhixiangqing,
  exportQyzizhixiangqing,
  getQyzizhixiangqing,
  listQyzizhixiangqing,
  updateQyzizhixiangqing
} from '@/api/biz/qyzizhixiangqing'

export default {
  name: 'Qyzizhixiangqing',
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      ifCardShow:false,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 企业资质详情表格数据
      qyzizhixiangqingList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 发放时间时间范围
      daterangeCreated: [],
      // 所属公司字典
      companyOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        created: null,
        company: null,
        simpleSearch:'',
        name: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      createUserName: ''
    }
  },
  created() {
    this.getList()
    this.getDicts('form_company_name').then((response) => {
      this.companyOptions = response.data
    })
  },
  methods: {
    //高级搜索
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    datachange(date) {
      if (date == null) {
        this.queryParams.startTime = null
        this.queryParams.endTime = null
      }
    },
    addDomain() {
      this.form.domains.push({
        company: '',
        name: '',
        key: Date.now()
      })
    },
    removeDomain(item) {
      var index = this.form.domains.indexOf(item)
      if (index !== -1) {
        this.form.domains.splice(index, 1)
      }
    },
    /** 查询企业资质详情列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.daterangeCreated && '' != this.daterangeCreated) {
        this.queryParams.startTime = this.daterangeCreated[0]
        this.queryParams.endTime = this.daterangeCreated[1]
      }
      listQyzizhixiangqing(this.queryParams).then(({ data }) => {
        console.log(data)
        this.qyzizhixiangqingList = data.rows
        this.total = data.total
        this.loading = false
      })
    },
    // 所属公司字典翻译
    companyFormat(row, column) {
      return this.selectDictLabel(this.companyOptions, row.company)
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        createUserId: null,
        createTime: null,
        domains: [
          {
            company: '',
            name: ''
          }
        ]
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
      this.daterangeCreated = []
      this.queryParams.startTime = null
      this.queryParams.endTime = null
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      console.log('selection', selection)
      this.ids = selection.map((item) => {
        return {
          id: item.id,
          parentid: item.parentid
        }
      })
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加企业资质'
      this.createUserName = this.$store.getters.name
      this.form.createUserId = this.$store.getters.userId
      this.form.createTime = new Date()
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      getQyzizhixiangqing(row.id).then((response) => {
        console.log('getQyzizhixiangqing', response)
        this.form.id = row.id
        this.open = true
        this.title = '修改企业资质'
        this.createUserName = response.data.createUserName
        this.form.createTime = response.data.createTime
        this.form.parentid = response.data.parentid
        this.form.domains = response.data.domains
        console.log(this.form)
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateQyzizhixiangqing(this.form).then((response) => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addQyzizhixiangqing(this.form).then((response) => {
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
      let ids = []
      if (row.id) {
        ids.push({
          id: row.id,
          parentid: row.parentid
        })
      } else {
        ids = this.ids
      }
      this.$confirm(
        '是否确认删除企业资质详情编号为"' + ids[0].id + '"等数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delQyzizhixiangqing(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有企业资质详情数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportQyzizhixiangqing(queryParams)
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
