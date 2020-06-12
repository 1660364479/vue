<template>
    <div>
 <div class="block">
    <span class="demonstration"></span>
    <el-date-picker
      v-model="value"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <!-- echarts -->
    <div id="echarts">
  
    </div>
  </div>
    </div>
</template>

<script>
import echarts from "echarts";
import {Commodity_echarts} from '../../api/apis'
// import {Commodity_echarts} from "../../api/apis";
    export default {
         data() {
      return {

        value: [],
      };
    },
    mounted(){
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echarts'));
      Commodity_echarts(JSON.stringify(this.value)).then(res=>{
        console.log(res);
           var option = {
    title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
        
      })
   
    }
    }
</script>

<style scoped>
.block{
    margin-top: 20px;
}
#echarts{
  width: 100%;
  height: 400px;
  
}
</style>