import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2';

const CartPage = () => {
  const { cartItems, updateCartItem, removeFromCart, clearCart } = useContext(CartContext);
  const [quantityToRemove, setQuantityToRemove] = useState({});

  const handleQuantityChange = (productId, color, value) => {
    setQuantityToRemove({
      ...quantityToRemove,
      [`${productId}-${color}`]: Math.max(1, Math.min(value, cartItems.find(item => item.productId._id === productId && item.color === color).quantity))
    });
  };

  const handleRemoveItem = (productId, color) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to remove this item from the cart.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId, color);
        Swal.fire('Removed!', 'The item has been removed from your cart.', 'success');
      }
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to clear your cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
      }
    });
  };

  const incrementQuantity = (productId, color) => {
    const currentQuantity = cartItems.find(item => item.productId._id === productId && item.color === color).quantity;
    updateCartItem(productId, color, currentQuantity + 1);
  };

  const decrementQuantity = (productId, color) => {
    const currentQuantity = cartItems.find(item => item.productId._id === productId && item.color === color).quantity;
    if (currentQuantity <= 1) {
      handleRemoveItem(productId, color);
    } else {
      updateCartItem(productId, color, currentQuantity - 1);
    }
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
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                item.productId && (
                  <tr key={`${item.productId._id}-${item.color}`} className="border-t">
                    <td className="py-2">
                      <div className="flex items-center">
                        <img src={item.colorImage || item.productId.image} alt={item.productId.name} className="w-16 h-16 object-cover rounded mr-4" />
                        <span>{item.productId.name} ({item.color})</span>
                      </div>
                    </td>
                    <td className="py-2">฿ {item.productId.price}</td>
                    <td className="py-2">
                      <div className="flex items-center">
                        <button
                          onClick={() => decrementQuantity(item.productId._id, item.color)}
                          className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded-l focus:outline-none focus:shadow-outline"
                        >
                          -
                        </button>
                        <select
                          value={quantityToRemove[`${item.productId._id}-${item.color}`] || item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId._id, item.color, Number(e.target.value))}
                          className="border text-center w-16 py-1 px-2 text-gray-700 focus:outline-none focus:shadow-outline"
                        >
                          {Array.from({ length: item.productId.stock }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => incrementQuantity(item.productId._id, item.color)}
                          className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded-r focus:outline-none focus:shadow-outline"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-2">฿ {item.productId.price * (quantityToRemove[`${item.productId._id}-${item.color}`] || item.quantity)}</td>
                  </tr>
                )
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
              Total: ฿ {cartItems.reduce((total, item) => item.productId ? total + item.productId.price * (quantityToRemove[`${item.productId._id}-${item.color}`] || item.quantity) : total, 0)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;