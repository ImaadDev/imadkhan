// src/admin/components/AdminLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { AdminAuthProvider } from '../context/AdminAuthContext.jsx';

const AdminLayout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <AdminAuthProvider>
      <div className="flex h-screen bg-black">
        {/* Sidebar */}
        <Sidebar open={isDrawerOpen} onDrawerToggle={handleDrawerToggle} />

        {/* Main content */}
        <div className="flex flex-col flex-1">
          {/* Navbar */}
          <Navbar onDrawerToggle={handleDrawerToggle} />

          {/* Content Area */}
          <main className="mt-24 md:ml-64 p-6 text-white overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthProvider>
  );
};

export default AdminLayout;
