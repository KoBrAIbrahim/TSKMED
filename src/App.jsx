import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageProvider'; // تأكد من المسار الصحيح
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Partners from './pages/Partners';
import ProductDetails from './pages/ProductDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from "./pages/Admin/Login";
import Main from "./pages/Admin/main";
import AddProduct from "./pages/Admin/add_prodect";
import UpdateProduct from "./pages/Admin/update_prodect";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* إظهار الهيدر فقط إذا لم يكن في صفحة admin */}
      {!isAdminRoute && <Header />}

      <Routes>
        {/* صفحات عامة */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partners" element={<Partners />} />

        {/* صفحات المشرف */}
        <Route path="/admin" element={<Main />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/main" element={<Main />} />
        <Route path="/admin/add_prodect" element={<AddProduct />} />
        <Route path="/admin/update_prodect" element={<UpdateProduct />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>

    
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
