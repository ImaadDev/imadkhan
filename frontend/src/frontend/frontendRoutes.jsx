import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CertificationsPage from './pages/CertificationsPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogsPage from './pages/BlogsPage';
import AboutMePage from './pages/AboutMePage';
import ContactUsPage from './pages/ContactUsPage';
import ThreeDLayout from './components/ThreeDLayout'; // Import the new layout component
import Footer from './components/Footer';

const FrontendRoutes = () => {
    return (
        <Router>
            {/* Wrap the entire frontend app with the new layout component */}
            <ThreeDLayout>
                <Navbar />
                <div className=' md:mt-10'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/certifications" element={<CertificationsPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/blogs" element={<BlogsPage />} />
                        <Route path="/about" element={<AboutMePage />} />
                        <Route path="/contact" element={<ContactUsPage />} />
                    </Routes>
                </div>
                <Footer/>
            </ThreeDLayout>
        </Router>
    );
};

export default FrontendRoutes;