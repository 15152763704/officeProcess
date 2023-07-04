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
              <el-form-item label="材料类型" prop="cailiaoleixing">
                <el-select
                  v-model="queryParams.cailiaoleixing"
                  clearable
                  placeholder="请选择材料类型"
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="dict in material_type"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
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
              <el-form-item label="采购编号" prop="caigounum">
                <el-input
                  v-model="queryParams.caigounum"
                  placeholder="请输入采购编号"
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
              <el-form-item/><el-form-item/>
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
          v-hasPermi="['administrationMaterialManage:materialBuy:add']"
        >新增申请
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="materialBuyList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="申请人" prop="createUserName" sortable/>
      <el-table-column align="center" label="申请时间" prop="createTime" sortable/>
      <el-table-column align="center" label="采购编号" prop="caigounum" sortable/>
      <el-table-column align="center" label="需求部门" prop="xuqiubumen" sortable/>
      <el-table-column :formatter="materialTypeFormat" align="center" label="材料类型" prop="cailiaoleixing" sortable/>
      <el-table-column align="center" label="预算" prop="yusuan" sortable/>
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
            v-hasPermi="['administrationMaterialManage:materialBuy:edit']"
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

    <!-- 添加或修改耗材采购对话框 -->
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
        <el-form-item label="申请部门" prop="dept">
          <el-input v-model="form.dept" placeholder="请输入申请部门"/>
        </el-form-item>
        <el-form-item label="项目名称" prop="projectname">
          <el-input v-model="form.projectname" placeholder="请输入项目名称"/>
        </el-form-item>
        <el-form-item label="申请时间" prop="time">
          <el-input v-model="form.time" placeholder="请输入申请时间"/>
        </el-form-item>
        <el-form-item label="项目负责人" prop="fuzeren">
          <el-input v-model="form.fuzeren" placeholder="请输入项目负责人"/>
        </el-form-item>
        <el-form-item label="车牌号码" prop="num">
          <el-input v-model="form.num" placeholder="请输入车牌号码"/>
        </el-form-item>
        <el-form-item label="供应商信息" prop="gongyingshang">
          <el-input v-model="form.gongyingshang" placeholder="请输入供应商信息"/>
        </el-form-item>
        <el-form-item label="材料详情" prop="cailiao">
          <el-input v-model="form.cailiao" placeholder="请输入材料详情"/>
        </el-form-item>
        <el-form-item label="合计金额" prop="jine">
          <el-input v-model="form.jine" placeholder="请输入合计金额"/>
        </el-form-item>
        <el-form-item label="附件" prop="fujian">
          <el-input v-model="form.fujian" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="采购编号" prop="caigounum">
          <el-input v-model="form.caigounum" placeholder="请输入采购编号"/>
        </el-form-item>
        <el-form-item label="是否同意" prop="agree">
          <el-input v-model="form.agree" placeholder="请输入是否同意"/>
        </el-form-item>
        <el-form-item label="采购类型" prop="leixing">
          <el-input v-model="form.leixing" placeholder="请输入采购类型"/>
        </el-form-item>
        <el-form-item label="需求单位" prop="xuqiudanwei">
          <el-input v-model="form.xuqiudanwei" placeholder="请输入需求单位"/>
        </el-form-item>
        <el-form-item label="需求部门" prop="xuqiubumen">
          <el-input v-model="form.xuqiubumen" placeholder="请输入需求部门"/>
        </el-form-item>
        <el-form-item label="需求说明" prop="shuoming">
          <el-input v-model="form.shuoming" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="项目类型" prop="projectleixing">
          <el-input v-model="form.projectleixing" placeholder="请输入项目类型"/>
        </el-form-item>
        <el-form-item label="角色" prop="cast">
          <el-input v-model="form.cast" placeholder="请输入角色"/>
        </el-form-item>
        <el-form-item label="申请日期" prop="shenqingtime">
          <el-input v-model="form.shenqingtime" placeholder="请输入申请日期"/>
        </el-form-item>
        <el-form-item label="材料类型" prop="cailiaoleixing">
          <el-input v-model="form.cailiaoleixing" placeholder="请输入材料类型"/>
        </el-form-item>
        <el-form-item label="建议总额" prop="jianyizonge">
          <el-input v-model="form.jianyizonge" placeholder="请输入建议总额"/>
        </el-form-item>
        <el-form-item label="实际总额" prop="shijizonge">
          <el-input v-model="form.shijizonge" placeholder="请输入实际总额"/>
        </el-form-item>
        <el-form-item label="节省比" prop="jieshengbi">
          <el-input v-model="form.jieshengbi" placeholder="请输入节省比"/>
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="建议供应商" prop="gysname">
          <el-input v-model="form.gysname" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="公司名称" prop="gsname">
          <el-input v-model="form.gsname" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="预算" prop="yusuan">
          <el-input v-model="form.yusuan" placeholder="请输入预算"/>
        </el-form-item>
        <el-form-item label="请购编号" prop="qinggoubianhao">
          <el-input v-model="form.qinggoubianhao" placeholder="请输入请购编号"/>
        </el-form-item>
        <el-form-item label="请购申请人" prop="qinggouren">
          <el-input v-model="form.qinggouren" placeholder="请输入请购申请人"/>
        </el-form-item>
        <el-form-item label="请购部门" prop="qinggoubumen">
          <el-input v-model="form.qinggoubumen" placeholder="请输入请购部门"/>
        </el-form-item>
        <el-form-item label="请购单位" prop="qinggoudanwei">
          <el-input v-model="form.qinggoudanwei" placeholder="请输入请购单位"/>
        </el-form-item>
        <el-form-item label="项目经理" prop="xiangmujingli">
          <el-input v-model="form.xiangmujingli" placeholder="请输入项目经理"/>
        </el-form-item>
        <el-form-item label="请购供应商" prop="qinggougys">
          <el-input v-model="form.qinggougys" placeholder="请输入请购供应商"/>
        </el-form-item>
        <el-form-item label="请购供应商明细" prop="gysmingxi">
          <el-input v-model="form.gysmingxi" placeholder="请输入请购供应商明细"/>
        </el-form-item>
        <el-form-item label="请购备注" prop="qinggoubeizhu">
          <el-input v-model="form.qinggoubeizhu" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="请购附件" prop="qinggoufujian">
          <el-input v-model="form.qinggoufujian" placeholder="请输入内容" type="textarea"/>
        </el-form-item>
        <el-form-item label="json_data" prop="jsonData">
          <el-input v-model="form.jsonData" placeholder="请输入json_data"/>
        </el-form-item>
        <el-form-item label="parentid" prop="parentid">
          <el-input v-model="form.parentid" placeholder="请输入parentid"/>
        </el-form-item>
        <el-divider content-position="center">耗材采购子表信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button icon="el-icon-plus" size="mini" type="primary" @click="handleAddPmsCailiaoxiangqing">添加
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDeletePmsCailiaoxiangqing">删除
            </el-button>
          </el-col>
        </el-row>
        <el-table ref="pmsCailiaoxiangqing" :data="pmsCailiaoxiangqingList"
                  :row-class-name="rowPmsCailiaoxiangqingIndex" @selection-change="handlePmsCailiaoxiangqingSelectionChange"
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
          <el-table-column label="材料名称" prop="qicainame">
            <template slot-scope="scope">
              <el-input v-model="scope.row.qicainame" placeholder="请输入材料名称"/>
            </template>
          </el-table-column>
          <el-table-column label="规格型号" prop="leixing">
            <template slot-scope="scope">
              <el-input v-model="scope.row.leixing" placeholder="请输入规格型号"/>
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
          <el-table-column label="数量" prop="shuliang">
            <template slot-scope="scope">
              <el-input v-model="scope.row.shuliang" placeholder="请输入数量"/>
            </template>
          </el-table-column>
          <el-table-column label="参考单价1" prop="cankaodanjia1">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cankaodanjia1" placeholder="请输入参考单价1"/>
            </template>
          </el-table-column>
          <el-table-column label="参考单价2" prop="cankaodanjia2">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cankaodanjia2" placeholder="请输入参考单价2"/>
            </template>
          </el-table-column>
          <el-table-column label="参考单价3" prop="cankaodanjia3">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cankaodanjia3" placeholder="请输入参考单价3"/>
            </template>
          </el-table-column>
          <el-table-column label="建议单价" prop="jianyidanjia">
            <template slot-scope="scope">
              <el-input v-model="scope.row.jianyidanjia" placeholder="请输入建议单价"/>
            </template>
          </el-table-column>
          <el-table-column label="实际采购价" prop="shijiacaigoujia">
            <template slot-scope="scope">
              <el-input v-model="scope.row.shijiacaigoujia" placeholder="请输入实际采购价"/>
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
  getMaterialBuy,
  listMaterialBuy,
  updateMaterialBuy
} from '@/api/biz/administrationMaterialManage/materialBuy'
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
      checkedPmsCailiaoxiangqing: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 耗材采购表格数据
      materialBuyList: [],
      // 耗材采购子表表格数据
      pmsCailiaoxiangqingList: [],
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
        projectname: null,
        time: null,
        fuzeren: null,
        num: null,
        gongyingshang: null,
        cailiao: null,
        jine: null,
        fujian: null,
        caigounum: null,
        agree: null,
        leixing: null,
        xuqiudanwei: null,
        xuqiubumen: null,
        shuoming: null,
        projectleixing: null,
        cast: null,
        shenqingtime: null,
        cailiaoleixing: null,
        jianyizonge: null,
        shijizonge: null,
        jieshengbi: null,
        beizhu: null,
        gysname: null,
        gsname: null,
        yusuan: null,
        qinggoubianhao: null,
        qinggouren: null,
        qinggoubumen: null,
        qinggoudanwei: null,
        xiangmujingli: null,
        qinggougys: null,
        gysmingxi: null,
        qinggoubeizhu: null,
        qinggoufujian: null,
        jsonData: null,
        parentid: null
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
      },
      ifCardShow: false,
      showTimetime: '',
      material_type: [],
      form_process_state: []
    }
  },
  created() {
    this.getList()
    this.getDicts('form_process_state').then((response) => {
      this.form_process_state = response.data
    })
    this.getDicts('material_type').then((response) => {
      this.material_type = response.data
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
    materialTypeFormat(row, column) {
      return this.selectDictLabel(this.material_type, row.cailiaoleixing)
    },
    //条件申请时间
    handletimeChangetime(dataarr) {
      this.queryParams.timesStarttime = dataarr[0]
      this.queryParams.timesEndtime = dataarr[1]
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    //高级搜索
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    /** 查询耗材采购列表 */
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
        dept: null,
        projectname: null,
        time: null,
        fuzeren: null,
        num: null,
        gongyingshang: null,
        cailiao: null,
        jine: null,
        fujian: null,
        caigounum: null,
        agree: null,
        leixing: null,
        xuqiudanwei: null,
        xuqiubumen: null,
        shuoming: null,
        projectleixing: null,
        cast: null,
        shenqingtime: null,
        cailiaoleixing: null,
        jianyizonge: null,
        shijizonge: null,
        jieshengbi: null,
        beizhu: null,
        gysname: null,
        gsname: null,
        yusuan: null,
        qinggoubianhao: null,
        qinggouren: null,
        qinggoubumen: null,
        qinggoudanwei: null,
        xiangmujingli: null,
        qinggougys: null,
        gysmingxi: null,
        qinggoubeizhu: null,
        qinggoufujian: null,
        jsonData: null,
        parentid: null
      }
      this.pmsCailiaoxiangqingList = []
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
    /** 新增按钮操作 */
    async handleAdd() {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_oen9lukj'
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
        path: '/task/record/index/administrationMaterialBuy',
        query: {
          deployId: row.deploymentId,
          procDefId: row.id,
          formId: row.formId
        }
      })
    },
    /** 流程流转记录 */
    async handleFlowRecord(row) {
      const { code, data, msg } = await getFlowInfoByFlowId({
        flowId: 'process_oen9lukj'
      })
      this.$router.push({
        path: '/task/record/index/administrationMaterialBuy',
        query: {
          id: row.id,
          formId: data.formId,
          procInsId: row.procInsId,
          deployId: row.deployId,
          taskId: row.taskId,
          tableName: 'pms_cailiaocaigou'
        }
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getMaterialBuy(id).then(response => {
        this.form = response.data
        this.pmsCailiaoxiangqingList = response.data.pmsCailiaoxiangqingList
        this.open = true
        this.title = '修改耗材采购'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.pmsCailiaoxiangqingList = this.pmsCailiaoxiangqingList
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
      this.$confirm('是否确认删除耗材采购编号为"' + ids + '"的数据项?', '警告', {
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
    /** 耗材采购子表序号 */
    rowPmsCailiaoxiangqingIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 耗材采购子表添加按钮操作 */
    handleAddPmsCailiaoxiangqing() {
      let obj = {}
      obj.title = ''
      obj.created = ''
      obj.modified = ''
      obj.creator = ''
      obj.modificator = ''
      obj.recycle = ''
      obj.name = ''
      obj.qicainame = ''
      obj.leixing = ''
      obj.pinpai = ''
      obj.danwei = ''
      obj.shuliang = ''
      obj.cankaodanjia1 = ''
      obj.cankaodanjia2 = ''
      obj.cankaodanjia3 = ''
      obj.jianyidanjia = ''
      obj.shijiacaigoujia = ''
      obj.parentid = ''
      this.pmsCailiaoxiangqingList.push(obj)
    },
    /** 耗材采购子表删除按钮操作 */
    handleDeletePmsCailiaoxiangqing() {
      if (this.checkedPmsCailiaoxiangqing.length == 0) {
        this.$alert('请先选择要删除的耗材采购子表数据', '提示', { confirmButtonText: '确定' })
      } else {
        this.pmsCailiaoxiangqingList.splice(this.checkedPmsCailiaoxiangqing[0].index - 1, 1)
      }
    },
    /** 单选框选中数据 */
    handlePmsCailiaoxiangqingSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.pmsCailiaoxiangqing.clearSelection()
        this.$refs.pmsCailiaoxiangqing.toggleRowSelection(selection.pop())
      } else {
        this.checkedPmsCailiaoxiangqing = selection
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有耗材采购数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMaterialBuy(queryParams)
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
