import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomeScreen = () => {
  const [clothingItems, setClothingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClothingItems = async () => {
      try {
        const response = await axios.get('/api/clothing');
        setClothingItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching clothing items:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchClothingItems();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Gussy Clothing Store</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {clothingItems.map(item => (
          <div className="bg-white rounded-lg shadow-md p-6" key={item._id}>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <p className="text-xl font-bold text-green-500">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;