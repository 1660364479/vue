<template>
    <div id="box">
<el-card class="box-card">
  <div class="text item">
   <p>账号：<el-input v-model="acc" placeholder="请输入内容"></el-input></p>
   <p>密码：<el-input v-model="pwd" placeholder="请输入内容"></el-input></p>
   <p>用户组<el-input v-model="zu" placeholder="请输入内容"></el-input></p>
    
  <el-button @click="btn_add" type="primary">添加</el-button>
  <el-button>重置</el-button>
  </div>
</el-card>

    </div>
</template>

<script>
import {click_add} from '../../api/apis'
    export default {
        data(){
            return{
              data:'res.data',
               acc:'',
               pwd:'',
               zu:'' 
            }
        },
         methods:{
             btn_add(){
               click_add(this.acc,this.pwd,this.zu).then((res)=>{
                 console.log(res);
                 
                if(res.data.code==0){
                this.$message({
                  message:'添加成功',
                   type: 'success'
                })
                }
               })
             }
         }
    }
</script>

<style scoped>
#box{
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