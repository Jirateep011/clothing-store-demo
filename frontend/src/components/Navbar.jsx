// filepath: frontend/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Gussy Clothing Store</Link>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/about">List</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;