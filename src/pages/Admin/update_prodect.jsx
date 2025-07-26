import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { 
  FaArrowLeft, 
  FaPlus, 
  FaTrash, 
  FaImage, 
  FaDollarSign, 
  FaTag, 
  FaRegFileAlt , 
  FaGlobe,
  FaCheck,
  FaTimes,
  FaEdit,
  FaSpinner
} from "react-icons/fa";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get("id");

  const [product, setProduct] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null); // Keep original for comparison
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch product data from Firebase
  const fetchProduct = async () => {
    if (!productId) {
      alert("معرف المنتج غير صحيح");
      navigate("/admin/main");
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching product with ID:", productId);
      
      const docRef = doc(db, "products", productId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const productData = { id: snapshot.id, ...snapshot.data() };
        
        // Ensure des_Links is always an array
        if (!productData.des_Links || !Array.isArray(productData.des_Links)) {
          productData.des_Links = [""];
        }
        
        console.log("Product data loaded:", productData);
        setProduct(productData);
        setOriginalProduct(productData); // Keep original for comparison
      } else {
        console.error("Product not found with ID:", productId);
        alert("المنتج غير موجود");
        navigate("/admin/main");
      }
    } catch (error) {
      console.error("خطأ في تحميل المنتج:", error);
      alert("فشل في تحميل بيانات المنتج: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  // Check if form has changes
  useEffect(() => {
    if (product && originalProduct) {
      const hasChanged = JSON.stringify(product) !== JSON.stringify(originalProduct);
      setHasChanges(hasChanged);
    }
  }, [product, originalProduct]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!product.name?.trim()) newErrors.name = "اسم المنتج مطلوب";
    if (!product.price || product.price <= 0) newErrors.price = "السعر يجب أن يكون أكبر من الصفر";
    if (!product.imageUrl?.trim()) newErrors.imageUrl = "رابط الصورة مطلوب";
    if (!product.description?.trim()) newErrors.description = "الوصف بالعربية مطلوب";
    if (!product.Eng_Des?.trim()) newErrors.Eng_Des = "الوصف بالإنجليزية مطلوب";
    
    // Validate image URL format
    if (product.imageUrl && !isValidUrl(product.imageUrl)) {
      newErrors.imageUrl = "رابط الصورة غير صحيح";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
    return true;
    } catch {
      return false;
    }
  };

  const handleChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleDesLinkChange = (index, value) => {
    const updatedLinks = [...(product.des_Links || [])];
    updatedLinks[index] = value;
    setProduct((prev) => ({ ...prev, des_Links: updatedLinks }));
  };

  const handleAddImage = () => {
    setProduct((prev) => ({
      ...prev,
      des_Links: [...(prev.des_Links || []), ""],
    }));
  };

  const handleDeleteImage = (index) => {
    if ((product.des_Links?.length || 0) > 1) {
      const updatedLinks = [...product.des_Links];
      updatedLinks.splice(index, 1);
      setProduct((prev) => ({ ...prev, des_Links: updatedLinks }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    if (!hasChanges) {
      alert("لم يتم إجراء أي تغييرات");
      return;
    }

    try {
      setSaving(true);
      console.log("Updating product with ID:", productId);
      
      const docRef = doc(db, "products", productId);
      
      // Prepare update data
      const updateData = {
        name: product.name.trim(),
        price: Number(product.price),
        imageUrl: product.imageUrl.trim(),
        description: product.description.trim(),
        Eng_Des: product.Eng_Des.trim(),
        des_Links: product.des_Links?.filter((link) => link.trim() !== "") || [],
        type: Number(product.type || 1),
        updatedAt: new Date().toISOString(), // Add timestamp
      };
      
      console.log("Update data:", updateData);
      
      await updateDoc(docRef, updateData);
      
      console.log("Product updated successfully");
      alert("✅ تم تحديث المنتج بنجاح");
      navigate("/admin/main");
      
    } catch (error) {
      console.error("فشل في التحديث:", error);
      alert("❌ فشل التحديث: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (originalProduct) {
      setProduct({ ...originalProduct });
      setErrors({});
    }
  };

  const handleBack = () => {
    if (hasChanges) {
      const confirmLeave = window.confirm("لديك تغييرات غير محفوظة. هل تريد المغادرة؟");
      if (!confirmLeave) return;
    }
    navigate("/admin/main");
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmCancel = window.confirm("هل تريد إلغاء التغييرات والعودة؟");
      if (!confirmCancel) return;
    }
    navigate("/admin/main");
  };

  // Loading state
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <FaSpinner style={styles.loadingSpinner} />
        <p style={styles.loadingText}>جارٍ تحميل بيانات المنتج...</p>
      </div>
    );
  }

  // Error state
  if (!product) {
    return (
      <div style={styles.errorContainer}>
        <h3>لم يتم العثور على المنتج</h3>
        <p>تعذر العثور على المنتج المطلوب</p>
        <button style={styles.backBtn} onClick={() => navigate("/admin/main")}>
          العودة إلى القائمة الرئيسية
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={handleBack}>
          <FaArrowLeft style={styles.backIcon} />
          العودة
        </button>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>تحديث المنتج</h1>
          <p style={styles.subtitle}>
            تعديل معلومات المنتج: <strong>{product.name}</strong>
            {hasChanges && <span style={styles.changesIndicator}>• توجد تغييرات غير محفوظة</span>}
          </p>
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
                  اسم المنتج *
                </label>
                <input
                  type="text"
                  placeholder="أدخل اسم المنتج"
                  value={product.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
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
                  السعر *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={product.price || ""}
                  onChange={(e) => handleChange("price", e.target.value)}
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
              <label style={styles.label}>نوع المنتج *</label>
              <select
                value={product.type || 1}
                onChange={(e) => handleChange("type", parseInt(e.target.value))}
                style={styles.select}
              >
                <option value={1}>أدوية</option>
                <option value={2}>إلكترونيات</option>
              </select>
            </div>

            {/* Main Image */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FaImage style={styles.labelIcon} />
                الصورة الرئيسية *
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={product.imageUrl || ""}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.imageUrl ? styles.inputError : {})
                }}
              />
              {errors.imageUrl && <span style={styles.errorText}>{errors.imageUrl}</span>}
              {product.imageUrl && isValidUrl(product.imageUrl) && (
                <div style={styles.imagePreview}>
                  <img 
                    src={product.imageUrl} 
                    alt="معاينة المنتج" 
                    style={styles.previewImg}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div style={{display: 'none', color: '#ef4444', textAlign: 'center'}}>
                    فشل في تحميل الصورة
                  </div>
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
                الوصف بالعربية *
              </label>
              <textarea
                placeholder="اكتب وصف المنتج بالعربية..."
                value={product.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                style={{
                  ...styles.textarea,
                  ...(errors.description ? styles.inputError : {})
                }}
                rows="4"
              />
              {errors.description && <span style={styles.errorText}>{errors.description}</span>}
              <div style={styles.charCount}>
                {(product.description || "").length} حرف
              </div>
            </div>

            {/* English Description */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FaGlobe style={styles.labelIcon} />
                الوصف بالإنجليزية *
              </label>
              <textarea
                placeholder="Write product description in English..."
                value={product.Eng_Des || ""}
                onChange={(e) => handleChange("Eng_Des", e.target.value)}
                style={{
                  ...styles.textarea,
                  ...(errors.Eng_Des ? styles.inputError : {})
                }}
                rows="4"
              />
              {errors.Eng_Des && <span style={styles.errorText}>{errors.Eng_Des}</span>}
              <div style={styles.charCount}>
                {(product.Eng_Des || "").length} characters
              </div>
            </div>
          </div>

          {/* Additional Images Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>صور الشرح الإضافية</h3>
              <button type="button" onClick={handleAddImage} style={styles.addLinkBtn}>
                <FaPlus style={styles.buttonIcon} />
                إضافة صورة
              </button>
            </div>
            
            {(product.des_Links || [""]).map((link, idx) => (
              <div key={idx} style={styles.linkGroup}>
                <input
                  type="url"
                  placeholder={`رابط الصورة ${idx + 1} (اختياري)`}
                  value={link || ""}
                  onChange={(e) => handleDesLinkChange(idx, e.target.value)}
                  style={styles.input}
                />
                {(product.des_Links?.length || 0) > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(idx)}
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
              disabled={saving}
            >
              <FaTimes style={styles.buttonIcon} />
              إلغاء
            </button>
            
            <button
              type="button"
              onClick={handleReset}
              style={styles.resetBtn}
              disabled={saving || !hasChanges}
            >
              <FaCheck style={styles.buttonIcon} />
              استعادة الأصلي
            </button>
            
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                ...styles.submitBtn,
                ...(saving ? styles.submitBtnDisabled : {}),
                ...(hasChanges ? styles.submitBtnActive : styles.submitBtnInactive)
              }}
              disabled={saving || !hasChanges}
            >
              {saving ? (
                <>
                  <FaSpinner style={{...styles.buttonIcon, ...styles.spinningIcon}} />
                  جاري التحديث...
                </>
              ) : (
                <>
                  <FaEdit style={styles.buttonIcon} />
                  {hasChanges ? "حفظ التغييرات" : "تحديث المنتج"}
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
  color: '#000', // ✅ This ensures text inside is black
},

  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  loadingSpinner: {
    fontSize: '2rem',
    color: '#3b82f6',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '1rem',
    fontSize: '1.1rem',
    color: '#000',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '2rem',
    textAlign: 'center',
    color: '#000',
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
    color: '#000',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#000',
    margin: 0,
  },
  changesIndicator: {
    color: '#f59e0b',
    fontWeight: '500',
    marginRight: '0.5rem',
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
    color: '#000',
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
  charCount: {
    fontSize: '0.75rem',
    color: '#000',
    textAlign: 'left',
    marginTop: '0.25rem',
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
    textAlign: 'center',
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
    flexWrap: 'wrap',
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
  resetBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 1.5rem',
    backgroundColor: '#8b5cf6',
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
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  submitBtnActive: {
    backgroundColor: '#f59e0b',
    color: 'white',
    boxShadow: '0 2px 4px rgba(245,158,11,0.3)',
  },
  submitBtnInactive: {
    backgroundColor: '#e5e7eb',
    color: '#9ca3af',
    cursor: 'not-allowed',
  },
  submitBtnDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
    color: 'white',
  },
  buttonIcon: {
    fontSize: '0.8rem',
  },
  spinningIcon: {
    animation: 'spin 1s linear infinite',
  },
};

// Add CSS for animations and responsive design
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

/* Responsive design */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr !important;
  }
  
  .button-group {
    flex-direction: column !important;
  }
  
  .section-header {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 1rem !important;
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

export default UpdateProduct;