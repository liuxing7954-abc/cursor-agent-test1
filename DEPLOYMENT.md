# GitHub Pages 部署故障排查指南

## 问题诊断

如果 GitHub Pages 没有成功部署，请按以下步骤检查：

## 方案一：使用 GitHub Actions（推荐）

### 步骤 1：检查仓库设置
1. 进入仓库：https://github.com/liuxing7954-abc/cursor-agent-test1
2. 点击 `Settings` → `Pages`
3. 检查 `Source` 是否选择了 `GitHub Actions`
4. 如果没有，选择 `GitHub Actions` 并保存

### 步骤 2：检查 Actions 权限
1. 在 `Settings` → `Actions` → `General`
2. 确保 `Workflow permissions` 设置为：
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests

### 步骤 3：检查 Actions 运行状态
1. 点击仓库顶部的 `Actions` 标签
2. 查看是否有 "Deploy to GitHub Pages" 工作流
3. 如果有错误，点击查看详细错误信息

### 步骤 4：手动触发部署
1. 进入 `Actions` 标签
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 `Run workflow` → `Run workflow`

## 方案二：使用传统分支部署（备选）

如果 GitHub Actions 有问题，可以使用传统方式：

### 步骤 1：合并到 main 分支
```bash
git checkout main
git merge cursor/personal-blog-homepage-a9dc
git push origin main
```

### 步骤 2：在 GitHub 设置 Pages
1. 进入 `Settings` → `Pages`
2. 在 `Source` 选择 `Deploy from a branch`
3. 选择分支：`main`
4. 选择文件夹：`/ (root)`
5. 点击 `Save`

## 常见问题

### 问题 1：Actions 工作流没有运行
- **原因**：可能没有启用 Actions
- **解决**：Settings → Actions → General → 启用 Actions

### 问题 2：部署失败，提示权限不足
- **原因**：Workflow permissions 设置不正确
- **解决**：Settings → Actions → General → Workflow permissions → Read and write permissions

### 问题 3：404 错误
- **原因**：Pages 还没有部署完成，或者路径不对
- **解决**：等待几分钟后重试，或检查 Settings → Pages 中的 URL

### 问题 4：仓库是私有的
- **原因**：私有仓库需要 GitHub Pro/Team/Enterprise 账户才能使用 GitHub Pages
- **解决**：将仓库设为公开，或升级账户

## 验证部署

部署成功后，访问：
```
https://liuxing7954-abc.github.io/cursor-agent-test1/
```

如果看到博客首页，说明部署成功！
