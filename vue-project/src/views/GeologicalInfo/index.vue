<template>
  <div class="app-container">
   

    <!-- 主内容区：地图 + 侧边栏 -->
    <div class="main-content">
      <!-- 地图与控制区 -->
      <div class="map-section">
        <h2 class="page-title">中国地图展示</h2>
        <div class="map-control-wrapper">
          <div id="china" class="china"></div>
      
        </div>
        <!-- 地图数据面板 -->
        <div class="data-panel">
          <p>当前缩放级别: {{ zoomLevel }}</p>
          <p>地图中心: {{ centerCoords.join(', ') }}</p>
        </div>
      </div>

      <!-- 侧边栏（科普/统计） -->
      <aside class="sidebar">
        <h3>地质知识</h3>
        <p>超前地质预报是通过物探/钻探等手段，在隧道施工前预判地质风险...</p>
        <h3>数据统计</h3>
        <p>累计预报次数: {{ forecastCount }}</p>
      </aside>
    </div>

   
  </div>
</template>
<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'; // 若需路由跳转

const router = useRouter();
const { proxy } = getCurrentInstance();

// 响应式数据：地图状态 + 统计数据
const zoomLevel = ref(4); // 初始缩放级别
const centerCoords = ref([108.94, 34.26]); // 地图初始中心（经纬度）
const forecastCount = ref(100); // 示例统计数据

onMounted(() => {
  // 初始化地图（假设 proxy.$china 是地图SDK的初始化方法）
  proxy.$china('china', (mapInstance) => {
    // 监听地图缩放事件，更新状态
    mapInstance.on('zoomchange', () => {
      zoomLevel.value = mapInstance.getZoom();
      centerCoords.value = mapInstance.getCenter().join(', '); // 格式化显示
    });
  });
});


</script>

<style scoped>
/* 全局容器：弹性布局 + 背景色 */
.app-container {
  font-family: "Microsoft YaHei", sans-serif;
  background-color: #f5f7fa; /* 浅灰背景，柔和舒适 */
  min-height: 92vh;
  display: flex;
  flex-direction: column;
}

/* 导航栏：深色背景 + 白色文字 */
.navbar {
  background-color: #2c3e50; /* 沉稳的深蓝色 */
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
}
.nav-links a {
  color: white;
  text-decoration: none;
  margin-left: 1.5rem;
  transition: color 0.2s;
}
.nav-links a:hover {
  color: #3498db; /*  hover时浅蓝色 */
}

/* 主内容区：地图 + 侧边栏 分栏布局 */
.main-content {
  display: flex;
  flex: 1; /* 占满剩余垂直空间 */
  gap: 2rem;
  padding: 2rem;
}

/* 地图与控制区：垂直排列 */
.map-section {
  flex: 3; /* 地图区占比更大 */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-title {
  text-align: center;
  color: #2c3e50; /* 标题深色 */
  margin-bottom: 1rem;
}

.map-control-wrapper {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

/* 地图容器：白色背景 + 阴影 + 圆角 */
.china {
  height: 500px;
  width: 100%;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
}

/* 按钮组：蓝色渐变 +  hover动画 */
.btn-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.simple-btn {
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.simple-btn:hover {
  background: #2980b9; /*  hover加深 */
  transform: translateY(-1px); /* 轻微上移 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
.simple-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 数据面板：白色卡片 + 阴影 */
.data-panel {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.data-panel p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
}

/* 侧边栏：白色卡片 + 科普内容 */
.sidebar {
  flex: 1; /* 侧边栏占比小 */
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.sidebar h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}
.sidebar p {
  margin: 0.5rem 0;
  line-height: 1.4;
}

/* 页脚：深色背景 + 居中文字 */
.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto; /* 自动推到底部 */
}

/* 响应式：小屏幕（手机）下堆叠布局 */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  .map-section {
    width: 100%;
  }
  .china {
    height: 400px; /* 小屏幕缩小地图高度 */
  }
}
</style>