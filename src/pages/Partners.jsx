import React, {useContext , useState, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';

function AdvancedPartners() {
  const { currentLang } = useContext(LanguageContext); // ⬅️ استخدم currentLang بدلاً من language
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activePartner, setActivePartner] = useState(null);

  // ⬅️ إضافة fallback للتأكد من وجود اللغة
  const language = currentLang || 'ar';

  const partners = {
    ar: [
      {
        name: 'Novax',
        image: 'https://i.ibb.co/TBXGwzZq/novax.png',
        category: 'شركة منتجات وعلاجات عالمية',
        specialization: 'المنتجات والعلاجات المتقدمة والابتكار',
        description: 'Novax هي شركة عالمية متخصصة في تطوير وإنتاج المنتجات والعلاجات عالية الجودة. تركز الشركة على الابتكار وتوفير حلول علاجية فعالة لعدد واسع من الأمراض. شراكتنا معها تُعزز قدراتنا في تزويد السوق المحلي بأحدث المنتجات الطبية المستندة إلى أحدث التقنيات والمعايير العالمية.',
        highlights: [
          'منتجات وعلاجات عالية الجودة',
          'حلول علاجية مبتكرة',
          'معايير عالمية',
          'تقنيات متقدمة'
        ],
        partnership_year: '2024',
        countries: '25+ دولة'
      },
      {
        name: 'Dan Pharm',
        image: 'https://i.ibb.co/pvvLWzhS/DanPharm.png',
        category: 'شركة منتجات وعلاجات رائدة',
        specialization: 'المنتجات الدوائية المعتمدة',
        description: 'Dan Pharm هي شركة منتجات وعلاجات رائدة تتميز بمجموعة واسعة من المنتجات الدوائية المعتمدة. تهدف إلى تحسين الصحة العامة من خلال توفير منتجات وعلاجات فعالة وآمنة. الشراكة معها تُمكّننا من توسيع نطاق المنتجات المتوفرة في السوق الفلسطيني وتعزيز خيارات العلاج المتاحة للمرضى.',
        highlights: [
          'منتجات معتمدة',
          'منتجات وعلاجات فعالة وآمنة',
          'تحسين الصحة العامة',
          'خيارات علاج متنوعة'
        ],
        partnership_year: '2023',
        countries: '15+ دولة'
      },
      {
        name: 'Pal Care',
        image: 'https://i.ibb.co/dsPSt0BK/PalCare.jpg',
        category: 'شركة فلسطينية',
        specialization: 'المستلزمات الطبية والدوائية',
        description: 'Pal Care هي شركة فلسطينية تعنى بتوفير المستلزمات الطبية والدوائية ذات الجودة العالية. تُعرف الشركة بخدماتها المتميزة ودعمها الكامل للمجتمع الطبي. التعاون معها يعكس التزامنا بدعم الصناعات المحلية وتعزيز حضور المنتجات الوطنية في السوق.',
        highlights: [
          'شركة محلية فلسطينية',
          'مستلزمات طبية عالية الجودة',
          'دعم المجتمع الطبي',
          'تعزيز الصناعات المحلية'
        ],
        partnership_year: '2023',
        countries: 'فلسطين'
      },
      {
        name: 'Aura Pharm',
        image: 'https://i.ibb.co/jPpG6BNd/Aura-Pharm.jpg',
        category: 'شركة منتجات وعلاجات مبتكرة',
        specialization: 'الحلول العلاجية الحديثة',
        description: 'Aura Pharm هي شركة دوائية تركز على تقديم حلول علاجية مبتكرة وحديثة. تسعى إلى تقديم منتجات تتماشى مع احتياجات السوق وتطورات الطب الحديث. هذه الشراكة تُعزز قدرتنا على الوصول إلى أصناف دوائية ذات فعالية عالية وجودة عالمية.',
        highlights: [
          'حلول علاجية مبتكرة',
          'طب حديث',
          'فعالية عالية',
          'جودة عالمية'
        ],
        partnership_year: '2024',
        countries: 'فلسطين'
      },
      {
  name: 'U&ME',
  image: 'https://i.ibb.co/35NjTHPq/U-me.png',
 category: 'شركة رائدة في توزيع المنتجات والعلاجات',
specialization: 'تجارة وتوزيع المستحضرات الصيدلانية',

  description: 'U&ME هي شركة رائدة في تجارة وتوزيع المنتجات والعلاجات داخل قطاع غزة، تتميز بتقديم خدمات متميزة للقطاع الطبي وتسهم بشكل فعال في تلبية احتياجات السوق المحلية من المنتجات والعلاجات والمستلزمات الطبية. شراكتنا مع الشركة منذ عام 2023 تهدف إلى تعزيز توفر المنتجات والعلاجات وتحسين جودة الخدمات الصحية المقدمة في غزة.',
  highlights: [
    'توزيع معتمد للمنتجات والعلاجات',
    'خدمة متميزة للقطاع الطبي',
    'تلبية احتياجات السوق المحلي',
    'ريادة في التوزيع داخل غزة'
  ],
  partnership_year: '2023',
  countries: 'فقط في قطاع غزة'
}

    ],
    en: [
      {
        name: 'Novax',
        image: 'https://i.ibb.co/TBXGwzZq/novax.png',
        category: 'Global Pharmaceutical Company',
        specialization: 'Advanced Medicines & Innovation',
        description: 'Novax is a global company specialized in developing and producing high-quality medicines. The company focuses on innovation and providing effective therapeutic solutions for a wide range of diseases. Our partnership with them enhances our capabilities in supplying the local market with the latest medical products based on cutting-edge technologies and global standards.',
        highlights: [
          'High-quality medicines',
          'Innovative therapeutic solutions',
          'Global standards',
          'Advanced technologies'
        ],
        partnership_year: '2024',
        countries: '25+ Countries'
      },
      {
        name: 'Dan Pharm',
        image: 'https://i.ibb.co/pvvLWzhS/DanPharm.png',
        category: 'Leading Pharmaceutical Company',
        specialization: 'Certified Pharmaceutical Products',
        description: 'Dan Pharm is a leading pharmaceutical company distinguished by a wide range of certified pharmaceutical products. It aims to improve public health by providing effective and safe medicines. Our partnership enables us to expand the range of products available in the Palestinian market and enhance treatment options available to patients.',
        highlights: [
          'Certified products',
          'Effective and safe medicines',
          'Public health improvement',
          'Diverse treatment options'
        ],
        partnership_year: '2023',
        countries: '15+ Countries'
      },
      {
        name: 'Pal Care',
        image: 'https://i.ibb.co/dsPSt0BK/PalCare.jpg',
        category: 'Palestinian Company',
        specialization: 'Medical & Pharmaceutical Supplies',
        description: 'Pal Care is a Palestinian company that provides high-quality medical and pharmaceutical supplies. The company is known for its distinguished services and full support for the medical community. Cooperation with them reflects our commitment to supporting local industries and enhancing the presence of national products in the market.',
        highlights: [
          'Local Palestinian company',
          'High-quality medical supplies',
          'Medical community support',
          'Local industry enhancement'
        ],
        partnership_year: '2023',
        countries: 'Palestine'
      },
      {
        name: 'Aura Pharm',
        image: 'https://i.ibb.co/jPpG6BNd/Aura-Pharm.jpg',
        category: 'Innovative Pharmaceutical Company',
        specialization: 'Modern Therapeutic Solutions',
        description: 'Aura Pharm is a pharmaceutical company focused on providing innovative and modern therapeutic solutions. It seeks to offer products that align with market needs and developments in modern medicine. This partnership enhances our ability to access pharmaceutical varieties with high efficacy and global quality.',
        highlights: [
          'Innovative therapeutic solutions',
          'Modern medicine',
          'High efficacy',
          'Global quality'
        ],
        partnership_year: '2024',
        countries: 'PALESTINE'
      },{
  name: 'U&ME',
  image: 'https://i.ibb.co/35NjTHPq/U-me.png',
  category: 'Leading Medical Distribution Company',
  specialization: 'Pharmaceutical Trade and Distribution',
  description: 'U&ME is a leading company in the trade and distribution of pharmaceutical products within the Gaza Strip. It is known for its exceptional service to the medical sector and plays a vital role in meeting the local market’s needs for medicines and medical supplies. Our partnership, established in 2023, aims to enhance the availability of medications and improve the quality of healthcare services in Gaza.',
  highlights: [
    'Certified pharmaceutical distribution',
    'Exceptional service to the medical sector',
    'Meeting local market needs',
    'Distribution leadership in Gaza'
  ],
  partnership_year: '2023',
  countries: 'Gaza Strip only'
}

    ]
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const handlePartnerHover = (index) => {
    setActivePartner(index);
  };

  const handlePartnerLeave = () => {
    setActivePartner(null);
  };

  // ⬅️ إضافة تحقق من وجود البيانات قبل الرندر
  if (!partners[language]) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        color: '#1e293b'
      }}>
        جاري تحميل البيانات...
      </div>
    );
  }

  return (
    <div 
      className="advanced-partners-container"
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`
      }}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Animated Background Elements */}
      <div className="background-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      {/* Interactive Light Effect */}
      <div className="mouse-light"></div>

      {/* Main Content */}
      <div className={`main-content ${isLoaded ? 'loaded' : ''}`}>
        <div className="partners-section">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">
              {language === 'ar' ? 'شركاؤنا المميزون' : 'Our Distinguished Partners'}
            </h1>
            <p className="page-subtitle">
              {language === 'ar' 
                ? 'نفخر بشراكاتنا الاستراتيجية مع أبرز الشركات في المجال الطبي والصيدلاني'
                : 'We are proud of our strategic partnerships with leading companies in the medical and pharmaceutical field'}
            </p>
            <div className="stats-badges">
              <div className="stat-badge">
                <span className="stat-number">5</span>
                <span className="stat-label">
                  {language === 'ar' ? 'شركاء رئيسيين' : 'Key Partners'}
                </span>
              </div>
              <div className="stat-badge">
                <span className="stat-number">2023</span>
                <span className="stat-label">
                  {language === 'ar' ? 'بداية الشراكات' : 'Partnerships Started'}
                </span>
              </div>
            </div>
          </div>

          {/* Partners Grid */}
          <div className="partners-grid">
            {partners[language] && partners[language].map((partner, index) => (
              <div 
                key={index} 
                className={`partner-card ${activePartner === index ? 'active' : ''}`}
                onMouseEnter={() => handlePartnerHover(index)}
                onMouseLeave={handlePartnerLeave}
              >
                <div className="card-header">
                  <div className="partner-image-container">
                    <img 
                      src={partner.image} 
                      alt={partner.name}
                      className="partner-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x100/2c5282/ffffff?text=Logo';
                      }}
                    />
                    <div className="image-overlay">
                      <div className="partnership-year">
                        {language === 'ar' ? 'شراكة منذ' : 'Partners since'} {partner.partnership_year}
                      </div>
                    </div>
                  </div>
                  <div className="partner-info">
                    <h2 className="partner-name">{partner.name}</h2>
                    <div className="partner-category">{partner.category}</div>
                    <div className="partner-specialization">{partner.specialization}</div>
                  </div>
                </div>

                <div className="card-body">
                  <p className="partner-description">
                    {partner.description}
                  </p>
                </div>

                <div className="card-footer">
                  <div className="highlights-section">
                    <h4 className="highlights-title">
                      {language === 'ar' ? 'نقاط القوة' : 'Key Strengths'}
                    </h4>
                    <div className="highlights-grid">
                      {partner.highlights && partner.highlights.map((highlight, idx) => (
                        <div key={idx} className="highlight-item">
                          <span className="highlight-icon">✓</span>
                          <span className="highlight-text">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="partner-stats">
                    <div className="stat-item">
                      
                      <span className="stat-text">{partner.countries}</span>
                    </div>
                  </div>
                </div>

                {/* Card Glow Effect */}
                <div className="card-glow"></div>
              </div>
            ))}
          </div>

          {/* Partnership Benefits Section */}
          <div className="benefits-section">
            <h2 className="benefits-title">
              {language === 'ar' ? 'فوائد شراكاتنا' : 'Partnership Benefits'}
            </h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                
                <h3>{language === 'ar' ? 'أحدث التقنيات' : 'Latest Technologies'}</h3>
                <p>{language === 'ar' ? 'الوصول إلى أحدث التقنيات الطبية والدوائية' : 'Access to the latest medical and pharmaceutical technologies'}</p>
              </div>
              <div className="benefit-card">
                
                <h3>{language === 'ar' ? 'شبكة عالمية' : 'Global Network'}</h3>
                <p>{language === 'ar' ? 'شبكة واسعة من الشركاء في جميع أنحاء العالم' : 'Extensive network of partners worldwide'}</p>
              </div>
              <div className="benefit-card">
                
                <h3>{language === 'ar' ? 'توريد سريع' : 'Fast Supply'}</h3>
                <p>{language === 'ar' ? 'ضمان توفير المنتجات بسرعة وكفاءة عالية' : 'Ensuring fast and efficient product supply'}</p>
              </div>
              <div className="benefit-card">
                
                <h3>{language === 'ar' ? 'جودة مضمونة' : 'Guaranteed Quality'}</h3>
                <p>{language === 'ar' ? 'منتجات معتمدة وفقاً لأعلى معايير الجودة' : 'Certified products according to highest quality standards'}</p>
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

        .advanced-partners-container {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          font-family: 'Segoe UI', 'Tahoma', 'Arial', sans-serif;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
          padding-top: 100px;
        }

        .advanced-partners-container[dir="rtl"] {
          font-family: 'Segoe UI', 'Tahoma', 'Arial', 'Amiri', 'Noto Sans Arabic', sans-serif;
        }

        /* Background Elements */
        .background-elements {
          position: fixed;
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
          border: 1px solid rgba(148, 163, 184, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .circle-1 {
          width: 200px;
          height: 200px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .circle-3 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: pulse 6s ease-in-out infinite;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #94a3b8, transparent);
          top: 20%;
          left: 60%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #64748b, transparent);
          bottom: 30%;
          right: 70%;
          animation-delay: 2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }

        /* Interactive Light Effect */
        .mouse-light {
          position: fixed;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(148, 163, 184, 0.1) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          left: var(--mouse-x);
          top: var(--mouse-y);
          pointer-events: none;
          transition: opacity 0.2s ease;
          z-index: 3;
        }

        /* Main Content */
        .main-content {
          position: relative;
          z-index: 10;
          min-height: calc(100vh - 100px);
          padding: 2rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .main-content.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .partners-section {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Page Header */
        .page-header {
          text-align: center;
          margin-bottom: 4rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 20px;
          padding: 3rem 2rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .page-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .page-subtitle {
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          color: #64748b;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto 2rem;
        }

        .stats-badges {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .stat-badge {
          background: rgba(248, 250, 252, 0.6);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 15px;
          padding: 1rem 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-badge:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(59, 130, 246, 0.2);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #64748b;
        }

        /* Partners Grid */
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .partner-card {
          position: relative;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .partner-card:hover,
        .partner-card.active {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 1);
          border-color: rgba(59, 130, 246, 0.2);
        }

        .card-header {
          padding: 2rem;
          border-bottom: 1px solid rgba(148, 163, 184, 0.15);
        }

        .partner-image-container {
          position: relative;
          width: 100%;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          background: rgba(248, 250, 252, 0.6);
          border-radius: 15px;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.1);
        }

        .partner-image {
          max-width: 80%;
          max-height: 80px;
          width: auto;
          height: auto;
          object-fit: contain;
          transition: all 0.3s ease;
        }

        .partner-card:hover .partner-image {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .partner-card:hover .image-overlay {
          opacity: 1;
        }

        .partnership-year {
          color: white;
          font-weight: 600;
          text-align: center;
        }

        .partner-info {
          text-align: center;
        }

        .partner-name {
          color: #1e293b;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .partner-category {
          color: #3b82f6;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .partner-specialization {
          color: #64748b;
          font-size: 0.9rem;
          font-style: italic;
        }

        .card-body {
          padding: 2rem;
        }

        .partner-description {
          color: #64748b;
          line-height: 1.8;
          text-align: justify;
          font-size: 1rem;
        }

        .card-footer {
          padding: 2rem;
          border-top: 1px solid rgba(148, 163, 184, 0.15);
          background: rgba(248, 250, 252, 0.6);
        }

        .highlights-section {
          margin-bottom: 1.5rem;
        }

        .highlights-title {
          color: #1e293b;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .highlight-icon {
          color: #3b82f6;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .highlight-text {
          color: #64748b;
          font-size: 0.9rem;
        }

        .partner-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .stat-icon {
          font-size: 1.2rem;
        }

        .stat-text {
          color: #64748b;
          font-weight: 500;
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .partner-card:hover .card-glow {
          left: 100%;
        }

        /* Benefits Section */
        .benefits-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 20px;
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .benefits-title {
          color: #1e293b;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2.5rem;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .benefit-card {
          background: rgba(248, 250, 252, 0.6);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 15px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .benefit-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(59, 130, 246, 0.2);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .benefit-card h3 {
          color: #1e293b;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .benefit-card p {
          color: #64748b;
          line-height: 1.6;
        }

        /* Enhanced Mobile & Tablet Responsive Design */
        @media (max-width: 1024px) {
          .main-content {
            padding: 1.5rem;
          }

          .page-header {
            padding: 2.5rem 2rem;
          }

          .partners-grid {
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 1.5rem;
          }

          .benefits-section {
            padding: 2.5rem 2rem;
          }
        }

        @media (max-width: 768px) {
          .advanced-partners-container {
            padding-top: 80px;
          }

          .main-content {
            padding: 1rem;
          }

          .page-header {
            padding: 2rem 1.5rem;
            margin-bottom: 2rem;
          }

          .stats-badges {
            gap: 1rem;
          }

          .stat-badge {
            padding: 0.75rem 1rem;
          }

          .partners-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .partner-card {
            margin: 0;
          }

          .card-header,
          .card-body,
          .card-footer {
            padding: 1.5rem;
          }

          .highlights-grid {
            grid-template-columns: 1fr;
          }

          .partner-stats {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .benefits-section {
            padding: 2rem 1.5rem;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .partner-name {
            font-size: 1.5rem;
          }

          .partner-description {
            font-size: 0.95rem;
            text-align: right;
          }
        }

        @media (max-width: 480px) {
          .advanced-partners-container {
            padding-top: 70px;
          }

          .main-content {
            padding: 0.75rem;
          }

          .page-header {
            padding: 1.5rem 1rem;
            margin-bottom: 1.5rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .page-subtitle {
            font-size: 1rem;
          }

          .stats-badges {
            flex-direction: column;
            gap: 0.75rem;
            align-items: center;
          }

          .stat-badge {
            padding: 0.75rem 1rem;
            min-width: 150px;
          }

          .partners-grid {
            gap: 1rem;
          }

          .card-header,
          .card-body,
          .card-footer {
            padding: 1.25rem;
          }

          .partner-image-container {
            height: 100px;
          }

          .partner-image {
            max-height: 60px;
          }

          .partner-name {
            font-size: 1.25rem;
          }

          .partner-description {
            font-size: 0.9rem;
            line-height: 1.6;
            text-align: right;
          }

          .benefits-section {
            padding: 1.5rem 1rem;
          }

          .benefits-title {
            font-size: 1.5rem;
          }

          .benefit-card {
            padding: 1.5rem 1rem;
          }

          .benefit-card h3 {
            font-size: 1.1rem;
          }

          .benefit-card p {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 360px) {
          .page-header {
            padding: 1.25rem 0.75rem;
          }

          .card-header,
          .card-body,
          .card-footer {
            padding: 1rem;
          }

          .benefits-section {
            padding: 1.25rem 0.75rem;
          }

          .partner-image-container {
            height: 80px;
          }

          .partner-image {
            max-height: 50px;
          }
        }
      `}</style>
    </div>
  );
}

export default AdvancedPartners;