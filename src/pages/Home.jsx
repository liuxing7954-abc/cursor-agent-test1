import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllArticles } from '../data/articles';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const allArticles = getAllArticles();
    setArticles(allArticles);
  }, []);

  const filteredArticles = filter === 'all' 
    ? articles 
    : articles.filter(article => article.category === filter);

  const handleArticleClick = (id) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="home">
      {/* 英雄区域 */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-line">后端开发者的</span>
              <span className="title-line highlight">技术分享</span>
            </h1>
            <p className="hero-description">
              专注后端技术，分享开发经验与生活感悟
            </p>
            <div className="hero-actions">
              <a href="#articles" className="btn btn-primary">查看文章</a>
              <a href="#about" className="btn btn-secondary">了解更多</a>
            </div>
          </div>
        </div>
      </section>

      {/* 关于我 */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">关于我</h2>
            <p className="section-subtitle">Backend Developer</p>
          </div>
          <div className="about-grid">
            <div className="about-card">
              <div className="card-content">
                <p className="about-text">
                  你好，我是一名后端开发者，专注于构建稳定、高效的服务器端应用。
                </p>
                <p className="about-text">
                  在这个博客里，我会分享后端开发的技术经验、踩坑记录，以及一些生活感悟。
                </p>
              </div>
            </div>
            <div className="about-card">
              <h3 className="card-title">技术栈</h3>
              <div className="tech-stack">
                {['Python', 'Django', 'Flask', 'FastAPI', 'MySQL', 'PostgreSQL', 'Redis', 'Docker', 'Linux', 'Git'].map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 文章列表 */}
      <section id="articles" className="articles">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">最新文章</h2>
            <p className="section-subtitle">Latest Articles</p>
          </div>
          <div className="filter-tabs">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              全部
            </button>
            <button 
              className={`filter-btn ${filter === 'tech' ? 'active' : ''}`}
              onClick={() => setFilter('tech')}
            >
              技术
            </button>
            <button 
              className={`filter-btn ${filter === 'life' ? 'active' : ''}`}
              onClick={() => setFilter('life')}
            >
              生活
            </button>
          </div>
          <div className="articles-grid">
            {filteredArticles.map(article => (
              <div 
                key={article.id} 
                className="article-card" 
                onClick={() => handleArticleClick(article.id)}
              >
                <span className={`article-category ${article.category}`}>
                  {article.category === 'tech' ? '技术' : '生活'}
                </span>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <div className="article-meta">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系我 */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">联系我</h2>
            <p className="section-subtitle">Get in Touch</p>
          </div>
          <div className="contact-content">
            <p className="contact-description">
              如果你对我的文章感兴趣，或者有技术问题想交流，欢迎通过以下方式联系我。
            </p>
            <div className="contact-links">
              <a href="mailto:your-email@example.com" className="contact-link">
                <div className="contact-icon">📧</div>
                <div className="contact-label">Email</div>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-icon">💻</div>
                <div className="contact-label">GitHub</div>
              </a>
              <a href="#" className="contact-link">
                <div className="contact-icon">📝</div>
                <div className="contact-label">其他平台</div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
