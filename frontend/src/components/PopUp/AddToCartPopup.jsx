import React, { useState } from 'react';

const AddToCartPopup = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(product.stock, Number(e.target.value)));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);
    onClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => Math.min(product.stock, prevQuantity + 1));
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50" onClick={handleOutsideClick}>
      <div className="bg-white rounded-t-lg md:rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 p-6 relative flex flex-col md:flex-row">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/3 flex justify-center items-center mb-4 md:mb-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain rounded-lg" />
          </div>
          <div className="w-full md:w-2/3 flex flex-col justify-between px-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-xl font-semibold text-slate-700 mb-2">฿ {product.price}</p>
              <p className="text-gray-600 mb-4">Stock: {product.stock}</p>
            </div>
            <div className="flex justify-end items-center space-x-2 mt-4">
              <button
                onClick={decrementQuantity}
                className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.stock}
                className="border text-center w-16 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline no-arrows"
              />
              <button
                onClick={incrementQuantity}
                className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
              >
                +
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartPopup;