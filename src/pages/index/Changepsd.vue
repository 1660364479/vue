<template>
  <el-form class="user-account-key" ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="原密码" prop="password" style="width:500px">
      <el-input type="password" placeholder="请输入原密码" @change="verification" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword" style="width:500px">
      <el-input type="password" placeholder="请设置新密码" v-model="form.newPassword"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="newPassword2" style="width:500px">
      <el-input type="password" placeholder="请确认新密码" v-model="form.newPassword2"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="$refs['form'].resetFields()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { chek_Old, change_pwd } from "../../api/apis";

export default {
  data() {
    //此处即表单发送之前验证
    let validateNewPassword = (rule, value, callback) => {
      if (value === this.form.password) {
        callback(new Error("新密码不能与原密码相同!"));
      } else {
        callback();
      }
    };
    let validateNewPassword2 = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error("与新密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      id: "",
      form: {password:'',newPassword:'',newPassword2:''},
      rules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请设置新密码", trigger: "blur" },
          { validator: validateNewPassword, trigger: "blur" }
        ],
        newPassword2: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validateNewPassword2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
   onSubmit(){
     change_pwd(this.form.newPassword,localStorage.id).then(res=>{
      //  console.log(res);
      if(res.data.code==0){
console.log(1);

      }
       
     })
   },
    verification() {
      //取出本地id
      this.id = localStorage.id;
      // console.log(this.id);

      chek_Old(this.id, this.form.password).then(res => {
        // console.log(res.data.code);

        if (res.data.code == 0) {
          this.$message({
            message: "和员密码相同",
            type: "success"
          });
        }
      });
    }
  }
};
</script>

<style scoped>
#box {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>