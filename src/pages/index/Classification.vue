<template>
  <div>
    <div style="margin-top:20px;">
      <span style="float: left;">商品分类</span>
      <el-button style="float: right;" type="text" @click="dialogFormVisible = true">添加商品</el-button>

      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="启用" :label-width="formLabelWidth">
            <el-input v-model="form.start" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类名称" width="180">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.cateName }}</el-tag>
            
            <template slot-scope="scope">
                <span v-if="scope.row.vVisible">{{scope.row.name}}</span>
                <el-input v-else v-model="scope.row.name"></el-input>
            </template>
            </div>
          
        </template>
      </el-table-column>
      <el-table-column label="是否启用" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#DCDFE6"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete( scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration">直接前往</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { check_addcate } from "../../api/apis";
import { check_categories } from "../../api/apis";
import { check_delete } from "../../api/apis";
// import { check_modify } from "../../api/apis";

export default {
  data() {
    return {
      ishide: false,
      dialogFormVisible: false,
      form: {
        name: "",
        start: 1
      },
      formLabelWidth: "120px",
      value: true,
      currentPage3: 3,
      pageSize:4,
      tableData: [
        {
          date: "1",
          name: "11111"
        },
        {
          date: "2",
          name: "22222"
        },
        {
          date: "3",
          name: "11111"
        },
        {
          date: "4",
          name: "qqqqq"
        },
        {
          date: "5",
          name: "input"
        }
      ]
    };
  },
  methods: {
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除
    handleDelete(id) {
      check_delete(id).then(res=>{
        if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
        } 
        console.log(res);
        
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    add() {
      this.dialogFormVisible = false;
      check_addcate( this.form.start,this.form.name).then(res => {
        console.log(res.data);
      });
    }
  },
  created(){
    check_categories(this.currentPage3,this.pageSize).then((res)=>{
     this.tableData= res.data.data
       console.log(res.data.data);
    })
  }
};
</script>

<style scoped>
</style>