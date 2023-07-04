<!--
 * @Author: your name
 * @Date: 2021-10-19 17:21:33
 * @LastEditTime: 2021-11-18 09:46:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jshxpms-vue\src\components\Process\components\nodePanel\property\singleCascader.vue
-->
<template>
  <el-dialog
    title="选择人员"
    :visible.sync="dialogVisible"
    width="900px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @closed="$emit('close',checkList)"
    class="mydialog"
  >
    <el-row :gutter="20" style="margin-bottom: 20px;min-height: 500px;" type="flex" justify="space-between">
      <el-col :span="8" style="border:1px solid #ccc; padding:10px 5px; border-radius:5px;">
        <el-input v-model="filterText" placeholder="输入关键字进行过滤" @input="searchByUserName"></el-input>
        <el-tree
          :data="list"
          :filter-node-method="filterNode"
          :props="defaultProps"
          ref="tree"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-col>
      <el-col
        :span="8"
        style="border:1px solid #ccc; margin:0 5px; padding:10px 5px;border-radius:5px;"
      >
        <span>请选择</span>
        <br/>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="changePage"
          hide-on-single-page
        ></el-pagination>
        <el-checkbox-group v-model="checkList">
          <div v-for="(item,idx) in userListDept" :key="idx">
            <el-checkbox :label="item" border style="margin-bottom:10px;">{{ item && item.nickName }}</el-checkbox>
            <br/>
          </div>
        </el-checkbox-group>
      </el-col>
      <el-col :span="8" style="border:1px solid #ccc; padding:10px 5px;border-radius:5px;">
        <span>已选择</span>
        <br/>
        <div v-for="(item,idx) in checkList" :key="idx">
          <el-checkbox :label="item.nickName" border checked disabled style="margin-bottom:10px;"></el-checkbox>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="16" type="flex" justify="end" align="center">
        <el-button type="primary" @click="closeDialog">确定</el-button>
        <el-button @click="closeclearDialog">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { listByDeptId } from '@/api/system/user'
import { throttle } from 'throttle-debounce'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkList: [],
      dialogVisible: true,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
      pageNum: 1,
      userListDept: [],
      total: 0
    }
  },
  watch: {},
  methods: {
    changePage(page) {
      this.pageNum = page
      this.getlistByDeptId()
    },
    async getlistByDeptId() {
      const data = await listByDeptId({
        deptId: this.deptId,
        pageNum: this.pageNum,
        pageSize: 10
      })
      this.userListDept = data.rows
      this.total = data.total
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      this.deptId = data.id
      this.getlistByDeptId()
    },
    searchByUserName: throttle(300, false, async function() {
      if (this.filterText != null && this.filterText != '') {
        const { rows, total } = await listByDeptId({
          name: this.filterText,
          pageNum: this.pageNum,
          pageSize: 10
        })
        this.userListDept = rows
        this.total = total
      }
    }, false),
    closeDialog() {
      this.dialogVisible = false
    },
    closeclearDialog() {
      this.dialogVisible = false
      this.checkList = []
    }
  }
}
</script>


<style lang="scss" scoped>
.mydialog {
  .el-dialog {
    min-height: 650px;
  }
}
</style>
