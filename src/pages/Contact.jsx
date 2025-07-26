import { useRef, useState, useCallback,useContext } from 'react';
import emailjs from '@emailjs/browser';
import { LanguageContext } from '../context/LanguageContext'; // ✅ Import LanguageContext

// ✅ Replace react-icons with simple SVG icons
const MapIcon = () => (
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

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

// ✅ ContactItem component
const ContactItem = ({ icon: IconComponent, text, color, language }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!IconComponent) {
    return null;
  }
  
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem',
        padding: '1rem',
        background: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(248, 250, 252, 0.6)',
        borderRadius: '12px',
        border: `2px solid ${color}20`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 4px 15px ${color}30` : '0 2px 8px rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(5px)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        marginRight: language === 'ar' ? '0' : '15px',
        marginLeft: language === 'ar' ? '15px' : '0',
        color: color,
        fontSize: '1.2rem'
      }}>
        <IconComponent />
      </div>
      <span style={{
        color: '#64748b',
        fontSize: '0.95rem',
        fontWeight: '500'
      }}>
        {text}
      </span>
    </div>
  );
};

// ✅ InputField component
const InputField = ({ 
  type, 
  name, 
  value, 
  onChange, 
  placeholder, 
  label, 
  rows,
  required = false 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '2px solid rgba(148, 163, 184, 0.2)',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: isFocused ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)',
    boxSizing: 'border-box',
    color: '#1e293b',
    backdropFilter: 'blur(10px)',
    borderColor: isFocused ? '#3b82f6' : 'rgba(148, 163, 184, 0.2)',
    transform: isFocused ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isFocused ? '0 4px 15px rgba(59, 130, 246, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
  };

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{
        display: 'block',
        marginBottom: '0.5rem',
        color: '#1e293b',
        fontWeight: '600',
        fontSize: '0.9rem'
      }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows || 5}
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: '120px'
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </div>
  );
};

// ✅ SubmitButton component
const SubmitButton = ({ isLoading, children, onClick, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{
        width: '100%',
        padding: '1rem',
        background: isLoading 
          ? 'linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)'
          : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        boxShadow: isHovered && !isLoading ? '0 8px 25px rgba(59, 130, 246, 0.4)' : '0 4px 15px rgba(59, 130, 246, 0.2)',
        transform: isHovered && !isLoading ? 'translateY(-3px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

function Contact() {
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
 const { currentLang: language } = useContext(LanguageContext);

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    message: ''
  });

  const content = {
    ar: {
      title: 'تواصل معنا',
      subtitle: 'نحن هنا لخدمتكم، تواصلوا معنا في أي وقت',
      companyInfo: 'الطب والصحة · صيدلية',
      location: 'فلسطين، رام الله، P-606',
      phone: '+972 59-778-3617',
      email: 'info@tskmed.com',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'أدخل اسمك الكامل',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'your.email@example.com',
      titleLabel: 'العنوان',
      titlePlaceholder: 'موضوع الرسالة',
      messageLabel: 'الرسالة',
      messagePlaceholder: 'اكتب رسالتك هنا...',
      sendButton: 'إرسال الرسالة',
      sendingButton: 'جاري الإرسال...',
      successMessage: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
      errorMessage: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.',
      contactInfo: 'معلومات التواصل',
      sendMessage: 'إرسال رسالة',
      toggleLanguage: 'English'
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We are here to serve you, contact us anytime',
      companyInfo: 'Medical & health · Pharmacy / Drugstore',
      location: 'Palestine, Ramallah, P-606',
      phone: '+972 59-778-3617',
      email: 'Tskmedicaltrade@gmail.com',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'your.email@example.com',
      titleLabel: 'Subject',
      titlePlaceholder: 'Message subject',
      messageLabel: 'Message',
      messagePlaceholder: 'Write your message here...',
      sendButton: 'Send Message',
      sendingButton: 'Sending...',
      successMessage: 'Your message has been sent successfully! We will contact you soon.',
      errorMessage: 'An error occurred while sending. Please try again.',
      contactInfo: 'Contact Information',
      sendMessage: 'Send Message',
      toggleLanguage: 'العربية'
    }
  };

  const t = content[language] || content.ar;



  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const validateForm = useCallback(() => {
    const errors = [];
    if (!formData.name.trim()) errors.push('name');
    if (!formData.email.trim()) errors.push('email');
    if (!formData.title.trim()) errors.push('title');
    if (!formData.message.trim()) errors.push('message');
    return errors;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    setIsLoading(true);
    setStatus('');

    try {
     await emailjs.send(
  'service_2cj7xhf',           
  'template_6y75wan',          
  {
    name: formData.name,
    email: formData.email,
    title: formData.title,
    message: formData.message
  },
  'Z-i2H34ZsiwkX9iRb'          
);

      
      setStatus('success');
      setFormData({ name: '', email: '', title: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus(''), 5000);
    }
  }, [formData, validateForm]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        padding: '2rem 1rem',
        paddingTop: '6rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        direction: language === 'ar' ? 'rtl' : 'ltr',
        position: 'relative',
        overflow: 'hidden'
      }}
    >


      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          top: '10%',
          left: '10%',
          borderRadius: '50%',
          background: 'rgba(148, 163, 184, 0.05)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, #94a3b8, transparent)',
          bottom: '30%',
          right: '70%',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: '0.3',
          animation: 'pulse 6s ease-in-out infinite 2s'
        }} />
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#1e293b'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            margin: '0 0 1rem 0',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {t.title}
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {t.subtitle}
          </p>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          
          {/* Contact Information Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              marginBottom: '2rem',
              color: '#1e293b',
              textAlign: 'center'
            }}>
              {t.contactInfo}
            </h2>

            <div style={{ marginBottom: '2rem' }}>
              <ContactItem 
                icon={InfoIcon} 
                text={t.companyInfo} 
                color="#3b82f6" 
                language={language}
              />
              <ContactItem 
                icon={MapIcon} 
                text={t.location} 
                color="#10b981" 
                language={language}
              />
              <ContactItem 
                icon={PhoneIcon} 
                text={t.phone} 
                color="#f59e0b" 
                language={language}
              />
              <ContactItem 
                icon={EmailIcon} 
                text={t.email} 
                color="#8b5cf6" 
                language={language}
              />
            </div>

            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              borderRadius: '15px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}>
              🌟 {language === 'ar' ? 'نحن في خدمتكم دائماً' : 'Always at your service'} 🌟
            </div>
          </div>

          {/* Contact Form Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              marginBottom: '2rem',
              color: '#1e293b',
              textAlign: 'center'
            }}>
              {t.sendMessage}
            </h2>

            {/* Status Messages */}
            {status === 'success' && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ marginRight: '10px', fontSize: '1.2rem' }}>
                  <CheckIcon />
                </div>
                <span style={{ fontWeight: '500' }}>{t.successMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ marginRight: '10px', fontSize: '1.2rem' }}>
                  <WarningIcon />
                </div>
                <span style={{ fontWeight: '500' }}>{t.errorMessage}</span>
              </div>
            )}

            {/* Form container */}
           <form 
  ref={formRef} 
  onSubmit={(e) => {
    e.preventDefault(); // مهم
    handleSubmit();
  }}
  onKeyDown={handleKeyPress}
  style={{ width: '100%' }}
>

              <InputField 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t.namePlaceholder}
                label={t.nameLabel}
                required
              />

              <InputField 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t.emailPlaceholder}
                label={t.emailLabel}
                required
              />

              <InputField 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={t.titlePlaceholder}
                label={t.titleLabel}
                required
              />

              <InputField 
                type="textarea"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t.messagePlaceholder}
                label={t.messageLabel}
                rows={5}
                required
              />

              <SubmitButton 
                isLoading={isLoading}
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #ffffff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    {t.sendingButton}
                  </>
                ) : (
                  <>
                    <SendIcon />
                    {t.sendButton}
                  </>
                )}
              </SubmitButton>

              <div style={{
                marginTop: '1rem',
                fontSize: '0.9rem',
                color: '#64748b',
                textAlign: 'center'
              }}>
                {language === 'ar' 
                  ? 'اضغط Ctrl+Enter للإرسال السريع' 
                  : 'Press Ctrl+Enter for quick submit'
                }
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }

        input::placeholder,
        textarea::placeholder {
          color: #94a3b8;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.9) inset !important;
          -webkit-text-fill-color: #1e293b !important;
          transition: background-color 5000s ease-in-out 0s;
        }

        input:focus,
        textarea:focus,
        button:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Enhanced Mobile & Tablet Responsive Design */
        @media (max-width: 1024px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)) !important;
          }
          
          div[style*="padding: 2.5rem"] {
            padding: 2rem !important;
          }
        }

        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          
          h1 {
            font-size: 2.5rem !important;
          }
          
          div[style*="padding: 2.5rem"] {
            padding: 1.5rem !important;
          }

          div[style*="paddingTop: '6rem'"] {
            padding-top: 4rem !important;
          }

          div[style*="gap: '2rem'"] {
            gap: 1.5rem !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="padding: 2rem 1rem"] {
            padding: 1rem 0.75rem !important;
          }

          div[style*="paddingTop: '6rem'"] {
            padding-top: 3rem !important;
          }
          
          h1 {
            font-size: 2rem !important;
          }

          h2 {
            font-size: 1.5rem !important;
          }
          
          div[style*="padding: 2.5rem"] {
            padding: 1.25rem !important;
          }

          div[style*="gap: '2rem'"] {
            gap: 1rem !important;
          }

          div[style*="marginBottom: '3rem'"] {
            margin-bottom: 2rem !important;
          }

          div[style*="fontSize: '1.2rem'"] p {
            font-size: 1rem !important;
          }

          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 360px) {
          div[style*="padding: 2rem 1rem"] {
            padding: 0.75rem 0.5rem !important;
          }

          div[style*="padding: 2.5rem"] {
            padding: 1rem !important;
          }

          h1 {
            font-size: 1.75rem !important;
          }

          h2 {
            font-size: 1.25rem !important;
          }

          div[style*="gap: '2rem'"] {
            gap: 0.75rem !important;
          }

          input, textarea {
            font-size: 0.9rem !important;
          }

          button {
            font-size: 1rem !important;
            padding: 0.875rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;