import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center px-4">
        <p className="mb-2">&copy; {new Date().getFullYear()} Recipe App. All Rights Reserved.</p>
        <p className="mb-2">Created by [Anil Kumar Swain]</p>
        <p className="text-sm">
          A simple and user-friendly application to explore and share delicious recipes.
        </p>
      </div>
    </footer>

  );
};

export default Footer;
