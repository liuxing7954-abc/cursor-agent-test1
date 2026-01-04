import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ReferenceHome from './pages/ReferenceHome';
import ArticleDetail from './pages/ArticleDetail';
import Editor from './pages/Editor';

function App() {
  return (
    <Routes>
      <Route path="/reference" element={<ReferenceHome />} />
      <Route path="*" element={
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/editor" element={<Editor />} />
            </Routes>
          </main>
          <Footer />
        </div>
      } />
    </Routes>
  );
}

export default App;
