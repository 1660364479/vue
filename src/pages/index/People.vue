<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>管理员信息</span>
      </div>
      <div class="text item">
        <el-divider></el-divider>
        <div>管理员id：{{myinfo.id}}</div>
        <el-divider></el-divider>
        <div>账号：{{myinfo.account}}</div>
        <el-divider></el-divider>
        <div>用户组：{{myinfo.userGroup}}</div>
        <el-divider></el-divider>
        <div>创建时间{{myinfo.ctime}}</div>
        <el-divider></el-divider>
        <div>
          管理员头像
          <el-upload
            action="http://127.0.0.1:5000/users/avatar_upload"
            list-type="picture-card"
            :data='data'
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { check_accountinfo } from "../../api/apis";
export default {
  data() {
    return {
      data:{id:localStorage.id},
      imageUrl: "",
      myinfo: {},
       dialogImageUrl: '',
        dialogVisible: false,
        account:''
    };
  },

  created() {
    // this.showadmin();
    check_accountinfo(localStorage.id).then(res => {
      console.log(res.data.accountInfo); //{id: 84, ctime: "2020-06-06T05:15:30.000Z", account: "admin", userGroup: "超级管理员", imgUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/default.jpg"}
      this.myinfo = res.data.accountInfo;
      console.log(localStorage.id);
      console.log(res.data.accountInfo.account);
      
      
    });
  }
};
</script>

<style scoped>
.box-card {
  width: 100%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>