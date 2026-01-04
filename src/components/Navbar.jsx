import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">
          <span className="brand-icon">⚡</span>
          <Link to="/" className="brand-link">
            <span className="brand-text">老王的技术博客</span>
          </Link>
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/" className={`nav-link ${isActive('/') && location.hash === '' ? 'active' : ''}`}>
              首页
            </Link>
          </li>
          <li>
            <a href="/#articles" className={`nav-link ${location.hash === '#articles' ? 'active' : ''}`}>
              文章
            </a>
          </li>
          <li>
            <a href="/#about" className={`nav-link ${location.hash === '#about' ? 'active' : ''}`}>
              关于
            </a>
          </li>
          <li>
            <a href="/#contact" className={`nav-link ${location.hash === '#contact' ? 'active' : ''}`}>
              联系
            </a>
          </li>
          <li>
            <Link to="/editor" className={`nav-link ${isActive('/editor') ? 'active' : ''}`}>
              写文章
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
