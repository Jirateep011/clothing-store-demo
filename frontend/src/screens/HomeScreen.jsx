import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomeScreen = () => {
    const [clothingItems, setClothingItems] = useState([]);

    useEffect(() => {
        const fetchClothingItems = async () => {
            try {
                const response = await axios.get('/api/clothing');
                setClothingItems(response.data);
            } catch (error) {
                console.error('Error fetching clothing items:', error);
            }
        };

        fetchClothingItems();
    }, []);

    return (
        <div>
            <h1>Clothing Store</h1>
            <ul>
                {clothingItems.map(item => (
                    <li key={item._id}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomeScreen;