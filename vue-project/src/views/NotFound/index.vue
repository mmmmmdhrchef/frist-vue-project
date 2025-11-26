<template>
  <div class="not-found-container">
    <!-- 星空背景 -->
    <div class="star-field">
      <div class="star"></div>
      <div class="star"></div>
      <!-- 可以复制多个div.star以添加更多星星 -->
    </div>

    <!-- 主要内容区域 -->
    <div class="content">
      <div class="astronaut">
      </div>
      <h1 class="error-code">404</h1>
      <p class="error-message">哎呀，你好像来到了宇宙边缘</p>
      <p class="error-description">
        这个页面可能被外星人带走了，或者你输入了一个不存在的地址。
      </p>
      <div class="action-buttons">
        <button @click="goHome" class="home-button">返回地球（首页）</button>
        <button @click="goBack" class="back-button">返回上一页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/')
}

// 返回上一页
const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.not-found-container {
  background: linear-gradient(135deg, #1a237e 0%, #311b92 100%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 星空背景动画 */
.star-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  animation: twinkle 5s infinite ease-in-out;
}

.star:nth-child(1) { top: 20%; left: 10%; width: 2px; height: 2px; animation-delay: 0s; }
.star:nth-child(2) { top: 60%; left: 80%; width: 3px; height: 3px; animation-delay: 1s; }
/* 可继续添加更多星星 */

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

.content {
  text-align: center;
  z-index: 2;
  max-width: 600px;
  padding: 2rem;
}

.astronaut {
  margin-bottom: 2rem;
  animation: float 6s ease-in-out infinite;
}

.astronaut img {
  width: 200px;
  height: auto;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  background: linear-gradient(45deg, #ffd54f, #ffecb3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(255, 213, 79, 0.3);
}

.error-message {
  font-size: 1.8rem;
  margin: 0 0 1rem 0;
  font-weight: 300;
}

.error-description {
  font-size: 1.1rem;
  margin: 0 0 2.5rem 0;
  opacity: 0.8;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.home-button, .back-button {
  padding: 0.8rem 1.8rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.home-button {
  background: linear-gradient(45deg, #ff6d00, #ffab40);
  color: white;
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 109, 0, 0.4);
}

.back-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-code { font-size: 6rem; }
  .error-message { font-size: 1.5rem; }
  .action-buttons { flex-direction: column; }
  .astronaut img { width: 150px; }
}
</style>