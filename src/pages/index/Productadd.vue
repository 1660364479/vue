<template>
  <div id="box">
    <div class="div">商品添加</div>
    <div>
      <p>
        商品名称：
        <el-input style=" width: 300px;
   height: 50px;" v-model="name" placeholder="请输入内容"></el-input>
      </p>
      <p>
        商品分类：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="(item,index) in categories"
            :key="index"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </p>
      <p>
        商品价格：
        <el-input-number v-model="num" @change="handleChange" :min="0" :max="10" label="描述文字"></el-input-number>
      </p>
      <p>
        商品图片
        <el-upload
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success='handle'
          :data='data'
          
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </p>
      <p>
        商品描述：
        <el-input style=" width: 300px;
   height: 50px;" v-model="miao" placeholder="请输入内容"></el-input>
      </p>
      <p>
        <el-button @click="shopadd" type="primary">添加商品：</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { shop_modify } from "../../api/apis";
import { shop_add } from "../../api/apis";
export default {
  data() {
    return {
      data:{id:localStorage.id},
      categories: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      name: "",
      imgUrl: "",
      num: 0,
      miao:'',
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handle(val){
      this.imgUrl=val.imgUrl
    },
shopadd(){
  shop_add(this.name,this.value,this.num,this.imgUrl,this.miao).then(res=>{
    if(res.data.code==0){
       this.$message({
                  message:'添加成功',
                   type: 'success'
                })
    }
    
  })  
}
  },
  created() {
    //查询所有分类名称
    shop_modify().then(res => {
      this.categories = res.data.categories;
    });
    console.log( localStorage.id);
    
  }
};
</script>

<style scoped>
#box .div {
  border-bottom: 1px solid #ccc;
  height: 30px;
  line-height: 30px;
}
</style>