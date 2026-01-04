import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getAllArticles } from '../data/articles';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

function Home() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('all');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - 苹果风格超大标题 */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight mb-8 leading-none"
            >
              <span className="block">后端开发者的</span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent"
              >
                技术分享
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-2xl md:text-3xl text-gray-600 mb-16 max-w-3xl mx-auto font-light leading-relaxed"
            >
              专注后端技术，分享开发经验与生活感悟
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('articles')}
                className="text-lg px-10 py-6 h-auto group"
              >
                查看文章
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('about')}
                className="text-lg px-10 py-6 h-auto"
              >
                了解更多
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* 滚动提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section - 苹果风格卡片展示 */}
      <section id="about" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl md:text-7xl font-semibold mb-6 tracking-tight">关于我</h2>
            <p className="text-2xl text-gray-600 font-light">Backend Developer</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-12">
                  <p className="text-xl text-gray-700 leading-relaxed mb-6 font-light">
                    你好，我是一名后端开发者，专注于构建稳定、高效的服务器端应用。
                  </p>
                  <p className="text-xl text-gray-700 leading-relaxed font-light">
                    在这个博客里，我会分享后端开发的技术经验、踩坑记录，以及一些生活感悟。
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-12">
                  <h3 className="text-3xl font-semibold mb-8">技术栈</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Python', 'Django', 'Flask', 'FastAPI', 'MySQL', 'PostgreSQL', 'Redis', 'Docker', 'Linux', 'Git'].map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-6 py-3 bg-gray-100 rounded-full text-base font-medium text-gray-800 hover:bg-gray-200 transition-colors cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Articles Section - 苹果风格网格布局 */}
      <section id="articles" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-semibold mb-6 tracking-tight">最新文章</h2>
            <p className="text-2xl text-gray-600 font-light">Latest Articles</p>
          </motion.div>

          {/* 筛选按钮 - 苹果风格 */}
          <div className="flex justify-center gap-3 mb-16">
            {[
              { value: 'all', label: '全部' },
              { value: 'tech', label: '技术' },
              { value: 'life', label: '生活' }
            ].map((filterType) => (
              <motion.button
                key={filterType.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(filterType.value)}
                className={`px-8 py-3 rounded-full text-base font-medium transition-all ${
                  filter === filterType.value
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filterType.label}
              </motion.button>
            ))}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="cursor-pointer"
                onClick={() => handleArticleClick(article.id)}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                            article.category === 'tech'
                              ? 'bg-blue-50 text-blue-600'
                              : 'bg-pink-50 text-pink-600'
                          }`}
                        >
                          {article.category === 'tech' ? '技术' : '生活'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold mb-4 group-hover:text-gray-600 transition-colors leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed line-clamp-3 mb-6 font-light">
                        {article.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <span>{article.date}</span>
                        <span className="flex items-center gap-1">
                          {article.readTime}
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section - 完全重构的苹果风格 */}
      <section id="contact" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-semibold mb-6 tracking-tight">联系我</h2>
            <p className="text-2xl text-gray-600 font-light mb-4">Get in Touch</p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              如果你对我的文章感兴趣，或者有技术问题想交流，欢迎通过以下方式联系我。
            </p>
          </motion.div>

          {/* 苹果风格的联系卡片 */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                icon: '📧', 
                title: 'Email', 
                description: '发送邮件给我',
                href: 'mailto:your-email@example.com',
                color: 'from-blue-500 to-blue-600'
              },
              { 
                icon: '💻', 
                title: 'GitHub', 
                description: '查看我的代码',
                href: 'https://github.com',
                target: '_blank',
                color: 'from-gray-700 to-gray-900'
              },
              { 
                icon: '📝', 
                title: '其他平台', 
                description: '更多联系方式',
                href: '#',
                color: 'from-purple-500 to-pink-600'
              },
            ].map((link, index) => (
              <motion.a
                key={link.title}
                href={link.href}
                target={link.target}
                rel={link.target ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative block"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <CardContent className="p-0">
                    {/* 渐变背景 */}
                    <div className={`h-32 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="p-8 -mt-16 relative z-10">
                      <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">
                        {link.icon}
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">{link.title}</h3>
                      <p className="text-gray-600 font-light">{link.description}</p>
                      <div className="mt-6 flex items-center text-gray-500 group-hover:text-black transition-colors">
                        <span className="text-sm">了解更多</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>

          {/* 额外的联系信息 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 text-center"
          >
            <Card className="border-0 shadow-md bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-12">
                <Sparkles className="h-12 w-12 mx-auto mb-6 text-gray-400" />
                <p className="text-xl text-gray-700 font-light leading-relaxed max-w-2xl mx-auto">
                  期待与你交流技术心得，共同成长。无论是技术问题还是生活感悟，都欢迎分享。
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
