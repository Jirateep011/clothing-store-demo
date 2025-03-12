import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Banner from '../components/Banner/Banner';
import NewProduct from '../components/NewProduct/NewProduct';

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
        <div>
            <Banner />
            <NewProduct clothingItems={clothingItems} />
        </div>
    );
};

export default HomeScreen;