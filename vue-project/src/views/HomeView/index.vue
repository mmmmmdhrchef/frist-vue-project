<template>
    <div class="container">
        <div class="card">
            <div class="card-box">
                <el-icon class="card-icon" style="color: skyblue;">
                    <Postcard />
                </el-icon>
                <div class="card-title">隧道数量：1000个</div>
            </div>
            <div class="card-box">
                <el-icon class="card-icon" style="color: palevioletred;">
                    <Check />
                </el-icon>
                <div class="card-title">检测合格：805个</div>
            </div>
            <div class="card-box">
                <el-icon class="card-icon" style="color: yellowgreen;">
                    <Bell />
                </el-icon>
                <div class="card-title">正在施工：302个</div>
            </div>
            <div class="card-box">
                <el-icon class="card-icon" style="color: orange;">
                    <Location />
                </el-icon>
                <div class="card-title">地址预报：5000个</div>
            </div>
        </div>
        <!-- 折线条图 -->
        <div class="echarts-line">
            <div class="line" id="line"></div>
        </div>
        <!-- 3个图表 -->
        <div class="chart">
            <div class="chart-box">
                <div id="radar"></div>
            </div>
            <div class="chart-box">
                <div id="pie"></div>
            </div>
            <div class="chart-box">
                <div id="bar"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import api from '@/api/index.js'
    import { getCurrentInstance, onMounted, ref } from 'vue';

    const { proxy } = getCurrentInstance();
    const chartsData = ref();
    //需要渲染后才可以使用哦
    onMounted(async () => {
        try {
            // 等待数据请求完成
            const res = await api.getCharts();
            chartsData.value = res.data.chartsData;
            console.log('图表数据加载完成:', chartsData.value.lineData);

            // 数据就绪后再渲染图表
            proxy.$line('line', chartsData.value.lineData);
            proxy.$radar('radar', chartsData.value.radarData);
            proxy.$pie('pie', chartsData.value.pieData);
            proxy.$bar('bar', chartsData.value.barData);
        } catch (error) {
            console.error('加载图表数据失败:', error);
        }
    });
</script>
<style scoped>
.container {
  display: grid;
  grid-template-rows: 20% 30% 50%; /* 三行比例 */
  width: 100%;
  height: 90vh; /* 或者给父级一个确定高度，例如父级为 100vh */
  gap: 0; /* 如需间距可调整，例如 16px */
  box-sizing: border-box;
}

.card {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
}

.card-box {
  flex: 1;
  min-height: 0; /* 防止 flex 项溢出网格行 */
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.card-icon {
  font-size: 64px; /* 建议用 rem/px 控制，避免百分比导致换行 */
  flex-shrink: 0;
}

.card-title {
  font-size: 20px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.echarts-line {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}

.echarts-line .line {
  width: 100%;
  height: 100%;
}

.chart {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 三等分布局 */
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
}

.chart-box {
  background-color: #fff;
  min-height: 0; /* 防止 flex/grid 子项溢出 */
}

.chart-box > div {
  width: 100%;
  height: 100%;
  min-height: 0; /* 保证 ECharts 容器能被正确测量 */
}
</style>