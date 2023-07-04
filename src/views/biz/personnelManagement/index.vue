<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
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
              size="mini"
              type="primary"
              @click.stop="cardClick"
            >高级搜索
            </el-button>
          </el-form-item>
        </div>
        <el-collapse-transition>
          <div v-show="ifCardShow">
            <div class="my-col">
              <el-form-item label="姓名" prop="name">
                <el-input
                  v-model="queryParams.name"
                  placeholder="请输入姓名"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="入职公司" prop="ruzhigongsi">
                <el-select v-model="queryParams.ruzhigongsi" placeholder="请选择入职公司" clearable size="small">
                  <el-option
                    v-for="dict in companyOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="入职部门" prop="dept">
                <el-select v-model="queryParams.dept" placeholder="请选择入职部门" clearable size="small">
                  <el-option
                    v-for="dict in deptOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="岗位" prop="gangwei">
                <el-input
                  v-model="queryParams.gangwei"
                  placeholder="请输入岗位"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </div>
            <div class="my-col">
              <el-form-item label="转正日期" prop="zhuanzhengriqi">
                <el-date-picker
                  v-model="showTime"
                  type="daterange"
                  align="right"
                  value-format="yyyy-MM-dd"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  @keyup.enter.native="handleQuery"
                  @change="handletimeChange"
                ></el-date-picker>
              </el-form-item>
              <el-form-item></el-form-item><el-form-item></el-form-item><el-form-item></el-form-item>
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
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
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
      <el-table-column label="姓名" sortable align="center" prop="name"   sortable />
      <el-table-column
        label="入职公司"
        sortable
        align="center"
        prop="ruzhigongsi"
        :formatter="companyFormat"
      />
      <el-table-column
        label="入职部门"
        sortable
        align="center"
        prop="dept"
        :formatter="deptFormat"
      />
      <el-table-column label="转正日期" sortable align="center" prop="zhuanzhengriqi" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.zhuanzhengriqi, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
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
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="基本信息" class="title_class">
            <el-divider></el-divider>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="姓名" prop="name" style="width: 100%;">
            <el-input v-model="form.name" placeholder="请输入姓名" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="性别" prop="sex" style="width: 100%;">
            <el-radio-group v-model="form.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="出生日期" prop="time" style="width: 100%;">
            <el-date-picker
              v-model="form.time"
              align="right"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择出生日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="民族" prop="family" style="width: 100%;">
            <el-input v-model="form.family" placeholder="请输入民族" style="width: 100%;" />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="籍贯" prop="jiguan" style="width: 100%;">
            <el-input v-model="form.jiguan" placeholder="请输入籍贯" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="通信地址" prop="address" style="width: 100%;">
            <el-input v-model="form.address" placeholder="请输入通信地址" style="width: 100%;" />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="联系电话" prop="contactway" style="width: 100%;">
            <el-input v-model="form.contactway" placeholder="请输入联系电话" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="紧急联系人姓名1" prop="jinjilianxiren1" style="width: 100%;">
            <el-input v-model="form.jinjilianxiren1" placeholder="请输入紧急联系人姓名" style="width: 100%;" />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="紧急联系人身份1" prop="jinjishenfen1" style="width: 100%;">
            <el-select
              v-model="form.jinjishenfen1"
              clearable
              placeholder="请选择紧急联系人身份"
              style="width:100%;"
            >
              <el-option
                v-for="item in identityOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="紧急联系人电话1" prop="jinjidianhua1" style="width: 100%;">
            <el-input v-model="form.jinjidianhua1" placeholder="请输入紧急联系人电话" style="width: 100%;" />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="紧急联系人姓名2" prop="jinjilianxiren2" style="width: 100%;">
            <el-input v-model="form.jinjilianxiren2" placeholder="请输入紧急联系人姓名" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="紧急联系人身份2" prop="context" style="width: 100%;">
            <el-select
              v-model="form.jinjishenfen2"
              clearable
              placeholder="请选择紧急联系人身份"
              style="width:100%;"
            >
              <el-option
                v-for="item in identityOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="紧急联系人电话2" prop="jinjidianhua2" style="width: 100%;">
            <el-input v-model="form.jinjidianhua2" placeholder="请输入紧急联系人电话" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="入职公司" prop="ruzhigongsi" style="width: 100%;">
            <el-select
              v-model="form.ruzhigongsi"
              clearable
              placeholder="请选择入职公司"
              style="width:100%;"
            >
              <el-option
                v-for="item in companyOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="入职部门" prop="dept" style="width: 100%;">
            <el-select
              v-model="form.dept"
              clearable
              placeholder="请选择入职部门"
              style="width:100%;"
            >
              <el-option
                v-for="item in deptOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" style="width: 100%;">
            <el-input v-model="form.email" placeholder="请输入邮箱" style="width: 100%;" />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px">
          <el-form-item label="身份证附件" prop="fileIdCard" ref="fileIdCard">
            <el-upload
              :before-upload="checkMyFileSize"
              class="upload-demo"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :on-success="handleAvatarSuccessForIdCard"
              :file-list="fileIdCardList"
              :on-remove="handleRemoveForIdCard"
              :on-preview="downloadFile"
              :data="fileIdCardParam"
              style="width:100%;"
              multiple
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <!--<div class="my-col" style="padding-right:40px">-->
          <!--<el-form-item label="户口本附件" prop="fileHousehold">-->
            <!--<el-upload-->
              <!--class="upload-demo"-->
              <!--:headers="uploadHeaders"-->
              <!--:action="uploadUrl"-->
              <!--:on-success="handleAvatarSuccessForHousehold"-->
              <!--:file-list="fileHouseholdList"-->
              <!--:on-remove="handleRemoveForHousehold"-->
              <!--:on-preview="downloadFile"-->
              <!--:data="fileHouseholdParam"-->
              <!--style="width:100%;"-->
              <!--multiple-->
            <!--&gt;-->
              <!--<el-button size="small" type="primary">点击上传</el-button>-->
            <!--</el-upload>-->
          <!--</el-form-item>-->
        <!--</div>-->
        <div class="my-col" style="padding-right:40px">
          <el-form-item label="无犯罪记录证明" prop="fileIdPhoto" ref="fileIdPhoto">
            <el-upload
              :before-upload="checkMyFileSize"
              class="upload-demo"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :on-success="handleAvatarSuccessForIdPhoto"
              :file-list="fileIdPhotoList"
              :on-remove="handleRemoveForIdPhoto"
              :on-preview="downloadFile"
              :data="fileIdPhotoParam"
              style="width:100%;"
              multiple
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px">
          <el-form-item label="体检报告" prop="fileMedicalReport">
            <el-upload
              :before-upload="checkMyFileSize"
              class="upload-demo"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :on-success="handleAvatarSuccessForMedicalReport"
              :file-list="fileMedicalReportList"
              :on-remove="handleRemoveForMedicalReport"
              :on-preview="downloadFile"
              :data="fileMedicalReportParam"
              style="width:100%;"
              multiple
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="教育历程" class="title_class">
            <el-divider></el-divider>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="学历" prop="xueli" style="width: 100%;">
            <el-select
              v-model="form.xueli"
              clearable
              placeholder="请选择学历"
              style="width:100%;"
            >
              <el-option
                v-for="item in educationOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="毕业院校" prop="biyeyuanxiao" style="width: 100%;">
            <el-input v-model="form.biyeyuanxiao" placeholder="请输入毕业院校" style="width: 100%;" />
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="专业" prop="zhuanye" style="width: 100%;">
            <el-input v-model="form.zhuanye" placeholder="请输入专业" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="毕业时间" prop="biyeshijian" style="width: 100%;">
            <el-date-picker
              v-model="form.biyeshijian"
              align="right"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择毕业时间"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px">
          <el-form-item label="毕业证书" prop="fileGraduationCertificate" ref="fileGraduationCertificate">
            <el-upload
              :before-upload="checkMyFileSize"
              class="upload-demo"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :on-success="handleAvatarSuccessForGraduationCertificate"
              :file-list="fileGraduationCertificateList"
              :on-remove="handleRemoveForGraduationCertificate"
              :on-preview="downloadFile"
              :data="fileGraduationCertificateParam"
              style="width:100%;"
              multiple
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="工作履历" class="title_class">
            <el-divider></el-divider>
          </el-form-item>
        </div>
        <!-- 动态表单 -->
        <el-row :gutter="10" class="mb8" style="padding:0 10px;">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="addDomain"
            >添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDeleteDomain"
            >删除</el-button>
          </el-col>
        </el-row>

        <el-table
          :data="form.experienceList"
          :row-class-name="rowExperienceIndex"
          @selection-change="handleExperienceSelectionChange"
          tooltip-effect="dark"
          size="small"
          ref="table"
          border>
          <template>
            <el-table-column type="selection" align="center" />
            <el-table-column label="单位名称" align="center" header-align="center"   >
              <template slot-scope="scope">
                <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
                >
                  <el-input v-model="scope.row.danweimingcheng" placeholder="请输入单位名称" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="任职部门" align="center" header-align="center"   >
              <template slot-scope="scope">
                <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
                >
                  <el-input v-model="scope.row.renzhibumen" placeholder="请输入任职部门" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="岗位" align="center" header-align="center"   >
              <template slot-scope="scope">
                <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
                >
                  <el-input v-model="scope.row.gangwei" placeholder="请输入岗位" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="入职时间" align="center" header-align="center" width="160px"   >
              <template slot-scope="scope">
                <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
                >
                  <el-date-picker
                    v-model="scope.row.starttime"
                    type="date"
                    placeholder="选择入职时间"
                    align="right"
                    value-format="yyyy-MM-dd"
                    style="width:100%;"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="离职时间" align="center" header-align="center" width="160px"   >
              <template slot-scope="scope">
                <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
                >
                  <el-date-picker
                    v-model="scope.row.endtime"
                    type="date"
                    placeholder="选择离职时间"
                    align="right"
                    value-format="yyyy-MM-dd"
                    style="width:100%;"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center" header-align="center"   >
              <template slot-scope="scope">
                <el-form-item
                  class="noleftform"
                  style="width: 100%;margin-bottom:0;"
                >
                  <el-input v-model="scope.row.beizhu" placeholder="请输入备注" />
                </el-form-item>
              </template>
            </el-table-column>
            <!--<el-table-column label="附件" align="center" header-align="center">-->
              <!--<template slot-scope="scope">-->
                <!--<el-form-item-->
                  <!--class="noleftform"-->
                  <!--style="width: 100%;margin-bottom:0;"-->
                <!--&gt;-->
                  <!--<el-upload-->
                    <!--class="upload-demo"-->
                    <!--:headers="uploadHeaders"-->
                    <!--:action="uploadUrl"-->
                    <!--:on-success="file => handleAvatarSuccessForExperience(file, scope.row)"-->
                    <!--:file-list="scope.row.fileExperienceList"-->
                    <!--:on-remove="(file,fileList) => handleRemoveForExperience(file, fileList, scope.row)"-->
                    <!--:on-preview="downloadFile"-->
                    <!--:data="fileExperienceParam"-->
                    <!--style="width:100%;"-->
                    <!--multiple-->
                  <!--&gt;-->
                    <!--<el-button size="small" type="primary">点击上传</el-button>-->
                  <!--</el-upload>-->
                <!--</el-form-item>-->
              <!--</template>-->
            <!--</el-table-column>-->
          </template>
        </el-table>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="入职情况" class="title_class">
            <el-divider></el-divider>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="入职日期" prop="ruzhishijian" style="width: 100%;">
            <el-date-picker
              v-model="form.ruzhishijian"
              align="right"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择入职日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="转正日期" prop="zhuanzhengriqi" style="width: 100%;">
            <el-date-picker
              v-model="form.zhuanzhengriqi"
              align="right"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择转正日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px;">
          <el-form-item label="岗位" prop="gangwei" style="width: 100%;">
            <el-input v-model="form.gangwei" placeholder="请输入岗位" style="width: 100%;" />
          </el-form-item>
          <el-form-item></el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px">
          <el-form-item label="劳动合同附件" prop="fileLaborContract" ref="fileLaborContract">
            <el-upload
              :before-upload="checkMyFileSize"
              class="upload-demo"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :on-success="handleAvatarSuccessForLaborContract"
              :file-list="fileLaborContractList"
              :on-remove="handleRemoveForLaborContract"
              :on-preview="downloadFile"
              :data="fileLaborContractParam"
              style="width:100%;"
              multiple
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <div class="my-col" style="padding-right:40px">
          <el-form-item label="保密协议附件" prop="fileSecret">
            <el-upload
              :before-upload="checkMyFileSize"
              class="upload-demo"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :on-success="handleAvatarSuccessForSecret"
              :file-list="fileSecretList"
              :on-remove="handleRemoveForSecret"
              :on-preview="downloadFile"
              :data="fileSecretParam"
              style="width:100%;"
              multiple
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
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
import { list, save, getInfo, listAll, del } from '@/api/biz/personnelManagement'
import { getFileDetailByServiceId } from '@/api/system/file'
import { uuid } from 'vue-uuid';

export default {
  name: 'PersonnelManagement',
  components: {  },
  data() {
    return {
      ifCardShow:false,
      showTime: '',
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
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      companyOptions: [],
      deptOptions: [],
      identityOptions: [],
      educationOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        created: null,
        company: null,
        name: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' },
        ],
        family: [
          { required: true, message: '请填写民族', trigger: 'blur' },
        ],
        jiguan: [
          { required: true, message: '请填写籍贯', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请填写通信地址', trigger: 'blur' },
        ],
        contactway: [
          { required: true, message: '请填写联系电话', trigger: 'blur' },
        ],
        jinjilianxiren1: [
          { required: true, message: '请填写紧急联系人姓名1', trigger: 'blur' },
        ],
        jinjishenfen1: [
          { required: true, message: '请选择紧急联系人身份1', trigger: 'blur' },
        ],
        jinjidianhua1: [
          { required: true, message: '请填写紧急联系人电话1', trigger: 'blur' },
        ],
        ruzhigongsi: [
          { required: true, message: '请选择入职公司', trigger: 'blur' },
        ],
        dept: [
          { required: true, message: '请选择入职部门', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
        ],
        fileIdCard: [
          { required: true, message: '请上传身份证附件', trigger: 'change' },
        ],
        fileIdPhoto: [
          { required: true, message: '请上传无犯罪记录证明', trigger: 'change' },
        ],
        xueli: [
          { required: true, message: '请选择学历', trigger: 'blur' },
        ],
        biyeyuanxiao: [
          { required: true, message: '请填写毕业院校', trigger: 'blur' },
        ],
        zhuanye: [
          { required: true, message: '请填写专业', trigger: 'blur' },
        ],
        biyeshijian: [
          { required: true, message: '请选择毕业时间', trigger: 'blur' },
        ],
        fileGraduationCertificate: [
          { required: true, message: '请上传毕业证书', trigger: 'blur' },
        ],
        ruzhishijian: [
          { required: true, message: '请选择入职日期', trigger: 'blur' },
        ],
        zhuanzhengriqi: [
          { required: true, message: '请选择转正日期', trigger: 'blur' },
        ],
        gangwei: [
          { required: true, message: '请填写岗位', trigger: 'blur' },
        ],
        fileLaborContract: [
          { required: true, message: '请上传劳动合同附件', trigger: 'change' },
        ],
        time: [
          { required: true, message: '请选择出生日期', trigger: 'blur' },
        ]
      },
      createUserName: '',
      formDeptName: '',
      modelList: [],
      checkedExperience: [],
      uploadHeaders: {
        Authorization: '',
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      fileExperienceMap: {},
      fileIdCardIds: '',
      fileIdCardList: [],
      fileIdCardParam: {
        fieldName: 'idCard',
        tableName: 'pms_personnel_management',
      },
      fileHouseholdIds: '',
      fileHouseholdList: [],
      fileHouseholdParam: {
        fieldName: 'household',
        tableName: 'pms_personnel_management',
      },
      fileIdPhotoIds: '',
      fileIdPhotoList: [],
      fileIdPhotoParam: {
        fieldName: 'idPhoto',
        tableName: 'pms_personnel_management',
      },
      fileMedicalReportIds: '',
      fileMedicalReportList: [],
      fileMedicalReportParam: {
        fieldName: 'medicalReport',
        tableName: 'pms_personnel_management',
      },
      fileGraduationCertificateIds: '',
      fileGraduationCertificateList: [],
      fileGraduationCertificateParam: {
        fieldName: 'graduationCertificate',
        tableName: 'pms_personnel_management',
      },
      fileExperienceIds: '',
      fileExperienceList: [],
      fileExperienceParam: {
        fieldName: 'experience',
        tableName: 'pms_personnel_management_experience',
      },
      fileLaborContractIds: '',
      fileLaborContractList: [],
      fileLaborContractParam: {
        fieldName: 'laborContract',
        tableName: 'pms_personnel_management',
      },
      fileSecretIds: '',
      fileSecretList: [],
      fileSecretParam: {
        fieldName: 'secret',
        tableName: 'pms_personnel_management',
      },
    }
  },
  created() {
    this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
    this.getList()
    this.getDicts('form_company_name').then((response) => {
      this.companyOptions = response.data
    })
    this.getDicts('company_dept').then((response) => {
      this.deptOptions = response.data
    })
    this.getDicts('identity_relationship').then((res) => {
      this.identityOptions = res.data
    })
    this.getDicts('education').then((res) => {
      this.educationOptions = res.data
    })
  },
  methods: {
    cardClick() {
      this.ifCardShow = !this.ifCardShow
    },
    handleExperienceSelectionChange(selection) {
      this.checkedExperience = selection.sort(
        (a, b) => b.index - a.index
      )
    },
    rowExperienceIndex({ row, rowIndex }) {
      row.index = rowIndex
    },
    handleDeleteDomain() {
      if (this.checkedExperience.length == 0) {
        this.$alert('请先选择要删除的工作履历', '提示', {
          confirmButtonText: '确定',
        })
      } else {
        this.checkedExperience.forEach((item) => {
          this.form.experienceList.splice(item.index, 1)
        })
        if (this.form.experienceList.length == 0) {
          this.addDomain()
        }
      }
    },
    removeDomain(item) {
      var index = this.form.experienceList.indexOf(item)
      if (index !== -1) {
        this.form.experienceList.splice(index, 1)
      }
    },
    addDomain() {
      this.form.experienceList.push({
        key: uuid.v1()
      })
    },
    handletimeChange(date) {
      if (date == null) {
        this.queryParams.confirmationDateBeg = null
        this.queryParams.confirmationDateEnd = null
      }
    },
    downloadFile({ url }) {
      window.open(url)
    },
    handleAvatarSuccessForIdCard({ data }, file, fileList) {
      this.fileIdCardIds = this.fileIdCardIds == null ? '' : this.fileIdCardIds
      this.fileIdCardIds += `;${data[0].fileId}`
      this.rules.fileIdCard = []
      this.$refs.form.clearValidate('fileIdCard')
    },
    handleAvatarSuccessForHousehold({ data }, file, fileList) {
      this.fileHouseholdIds = this.fileHouseholdIds == null ? '' : this.fileHouseholdIds
 this.fileHouseholdIds += `;${data[0].fileId}`
    },
    handleAvatarSuccessForIdPhoto({ data }, file, fileList) {
      this.fileIdPhotoIds = this.fileIdPhotoIds == null ? '' : this.fileIdPhotoIds
      this.fileIdPhotoIds += `;${data[0].fileId}`
      this.rules.fileIdPhoto = []
      this.$refs.form.clearValidate('fileIdPhoto')
    },
    handleAvatarSuccessForMedicalReport({ data }, file, fileList) {
      this.fileMedicalReportIds = this.fileMedicalReportIds == null ? '' : this.fileMedicalReportIds
 this.fileMedicalReportIds += `;${data[0].fileId}`
    },
    handleAvatarSuccessForGraduationCertificate({ data }, file, fileList) {
      this.fileGraduationCertificateIds = this.fileGraduationCertificateIds == null ? '' : this.fileGraduationCertificateIds
      this.fileGraduationCertificateIds += `;${data[0].fileId}`
      this.rules.fileGraduationCertificate = []
      this.$refs.form.clearValidate('fileGraduationCertificate')
    },
    handleAvatarSuccessForExperience({ data }, row) {
      if(row.fujian == undefined){
        row.fujian = `${data[0].fileId};`
      }else{
        row.fujian += `${data[0].fileId};`
      }
    },
    handleAvatarSuccessForLaborContract({ data }, file, fileList) {
      this.fileLaborContractIds = this.fileLaborContractIds == null ? '' : this.fileLaborContractIds
      this.fileLaborContractIds += `;${data[0].fileId}`
      this.rules.fileLaborContract = []
      this.$refs.form.clearValidate('fileLaborContract')
    },
    handleAvatarSuccessForSecret({ data }, file, fileList) {
      this.fileSecretIds = this.fileSecretIds == null ? '' : this.fileSecretIds
 this.fileSecretIds += `;${data[0].fileId}`
    },
    handleRemoveForIdCard(file, fileList) {
      let idArr = []
      if (this.form.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileIdCardIds = idArr.join(';')
      if(idArr.length == 0){
        this.rules.fileIdCard = [
          { required: true, message: '请上传身份证附件', trigger: 'change' },
        ]
      }
    },
    handleRemoveForHousehold(file, fileList) {
      let idArr
      if (this.form.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileHouseholdIds = idArr.join(';')
    },
    handleRemoveForIdPhoto(file, fileList) {
      let idArr = []
      if (this.form.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileIdPhotoIds = idArr.join(';')
      if(idArr.length == 0){
        this.rules.fileIdPhoto = [
          { required: true, message: '请上传无犯罪记录证明', trigger: 'change' },
        ]
      }
    },
    handleRemoveForMedicalReport(file, fileList) {
      let idArr
      if (this.form.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileMedicalReportIds = idArr.join(';')
    },
    handleRemoveForGraduationCertificate(file, fileList) {
      let idArr = []
      if (this.form.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileGraduationCertificateIds = idArr.join(';')
      if(idArr.length == 0){
        this.rules.fileGraduationCertificate = [
          { required: true, message: '请上传毕业证书', trigger: 'change' },
        ]
      }
    },
    handleRemoveForExperience(file, fileList, row) {
      let idArr
      if (this.form.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      row.fujian = idArr.join(';');
      // this.fileExperienceIds = idArr.join(';')
    },
    handleRemoveForLaborContract(file, fileList) {
      let idArr = []
      if (this.form.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileLaborContractIds = idArr.join(';')
      if(idArr.length == 0){
        if(idArr.length == 0){
          this.rules.fileLaborContract = [
            { required: true, message: '请上传劳动合同附件', trigger: 'change' },
          ]
        }
      }
    },
    handleRemoveForSecret(file, fileList) {
      let idArr
      if (this.form.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileSecretIds = idArr.join(';')
    },
    /** 查询企业资质详情列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.showTime && '' != this.showTime) {
        this.queryParams.confirmationDateBeg = this.showTime[0]
        this.queryParams.confirmationDateBeg = this.showTime[1]
      }
      listAll(this.queryParams).then(( data ) => {
        this.modelList = data.rows
        this.total = data.total
        this.loading = false
      })
    },
    // 	入职公司字典翻译
    companyFormat(row, column) {
      return this.selectDictLabel(this.companyOptions, row.ruzhigongsi)
    },
    // 	入职部门字典翻译
    deptFormat(row, column) {
      return this.selectDictLabel(this.deptOptions, row.dept)
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
        experienceList: [
          {
            key: uuid.v1(),
          },
        ],
      }
      this.fileIdCardList = []
      this.fileHouseholdList = []
      this.fileIdPhotoList = []
      this.fileMedicalReportList = []
      this.fileGraduationCertificateList = []
      this.fileExperienceList = []
      this.fileLaborContractList = []
      this.fileSecretList = []
      this.rules.fileIdCard = [
        { required: true, message: '请上传身份证附件', trigger: 'change' },
      ]
      this.rules.fileIdPhoto = [
        { required: true, message: '请上传无犯罪记录证明', trigger: 'change' },
      ]
      this.rules.fileGraduationCertificate = [
        { required: true, message: '请上传毕业证书', trigger: 'blur' },
      ]
      this.rules.fileLaborContract = [
        { required: true, message: '请上传劳动合同附件', trigger: 'change' },
      ]
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.showTime = []
      this.queryParams.confirmationDateBeg = ''
      this.queryParams.confirmationDateEnd = ''
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      console.log('selection', selection)
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加人事档案'
      const currentUser = this.$store.getters.user
      this.createUserName = this.$store.getters.name
      this.formDeptName = currentUser.dept.deptName
      this.form.createUserId = this.$store.getters.userId
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm(
        '是否确认删除这条数据?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(function () {
          return del(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id
      getInfo(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改人事档案'
        this.createUserName = response.data.createUserName
        this.formDeptName = response.data.createDeptName
        this.getFileDetailByServiceId(id)
        this.setFileExperienceList(this.form.experienceList)
        // this.getFileDetailBySubList(this.form.experienceList)
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
          this.form.fujian = this.fileIdCardIds + this.fileHouseholdIds + this.fileIdPhotoIds + this.fileMedicalReportIds
                            + this.fileGraduationCertificateIds + this.fileLaborContractIds + this.fileSecretIds
          save(this.form).then((response) => {
            this.msgSuccess(msg)
            this.open = false
            this.getList()
          })
        }
      })
    },
    setFileExperienceList(subList){
      for(let i=0;i<subList.length;i++){
        let fileList = subList[i].fileExperienceList;
        for(let j=0;j<fileList.length;j++){
          fileList[j] = {
            name: fileList[j].fileName,
            url: fileList[j].savePath,
            id: fileList[j].id,
          }
        }
      }
    },
    async getFileDetailByServiceId(id) {
      const { code, data, msg } = await getFileDetailByServiceId(id)
      if (code == 200) {
        data.map((item) => {
          if (item.fieldName == 'idCard') {
            this.fileIdCardList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
            this.rules.fileIdCard = []
            this.$refs.form.clearValidate('fileIdCard')
          } else if (item.fieldName == 'household') {
            this.fileHouseholdList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
          } else if (item.fieldName == 'idPhoto') {
            this.fileIdPhotoList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
            this.rules.fileIdPhoto = []
            this.$refs.form.clearValidate('fileIdPhoto')
          } else if (item.fieldName == 'medicalReport') {
            this.fileMedicalReportList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
          } else if (item.fieldName == 'graduationCertificate') {
            this.fileGraduationCertificateList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
            this.rules.fileGraduationCertificate = []
            this.$refs.form.clearValidate('fileGraduationCertificate')
          } else if (item.fieldName == 'laborContract') {
            this.fileLaborContractList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
            this.rules.fileLaborContract = []
            this.$refs.form.clearValidate('fileLaborContract')
          } else if (item.fieldName == 'secret') {
            this.fileSecretList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
          }
        })
      }
    },
    async getFileDetailBySubList(subList) {
      for(let i=0;i<subList.length;i++){
        const { code, data, msg } = await getFileDetailByServiceId(subList[i].id)
        if (code == 200) {
          subList[i].fileExperienceList = []
          data.map((item) => {
            subList[i].fileExperienceList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id,
            })
          })
        }
      }
      console.log("subList[i].fileExperienceList",subList)

    },
  },
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  .el-form-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
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
