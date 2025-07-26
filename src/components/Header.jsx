import React, { useState, useEffect ,useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

function AdvancedHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const { currentLang, toggleLanguage } = useContext(LanguageContext);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  // نضيفه فورًا أول مرة لتحديث الحالة إذا الصفحة مش من فوق
  handleScroll(); 

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

// Close mobile menu when clicking outside or on a link
useEffect(() => {
  const handleClickOutside = (event) => {
    if (isMenuOpen && !event.target.closest('.mobile-nav') && !event.target.closest('.mobile-toggle')) {
      setIsMenuOpen(false);
    }
  };

  if (isMenuOpen) {
    document.addEventListener('click', handleClickOutside);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  } else {
    document.body.style.overflow = 'unset';
  }

  return () => {
    document.removeEventListener('click', handleClickOutside);
    document.body.style.overflow = 'unset';
  };
}, [isMenuOpen]);

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};

const closeMenu = () => {
  setIsMenuOpen(false);
};

const handleLanguageToggle = () => {
  toggleLanguage();
  if (window.innerWidth <= 768) {
    closeMenu();
  }
};

  return (
    <>
    
<header className={`modern-header ${isScrolled ? 'scrolled' : ''}`} dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
  <div className="header-container">

    
    {/* Logo Section */}
    <div className="logo-section">
      <a href="/" className="logo-link" onClick={closeMenu}>
        <div className="logo-wrapper">
          <div className="logo-icon">
            <img 
              src="https://i.ibb.co/sp936nTC/logo.jpg" 
              alt={currentLang === 'ar' ? 'شعار الشركة' : 'Company Logo'} 
              className="logo-image"
            />
          </div>
          <span className="logo-text">TSK Med</span>
        </div>
      </a>
    </div>

    {/* Desktop Navigation */}
    <nav className="desktop-nav">
      <a href="/" className="nav-link" onClick={closeMenu}>
        <span className="link-text">{currentLang === 'ar' ? 'الرئيسية' : 'Home'}</span>
        <div className="link-bg"></div>
      </a>
      <a href="/products" className="nav-link" onClick={closeMenu}>
        <span className="link-text">{currentLang === 'ar' ? 'المنتجات' : 'Products'}</span>
        <div className="link-bg"></div>
      </a>
      <a href="/about" className="nav-link" onClick={closeMenu}>
        <span className="link-text">{currentLang === 'ar' ? 'عن الشركة' : 'About'}</span>
        <div className="link-bg"></div>
      </a>
      <a href="/Partners" className="nav-link" onClick={closeMenu}>
        <span className="link-text">{currentLang === 'ar' ? 'الشركاء' : 'Partners'}</span>
        <div className="link-bg"></div>
      </a>
      <a href="/contact" className="nav-link" onClick={closeMenu}>
        <span className="link-text">{currentLang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
        <div className="link-bg"></div>
      </a>
    </nav>

    {/* Header Actions */}
    <div className="header-actions">
      {/* Language Toggle - Desktop */}
      <button className="lang-toggle desktop-only" onClick={handleLanguageToggle}>
        <span className="lang-icon">🌍</span>
        <span className="lang-text">
          {currentLang === 'ar' ? '🇺🇸 English' : '🇵🇸 عربي'}
        </span>
      </button>

      {/* Mobile Menu Toggle */}
      <button className={`mobile-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>

  {/* Mobile Sidebar Navigation */}
  <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
    <div className="mobile-nav-content">
      {/* Mobile Header */}
      <div className="mobile-nav-header">
        <div className="mobile-logo">
          <img 
            src="https://i.ibb.co/sp936nTC/logo.jpg" 
            alt={currentLang === 'ar' ? 'شعار الشركة' : 'Company Logo'} 
            className="mobile-logo-image"
          />
          <span className="mobile-logo-text">TSK Med</span>
        </div>
        <button className="mobile-close" onClick={closeMenu}>
          <span>×</span>
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <div className="mobile-nav-links">
        <a href="/" className="mobile-nav-link" onClick={closeMenu}>
          <span className="nav-icon">🏠</span>
          <span>{currentLang === 'ar' ? 'الرئيسية' : 'Home'}</span>
          <span className="nav-arrow">{currentLang === 'ar' ? '←' : '→'}</span>
        </a>
        <a href="/products" className="mobile-nav-link" onClick={closeMenu}>
          <span className="nav-icon">💊</span>
          <span>{currentLang === 'ar' ? 'المنتجات' : 'Products'}</span>
          <span className="nav-arrow">{currentLang === 'ar' ? '←' : '→'}</span>
        </a>
        <a href="/about" className="mobile-nav-link" onClick={closeMenu}>
          <span className="nav-icon">ℹ️</span>
          <span>{currentLang === 'ar' ? 'عن الشركة' : 'About'}</span>
          <span className="nav-arrow">{currentLang === 'ar' ? '←' : '→'}</span>
        </a>
        <a href="/Partners" className="mobile-nav-link" onClick={closeMenu}>
          <span className="nav-icon">🤝</span>
          <span>{currentLang === 'ar' ? 'الشركاء' : 'Partners'}</span>
          <span className="nav-arrow">{currentLang === 'ar' ? '←' : '→'}</span>
        </a>
        <a href="/contact" className="mobile-nav-link" onClick={closeMenu}>
          <span className="nav-icon">📞</span>
          <span>{currentLang === 'ar' ? 'تواصل معنا' : 'Contact'}</span>
          <span className="nav-arrow">{currentLang === 'ar' ? '←' : '→'}</span>
        </a>
      </div>

      {/* Mobile Language Toggle */}
      <div className="mobile-footer">
        <button className="mobile-lang-toggle" onClick={handleLanguageToggle}>
          <span className="lang-icon">🌍</span>
          <span>
            {currentLang === 'ar' ? '🇺🇸 English' : '🇵🇸 عربي'}
          </span>
        </button>
        
        <div className="mobile-contact-info">
          <p className="contact-item">
            <span>📞</span> +972 59-778-3617
          </p>
          <p className="contact-item">
            <span>📧</span> Tskmedicaltrade@gmail.com
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Mobile Overlay */}
  <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
</header>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .modern-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
          border-bottom: 1px solid rgba(148, 163, 184, 0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(10px);
        }

        .modern-header.scrolled {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          min-height: 80px;
        }

        /* Logo Section */
        .logo-section {
          flex-shrink: 0;
        }

        .logo-link {
          text-decoration: none;
          display: block;
          transition: transform 0.3s ease;
        }

        .logo-link:hover {
          transform: scale(1.05);
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .logo-icon {
          position: relative;
          width: 50px;
          height: 50px;
        }

        .logo-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .logo-image:hover {
          border-color: #3b82f6;
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
          transform: scale(1.05);
        }

        .logo-text {
          font-size: 2.2rem;
          font-weight: 900;
          color: #1e293b;
          transition: all 0.3s ease;
          letter-spacing: 1px;
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          text-decoration: none;
          color: #1e293b;
          font-weight: 600;
          font-size: 1.1rem;
          border-radius: 50px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #3b82f6;
          transform: translateY(-3px);
        }

        .nav-link:hover .link-bg {
          opacity: 1;
          transform: scale(1);
        }

        .link-text {
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .link-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 50px;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
        }

        /* Header Actions */
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        /* Language Toggle */
        .lang-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.2rem;
          background: rgba(255, 255, 255, 0.8);
          color: #1e293b;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .lang-toggle:hover {
          background: rgba(255, 255, 255, 1);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .lang-icon {
          font-size: 1.2rem;
        }

        .lang-text {
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        /* Mobile Toggle */
        .mobile-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 12px;
          cursor: pointer;
          padding: 8px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .mobile-toggle:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
        }

        .mobile-toggle span {
          display: block;
          height: 3px;
          width: 100%;
          background: #1e293b;
          border-radius: 3px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-toggle.open span:nth-child(1) {
          transform: rotate(45deg) translate(8px, 8px);
        }

        .mobile-toggle.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-toggle.open span:nth-child(3) {
          transform: rotate(-45deg) translate(8px, -8px);
        }

        /* Mobile Navigation Sidebar */
        .mobile-nav {
          position: fixed;
          top: 0;
          right: -100%;
          width: 320px;
          height: 100vh;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          backdrop-filter: blur(20px);
          border-left: 1px solid rgba(148, 163, 184, 0.2);
          transform: translateX(0);
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
          z-index: 1001;
        }

        .modern-header[dir="rtl"] .mobile-nav {
          right: auto;
          left: -100%;
          border-left: none;
          border-right: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 10px 0 30px rgba(0, 0, 0, 0.1);
        }

        .mobile-nav.open {
          right: 0;
          opacity: 1;
          visibility: visible;
        }

        .modern-header[dir="rtl"] .mobile-nav.open {
          left: 0;
        }

        .mobile-nav-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        /* Mobile Navigation Header */
        .mobile-nav-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(148, 163, 184, 0.15);
          background: rgba(248, 250, 252, 0.8);
        }

        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .mobile-logo-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(59, 130, 246, 0.3);
        }

        .mobile-logo-text {
          font-size: 1.5rem;
          font-weight: 900;
          color: #1e293b;
        }

        .mobile-close {
          width: 40px;
          height: 40px;
          border: none;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.5rem;
          font-weight: bold;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-close:hover {
          background: rgba(239, 68, 68, 0.2);
          transform: scale(1.1);
        }

        /* Mobile Navigation Links */
        .mobile-nav-links {
          flex: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          color: #1e293b;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(248, 250, 252, 0.5);
          border: 1px solid rgba(148, 163, 184, 0.1);
          position: relative;
          overflow: hidden;
        }

        .mobile-nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .mobile-nav-link:hover::before {
          left: 100%;
        }

        .mobile-nav-link:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          transform: translateX(5px);
          border-color: rgba(59, 130, 246, 0.2);
        }

        .modern-header[dir="rtl"] .mobile-nav-link:hover {
          transform: translateX(-5px);
        }

        .nav-icon {
          font-size: 1.2rem;
          width: 1.5rem;
          text-align: center;
        }

        .nav-arrow {
          font-size: 1rem;
          color: #94a3b8;
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover .nav-arrow {
          color: #3b82f6;
          transform: translateX(3px);
        }

        .modern-header[dir="rtl"] .mobile-nav-link:hover .nav-arrow {
          transform: translateX(-3px);
        }

        /* Mobile Footer */
        .mobile-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(148, 163, 184, 0.15);
          background: rgba(248, 250, 252, 0.8);
        }

        .mobile-lang-toggle {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 1rem 1.25rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .mobile-lang-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .mobile-contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .contact-item span {
          font-size: 1rem;
        }

        /* Mobile Overlay */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .mobile-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .header-container {
            padding: 1rem 1.5rem;
          }

          .desktop-nav {
            gap: 0.5rem;
          }

          .nav-link {
            padding: 0.6rem 1.2rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .desktop-only {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }

          .header-container {
            padding: 1rem 1.5rem;
          }

          .logo-text {
            font-size: 1.8rem;
          }

          .logo-icon {
            width: 45px;
            height: 45px;
          }

          .mobile-nav {
            width: 280px;
          }
        }

        @media (max-width: 480px) {
          .header-container {
            padding: 1rem;
          }

          .logo-wrapper {
            gap: 0.8rem;
          }

          .logo-text {
            font-size: 1.6rem;
          }

          .logo-icon {
            width: 40px;
            height: 40px;
          }

          .mobile-nav {
            width: 100%;
            right: -100%;
          }

          .modern-header[dir="rtl"] .mobile-nav {
            left: -100%;
          }

          .mobile-nav.open {
            right: 0;
          }

          .modern-header[dir="rtl"] .mobile-nav.open {
            left: 0;
          }

          .mobile-nav-header {
            padding: 1.25rem;
          }

          .mobile-nav-links {
            padding: 0.75rem;
          }

          .mobile-nav-link {
            padding: 0.875rem 1rem;
            font-size: 1rem;
          }

          .mobile-footer {
            padding: 1.25rem;
          }
        }

        @media (max-width: 360px) {
          .logo-text {
            font-size: 1.4rem;
          }

          .mobile-nav-link {
            padding: 0.75rem;
            font-size: 0.95rem;
          }
        }

        /* Smooth scrolling offset for fixed header */
        html {
          scroll-padding-top: 100px;
        }

        /* Prevent body scrolling when menu is open */
        body.menu-open {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

export default AdvancedHeader;