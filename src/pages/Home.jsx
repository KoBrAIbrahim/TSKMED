import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { LanguageContext } from '../context/LanguageContext';

function AdvancedHome() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    products: 0,
    customers: 0,
    rating: 0
  });
  const { currentLang: language } = useContext(LanguageContext);

  const heroTexts = {
    ar: [
      { title: "مرحباً بكم في شركتنا الرائدة", subtitle: "نقدم حلولاً متطورة وخدمات احترافية عالية الجودة" },
      { title: "التميز والابتكار في كل ما نقدم", subtitle: "رؤية استراتيجية لمستقبل أفضل وخدمات متقدمة" },
      { title: "معايير عالمية في الجودة والدقة", subtitle: "التزام مطلق بتحقيق أعلى معايير الكفاءة والموثوقية" }
    ],
    en: [
      { title: "Welcome to Our Leading Company", subtitle: "We provide advanced solutions and high-quality professional services" },
      { title: "Excellence and Innovation in Everything", subtitle: "Strategic vision for a better future and advanced services" },
      { title: "Global Standards in Quality and Precision", subtitle: "Absolute commitment to achieving the highest standards of efficiency and reliability" }
    ]
  };

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts[language].length);
    }, 6000);

    // Fetch products count from Firebase
    const fetchProductCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        setProductCount(querySnapshot.docs.length);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductCount(15); // Fallback number
      }
    };

    fetchProductCount();
    return () => clearInterval(interval);
  }, [language]);

  // Animate statistics counters
  useEffect(() => {
    const targetStats = {
      products: productCount,
      customers: 2500,
      rating: 4
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setAnimatedStats({
        products: Math.floor(targetStats.products * easeProgress),
        customers: Math.floor(targetStats.customers * easeProgress),
        rating: Number((targetStats.rating * easeProgress).toFixed(1))
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targetStats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [productCount, isLoaded]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div 
      className="advanced-home-container"
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`
      }}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Subtle Background Elements */}
      <div className="background-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="gradient-orb orb-1"></div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isLoaded ? 'loaded' : ''}`}>
        <div className="hero-section">
          {/* Professional Container */}
          <div className="glass-container">
            <div className="content-wrapper">
              {/* Professional Logo */}
              <div className="logo-container">
                <div className="logo-ring"></div>
                <img 
                  src="https://i.ibb.co/sp936nTC/logo.jpg" 
                  alt={language === 'ar' ? 'شعار الشركة' : 'Company Logo'}
                  className="company-logo"
                />
              </div>

              {/* Text Content */}
              <div className="text-content">
                <h1 className="main-title">
                  {heroTexts[language][currentTextIndex].title}
                </h1>
                <p className="subtitle">
                  {heroTexts[language][currentTextIndex].subtitle}
                </p>
              </div>

              {/* Partners Section */}
              <div className="partners-section">
                <h3 className="partners-title">
                  {language === 'ar' ? 'شركاؤنا المميزون' : 'Our Distinguished Partners'}
                </h3>
                <div className="partners-grid">
                  <div className="partner-card">
                    <img 
                      src="https://i.ibb.co/TBXGwzZq/novax.png" 
                      alt="Novax"
                      className="partner-logo"
                    />
                  </div>
                  <div className="partner-card">
                    <img 
                      src="https://i.ibb.co/dsPSt0BK/PalCare.jpg" 
                      alt="PalCare"
                      className="partner-logo"
                    />
                  </div>
                  <div className="partner-card">
                    <img 
                      src="https://i.ibb.co/pvvLWzhS/DanPharm.png" 
                      alt="DanPharm"
                      className="partner-logo"
                    />
                  </div>
                  <div className="partner-card">
                    <img 
                      src="https://i.ibb.co/jPpG6BNd/Aura-Pharm.jpg" 
                      alt="Aura Pharm"
                      className="partner-logo"
                    />
                  </div>
                    <div className="partner-card">
                    <img 
                      src="https://i.ibb.co/35NjTHPq/U-me.png" 
                      alt="U&me"
                      className="partner-logo"
                    />
                  </div>
                </div>
              </div>

              {/* Store Statistics Section */}
              <div className="statistics-section">
                <h3 className="stats-title">
                  {language === 'ar' ? 'إحصائيات متجرنا' : 'Our Store Statistics'}
                </h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <svg viewBox="0 0 24 24" fill="none" className="icon">
                        <path d="M20 7H4V5C4 4.45 4.45 4 5 4H19C19.55 4 20 4.45 20 5V7Z" fill="currentColor"/>
                        <path d="M20 7V19C20 19.55 19.55 20 19 20H5C4.45 20 4 19.55 4 19V7H20Z" fill="currentColor"/>
                        <path d="M9 11H15V13H9V11Z" fill="currentColor"/>
                        <path d="M9 15H13V17H9V15Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="stat-number">
                      {animatedStats.products > 0 ? animatedStats.products : '---'}
                    </div>
                    <div className="stat-label">
                      {language === 'ar' ? 'منتج طبي متوفر' : 'Medical Products'}
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">
                      <svg viewBox="0 0 24 24" fill="none" className="icon">
                        <path d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4Z" fill="currentColor"/>
                        <path d="M8 6C9.66 6 11 7.34 11 9C11 10.66 9.66 12 8 12C6.34 12 5 10.66 5 9C5 7.34 6.34 6 8 6Z" fill="currentColor"/>
                        <path d="M8 13C5.33 13 0 14.34 0 17V20H16V17C16 14.34 10.67 13 8 13Z" fill="currentColor"/>
                        <path d="M16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V20H24V17C24 14.34 18.67 13 16 13Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="stat-number">
                      +{animatedStats.customers.toLocaleString()}
                    </div>
                    <div className="stat-label">
                      {language === 'ar' ? 'عميل سعيد' : 'Happy Customers'}
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">
                      <svg viewBox="0 0 24 24" fill="none" className="icon">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="stat-number">
                      {animatedStats.rating}/5
                    </div>
                    <div className="stat-label">
                      {language === 'ar' ? 'تقييم العملاء' : 'Customer Rating'}
                    </div>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < Math.floor(animatedStats.rating) ? 'filled' : ''}`}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* GPS Location Section */}
              <div className="location-section">
                <h3 className="location-title">
                  {language === 'ar' ? 'موقعنا الرئيسي' : 'Our Corporate Location'}
                </h3>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.5159!2d35.20127!3d31.94105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU2JzI3LjgiTiAzNcKwMTInMDQuNiJF!5e0!3m2!1sen!2s!4v1234567890123"
                    width="100%"
                    height="400"
                    style={{border: 0, borderRadius: '8px'}}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={language === 'ar' ? 'موقع الشركة' : 'Company Location'}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .advanced-home-container {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          font-family: 'Segoe UI', 'Tahoma', 'Arial', sans-serif;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
        }

        .advanced-home-container[dir="rtl"] {
          font-family: 'Segoe UI', 'Tahoma', 'Arial', 'Amiri', 'Noto Sans Arabic', sans-serif;
        }

        /* Subtle Background Elements */
        .background-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(148, 163, 184, 0.05);
          backdrop-filter: blur(5px);
          animation: subtleFloat 8s ease-in-out infinite;
          border: 1px solid rgba(148, 163, 184, 0.1);
        }

        .circle-1 {
          width: 180px;
          height: 180px;
          top: 15%;
          left: 15%;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 120px;
          height: 120px;
          top: 65%;
          right: 20%;
          animation-delay: 4s;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: subtlePulse 6s ease-in-out infinite;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #94a3b8, transparent);
          top: 30%;
          left: 70%;
          animation-delay: 0s;
        }

        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes subtlePulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }

        /* Main Content */
        .main-content {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease;
        }

        .main-content.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hero Section */
        .hero-section {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Professional Container */
        .glass-container {
          position: relative;
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 16px;
          padding: 4rem 3rem;
          box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.08),
            0 4px 10px rgba(0, 0, 0, 0.03);
          transition: all 0.3s ease;
          overflow: hidden;
          margin-top: 2%;
        }

        .glass-container:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.12),
            0 6px 15px rgba(0, 0, 0, 0.05);
        }

        .content-wrapper {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        /* Professional Logo */
        .logo-container {
          position: relative;
          width: 200px;
          height: 200px;
          margin: 0 auto 2rem;
        }

        .logo-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 2px solid rgba(59, 130, 246, 0.2);
          border-radius: 50%;
          animation: slowRotate 15s linear infinite;
        }

        .logo-ring::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          width: 8px;
          height: 8px;
          background: #3b82f6;
          border-radius: 50%;
          transform: translateX(-50%);
        }

        .company-logo {
          position: absolute;
          top: 25px;
          left: 25px;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          border: 2px solid rgba(148, 163, 184, 0.2);
          transition: all 0.3s ease;
        }

        .company-logo:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Text Content */
        .text-content {
          margin-bottom: 3rem;
        }

        .main-title {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1rem;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }

        .subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #686D74FF;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 400;
        }

        /* Partners Section */
        .partners-section {
          margin-top: 3rem;
          text-align: center;
        }

        .partners-title {
          color: #1e293b;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 2rem;
          letter-spacing: -0.01em;
        }

        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        .partner-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100px;
        }

        .partner-card:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(59, 130, 246, 0.2);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .partner-logo {
          max-width: 100%;
          max-height: 70px;
          width: auto;
          height: auto;
          object-fit: contain;
          transition: all 0.3s ease;
        }

        .partner-card:hover .partner-logo {
          transform: scale(1.05);
        }

        /* Statistics Section */
        .statistics-section {
          margin-top: 3rem;
          padding: 2.5rem 2rem;
          background: rgba(248, 250, 252, 0.6);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 16px;
          text-align: center;
        }

        .stats-title {
          color: #1e293b;
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 2rem;
          letter-spacing: -0.01em;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 12px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 1);
          border-color: rgba(59, 130, 246, 0.2);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
        }

        .stat-card:hover .stat-icon {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
        }

        .stat-icon .icon {
          width: 24px;
          height: 24px;
          color: white;
        }

        .stat-number {
          font-size: 2.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
          font-family: 'Segoe UI', sans-serif;
          line-height: 1;
        }

        .stat-label {
          color: #64748b;
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .rating-stars {
          display: flex;
          justify-content: center;
          gap: 0.2rem;
          font-size: 1.1rem;
          margin-top: 0.5rem;
        }

        .star {
          transition: all 0.3s ease;
          filter: grayscale(100%);
        }

        .star.filled {
          filter: grayscale(0%);
        }

        /* Location Section */
        .location-section {
          margin-top: 2.5rem;
          padding: 2rem;
          background: rgba(248, 250, 252, 0.6);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 12px;
          text-align: center;
        }

        .location-title {
          color: #1e293b;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          letter-spacing: -0.01em;
        }

        .map-container {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .glass-container {
            padding: 2rem 1.5rem;
            margin: 1rem;
            width: calc(100% - 2rem);
          }

          .partners-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
          }

          .partner-card {
            padding: 1rem;
            min-height: 80px;
          }

          .partner-logo {
            max-height: 50px;
          }

          .statistics-section {
            margin-top: 2rem;
            padding: 2rem 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .stat-card {
            padding: 1.5rem 1rem;
          }

          .stat-number {
            font-size: 2rem;
          }

          .location-section {
            padding: 1.5rem;
            margin-top: 2rem;
          }

          .map-container iframe {
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .glass-container {
            padding: 1.5rem 1rem;
            margin: 0.5rem;
            width: calc(100% - 1rem);
          }

          .logo-container {
            width: 150px;
            height: 150px;
          }

          .company-logo {
            top: 20px;
            left: 20px;
            width: 110px;
            height: 110px;
          }

          .partners-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .partner-card {
            padding: 0.75rem;
            min-height: 70px;
          }

          .partner-logo {
            max-height: 40px;
          }

          .statistics-section {
            margin-top: 1.5rem;
            padding: 1.5rem 0.75rem;
          }

          .stat-card {
            padding: 1.25rem 1rem;
          }

          .stat-icon {
            width: 40px;
            height: 40px;
            margin-bottom: 1rem;
          }

          .stat-icon .icon {
            width: 20px;
            height: 20px;
          }

          .stat-number {
            font-size: 1.75rem;
          }

          .location-section {
            padding: 1rem;
            margin-top: 1.5rem;
          }

          .map-container iframe {
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
}

export default AdvancedHome;