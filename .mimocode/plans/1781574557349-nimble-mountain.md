# 头部与第一个项目过渡方案 — Hero缩小上移

## 效果描述
滚动时：
- Hero区域缩小（scale 1→0.3）并固定在顶部
- 第一个作品从下方滑入覆盖
- 两者不共享背景，各自独立

## 修改文件

### 1. `src/assets/style.css`
- Hero恢复独立背景
- 第一个作品恢复自己的背景图
- 添加过渡动画样式

### 2. `src/components/HomePage.vue`
- 移除Hero背景图绑定
- 恢复第一个作品的背景图
- 移除hero滚动淡出逻辑

## 关键CSS
```css
.hero-section {
  position: relative;
  height: 100vh;
  z-index: 1;
  transition: transform 0.1s;
}

.layout-tilt-mega {
  position: relative;
  z-index: 2;
  /* 正常显示自己的背景 */
}
```

## 验证
运行 `cmd /c "npm run build"` 检查编译
