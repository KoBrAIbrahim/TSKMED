/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    console.log("✅ صفحة تسجيل الدخول تم تحميلها");
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!email.trim()) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "البريد الإلكتروني غير صحيح";
    }
    
    if (!password.trim()) {
      errors.password = "كلمة المرور مطلوبة";
    } else if (password.length < 6) {
      errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    console.log("🟡 محاولة تسجيل الدخول...");
    console.log("📧 Email:", email);
    
    try {
      setLoading(true);
      setError("");
      
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ تسجيل الدخول ناجح");
      navigate("/admin/main");
      
    } catch (err) {
      console.error("❌ خطأ في تسجيل الدخول:", err.message);
      
      let errorMessage = "حدث خطأ غير متوقع";
      
      if (err.code === 'auth/user-not-found') {
        errorMessage = "البريد الإلكتروني غير مسجل";
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = "كلمة المرور غير صحيحة";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "البريد الإلكتروني غير صحيح";
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = "محاولات كثيرة جداً. حاول لاحقاً";
      } else {
        errorMessage = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
    }
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear general error
    if (error) {
      setError('');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.backgroundPattern}></div>
      
      <div style={styles.loginCard}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.logo}>
              <FaSignInAlt style={styles.logoIcon} />
            </div>
          </div>
          <h1 style={styles.title}>لوحة تحكم الإدارة</h1>
          <p style={styles.subtitle}>قم بتسجيل الدخول للوصول إلى النظام</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          {/* Email Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>البريد الإلكتروني</label>
            <div style={styles.inputContainer}>
              <FaEnvelope style={styles.inputIcon} />
              <input
                type="email"
                placeholder="أدخل البريد الإلكتروني"
                value={email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                required
                autoComplete="email"
                style={{
                  ...styles.input,
                  ...(fieldErrors.email ? styles.inputError : {})
                }}
                disabled={loading}
              />
            </div>
            {fieldErrors.email && (
              <span style={styles.errorText}>{fieldErrors.email}</span>
            )}
          </div>

          {/* Password Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>كلمة المرور</label>
            <div style={styles.inputContainer}>
              <FaLock style={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => handleFieldChange('password', e.target.value)}
                required
                autoComplete="current-password"
                style={{
                  ...styles.input,
                  ...(fieldErrors.password ? styles.inputError : {})
                }}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {fieldErrors.password && (
              <span style={styles.errorText}>{fieldErrors.password}</span>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              ...(loading ? styles.submitButtonDisabled : {})
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner style={styles.spinningIcon} />
                جاري تسجيل الدخول...
              </>
            ) : (
              <>
                <FaSignInAlt style={styles.buttonIcon} />
                تسجيل الدخول
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div style={styles.errorContainer}>
              <div style={styles.errorMessage}>
                <span style={styles.errorIcon}>⚠️</span>
                {error}
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            نظام إدارة المنتجات - تسجيل دخول آمن
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    fontFamily: 'Arial, sans-serif',
    direction: 'rtl',
    position: 'relative',
    padding: '2rem',
  },
  backgroundPattern: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    opacity: 0.1,
    zIndex: 0,
  },
  loginCard: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '3rem',
    width: '100%',
    maxWidth: '450px',
    position: 'relative',
    zIndex: 1,
    border: '1px solid #e2e8f0',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  logo: {
    width: '80px',
    height: '80px',
    backgroundColor: '#3b82f6',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)',
  },
  logoIcon: {
    fontSize: '2rem',
    color: 'white',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: '0 0 0.5rem 0',
    lineHeight: '1.2',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0,
    lineHeight: '1.5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.25rem',
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    right: '1rem',
    color: '#9ca3af',
    fontSize: '1rem',
    zIndex: 2,
  },
  input: {
    width: '100%',
    padding: '1rem 1rem 1rem 2.75rem',
    fontSize: '1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: '#f9fafb',
    fontFamily: 'inherit',
    color: '#111827',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  passwordToggle: {
    position: 'absolute',
    left: '1rem',
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    transition: 'color 0.2s ease',
  },
  errorText: {
    fontSize: '0.8rem',
    color: '#ef4444',
    marginTop: '0.25rem',
    fontWeight: '500',
  },
  submitButton: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
    marginTop: '0.5rem',
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
    transform: 'none',
  },
  buttonIcon: {
    fontSize: '1rem',
  },
  spinningIcon: {
    fontSize: '1rem',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    marginTop: '0.5rem',
    animation: 'slideDown 0.3s ease-out',
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '10px',
    color: '#dc2626',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  errorIcon: {
    fontSize: '1.1rem',
  },
  footer: {
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e5e7eb',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    margin: 0,
  },
};

// Add CSS animations and responsive design
const additionalCSS = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

/* Focus styles */
input:focus {
  border-color: #3b82f6 !important;
  background-color: white !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

/* Hover effects */
.submit-button:hover:not(:disabled) {
  background-color: #2563eb !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 12px -2px rgba(59, 130, 246, 0.4) !important;
}

.password-toggle:hover {
  color: #374151 !important;
}

/* Input error animation */
.input-error {
  animation: shake 0.3s ease-in-out;
}

/* Responsive design */
@media (max-width: 640px) {
  .page-container {
    padding: 1rem !important;
  }
  
  .login-card {
    padding: 2rem !important;
    border-radius: 12px !important;
  }
  
  .logo {
    width: 60px !important;
    height: 60px !important;
  }
  
  .logo-icon {
    font-size: 1.5rem !important;
  }
  
  .title {
    font-size: 1.5rem !important;
  }
}

/* Loading state */
.submit-button:disabled {
  pointer-events: none;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .login-card {
    border: 2px solid #000 !important;
  }
  
  .input {
    border: 2px solid #000 !important;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .page-container {
    background-color: #0f172a !important;
  }
  
  .login-card {
    background-color: #1e293b !important;
    border-color: #334155 !important;
  }
  
  .title {
    color: #f1f5f9 !important;
  }
  
  .subtitle {
    color: #cbd5e1 !important;
  }
  
  .label {
    color: #e2e8f0 !important;
  }
  
  .input {
    background-color: #334155 !important;
    border-color: #475569 !important;
    color: #f1f5f9 !important;
  }
  
  .footer-text {
    color: #64748b !important;
  }
}
`;

// Inject CSS into the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = additionalCSS;
  document.head.appendChild(style);
}

export default Login;