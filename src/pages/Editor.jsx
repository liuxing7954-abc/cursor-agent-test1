import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { markdownToHtml } from '../utils/markdown';
import './Editor.css';

function Editor() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('tech');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [readTime, setReadTime] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [articleIdCounter, setArticleIdCounter] = useState(1000);

  useEffect(() => {
    // 设置默认日期
    setDate(new Date().toISOString().split('T')[0]);
    
    // 加载草稿
    loadDraft();
    
    // 加载计数器
    const saved = localStorage.getItem('articleIdCounter');
    if (saved) {
      setArticleIdCounter(parseInt(saved));
    }
  }, []);

  // 自动保存草稿
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft();
    }, 1000);
    return () => clearTimeout(timer);
  }, [title, excerpt, content, category, date, readTime]);

  const saveDraft = () => {
    const draft = { title, excerpt, content, category, date, readTime };
    localStorage.setItem('articleDraft', JSON.stringify(draft));
  };

  const loadDraft = () => {
    const draft = localStorage.getItem('articleDraft');
    if (draft) {
      try {
        const data = JSON.parse(draft);
        setTitle(data.title || '');
        setExcerpt(data.excerpt || '');
        setContent(data.content || '');
        setCategory(data.category || 'tech');
        setDate(data.date || new Date().toISOString().split('T')[0]);
        setReadTime(data.readTime || '');
      } catch (e) {
        console.error('加载草稿失败:', e);
      }
    }
  };

  const clearDraft = () => {
    localStorage.removeItem('articleDraft');
  };

  const insertMarkdown = (before, after) => {
    const textarea = document.getElementById('articleContent');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = before + selectedText + after;
    
    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const insertCodeBlock = () => {
    const textarea = document.getElementById('articleContent');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const codeBlock = '\n```python\n\n```\n';
    
    const newContent = content.substring(0, start) + codeBlock + content.substring(start);
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      const newPos = start + codeBlock.length - 4;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handlePreview = () => {
    if (!title || !content) {
      alert('请填写标题和内容');
      return;
    }
    setShowPreview(true);
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('请输入文章标题');
      return;
    }
    
    if (!content.trim()) {
      alert('请输入文章内容');
      return;
    }

    const newArticle = {
      id: articleIdCounter,
      title: title.trim(),
      excerpt: excerpt.trim() || content.substring(0, 100) + '...',
      content: content.trim(),
      category,
      date: date || new Date().toISOString().split('T')[0],
      readTime: readTime.trim() || '5分钟'
    };

    const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    savedArticles.push(newArticle);
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
    localStorage.setItem('articleIdCounter', (articleIdCounter + 1).toString());

    clearDraft();
    
    // 清空表单
    setTitle('');
    setExcerpt('');
    setContent('');
    setCategory('tech');
    setDate(new Date().toISOString().split('T')[0]);
    setReadTime('');

    alert('文章保存成功！');
    navigate(`/article/${newArticle.id}`);
  };

  const previewContent = markdownToHtml(content);

  return (
    <section className="editor-section">
      <div className="container">
        <div className="editor-container">
          <div className="editor-header">
            <h2 className="editor-title">写文章</h2>
            <div className="editor-actions">
              <button className="btn btn-secondary" onClick={handlePreview}>预览</button>
              <button className="btn btn-primary" onClick={handleSave}>保存文章</button>
            </div>
          </div>

          <div className="editor-form">
            <div className="form-group">
              <label htmlFor="articleTitle">标题</label>
              <input
                type="text"
                id="articleTitle"
                className="form-input"
                placeholder="输入文章标题"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="articleExcerpt">摘要</label>
              <textarea
                id="articleExcerpt"
                className="form-textarea"
                rows="3"
                placeholder="输入文章摘要"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="articleCategory">分类</label>
                <select
                  id="articleCategory"
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="tech">技术</option>
                  <option value="life">生活</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="articleDate">日期</label>
                <input
                  type="date"
                  id="articleDate"
                  className="form-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="articleReadTime">阅读时长</label>
                <input
                  type="text"
                  id="articleReadTime"
                  className="form-input"
                  placeholder="如：5分钟"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="articleContent">内容 (Markdown格式)</label>
              <div className="editor-toolbar">
                <button className="toolbar-btn" onClick={() => insertMarkdown('# ', '')} title="标题">H1</button>
                <button className="toolbar-btn" onClick={() => insertMarkdown('## ', '')} title="二级标题">H2</button>
                <button className="toolbar-btn" onClick={() => insertMarkdown('**', '**')} title="粗体">B</button>
                <button className="toolbar-btn" onClick={() => insertMarkdown('`', '`')} title="行内代码">Code</button>
                <button className="toolbar-btn" onClick={insertCodeBlock} title="代码块">```</button>
                <button className="toolbar-btn" onClick={() => insertMarkdown('- ', '')} title="列表">List</button>
              </div>
              <textarea
                id="articleContent"
                className="form-textarea editor-textarea"
                rows="20"
                placeholder="在这里输入文章内容，支持 Markdown 格式..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 预览模态框 */}
        {showPreview && (
          <div className="modal show" onClick={() => setShowPreview(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>文章预览</h3>
                <button className="modal-close" onClick={() => setShowPreview(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <div className="preview-article">
                  <div className="preview-header">
                    <span className={`article-category ${category}`}>
                      {category === 'tech' ? '技术' : '生活'}
                    </span>
                    <h1>{title || '未命名文章'}</h1>
                    {excerpt && <p style={{ color: 'var(--text-secondary)', fontSize: '18px', margin: '16px 0' }}>{excerpt}</p>}
                    <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'var(--text-tertiary)', marginTop: '16px' }}>
                      <span>{date}</span>
                      {readTime && <span>{readTime}</span>}
                    </div>
                  </div>
                  <div 
                    className="preview-body"
                    dangerouslySetInnerHTML={{ __html: previewContent }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowPreview(false)}>关闭</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Editor;
