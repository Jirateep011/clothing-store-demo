import React, { useState } from 'react';

const EditProduct = ({ newProduct, handleInputChange, handleUpdateProduct, cancelEdit }) => {
  const [colorInput, setColorInput] = useState('');
  const [colorUrlInput, setColorUrlInput] = useState('');

  const handleAddColor = () => {
    if (colorInput && colorUrlInput && !newProduct.colors.some(color => color.name === colorInput)) {
      handleInputChange({ target: { name: 'colors', value: [...newProduct.colors, { name: colorInput, url: colorUrlInput }] } });
      setColorInput('');
      setColorUrlInput('');
    }
  };

  const handleRemoveColor = (colorName) => {
    handleInputChange({ target: { name: 'colors', value: newProduct.colors.filter(color => color.name !== colorName) } });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
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
        <div className="col-span-2">
          <input
            type="text"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            placeholder="Add Color"
            className="border p-2 rounded mr-2"
          />
          <input
            type="text"
            value={colorUrlInput}
            onChange={(e) => setColorUrlInput(e.target.value)}
            placeholder="Add Color URL"
            className="border p-2 rounded mr-2"
          />
          <button onClick={handleAddColor} className="bg-primary text-white font-bold py-2 px-4 rounded">
            Add Color
          </button>
          <div className="mt-2">
            {newProduct.colors.map((color, index) => (
              <span key={index} className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                {color.name}
                <button onClick={() => handleRemoveColor(color.name)} className="ml-2 text-red-500">x</button>
              </span>
            ))}
          </div>
        </div>
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
      <div className="flex justify-between mt-4">
        <button
          onClick={handleUpdateProduct}
          className="bg-primary text-white font-bold py-2 px-4 rounded"
        >
          Update Product
        </button>
        <button
          onClick={cancelEdit}
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProduct;