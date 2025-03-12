import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { UserContext } from '../../context/UserContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import AddToCartPopup from '../PopUp/AddToCartPopup';

// filepath: frontend/src/components/Modal/ProductDetailPage.jsx
const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/clothing/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (favorites.some(fav => fav._id === id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites, id]);

  const handleAddToCart = (quantity) => {
    if (!user) {
      navigate('/signin');
      return;
    }
    addToCart({ productId: product._id, quantity });
    setShowPopup(false);
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

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10">Error: {error.message}</div>;

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-64 md:h-96 overflow-hidden mb-4 md:mb-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <div className="w-full md:w-1/2 md:pl-6">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-slate-700 mb-4">฿ {product.price}</p>
            <p className="text-gray-600 mb-4">Stock: {product.stock}</p>
            <div className="mb-4 w-full flex justify-center space-x-2">
              <button
                className="py-2 px-4 rounded bg-primary text-white focus:outline-none"
              >
                Free Size
              </button>
            </div>
            <div className="flex flex-col md:flex-row w-full justify-between items-center space-y-2 md:space-y-0 md:space-x-2">
              <button
                onClick={handleBuyNow}
                className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto"
              >
                Add to Cart
              </button>
              <button
                onClick={handleToggleFavorite}
                className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center w-full md:w-auto ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {isFavorite ? <FaHeart className="mr-2" /> : <FaRegHeart className="mr-2" />} {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
            <button
              onClick={handleBuyNow}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full md:w-auto"
            >
              Buy Now
            </button>
          </div>
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

export default ProductDetailPage;