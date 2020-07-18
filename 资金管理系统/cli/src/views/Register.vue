<template>
  <div class="register">
    <img src="../assets/bg.jpg" alt class="registerBg" />
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">FX后台管理系统</span>
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
          <el-form-item label="电话" prop="phone">
            <el-input v-model="registerUser.phone" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <!-- <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请绑定用户邮箱"></el-input>
          </el-form-item>-->
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
          </el-form-item>

          <el-form-item label="选择身份">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="employee"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import { Register } from "../api/user";
export default {
  name: "register",
  components: {},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        phone: "",
        // email: "",
        password: "",
        password2: "",
        identity: ""
      },
      rules: {
        phone: [
          {
            required: true,
            message: "号码不能为空",
            trigger: "blur"
          },
          {
            min: 7,
            max: 30,
            message: "长度在7到11个字符之间",
            tringger: "blur"
          }
        ],
        // email: [
        //   {
        //     type: "email",
        //     required: true,
        //     message: "邮箱格式不正确",
        //     trigger: "blur"
        //   }
        // ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "长度在6到30个字符之间",
            tringger: "blur"
          }
        ],
        password2: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "长度在6到30个字符之间",
            tringger: "blur"
          },
          {
            validator: validatePass2,
            tringger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$axios.post("http://vuegg.ngrok.ifdod.com/api/user/register", {
          //     phone: this.registerUser.phone,
          //     password: this.registerUser.password
          //   })


            Register({
              phone: this.registerUser.phone,
              password: this.registerUser.password              
            })
            .then(res => {
            //   console.log(res);
            //注册成功
            this.$message({
                message:'账号注册成功!',
                type:'success'
            })
            })
            .catch(err => {
              console.log(err.response.data);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.registerBg {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 280px;
  left: 42%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #ccc;
}
.submit_btn {
  width: 100%;
}
</style>