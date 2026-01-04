// 文章数据 - 包含完整内容
const articles = [
    {
        id: 1,
        title: 'Django REST Framework 最佳实践',
        excerpt: '分享在使用Django REST Framework开发API时的一些最佳实践和踩坑经验，包括序列化器设计、权限控制、性能优化等。',
        category: 'tech',
        date: '2024-01-15',
        readTime: '5分钟',
        content: `# Django REST Framework 最佳实践

## 前言

在使用 Django REST Framework (DRF) 开发 API 的过程中，我踩过不少坑，也总结了一些最佳实践。今天分享给大家，希望能帮助到正在使用 DRF 的开发者。

## 1. 序列化器的设计原则

### 使用 ModelSerializer 还是 Serializer？

对于简单的 CRUD 操作，优先使用 \`ModelSerializer\`，它能自动生成字段，减少代码量：

\`\`\`python
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined']
\`\`\`

但对于复杂的业务逻辑，使用 \`Serializer\` 更灵活：

\`\`\`python
class OrderSerializer(serializers.Serializer):
    items = serializers.ListField(child=serializers.DictField())
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    
    def validate_total_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("总价必须大于0")
        return value
\`\`\`

## 2. 权限控制

DRF 的权限系统非常强大，合理使用能大大提升 API 的安全性：

\`\`\`python
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        if self.action == 'destroy':
            return [IsAdminUser()]
        return super().get_permissions()
\`\`\`

## 3. 性能优化

### 使用 select_related 和 prefetch_related

避免 N+1 查询问题：

\`\`\`python
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.select_related('author').prefetch_related('tags')
\`\`\`

### 分页设置

合理设置分页大小，避免一次性返回过多数据：

\`\`\`python
REST_FRAMEWORK = {
    'PAGE_SIZE': 20,
    'PAGE_SIZE_QUERY_PARAM': 'page_size',
    'MAX_PAGE_SIZE': 100
}
\`\`\`

## 4. 错误处理

统一错误响应格式：

\`\`\`python
from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        custom_response_data = {
            'error': {
                'code': response.status_code,
                'message': response.data.get('detail', 'An error occurred'),
                'details': response.data
            }
        }
        response.data = custom_response_data
    return response
\`\`\`

## 总结

DRF 是一个功能强大的框架，掌握这些最佳实践能让你的 API 更加健壮和高效。记住，没有银弹，根据实际业务场景选择合适的方式才是最重要的。`
    },
    {
        id: 2,
        title: 'Python异步编程深入理解',
        excerpt: '从asyncio基础到实际应用，深入理解Python异步编程的核心概念和使用场景，让你的后端服务更高效。',
        category: 'tech',
        date: '2024-01-10',
        readTime: '8分钟',
        content: `# Python异步编程深入理解

## 什么是异步编程？

异步编程是一种并发编程模式，允许程序在等待 I/O 操作（如网络请求、文件读写）时继续执行其他任务，而不是阻塞等待。

## asyncio 核心概念

### 1. 协程 (Coroutine)

协程是异步函数，使用 \`async def\` 定义：

\`\`\`python
import asyncio

async def fetch_data(url):
    # 模拟网络请求
    await asyncio.sleep(1)
    return f"Data from {url}"

# 运行协程
result = asyncio.run(fetch_data("https://api.example.com"))
\`\`\`

### 2. await 关键字

\`await\` 用于等待异步操作完成：

\`\`\`python
async def main():
    data1 = await fetch_data("url1")
    data2 = await fetch_data("url2")
    return [data1, data2]
\`\`\`

### 3. 并发执行

使用 \`asyncio.gather()\` 并发执行多个协程：

\`\`\`python
async def main():
    results = await asyncio.gather(
        fetch_data("url1"),
        fetch_data("url2"),
        fetch_data("url3")
    )
    return results
\`\`\`

## 实际应用场景

### 1. 高并发 API 请求

\`\`\`python
import aiohttp

async def fetch_multiple_urls(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [session.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)
        return [await r.json() for r in responses]
\`\`\`

### 2. 数据库操作

使用异步数据库驱动（如 \`asyncpg\`、\`aiomysql\`）：

\`\`\`python
import asyncpg

async def get_users():
    conn = await asyncpg.connect('postgresql://...')
    users = await conn.fetch('SELECT * FROM users')
    await conn.close()
    return users
\`\`\`

## 注意事项

1. **不要阻塞事件循环**：避免在异步函数中使用同步的阻塞操作
2. **合理使用并发**：过多的并发可能导致资源耗尽
3. **错误处理**：使用 try-except 捕获异步操作的异常

## 总结

异步编程是 Python 后端开发的重要技能，特别适合 I/O 密集型应用。掌握 asyncio 能让你的服务性能提升数倍。`
    },
    {
        id: 3,
        title: '数据库索引优化实战',
        excerpt: '通过实际案例讲解MySQL索引的设计原则和优化技巧，避免慢查询，提升数据库性能。',
        category: 'tech',
        date: '2024-01-05',
        readTime: '6分钟',
        content: `# 数据库索引优化实战

## 索引的重要性

索引是数据库性能优化的关键。一个设计良好的索引能让查询速度提升几十倍甚至上百倍。

## 索引类型

### 1. 主键索引 (Primary Key)

主键自动创建唯一索引：

\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100)
);
\`\`\`

### 2. 普通索引 (Index)

\`\`\`sql
CREATE INDEX idx_username ON users(username);
\`\`\`

### 3. 复合索引 (Composite Index)

\`\`\`sql
CREATE INDEX idx_user_status ON users(status, created_at);
\`\`\`

## 索引设计原则

### 1. 最左前缀原则

对于复合索引 \`(a, b, c)\`，以下查询可以使用索引：

- \`WHERE a = ?\`
- \`WHERE a = ? AND b = ?\`
- \`WHERE a = ? AND b = ? AND c = ?\`

但 \`WHERE b = ?\` 不能使用索引。

### 2. 选择性高的字段优先

选择性 = 不同值的数量 / 总行数

选择性高的字段（如用户ID）更适合建索引。

### 3. 避免过多索引

每个索引都会占用存储空间，并在写入时增加开销。

## 实战案例

### 案例1：慢查询优化

**原始查询：**

\`\`\`sql
SELECT * FROM orders 
WHERE user_id = 123 AND status = 'pending' 
ORDER BY created_at DESC;
\`\`\`

**优化方案：**

\`\`\`sql
-- 创建复合索引
CREATE INDEX idx_user_status_created ON orders(user_id, status, created_at);
\`\`\`

### 案例2：覆盖索引

如果查询只需要索引字段，可以使用覆盖索引避免回表：

\`\`\`sql
-- 查询只需要 user_id 和 status
SELECT user_id, status FROM orders WHERE user_id = 123;

-- 创建覆盖索引
CREATE INDEX idx_user_status ON orders(user_id, status);
\`\`\`

## 索引监控

使用 \`EXPLAIN\` 分析查询计划：

\`\`\`sql
EXPLAIN SELECT * FROM users WHERE username = 'test';
\`\`\`

关注：
- \`type\`: 应该是 \`ref\` 或 \`range\`，避免 \`ALL\`（全表扫描）
- \`key\`: 使用的索引名称
- \`rows\`: 扫描的行数

## 总结

索引优化需要结合实际业务场景，通过 EXPLAIN 分析慢查询，逐步优化。记住：索引不是越多越好，合适的才是最好的。`
    },
    {
        id: 4,
        title: 'Docker容器化部署经验分享',
        excerpt: '记录将Python应用容器化部署的完整流程，包括Dockerfile编写、docker-compose配置、生产环境注意事项。',
        category: 'tech',
        date: '2023-12-28',
        readTime: '7分钟',
        content: `# Docker容器化部署经验分享

## 为什么使用 Docker？

Docker 解决了"在我机器上能跑"的问题，通过容器化实现环境一致性，简化部署流程。

## Dockerfile 最佳实践

### 1. 多阶段构建

减少镜像大小：

\`\`\`dockerfile
# 构建阶段
FROM python:3.11-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# 运行阶段
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python", "app.py"]
\`\`\`

### 2. 合理使用 .dockerignore

避免复制不必要的文件：

\`\`\`
__pycache__
*.pyc
.git
.env
*.log
\`\`\`

### 3. 使用非 root 用户

提高安全性：

\`\`\`dockerfile
RUN useradd -m -u 1000 appuser
USER appuser
\`\`\`

## docker-compose 配置

\`\`\`yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
      - redis
    
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    
  redis:
    image: redis:7-alpine
    
volumes:
  postgres_data:
\`\`\`

## 生产环境注意事项

### 1. 健康检查

\`\`\`yaml
services:
  web:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
\`\`\`

### 2. 资源限制

\`\`\`yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
\`\`\`

### 3. 日志管理

\`\`\`yaml
services:
  web:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
\`\`\`

## 部署流程

\`\`\`bash
# 1. 构建镜像
docker-compose build

# 2. 启动服务
docker-compose up -d

# 3. 查看日志
docker-compose logs -f

# 4. 停止服务
docker-compose down
\`\`\`

## 总结

Docker 容器化让部署变得简单，但要注意镜像大小、安全性和资源管理。合理使用 Docker 能大大提升开发和运维效率。`
    },
    {
        id: 5,
        title: 'FastAPI 性能优化技巧',
        excerpt: '分享 FastAPI 框架的性能优化经验，包括异步处理、数据库连接池、缓存策略等实用技巧。',
        category: 'tech',
        date: '2024-01-20',
        readTime: '10分钟',
        content: `# FastAPI 性能优化技巧

## FastAPI 的优势

FastAPI 是一个现代、快速的 Python Web 框架，基于标准 Python 类型提示，性能接近 Node.js 和 Go。

## 1. 异步路由处理

充分利用 FastAPI 的异步特性：

\`\`\`python
from fastapi import FastAPI
import asyncio

app = FastAPI()

@app.get("/async-endpoint")
async def async_endpoint():
    # 异步操作
    await asyncio.sleep(0.1)
    return {"message": "Hello"}
\`\`\`

## 2. 数据库连接池

使用异步数据库驱动和连接池：

\`\`\`python
from databases import Database

database = Database("postgresql://user:pass@localhost/db")

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
\`\`\`

## 3. 响应缓存

使用缓存减少数据库查询：

\`\`\`python
from functools import lru_cache
import redis

redis_client = redis.Redis(host='localhost', port=6379)

@app.get("/cached-data")
async def cached_data(key: str):
    cached = redis_client.get(key)
    if cached:
        return json.loads(cached)
    
    data = await fetch_from_db(key)
    redis_client.setex(key, 3600, json.dumps(data))
    return data
\`\`\`

## 4. 依赖注入优化

合理使用依赖注入，避免重复代码：

\`\`\`python
from fastapi import Depends

async def get_db():
    async with database.transaction():
        yield database

@app.get("/users")
async def get_users(db: Database = Depends(get_db)):
    return await db.fetch_all("SELECT * FROM users")
\`\`\`

## 5. 响应压缩

启用 Gzip 压缩：

\`\`\`python
from fastapi.middleware.gzip import GZipMiddleware

app.add_middleware(GZipMiddleware, minimum_size=1000)
\`\`\`

## 性能测试

使用 \`locust\` 进行压力测试：

\`\`\`python
from locust import HttpUser, task

class WebsiteUser(HttpUser):
    @task
    def get_users(self):
        self.client.get("/users")
\`\`\`

## 总结

FastAPI 的性能优化需要从多个方面入手：异步处理、数据库优化、缓存策略等。合理使用这些技巧能让你的 API 性能提升数倍。`
    },
    {
        id: 6,
        title: 'Redis 缓存策略实战',
        excerpt: '深入讲解 Redis 在项目中的实际应用，包括缓存穿透、缓存雪崩、缓存击穿的解决方案。',
        category: 'tech',
        date: '2024-01-18',
        readTime: '9分钟',
        content: `# Redis 缓存策略实战

## Redis 简介

Redis 是一个高性能的内存数据库，常用于缓存、消息队列、会话存储等场景。

## 常见缓存问题

### 1. 缓存穿透

**问题**：查询不存在的数据，导致请求直接打到数据库。

**解决方案**：缓存空值

\`\`\`python
def get_user(user_id):
    cache_key = f"user:{user_id}"
    cached = redis.get(cache_key)
    
    if cached is not None:
        return json.loads(cached) if cached else None
    
    user = db.query_user(user_id)
    if user:
        redis.setex(cache_key, 3600, json.dumps(user))
    else:
        # 缓存空值，设置较短的过期时间
        redis.setex(cache_key, 60, "")
    
    return user
\`\`\`

### 2. 缓存雪崩

**问题**：大量缓存同时过期，导致请求全部打到数据库。

**解决方案**：随机过期时间

\`\`\`python
import random

def set_cache(key, value, base_ttl=3600):
    # 在基础 TTL 基础上增加随机时间
    ttl = base_ttl + random.randint(0, 600)
    redis.setex(key, ttl, value)
\`\`\`

### 3. 缓存击穿

**问题**：热点数据过期，大量并发请求同时查询数据库。

**解决方案**：分布式锁

\`\`\`python
import time

def get_hot_data(key):
    data = redis.get(key)
    if data:
        return json.loads(data)
    
    # 尝试获取锁
    lock_key = f"lock:{key}"
    if redis.set(lock_key, "1", nx=True, ex=10):
        try:
            # 查询数据库
            data = db.query(key)
            redis.setex(key, 3600, json.dumps(data))
            return data
        finally:
            redis.delete(lock_key)
    else:
        # 等待其他线程加载
        time.sleep(0.1)
        return get_hot_data(key)
\`\`\`

## 缓存更新策略

### 1. Cache Aside（旁路缓存）

先更新数据库，再删除缓存：

\`\`\`python
def update_user(user_id, data):
    db.update_user(user_id, data)
    redis.delete(f"user:{user_id}")
\`\`\`

### 2. Write Through（写穿）

先更新缓存，再更新数据库：

\`\`\`python
def update_user(user_id, data):
    redis.setex(f"user:{user_id}", 3600, json.dumps(data))
    db.update_user(user_id, data)
\`\`\`

## 总结

Redis 缓存策略需要根据业务场景选择，注意处理缓存穿透、雪崩、击穿等问题，合理设置过期时间和更新策略。`
    },
    {
        id: 7,
        title: '2024年技术学习计划',
        excerpt: '新的一年，制定技术学习计划，包括要深入学习的框架、要掌握的新技术，以及如何平衡工作与学习。',
        category: 'life',
        date: '2024-01-01',
        readTime: '3分钟',
        content: `# 2024年技术学习计划

## 学习目标

新的一年开始了，是时候制定一个清晰的技术学习计划了。

## 重点学习方向

### 1. 深入理解异步编程

- 深入学习 asyncio 的高级特性
- 掌握异步数据库操作
- 学习异步 Web 框架的最佳实践

### 2. 微服务架构

- 学习服务拆分原则
- 掌握服务间通信机制
- 了解分布式系统的挑战

### 3. 系统设计

- 学习高并发系统设计
- 掌握缓存、消息队列的使用
- 了解分布式一致性

## 学习方法

1. **项目驱动**：通过实际项目学习新技术
2. **写博客**：总结学习心得，加深理解
3. **开源贡献**：参与开源项目，学习优秀代码

## 时间安排

- 工作日：每天1小时学习时间
- 周末：集中学习4-6小时
- 每月：完成一个小项目

## 总结

学习是一个持续的过程，不要急于求成。制定计划很重要，但更重要的是坚持执行。加油！`
    },
    {
        id: 8,
        title: '后端开发者的日常思考',
        excerpt: '分享作为后端开发者的一些日常思考，包括代码质量、技术选型、团队协作等方面的感悟。',
        category: 'life',
        date: '2023-12-20',
        readTime: '4分钟',
        content: `# 后端开发者的日常思考

## 关于代码质量

代码不仅要能跑，还要易读、易维护。好的代码是给未来的自己或同事看的。

## 技术选型的思考

选择技术时，要考虑：
- 团队熟悉程度
- 社区活跃度
- 长期维护成本
- 性能要求

不要为了用新技术而用新技术。

## 团队协作

后端开发不是一个人的战斗，良好的沟通和协作至关重要。

## 持续学习

技术更新很快，保持学习的心态很重要。但也不要盲目追新，基础扎实才是根本。

## 总结

作为后端开发者，我们不仅要写代码，还要思考如何写出更好的代码，如何更好地协作，如何持续成长。`
    }
];

// 从 localStorage 加载保存的文章
function loadSavedArticles() {
    const saved = localStorage.getItem('savedArticles');
    if (saved) {
        try {
            const savedArticles = JSON.parse(saved);
            // 合并保存的文章到文章列表
            articles.push(...savedArticles);
        } catch (e) {
            console.error('加载保存的文章失败:', e);
        }
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    loadSavedArticles();
    
    // 检查是否是文章详情页
    if (document.getElementById('articleDetail')) {
        loadArticleDetail();
    } else if (document.getElementById('articlesGrid')) {
        // 首页文章列表
        renderArticles('all');
        setupFilterButtons();
    }
    
    setupSmoothScroll();
});

// 渲染文章列表
function renderArticles(filter = 'all') {
    const articlesGrid = document.getElementById('articlesGrid');
    if (!articlesGrid) return;
    
    const filteredArticles = filter === 'all' 
        ? articles 
        : articles.filter(article => article.category === filter);
    
    articlesGrid.innerHTML = filteredArticles.map(article => `
        <div class="article-card" onclick="handleArticleClick(${article.id})">
            <span class="article-category ${article.category}">
                ${article.category === 'tech' ? '技术' : '生活'}
            </span>
            <h3 class="article-title">${article.title}</h3>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-meta">
                <span>${article.date}</span>
                <span>${article.readTime}</span>
            </div>
        </div>
    `).join('');
}

// 设置筛选按钮事件
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            renderArticles(filter);
        });
    });
}

// 文章点击处理
function handleArticleClick(articleId) {
    window.location.href = `article.html?id=${articleId}`;
}

// 加载文章详情
function loadArticleDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get('id'));
    
    if (!articleId) {
        document.getElementById('articleDetail').innerHTML = '<p>文章不存在</p>';
        return;
    }
    
    // 先从预设文章查找
    let article = articles.find(a => a.id === articleId);
    
    // 如果没找到，从保存的文章中查找
    if (!article) {
        const saved = localStorage.getItem('savedArticles');
        if (saved) {
            try {
                const savedArticles = JSON.parse(saved);
                article = savedArticles.find(a => a.id === articleId);
            } catch (e) {
                console.error('加载保存的文章失败:', e);
            }
        }
    }
    
    if (!article) {
        document.getElementById('articleDetail').innerHTML = '<p>文章不存在</p>';
        return;
    }
    
    renderArticleDetail(article);
}

// 渲染文章详情
function renderArticleDetail(article) {
    const articleDetail = document.getElementById('articleDetail');
    
    // 简单的 Markdown 转 HTML（简化版）
    const content = markdownToHtml(article.content);
    
    articleDetail.innerHTML = `
        <article class="article-content">
            <div class="article-header">
                <span class="article-category ${article.category}">
                    ${article.category === 'tech' ? '技术' : '生活'}
                </span>
                <h1 class="article-title">${article.title}</h1>
                <div class="article-meta">
                    <span>${article.date}</span>
                    <span>${article.readTime}</span>
                </div>
            </div>
            <div class="article-body">
                ${content}
            </div>
            <div class="article-footer">
                <a href="index.html" class="btn btn-secondary">返回首页</a>
            </div>
        </article>
    `;
}

// 简单的 Markdown 转 HTML（简化版）
function markdownToHtml(markdown) {
    let html = markdown;
    
    // 标题
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // 代码块
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    
    // 行内代码
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // 粗体
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 段落
    html = html.split('\n\n').map(para => {
        if (!para.trim()) return '';
        if (para.startsWith('<')) return para;
        return `<p>${para}</p>`;
    }).join('\n');
    
    // 列表
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    return html;
}

// 平滑滚动
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
