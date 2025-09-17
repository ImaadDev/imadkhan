import React from 'react';
import AdminNavbar from '../components/AdminNavbar';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <main className="p-8">
        <h2 className="text-3xl font-bold mb-6">Welcome, Admin!</h2>

        {/* Example statistics section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold">Total Projects</h3>
            <p className="text-2xl mt-2">12</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold">Active Users</h3>
            <p className="text-2xl mt-2">34</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold">Pending Tasks</h3>
            <p className="text-2xl mt-2">5</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
