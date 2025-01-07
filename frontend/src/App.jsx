import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SignInPage from './components/login/SignInPage';
import RegisterPage from './components/login/RegisterPage';
import CartPage from './components/Cart/CartPage';
import FavoritesPage from './components/Favorites/FavoritesPage';
import ProductDetailPage from './components/Modal/ProductDetailPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AdminPage from './components/Admin/AdminPage'; // Import AdminPage

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/admin" element={<AdminPage />} /> {/* Add AdminPage Route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;