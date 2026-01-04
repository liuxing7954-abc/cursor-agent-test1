// 文章数据 - 这里可以后续改为从API获取
const articles = [
    {
        id: 1,
        title: 'Django REST Framework 最佳实践',
        excerpt: '分享在使用Django REST Framework开发API时的一些最佳实践和踩坑经验，包括序列化器设计、权限控制、性能优化等。',
        category: 'tech',
        date: '2024-01-15',
        readTime: '5分钟'
    },
    {
        id: 2,
        title: 'Python异步编程深入理解',
        excerpt: '从asyncio基础到实际应用，深入理解Python异步编程的核心概念和使用场景，让你的后端服务更高效。',
        category: 'tech',
        date: '2024-01-10',
        readTime: '8分钟'
    },
    {
        id: 3,
        title: '数据库索引优化实战',
        excerpt: '通过实际案例讲解MySQL索引的设计原则和优化技巧，避免慢查询，提升数据库性能。',
        category: 'tech',
        date: '2024-01-05',
        readTime: '6分钟'
    },
    {
        id: 4,
        title: 'Docker容器化部署经验分享',
        excerpt: '记录将Python应用容器化部署的完整流程，包括Dockerfile编写、docker-compose配置、生产环境注意事项。',
        category: 'tech',
        date: '2023-12-28',
        readTime: '7分钟'
    },
    {
        id: 5,
        title: '2024年技术学习计划',
        excerpt: '新的一年，制定技术学习计划，包括要深入学习的框架、要掌握的新技术，以及如何平衡工作与学习。',
        category: 'life',
        date: '2024-01-01',
        readTime: '3分钟'
    },
    {
        id: 6,
        title: '后端开发者的日常思考',
        excerpt: '分享作为后端开发者的一些日常思考，包括代码质量、技术选型、团队协作等方面的感悟。',
        category: 'life',
        date: '2023-12-20',
        readTime: '4分钟'
    }
];

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    renderArticles('all');
    setupFilterButtons();
    setupSmoothScroll();
});

// 渲染文章列表
function renderArticles(filter = 'all') {
    const articlesGrid = document.getElementById('articlesGrid');
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
            // 移除所有active类
            filterButtons.forEach(b => b.classList.remove('active'));
            // 添加active类到当前按钮
            this.classList.add('active');
            // 获取筛选值并重新渲染
            const filter = this.getAttribute('data-filter');
            renderArticles(filter);
        });
    });
}

// 文章点击处理（这里可以跳转到文章详情页）
function handleArticleClick(articleId) {
    // 后续可以跳转到文章详情页
    console.log('点击了文章:', articleId);
    // window.location.href = `/article/${articleId}`;
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