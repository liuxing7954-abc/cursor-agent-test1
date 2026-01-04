# 个人博客首页 (React 版本)

一个基于 React + Vite 构建的现代化个人博客，专注于后端技术分享和生活记录。

## 项目简介

这是一个使用 React 构建的单页应用（SPA），采用现代化的前端技术栈，提供流畅的用户体验。项目已配置 GitHub Pages 自动部署。

## 技术栈

- **React 18** - 前端框架
- **React Router** - 路由管理
- **Vite** - 构建工具
- **GitHub Pages** - 静态网站托管

## 功能特性

- ✅ React 单页应用
- ✅ 响应式设计，支持移动端和桌面端
- ✅ 现代化UI设计（Cursor 官网风格）
- ✅ 文章分类筛选（技术/生活）
- ✅ 文章详情页
- ✅ 在线 Markdown 编辑器
- ✅ 自动保存草稿
- ✅ 文章预览功能
- ✅ 本地存储文章

## 项目结构

```
.
├── src/
│   ├── components/      # React 组件
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/           # 页面组件
│   │   ├── Home.jsx
│   │   ├── ArticleDetail.jsx
│   │   └── Editor.jsx
│   ├── data/            # 数据文件
│   │   └── articles.js
│   ├── utils/           # 工具函数
│   │   └── markdown.js
│   ├── App.jsx          # 主应用组件
│   └── main.jsx         # 入口文件
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions 部署配置
├── package.json
├── vite.config.js
└── index.html
```

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看效果。

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录。

### 预览生产版本

```bash
npm run preview
```

## GitHub Pages 部署

项目已配置 GitHub Actions，推送代码到 `main` 分支会自动触发构建和部署。

### 部署流程

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Update blog"
   git push origin main
   ```

2. **自动部署**
   - GitHub Actions 会自动：
     - 安装 Node.js 和依赖
     - 构建 React 应用
     - 部署到 GitHub Pages

3. **访问网站**
   - 部署完成后访问：`https://你的用户名.github.io/cursor-agent-test1/`

### 手动触发部署

在 GitHub 仓库的 `Actions` 标签页，选择 "Deploy to GitHub Pages" 工作流，点击 "Run workflow" 可以手动触发部署。

## 配置说明

### 修改仓库路径

如果仓库名称不同，需要修改以下文件：

1. `vite.config.js` - 修改 `base` 配置：
   ```js
   base: '/你的仓库名/',
   ```

2. `src/main.jsx` - 修改 `basename`：
   ```jsx
   <BrowserRouter basename="/你的仓库名">
   ```

## 自定义配置

### 修改个人信息

编辑 `src/pages/Home.jsx` 文件中的相关内容。

### 添加/修改文章

编辑 `src/data/articles.js` 文件，按照现有格式添加文章。

### 修改样式

所有样式文件在对应的组件目录中，使用 CSS 变量统一管理主题色。

## 注意事项

- 文章数据存储在 `localStorage` 中，清除浏览器数据会丢失保存的文章
- GitHub Pages 部署需要几分钟时间
- 确保 `vite.config.js` 中的 `base` 配置与仓库路径一致

## 许可证

MIT License
