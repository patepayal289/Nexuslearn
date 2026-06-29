import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Code, Award, GraduationCap } from 'lucide-react';

const Header = ({ completedLessons = {}, completedQuizzes = [] }) => {
  const location = useLocation();

  // Calculate global learning stats
  const totalCompletedLessons = Object.values(completedLessons).reduce(
    (acc, list) => acc + (list ? list.length : 0),
    0
  );
  const totalCertificates = completedQuizzes.length;

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand text-white d-flex align-items-center gap-2.5" to="/">
          <div className="bg-info-subtle p-2 rounded-3 text-info d-flex align-items-center justify-content-center">
            <GraduationCap size={24} className="text-glow" />
          </div>
          <span className="logo-text text-gradient">NexusLearn</span>
        </Link>

        {/* Toggler */}
        <button 
          className="navbar-toggler border-0 text-white" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link 
                className={`nav-link nav-link-custom d-flex align-items-center gap-1.5 ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
              >
                <BookOpen size={16} /> Courses
              </Link>
            </li>
          </ul>

          {/* User Progress Stats in Header */}
          <div className="d-flex align-items-center gap-3">
            <div className="d-none d-sm-flex align-items-center gap-3 text-secondary border-end border-secondary border-opacity-25 pe-3">
              <div className="text-end">
                <div className="small text-muted text-uppercase fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>
                  Lessons Completed
                </div>
                <div className="fw-bold text-white small">{totalCompletedLessons}</div>
              </div>
              <div className="text-end">
                <div className="small text-muted text-uppercase fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>
                  Certificates Earned
                </div>
                <div className="fw-bold text-gradient small d-flex align-items-center justify-content-end gap-1">
                  <Award size={14} className="text-warning" />
                  {totalCertificates}
                </div>
              </div>
            </div>
            
            <Link to="/" state={{ view: 'dashboard' }} className="btn btn-glow-primary btn-sm rounded-pill d-flex align-items-center gap-1">
              Student Workspace
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
