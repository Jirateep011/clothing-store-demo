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
          console.log('Fetched cart items:', response.data.items); // Debug log
          setCartItems(response.data.items);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      }
    };

    fetchCart();
  }, [user]);

  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.post('/api/cart', item, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Added to cart:', response.data.items); // Debug log
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId, size) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.delete('/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { productId, size }
      });
      console.log('Removed from cart:', response.data.items); // Debug log
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
      console.log('Cleared cart:', response.data.items); // Debug log
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};