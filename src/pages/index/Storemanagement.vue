<template>
  <div>
    <span style=" float: left;">店铺管理</span>
    <el-button style=" float: right;" type="primary" @click="baocu">保存</el-button>
    <el-divider></el-divider>
    <p>
      店铺名称
      <el-input style="width: 300px;
height: 50px;" v-model="from.name" placeholder="请输入内容"></el-input>
    </p>
    <p>
      店铺公告
      <el-input style="width: 300px;
height: 50px;" v-model="from.bulletin" placeholder="请输入内容"></el-input>
    </p>
    <div>
      店铺图
      <img :src="from.avatar" alt />
    </div>店铺图片
    <img v-for="item in imgUrl" :key="item" :src="item" alt />
    <el-upload
      action="http://127.0.0.1:5000/shop/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handle"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100" :src="from.avatar" alt />
    </el-dialog>
    <div>
      <p>
        配送费：
        <el-input
          style="width: 300px;
height: 50px;"
          v-model="from.deliveryPrice"
          placeholder="请输入内容"
        ></el-input>
      </p>
      <p>
        配送时间：
        <el-input
          style="width: 300px;
height: 50px;"
          v-model="from.deliveryTime"
          placeholder="请输入内容"
        ></el-input>
      </p>
      <p>
        配送描述：
        <el-input
          style="width: 300px;
height: 50px;"
          v-model="from.description"
          placeholder="请输入内容"
        ></el-input>
      </p>
      <p>
        店铺评分：
        <el-input style="width: 300px;
height: 50px;" v-model="from.score" placeholder="请输入内容"></el-input>
      </p>
      <p>
        销量：
        <el-input style="width: 300px;
height: 50px;" v-model="from.sellCount" placeholder="请输入内容"></el-input>
      </p>
      <p>
        活动
        <el-radio-group v-model="from.supports">
          <el-radio label="ltr">在线支付满28减5</el-radio>
          <el-radio label="rtl">vc无限成果汁全场8折</el-radio>
          <p>
            <el-radio label="ttb">担任精彩</el-radio>
            <el-radio label="btt">特价饮8折抢购</el-radio>
          </p>
          <p>
            <el-radio label="ttb">单人特色套餐</el-radio>
          </p>
        </el-radio-group>
      </p>
      <p>
        <el-time-picker
          is-range
          v-model="value1"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </p>
    </div>
  </div>
</template>

<script>
import { shop_info, shop_xiugai } from "../../api/apis";
export default {
  data() {
    return {
      from: {},
      dialogImageUrl: "",
      dialogVisible: false,
      input: "",
      drawer: false,
      direction: "rtl",
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      imgUrl: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handle(val) {
      // this.imgUrl = val.imgUrl;
      // console.log(val.imgUrl);
      // console.log(this.from.pics);
      this.from.pics.push(val.imgUrl);
      console.log(this.from.pics);
    },
    baocu() {
      // console.log( this.from.date);

      this.from.pics = JSON.stringify(this.from.pics);
      this.from.supports = JSON.stringify(this.from.supports);
      this.from.date = JSON.stringify(this.from.date);
      console.log(this.from.date);
      console.log(this.from);
      shop_xiugai(
        this.from.id,
        this.from.name,
        this.from.bulletin,
        this.from.avatar,
        this.from.deliveryPrice,
        this.from.deliveryTime,
        this.from.description,
        this.from.score,
        this.from.sellCount,
        this.from.supports,
        this.from.date,
        this.from.pics
      ).then(res => {
       if(res.data.code==0){
         this.$message({
                  message:'保存成功',
                   type: 'success'
                })
       }
      });
    }
  },
  created() {
    shop_info().then(res => {
      // console.log(res.data.data);
      res.data.data.avatar = `${res.data.data.avatar}`;

      this.imgUrl = res.data.data.pics.map(
        v => `http://127.0.0.1:5000/upload/shop/${v}`
      );
      // console.log(res.data.data.pics);
      this.from = res.data.data;
    });
  }
};
</script>

<style scoped>
div p {
  margin-top: 15px;
}
img{
  width: 150px;
  height: 150px;
}
</style>