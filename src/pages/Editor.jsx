import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Eye, Type, Code, List, Bold } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10">
        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">写文章</h1>
          <div className="flex gap-3">
            <Button 
              onClick={handlePreview} 
              variant="outline"
              className="group"
            >
              <Eye className="mr-2 h-4 w-4" />
              预览
            </Button>
            <Button 
              onClick={handleSave}
              className="group"
            >
              <Save className="mr-2 h-4 w-4" />
              保存文章
            </Button>
          </div>
        </motion.div>

        {/* 表单区域 */}
        <div className="space-y-5">
          {/* 标题 */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg mb-3">标题</CardTitle>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="输入文章标题"
              />
            </CardHeader>
          </Card>

          {/* 摘要 */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg mb-3">摘要</CardTitle>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows="3"
                className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none transition-all"
                placeholder="输入文章摘要"
              />
            </CardHeader>
          </Card>

          {/* 元信息 */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base mb-3">分类</CardTitle>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                >
                  <option value="tech">技术</option>
                  <option value="life">生活</option>
                </select>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base mb-3">日期</CardTitle>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base mb-3">阅读时长</CardTitle>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="如：5分钟"
                />
              </CardHeader>
            </Card>
          </div>

          {/* 内容编辑器 */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between mb-3">
                <CardTitle className="text-lg">内容 (Markdown格式)</CardTitle>
                <div className="flex gap-2">
                  {[
                    { icon: Type, label: 'H1', action: () => insertMarkdown('# ', '') },
                    { icon: Type, label: 'H2', action: () => insertMarkdown('## ', '') },
                    { icon: Bold, label: 'B', action: () => insertMarkdown('**', '**') },
                    { icon: Code, label: 'Code', action: () => insertMarkdown('`', '`') },
                    { icon: Code, label: '```', action: insertCodeBlock },
                    { icon: List, label: 'List', action: () => insertMarkdown('- ', '') },
                  ].map((btn) => (
                    <motion.button
                      key={btn.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={btn.action}
                      className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                      title={btn.label}
                    >
                      <btn.icon className="h-3.5 w-3.5" />
                    </motion.button>
                  ))}
                </div>
              </div>
              <textarea
                id="articleContent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="20"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-mono text-sm resize-none transition-all"
                placeholder="在这里输入文章内容，支持 Markdown 格式..."
              />
            </CardHeader>
          </Card>
        </div>

        {/* 预览模态框 */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowPreview(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
              >
                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">文章预览</h2>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="overflow-y-auto p-6 prose prose-base max-w-none">
                  <div className="mb-6">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 ${
                        category === 'tech'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-pink-50 text-pink-600'
                      }`}
                    >
                      {category === 'tech' ? '技术' : '生活'}
                    </span>
                    <h1 className="text-3xl font-semibold mb-3">{title || '未命名文章'}</h1>
                    {excerpt && <p className="text-lg text-gray-600 mb-3">{excerpt}</p>}
                    <div className="flex gap-4 text-gray-500 text-sm">
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
