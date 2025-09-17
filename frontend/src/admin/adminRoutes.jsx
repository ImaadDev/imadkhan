import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';


const FrontendRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
       
      </Routes>
    </Router>
  );
};

export default FrontendRoutes;
