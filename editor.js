// 编辑器功能
let articleIdCounter = 1000; // 从1000开始，避免与预设文章ID冲突

// 初始化编辑器
document.addEventListener('DOMContentLoaded', function() {
    // 设置默认日期为今天
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('articleDate').value = today;
    
    // 加载保存的草稿
    loadDraft();
    
    // 自动保存草稿
    const inputs = document.querySelectorAll('#articleTitle, #articleExcerpt, #articleContent, #articleCategory, #articleDate, #articleReadTime');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(saveDraft, 1000));
    });
});

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 保存草稿到 localStorage
function saveDraft() {
    const draft = {
        title: document.getElementById('articleTitle').value,
        excerpt: document.getElementById('articleExcerpt').value,
        content: document.getElementById('articleContent').value,
        category: document.getElementById('articleCategory').value,
        date: document.getElementById('articleDate').value,
        readTime: document.getElementById('articleReadTime').value
    };
    localStorage.setItem('articleDraft', JSON.stringify(draft));
}

// 加载草稿
function loadDraft() {
    const draft = localStorage.getItem('articleDraft');
    if (draft) {
        try {
            const data = JSON.parse(draft);
            document.getElementById('articleTitle').value = data.title || '';
            document.getElementById('articleExcerpt').value = data.excerpt || '';
            document.getElementById('articleContent').value = data.content || '';
            document.getElementById('articleCategory').value = data.category || 'tech';
            document.getElementById('articleDate').value = data.date || new Date().toISOString().split('T')[0];
            document.getElementById('articleReadTime').value = data.readTime || '';
        } catch (e) {
            console.error('加载草稿失败:', e);
        }
    }
}

// 清除草稿
function clearDraft() {
    localStorage.removeItem('articleDraft');
}

// 插入 Markdown 语法
function insertMarkdown(before, after) {
    const textarea = document.getElementById('articleContent');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const newText = before + selectedText + after;
    
    textarea.value = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
    textarea.focus();
    textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
}

// 插入代码块
function insertCodeBlock() {
    const textarea = document.getElementById('articleContent');
    const start = textarea.selectionStart;
    const codeBlock = '\n```python\n\n```\n';
    
    textarea.value = textarea.value.substring(0, start) + codeBlock + textarea.value.substring(start);
    textarea.focus();
    const newPos = start + codeBlock.length - 4;
    textarea.setSelectionRange(newPos, newPos);
}

// 预览文章
function previewArticle() {
    const title = document.getElementById('articleTitle').value;
    const excerpt = document.getElementById('articleExcerpt').value;
    const content = document.getElementById('articleContent').value;
    const category = document.getElementById('articleCategory').value;
    const date = document.getElementById('articleDate').value;
    const readTime = document.getElementById('articleReadTime').value;
    
    if (!title || !content) {
        alert('请填写标题和内容');
        return;
    }
    
    const htmlContent = markdownToHtml(content);
    
    const previewHTML = `
        <div class="preview-article">
            <div class="preview-header">
                <span class="article-category ${category}">
                    ${category === 'tech' ? '技术' : '生活'}
                </span>
                <h1>${title}</h1>
                ${excerpt ? `<p style="color: var(--text-secondary); font-size: 18px; margin: 16px 0;">${excerpt}</p>` : ''}
                <div style="display: flex; gap: 24px; font-size: 14px; color: var(--text-tertiary); margin-top: 16px;">
                    <span>${date}</span>
                    ${readTime ? `<span>${readTime}</span>` : ''}
                </div>
            </div>
            <div class="preview-body">
                ${htmlContent}
            </div>
        </div>
    `;
    
    document.getElementById('previewContent').innerHTML = previewHTML;
    document.getElementById('previewModal').classList.add('show');
}

// 关闭预览
function closePreview() {
    document.getElementById('previewModal').classList.remove('show');
}

// 保存文章
function saveArticle() {
    const title = document.getElementById('articleTitle').value.trim();
    const excerpt = document.getElementById('articleExcerpt').value.trim();
    const content = document.getElementById('articleContent').value.trim();
    const category = document.getElementById('articleCategory').value;
    const date = document.getElementById('articleDate').value;
    const readTime = document.getElementById('articleReadTime').value.trim() || '5分钟';
    
    if (!title) {
        alert('请输入文章标题');
        return;
    }
    
    if (!content) {
        alert('请输入文章内容');
        return;
    }
    
    // 创建新文章对象
    const newArticle = {
        id: articleIdCounter++,
        title: title,
        excerpt: excerpt || content.substring(0, 100) + '...',
        content: content,
        category: category,
        date: date || new Date().toISOString().split('T')[0],
        readTime: readTime
    };
    
    // 保存到 localStorage
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    savedArticles.push(newArticle);
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
    
    // 清除草稿
    clearDraft();
    
    // 清空表单
    document.getElementById('articleTitle').value = '';
    document.getElementById('articleExcerpt').value = '';
    document.getElementById('articleContent').value = '';
    document.getElementById('articleCategory').value = 'tech';
    document.getElementById('articleDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('articleReadTime').value = '';
    
    // 提示并跳转
    alert('文章保存成功！');
    window.location.href = `article.html?id=${newArticle.id}`;
}

// Markdown 转 HTML（与 script.js 中的函数相同）
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

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        closePreview();
    }
}
