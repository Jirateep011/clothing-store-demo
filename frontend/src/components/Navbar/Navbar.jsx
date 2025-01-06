import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaHeart, FaShoppingCart, FaBars, FaTimes, FaHome, FaStore } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user') || localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
      sessionStorage.removeItem('user');
      localStorage.removeItem('user');
      Swal.fire('Success', 'Logged out successfully', 'success');
      navigate('/');
      setDropdownOpen(false);
    } catch (error) {
      Swal.fire('Error', 'Logout failed', 'error');
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-primary text-white text-sm py-2">
        <div className="container mx-auto flex justify-end space-x-4 px-4">
          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="hover:underline">
                Welcome, {user.username}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20 block-container">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/signin" className="hover:underline">Sign In</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Navbar */}
      <nav className={`bg-white shadow-md py-4 sticky top-0 z-50 ${dropdownOpen ? 'mt-16' : ''}`}>
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8 md:h-10 md:w-10 mr-2 md:mr-3" />
            <span className="text-xl md:text-2xl font-bold text-primary">Gussy Clothing Store</span>
          </div>

          {/* Hamburger Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-8 mx-auto">
            <button onClick={handleHomeClick} className="text-gray-700 hover:text-primary text-base md:text-lg py-2 md:py-0 px-4 md:px-0 transition duration-300 ease-in-out transform hover:scale-105">Home</button>
            <Link to="/shop" className="text-gray-700 hover:text-primary text-base md:text-lg py-2 md:py-0 px-4 md:px-0 transition duration-300 ease-in-out transform hover:scale-105">Shop</Link>
          </div>

          {/* Desktop Search and Icons */}
          <div className="hidden md:flex items-center space-x-4 md:space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-full py-1 px-3 pl-8 md:py-2 md:px-4 md:pl-10 focus:outline-none focus:border-primary"
              />
              <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 md:left-3" />
            </div>
            <Link to="/favorites" className="relative">
              <FaHeart className="text-gray-700 hover:text-primary text-lg md:text-xl" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-gray-700 hover:text-primary text-lg md:text-xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-start bg-white w-full py-4 space-y-4 px-4">
            <button onClick={handleHomeClick} className="text-gray-700 hover:text-primary text-base py-2 flex items-center w-full">
              <FaHome className="mr-2" /> Home
            </button>
            <Link to="/shop" className="text-gray-700 hover:text-primary text-base py-2 flex items-center w-full">
              <FaStore className="mr-2" /> Shop
            </Link>
            <div className="relative py-2 w-full">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-full py-1 px-3 pl-8 w-full focus:outline-none focus:border-primary"
              />
              <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <Link to="/favorites" className="text-gray-700 hover:text-primary text-base py-2 flex items-center w-full">
              <FaHeart className="mr-2" /> Favorites
              {favorites.length > 0 && (
                <span className="ml-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-primary text-base py-2 flex items-center w-full">
              <FaShoppingCart className="mr-2" />
              <span className="relative">
                Cart
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </span>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;