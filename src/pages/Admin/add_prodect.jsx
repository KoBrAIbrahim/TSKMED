import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Your existing import
import { FaArrowLeft, FaPlus, FaTrash, FaImage, FaDollarSign, FaTag, FaRegFileAlt, FaGlobe, FaCheck, FaTimes, FaCog, FaRulerCombined } from "react-icons/fa";


const AddProduct = () => {
  const navigate = useNavigate(); // Your existing navigate hook
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [engDescription, setEngDescription] = useState("");
  const [componentsAR, setComponentsAR] = useState("");
  const [componentsEN, setComponentsEN] = useState("");
  const [size, setSize] = useState("");
  const [desLinks, setDesLinks] = useState([""]);
  const [type, setType] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = "اسم المنتج مطلوب";
    if (!price || price <= 0) newErrors.price = "السعر يجب أن يكون أكبر من الصفر";
    if (!imageUrl.trim()) newErrors.imageUrl = "رابط الصورة مطلوب";
    if (!description.trim()) newErrors.description = "الوصف بالعربية مطلوب";
    if (!engDescription.trim()) newErrors.engDescription = "الوصف بالإنجليزية مطلوب";
    if (!componentsAR.trim()) newErrors.componentsAR = "المكونات بالعربية مطلوبة";
    if (!componentsEN.trim()) newErrors.componentsEN = "المكونات بالإنجليزية مطلوبة";
    if (!size.trim()) newErrors.size = "الحجم مطلوب";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddLink = () => {
    setDesLinks([...desLinks, ""]);
  };

  const handleRemoveLink = (index) => {
    if (desLinks.length > 1) {
      const updated = desLinks.filter((_, idx) => idx !== index);
      setDesLinks(updated);
    }
  };

  const handleLinkChange = (index, value) => {
    const updated = [...desLinks];
    updated[index] = value;
    setDesLinks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      await addDoc(collection(db, "products"), {
        name,
        price: parseFloat(price),
        imageUrl,
        description,
        Eng_Des: engDescription,
        componentsAR,
        componentsEN,
        size,
        des_Links: desLinks.filter((link) => link.trim() !== ""),
        type,
      });
      
      alert("تمت إضافة المنتج بنجاح");
      // navigate("/admin/main"); // Uncomment with your navigate
    } catch (err) {
      console.error("فشل في إضافة المنتج:", err);
      alert("حدث خطأ في إضافة المنتج");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
     navigate("/admin/main"); // Replace with your navigation logic
    console.log("Navigate back to main");
  };

  const handleCancel = () => {
    // navigate("/admin/main"); // Replace with your navigation logic
    console.log("Cancel and go back");
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={handleBack}>
          <FaArrowLeft style={styles.backIcon} />
          العودة
        </button>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>إضافة منتج جديد</h1>
          <p style={styles.subtitle}>أضف منتجاً جديداً إلى متجرك</p>
        </div>
      </div>

      {/* Form */}
      <div style={styles.formContainer}>
        <div style={styles.form}>
          {/* Basic Information Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>المعلومات الأساسية</h3>
            
            <div style={styles.formGrid}>
              {/* Product Name */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FaTag style={styles.labelIcon} />
                  اسم المنتج
                </label>
                <input
                  type="text"
                  placeholder="أدخل اسم المنتج"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    ...styles.input,
                    ...(errors.name ? styles.inputError : {})
                  }}
                />
                {errors.name && <span style={styles.errorText}>{errors.name}</span>}
              </div>

              {/* Price */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FaDollarSign style={styles.labelIcon} />
                  السعر
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{
                    ...styles.input,
                    ...(errors.price ? styles.inputError : {})
                  }}
                />
                {errors.price && <span style={styles.errorText}>{errors.price}</span>}
              </div>
            </div>

            {/* Product Type */}
            <div style={styles.formGroup}>
              <label style={styles.label}>نوع المنتج</label>
              <select
                value={type}
                onChange={(e) => setType(parseInt(e.target.value))}
                style={styles.select}
              >
                <option value={1}>منتجات وعلاجات</option>
                <option value={2}>إلكترونيات</option>
              </select>
            </div>

            {/* Size */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FaRulerCombined style={styles.labelIcon} />
                الحجم
              </label>
              <textarea
                placeholder="أدخل حجم المنتج (مثال: 100 مل، 50 قرص، إلخ...)"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                style={{
                  ...styles.textarea,
                  ...(errors.size ? styles.inputError : {}),
                  minHeight: '80px'
                }}
                rows="2"
              />
              {errors.size && <span style={styles.errorText}>{errors.size}</span>}
            </div>

            {/* Main Image */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FaImage style={styles.labelIcon} />
                الصورة الرئيسية
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.imageUrl ? styles.inputError : {})
                }}
              />
              {errors.imageUrl && <span style={styles.errorText}>{errors.imageUrl}</span>}
              {imageUrl && (
                <div style={styles.imagePreview}>
                  <img src={imageUrl} alt="معاينة" style={styles.previewImg} />
                </div>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>الوصف</h3>
            
            {/* Arabic Description */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FaRegFileAlt style={styles.labelIcon} />
                الوصف بالعربية
              </label>
              <textarea
                placeholder="اكتب وصف المنتج بالعربية..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  ...styles.textarea,
                  ...(errors.description ? styles.inputError : {})
                }}
                rows="4"
              />
              {errors.description && <span style={styles.errorText}>{errors.description}</span>}
            </div>

            {/* English Description */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FaGlobe style={styles.labelIcon} />
                الوصف بالإنجليزية
              </label>
              <textarea
                placeholder="Write product description in English..."
                value={engDescription}
                onChange={(e) => setEngDescription(e.target.value)}
                style={{
                  ...styles.textarea,
                  ...(errors.engDescription ? styles.inputError : {})
                }}
                rows="4"
              />
              {errors.engDescription && <span style={styles.errorText}>{errors.engDescription}</span>}
            </div>
          </div>

          {/* Components Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>المكونات والتركيب</h3>
            
            {/* Arabic Components */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FaCog style={styles.labelIcon} />
                المكونات بالعربية
              </label>
              <textarea
                placeholder="اكتب مكونات المنتج وتركيبه بالعربية..."
                value={componentsAR}
                onChange={(e) => setComponentsAR(e.target.value)}
                style={{
                  ...styles.textarea,
                  ...(errors.componentsAR ? styles.inputError : {})
                }}
                rows="4"
              />
              {errors.componentsAR && <span style={styles.errorText}>{errors.componentsAR}</span>}
            </div>

            {/* English Components */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FaCog style={styles.labelIcon} />
                المكونات بالإنجليزية
              </label>
              <textarea
                placeholder="Write product components and composition in English..."
                value={componentsEN}
                onChange={(e) => setComponentsEN(e.target.value)}
                style={{
                  ...styles.textarea,
                  ...(errors.componentsEN ? styles.inputError : {})
                }}
                rows="4"
              />
              {errors.componentsEN && <span style={styles.errorText}>{errors.componentsEN}</span>}
            </div>
          </div>

          {/* Additional Images Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>صور الشرح الإضافية</h3>
              <button type="button" onClick={handleAddLink} style={styles.addLinkBtn}>
                <FaPlus style={styles.buttonIcon} />
                إضافة صورة
              </button>
            </div>
            
            {desLinks.map((link, idx) => (
              <div key={idx} style={styles.linkGroup}>
                <input
                  type="url"
                  placeholder={`رابط الصورة ${idx + 1}`}
                  value={link}
                  onChange={(e) => handleLinkChange(idx, e.target.value)}
                  style={styles.input}
                />
                {desLinks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(idx)}
                    style={styles.removeBtn}
                    title="حذف الصورة"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Submit Buttons */}
          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleCancel}
              style={styles.cancelBtn}
              disabled={loading}
            >
              <FaTimes style={styles.buttonIcon} />
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                ...styles.submitBtn,
                ...(loading ? styles.submitBtnDisabled : {})
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div style={styles.spinner}></div>
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <FaCheck style={styles.buttonIcon} />
                  إضافة المنتج
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Arial, sans-serif',
    direction: 'rtl',
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '2rem',
    marginBottom: '2rem',
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '1rem',
    transition: 'background-color 0.2s',
  },
  backIcon: {
    fontSize: '0.8rem',
  },
  headerContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0,
  },
  formContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 2rem 2rem',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    border: '1px solid #e2e8f0',
  },
  section: {
    marginBottom: '2.5rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 1.5rem 0',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #e2e8f0',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.25rem',
  },
  labelIcon: {
    fontSize: '0.8rem',
    color: '#6b7280',
  },
  input: {
    padding: '0.875rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.2s',
    backgroundColor: 'white',
    fontFamily: 'inherit',
     color: '#000',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  select: {
    padding: '0.875rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
     color: '#000',
  },
  textarea: {
    padding: '0.875rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.2s',
    backgroundColor: 'white',
    resize: 'vertical',
    minHeight: '100px',
    fontFamily: 'inherit',
     color: '#000',
  },
  errorText: {
    fontSize: '0.8rem',
    color: '#ef4444',
    marginTop: '0.25rem',
  },
  imagePreview: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px dashed #cbd5e1',
  },
  previewImg: {
    width: '100%',
    maxWidth: '200px',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  addLinkBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
  linkGroup: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  removeBtn: {
    padding: '0.875rem',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
    flexShrink: 0,
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e2e8f0',
  },
  cancelBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 1.5rem',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 2rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(59,130,246,0.3)',
  },
  submitBtnDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
  buttonIcon: {
    fontSize: '0.8rem',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// Add CSS for additional styling and responsiveness
const additionalCSS = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Focus styles for better accessibility */
input:focus, textarea:focus, select:focus {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.1) !important;
}

/* Hover effects */
button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.back-btn:hover {
  background-color: #4b5563 !important;
}

.add-link-btn:hover {
  background-color: #059669 !important;
}

.remove-btn:hover {
  background-color: #dc2626 !important;
}

.cancel-btn:hover {
  background-color: #4b5563 !important;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2563eb !important;
}

/* Responsive design */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr !important;
  }
  
  .header {
    padding: 1rem !important;
  }
  
  .form-container {
    padding: 0 1rem 1rem !important;
  }
  
  .form {
    padding: 1.5rem !important;
  }
  
  .section-header {
    flex-direction: column !important;
    gap: 1rem !important;
    align-items: flex-start !important;
  }
  
  .button-group {
    flex-direction: column !important;
  }
  
  .title {
    font-size: 1.5rem !important;
  }
}

/* Form validation animations */
.input-error {
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
`;

// Inject CSS into the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = additionalCSS;
  document.head.appendChild(style);
}

export default AddProduct;