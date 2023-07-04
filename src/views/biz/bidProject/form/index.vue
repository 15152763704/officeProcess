<!--
 * @Author: chad
 * @Date: 2021-10-26 09:02:48
 * @LastEditTime: 2021-11-18 10:38:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jshxpms-vue\src\views\flowable\formView\test.vue
-->
<template>
  <el-form
    ref="form"
    :model="form.variables"
    :rules="rules"
    label-width="120px"
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
        <el-form-item label="申请人" prop="username">
          <el-input v-model="formUserName" disabled placeholder="请输入申请人" style="width:100%;"/>
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
            disabled
            style="width:100%;"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="立项编号" prop="num">
          <el-input v-model="form.variables.num" disabled placeholder="系统自动生成" style="width:100%;"/>
        </el-form-item>
      </el-col>
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
        <el-form-item label="项目名称" prop="projectname">
          <el-input
            v-model="form.variables.projectname"
            :disabled="!isformdisabled"
            placeholder="请输入项目名称"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目类型" prop="leixing">
          <el-select
            v-model="form.variables.leixing"
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
        <el-form-item label="是否营销立项" prop="yesno">
          <el-select
            v-model="form.variables.yesno"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择是否营销立项"
            style="width:100%;"
          >
            <el-option
              v-for="item in formYesNoList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 选择是否营销立项触发隐藏显示 -->
    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowTrackProject">
      <el-col :span="12">
        <el-form-item label="营销立项编号" prop="yingxiaobianhao" v-on:click.native="isformdisabled && chooseTrackPorject()">
          <el-input v-model="form.variables.yingxiaobianhao" disabled placeholder="请选择营销立项" style="width:100%;">
            <el-button
              @click="chooseTrackPorject"
              slot="append"
              icon="el-icon-third-guide"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="营销员" prop="yingxiaoyuan">
          <el-input
            v-model="form.variables.yingxiaoyuan"
            disabled
            placeholder="系统自动带入"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowTrackProject">
      <el-col :span="12">
        <el-form-item label="建设(投资)方" prop="touzifang">
          <el-input
            v-model="form.variables.touzifang"
            disabled
            placeholder="系统自动带入"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="投资性质" prop="touzixingzhi">
          <el-input
            v-model="form.variables.touzixingzhi"
            disabled
            placeholder="系统自动带入"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowTrackProject">
      <el-col :span="12">
        <el-form-item label="投资方信誉" prop="touzixinyu">
          <el-input
            v-model="form.variables.touzixinyu"
            disabled
            placeholder="系统自动带入"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="技术支持评估" prop="jishuzhicheng">
          <el-input
            v-model="form.variables.jishuzhicheng"
            disabled
            placeholder="系统自动带入"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="资质用章" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="用章类型" prop="sealType">
            <el-checkbox-group
              v-model="printingShowList"
              :disabled="!isformdisabled"
              style="width:100%;"
              @change="printingChange"
              ref="printingCheck"
            >
              <el-checkbox
                v-for="item in formSealTypeList"
                :key="item.dictValue"
                :label="item.dictValue"
              >{{item.dictLabel}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="资质所属公司" prop="companyName">
          <el-select
            v-model="form.variables.companyName"
            clearable
            placeholder="请选择资质所属公司"
            style="width:100%;"
            :disabled="!isformdisabled"
            @change="companyChange"
          >
            <el-option
              v-for="item in formCompanyNameList"
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
        <el-form-item label="公司资质" prop="companyQualification">
            <el-select
              v-model="companyQualificationList"
              :disabled="!isformdisabled"
              clearable
              multiple
              placeholder="请选择公司资质"
              style="width:100%;"
              @change="companyQualificationChange"
            >
              <el-option
                v-for="item in CompanySelectList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="个人资质" prop="personalQualification">
          <el-select
            v-model="personalQualificationList"
            :disabled="!isformdisabled"
            clearable
            multiple
            placeholder="请选择个人资质"
            style="width:100%;"
            @change="personalQualificationChange"
          >
            <el-option
              v-for="item in personalSelectList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>



    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="招标概况" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>


    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="标底预算(元)" prop="xiangmubiaodi">
          <template>
            <el-input-number
              v-model="form.variables.xiangmubiaodi"
              :precision="2"
              :step="1"
              :min="0"
              :max="9999999999.99"
              placeholder="请输入标底预算"
              style="width:100%;"
              :disabled="!isformdisabled"
            ></el-input-number>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="中标方式" prop="zhongbiaofangshi">
          <el-select
            v-model="form.variables.zhongbiaofangshi"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择中标方式"
            style="width:100%;"
          >
            <el-option
              v-for="item in formBidMethodList"
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
        <el-form-item label="备注说明" prop="beizhuxize">
          <el-input
            v-model="form.variables.beizhuxize"
            type="textarea"
            :rows="2"
            :disabled="!isformdisabled"
            placeholder="请输入备注说明"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="招标代理" prop="zhaobiaodaili">
          <el-input
            v-model="form.variables.zhaobiaodaili"
            :disabled="!isformdisabled"
            placeholder="请输入招标代理"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="投标保证金(元)" prop="baozhengjin">
          <template>
            <el-input-number
              v-model="form.variables.baozhengjin"
              :precision="2"
              :step="1"
              :min="0"
              :max="9999999999.99"
              placeholder="请输入投标保证金"
              style="width:100%;"
              :disabled="!isformdisabled"
            ></el-input-number>
          </template>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="投标日期" prop="toubiaoriqi">
          <el-date-picker
            v-model="form.variables.toubiaoriqi"
            type="date"
            placeholder="选择投标日期"
            align="right"
            value-format="yyyy-MM-dd"
            style="width:100%;"
            :picker-options="pickerOptions"
            :disabled="!isformdisabled"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="投标地点" prop="site">
          <el-input
            v-model="form.variables.site"
            :disabled="!isformdisabled"
            placeholder="请输入投标地点"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="标书费(元)" prop="bidCost">
          <template>
            <el-input-number
              v-model="form.variables.bidCost"
              :precision="2"
              :step="1"
              :min="0"
              :max="9999999999.99"
              placeholder="请输入标书费"
              style="width:100%;"
              :disabled="!isformdisabled"
            ></el-input-number>
          </template>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注" prop="beizhu">
          <el-input
            v-model="form.variables.beizhu"
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
        <el-form-item label="合同条款" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="工期(天)" prop="gongqi">
          <template>
            <el-input-number
              v-model="form.variables.gongqi"
              step-strictly
              :step="1"
              :min="0"
              placeholder="请输入工期"
              style="width:100%;"
              :disabled="!isformdisabled"
            ></el-input-number>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="税点" prop="kaipiaoshuidian">
          <el-select
            v-model="form.variables.kaipiaoshuidian"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择税点"
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

    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="12">
        <el-form-item label="履约保证金(元)" prop="lvyuebaozhengjin">
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
        <el-form-item label="质保年限(年)" prop="zhibaonianxian">
          <template>
            <el-input-number
              v-model="form.variables.zhibaonianxian"
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
      <el-col :span="24">
        <el-form-item label="付款方式" prop="fukuanfangshi">
          <el-input
            v-model="form.variables.fukuanfangshi"
            :disabled="!isformdisabled"
            placeholder="请输入付款方式"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;">
      <el-col :span="24">
        <el-form-item label="备注" prop="hetongbeizhu">
          <el-input
            v-model="form.variables.hetongbeizhu"
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
        <el-form-item label="有无预出成本" prop="sfyuchu">
          <el-select
            v-model="form.variables.sfyuchu"
            :disabled="!isformdisabled"
            clearable
            placeholder="请选择有无预出成本"
            style="width:100%;"
          >
            <el-option
              v-for="item in formHaveAdvanceCoseList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowAdvanceCost">
      <el-col :span="24">
        <el-form-item label="成本及报价" class="title_class">
          <el-divider></el-divider>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowAdvanceCost">
      <el-col :span="24">
        <el-form-item label="材料费(元)" prop="cailiaochengben">
          <template>
            <el-input-number
              v-model="form.variables.cailiaochengben"
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
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowAdvanceCost">
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
    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowAdvanceCost">
      <el-col :span="24">
        <el-form-item label="施工费(元)" prop="shigongchengben">
          <template>
            <el-input-number
              v-model="form.variables.shigongchengben"
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
    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowAdvanceCost">
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
    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowAdvanceCost">
      <el-col :span="24">
        <el-form-item label="其他费用(元)" prop="qitafeiyong">
          <template>
            <el-input-number
              v-model="form.variables.qitafeiyong"
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
    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowAdvanceCost">
      <el-col :span="24">
        <el-form-item label="其他费用说明" prop="qitashuoming">
          <el-input
            v-model="form.variables.qitashuoming"
            type="textarea"
            :rows="2"
            :disabled="!isformdisabled"
            placeholder="请输入其他费用说明"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowAdvanceCost">
      <el-col :span="12">
        <el-form-item label="合计成本(元)" prop="hejichengben">
          <el-input v-model="computeTotalCost" disabled placeholder="系统自动计算" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="参考报价(20%)" prop="nibaojia">
          <el-input
            v-model="computeRefQuotation"
            disabled
            placeholder="系统自动计算"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowAdvanceCost">
      <el-col :span="12">
        <el-form-item label="拟报价(元)" prop="nibaojia2">
          <template>
            <el-input-number
              v-model="form.variables.nibaojia2"
              :precision="2"
              :step="1"
              :min="0"
              :max="9999999999.99"
              placeholder="请输入拟报价"
              style="width:100%;"
              :disabled="!isformdisabled"
            ></el-input-number>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="毛利润(元)" prop="maolirun">
          <el-input v-model="computeGrossProfit" disabled placeholder="系统自动计算" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowAdvanceCost">
      <el-col :span="12">
        <el-form-item label="毛利率(%)" prop="maolilv">
          <el-input v-model="computeGrossMargin" disabled placeholder="系统自动计算" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowAdvanceCost">
      <el-col :span="24">
        <el-form-item label="报价清单" prop="fileQuotation">
          <el-upload
            :before-upload="checkMyFileSize"
            class="upload-demo"
            :disabled="!isformdisabled"
            :headers="uploadHeaders"
            :action="uploadUrl"
            :on-success="handleAvatarSuccessForQuotation"
            :file-list="fileQuotationList"
            :on-remove="handleRemoveForQuotation"
            :on-preview="downloadFile"
            :data="fileQuotationParam"
            style="width:100%;"
            multiple
          >
            <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowAdvanceCost">
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
    <el-row :gutter="4" style="padding:0 10px;" v-if="isShowAdvanceCost">
      <el-col :span="24">
        <el-form-item label="附件" prop="fileOther">
          <el-upload
            :before-upload="checkMyFileSize"
            class="upload-demo"
            :disabled="!isformdisabled"
            :headers="uploadHeaders"
            :action="uploadUrl"
            :on-success="handleAvatarSuccessForOther"
            :file-list="fileQuotationList"
            :on-remove="handleRemoveForOther"
            :on-preview="downloadFile"
            :data="fileOtherParam"
            style="width:100%;"
            multiple
          >
            <el-button size="small" type="primary" v-if="isformdisabled">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <el-row :gutter="4" style="padding:0 10px;" v-if="isChoose">
      <el-col :span="24">
        <TrackProjectPopup req-url="/system/trackproject/list" @transferTrackProjectData="getTrackProject"/>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { save } from '@/api/biz/bidProject'
import { definitionStart } from '@/api/flowable/definition'
import { complete } from '@/api/flowable/process'
import { getFileDetail } from '@/api/system/file'
import { formatDate } from '@/utils'
import { getCompanyListByCompanyId } from '@/api/biz/qyzizhixiangqing'
import { getGrzizhiByCompanyId } from '@/api/biz/grzizhixiangqing'
import TrackProjectPopup from '@/components/Popup/TrackProjectPopup'

export default {
  components: { TrackProjectPopup },
  props: {
    proData: {
      type: String,
      default: () => {
        return ''
      }
    },
    local_val: {
      type: Object,
      default: {}
    },
    isformdisabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isChoose: false,
      isShowTrackProject: false,
      isShowAdvanceCost: false,
      siteShiArr: [],
      fileMaterialCostIds: '',
      fileMaterialCostList: [],
      fileMaterialCostParam: {
        fieldName: 'materialCost',
        tableName: 'pms_bid_project'
      },
      fileConstructionCostIds: '',
      fileConstructionCostList: [],
      fileConstructionCostParam: {
        fieldName: 'constructionCost',
        tableName: 'pms_bid_project'
      },
      fileQuotationIds: '',
      fileQuotationList: [],
      fileQuotationParam: {
        fieldName: 'quotation',
        tableName: 'pms_bid_project'
      },
      fileOtherIds: '',
      fileOtherList: [],
      fileOtherParam: {
        fieldName: 'other',
        tableName: 'pms_bid_project'
      },

      formUserName: '',
      formDeptName: '',
      form: {
        variables: {
          fujian: '',
          hejichengben: 0,
          nibaojia: 0,
          maolirun: 0,
          yesno: '',
          sfyuchu: '',
          cailiaochengben: 0,
          qitafeiyong: 0,
          nibaojia2: 0,
          shigongchengben: 0
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
      formYesNoList: [],
      formProjectTypeList: [],
      formBidMethodList: [],
      formRegionList: [],
      formTaxPointList: [],
      formHaveAdvanceCoseList: [],
      formInvestmentList: [],
      formCreditList: [],
      formTechList: [],
      printingShowList: [],
      formSealTypeList: [],
      formCompanyNameList: [],
      CompanySelectList: [],
      personalSelectList: [],
      companyQualificationList: [],
      personalQualificationList: [],
      uploadHeaders: {
        Authorization: ''
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/batchUpload',
      rules: {
        projectname: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        leixing: [
          { required: true, message: '请选择项目类型', trigger: 'blur' }
        ],
        shi: [{ required: true, message: '请选择项目地点', trigger: 'blur' }],
        yesno: [
          { required: true, message: '请选择是否营销立项', trigger: 'blur' }
        ],
        xiangmubiaodi: [
          { required: true, message: '请输入标底预算', trigger: 'blur' }
        ],
        zhongbiaofangshi: [
          { required: true, message: '请选择中标方式', trigger: 'blur' }
        ],
        toubiaoriqi: [
          { required: true, message: '请选择投标日期', trigger: 'blur' }
        ],
        site: [{ required: true, message: '请输入投标地点', trigger: 'blur' }],
        gongqi: [{ required: true, message: '请输入工期', trigger: 'blur' }],
        kaipiaoshuidian: [
          { required: true, message: '请选择税点', trigger: 'blur' }
        ],
        lvyuebaozhengjin: [
          { required: true, message: '请输入履约保证金', trigger: 'blur' }
        ],
        zhibaonianxian: [
          { required: true, message: '请输入质保年限', trigger: 'blur' }
        ],
        fukuanfangshi: [
          { required: true, message: '请输入付款方式', trigger: 'blur' }
        ],
        sfyuchu: [
          { required: true, message: '请选择有无预出成本', trigger: 'blur' }
        ],
        yingxiaobianhao: [
          { required: true, message: '请选择营销立项编号', trigger: 'blur' }
        ],
        sealType: [
          { required: true, message: '请至少选择一个印章类型', trigger: 'blur', },
        ],
        bidCost: [
          { required: true, message: '请输入标书费', trigger: 'blur' }
        ],
        baozhengjin: [
          { required: true, message: '请输入投标保证金', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 是否
    this.getDicts('sys_yes_no').then((res) => {
      this.formYesNoList = res.data
    })
    // 项目类型
    this.getDicts('project_type').then((res) => {
      this.formProjectTypeList = res.data
    })
    // 有无预出成本
    this.getDicts('sys_have').then((res) => {
      this.formHaveAdvanceCoseList = res.data
    })
    // 项目地点
    this.getRegionTree().then((res) => {
      this.formRegionList = res.data
    })
    // 税点
    this.getDicts('tax_point').then((res) => {
      this.formTaxPointList = res.data
    })
    // 中标方式
    this.getDicts('bid_method').then((res) => {
      this.formBidMethodList = res.data
    })
    // 投资性质
    this.getDicts('investment_property').then((res) => {
      this.formInvestmentList = res.data
    })
    // 投资方信誉
    this.getDicts('investor_reputation').then((res) => {
      this.formCreditList = res.data
    })
    // 技术支撑评估
    this.getDicts('tech_assessment').then((res) => {
      this.formTechList = res.data
    })
    // 印章类型
    this.getDicts('form_seal_type').then((res) => {
      this.formSealTypeList = res.data
    })
    // 公司名称
    this.getDicts('form_company_name').then((res) => {
      this.formCompanyNameList = res.data
    })


    // const id = localStorage.getItem('id')
    const id = this.local_val.id
    if (id) {
      this.form.id = id
    }

    // this.form.formId = localStorage.getItem('formId')
    this.form.formId = this.local_val.formId
  },
  methods: {
    chooseTrackPorject() {
      this.isChoose = true
    },
    getTrackProject(row) {
      if (row) {
        this.form.variables.yingxiaobianhao = row.numbers
        this.form.variables.yingxiaoyuan = row.createUserName
        this.form.variables.touzifang = row.jianshedanwei
        this.form.variables.touzixingzhi = this.selectDictLabel(this.formInvestmentList, row.touzixingzhi)
        this.form.variables.touzixinyu = this.selectDictLabel(this.formCreditList, row.xinyu)
        this.form.variables.zijindianfu = row.zijindianfu
        this.form.variables.jishuzhicheng = this.selectDictLabel(this.formTechList, row.jishupinggu)
        this.form.variables.jiaofunengli = row.jiaofupinggu
      }
      this.isChoose = false
    },
    printingChange(arr) {
      this.form.variables.sealType = arr.join(';')
      if (arr.length > 0) {
        this.$refs.form.clearValidate('printingCheck')
      } else {
        this.$refs.form.validateField('sealType')
      }
    },
    companyQualificationChange(arr){
      this.form.variables.companyQualification = arr.join(';')
    },
    personalQualificationChange(arr){
      this.form.variables.personalQualification = arr.join(';')
    },
    async companyChange(companyid) {
      const CompanyList = await getCompanyListByCompanyId(companyid)
      this.CompanySelectList = CompanyList.data
      const GrzizhiList = await getGrzizhiByCompanyId(companyid)
      this.personalSelectList = GrzizhiList.data
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
    },
    handleAvatarSuccessForConstructionCost({ data }, file, fileList) {
      this.fileConstructionCostIds = this.fileConstructionCostIds == null ? '' : this.fileConstructionCostIds
 this.fileConstructionCostIds += `;${data[0].fileId}`
    },
    handleAvatarSuccessForQuotation({ data }, file, fileList) {
      this.fileQuotationIds = this.fileQuotationIds == null ? '' : this.fileQuotationIds
 this.fileQuotationIds += `;${data[0].fileId}`
    },
    handleAvatarSuccessForOther({ data }, file, fileList) {
      this.fileOtherIds = this.fileOtherIds == null ? '' : this.fileOtherIds
 this.fileOtherIds += `;${data[0].fileId}`
    },
    onSubmit() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          // const procInsId = localStorage.getItem('procInsId')
          this.form.variables.fujian =
            this.fileMaterialCostIds +
            this.fileConstructionCostIds +
            this.fileQuotationIds +
            this.fileOtherIds
          let procInsId = this.local_val.procInsId
          if (procInsId != '' && typeof (procInsId) != 'undefined' && procInsId != 'undefined') {
            this.completeData.instanceId = procInsId
            this.completeData.procInsId = procInsId
            // const taskId = localStorage.getItem('taskId')
            const taskId = this.local_val.taskId
            if (taskId) {
              this.completeData.taskId = taskId
            }
            console.log('审批更新逻辑', this.form)
            const updateSealmsg = await save({
              id: this.form.id,
              ...this.form.variables
            })
            if (updateSealmsg.code == 200) {
              const completemsg = await complete(this.completeData)
              if (completemsg.code == 200) {
                this.msgSuccess(completemsg.msg)
                this.goBack()
              }
            }
          } else {
            // this.form.formTableName = localStorage.getItem('formTableName')
            // this.form.formType = localStorage.getItem('formType')
            // let procDefId = localStorage.getItem('procDefId')

            this.form.formTableName = this.local_val.formTableName
            this.form.formType = this.local_val.formType
            let procDefId = this.local_val.procDefId

            console.log('submit!', this.form)
            const { code, data } = await save({
              ...this.form.variables
            })
            if (code == 200) {
              this.form.id = data
              const { code, msg } = await definitionStart(procDefId, this.form)
              if (code == 200) {
                this.msgSuccess(msg)
                this.goBack()
              }
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
    async getFileDetail(id) {
      console.log('id = ' + id)
      const { code, data, msg } = await getFileDetail(id)
      console.log({ code, data, msg })
      if (code == 200) {
        data.map((item) => {
          if (item.fieldName == 'materialCost') {
            this.fileMaterialCostList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id
            })
          } else if (item.fieldName == 'constructionCost') {
            this.fileConstructionCostList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id
            })
          } else if (item.fieldName == 'quotation') {
            this.fileQuotationList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id
            })
          } else if (item.fieldName == 'other') {
            this.fileOtherList.push({
              name: item.fileName,
              url: item.savePath,
              id: item.id
            })
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
    },
    handleRemoveForConstructionCost(file, fileList) {
      let idArr
      if (this.form.variables.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileConstructionCostIds = idArr.join(';')
    },
    handleRemoveForQuotation(file, fileList) {
      let idArr
      if (this.form.variables.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileQuotationIds = idArr.join(';')
    },
    handleRemoveForOther(file, fileList) {
      let idArr
      if (this.form.variables.id) {
        idArr = fileList.map((item) => item.id)
      } else {
        idArr = fileList.map((item) => item.response.data[0].fileId)
      }
      this.fileOtherIds = idArr.join(';')
    }
  },
  watch: {
    proData: {
      handler(val) {
        this.uploadHeaders.Authorization = 'Bearer ' + this.$store.getters.token
        if (val) {
          let dataArr = JSON.parse(val)
          this.form.variables = {
            ...dataArr[0]
          }
          console.log(JSON.parse(val))
          this.siteShiArr = this.form.variables.shi ? this.form.variables.shi.split(','):[]
          this.printingShowList = this.form.variables.sealType ? this.form.variables.sealType.split(';'):[]
          this.companyQualificationList =
            this.form.variables.companyQualification ? this.form.variables.companyQualification.split(';'):[]
          this.personalQualificationList =
            this.form.variables.personalQualification ? this.form.variables.personalQualification.split(';'):[]
          this.companyChange(this.form.variables.companyName)
          // 请求附件详情
          this.getFileDetail(this.form.variables.fujian)
          this.formUserName = this.form.variables.createUserName
          this.formDeptName = this.form.variables.createDeptName
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
        if (val.variables.yesno == 'Y') {
          this.isShowTrackProject = true
        } else {
          this.isShowTrackProject = false
        }
        //有无预出成本
        if (val.variables.sfyuchu == '1') {
          this.isShowAdvanceCost = true
        } else {
          this.isShowAdvanceCost = false
        }
      },
      deep: true
    }
  },
  computed: {
    computeTotalCost: function() {
      let materialCost =
        this.form.variables.cailiaochengben == null
          ? 0
          : this.form.variables.cailiaochengben
      let constructionCost =
        this.form.variables.shigongchengben == null
          ? 0
          : this.form.variables.shigongchengben
      let otherCost =
        this.form.variables.qitafeiyong == null
          ? 0
          : this.form.variables.qitafeiyong
      let totalCost = parseFloat(
        materialCost + constructionCost + otherCost
      ).toFixed(2)
      this.form.variables.hejichengben = totalCost
      return totalCost
    },
    computeRefQuotation: function() {
      let totalCost =
        this.form.variables.hejichengben == null
          ? 0
          : this.form.variables.hejichengben
      let refQuotation = parseFloat(totalCost / 0.8).toFixed(2)
      this.form.variables.nibaojia = refQuotation
      return refQuotation
    },
    computeGrossProfit: function() {
      let quote =
        this.form.variables.nibaojia2 == null
          ? 0
          : this.form.variables.nibaojia2
      let totalCost =
        this.form.variables.hejichengben == null
          ? 0
          : this.form.variables.hejichengben
      let grossProfit = parseFloat(quote - totalCost).toFixed(2)
      this.form.variables.maolirun = grossProfit
      return grossProfit
    },
    computeGrossMargin: function() {
      let quote =
        this.form.variables.nibaojia2 == null
          ? 0
          : this.form.variables.nibaojia2
      if (quote == 0) {
        return 0
      } else {
        let grossProfit =
          this.form.variables.maolirun == null
            ? 0
            : this.form.variables.maolirun
        let grossMargin = parseFloat((grossProfit / quote) * 100).toFixed(2)
        this.form.variables.maolilv = grossMargin
        return grossMargin
      }
    }
  }
}
</script>
<style scoped lang="scss">
.but-form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

