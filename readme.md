# 个人博客首页

一个简洁美观的个人博客首页，专注于后端技术分享和生活记录。

## 项目简介

这是一个静态的个人博客首页项目，采用纯HTML/CSS/JavaScript实现，无需后端服务器即可运行。适合后端开发者展示技术文章和个人信息。

## 功能特性

- ✅ 响应式设计，支持移动端和桌面端
- ✅ 现代化UI设计，美观大方
- ✅ 文章分类筛选（技术/生活）
- ✅ 平滑滚动导航
- ✅ 技术栈展示
- ✅ 联系方式展示

## 项目结构

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions 部署配置
├── .nojekyll             # 禁用 Jekyll 处理
├── index.html            # 主页面HTML结构
├── styles.css            # 样式文件
├── script.js             # JavaScript交互逻辑
└── readme.md             # 项目说明文档
```

## 使用方法

### 本地预览

1. 直接在浏览器中打开 `index.html` 文件即可查看效果
2. 或者使用本地服务器运行：
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (需要安装http-server)
   npx http-server
   ```
3. 访问 `http://localhost:8000` 查看博客首页

### GitHub Pages 部署

#### 方法一：使用 GitHub Actions（推荐，已配置）

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Add blog homepage"
   git push origin cursor/personal-blog-homepage-a9dc
   ```

2. **启用 GitHub Pages**
   - 进入 GitHub 仓库页面
   - 点击 `Settings` → `Pages`
   - 在 `Source` 部分选择 `GitHub Actions`
   - 保存设置

3. **等待部署完成**
   - 推送代码后，GitHub Actions 会自动触发部署
   - 在仓库的 `Actions` 标签页可以查看部署进度
   - 部署完成后，访问 `https://你的用户名.github.io/仓库名/` 即可查看

#### 方法二：手动设置 GitHub Pages

1. 进入 GitHub 仓库的 `Settings` → `Pages`
2. 在 `Source` 部分选择 `Deploy from a branch`
3. 选择分支（如 `main` 或 `cursor/personal-blog-homepage-a9dc`）
4. 选择 `/ (root)` 目录
5. 点击 `Save`
6. 等待几分钟后访问 `https://你的用户名.github.io/仓库名/`

#### 注意事项

- 如果使用自定义域名，需要在仓库根目录创建 `CNAME` 文件
- 项目已包含 `.nojekyll` 文件，确保 GitHub Pages 正确显示静态文件
- 首次部署可能需要几分钟时间

## 自定义配置

### 修改个人信息

编辑 `index.html` 文件：
- 修改导航栏标题（第15行）
- 修改英雄区域内容（第25-26行）
- 修改关于我部分（第38-39行）
- 修改技术栈标签（第42-51行）
- 修改联系方式（第88-95行）

### 添加/修改文章

编辑 `script.js` 文件中的 `articles` 数组（第2-47行），按照以下格式添加文章：

```javascript
{
    id: 7,
    title: '文章标题',
    excerpt: '文章摘要',
    category: 'tech', // 或 'life'
    date: '2024-01-20',
    readTime: '5分钟'
}
```

### 修改样式

编辑 `styles.css` 文件，可以修改：
- 主题颜色（第7-13行的CSS变量）
- 字体大小和间距
- 布局样式

## 技术栈

- HTML5
- CSS3 (使用CSS变量、Grid布局、Flexbox)
- JavaScript (ES6+)

## 后续扩展建议

- 添加文章详情页
- 集成Markdown渲染
- 添加评论功能
- 集成后端API获取文章数据
- 添加搜索功能
- 添加RSS订阅

## 注意事项

- 文章数据目前存储在 `script.js` 中，后续可以改为从API获取
- 联系方式中的链接需要替换为真实地址
- 建议部署到GitHub Pages或Vercel等静态托管平台

## 许可证

MIT License