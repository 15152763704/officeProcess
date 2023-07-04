<template>
  <div>
    <el-dialog title="修改结算金额" visible="true" class="money_dialog" append-to-body="true" center>
      <el-form :model="form">
        <el-form-item label="结算金额（元）" label-width="120px">
          <el-input-number v-model="form.finishMoney" :min="1" placeholder="请输入结算金额" autocomplete="off" controls-position="right"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getInfo, save } from '@/api/biz/productionProject'

  export default {
    name: 'ProductionProjectFinishMoneyPopup',
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        form: {}
      }
    },
    created() {
      getInfo(this.id).then((res) => {
        this.form = res.data
      })
    },
    methods: {
      handleCancel(){
        this.$emit('closeMoney')
      },
      handleSubmit(){
        save(this.form).then((res) => {
          this.msgSuccess("修改成功")
          this.$emit('closeMoney')
        })
      }
    }
  }
</script>

<style scoped>
  .money_dialog{
    width: 1000px;
    margin: 30px auto !important;
    display: inline-block;
    vertical-align: middle;
    white-space: normal;
  }
</style>
