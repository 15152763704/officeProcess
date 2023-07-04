<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
      style="margin-bottom:10px;">
      <el-card :body-style="{ padding: '14px 15px 7px' }" class="box-card">
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
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
            <div>
              <el-form-item label="客户单位" prop="cname">
                <el-input
                  v-model="queryParams.cname"
                  placeholder="请输入客户单位"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="客户姓名" prop="name">
                <el-input
                  v-model="queryParams.createDeptName"
                  placeholder="请输入客户姓名"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="职务" prop="pratment">
                <el-input
                  v-model="queryParams.pratment"
                  placeholder="请输入职务"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="联系方式" prop="phone">
                <el-input
                  v-model="queryParams.phone"
                  placeholder="请输入联系方式"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="所有者" prop="tianxieren">
                <el-input
                  v-model="queryParams.tianxieren"
                  placeholder="请输入所有者"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="单位地址" prop="address">
                <el-input
                  v-model="queryParams.address"
                  placeholder="请输入单位地址"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="单位电话" prop="zuoji">
                <el-input
                  v-model="queryParams.zuoji"
                  placeholder="请输入单位电话"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="纳税人识别号" prop="openingBank">
                <el-input
                  v-model="queryParams.openingBank"
                  placeholder="请输入纳税人识别号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="开户行" prop="identification">
                <el-input
                  v-model="queryParams.identification"
                  placeholder="请输入开户行"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="账户" prop="taxid">
                <el-input
                  v-model="queryParams.taxid"
                  placeholder="请输入账户"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item></el-form-item>
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
        >新增申请</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="resetQuery"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="modelList"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="客户单位" sortable align="center" prop="cname" />
      <el-table-column label="客户姓名" sortable align="center" prop="name" />
      <el-table-column label="职务" sortable align="center" prop="pratment" />
      <el-table-column label="联系方式" sortable align="center" prop="phone" />
      <el-table-column label="所有者" sortable align="center" prop="createUserName" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
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
          <el-form-item label="所有者" prop="createUserName" style="width: 100%;">
            <el-input v-model="form.createUserName" disabled placeholder="系统自动带入" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="部门" prop="createDeptName" style="width: 100%;">
            <el-input v-model="form.createDeptName" disabled placeholder="系统自动带入" style="width: 100%;" />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="时间" prop="createTime" style="width: 100%;">
            <el-input v-model="form.createTime" disabled placeholder="系统自动带入" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="客户姓名" prop="name" style="width: 100%;">
            <el-input v-model="form.name" placeholder="请输入客户姓名" style="width: 100%;" />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="性别" prop="sex" style="width: 100%;">
            <el-radio-group v-model="form.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="职务" prop="pratment" style="width: 100%;">
            <el-input v-model="form.pratment"  placeholder="请输入职务" style="width: 100%;" />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="联系方式" prop="phone" style="width: 100%;">
            <el-input v-model="form.phone"  placeholder="请输入联系方式" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email" style="width: 100%;">
            <el-input v-model="form.email"  placeholder="请输入邮箱" style="width: 100%;" />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="客户单位" prop="cname" style="width: 100%;">
            <el-input v-model="form.cname"  placeholder="请输入客户单位" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="单位地址" prop="address" style="width: 100%;">
            <el-input v-model="form.address"  placeholder="请输入单位地址" style="width: 100%;" />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="单位电话" prop="zuoji" style="width: 100%;">
            <el-input v-model="form.zuoji"  placeholder="请输入单位电话" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="纳税人识别号" prop="openingBank" style="width: 100%;">
            <el-input v-model="form.openingBank"  placeholder="请输入纳税人识别号" style="width: 100%;" />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="开户行" prop="identification" style="width: 100%;">
            <el-input v-model="form.identification"  placeholder="请输入开户行" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="账号" prop="taxid" style="width: 100%;">
            <el-input v-model="form.taxid"  placeholder="请输入账号" style="width: 100%;" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, save, getInfo } from '@/api/biz/customer'
import { formatDate } from '@/utils'
export default {
  name: 'Index',
  components: { },
  data() {
    return {
      ifCardShow: false,
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
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        created: null,
        company: null,
        name: '',
        cname: '',
        pratment: '',
        phone: '',
        tianxieren: '',
        simpleSearch:'',
        address: '',
        zuoji: '',
        openingBank: '',
        identification: '',
        taxid: '',

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: '请填写客户姓名', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' },
        ],
        pratment: [
          { required: true, message: '请填写职务', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请填写联系方式', trigger: 'blur' },
        ],
        cname: [
          { required: true, message: '请填写客户单位', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请填写单位地址', trigger: 'blur' },
        ],
      },
      createUserName: '',
      formDeptName: '',
      modelList: [],
      uploadHeaders: {
        Authorization: '',
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
    }
  },
  created() {
    this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
    this.getList()
  },
  methods: {
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询企业资质详情列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.daterangeCreated && '' != this.daterangeCreated) {
        this.queryParams.startTime = this.daterangeCreated[0]
        this.queryParams.endTime = this.daterangeCreated[1]
      }
      list(this.queryParams).then(( data ) => {
        this.modelList = data.rows
        this.total = data.total
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
        createUserId: null,
        createTime: null,
        domains: [
          {
            company: '',
            name: '',
          },
        ],
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
          parentid: item.parentid,
        }
      })
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加客户信息'

      const currentUser = this.$store.getters.user
      this.form.createUserName = currentUser.nickName
      this.form.createDeptName = currentUser.dept.deptName
      this.form.createTime = formatDate(new Date().getTime())
      this.form.createUserId = currentUser.userId
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id
      getInfo(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改客户信息'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let msg = '';
          if (this.form.id != null) {
            msg = '修改成功';
          } else {
            msg = '新增成功';
          }
          save(this.form).then((response) => {
            this.msgSuccess(msg)
            this.open = false
            this.getList()
          })
        }
      })
    },
  },
}
</script>
<style lang="scss" >
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
  .el-form-item {
    flex: 1;
    margin-bottom: 0;
  }
}
</style>
<style lang="scss">
.noleftform {
  div {
    margin-left: 0 !important;
  }
}
</style>
