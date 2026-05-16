# 陈涛 · 个人作品集

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000`，修改代码或 `src/data/portfolio.json` 后自动热更新。

## 修改内容

所有个人信息和作品数据集中在 `src/data/portfolio.json`：

- `personal`：姓名、介绍、技能、联系方式
- `works`：作品列表，每件作品包含标题、分类、年份、描述、标签等

## 添加/删除作品

1. 把图片放到 `public/images/works/` 目录
2. 在 `portfolio.json` 的 `works` 数组中新增一条
3. 本地 `npm run dev` 查看效果
4. 推送到 GitHub 自动上线

## 替换 Hero 照片

将你的照片命名为 `hero.jpg`，放到 `public/images/` 目录，覆盖即可。

## 部署

GitHub Actions 已配置：每次推送 `main` 分支自动构建并部署到 GitHub Pages。

访问地址：`https://ct0604.github.io/portfolio`
