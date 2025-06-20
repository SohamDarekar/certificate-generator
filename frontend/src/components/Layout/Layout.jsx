import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.css';

/**
 * Layout component that wraps all pages
 * Provides consistent header, footer, and main content structure
 */
function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;