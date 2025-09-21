import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CertificationsPage from './pages/CertificationsPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogsPage from './pages/BlogsPage';
import AboutMePage from './pages/AboutMePage';
import ContactUsPage from './pages/ContactUsPage';
import ThreeDLayout from './components/ThreeDLayout';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import BlogDetailsPage from './pages/BlogDetailsPage'; // Import BlogDetailsPage

const FrontendRoutes = () => {
    const location = useLocation();
    const hideLayout = location.pathname === '/login'; // hide navbar/footer on login page

    return (
        <ThreeDLayout>
            {/* Only show navbar if not on login page */}
            {!hideLayout && <Navbar />}

            {/* Main content */}
            <div className='mt-15 p-4 md:p-8'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/certifications" element={<CertificationsPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/blogs" element={<BlogsPage />} />
                    <Route path="/blogs/:id" element={<BlogDetailsPage />} /> {/* New route for Blog Details */}
                    <Route path="/about" element={<AboutMePage />} />
                    <Route path="/contact" element={<ContactUsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>

            {/* Only show footer if not on login page */}
            {!hideLayout && <Footer />}
        </ThreeDLayout>
    );
};

export default FrontendRoutes;
