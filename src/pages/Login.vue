<template>
<div id="App">
    <el-card class="box-card">
  <div  class="text item">
   <h3>管理系统</h3>
<el-input v-model="acc" placeholder="请输入内容"></el-input>
<el-input style=" margin-top: 50px;" placeholder="请输入密码" v-model="pwd" show-password></el-input>
 <el-button @click="denglu" type="primary" style=" margin-top: 50px;">登录</el-button>
  </div>
</el-card>
     
</div>
   
</template>

<script>
import {click_login} from '../../src/api/apis'
    export default {
      data(){
          return{
              acc:'',
              pwd:'',
              fangdou:true
          }
      },
     methods:{
        denglu(){
      //防抖节流
      if(this.fangdou==false)return//为false所以发打送
      this.fangdou=false

           click_login(this.acc,this.pwd).then((res)=>{
             console.log(res);
              if(res.data.code==0){
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('id',res.data.id)
                localStorage.setItem('user',JSON.stringify(res.data))
                this.$message({
                  message:'登录成功',
                   type: 'success'
                })
                // 保存
               localStorage.token=res.data.token
               localStorage.acc=res.data.acc
               localStorage.id=res.data.id
               
               localStorage.role=res.data.role
                setTimeout(()=>{
               this.$router.push('/Index/Home')
                },1000);
                this.$message.success(res.data.msg)
              }else{
               this.$message.error('用户名或者密码错误');
               this.$message.error(res.data.msg);
               return false
              }
              
               
             }),
             setTimeout(()=>{
               this.fangdou=true//2秒后才可以点击
             },2000)

        }
            
            
       
     }

    }
</script>

<style scoped>
 #App{
  background: darkblue;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#box{
  height: 300px;
  width: 350px;
  text-align: center;
  
  

 
}
</style>