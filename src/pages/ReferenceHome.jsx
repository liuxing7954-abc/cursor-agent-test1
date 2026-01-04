import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Sun, Menu, X } from 'lucide-react';

function ReferenceHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 - 完全复刻 VitePress 风格 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2 group">
              <img src="/cat.svg" alt="logo" className="w-6 h-6" />
              <span className="text-base font-medium text-gray-900 group-hover:text-gray-600 transition-colors">Blog</span>
            </a>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm text-gray-900 font-medium hover:text-gray-600 transition-colors">
                首页
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                技术文档
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                组件与库
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                其他文档
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                面试相关
              </a>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm text-gray-600 group">
                <Search className="h-4 w-4" />
                <span className="group-hover:text-gray-900">搜索文档</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 rounded border border-gray-200 text-gray-500">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 rounded border border-gray-200 text-gray-500">K</kbd>
                </div>
              </button>
              
              {/* Theme Toggle */}
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Sun className="h-4 w-4 text-gray-600" />
              </button>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-b border-gray-200"></div>
      </header>

      {/* Hero Section - 完全复刻 */}
      <section 
        ref={heroRef}
        className="pt-20 pb-16"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-12">
            {/* 左侧文字内容 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 text-center md:text-left"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-[1.1] tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 mb-2">
                  Jiu XianZai
                </span>
                <span className="block text-gray-900">个人博客</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed">
                持续更新中...
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  技术文档
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  面试相关
                </a>
              </div>
            </motion.div>

            {/* 右侧图片 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 w-full md:w-auto"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                {/* 背景光晕 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl blur-3xl opacity-50 -z-10" />
                {/* 图片容器 */}
                <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30" />
                  <img 
                    src="/cat.svg" 
                    alt="logo" 
                    className="w-32 h-32 relative z-10"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - 完全复刻 */}
      <section 
        ref={featuresRef}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🛠️',
                title: 'l-js-fn',
                description: '自写npm工具类，收录常用 JavaScript 工具函数，支持按需引入，高效复用。'
              },
              {
                icon: '📦',
                title: '二次封装组件',
                description: '基于 Element Plus 的二次封装，简化使用并增强功能。'
              },
              {
                icon: '📚',
                title: '技术文档',
                description: '汇集技术笔记与实用解决方案，持续学习中...'
              }
            ].map((feature, index) => (
              <motion.a
                key={feature.title}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 group"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - 完全复刻 */}
      <footer className="py-12 border-t border-gray-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-sm text-gray-600 mb-2 font-light">Will Try My Best.</p>
          <p className="text-xs text-gray-500">Copyright © 2025-present Jiu XianZai</p>
        </div>
      </footer>
    </div>
  );
}

export default ReferenceHome;
