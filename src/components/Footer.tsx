import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="https://i.postimg.cc/CLLLkmML/logo-BXra-F-pp-removebg-preview.png"
                alt="Digital Hub AI"
                className="h-8 w-auto"
                referrerPolicy="no-referrer"
              />
              <span className="font-bold text-xl tracking-tight">
                Digital Hub <span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Your Gateway to the Best AI Tools. Discover, explore, and access 500+ AI tools across every category.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/tools" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm">All Tools</Link></li>
              <li><Link to="/categories" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm">Categories</Link></li>
              <li><Link to="/tools?sort=trending" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm">Trending</Link></li>
              <li><Link to="/tools?filter=featured" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm">Featured</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm">About Us</Link></li>
              <li><Link to="/blog" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm">Blog</Link></li>
              <li><Link to="/contact" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm">Contact</Link></li>
              <li><Link to="/submit" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm">Submit Tool</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Newsletter</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Get the latest AI tools delivered to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border-transparent focus:border-primary focus:ring-0 text-sm"
                required
              />
              <button
                type="submit"
                className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © 2025 Digital Hub AI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-500 dark:text-slate-400 hover:text-primary text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
