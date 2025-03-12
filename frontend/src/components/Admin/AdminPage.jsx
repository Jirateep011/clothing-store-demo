import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import AddNewProduct from './AddNewProduct';
import EditProduct from './EditProduct';
import ProductList from './ProductList';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    size: 'Free Size', // Fix size to "Free Size"
    colors: [], // Initialize colors as an empty array
    stock: '',
    image: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('add'); // State to manage active tab
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/'); // Redirect to home if not admin
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/clothing');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.post('/api/clothing', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts([...products, response.data]);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        size: 'Free Size', // Reset size to "Free Size"
        colors: [], // Reset colors to an empty array
        stock: '',
        image: ''
      });
      Swal.fire('Success', 'Product added successfully', 'success');
    } catch (error) {
      console.error('Error adding product:', error);
      Swal.fire('Error', 'Failed to add product', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      await axios.delete(`/api/clothing/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(products.filter(product => product._id !== id));
      Swal.fire('Success', 'Product deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire('Error', 'Failed to delete product', 'error');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setActiveTab('edit'); // Switch to Edit Product tab
  };

  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.put(`/api/clothing/${editingProduct._id}`, newProduct, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(products.map(product => product._id === editingProduct._id ? response.data : product));
      setEditingProduct(null);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        size: 'Free Size', // Reset size to "Free Size"
        colors: [], // Reset colors to an empty array
        stock: '',
        image: ''
      });
      setActiveTab('list'); // Switch back to Product List tab
      Swal.fire('Success', 'Product updated successfully', 'success');
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire('Error', 'Failed to update product', 'error');
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      size: 'Free Size', // Reset size to "Free Size"
      colors: [], // Reset colors to an empty array
      stock: '',
      image: ''
    });
    setActiveTab('list'); // Switch back to Product List tab
  };

  return (
    <div className="flex">
      <AdminMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-3/4 p-6">
        {activeTab === 'add' && (
          <AddNewProduct
            newProduct={newProduct}
            handleInputChange={handleInputChange}
            handleAddProduct={handleAddProduct}
          />
        )}
        {activeTab === 'edit' && (
          <EditProduct
            newProduct={newProduct}
            handleInputChange={handleInputChange}
            handleUpdateProduct={handleUpdateProduct}
            cancelEdit={cancelEdit}
          />
        )}
        {activeTab === 'list' && (
          <ProductList
            products={products}
            handleEditProduct={handleEditProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;