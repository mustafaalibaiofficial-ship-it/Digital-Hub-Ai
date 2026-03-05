import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import ToolsListing from './pages/ToolsListing';
import ToolDetail from './pages/ToolDetail';
import SubmitTool from './pages/SubmitTool';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLayout from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Admin Routes (No Navbar/Footer) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* Public Routes */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tools" element={<ToolsListing />} />
                    <Route path="/tools/:slug" element={<ToolDetail />} />
                    <Route path="/category/:slug" element={<ToolsListing />} />
                    <Route path="/categories" element={<Home />} /> {/* Categories are on Home for now */}
                    <Route path="/submit" element={<SubmitTool />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy-policy" element={<div className="max-w-4xl mx-auto px-4 py-20 prose dark:prose-invert"><h1>Privacy Policy</h1><p>Standard privacy policy content...</p></div>} />
                    <Route path="/terms" element={<div className="max-w-4xl mx-auto px-4 py-20 prose dark:prose-invert"><h1>Terms of Service</h1><p>Standard terms of service content...</p></div>} />
                    <Route path="/404" element={<div className="text-center py-40"><h1>404 - Page Not Found</h1><Link to="/" className="text-primary">Go Home</Link></div>} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </Router>
  );
};

export default App;
