import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <ul className="flex space-x-4">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/projects">Manage Projects</Link></li>
        <li><Link to="/admin/login">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
