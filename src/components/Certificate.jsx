import React from 'react';
import { Award, Printer, ShieldCheck, Share2 } from 'lucide-react';

const Certificate = ({ studentName, courseTitle, courseId }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Generate a mock unique verification code
  const generateVerificationCode = () => {
    const cleanName = studentName.replace(/\s+/g, '').toUpperCase().slice(0, 3);
    const cleanCourse = courseId.toUpperCase().slice(0, 4);
    const randomHash = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `NL-${cleanCourse}-${cleanName}-${randomHash}`;
  };

  const verificationCode = generateVerificationCode();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="text-center my-3">
      {/* Print Trigger */}
      <div className="d-flex justify-content-center gap-3 mb-4 no-print">
        <button onClick={handlePrint} className="btn btn-glow-primary d-flex align-items-center gap-2">
          <Printer size={18} /> Print / Save PDF
        </button>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(`I just completed ${courseTitle} on NexusLearn! ID: ${verificationCode}`);
            alert('Certificate details copied to clipboard!');
          }} 
          className="btn btn-outline-secondary d-flex align-items-center gap-2 text-white"
        >
          <Share2 size={18} /> Copy Share Details
        </button>
      </div>

      {/* Printable Certificate Template */}
      <div className="certificate-wrapper mx-auto">
        <div className="certificate-border">
          {/* Top Seal */}
          <div className="certificate-seal">
            <Award size={40} className="text-dark" />
          </div>

          <h5 className="text-gradient fw-bold mb-1 letter-spacing-1">NEXUSLEARN ACADEMY</h5>
          <h2 className="certificate-title text-white">Certificate of Completion</h2>
          <p className="certificate-subtitle">THIS IS PROUDLY PRESENTED TO</p>

          <h1 className="certificate-recipient text-glow">{studentName}</h1>

          <p className="certificate-subtitle mb-2">FOR SUCCESSFULLY STUDYING AND COMPLETING ALL REQUIRED LESSONS FOR</p>
          <h3 className="certificate-course text-gradient">{courseTitle}</h3>
          
          <p className="certificate-subtitle text-secondary">
            Granted on <strong className="text-light">{currentDate}</strong> as proof of professional course engagement.
          </p>

          {/* Bottom Grid Signatures */}
          <div className="row mt-5 pt-4 border-top border-secondary-subtle">
            <div className="col-6">
              <div className="mx-auto" style={{ width: '120px', height: '40px', fontFamily: 'Brush Script MT, cursive', fontSize: '1.8rem', color: '#818cf8', opacity: 0.85 }}>
                Nexus Team
              </div>
              <div className="fw-semibold small text-light mt-1 border-top border-secondary pt-1" style={{ maxWidth: '160px', margin: '0 auto' }}>
                Course Instructor
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center justify-content-center text-success gap-1" style={{ height: '40px' }}>
                <ShieldCheck size={20} />
                <span className="small fw-bold">VERIFIED</span>
              </div>
              <div className="fw-semibold small text-light mt-1 border-top border-secondary pt-1" style={{ maxWidth: '160px', margin: '0 auto' }}>
                Nexus Registrar
              </div>
            </div>
          </div>

          {/* Certificate UUID */}
          <div className="certificate-id">
            Verification Hash: <span className="text-light">{verificationCode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
