import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/layout.css';

const MainLayout = ({ children, showHeader = true, showFooter = true }) => {
  return (
    <div className="main-layout">
      {showHeader && <Header />}
      
      <main className="main-content">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
