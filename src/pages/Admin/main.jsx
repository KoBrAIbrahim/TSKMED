import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { FaPlus, FaSignOutAlt, FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";

const Main = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsSnapshot = await getDocs(collection(db, "products"));
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error("خطأ في تحميل المنتجات:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/admin/update_prodect?id=${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "products", id));
        fetchProducts();
      } catch (error) {
        console.error("خطأ في حذف المنتج:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (error) {
      console.error("فشل تسجيل الخروج", error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.navLeft}>
            <h1 style={styles.title}>لوحة التحكم</h1>
            <span style={styles.subtitle}>إدارة المنتجات</span>
          </div>
          <div style={styles.navRight}>
            <button style={styles.addBtn} onClick={() => navigate("/admin/add_prodect")}>
              <FaPlus style={styles.icon} />
              إضافة منتج جديد
            </button>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              <FaSignOutAlt style={styles.icon} />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </nav>

      {/* Search and Filter Bar */}
      <div style={styles.actionBar}>
        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="البحث عن المنتجات..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{products.length}</span>
            <span style={styles.statLabel}>إجمالي المنتجات</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div style={styles.content}>
        {loading ? (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p>جاري تحميل المنتجات...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={styles.emptyState}>
            <FaPlus style={styles.emptyIcon} />
            <h3>لا توجد منتجات</h3>
            <p>ابدأ بإضافة منتج جديد لرؤيته هنا</p>
            <button style={styles.addBtn} onClick={() => navigate("/admin/add_prodect")}>
              إضافة منتج الآن
            </button>
          </div>
        ) : (
          <div style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={styles.productCard} className="product-card">
                <div style={styles.cardImage}>
                  <img src={product.imageUrl || '/placeholder-image.png'} alt={product.name} style={styles.image} className="image" />
                  {/* Action buttons positioned on top right of image */}
                  <div style={styles.topActions}>
                    <button 
                      style={{...styles.actionBtn, ...styles.updateBtn}} 
                      onClick={() => handleUpdate(product.id)}
                      title="تحديث المنتج"
                      className="action-btn"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      style={{...styles.actionBtn, ...styles.deleteBtn}} 
                      onClick={() => handleDelete(product.id)}
                      title="حذف المنتج"
                      className="action-btn"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div style={styles.cardContent}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productPrice}>${product.price || 'غير محدد'}</p>
                  <p style={styles.productDescription}>
                    {product.description ? product.description.substring(0, 60) + '...' : 'لا يوجد وصف'}
                  </p>
                  {/* Alternative: Action buttons at the bottom */}
                  {/* 
                  <div style={styles.bottomActions}>
                    <button 
                      style={{...styles.bottomActionBtn, ...styles.updateBtn}} 
                      onClick={() => handleUpdate(product.id)}
                      className="bottom-action-btn"
                    >
                      <FaEdit style={styles.buttonIcon} />
                      تحديث
                    </button>
                    <button 
                      style={{...styles.bottomActionBtn, ...styles.deleteBtn}} 
                      onClick={() => handleDelete(product.id)}
                      className="bottom-action-btn"
                    >
                      <FaTrash style={styles.buttonIcon} />
                      حذف
                    </button>
                  </div>
                  */}
                </div>
              </div>
            ))}
          </div>
        )}
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
  navbar: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  navLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0,
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#64748b',
    marginTop: '0.25rem',
  },
  navRight: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(59,130,246,0.3)',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(239,68,68,0.3)',
  },
  icon: {
    fontSize: '0.9rem',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  searchContainer: {
    position: 'relative',
    flex: '1',
    maxWidth: '400px',
  },
  searchIcon: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b',
    fontSize: '1rem',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: 'white',
  },
  statsContainer: {
    display: 'flex',
    gap: '1rem',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    minWidth: '100px',
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#64748b',
    marginTop: '0.25rem',
  },
  content: {
    padding: '0 2rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem',
    color: '#64748b',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem',
    textAlign: 'center',
    color: '#64748b',
  },
  emptyIcon: {
    fontSize: '3rem',
    color: '#cbd5e1',
    marginBottom: '1rem',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    padding: '1rem 0',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
  cardImage: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  // Top right positioned action buttons (always visible)
  topActions: {
    position: 'absolute',
    top: '0.5rem',
    left: '0.5rem',
    display: 'flex',
    gap: '0.5rem',
    zIndex: 10,
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  updateBtn: {
    backgroundColor: '#10b981',
    color: 'white',
  },
  deleteBtn: {
    backgroundColor: '#ef4444',
    color: 'white',
  },
  cardContent: {
    padding: '1.25rem',
  },
  productName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 0.5rem 0',
    lineHeight: '1.4',
  },
  productPrice: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#3b82f6',
    margin: '0 0 0.5rem 0',
  },
  productDescription: {
    fontSize: '0.9rem',
    color: '#64748b',
    lineHeight: '1.5',
    margin: 0,
  },
  // Alternative bottom positioned buttons (commented out in JSX)
  bottomActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0',
  },
  bottomActionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flex: 1,
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: '0.8rem',
  },
};

// Add CSS animation for spinner and hover effects
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0,0,0,0.15) !important;
  }
  
  .product-card:hover .image {
    transform: scale(1.05) !important;
  }
  
  .add-btn:hover {
    background-color: #2563eb !important;
    transform: translateY(-1px);
  }
  
  .logout-btn:hover {
    background-color: #dc2626 !important;
    transform: translateY(-1px);
  }
  
  .action-btn:hover {
    transform: scale(1.1) !important;
  }
  
  .bottom-action-btn:hover {
    transform: translateY(-1px) !important;
  }
  
  .search-input:focus {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59,130,246,0.1) !important;
  }
  
  @media (max-width: 768px) {
    .nav-content {
      flex-direction: column !important;
      gap: 1rem !important;
    }
    
    .nav-right {
      width: 100% !important;
      justify-content: center !important;
    }
    
    .action-bar {
      flex-direction: column !important;
      align-items: stretch !important;
    }
    
    .products-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Main;