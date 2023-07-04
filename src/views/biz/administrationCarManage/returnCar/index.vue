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
              <el-form-item label="还车人" prop="createUserName">
                <el-input
                  v-model="queryParams.createUserName"
                  placeholder="请输入还车人"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="车牌号码" prop="num">
                <el-input
                  v-model="queryParams.num"
                  placeholder="请输入车牌号码"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="初始里程" prop="jiechegongli">
                <el-input-number style="width: calc(100% - 32px)"
                                 v-model="queryParams.jiechegongli"
                                 clearable
                                 placeholder="请输入初始里程数"
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
              <el-form-item label="归还里程" prop="huanchegongli">
                <el-input-number style="width: calc(100% - 32px)"
                                 v-model="queryParams.huanchegongli"
                                 clearable
                                 placeholder="请输入还车时公里数"
                                 size="small"
                                 @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="行驶里程" prop="xingchenggongli">
                <el-input-number style="width: calc(100% - 32px)"
                                 v-model="queryParams.xingchenggongli"
                                 clearable
                                 placeholder="请输入行驶里程数"
                                 size="small"
                                 @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="车辆状态" prop="zhuangtai">
                <el-input
                  v-model="queryParams.zhuangtai"
                  placeholder="请输入车辆状态"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="初始车况" prop="chushichekuang">
                <el-select
                  v-model="queryParams.chushichekuang"
                  clearable
                  placeholder="请选择初始车况"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="dict in car_damage"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="归还车况" prop="guihuanchekuang">
                <el-select
                  v-model="queryParams.guihuanchekuang"
                  clearable
                  placeholder="请选择归还车况"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="dict in car_damage"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-collapse-transition>
      </el-card>
    </el-form>

    <!--<el-row :gutter="10" class="mb8">-->
    <!--<el-col :span="1.5">-->
    <!--<el-button-->
    <!--type="warning"-->
    <!--plain-->
    <!--icon="el-icon-download"-->
    <!--size="mini"-->
    <!--@click="handleExport"-->
    <!--v-hasPermi="['administrationCarManage:returnCar:export']"-->
    <!--&gt;导出</el-button>-->
    <!--</el-col>-->
    <!--<right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
    <!--</el-row>-->

    <el-table v-loading="loading" :data="returnCarList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="还车人" prop="createUserName" sortable/>
      <el-table-column align="center" label="车牌号码" prop="num" sortable/>

      <el-table-column label="借车时间" sortable align="center" prop="jieyongtime">
        <template slot-scope="scope">{{ subTime(scope.row.jieyongtime) }}</template>
      </el-table-column>

      <el-table-column align="center" label="初始公里数" prop="jiechegongli" sortable/>
      <el-table-column align="center" label="归还公里数" prop="huanchegongli" sortable/>
      <el-table-column align="center" label="行驶里程数" prop="xingchenggongli" sortable/>
      <el-table-column :formatter="carDamageSFormat" align="center" label="初始车况" prop="chushichekuang" sortable/>
      <el-table-column :formatter="carDamageEFormat" align="center" label="归还车况" prop="guihuanchekuang" sortable/>
      <el-table-column align="center" label="车辆状态" prop="zhuangtai" sortable/>
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
          <el-button v-if="scope.row.prostate"
                     icon="el-icon-edit"
                     size="mini"
                     type="text"
                     @click="handleFlowRecord(scope.row)"
          >详情
          </el-button>
          <el-button v-if="scope.row.prostate == undefined"
                     icon="el-icon-finished"
                     size="mini"
                     type="text"
                     @click="handlerHuanche(scope.row)"
          >还车
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
  </div>
</template>

<script>
import {
  addReturnCar,
  exportReturnCar,
  delReturnCar,
  listReturnCar,
  updateReturnCar
} from '@/api/biz/administrationCarManage/returnCar'
import { getFlowInfoByFlowId } from '@/api/flowable/definition'

export default {
  name: 'ReturnCar',
  components: {},
  data() {
    return {
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
      // 还车管理表格数据
      returnCarList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        simpleSearch:'',
        title: null,
        created: null,
        modified: null,
        creator: null,
        modificator: null,
        recycle: null,
        name: null,
        dept: null,
        time: null,
        carname: null,
        num: null,
        jiechegongli: undefined,
        huanchegongli: undefined,
        xingchenggongli: undefined,
        huanchebeizhu: null,
        fujian: null,
        jiecheid: null,
        agree: null,
        zhuangtai: null,
        shenqingshiyou: null,
        yongtuleixing: null,
        siji: null,
        jialing: null,
        mudidi: null,
        suoshuquyu: null,
        jieyongtime: null,
        guihuantime: null,
        jiechebeizhu: null,
        chushipic: null,
        chushichekuang: null,
        chushichekuangpic: null,
        guihuanpic: null,
        guihuanchekuang: null,
        guihuanchekuangpic: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      form_process_state: [],
      car_damage: [],
      ifCardShow: false
    }
  },
  created() {
    this.getList()

    this.getDicts('car_damage').then((response) => {
      this.car_damage = response.data
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
    subTime(val) {
      return val.substr(0, 10)
    },
    carDamageSFormat(row, column) {
      return this.selectDictLabel(this.car_damage, row.chushichekuang)
    },
    carDamageEFormat(row, column) {
      return this.selectDictLabel(this.car_damage, row.guihuanchekuang)
    },
    prostateFormat(row, column) {
      return this.selectDictLabel(this.form_process_state, row.prostate)
    },
    //高级搜索
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询还车管理列表 */
    getList() {
      this.loading = true
      listReturnCar(this.queryParams).then(response => {
        this.returnCarList = response.rows
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
        dept: null,
        time: null,
        carname: null,
        num: null,
        jiechegongli: null,
        huanchegongli: null,
        xingchenggongli: null,
        huanchebeizhu: null,
        fujian: null,
        jiecheid: null,
        agree: null,
        zhuangtai: null,
        shenqingshiyou: null,
        yongtuleixing: null,
        siji: null,
        jialing: null,
        mudidi: null,
        suoshuquyu: null,
        jieyongtime: null,
        guihuantime: null,
        jiechebeizhu: null,
        chushipic: null,
        chushichekuang: null,
        chushichekuangpic: null,
        guihuanpic: null,
        guihuanchekuang: null,
        guihuanchekuangpic: null
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
      this.open = true
      this.title = '添加还车管理'
    },
    /** 查看业务流程详情 */
    async handleFlowRecord(row) {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_fjpnt2e3'
      })
      this.$router.push({
        path: '/task/record/index/administrationReturnCar',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_huancheshenqing'
        }
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateReturnCar(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addReturnCar(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 还车按钮操作 */
    async handlerHuanche(row) {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_fjpnt2e3'
      })
      if (code == 200) {
        this.handleStartProcess(data, row.id)
      }
    },
    /**  发起流程申请 */
    handleStartProcess(data, id) {
      localStorage.setItem('proData', '')
      localStorage.setItem('procInsId', '')
      this.$router.push({
        path: '/task/record/index/administrationReturnCar',
        query: {
          deployId: data.deploymentId,
          procDefId: data.id,
          formId: data.formId,
          carId: id
          /*tableName: 'pms_huancheshenqing',*/
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm(
        '是否确认删除费用报销编号为"' + ids + '"的数据项?',
        '警告',{confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'}).then(function() {
          return delReturnCar(ids)
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有还车管理数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportReturnCar(queryParams)
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
