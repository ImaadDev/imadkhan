// App.jsx
import React from 'react';
import FrontendRoutes from './frontend/frontendRoutes';
import AdminRoutes from './admin/adminRoutes';

/**
 * App component serves as the main entry point for the React application.
 * It intelligently renders either the frontend or admin routes based on the URL path.
 */
const App = () => {
  // Determine if the current path is for admin
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  return (
    <>
      {isAdminRoute ? <AdminRoutes /> : <FrontendRoutes />}
    </>
  );
};

export default App;
