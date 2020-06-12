<template>
  <div>
    <div style=" display: flex;
  justify-content: space-around;">
      <div>
        <img src="../../imgs/shu.jpg" alt style="float: left; margin-top: 18px;" />
        <div style="float: left;margin-top: 18px;">
          <p>总订单</p>
          <p>102400</p>
        </div>
      </div>
      <div>
        <img src="../../imgs/qian.jpg" alt style="float: left; margin-top: 18px;" />
        <div style="float: left;margin-top: 18px;">
          <p>总订单</p>
          <p>102400</p>
        </div>
      </div>
      <div>
        <img src="../../imgs/benzi.jpg" alt style="float: left; margin-top: 18px;" />
        <div style="float: left;margin-top: 18px;">
          <p>总订单</p>
          <p>102400</p>
        </div>
      </div>
      <div>
        <img src="../../imgs/qian2.jpg" alt style="float: left; margin-top: 18px;" />
        <div style="float: left;margin-top: 18px;">
          <p>总订单</p>
          <p>102400</p>
        </div>
      </div>
    </div>
    <div id="echarts">
      <!-- echarts -->
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { index_echarts } from "../../api/apis";
export default {
  data() {
    return {
        todayOrder:0,
        totalAmount:0,
        totalOrder:0,
        totayAmount:0
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("echarts"));
   //加载
   myChart.showLoading();
   setTimeout(()=>{
        index_echarts().then(res => {

        let {xData,orderData,amountData,todayOrder,totalAmount,totalOrder,totayAmount} = res.data

        this.todayOrder=todayOrder,
        this.totalAmount=totalAmount,
        this.totalOrder=totalOrder,
        this.totayAmount=totayAmount,
      console.log(res.data);
         let option = {
      title: {
        text: "折线图堆叠"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "订单数据",
          type: "line",
          stack: "总量",
          data: orderData
        },
        {
          name: "金额数据",
          type: "line",
          stack: "总量",
          data: amountData
        }
      ]
    };
    //  使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    myChart.hideLoading();
    });
   },3000)
 
  }
};
</script>

<style >
#echarts {
  width: 100%;
  height: 400px;
  margin-top: 20px;
}
</style>