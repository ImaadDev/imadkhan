// src/admin/adminRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your layout and page components
import AdminLayout from './components/AdminLayout';
import PrivateRoute from './components/PrivateRoute.jsx';
import Blogs from './pages/Blogs';
import Certifications from './pages/Certifications';
import ProjectsPage from './pages/Projects';
import TechnologiesPage from './pages/Technologies';
import SettingsPage from './pages/Settings.jsx';

function AdminRoutes() {
  return (
    // Correct way: The <AdminLayout> is the main layout,
    // and the <Routes> component is a direct child of it.
    <AdminLayout>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="blogs" element={<Blogs />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="technologies" element={<TechnologiesPage />} />
          <Route path="settings" element={<SettingsPage />} />

        </Route>


        {/* Add more routes for other admin pages */}
      </Routes>
    </AdminLayout>
  );
}

export default AdminRoutes;