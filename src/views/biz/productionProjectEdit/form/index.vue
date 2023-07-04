<template>
  <div class="app-container">
    <el-dialog title="生产立项表单" :visible.sync="isshow" :before-close="onBeforeClose">
      <el-form
        ref="form"
        :model="form.variables"
        :rules="rules"
        label-width="130px"
        style="overflow: hidden;"
      >
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="基本信息" class="title_class">
              <el-divider></el-divider>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="项目经理" prop="username">
              <el-input v-model="formUserName"  placeholder="系统自动带入" style="width:100%;" @focus="dialogName = 'manageDialog'"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请部门" prop="dept">
              <el-input v-model="formDeptName" disabled placeholder="请输入申请部门" style="width:100%;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="申请时间" prop="createTime">
              <el-date-picker
                v-model="form.variables.createTime"
                type="datetime"
                placeholder="选择申请时间"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="!isformdisabled"
                style="width:100%;"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="立项依据" prop="lixiangrenzheng">
              <el-select
                v-model="form.variables.lixiangrenzheng"
                :disabled="!isformdisabled"
                clearable
                placeholder="请选择立项依据"
                style="width:100%;"
              >
                <el-option
                  v-for="item in formProjectBasisList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="生产立项编号" prop="projectCode">
              <el-input v-model="form.variables.projectCode" disabled placeholder="系统自动生成" style="width:100%;"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投标立项编号" prop="toubiaono" v-on:click.native="chooseBidProject">
              <el-input v-model="form.variables.toubiaono" disabled placeholder="请选择投标立项" style="width:100%;">
                <el-button
                  @click="chooseBidProject"
                  slot="append"
                  icon="el-icon-third-guide"
                ></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="跟踪立项编号" prop="yxnum" v-on:click.native="chooseTrackProject">
              <el-input v-model="form.variables.yxnum" disabled placeholder="请选择跟踪立项" style="width:100%;">
                <el-button
                  @click="chooseTrackProject"
                  slot="append"
                  icon="el-icon-third-guide"
                ></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>

        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="项目概况" class="title_class">
              <el-divider></el-divider>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="项目名称" prop="projectName">
              <el-input
                v-model="form.variables.projectName"
                :disabled="!isformdisabled"
                placeholder="请输入项目名称"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目类型" prop="projectType1">
              <el-select
                v-model="form.variables.projectType1"
                :disabled="!isformdisabled"
                clearable
                placeholder="请选择项目类型"
                style="width:100%;"
              >
                <el-option
                  v-for="item in formProjectTypeList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="建设单位" prop="construction">
              <el-input
                v-model="form.variables.construction"
                :disabled="!isformdisabled"
                placeholder="请输入建设单位"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同金额（元）" prop="projectAmount">
              <template>
                <el-input-number
                  v-model="form.variables.projectAmount"
                  :precision="2"
                  :step="1"
                  :min="0"
                  :max="9999999999.99"
                  placeholder="请输入合同金额"
                  style="width:100%;"
                  :disabled="!isformdisabled"
                ></el-input-number>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="履约保证金（元）" prop="lvyuebaozhengjin">
              <template>
                <el-input-number
                  v-model="form.variables.lvyuebaozhengjin"
                  :precision="2"
                  :step="1"
                  :min="0"
                  :max="9999999999.99"
                  placeholder="请输入履约保证金"
                  style="width:100%;"
                  :disabled="!isformdisabled"
                ></el-input-number>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票税点" prop="shuidian">
              <el-select
                v-model="form.variables.shuidian"
                :disabled="!isformdisabled"
                clearable
                placeholder="请选择开票税点"
                style="width:100%;"
              >
                <el-option
                  v-for="item in formTaxPointList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;" v-if="isShowTaxExplain">
          <el-col :span="24">
            <el-form-item label="开票税点说明" prop="kaipiaoshuoming">
              <el-input
                v-model="form.variables.kaipiaoshuoming"
                type="textarea"
                :rows="2"
                :disabled="!isformdisabled"
                placeholder="请输入备注"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="工程工期（天）" prop="gongchenggongqi">
              <template>
                <el-input-number
                  v-model="form.variables.gongchenggongqi"
                  step-strictly
                  :step="1"
                  :min="0"
                  :max="50"
                  placeholder="请输入工程工期"
                  style="width:100%;"
                  :disabled="!isformdisabled"
                ></el-input-number>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划开工时间" prop="planStarttime">
              <el-date-picker
                v-model="form.variables.planStarttime"
                type="date"
                placeholder="选择计划开工时间"
                align="right"
                value-format="yyyy-MM-dd"
                style="width:100%;"
                :picker-options="pickerOptions"
                :disabled="!isformdisabled"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="项目地点" prop="shi">
              <el-cascader
                v-model="siteShiArr"
                :options="formRegionList"
                :props="{ checkStrictly: true }"
                clearable
                style="width:100%;"
                placeholder="请选择项目地点"
                @change="handleRegionChange"
                :disabled="!isformdisabled"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="质保年限（年）" prop="gongchenggongqi">
              <template>
                <el-input-number
                  v-model="form.variables.gongchenggongqi"
                  step-strictly
                  :step="1"
                  :min="0"
                  :max="50"
                  placeholder="请输入质保年限"
                  style="width:100%;"
                  :disabled="!isformdisabled"
                ></el-input-number>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="营销人员" prop="yingxiaorenyuan">
              <el-input
                v-model="traininguserName"
                placeholder="请选择营销人员"
                style="width:100%;"
                :disabled="!isformdisabled"
                @focus="dialogName = 'participantsDialog'"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="备注" prop="memo">
              <el-input
                v-model="form.variables.memo"
                type="textarea"
                :rows="2"
                :disabled="!isformdisabled"
                placeholder="请输入备注"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="附件" prop="fileProject">
              <el-upload
                :before-upload="checkMyFileSize"
                class="upload-demo"
                :disabled="!isformdisabled"
                :headers="uploadHeaders"
                :action="uploadUrl"
                :on-success="handleAvatarSuccessForProject"
                :file-list="fileProjectList"
                :on-remove="handleRemoveForProject"
                :on-preview="downloadFile"
                :data="fileProjectParam"
                style="width:100%;"
                multiple
              >
                <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="成本预算" class="title_class">
              <el-divider></el-divider>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="材料费（元）" prop="cailiaofei">
              <template>
                <el-input-number
                  v-model="form.variables.cailiaofei"
                  :precision="2"
                  :step="1"
                  :min="0"
                  :max="9999999999.99"
                  placeholder="请输入材料费"
                  style="width:100%;"
                  :disabled="!isformdisabled"
                ></el-input-number>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="施工费（元）" prop="shigongfei">
              <template>
                <el-input-number
                  v-model="form.variables.shigongfei"
                  :precision="2"
                  :step="1"
                  :min="0"
                  :max="9999999999.99"
                  placeholder="请输入施工费"
                  style="width:100%;"
                  :disabled="!isformdisabled"
                ></el-input-number>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="协调费上限（元）" prop="guanlifei">
              <el-input
                v-model="form.variables.guanlifei"
                placeholder="系统自动计算"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他费用（元）" prop="othercost">
              <template>
                <el-input-number
                  v-model="form.variables.othercost"
                  :precision="2"
                  :step="1"
                  :min="0"
                  :max="9999999999.99"
                  placeholder="请输入其他费用"
                  style="width:100%;"
                  :disabled="!isformdisabled"
                ></el-input-number>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="其他费用说明" prop="fukuanfangshi">
              <el-input
                v-model="form.variables.fukuanfangshi"
                type="textarea"
                :rows="2"
                :disabled="!isformdisabled"
                placeholder="请输入其他费用说明"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="项目成本（元）" prop="zongchengben">
              <el-input
                v-model="form.variables.zongchengben"
                placeholder="系统自动计算"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="材料费明细" prop="fileMaterialCost">
              <el-upload
                :before-upload="checkMyFileSize"
                class="upload-demo"
                :disabled="!isformdisabled"
                :headers="uploadHeaders"
                :action="uploadUrl"
                :on-success="handleAvatarSuccessForMaterialCost"
                :file-list="fileMaterialCostList"
                :on-remove="handleRemoveForMaterialCost"
                :on-preview="downloadFile"
                :data="fileMaterialCostParam"
                style="width:100%;"
                multiple
              >
                <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="施工费明细" prop="fileConstructionCost">
              <el-upload
                :before-upload="checkMyFileSize"
                class="upload-demo"
                :disabled="!isformdisabled"
                :headers="uploadHeaders"
                :action="uploadUrl"
                :on-success="handleAvatarSuccessForConstructionCost"
                :file-list="fileConstructionCostList"
                :on-remove="handleRemoveForConstructionCost"
                :on-preview="downloadFile"
                :data="fileConstructionCostParam"
                style="width:100%;"
                multiple
              >
                <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="备注" prop="chengbenbeizhu">
              <el-input
                v-model="form.variables.chengbenbeizhu"
                type="textarea"
                :rows="2"
                :disabled="!isformdisabled"
                placeholder="请输入备注"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="附件" prop="fileCost">
              <el-upload
                :before-upload="checkMyFileSize"
                class="upload-demo"
                :disabled="!isformdisabled"
                :headers="uploadHeaders"
                :action="uploadUrl"
                :on-success="handleAvatarSuccessForCost"
                :file-list="fileCostList"
                :on-remove="handleRemoveForCost"
                :on-preview="downloadFile"
                :data="fileCostParam"
                style="width:100%;"
                multiple
              >
                <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="项目毛利润" class="title_class">
              <el-divider></el-divider>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="毛利润（元）" prop="profit">
              <el-input
                v-model="form.variables.profit"
                placeholder="系统自动计算"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="毛利润率(%)" prop="estimatedProfitMargin">
              <el-input
                v-model="form.variables.estimatedProfitMargin"
                placeholder="系统自动计算"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="备注" prop="lirunbeizhu">
              <el-input
                v-model="form.variables.lirunbeizhu"
                type="textarea"
                :rows="2"
                :disabled="!isformdisabled"
                placeholder="请输入备注"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="附件" prop="fileProfit">
              <el-upload
                :before-upload="checkMyFileSize"
                class="upload-demo"
                :disabled="!isformdisabled"
                :headers="uploadHeaders"
                :action="uploadUrl"
                :on-success="handleAvatarSuccessForProfit"
                :file-list="fileProfitList"
                :on-remove="handleRemoveForProfit"
                :on-preview="downloadFile"
                :data="fileProfitParam"
                style="width:100%;"
                multiple
              >
                <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="风险评估" class="title_class">
              <el-divider></el-divider>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="投资方信誉" prop="xinyu">
              <el-select
                v-model="form.variables.xinyu"
                :disabled="!isformdisabled"
                clearable
                placeholder="请选择投资方信誉"
                style="width:100%;"
              >
                <el-option
                  v-for="item in formCreditList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交付能力评估" prop="jiaofunenglipinggu">
              <el-select
                v-model="form.variables.jiaofunenglipinggu"
                :disabled="!isformdisabled"
                clearable
                placeholder="请选择交付能力评估"
                style="width:100%;"
              >
                <el-option
                  v-for="item in formPayList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="12">
            <el-form-item label="技术支撑评估" prop="zhichengpinggu">
              <el-select
                v-model="form.variables.zhichengpinggu"
                :disabled="!isformdisabled"
                clearable
                placeholder="请选择技术支撑评估"
                style="width:100%;"
              >
                <el-option
                  v-for="item in formTechList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资金垫付情况" prop="zijindianfushuoming">
              <el-select
                v-model="form.variables.zijindianfushuoming"
                :disabled="!isformdisabled"
                clearable
                placeholder="请选择资金垫付情况"
                style="width:100%;"
              >
                <el-option
                  v-for="item in formFundAdvanceList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="付款方式说明" prop="fukuantype">
              <el-input
                v-model="form.variables.fukuantype"
                type="textarea"
                :rows="2"
                :disabled="!isformdisabled"
                placeholder="请输入付款方式说明"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="资金来源说明" prop="zijinlaiyuanshuoming">
              <el-select
                v-model="form.variables.zijinlaiyuanshuoming"
                :disabled="!isformdisabled"
                clearable
                placeholder="请选择资金来源说明"
                style="width:100%;"
              >
                <el-option
                  v-for="item in formFundSourceList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="padding:0 10px;">
          <el-col :span="24">
            <el-form-item label="备注" prop="pinggubeizhu">
              <el-input
                v-model="form.variables.pinggubeizhu"
                type="textarea"
                :rows="2"
                :disabled="!isformdisabled"
                placeholder="请输入备注"
                style="width:100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="isformdisabled">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
        <el-button @click="onBeforeClose">取 消</el-button>
      </div>

      <TrackProjectPopup
        v-if="isChooseTrackProject"
        @transferTrackProjectData="getTrackProject"
        req-url="/system/trackproject/list"
      />
      <BidProjectPopup
        v-if="isChooseBidProject"
        @choosedProect="getBidProject"
        req-url="/system/bidproject/list"
      />
      <singleCascader
        v-if="dialogName === 'participantsDialog'"
        @close="finishParticipants"
        :list="treeselectData"
      />
      <singleCascader
        v-if="dialogName === 'manageDialog'"
        @close="finishManageDialog"
        :list="treeselectData"
      />
    </el-dialog>

  </div>
</template>

<script>
  import { update, getInfo } from '@/api/biz/productionProject'
  import { getFileDetailByServiceId } from '@/api/system/file'
  import { formatDate } from '@/utils'
  import { treeselect } from '@/api/system/dept'
  import TrackProjectPopup from '@/components/Popup/TrackProjectPopup'
  import BidProjectPopup from '@/components/Popup/BidProjectPopup'
  import singleCascader from '@/components/Process/components/nodePanel/property/singleCascader'

  export default {
    name: 'productionProjectEditForm',
    components: { TrackProjectPopup, BidProjectPopup, singleCascader },
    props: {
      dataid: {
        type: String,
        default: ''
      },
      isshow: {
        type: Boolean,
        default: false
      },
      isformdisabled: {
        type: Boolean,
        default: true
      }
    },
    data() {
      var validatePlanStratTime = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请选择计划开工时间'))
        } else {
          var createTime = this.form.variables.createTime
          if (new Date(createTime) > new Date(value)) {
            callback(new Error('计划开工时间不能小于立项时间'))
          } else {
            callback()
          }

        }
      }
      return {
        isShowTaxExplain: false,
        treeselectData: [],
        traininguserName: '',
        dialogName: '',
        isChooseTrackProject: false,
        isChooseBidProject: false,
        siteShiArr: [],
        fileProjectIds: '',
        fileProjectList: [],
        fileProjectParam: {
          fieldName: 'project',
          tableName: 'pms_production_project'
        },
        fileMaterialCostIds: '',
        fileMaterialCostList: [],
        fileMaterialCostParam: {
          fieldName: 'materialCost',
          tableName: 'pms_production_project'
        },
        fileConstructionCostIds: '',
        fileConstructionCostList: [],
        fileConstructionCostParam: {
          fieldName: 'constructionCost',
          tableName: 'pms_production_project'
        },
        fileCostIds: '',
        fileCostList: [],
        fileCostParam: {
          fieldName: 'cost',
          tableName: 'pms_production_project'
        },
        fileProfitIds: '',
        fileProfitList: [],
        fileProfitParam: {
          fieldName: 'profit',
          tableName: 'pms_production_project'
        },

        formUserName: '',
        formDeptName: '',
        form: {
          variables: {
            fujian: '',
            cailiaofei: 0,
            shigongfei: 0,
            guanlifei: 0,
            othercost: 0,
            zongchengben: 0,
            projectAmount: 0,
            profit: 0
          },
          // 必传值
          formTableName: '',
          formType: '',
          id: 0,
          formId: 0
        },
        isUpdate: false,
        completeData: {
          comment: '退回重新审批',
          defaultTaskShow: true,
          delegateTaskShow: false,
          deployId: null,
          instanceId: '',
          multiple: false,
          procInsId: '',
          returnTaskShow: false,
          sendUserShow: true,
          targetKey: '',
          taskId: '',
          values: {},
          vars: ''
        },
        pickerOptions: {
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date())
              }
            },
            {
              text: '昨天',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            },
            {
              text: '一周前',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              }
            }
          ]
        },
        formProjectBasisList: [],
        formPayList: [],
        formProjectTypeList: [],
        formFundAdvanceList: [],
        formFundSourceList: [],
        formCreditList: [],
        formTechList: [],
        formRegionList: [],
        formTaxPointList: [],
        usersList: [],
        uploadHeaders: {
          Authorization: ''
        },
        uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
        rules: {
          lixiangrenzheng: [
            { required: true, message: '请选择立项依据', trigger: 'blur' }
          ],
          projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          projectType1: [
            { required: true, message: '请选择项目类型', trigger: 'blur' }
          ],
          construction: [
            { required: true, message: '请输入建设单位', trigger: 'blur' }
          ],
          projectAmount: [
            { required: true, message: '请输入合同金额', trigger: 'blur' }
          ],
          lvyuebaozhengjin: [
            { required: true, message: '请输入履约保证金', trigger: 'blur' }
          ],
          shuidian: [
            { required: true, message: '请选择开票税点', trigger: 'blur' }
          ],
          gongchenggongqi: [
            { required: true, message: '请输入工程工期', trigger: 'blur' }
          ],
          planStarttime: [
            { required: true, message: '请选择计划开工时间', trigger: 'blur' },
            { validator: validatePlanStratTime, trigger: 'blur' }
          ],
          shi: [
            { required: true, message: '请选择项目地点', trigger: 'blur' }
          ],
          zhibaonianxian: [
            { required: true, message: '请输入质保年限', trigger: 'blur' }
          ],
          yingxiaorenyuan: [
            { required: true, message: '请选择营销人员', trigger: 'change' }
          ],
          cailiaofei: [
            { required: true, message: '请输入材料费', trigger: 'blur' }
          ],
          shigongfei: [
            { required: true, message: '请输入施工费', trigger: 'blur' }
          ],
          othercost: [
            { required: true, message: '请输入其他费用', trigger: 'blur' }
          ],
          fukuanfangshi: [
            { required: true, message: '请输入其他费用说明', trigger: 'blur' }
          ],
          fileMaterialCost: [
            { required: true, message: '请上传材料费明细', trigger: 'change' }
          ],
          fileConstructionCost: [
            { required: true, message: '请上传施工费明细', trigger: 'change' }
          ],
          xinyu: [
            { required: true, message: '请选择投资方信誉', trigger: 'blur' }
          ],
          jiaofunenglipinggu: [
            { required: true, message: '请选择交付能力评估', trigger: 'blur' }
          ],
          zhichengpinggu: [
            { required: true, message: '请选择技术支撑评估', trigger: 'blur' }
          ],
          zijindianfushuoming: [
            { required: true, message: '请选择资金垫付情况', trigger: 'blur' }
          ],
          fukuantype: [
            { required: true, message: '请输入付款方式说明', trigger: 'blur' }
          ],
          zijinlaiyuanshuoming: [
            { required: true, message: '请选择资金来源说明', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      // 立项依据
      this.getDicts('project_basis').then((res) => {
        this.formProjectBasisList = res.data
      })
      // 项目类型
      this.getDicts('project_type').then((res) => {
        this.formProjectTypeList = res.data
      })
      // 税点
      this.getDicts('tax_point').then((res) => {
        this.formTaxPointList = res.data
      })
      // 项目地点
      this.getRegionTree().then((res) => {
        this.formRegionList = res.data
      })
      // 投资方信誉
      this.getDicts('investor_reputation').then((res) => {
        this.formCreditList = res.data
      })
      // 交付能力评估
      this.getDicts('pay_capability').then((res) => {
        this.formPayList = res.data
      })
      // 技术支撑评估
      this.getDicts('tech_assessment').then((res) => {
        this.formTechList = res.data
      })
      // 资金垫付情况
      this.getDicts('fund_advance').then((res) => {
        this.formFundAdvanceList = res.data
      })
      // 资金来源说明
      this.getDicts('fund_source').then((res) => {
        this.formFundSourceList = res.data
      })
      this.gettreeselect()
    },
    methods: {
      fillFormData(id) {
        getInfo(id).then((res) => {
          this.form.variables = res.data
          this.siteShiArr = this.form.variables.shi.split(',')
          this.getUserAll().then((res) => {
            this.traininguserName = this.selectUserNameByUserId(res, this.form.variables.yingxiaorenyuan)
          })
          this.getFileDetailByServiceId(id)
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
        })
      },
      gettreeselect() {
        treeselect().then((res) => {
          this.treeselectData = res.data.map((item) => {
            item.value = item.id
            return item
          })
        })
      },
      finishParticipants(check) {
        this.dialogName = ''
        this.form.variables.yingxiaorenyuan = check.userId
        this.traininguserName = check.nickName
      },
      finishManageDialog(check) {
        this.dialogName = ''
        this.form.variables.createUserId = check.userId
        this.form.variables.createUserName = check.nickName
        this.form.variables.createDeptId = check.deptId
        this.form.variables.createDeptName = check.dept.deptName
        this.formUserName = check.nickName
        this.formDeptName = check.dept.deptName
      },
      chooseTrackProject() {
        this.isChooseTrackProject = true
      },
      getTrackProject(row) {
        if (row) {
          this.form.variables.yxnum = row.numbers
        }
        this.isChooseTrackProject = false
      },
      chooseBidProject() {
        this.isChooseBidProject = true
      },
      getBidProject(row) {
        if (row) {
          this.form.variables.toubiaono = row.num
        }
        this.isChooseBidProject = false
      },
      handleRegionChange(value) {
        this.form.variables.shi = this.siteShiArr.join(',')
      },
      downloadFile({ url }) {
        window.open(url)
      },
      handleAvatarSuccessForMaterialCost({ data }, file, fileList) {
        this.fileMaterialCostIds = this.fileMaterialCostIds == null ? '' : this.fileMaterialCostIds
 this.fileMaterialCostIds += `;${data[0].fileId}`
        this.rules.fileMaterialCost = []
        this.$refs.form.clearValidate('fileMaterialCost')
      },
      handleAvatarSuccessForConstructionCost({ data }, file, fileList) {
        this.fileConstructionCostIds = this.fileConstructionCostIds == null ? '' : this.fileConstructionCostIds
 this.fileConstructionCostIds += `;${data[0].fileId}`
        this.rules.fileConstructionCost = []
        this.$refs.form.clearValidate('fileConstructionCost')
      },
      handleAvatarSuccessForProject({ data }, file, fileList) {
        this.fileProjectIds = this.fileProjectIds == null ? '' : this.fileProjectIds
 this.fileProjectIds += `;${data[0].fileId}`
      },
      handleAvatarSuccessForCost({ data }, file, fileList) {
        this.fileCostIds = this.fileCostIds == null ? '' : this.fileCostIds
 this.fileCostIds += `;${data[0].fileId}`
      },
      handleAvatarSuccessForProfit({ data }, file, fileList) {
        this.fileProfitIds = this.fileProfitIds == null ? '' : this.fileProfitIds
 this.fileProfitIds += `;${data[0].fileId}`
      },
      onBeforeClose() {
        this.$emit('onBeforeClose')
      },
      onSubmit() {
        this.$refs['form'].validate(async(valid) => {
          if (valid) {
            this.form.variables.fujian =
              this.fileProjectIds +
              this.fileMaterialCostIds +
              this.fileConstructionCostIds +
              this.fileCostIds +
              this.fileProfitIds
            const { code, data } = await update({
              ...this.form.variables
            })
            if (code == 200) {
              this.form.id = data
              if (code == 200) {
                this.msgSuccess('操作成功')
                this.$emit('onBeforeClose')
                this.$parent.getList()
              }
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      goBack() {
        // 关闭当前标签页并返回上个页面
        this.$store.dispatch('tagsView/delView', this.$route)
        this.$router.go(-1)
      localStorage.setItem("needLoadList","yes")
      },
      async getFileDetailByServiceId(id) {
        const { code, data, msg } = await getFileDetailByServiceId(id)
        if (code == 200) {
          data.map((item) => {
            if (item.fieldName == 'project') {
              this.fileProjectList.push({
                name: item.fileName,
                url: item.savePath,
                id: item.id
              })
              this.fileProjectIds += item.id + ';'
            } else if (item.fieldName == 'materialCost') {
              this.fileMaterialCostList.push({
                name: item.fileName,
                url: item.savePath,
                id: item.id
              })
              this.rules.fileMaterialCost = []
              this.$refs.form.clearValidate('fileMaterialCost')
              this.fileMaterialCostIds += item.id + ';'
            } else if (item.fieldName == 'constructionCost') {
              this.fileConstructionCostList.push({
                name: item.fileName,
                url: item.savePath,
                id: item.id
              })
              this.rules.fileConstructionCost = []
              this.$refs.form.clearValidate('fileConstructionCost')
              this.fileConstructionCostIds += item.id + ';'
            } else if (item.fieldName == 'cost') {
              this.fileCostList.push({
                name: item.fileName,
                url: item.savePath,
                id: item.id
              })
              this.fileCostIds += item.id + ';'
            } else if (item.fieldName == 'profit') {
              this.fileProfitList.push({
                name: item.fileName,
                url: item.savePath,
                id: item.id
              })
              this.fileProfitIds += item.id + ';'
            }
          })
        }
      },
      handleRemoveForMaterialCost(file, fileList) {
        let idArr
        if (this.form.variables.id) {
          idArr = fileList.map((item) => item.id)
        } else {
          idArr = fileList.map((item) => item.response.data[0].fileId)
        }
        this.fileMaterialCostIds = idArr.join(';')
        if (idArr.length == 0) {
          this.rules.fileMaterialCost = [
            { required: true, message: '请上传材料费明细', trigger: 'change' }
          ]
        }
      },
      handleRemoveForConstructionCost(file, fileList) {
        let idArr
        if (this.form.variables.id) {
          idArr = fileList.map((item) => item.id)
        } else {
          idArr = fileList.map((item) => item.response.data[0].fileId)
        }
        this.fileConstructionCostIds = idArr.join(';')
        if (idArr.length == 0) {
          this.rules.fileConstructionCost = [
            { required: true, message: '请上传施工费明细', trigger: 'change' }
          ]
        }
      },
      handleRemoveForProject(file, fileList) {
        let idArr
        if (this.form.variables.id) {
          idArr = fileList.map((item) => item.id)
        } else {
          idArr = fileList.map((item) => item.response.data[0].fileId)
        }
        this.fileProjectIds = idArr.join(';')
      },
      handleRemoveForCost(file, fileList) {
        let idArr
        if (this.form.variables.id) {
          idArr = fileList.map((item) => item.id)
        } else {
          idArr = fileList.map((item) => item.response.data[0].fileId)
        }
        this.fileCostIds = idArr.join(';')
      },
      handleRemoveForProfit(file, fileList) {
        let idArr
        if (this.form.variables.id) {
          idArr = fileList.map((item) => item.id)
        } else {
          idArr = fileList.map((item) => item.response.data[0].fileId)
        }
        this.fileProfitIds = idArr.join(';')
      }

    },
    watch: {
      dataid: {
        handler(val) {
          this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
          if (val) {
            this.fillFormData(val)
          } else {
            const currentUser = this.$store.getters.user
            this.formUserName = currentUser.nickName
            this.formDeptName = currentUser.dept.deptName
            this.form.variables.createTime = formatDate(new Date().getTime())
          }
        },
        immediate: true
      },
      form: {
        handler(val) {
          //是否营销立项
          if (val.variables.shuidian == '0') {
            this.isShowTaxExplain = true
          } else {
            this.isShowTaxExplain = false
          }
        },
        deep: true
      }

    },
    computed: {
      computeTotalCost: function() {
        let materialCost =
          this.form.variables.cailiaofei == null
            ? 0
            : this.form.variables.cailiaofei
        let constructionCost =
          this.form.variables.shigongfei == null
            ? 0
            : this.form.variables.shigongfei
        let coordinationCost =
          this.form.variables.guanlifei == null
            ? 0
            : this.form.variables.guanlifei
        let otherCost =
          this.form.variables.othercost == null
            ? 0
            : this.form.variables.othercost
        let totalCost = parseFloat(
          materialCost + constructionCost + coordinationCost + otherCost
        ).toFixed(2)
        this.form.variables.zongchengben = totalCost
        return totalCost
      },
      computeGrossProfit: function() {
        let contractMoney =
          this.form.variables.projectAmount == null
            ? 0
            : this.form.variables.projectAmount
        let totalCost =
          this.form.variables.zongchengben == null
            ? 0
            : this.form.variables.zongchengben
        let grossProfit = parseFloat(contractMoney - totalCost).toFixed(2)
        this.form.variables.profit = grossProfit
        return grossProfit
      },
      computeGrossMargin: function() {
        let contractMoney =
          this.form.variables.projectAmount == null
            ? 0
            : this.form.variables.projectAmount
        if (contractMoney == 0) {
          return 0
        } else {
          let grossProfit =
            this.form.variables.profit == null
              ? 0
              : this.form.variables.profit
          let grossMargin = parseFloat((grossProfit / contractMoney) * 100).toFixed(2)
          this.form.variables.estimatedProfitMargin = grossMargin
          return grossMargin
        }
      },
      computeCoordinationCost: function() {
        let contractMoney =
          this.form.variables.projectAmount == null
            ? 0
            : this.form.variables.projectAmount
        let projectType = this.form.variables.projectType1
        let coordinationCost = 0
        if (projectType == '1') {
          //通信
          coordinationCost = contractMoney * 1 / 100
          if (coordinationCost > 20000) {
            coordinationCost = 20000
          } else if (coordinationCost < 3000) {
            coordinationCost = 3000
          }
        } else if (projectType == '2') {
          //市政
          coordinationCost = contractMoney * 1.5 / 100
          if (coordinationCost > 30000) {
            coordinationCost = 30000
          } else if (coordinationCost < 4000) {
            coordinationCost = 4000
          }
        } else if (projectType == '3') {
          //集成
          coordinationCost = contractMoney * 1.2 / 100
          if (coordinationCost > 25000) {
            coordinationCost = 25000
          } else if (coordinationCost < 3500) {
            coordinationCost = 3500
          }
        }
        this.form.variables.guanlifei = coordinationCost
        return coordinationCost
      }
    }
  }
</script>
<style scoped lang="scss">
  .my-col {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &:last-child {
      margin-bottom: 0;
    }

    .el-form-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
