<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称：">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类：">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格：">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片：">
              <img :src="props.row.imgUrl" alt />
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
            <el-form-item label="操作：">
              <span>{{ props.row.dom }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作" prop="dom">
        <template slot-scope="scope">
          <!-- 弹框 -->

          <el-button type="primary" @click="bianji((scope.row))">编辑</el-button>

          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="所属分类" :label-width="formLabelWidth">
                <el-input v-model="form.category" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input v-model="form.price" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品图片" :label-width="formLabelWidth">
                <el-input v-model="form.imgUrl" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品描述" :label-width="formLabelWidth">
                <el-input v-model="form.goodsDesc" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false,ture()">确 定</el-button>
            </div>
          </el-dialog>

          <el-button type="danger" @click="shanchu(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        layout="total,prev, pager, next"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { shop_list, del_shop, change_shop } from "../../api/apis";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: ""
      },
      formLabelWidth: "120px",
      total: 1,
      currentPage: 1,
      pageSize: 4,
      tableData: [],
      id: []
    };
  },
  methods: {
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showadmin();
    },
    // 获取用户列表
    showadmin() {
      shop_list(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        for (let i in this.tableData) {
          this.tableData[
            i
          ].imgUrl = `http://127.0.0.1:5000/upload/imgs/goods_img/${this.tableData[i].imgUrl}`;
        }
      });
    },

    // 删除
    shanchu(id) {
      del_shop(id).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }
      });
    },

    // 编辑
    bianji(row) {
      this.dialogFormVisible = true;
      console.log(row);
      this.form = row;
      // console.log(this.form);
    },
    ture() {
      change_shop(
        this.form.name,
        this.form.category,
        this.form.price,
        this.form.imgUrl,
        this.form.goodsDesc,
        this.form.id
      ).then(res => {
        console.log(res);
      });
    }
  },

  created() {
    this.showadmin();
  }
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>