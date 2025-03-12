import React from 'react';

const AdminMenu = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-1/4 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Menu</h2>
      <ul>
        <li
          className={`cursor-pointer py-2 px-4 rounded ${activeTab === 'add' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add New Product
        </li>
        <li
          className={`cursor-pointer py-2 px-4 rounded ${activeTab === 'list' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          Product List
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;