import React from 'react';

const ProductList = ({ products, handleEditProduct, handleDeleteProduct }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left py-2">Image</th>
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Description</th>
            <th className="text-left py-2">Price</th>
            <th className="text-left py-2">Size</th>
            <th className="text-left py-2">Color</th>
            <th className="text-left py-2">Stock</th>
            <th className="text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id} className="border-t">
              <td className="py-2">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="py-2">{product.name}</td>
              <td className="py-2">{product.description}</td>
              <td className="py-2">฿ {product.price}</td>
              <td className="py-2">{product.size}</td>
              <td className="py-2">{product.color}</td>
              <td className="py-2">{product.stock}</td>
              <td className="py-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;