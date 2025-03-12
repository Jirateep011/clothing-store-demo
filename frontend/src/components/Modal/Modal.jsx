import React, { useState, useContext, useEffect } from 'react';
import { FaTimes, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { UserContext } from '../../context/UserContext';
import AddToCartPopup from '../PopUp/AddToCartPopup';

const Modal = ({ isOpen, onClose, product }) => {
  const { addToCart } = useContext(CartContext);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedColorImage, setSelectedColorImage] = useState(product.image);

  useEffect(() => {
    if (favorites.some(fav => fav._id === product._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites, product]);

  if (!isOpen) return null;

  const handleAddToCart = (quantity, color, colorImage) => {
    if (!user) {
      navigate('/signin');
      return;
    }
    addToCart(product, quantity, color, colorImage);
    setShowPopup(false);
    onClose();
  };

  const handleBuyNow = () => {
    setShowPopup(true);
  };

  const handleToggleFavorite = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    if (isFavorite) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites(product);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
    onClose();
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color.name);
    setSelectedColorImage(color.url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOutsideClick}>
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/3 p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>
        <div className="flex flex-col items-center">
          <div className="w-full h-48 md:h-64 lg:h-72 overflow-hidden mb-4">
            <img src={selectedColorImage} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4 text-center">{product.description}</p>
          <p className="text-xl font-semibold text-slate-700 mb-4">฿ {product.price}</p>
          <div className="mb-4 w-full flex justify-center space-x-2">
            <button
              className="py-2 px-4 rounded bg-primary text-white focus:outline-none"
            >
              Free Size
            </button>
          </div>
          <div className="mb-4 w-full flex justify-center space-x-2">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className={`py-2 px-4 rounded ${selectedColor === color.name ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => handleColorSelect(color)}
              >
                <img src={color.url} alt={color.name} className="w-8 h-8 rounded-full" />
              </button>
            ))}
          </div>
          <div className="flex flex-col md:flex-row w-full justify-between items-center space-y-2 md:space-y-0 md:space-x-2">
            <button
              onClick={handleBuyNow}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto"
            >
              Buy Now
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto"
            >
              Add to Cart
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center w-full md:w-auto ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              style={{ transition: 'none' }} // Ensure no size change on click
            >
              {isFavorite ? <FaHeart className="mr-2" /> : <FaRegHeart className="mr-2" />} {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
          <button
            onClick={handleViewDetails}
            className="text-primary hover:underline mt-4"
          >
            View Full Details
          </button>
        </div>
      </div>
      {showPopup && (
        <AddToCartPopup
          product={product}
          onClose={() => setShowPopup(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default Modal;