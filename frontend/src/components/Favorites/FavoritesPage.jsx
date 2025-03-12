import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { FaTrashAlt } from 'react-icons/fa';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600">You have no favorite items.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h2 className="text-lg font-semibold text-gray-700 mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-4 text-center">{item.description}</p>
              <p className="text-xl font-semibold text-slate-700 mb-4">฿ {item.price}</p>
              <button
                onClick={() => removeFromFavorites(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;