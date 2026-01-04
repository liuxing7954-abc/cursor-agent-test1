import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getArticleById } from '../data/articles';
import { markdownToHtml } from '../utils/markdown';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const articleData = getArticleById(id);
    if (articleData) {
      setArticle(articleData);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 text-xl"
        >
          加载中...
        </motion.div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">文章不存在</h2>
          <Button onClick={() => navigate('/')}>返回首页</Button>
        </motion.div>
      </div>
    );
  }

  const content = markdownToHtml(article.content);

  return (
    <div className="min-h-screen bg-white pt-20">
      <article className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 返回按钮 */}
          <motion.div
            whileHover={{ x: -4 }}
            className="mb-12"
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="group -ml-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              返回
            </Button>
          </motion.div>

          {/* 文章头部 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-12"
          >
            <div className="mb-6">
              <span
                className={`inline-block px-5 py-2 rounded-full text-sm font-semibold ${
                  article.category === 'tech'
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-pink-50 text-pink-600'
                }`}
              >
                {article.category === 'tech' ? '技术' : '生活'}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-8 leading-tight tracking-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-lg">{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-lg">{article.readTime}</span>
              </div>
            </div>
          </motion.div>

          {/* 文章内容 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="prose prose-lg max-w-none 
              prose-headings:font-semibold 
              prose-headings:text-gray-900 
              prose-headings:tracking-tight
              prose-h1:text-4xl
              prose-h2:text-3xl
              prose-h3:text-2xl
              prose-p:text-gray-700 
              prose-p:leading-relaxed 
              prose-p:text-lg
              prose-a:text-blue-600 
              prose-a:no-underline
              prose-a:border-b-2
              prose-a:border-blue-200
              prose-a:hover:border-blue-600
              prose-strong:text-gray-900 
              prose-strong:font-semibold
              prose-code:bg-gray-100 
              prose-code:px-2
              prose-code:py-1
              prose-code:rounded
              prose-code:text-sm
              prose-code:font-mono
              prose-code:text-gray-800
              prose-pre:bg-gray-900 
              prose-pre:text-gray-100
              prose-pre:rounded-2xl
              prose-pre:shadow-xl
              prose-pre:border-0
              prose-pre:p-6
              prose-li:text-gray-700
              prose-li:text-lg
              prose-li:leading-relaxed
              prose-blockquote:border-l-4
              prose-blockquote:border-gray-300
              prose-blockquote:pl-6
              prose-blockquote:italic
              prose-blockquote:text-gray-600
            "
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* 文章底部 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 pt-12 border-t border-gray-200"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-8 text-center">
                <p className="text-xl text-gray-700 mb-6 font-light">
                  感谢阅读，如果对你有帮助，欢迎分享给更多人。
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => navigate('/')} variant="outline">
                    返回首页
                  </Button>
                  <Button onClick={() => navigate('/editor')}>
                    写文章
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </article>
    </div>
  );
}

export default ArticleDetail;
