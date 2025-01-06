import React, { useState, useContext } from 'react';
import { FaTimes, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { UserContext } from '../../context/UserContext';

const Modal = ({ isOpen, onClose, product }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    console.log('Adding to cart:', { productId: product._id, size: selectedSize });
    addToCart({ productId: product._id, size: selectedSize });
    onClose();
  };

  const handleAddToFavorites = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    console.log('Adding to favorites:', product);
    addToFavorites(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>
        <div className="flex flex-col items-center">
          <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden mb-4">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-slate-700 mb-4">฿ {product.price}</p>
          <div className="mb-4 w-full flex justify-center space-x-2">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`py-2 px-4 rounded ${selectedSize === size ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} focus:outline-none`}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            Add to Cart
          </button>
          <button
            onClick={handleAddToFavorites}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            <FaHeart className="mr-2" /> Add to Favorites
          </button>
          <a href={`/product/${product._id}`} className="text-primary hover:underline mt-4">
            View Full Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;