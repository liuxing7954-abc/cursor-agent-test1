import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getArticleById } from '../data/articles';
import { markdownToHtml } from '../utils/markdown';
import { Button } from '../components/ui/button';

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
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-gray-600">加载中...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-gray-600">文章不存在</div>
      </div>
    );
  }

  const content = markdownToHtml(article.content);

  return (
    <div className="min-h-screen bg-white pt-16">
      <article className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8 -ml-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回
          </Button>

          <div className="mb-8">
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6 ${
                article.category === 'tech'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-pink-100 text-pink-700'
              }`}
            >
              {article.category === 'tech' ? '技术' : '生活'}
            </span>
            <h1 className="text-5xl md:text-6xl font-semibold mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex gap-6 text-gray-600">
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </motion.div>
      </article>
    </div>
  );
}

export default ArticleDetail;
