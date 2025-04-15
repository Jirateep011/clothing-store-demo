import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const token = localStorage.getItem('token') || sessionStorage.getItem('token');
          const response = await axios.get('/api/cart', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setCartItems(response.data.items);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      }
    };

    fetchCart();
  }, [user]);

  const addToCart = async (product, quantity, color, colorImage) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.post('/api/cart', { productId: product._id, quantity, color, colorImage }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateCartItem = async (productId, color, quantity) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.put('/api/cart', { productId, color, quantity }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const removeFromCart = async (productId, color) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.delete('/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { productId, color } // Ensure the payload is correctly structured
      });
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.post('/api/cart/clear', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCartItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};