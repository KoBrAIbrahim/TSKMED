import React, { useContext, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { BsWhatsapp } from 'react-icons/bs';

// SVG Icons
const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const MedicalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 2h4v4h2V4h2v4h2v2h-2v4h-2V6h-4V4z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.04L12,21.35Z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
  </svg>
);

const ContactItem = ({ icon, text, language, isHoverable = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="contact-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        padding: isHoverable ? '0.8rem' : '0.5rem 0',
        background: isHoverable && isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        borderRadius: isHoverable ? '8px' : '0',
        transition: 'all 0.3s ease',
        cursor: isHoverable ? 'pointer' : 'default'
      }}
      onMouseEnter={() => isHoverable && setIsHovered(true)}
      onMouseLeave={() => isHoverable && setIsHovered(false)}
    >
      <div style={{
        marginRight: language === 'ar' ? '0' : '12px',
        marginLeft: language === 'ar' ? '12px' : '0',
        color: '#3b82f6',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0
      }}>
        {icon}
      </div>
      <span className="contact-text" style={{
        fontSize: '0.95rem',
        lineHeight: '1.5',
        wordBreak: 'break-word'
      }}>
        {text}
      </span>
    </div>
  );
};

const Footer = () => {
  const { currentLang: language } = useContext(LanguageContext);

  const content = {
    ar: {
      companyName: 'TSK للتجارة الطبية',
      companyDescription: 'الطب والصحة  · صيدلية',
      contactTitle: 'معلومات التواصل',
      servicesTitle: 'خدماتنا',
      aboutTitle: 'من نحن',
      location: 'فلسطين، رام الله، P-606',
      phone: '+972 59-778-3617',
      email: 'info@tskmed.com',
      workingHours: 'ساعات العمل',
      workingTime: 'السبت-الخميس من 9:00 ص إلى 4:00 م',
      services: [
        'مستلزمات طبية عالية الجودة',
        'أدوية وعلاجات متنوعة',
      ],
      aboutText: 'نحن نلتزم بتقديم أفضل المنتجات الطبية والصحية لخدمتكم بأعلى معايير الجودة والأمان.',
      copyright: '© 2025 TSK للتجارة الطبية. جميع الحقوق محفوظة.',
      trustMessage: 'ثقتكم تهمنا، صحتكم أولويتنا'
    },
    en: {
      companyName: 'TSK Medical Trade',
      companyDescription: 'Medical & Health · Pharmacy',
      contactTitle: 'Contact Information',
      servicesTitle: 'Our Services',
      aboutTitle: 'About Us',
      location: 'Palestine, Ramallah, P-606',
      phone: '+972 59-778-3617',
      email: 'info@tskmed.com',
      workingHours: 'Working Hours',
      workingTime: 'Sat-Thu from 9:00 AM to 4:00 PM',
      services: [
        'High-quality medical supplies',
        'Diverse medications & treatments',
      ],
      aboutText: 'We are committed to providing the best medical and health products to serve you with the highest standards of quality and safety.',
      copyright: '© 2025 TSK Medical Trade. All rights reserved.',
      trustMessage: 'Your trust matters to us, your health is our priority'
    }
  };

  const t = content[language] || content.ar;

  return (
    <>
      <footer className="footer-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* Background decorative elements */}
        <div className="background-elements">
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
        </div>

        <div className="footer-content">
          {/* Main footer content */}
          <div className="footer-grid">
            
            {/* Company Info */}
            <div className="footer-card">
              <div className="company-header">
                <div className="company-icon">
                  <MedicalIcon />
                </div>
                <h3 className="company-title">
                  {t.companyName}
                </h3>
              </div>
              <p className="company-description">
                {t.companyDescription}
              </p>
              <div className="trust-badge">
                <HeartIcon />
                <span className="trust-text">
                  {t.trustMessage}
                </span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="footer-card">
              <h3 className="section-title">
                {t.contactTitle}
              </h3>
              
              <ContactItem 
                icon={<LocationIcon />}
                text={t.location}
                language={language}
                isHoverable={true}
              />
              <ContactItem 
                icon={<BsWhatsapp/>}
                text={t.phone}
                language={language}
                isHoverable={true}
              />
             <ContactItem 
  icon={<EmailIcon />}
  text={
    <a href={`mailto:${t.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
      {t.email}
    </a>
  }
  language={language}
  isHoverable={true}
/>

              
              <div className="working-hours">
                <ContactItem 
                  icon={<ClockIcon />}
                  text={`${t.workingHours}: ${t.workingTime}`}
                  language={language}
                />
              </div>
            </div>

            {/* Services & About */}
            <div className="footer-card">
              <h3 className="section-title services-title">
                <ShieldIcon />
                <span>{t.servicesTitle}</span>
              </h3>
              
              <ul className="services-list">
                {t.services.map((service, index) => (
                  <li key={index} className="service-item">
                    <span className="service-check">✓</span>
                    {service}
                  </li>
                ))}
              </ul>

              <div className="about-section">
                <p className="about-text">
                  {t.aboutText}
                </p>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="made-with-love">
                <HeartIcon />
                <span>
                  {language === 'ar' ? 'صُنع بحب في فلسطين' : 'Made with love in Palestine'}
                </span>
              </div>
            </div>
            
            <p className="copyright">
              {t.copyright}
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer-container {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
          color: #1e293b;
          padding: 3rem 1rem 1rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .background-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.3;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 8s ease-in-out infinite;
        }

        .bg-orb-1 {
          width: 200px;
          height: 200px;
          top: 20%;
          right: 10%;
          background: radial-gradient(circle, #94a3b8, transparent);
          animation-delay: 0s;
        }

        .bg-orb-2 {
          width: 150px;
          height: 150px;
          bottom: 10%;
          left: 15%;
          background: radial-gradient(circle, #64748b, transparent);
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) scale(1.1); 
            opacity: 0.5;
          }
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2.5rem;
          margin-bottom: 2rem;
        }

        .footer-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .footer-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
        }

        .company-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .company-icon {
          margin-right: 15px;
          color: #3b82f6;
        }

        .footer-container[dir="rtl"] .company-icon {
          margin-right: 0;
          margin-left: 15px;
        }

        .company-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0;
          color: #1e293b;
        }

        .company-description {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          color: #64748b;
        }

        .trust-badge {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .trust-text {
          margin-left: 10px;
        }

        .footer-container[dir="rtl"] .trust-text {
          margin-left: 0;
          margin-right: 10px;
        }

        .section-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #1e293b;
          display: flex;
          align-items: center;
        }

        .services-title span {
          margin-left: 10px;
        }

        .footer-container[dir="rtl"] .services-title span {
          margin-left: 0;
          margin-right: 10px;
        }

        .working-hours {
          margin-top: 1.5rem;
          padding: 1rem;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 10px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .services-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem 0;
        }

        .service-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.8rem;
          font-size: 0.9rem;
          color: #64748b;
        }

        .service-check {
          color: #3b82f6;
          margin-right: 10px;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .footer-container[dir="rtl"] .service-check {
          margin-right: 0;
          margin-left: 10px;
        }

        .about-section {
          padding: 1rem;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 10px;
          border-left: 4px solid #3b82f6;
        }

        .footer-container[dir="rtl"] .about-section {
          border-left: none;
          border-right: 4px solid #3b82f6;
        }

        .about-text {
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
          color: #64748b;
        }

        .footer-bottom {
          text-align: center;
          padding: 2rem 0 1rem 0;
          border-top: 1px solid rgba(148, 163, 184, 0.2);
          position: relative;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .made-with-love {
          display: flex;
          align-items: center;
          color: #3b82f6;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .made-with-love span {
          margin-left: 8px;
        }

        .footer-container[dir="rtl"] .made-with-love span {
          margin-left: 0;
          margin-right: 8px;
        }

        .copyright {
          font-size: 0.9rem;
          color: #94a3b8;
          margin: 0;
          font-weight: 400;
        }

        /* Enhanced Mobile Responsive Design */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
          }

          .footer-card {
            padding: 1.75rem;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 2rem 1rem 1rem 1rem;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .footer-card {
            padding: 1.5rem;
          }

          .company-header {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .company-icon {
            margin-right: 0;
            margin-left: 0;
            margin-bottom: 0.5rem;
          }

          .company-title {
            font-size: 1.25rem;
          }

          .section-title {
            font-size: 1.2rem;
            justify-content: center;
            text-align: center;
          }

          .services-title {
            flex-direction: column;
            gap: 0.5rem;
          }

          .services-title span {
            margin-left: 0;
            margin-right: 0;
          }

          .trust-badge {
            justify-content: center;
            text-align: center;
          }

          .footer-bottom-content {
            flex-direction: column;
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 1.5rem 0.75rem 1rem 0.75rem;
          }

          .footer-card {
            padding: 1.25rem;
            border-radius: 15px;
          }

          .company-title {
            font-size: 1.1rem;
          }

          .company-description {
            font-size: 0.9rem;
          }

          .section-title {
            font-size: 1.1rem;
          }

          .contact-text {
            font-size: 0.9rem !important;
          }

          .service-item {
            font-size: 0.85rem;
          }

          .about-text {
            font-size: 0.85rem;
          }

          .trust-badge {
            padding: 0.875rem;
            font-size: 0.85rem;
          }

          .made-with-love {
            font-size: 0.85rem;
          }

          .copyright {
            font-size: 0.8rem;
          }

          .working-hours {
            padding: 0.875rem;
          }

          .about-section {
            padding: 0.875rem;
          }
        }

        @media (max-width: 360px) {
          .footer-container {
            padding: 1.25rem 0.5rem 1rem 0.5rem;
          }

          .footer-card {
            padding: 1rem;
          }

          .company-title {
            font-size: 1rem;
          }

          .section-title {
            font-size: 1rem;
          }

          .contact-item {
            margin-bottom: 0.75rem !important;
            padding: 0.6rem 0 !important;
          }

          .contact-text {
            font-size: 0.85rem !important;
          }

          .service-item {
            font-size: 0.8rem;
            margin-bottom: 0.6rem;
          }

          .trust-badge {
            padding: 0.75rem;
            font-size: 0.8rem;
          }

          .working-hours {
            padding: 0.75rem;
          }

          .about-section {
            padding: 0.75rem;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;