import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { getAllArticles } from '../data/articles';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Mail, Github, MessageCircle } from 'lucide-react';

function Home() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('all');
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const articlesRef = useRef(null);
  const contactRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const articlesInView = useInView(articlesRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

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

  const scrollToSection = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - 苹果风格超大标题 */}
      <section 
        ref={heroRef}
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-white" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6 leading-[1.05]"
            >
              <span className="block">后端开发者的</span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="block"
              >
                技术分享
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
            >
              专注后端技术，分享开发经验与生活感悟
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('articles')}
                className="text-base px-8 py-3 h-auto rounded-full group"
              >
                查看文章
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('about')}
                className="text-base px-8 py-3 h-auto rounded-full"
              >
                了解更多
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section - 苹果风格简洁展示 */}
      <section 
        ref={aboutRef}
        id="about" 
        className="py-32 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 tracking-tight">关于我</h2>
            <p className="text-xl text-gray-600 font-light">Backend Developer</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  你好，我是一名后端开发者，专注于构建稳定、高效的服务器端应用。
                </p>
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  在这个博客里，我会分享后端开发的技术经验、踩坑记录，以及一些生活感悟。
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-2xl font-semibold mb-6">技术栈</h3>
              <div className="flex flex-wrap gap-3">
                {['Python', 'Django', 'Flask', 'FastAPI', 'MySQL', 'PostgreSQL', 'Redis', 'Docker', 'Linux', 'Git'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={aboutInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ delay: 0.4 + index * 0.03, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-5 py-2.5 bg-gray-100 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-200 transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Articles Section - 苹果风格网格 */}
      <section 
        ref={articlesRef}
        id="articles" 
        className="py-32 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={articlesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-semibold mb-4 tracking-tight">最新文章</h2>
            <p className="text-xl text-gray-600 font-light">Latest Articles</p>
          </motion.div>

          {/* 筛选按钮 - 苹果风格 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={articlesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-2 mb-16"
          >
            {[
              { value: 'all', label: '全部' },
              { value: 'tech', label: '技术' },
              { value: 'life', label: '生活' }
            ].map((filterType) => (
              <button
                key={filterType.value}
                onClick={() => setFilter(filterType.value)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === filterType.value
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filterType.label}
              </button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={articlesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -4 }}
                className="cursor-pointer"
                onClick={() => handleArticleClick(article.id)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          article.category === 'tech'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-pink-50 text-pink-600'
                        }`}
                      >
                        {article.category === 'tech' ? '技术' : '生活'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 leading-tight group-hover:text-gray-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 font-light flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-100">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1">
                        {article.readTime}
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - 完全重新设计 */}
      <section 
        ref={contactRef}
        id="contact" 
        className="py-32 bg-black text-white relative overflow-hidden"
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight">保持联系</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              如果你对我的文章感兴趣，或者有技术问题想交流，欢迎通过以下方式联系我
            </p>
          </motion.div>

          {/* 横向布局的联系方式 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-16">
            {[
              { 
                icon: Mail, 
                title: 'Email', 
                value: 'your-email@example.com',
                href: 'mailto:your-email@example.com',
                color: 'text-blue-400'
              },
              { 
                icon: Github, 
                title: 'GitHub', 
                value: 'github.com/username',
                href: 'https://github.com',
                target: '_blank',
                color: 'text-gray-300'
              },
              { 
                icon: MessageCircle, 
                title: '其他平台', 
                value: '更多联系方式',
                href: '#',
                color: 'text-purple-400'
              },
            ].map((item, index) => (
              <motion.a
                key={item.title}
                href={item.href}
                target={item.target}
                rel={item.target ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={contactInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 min-w-[200px]"
              >
                <div className={`mb-4 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {item.value}
                </p>
              </motion.a>
            ))}
          </div>

          {/* 底部说明文字 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block px-8 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-sm text-gray-400 leading-relaxed">
                期待与你交流技术心得，共同成长
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
