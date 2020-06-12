<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange1"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.ctime }}</template>
      </el-table-column>
      <el-table-column prop="account" label="姓名" width="120"></el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-button type="primary" @click="dialogFormVisible = true,bianji((scope.row))">编辑</el-button>

          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="form.account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户组" :label-width="formLabelWidth">
                <el-select v-model="form.userGroup" placeholder="请选择活动区域">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通管理员" value="普通管理员"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false,queding(scope.row.id)">确 定</el-button>
            </div>
          </el-dialog>
          <el-button @click="shanchu(scope.row.id)" type="danger">删除</el-button>
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
    <el-button @click="Bulkdelete" type="danger">批量删除</el-button>
  </div>
</template>

<script>
import {
  Bulk_delete,
  click_obtain,
  click_delete,
  Bulk_modify
} from "../../api/apis";
export default {
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showadmin();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    // 删除
    shanchu(id) {
      console.log(id);
      if (confirm("删除")) {
        click_delete(id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
        });
      }
    },
    //批量删除

    Bulkdelete() {
      let id = [];
      for (let obj of this.hand) {
        id.push(obj.id);
      }
      console.log(id);
      this.ids = JSON.stringify(id);
      if (confirm("批量删除")) {
        Bulk_delete(this.ids).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
        });
      }
    },
    clickEdit(row) {
      console.log(row);
      this.oldedit = row;
      console.log(this.oldedit);
    },
    // 编辑
    bianji(row) {
      this.dialogFormVisible = true;
      console.log(row);
      this.form = row;
    },
    queding() {
      Bulk_modify(this.form.id, this.form.account, this.form.userGroup).then(
        res => {
          console.log(res);
        }
      );
    },
    // 获取账户列表的值
    showadmin() {
      click_obtain(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        console.log(this.total);

        // console.log(res.data);

        // console.log(this.tableData);
      });
    }
  },

  data() {
    return {
      handleSelectionChange1(val) {
        console.log("handleSelectionChange1--", val);
        this.hand = val;
        // this.tableChecked = val
      },
      form: {
        id: "",
        account: "",
        userGroup: ""
      },
      total: 1,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      master_user: {
        sel: null, //选中行
        columns: [
          {
            prop: "type",
            label: "远程类型",
            width: 120
          }
        ],
        data: []
      },
      currentPage: 1,
      pageSize: 4,
      id: [],
      tableDatad: [],
      ids: [], //批量删除id
      //被选中的记录
      tableData: [],
      hand: []
    };
  },
  created() {
    this.showadmin();
  }
};
</script>

<style scoped>
</style>