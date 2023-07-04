<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" style="margin-bottom:10px;">
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
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
              <el-form-item label="所属公司" prop="company">
                <el-select v-model="queryParams.company" clearable placeholder="请选择所属公司" @keyup.enter.native="handleQuery">
                  <el-option v-for="dict in form_company_name" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue"/>
                </el-select>
              </el-form-item>
              <el-form-item label="车辆名称" prop="title">
                <el-input v-model="queryParams.title" placeholder="请输入车辆名称" clearable size="small" @keyup.enter.native="handleQuery"/>
              </el-form-item>
              <el-form-item label="车辆类型" prop="type">
                <el-select v-model="queryParams.type" clearable placeholder="请选择车辆类型" @keyup.enter.native="handleQuery">
                  <el-option v-for="dict in car_type" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue"/>
                </el-select>
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
          v-hasPermi="['administrationCarManage:carAdd:add']"
        >新增</el-button>
      </el-col>
      <!--<el-col :span="1.5">-->
        <!--<el-button-->
          <!--type="success"-->
          <!--plain-->
          <!--icon="el-icon-edit"-->
          <!--size="mini"-->
          <!--:disabled="single"-->
          <!--@click="handleUpdate"-->
          <!--v-hasPermi="['administrationCarManage:carAdd:edit']"-->
        <!--&gt;修改</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="1.5">-->
        <!--<el-button-->
          <!--type="danger"-->
          <!--plain-->
          <!--icon="el-icon-delete"-->
          <!--size="mini"-->
          <!--:disabled="multiple"-->
          <!--@click="handleDelete"-->
          <!--v-hasPermi="['administrationCarManage:carAdd:remove']"-->
        <!--&gt;删除</el-button>-->
      <!--</el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['administrationCarManage:carAdd:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="carAddList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"  />
      <el-table-column label="车辆名称" align="center" prop="title"  sortable />
      <el-table-column label="所属公司" align="center" prop="company" :formatter="formCompanyNameFormat"  sortable  />
      <el-table-column label="车辆类型" align="center" prop="type" :formatter="carTypeFormat" sortable />
      <el-table-column label="座位数" align="center" prop="seatingnum"  sortable />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['administrationCarManage:carAdd:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['administrationCarManage:carAdd:remove']"
          >删除</el-button>
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

    <!-- 添加或修改车辆添加对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col span="12">
            <el-form-item label="车辆名称" prop="title">
              <el-input v-model="form.title" placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="车牌号码" prop="carno">
              <el-input v-model="form.carno" placeholder="请输入车牌号码" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="所属公司" prop="company">
              <el-select v-model="form.company" clearable placeholder="请选择所属公司"  style="width: 100%;">
                <el-option v-for="dict in form_company_name" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="车辆类型" prop="type">
              <el-select v-model="form.type" clearable placeholder="请选择车辆类型" style="width: 100%;" >
                <el-option v-for="dict in car_type" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="排量" prop="displacemen">
              <el-input v-model="form.displacemen" placeholder="请输入排量" />
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="颜色" prop="color">
              <el-input v-model="form.color" placeholder="请输入颜色" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="12">
            <el-form-item label="座位数" prop="seatingnum">
              <el-input-number v-model="form.seatingnum"
                               :min="0"
                               :precision="2" :step="1" placeholder="请输入座位数" style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="购车日期" prop="buytime">
              <el-date-picker  style="width: 100%;"
                v-model="form.buytime"
                align="right"
                type="date"
                placeholder="选择购车日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="24">
            <el-form-item label="车辆介绍" prop="memo">
              <el-input v-model="form.memo" type="textarea" placeholder="请输入内容" :rows=3  />
            </el-form-item>
          </el-col>
        </el-row>

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
  addCarAdd,
  delCarAdd,
  exportCarAdd,
  getCarAdd,
  listCarAdd,
  updateCarAdd
} from '@/api/biz/administrationCarManage/carAdd'

export default {
  name: "CarAdd",
  components: {
  },
  data() {
    return {
      ifCardShow:false,
      car_type:[],
      form_company_name:[],
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
      // 车辆添加表格数据
      carAddList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        company: null,
        category: null,
        displacemen: null,
        carno: null,
        simpleSearch:'',
        color: null,
        type: null,
        seatingnum: null,
        memo: null,
        dept: null,
        shenqingren: null,
        shiyongren: null,
        tel: null,
        chufadi: null,
        mudidi: null,
        starttime: null,
        endtime: null,
        zhuangtai: null,
        buytime: null,
        createUserName: null,
        createUserId: null,
        createDeptName: null,
        createDeptId: null,
        updateUserName: null,
        updateUserId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [{ required: true , message : '请输入车辆名称' , trigger: 'blur' }],
        carno: [{ required: true , message : '请输入车牌号码' , trigger: 'blur' }],
        company: [{ required: true , message : '请输入所属公司' , trigger: 'blur' }],
        buytime: [{ type: 'date', required: true , message : '请输入购车日期' , trigger: 'blur' }]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    };
  },
  created() {
    this.getList();
    this.getDicts('car_type').then((response) => {
      this.car_type = response.data
    })
    this.getDicts('form_company_name').then((response) => {
      this.form_company_name = response.data
    })
  },
  methods: {
    //高级搜索
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    formCompanyNameFormat(row, column) {
      return this.selectDictLabel(this.form_company_name, row.company)
    },
    carTypeFormat(row, column) {
      return this.selectDictLabel(this.car_type, row.type)
    },
    /** 查询车辆添加列表 */
    getList() {
      this.loading = true;
      listCarAdd(this.queryParams).then(response => {
        this.carAddList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        title: null,
        company: null,
        category: null,
        displacemen: null,
        carno: null,
        color: null,
        type: null,
        seatingnum: null,
        memo: null,
        dept: null,
        shenqingren: null,
        shiyongren: null,
        tel: null,
        chufadi: null,
        mudidi: null,
        starttime: null,
        endtime: null,
        zhuangtai: null,
        buytime: null,
        createUserName: null,
        createUserId: null,
        createTime: null,
        createDeptName: null,
        createDeptId: null,
        updateUserName: null,
        updateUserId: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加车辆";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCarAdd(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改车辆";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCarAdd(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCarAdd(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除车辆添加编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCarAdd(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有车辆添加数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCarAdd(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
<style  lang="scss">
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
