// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import FrontendRoutes from './frontend/frontendRoutes';
import AdminRoutes from './admin/adminRoutes';
// PrivateRoute is now handled within AdminRoutes

/**
 * App component serves as the main entry point for the React application.
 * It uses React Router to handle all navigation and route rendering.
 */
const App = () => {
  return (
      <Routes>
        {/*
          This is the single entry point for all frontend routes.
          The '/*' wildcard tells React Router to render the FrontendRoutes
          component for any path that is not explicitly matched by another route.
        */}
        <Route path="/*" element={<FrontendRoutes />} />

        {/*
          This route handles all admin-specific paths.
          The 'admin/*' wildcard ensures that any URL starting with /admin
          will render the AdminRoutes component.
          The protection for admin routes is handled within AdminRoutes.jsx
        */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
  );
};

export default App;
