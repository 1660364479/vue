<template>
  <div>
    <p>
      <span>
        订单号：
        <el-input style=" width: 200px;
  height: 10px;" v-model="orderNo" placeholder="订单号"></el-input>
      </span>
      <span>
        收货人：
        <el-input style=" width: 200px;
  height: 10px;" v-model="consignee" placeholder="收货人"></el-input>
      </span>
      <span>
        手机号：
        <el-input style=" width: 200px;
  height: 10px;" v-model="phone" placeholder="手机号"></el-input>
      </span>
      <span>
        订单状态：
        <el-input style=" width: 200px;
  height: 10px;" v-model="orderState" placeholder="订单状态"></el-input>
      </span>
      <el-button type="primary" @click="chaxun">查询</el-button>
    </p>
    <el-table :data="tableData" style="width: 100%; margin-top: 40px;" height="500">
      <el-table-column prop="orderNo" label="订单号" width="200"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="consignee" label="收货人"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
      <el-table-column prop="remarks" label="用户备注"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
      <el-table-column prop="orderState" label="订单状态"></el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <span>
            <!-- 查看 -->
            <el-button type="primary" @click="dialogTableVisible = true,chack(scope.row.id)">查看</el-button>

            <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
              <el-table :data="gridData" height="300">
                <el-table-column prop="orderNo" label="订单号" width="100"></el-table-column>
                <el-table-column prop="orderTime" label="下单时间" width="120"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="consignee" label="收货人"></el-table-column>
                <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
                <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
                <el-table-column prop="remarks" label="用户备注"></el-table-column>
                <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
                <el-table-column prop="orderState" label="订单状态"></el-table-column>
              </el-table>
            </el-dialog>

            <!-- 编辑 -->
            <el-button type="primary" @click="bianji((scope.row))">编辑</el-button>

            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
              <el-form>
                <el-form-item label="订单号" :label-width="formLabelWidth">
                  <el-input v-model="form.orderNo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="下单时间" :label-width="formLabelWidth">
                  <el-input v-model="form.orderTime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                  <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收货人" :label-width="formLabelWidth">
                  <el-input v-model="form.consignee" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="配送地址" :label-width="formLabelWidth">
                  <el-input v-model="form.deliverAddress" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="送达时间" :label-width="formLabelWidth">
                  <el-input v-model="form.deliveryTime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户备注" :label-width="formLabelWidth">
                  <el-input v-model="form.remarks" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="订单金额" :label-width="formLabelWidth">
                  <el-input v-model="form.orderAmount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="订单状态" :label-width="formLabelWidth">
                  <el-input v-model="form.orderState" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false,queding(scope.row.id)">确 定</el-button>
              </div>
            </el-dialog>

          </span>
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
import { list_order, list_search, list_detail,list_edit } from "../../api/apis";

export default {
  data() {
    return {
      handleSelectionChange1(val) {
        console.log("handleSelectionChange1--", val);
        this.hand = val;
        // this.tableChecked = val
      },
       dialogFormVisible: false,
       formLabelWidth: '120px',
      total: 10,
      gridData: [],
      dialogTableVisible: false,
      form:{
      orderNo:'',
      orderTime:'',
      phone:'',
      consignee:'',
      deliverAddress:'',
      deliveryTime:'',
      remarks:'',
      orderAmount:'',
      orderState:'',
      },
      orderNo: "",
      consignee: "",
      phone: "",
      orderState: "",
      tableData: [],
      currentPage: 1,
      pageSize: 4
    };
  },
  methods: {
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showadmin();
    },
    showadmin() {
      //喧染列表
      list_order(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        console.log(res.data.total);
      });
    },
    //查询
    chaxun() {
      list_search(
        this.currentPage,
        this.pageSize,
        this.orderNo,
        this.consignee,
        this.phone,
        this.orderState,
        this.date
      ).then(res => {
        this.tableData = res.data.data;
      });
    },
    //查看
     chack(id) {
       list_detail(id).then(res => {
        this.gridData.push(res.data.data);
        console.log(res.data.data);
      });
    },
     // 编辑
    bianji(row) {
      this.dialogFormVisible=true
      console.log(row);
      this.form=row
      // console.log(this.form);  
 
    },
    queding(){
list_edit(this.form.orderNo,this.form.orderTime,this.form.phone,this.form.consignee,this.form.deliverAddress,this.form.deliveryTime,this.form.orderNo,this.form.orderAmount,this.form.orderState,).then(res=>{
 if(res.data.code==0){
       this.$message({
                  message:'修改成功',
                   type: 'success'
                })
    }
  
})
    }
  },
  created() {
    this.showadmin();
  }
};
</script>

<style   scoped>
div p {
  margin-top: 10px;
}
</style>
