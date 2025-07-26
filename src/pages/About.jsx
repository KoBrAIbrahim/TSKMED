import React, {useContext , useState, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';

function AdvancedAbout() {
  const [activeTab, setActiveTab] = useState('foundation');
  const { currentLang } = useContext(LanguageContext); // ⬅️ استخدم currentLang بدلاً من language
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // ⬅️ إضافة fallback للتأكد من وجود اللغة
  const language = currentLang || 'ar'; // القيمة الافتراضية هي العربية

  const tabs = {
    ar: {
      foundation: {
        title: 'تأسيس الشركة',
        content: (
          <div className="tab-content-wrapper">
            <div className="content-header">
              <h3>TSK Med</h3>
              <div className="year-badge">2023</div>
            </div>
            <div className="content-body">
              <p>
                تأسست شركة <strong>TSK Med</strong> في عام 2023 في فلسطين على يد مجموعة من الشباب الفلسطينيين الطموحين، من رواد الأعمال الذين يحملون في قلوبهم شغفًا بالتغيير والإبداع.
              </p>
              <p>
                انطلقت الشركة برؤية واضحة تهدف إلى إحداث فارق حقيقي في المجتمع من خلال توفير حلول مبتكرة وفعالة. مع بداية متواضعة لكنها ملهمة، استطاعت TSK Med أن تضع بصمتها الأولى بثقة وعزيمة.
              </p>
              <p>
                بنيت الشركة على قيم النزاهة، والطموح، وروح التعاون، وهي تمضي قدمًا في طريقها نحو تحقيق الريادة في مجالها، مستندةً إلى خلفيات علمية ومهنية متنوعة من مؤسسيها.
              </p>
            </div>
            <div className="content-footer">
              <div className="highlight-box">
                <h4>قيمنا الأساسية</h4>
                <ul>
                  <li>النزاهة والشفافية</li>
                  <li>الطموح والإبداع</li>
                  <li>روح التعاون</li>
                  <li>التميز في الخدمة</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      operation: {
        title: 'عمل الشركة',
        content: (
          <div className="tab-content-wrapper">
            <div className="content-header">
              <h3>مجال العمل الطبي</h3>
              <div className="sector-badge">القطاع الصيدلاني</div>
            </div>
            <div className="content-body">
              <p>
                تعمل شركة <strong>TSK Med</strong> في القطاع الطبي، وتحديدًا في مجال الأدوية والمنتجات الصيدلانية. تتولى الشركة مسؤولية الحصول على وكالات حصرية لمجموعة من المنتجات، وتقوم بتوزيعها بشكل استراتيجي على مستوى الوطن.
              </p>
              <p>
                تعتمد الشركة في عملياتها على فريق متخصص يشمل موظفين مختصين في الدعاية الطبية، إضافة إلى طاقم مبيعات وتوزيع يغطي جميع أنحاء فلسطين من شمالها إلى جنوبها.
              </p>
              <p>
                تهدف الشركة إلى بناء شبكة توزيع فعالة تخدم المستشفيات، الصيدليات، والمراكز الطبية بجودة عالية وسرعة استجابة.
              </p>
            </div>
            <div className="content-footer">
              <div className="services-grid">
                <div className="service-item">
                  
                  <span>المستشفيات</span>
                </div>
                <div className="service-item">
                  
                  <span>الصيدليات</span>
                </div>
                <div className="service-item">
                  
                  <span>المراكز الطبية</span>
                </div>
                <div className="service-item">
                 
                  <span>التوزيع الوطني</span>
                </div>
              </div>
            </div>
          </div>
        )
      },
      future: {
        title: 'مستقبل الشركة',
        content: (
          <div className="tab-content-wrapper">
            <div className="content-header">
              <h3>رؤيتنا المستقبلية</h3>
              <div className="vision-badge">2030+</div>
            </div>
            <div className="content-body">
              <p>
                تطمح شركة <strong>TSK Med</strong> لأن تصبح واحدة من الشركات الرائدة في فلسطين والمنطقة على المدى الطويل. تسعى لتوسيع نطاق شراكاتها مع شركات عالمية مرموقة في المجال الطبي والدوائي.
              </p>
              <p>
                تفتح الشركة آفاق التعاون مع علامات تجارية دولية، وتسعى لأن تكون جسرًا موثوقًا بين الأسواق العالمية واحتياجات السوق المحلي.
              </p>
              <p>
                تؤمن TSK Med أن المستقبل يُبنى اليوم من خلال الابتكار، وتطوير الكفاءات، والاستثمار المستدام في العلاقات والشراكات.
              </p>
            </div>
            <div className="content-footer">
              <div className="goals-timeline">
                <div className="timeline-item">
                  <div className="timeline-year">2024</div>
                  <div className="timeline-goal">توسيع الشراكات الإقليمية</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2026</div>
                  <div className="timeline-goal">دخول أسواق جديدة</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2030</div>
                  <div className="timeline-goal">الريادة الإقليمية</div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    },
    en: {
      foundation: {
        title: 'Company Foundation',
        content: (
          <div className="tab-content-wrapper">
            <div className="content-header">
              <h3>TSK Med</h3>
              <div className="year-badge">2023</div>
            </div>
            <div className="content-body">
              <p>
                <strong>TSK Med</strong> was founded in 2023 in Palestine by a group of ambitious young Palestinians, entrepreneurs who carry in their hearts a passion for change and innovation.
              </p>
              <p>
                The company launched with a clear vision aimed at making a real difference in the community by providing innovative and effective solutions. With a humble but inspiring beginning, TSK Med was able to make its first mark with confidence and determination.
              </p>
              <p>
                The company was built on the values of integrity, ambition, and teamwork spirit, moving forward on its path toward achieving leadership in its field, based on the diverse scientific and professional backgrounds of its founders.
              </p>
            </div>
            <div className="content-footer">
              <div className="highlight-box">
                <h4>Our Core Values</h4>
                <ul>
                  <li>Integrity and Transparency</li>
                  <li>Ambition and Innovation</li>
                  <li>Team Spirit</li>
                  <li>Excellence in Service</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      operation: {
        title: 'Company Operations',
        content: (
          <div className="tab-content-wrapper">
            <div className="content-header">
              <h3>Medical Field Operations</h3>
              <div className="sector-badge">Pharmaceutical Sector</div>
            </div>
            <div className="content-body">
              <p>
                <strong>TSK Med</strong> operates in the medical sector, specifically in the field of pharmaceuticals and medical products. The company handles obtaining exclusive agencies for a range of products and distributes them strategically nationwide.
              </p>
              <p>
                The company relies on a specialized team that includes employees specialized in medical promotion, in addition to a sales and distribution team that covers all of Palestine from north to south.
              </p>
              <p>
                The company aims to build an effective distribution network that serves hospitals, pharmacies, and medical centers with high quality and fast response.
              </p>
            </div>
            <div className="content-footer">
              <div className="services-grid">
                <div className="service-item">
                  <div className="service-icon">🏥</div>
                  <span>Hospitals</span>
                </div>
                <div className="service-item">
                  <div className="service-icon">💊</div>
                  <span>Pharmacies</span>
                </div>
                <div className="service-item">
                  <div className="service-icon">🏛️</div>
                  <span>Medical Centers</span>
                </div>
                <div className="service-item">
                  <div className="service-icon">🚚</div>
                  <span>National Distribution</span>
                </div>
              </div>
            </div>
          </div>
        )
      },
      future: {
        title: 'Company Future',
        content: (
          <div className="tab-content-wrapper">
            <div className="content-header">
              <h3>Our Future Vision</h3>
              <div className="vision-badge">2030+</div>
            </div>
            <div className="content-body">
              <p>
                <strong>TSK Med</strong> aspires to become one of the leading companies in Palestine and the region in the long term. It seeks to expand its partnerships with prestigious global companies in the medical and pharmaceutical field.
              </p>
              <p>
                The company opens horizons for cooperation with international brands and seeks to be a trusted bridge between global markets and local market needs.
              </p>
              <p>
                TSK Med believes that the future is built today through innovation, capacity development, and sustainable investment in relationships and partnerships.
              </p>
            </div>
            <div className="content-footer">
              <div className="goals-timeline">
                <div className="timeline-item">
                  <div className="timeline-year">2024</div>
                  <div className="timeline-goal">Expand Regional Partnerships</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2026</div>
                  <div className="timeline-goal">Enter New Markets</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2030</div>
                  <div className="timeline-goal">Regional Leadership</div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
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

  // ⬅️ إضافة تحقق من وجود البيانات قبل الرندر
  if (!tabs[language]) {
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
      className="advanced-about-container"
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
        <div className="about-section">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">
              {language === 'ar' ? 'من نحن' : 'About Us'}
            </h1>
            <p className="page-subtitle">
              {language === 'ar' 
                ? 'تعرف على قصة TSK Med ورحلتنا في خدمة القطاع الطبي'
                : 'Learn about TSK Med\'s story and our journey in serving the medical sector'}
            </p>
          </div>

          {/* Tabs Container */}
          <div className="tabs-container">
            {/* Tab Navigation */}
            <div className="tabs-nav">
              {Object.entries(tabs[language]).map(([key, tab]) => (
                <button
                  key={key}
                  className={`tab-button ${activeTab === key ? 'active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  <span className="tab-title">{tab.title}</span>
                  <div className="tab-indicator"></div>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              <div className="content-container">
                {tabs[language][activeTab]?.content || (
                  <div>المحتوى غير متوفر</div>
                )}
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

        .advanced-about-container {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          font-family: 'Segoe UI', 'Tahoma', 'Arial', sans-serif;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
          padding-top: 100px;
        }

        .advanced-about-container[dir="rtl"] {
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

        .about-section {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Page Header */
        .page-header {
          text-align: center;
          margin-bottom: 3rem;
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
          max-width: 600px;
          margin: 0 auto;
        }

        /* Tabs Container */
        .tabs-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        /* Tab Navigation */
        .tabs-nav {
          display: flex;
          background: rgba(248, 250, 252, 0.6);
          backdrop-filter: blur(5px);
          border-bottom: 1px solid rgba(148, 163, 184, 0.15);
        }

        .tab-button {
          position: relative;
          flex: 1;
          padding: 1.5rem 1rem;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-family: inherit;
          overflow: hidden;
        }

        .tab-button:hover {
          color: #1e293b;
          background: rgba(255, 255, 255, 0.5);
        }

        .tab-button.active {
          color: #1e293b;
          background: rgba(255, 255, 255, 0.8);
        }

        .tab-title {
          font-size: 1rem;
          font-weight: 500;
          text-align: center;
        }

        .tab-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          transform: scaleX(0);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tab-button.active .tab-indicator {
          transform: scaleX(1);
        }

        /* Tab Content */
        .tab-content {
          padding: 3rem;
          min-height: 500px;
        }

        .content-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .tab-content-wrapper {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .content-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .content-header h3 {
          color: #1e293b;
          font-size: 2rem;
          font-weight: 700;
        }

        .year-badge,
        .sector-badge,
        .vision-badge {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .content-body {
          margin-bottom: 2rem;
        }

        .content-body p {
          color: #64748b;
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .content-body strong {
          color: #1e293b;
          font-weight: 600;
        }

        /* Content Footer Elements */
        .highlight-box {
          background: rgba(248, 250, 252, 0.6);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 15px;
          padding: 1.5rem;
          margin-top: 2rem;
        }

        .highlight-box h4 {
          color: #1e293b;
          font-size: 1.3rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .highlight-box ul {
          list-style: none;
          padding: 0;
        }

        .highlight-box li {
          color: #64748b;
          padding: 0.5rem 0;
          position: relative;
          padding-right: 1.5rem;
        }

        .highlight-box li::before {
          content: '✓';
          position: absolute;
          right: 0;
          color: #3b82f6;
          font-weight: bold;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }

        .service-item {
          background: rgba(248, 250, 252, 0.6);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 15px;
          padding: 1rem;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .service-item:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(59, 130, 246, 0.2);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .service-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .service-item span {
          color: #64748b;
          font-weight: 500;
        }

        .goals-timeline {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          gap: 1rem;
        }

        .timeline-item {
          flex: 1;
          background: rgba(248, 250, 252, 0.6);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 15px;
          padding: 1.5rem 1rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .timeline-item:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(59, 130, 246, 0.2);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .timeline-year {
          color: #3b82f6;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .timeline-goal {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Enhanced Mobile & Tablet Responsive Design */
        @media (max-width: 1024px) {
          .main-content {
            padding: 1.5rem;
          }

          .page-header {
            padding: 2.5rem 2rem;
          }

          .tab-content {
            padding: 2.5rem 2rem;
          }

          .content-header h3 {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 768px) {
          .advanced-about-container {
            padding-top: 80px;
          }

          .main-content {
            padding: 1rem;
          }

          .page-header {
            padding: 2rem 1.5rem;
            margin-bottom: 2rem;
          }

          .tabs-nav {
            flex-direction: column;
          }

          .tab-button {
            flex-direction: row;
            justify-content: center;
            padding: 1rem;
            gap: 0.75rem;
          }

          .tab-content {
            padding: 2rem 1.5rem;
            min-height: 400px;
          }

          .content-header {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
          }

          .content-header h3 {
            font-size: 1.5rem;
          }

          .content-body p {
            font-size: 1rem;
            text-align: right;
          }

          .goals-timeline {
            flex-direction: column;
          }

          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .service-item {
            padding: 0.75rem;
          }

          .timeline-item {
            padding: 1.25rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .advanced-about-container {
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

          .tab-content {
            padding: 1.5rem 1rem;
            min-height: 350px;
          }

          .content-header h3 {
            font-size: 1.25rem;
          }

          .content-body p {
            font-size: 0.95rem;
            line-height: 1.6;
            text-align: right;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .service-item {
            padding: 0.75rem 0.5rem;
          }

          .tab-button {
            padding: 0.75rem;
          }

          .tab-title {
            font-size: 0.9rem;
          }

          .timeline-item {
            padding: 1rem 0.75rem;
          }

          .timeline-year {
            font-size: 1.25rem;
          }

          .timeline-goal {
            font-size: 0.85rem;
          }

          .highlight-box {
            padding: 1.25rem;
          }

          .highlight-box h4 {
            font-size: 1.1rem;
          }

          .highlight-box li {
            font-size: 0.9rem;
          }

          .year-badge,
          .sector-badge,
          .vision-badge {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }

        @media (max-width: 360px) {
          .page-header {
            padding: 1.25rem 0.75rem;
          }

          .tab-content {
            padding: 1.25rem 0.75rem;
          }

          .content-header {
            gap: 0.75rem;
          }

          .goals-timeline {
            gap: 0.75rem;
          }

          .timeline-item {
            padding: 0.875rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default AdvancedAbout;