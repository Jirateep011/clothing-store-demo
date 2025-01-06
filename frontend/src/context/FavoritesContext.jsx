import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const token = localStorage.getItem('token') || sessionStorage.getItem('token');
          const response = await axios.get('/api/favorites', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setFavorites(response.data);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  const addToFavorites = async (item) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.post('/api/favorites', { productId: item._id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFavorites(response.data);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.delete('/api/favorites', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { productId }
      });
      setFavorites(response.data);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};