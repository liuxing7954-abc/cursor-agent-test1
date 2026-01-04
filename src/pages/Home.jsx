import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllArticles } from '../data/articles';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6"
          >
            <span className="block">后端开发者的</span>
            <span className="block bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              技术分享
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            专注后端技术，分享开发经验与生活感悟
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('articles')}
              className="text-base"
            >
              查看文章
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('about')}
              className="text-base"
            >
              了解更多
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-semibold mb-4">关于我</h2>
            <p className="text-xl text-gray-600">Backend Developer</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardDescription className="text-base leading-relaxed">
                    你好，我是一名后端开发者，专注于构建稳定、高效的服务器端应用。
                  </CardDescription>
                  <CardDescription className="text-base leading-relaxed mt-4">
                    在这个博客里，我会分享后端开发的技术经验、踩坑记录，以及一些生活感悟。
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>技术栈</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'Django', 'Flask', 'FastAPI', 'MySQL', 'PostgreSQL', 'Redis', 'Docker', 'Linux', 'Git'].map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
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

      {/* Articles Section */}
      <section id="articles" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-semibold mb-4">最新文章</h2>
            <p className="text-xl text-gray-600">Latest Articles</p>
          </motion.div>

          <div className="flex justify-center gap-2 mb-12">
            {['all', 'tech', 'life'].map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className="rounded-full"
              >
                {filterType === 'all' ? '全部' : filterType === 'tech' ? '技术' : '生活'}
              </Button>
            ))}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="cursor-pointer"
                onClick={() => handleArticleClick(article.id)}
              >
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          article.category === 'tech'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-pink-100 text-pink-700'
                        }`}
                      >
                        {article.category === 'tech' ? '技术' : '生活'}
                      </span>
                    </div>
                    <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                    <CardDescription className="text-base line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-semibold mb-4">联系我</h2>
            <p className="text-xl text-gray-600 mb-4">Get in Touch</p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              如果你对我的文章感兴趣，或者有技术问题想交流，欢迎通过以下方式联系我。
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: '📧', label: 'Email', href: 'mailto:your-email@example.com' },
                { icon: '💻', label: 'GitHub', href: 'https://github.com', target: '_blank' },
                { icon: '📝', label: '其他平台', href: '#' },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.target ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors min-w-[120px]"
                >
                  <span className="text-4xl">{link.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
