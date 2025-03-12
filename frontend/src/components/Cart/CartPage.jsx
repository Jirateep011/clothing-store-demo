import React, { useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const handleRemoveItem = (productId, color) => {
    removeFromCart(productId, color);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left py-2">Product</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Quantity</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={`${item.productId}-${item.color}`} className="border-t">
                  <td className="py-2">
                    <div className="flex items-center">
                      <img src={item.colorImage || item.productId.image} alt={item.productId.name} className="w-16 h-16 object-cover rounded mr-4" />
                      <span>{item.productId.name} ({item.color})</span>
                    </div>
                  </td>
                  <td className="py-2">฿ {item.productId.price}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">฿ {item.productId.price * item.quantity}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleRemoveItem(item.productId, item.color)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Clear Cart
            </button>
            <div className="text-xl font-bold">
              Total: ฿ {cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;