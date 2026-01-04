import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { getAllArticles } from '../data/articles';
import { Button } from '../components/ui/button';
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
      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 via-white to-white" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-5 leading-[1.1]"
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
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-light leading-relaxed"
            >
              专注后端技术，分享开发经验与生活感悟
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('articles')}
                className="text-sm px-6 py-2.5 h-auto rounded-full group"
              >
                查看文章
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('about')}
                className="text-sm px-6 py-2.5 h-auto rounded-full"
              >
                了解更多
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutRef}
        id="about" 
        className="py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-3 tracking-tight">关于我</h2>
            <p className="text-lg text-gray-600 font-light">Backend Developer</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="space-y-4">
                <p className="text-base text-gray-700 leading-relaxed font-light">
                  你好，我是一名后端开发者，专注于构建稳定、高效的服务器端应用。
                </p>
                <p className="text-base text-gray-700 leading-relaxed font-light">
                  在这个博客里，我会分享后端开发的技术经验、踩坑记录，以及一些生活感悟。
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-xl font-semibold mb-5">技术栈</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Django', 'Flask', 'FastAPI', 'MySQL', 'PostgreSQL', 'Redis', 'Docker', 'Linux', 'Git'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={aboutInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ delay: 0.3 + index * 0.03, duration: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-200 transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section 
        ref={articlesRef}
        id="articles" 
        className="py-24 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={articlesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-3 tracking-tight">最新文章</h2>
            <p className="text-lg text-gray-600 font-light">Latest Articles</p>
          </motion.div>

          {/* 筛选按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={articlesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center gap-2 mb-12"
          >
            {[
              { value: 'all', label: '全部' },
              { value: 'tech', label: '技术' },
              { value: 'life', label: '生活' }
            ].map((filterType) => (
              <button
                key={filterType.value}
                onClick={() => setFilter(filterType.value)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === filterType.value
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filterType.label}
              </button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={articlesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.2 + index * 0.04,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -3 }}
                className="cursor-pointer"
                onClick={() => handleArticleClick(article.id)}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col border border-gray-100">
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          article.category === 'tech'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-pink-50 text-pink-600'
                        }`}
                      >
                        {article.category === 'tech' ? '技术' : '生活'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 leading-tight group-hover:text-gray-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3 font-light flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-gray-100">
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
        className="py-24 bg-white"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-3 tracking-tight">保持联系</h2>
            <p className="text-base text-gray-600 font-light max-w-xl mx-auto">
              如果你对我的文章感兴趣，或者有技术问题想交流，欢迎通过以下方式联系我
            </p>
          </motion.div>

          {/* 垂直列表布局 - 完全不同的设计 */}
          <div className="space-y-3 max-w-2xl mx-auto">
            {[
              { 
                icon: Mail, 
                title: 'Email', 
                value: 'your-email@example.com',
                href: 'mailto:your-email@example.com',
                description: '发送邮件给我，我会尽快回复'
              },
              { 
                icon: Github, 
                title: 'GitHub', 
                value: 'github.com/username',
                href: 'https://github.com',
                target: '_blank',
                description: '查看我的开源项目和代码'
              },
              { 
                icon: MessageCircle, 
                title: '其他平台', 
                value: '更多联系方式',
                href: '#',
                description: '后续会添加更多联系方式'
              },
            ].map((item, index) => (
              <motion.a
                key={item.title}
                href={item.href}
                target={item.target}
                rel={item.target ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ x: 4 }}
                className="group flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <item.icon size={20} className="text-gray-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                    <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-gray-600 font-light">{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* 底部说明 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500 font-light">
              期待与你交流技术心得，共同成长
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
