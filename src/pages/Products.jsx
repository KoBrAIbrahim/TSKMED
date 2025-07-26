import React, {useContext , useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { LanguageContext } from '../context/LanguageContext';

function AdvancedProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { currentLang: language } = useContext(LanguageContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = {
    ar: [
      { id: 'all', name: 'جميع المنتجات', type: null },
      { id: 'medicines', name: 'الأدوية', type: 1 },
      { id: 'electronics', name: 'أخرى', type: 2 }

    ],
    en: [
      { id: 'all', name: 'All Products', type: null },
      { id: 'medicines', name: 'Medicines', type: 1 },
      { id: 'electronics', name: 'Other', type: 2 }
    ]
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(data);
        setIsLoaded(true);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(language === 'ar' ? 'حدث خطأ في تحميل المنتجات' : 'Error loading products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (language === 'ar' ? product.description : product.Eng_Des)?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Updated filter logic based on Firebase types
    const selectedCategoryData = categories[language].find(cat => cat.id === selectedCategory);
    const matchesCategory = selectedCategory === 'all' || product.type === selectedCategoryData?.type;
    
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (productId) => {
    // Navigate to ProductDetails page
    navigate(`/products/${productId}`);
  };

  const handleDetailsClick = (productId, e) => {
    // Prevent card click event from firing
    e.stopPropagation();
    // Navigate to ProductDetails page
    navigate(`/products/${productId}`);
  };

  return (
    <div 
      className="advanced-products-container"
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
        <div className="products-section">
          {/* Header Section */}
          <div className="page-header">
            <h1 className="page-title">
              {language === 'ar' ? 'منتجاتنا المتميزة' : 'Our Premium Products'}
            </h1>
            <p className="page-subtitle">
              {language === 'ar' 
                ? 'اكتشف مجموعتنا الواسعة من المنتجات عالية الجودة' 
                : 'Discover our wide range of high-quality products'}
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="filters-section">
            <div className="search-container">
              <input
                type="text"
                placeholder={language === 'ar' ? 'البحث في المنتجات...' : 'Search products...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <svg className="search-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="category-filters">
              {categories[language].map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Count Display */}
          {!loading && !error && (
            <div className="products-count">
              <p>
                {language === 'ar' 
                  ? `عدد المنتجات: ${filteredProducts.length}` 
                  : `Products found: ${filteredProducts.length}`
                }
              </p>
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">
                {language === 'ar' ? 'جاري تحميل المنتجات...' : 'Loading products...'}
              </p>
            </div>
          ) : error ? (
            <div className="error-container">
              <h3>{error}</h3>
              <button 
                className="retry-btn"
                onClick={() => window.location.reload()}
              >
                {language === 'ar' ? 'إعادة المحاولة' : 'Retry'}
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="product-card"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="product-image-container">
                    <img 
                      src={product.imageUrl || 'https://via.placeholder.com/300x200/64748b/ffffff?text=No+Image'} 
                      alt={product.name || 'Product'}
                      className="product-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200/64748b/ffffff?text=No+Image';
                      }}
                    />
                    <div className="product-overlay">
                      <button 
                        className="view-details-btn"
                        onClick={(e) => handleDetailsClick(product.id, e)}
                      >
                        {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                      </button>
                    </div>
                    
                {/* Product Type Badge */}
<div className="product-type-badge">
  {product.type === 1 ? (
    language === 'ar' ? 'دواء' : 'Medicine'
  ) : product.type === 2 ? (
    language === 'ar' ? 'أخرى' : 'Other'
  ) : (
    language === 'ar' ? 'منتج' : 'Product'
  )}
</div>

                  </div>
                  
                  <div className="product-content">
                    <h3 className="product-name">
                      {product.name || (language === 'ar' ? 'منتج بدون اسم' : 'Unnamed Product')}
                    </h3>
                    <p className="product-description">
                      {language === 'ar' 
                        ? (product.description || 'لا يوجد وصف متاح')
                        : (product.Eng_Des || 'No description available')
                      }
                    </p>
                    <div className="product-footer">
                      <button 
                        className="details-btn"
                        onClick={(e) => handleDetailsClick(product.id, e)}
                      >
                        {language === 'ar' ? 'المزيد' : 'Details'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="no-products">
              <h3>{language === 'ar' ? 'لا توجد منتجات' : 'No products found'}</h3>
              <p>{language === 'ar' ? 'جرب البحث بكلمات أخرى أو تغيير الفئة' : 'Try searching with different keywords or change category'}</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .advanced-products-container {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          font-family: 'Segoe UI', 'Tahoma', 'Arial', sans-serif;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
          padding-top: 100px;
        }

        .advanced-products-container[dir="rtl"] {
          font-family: 'Segoe UI', 'Tahoma', 'Arial', 'Amiri', 'Noto Sans Arabic', sans-serif;
        }

        /* Subtle Background Elements */
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
          min-height: calc(100vh - 100px);
          padding: 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease;
        }

        .main-content.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .products-section {
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
          border-radius: 16px;
          padding: 3rem 2rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .page-title {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1rem;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #64748b;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 400;
        }

        /* Filters Section */
        .filters-section {
          background: rgba(248, 250, 252, 0.6);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .search-container {
          position: relative;
          max-width: 500px;
          margin: 0 auto;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 1px solid rgba(148, 163, 184, 0.3);
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(5px);
          color: #1e293b;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input::placeholder {
          color: #64748b;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: #64748b;
        }

        .category-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .category-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 25px;
          color: #1e293b;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .category-btn:hover {
          background: rgba(255, 255, 255, 1);
          border-color: #3b82f6;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .category-btn.active {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-color: #3b82f6;
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        /* Products Count */
        .products-count {
          text-align: center;
          margin-bottom: 2rem;
        }

        .products-count p {
          color: #64748b;
          font-size: 1.1rem;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          border: 1px solid rgba(148, 163, 184, 0.2);
        }

        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .product-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 1);
          border-color: rgba(59, 130, 246, 0.2);
        }

        .product-image-container {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(30, 41, 59, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .view-details-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          transform: translateY(10px);
        }

        .product-card:hover .view-details-btn {
          transform: translateY(0);
        }

        .view-details-btn:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          transform: scale(1.05);
        }

        /* Product Type Badge */
        .product-type-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.4rem 0.8rem;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .product-content {
          padding: 1.5rem;
        }

        .product-name {
          color: #1e293b;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .product-description {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-price {
          color: #1e293b;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .details-btn {
          padding: 0.5rem 1rem;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 20px;
          color: #3b82f6;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .details-btn:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: #3b82f6;
          transform: scale(1.05);
        }

        /* Loading and Error States */
        .loading-container,
        .error-container {
          text-align: center;
          padding: 4rem 2rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 16px;
          color: #1e293b;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(148, 163, 184, 0.3);
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-text {
          color: #64748b;
          font-size: 1.1rem;
        }

        .retry-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .retry-btn:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          transform: scale(1.05);
        }

        /* No Products */
        .no-products {
          text-align: center;
          padding: 4rem 2rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 16px;
          color: #1e293b;
        }

        .no-products h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #1e293b;
        }

        .no-products p {
          color: #64748b;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .main-content {
            padding: 1rem;
          }

          .page-header {
            padding: 2rem 1rem;
            margin-bottom: 2rem;
          }

          .filters-section {
            padding: 1.5rem;
          }

          .category-filters {
            gap: 0.5rem;
          }

          .category-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .advanced-products-container {
            padding-top: 80px;
          }

          .page-header {
            padding: 1.5rem 1rem;
          }

          .filters-section {
            padding: 1rem;
          }

          .search-input {
            padding: 0.75rem 0.75rem 0.75rem 2.5rem;
          }

          .category-filters {
            flex-direction: column;
            align-items: center;
          }

          .category-btn {
            width: 100%;
            max-width: 200px;
          }

          .product-content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default AdvancedProducts;