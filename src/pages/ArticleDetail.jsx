import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleById } from '../data/articles';
import { markdownToHtml } from '../utils/markdown';
import './ArticleDetail.css';

function ArticleDetail() {
  const { id } = useParams();
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
      <section className="article-section">
        <div className="container">
          <div className="loading">加载中...</div>
        </div>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="article-section">
        <div className="container">
          <div className="error">文章不存在</div>
        </div>
      </section>
    );
  }

  const content = markdownToHtml(article.content);

  return (
    <section className="article-section">
      <div className="container">
        <article className="article-content">
          <div className="article-header">
            <span className={`article-category ${article.category}`}>
              {article.category === 'tech' ? '技术' : '生活'}
            </span>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
          </div>
          <div 
            className="article-body"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="article-footer">
            <Link to="/" className="btn btn-secondary">返回首页</Link>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ArticleDetail;
