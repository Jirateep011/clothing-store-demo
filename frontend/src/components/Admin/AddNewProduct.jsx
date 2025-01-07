import React from 'react';

const AddNewProduct = ({ newProduct, handleInputChange, handleAddProduct, handleUpdateProduct, editingProduct }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="size"
          value={newProduct.size}
          onChange={handleInputChange}
          placeholder="Size"
          className="border p-2 rounded"
          readOnly // Make the input read-only
        />
        <input
          type="text"
          name="color"
          value={newProduct.color}
          onChange={handleInputChange}
          placeholder="Color"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="stock"
          value={newProduct.stock}
          onChange={handleInputChange}
          placeholder="Stock"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
        className="bg-primary text-white font-bold py-2 px-4 rounded mt-4"
      >
        {editingProduct ? 'Update Product' : 'Add Product'}
      </button>
    </div>
  );
};

export default AddNewProduct;