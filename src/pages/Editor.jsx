import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { markdownToHtml } from '../utils/markdown';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

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
    setDate(new Date().toISOString().split('T')[0]);
    loadDraft();
    const saved = localStorage.getItem('articleIdCounter');
    if (saved) {
      setArticleIdCounter(parseInt(saved));
    }
  }, []);

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

    localStorage.removeItem('articleDraft');
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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-semibold mb-8">写文章</h1>
          <div className="flex gap-4 mb-8">
            <Button onClick={handlePreview} variant="outline">预览</Button>
            <Button onClick={handleSave}>保存文章</Button>
          </div>
        </motion.div>

        <Card className="mb-6">
          <CardHeader>
            <label className="text-sm font-medium mb-2 block">标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="输入文章标题"
            />
          </CardHeader>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <label className="text-sm font-medium mb-2 block">摘要</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
              placeholder="输入文章摘要"
            />
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <label className="text-sm font-medium mb-2 block">分类</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="tech">技术</option>
                <option value="life">生活</option>
              </select>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <label className="text-sm font-medium mb-2 block">日期</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <label className="text-sm font-medium mb-2 block">阅读时长</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="如：5分钟"
              />
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium">内容 (Markdown格式)</label>
              <div className="flex gap-2">
                {[
                  { label: 'H1', action: () => insertMarkdown('# ', '') },
                  { label: 'H2', action: () => insertMarkdown('## ', '') },
                  { label: 'B', action: () => insertMarkdown('**', '**') },
                  { label: 'Code', action: () => insertMarkdown('`', '`') },
                  { label: '```', action: insertCodeBlock },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={btn.action}
                    className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              id="articleContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="20"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono text-sm resize-none"
              placeholder="在这里输入文章内容，支持 Markdown 格式..."
            />
          </CardHeader>
        </Card>

        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setShowPreview(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-xl font-semibold">文章预览</h2>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="overflow-y-auto p-6 prose prose-lg max-w-none">
                  <div className="mb-6">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
                        category === 'tech'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-pink-100 text-pink-700'
                      }`}
                    >
                      {category === 'tech' ? '技术' : '生活'}
                    </span>
                    <h1 className="text-4xl font-semibold mb-4">{title || '未命名文章'}</h1>
                    {excerpt && <p className="text-gray-600 mb-4">{excerpt}</p>}
                    <div className="flex gap-6 text-gray-500 text-sm">
                      <span>{date}</span>
                      {readTime && <span>{readTime}</span>}
                    </div>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: previewContent }} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Editor;
