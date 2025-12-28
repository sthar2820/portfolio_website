
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4">
      <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 uppercase">
          ROHAN <span className="text-indigo-600">SHRESTHA</span>
        </Link>
        <div className="flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                location.pathname === link.path ? 'text-indigo-600 underline underline-offset-8' : 'text-slate-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
