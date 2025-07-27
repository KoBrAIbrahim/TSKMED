import React, { useState, useEffect ,useContext  } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // تأكد من المسار الصحيح إلى firebase.js
import { useParams } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { currentLang: language } = useContext(LanguageContext);
  const { id } = useParams();

  const productId = id; 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{language === 'ar' ? 'جاري تحميل البيانات...' : 'Loading...'}</p>
      </div>
    );
  }

  const allImages = [product.imageUrl, ...(product.des_Links || [])];

  return (
    <>
      <div className="product-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="content-wrapper">
          {/* Product Gallery Section */}
          <div className="gallery-section">
            <div className="main-image-container">
              <img 
                src={allImages[selectedImage]} 
                alt={product.name} 
                className="main-image"
              />
            </div>
            
            {allImages.length > 1 && (
              <div className="thumbnail-container">
                {allImages.map((url, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'thumbnail-active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={url} alt={`${language === 'ar' ? 'صورة' : 'Image'} ${index + 1}`} className="thumbnail-image" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="info-section">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
            </div>

            {/* Description */}
            <div className="description-section">
              <h3 className="section-title">
                {language === "ar" ? "وصف المنتج" : "Product Description"}
              </h3>

              <div className="description-content">
               <p className="description-text" style={{ whiteSpace: "pre-line" }}>
  {language === "ar" ? product.description : product.Eng_Des}
</p>

              </div>
              
              <div className="warning-box">
                <span className="warning-icon">⚠️</span>
                <span className="warning-text">
                  {language === "ar"
                    ? "يُرجى استشارة الطبيب قبل الاستخدام. لا يُستخدم إلا بوصفة طبية."
                    : "Please consult a doctor before use. Prescription only."}
                </span>
              </div>
            </div>

            {/* Size Section */}
            {product.size && (
              <div className="size-section">
                <h3 className="section-title">
                  {language === "ar" ? "الحجم" : "Size"}
                </h3>
                <div className="size-content">
                  <p className="size-text" style={{ whiteSpace: "pre-line" }}>
                    {product.size}
                  </p>
                </div>
              </div>
            )}

            {/* Components Section */}
            {((language === "ar" && product.componentsAR) || (language === "en" && product.componentsEN)) && (
              <div className="components-section">
                <h3 className="section-title">
                  {language === "ar" ? "المكونات والخصائص " : "Components and properties"}
                </h3>
                <div className="components-content">
                  <p className="components-text" style={{ whiteSpace: "pre-line" }}>
                    {language === "ar" ? product.componentsAR : product.componentsEN}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
          padding: 2rem;
          text-align: center;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .product-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
          min-height: 100vh;
          color: #1e293b;
          padding-top: 5rem;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          display: grid;
          grid-template-columns: 45% 55%;
          gap: 4rem;
          align-items: start;
        }

        .gallery-section {
          position: sticky;
          top: 2rem;
        }

        .main-image-container {
          position: relative;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          margin-bottom: 1.5rem;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: auto;
aspect-ratio: 1 / 1;

        }

 .main-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 450px;
  height: auto;
  border-radius: 16px;
  object-fit: contain;
  transition: transform 0.3s ease;
}


        .main-image:hover {
          transform: scale(1.05);
        }

        .thumbnail-container {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .thumbnail {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 3px solid transparent;
          transition: all 0.3s ease;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          position: relative;
        }

        .thumbnail-active {
          border: 3px solid #3b82f6;
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
          transform: scale(1.05);
        }

        .thumbnail:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .info-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .product-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          padding: 2rem;
          border-radius: 20px;
          margin-bottom: 2rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        }

        .product-title {
          font-size: 2.5rem;
          font-weight: 900;
          color: #1e293b;
          margin-bottom: 0;
          line-height: 1.4;
          text-align: center;
        }

        .price-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
          width: 100%;
          text-align: center;
        }

        .price-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          direction: ltr;
        }

        .price-label {
          font-size: 1.2rem;
          color: #1e293b;
          font-weight: 600;
        }

        .price {
          font-size: 2rem;
          font-weight: 900;
          color: #059669;
          direction: ltr;
        }

        .currency {
          font-size: 1rem;
          font-weight: 600;
          color: #059669;
        }

        .description-section,
        .size-section,
        .components-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;
          padding-bottom: 1rem;
          border-bottom: 2px solid rgba(148, 163, 184, 0.2);
        }

        .description-content,
        .size-content,
        .components-content {
          background-color: rgba(248, 250, 252, 0.6);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(148, 163, 184, 0.15);
          padding: 2rem;
          border-radius: 16px;
          margin-bottom: 2rem;
        }

        .description-text,
        .size-text,
        .components-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #64748b;
          margin: 0;
          font-weight: 400;
        }

        /* Size section specific styles */
        .size-section {
          border-left: 4px solid #F8F8F8FF;
        }



        .size-text {
          color: #5E5E5EFF;
          font-weight: 500;
        }

        /* Components section specific styles */
        .components-section {
          border-left: 4px solid #FFFFFFFF;
        }

      

        .components-text {
          color: #5E5E5EFF;
          font-weight: 500;
        }

        .warning-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background-color: rgba(251, 191, 36, 0.1);
          border: 2px solid rgba(251, 191, 36, 0.3);
          border-radius: 16px;
          color: #92400e;
        }

        .warning-icon {
          font-size: 1.5rem;
          min-width: 1.5rem;
        }

        .warning-text {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5;
        }

        /* Mobile and Tablet Responsive Styles */
        @media (max-width: 1024px) {
          .content-wrapper {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem 1.5rem;
          }

          .gallery-section {
            position: static;
          }

          .main-image-container {
            padding: 2rem;
            min-height: 350px;
          }

          .main-image {
            height: 300px;
          }

          .product-title {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 768px) {
          .product-container {
            padding-top: 4rem;
          }

          .content-wrapper {
            padding: 1.5rem 1rem;
            gap: 1.5rem;
          }

          .main-image-container {
            padding: 1.5rem;
            min-height: 280px;
          }

          .main-image {
            height: 220px;
            max-width: 100%;
          }

          .thumbnail-container {
            gap: 0.5rem;
          }

          .thumbnail {
            width: 60px;
            height: 60px;
          }

          .product-header {
            padding: 1.5rem;
          }

          .product-title {
            font-size: 1.8rem;
          }

          .price-section {
            padding: 1.5rem;
          }

          .price {
            font-size: 1.6rem;
          }

          .price-label {
            font-size: 1rem;
          }

          .currency {
            font-size: 0.9rem;
          }

          .description-section,
          .size-section,
          .components-section {
            padding: 1.5rem;
          }

          .section-title {
            font-size: 1.3rem;
          }

          .description-content,
          .size-content,
          .components-content {
            padding: 1.5rem;
          }

          .description-text,
          .size-text,
          .components-text {
            font-size: 1rem;
          }

          .warning-box {
            padding: 1.25rem;
            gap: 0.75rem;
          }

          .warning-text {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .product-container {
            padding-top: 3rem;
          }

          .content-wrapper {
            padding: 1rem 0.75rem;
            gap: 1rem;
          }

          .main-image-container {
            padding: 2rem;
            min-height: 220px;
          }

          .main-image {
            height: 400px;
          }

          .thumbnail-container {
            gap: 0.4rem;
          }

          .thumbnail {
            width: 50px;
            height: 50px;
          }

          .product-header {
            padding: 1.25rem;
          }

          .product-title {
            font-size: 1.5rem;
            line-height: 1.3;
          }

          .price-section {
            padding: 1.25rem;
          }

          .price-wrapper {
            gap: 0.3rem;
          }

          .price {
            font-size: 1.4rem;
          }

          .price-label {
            font-size: 0.9rem;
          }

          .currency {
            font-size: 0.8rem;
          }

          .description-section,
          .size-section,
          .components-section {
            padding: 1.25rem;
          }

          .section-title {
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
          }

          .description-content,
          .size-content,
          .components-content {
            padding: 1.25rem;
          }

          .description-text,
          .size-text,
          .components-text {
            font-size: 0.95rem;
            line-height: 1.6;
          }

          .warning-box {
            padding: 1rem;
            gap: 0.5rem;
            flex-direction: column;
            text-align: center;
          }

          .warning-icon {
            font-size: 1.25rem;
          }

          .warning-text {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 360px) {
          .content-wrapper {
            padding: 0.75rem 0.5rem;
          }

          .main-image-container {
            padding: 0.75rem;
            min-height: 180px;
          }

          .main-image {
            height: 150px;
          }

          .thumbnail {
            width: 45px;
            height: 45px;
          }

          .product-header {
            padding: 1rem;
          }

          .product-title {
            font-size: 1.3rem;
          }

          .price-section {
            padding: 1rem;
          }

          .price {
            font-size: 1.2rem;
          }

          .description-section,
          .size-section,
          .components-section {
            padding: 1rem;
          }

          .description-content,
          .size-content,
          .components-content {
            padding: 1rem;
          }

          .warning-box {
            padding: 0.75rem;
          }
        }

        /* RTL specific adjustments */
        .product-container[dir="rtl"] .price-wrapper {
          direction: ltr;
          justify-content: center;
        }

        .product-container[dir="rtl"] .warning-box {
          flex-direction: row;
        }

        @media (max-width: 480px) {
          .product-container[dir="rtl"] .warning-box {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}

export default ProductDetails;