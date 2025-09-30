// life-assistant-pwa/src/components/AppLayout.jsx (UPDATED NAVIGATION)
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
// We'll remove the external CSS import as we added inline styles for simplicity

const AppLayout = () => {
  return (
    <div className="app-container">
      <main className="content-area">
        <Outlet /> 
      </main>

      {/* Mobile-Style Navigation Bar with all 7 modules */}
      <nav className="mobile-nav">
        <Link to="/tasks" className="nav-item">📝</Link>
        <Link to="/calendar" className="nav-item">📅</Link>
        <Link to="/goals" className="nav-item">🎯</Link>
        <Link to="/workouts" className="nav-item">💪</Link>
        <Link to="/journal" className="nav-item">📖</Link>
        <Link to="/shopping" className="nav-item">🛒</Link>
        <Link to="/golf" className="nav-item">⛳</Link>
      </nav>
      
      {/* Inline Styles (Simplified for mobile view) */}
      <style>{`
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          font-family: Arial, sans-serif;
          max-width: 450px; /* Constrain to typical phone width */
          margin: 0 auto;
          border: 1px solid #ccc;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .content-area {
          flex-grow: 1;
          padding: 15px;
          overflow-y: auto;
        }
        .mobile-nav {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 60px;
          border-top: 1px solid #ddd;
          background-color: #ffffff;
          box-shadow: 0 -2px 5px rgba(0,0,0,0.05);
          padding: 0 5px;
        }
        .nav-item {
          text-decoration: none;
          color: #333;
          font-size: 24px; /* Use icons/emojis for visibility */
          padding: 5px 10px;
          transition: transform 0.1s;
        }
        .nav-item:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default AppLayout;