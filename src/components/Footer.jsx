import React from 'react';
import { Globe, Heart } from 'lucide-react';

const Footer = () => (
  <footer className="border-top border-secondary border-opacity-10 py-4 mt-5 bg-dark bg-opacity-25 backdrop-blur">
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        {/* Left copyright info */}
        <div>
          <span className="fw-semibold text-gradient">NexusLearn Academy</span>
          <span className="text-muted small ms-2">
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        {/* Center credits */}
        <div className="small text-muted d-flex align-items-center gap-1">
          Made with <Heart size={12} className="text-danger fill-danger" /> for web creators
        </div>

        {/* Right social handles */}
        <div className="d-flex gap-3">
          <a 
            href="https://github.com/patepayal289/mini-course-platform" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-secondary hover-text-primary transition-colors"
            title="GitHub Repository"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a 
            href="#" 
            className="text-secondary hover-text-primary transition-colors"
            title="Developer Portfolio"
          >
            <Globe size={18} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;