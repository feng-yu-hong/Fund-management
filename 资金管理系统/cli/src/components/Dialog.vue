<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <el-form-item label="收支类型:">
            <el-select v-model="formData.income_type" placeholder="收支类型">
              <el-option
                v-for="(formtype,index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="income_remark" label="收支描述:">
            <el-input type="income_remark" v-model="formData.income_remark"></el-input>
          </el-form-item>

          <el-form-item prop="income" label="收入:">
            <el-input type="income" v-model="formData.income"></el-input>
          </el-form-item>

          <el-form-item prop="pay" label="支出:">
            <el-input type="pay" v-model="formData.pay"></el-input>
          </el-form-item>

          <el-form-item prop="account" label="账户现金:">
            <el-input type="account" v-model="formData.account"></el-input>
          </el-form-item>

          <el-form-item prop="remark" label="备注:">
            <el-input type="remark" v-model="formData.remark"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-botton @click="dialog.show = false">取消</el-botton>
            <el-botton type="primary" @click="onSubmit('form')">提交</el-botton>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialog",
  data() {
    return {
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      form_rules: {
        income_remark: [
          { required: true, message: "收支描述不能为空!", trigger: "blur" }
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" }
        ],
        pay: [{ required: true, message: "支出不能为空！", trigger: "blur" }],
        account: [
          { required: true, message: "账户信息不能为空！", trigger: "blur" }
        ]
      }
    };
  },
  props: {
    dialog: Object,
    formData: Object
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const url =
            this.dialog.option == "add"
              ? this.api.POST_FORM()
              : this.api.POST_UPDATA();
          // this.$axios
          //   .post(url,{
          //     income_type:this.formData.income_type,
          //     income_remark:this.formData.income_remark,
          //     income:this.formData.income,
          //     pay:this.formData.pay,
          //     account:this.formData.account,
          //     remark:this.formData.remark,
          //     _id:this.formData._id,
          //   })
          Update({
            income_type: this.formData.income_type,
            income_remark: this.formData.income_remark,
            income: this.formData.income,
            pay: this.formData.pay,
            account: this.formData.account,
            remark: this.formData.remark,
            _id: this.formData._id
          }).then(res => {
            //添加成功
            this.$message({
              message: "数据添加成功",
              type: "success"
            });
            // 隐藏dialog
            this.dialog.show = false;
            this.$emit("update", this.formData);
          });
        }
      });
    }
  }
};
</script>


<style scoped>
</style>