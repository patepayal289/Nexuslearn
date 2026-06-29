import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, BarChart, ArrowRight, Award } from 'lucide-react';

const CourseCard = ({ course, completedCount = 0 }) => {
  const totalLessons = course.lessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const isFinished = progressPercent === 100;

  const renderFloatingChars = (id) => {
    switch (id) {
      case 'html-basics':
        return (
          <>
            <div className="position-absolute font-monospace small opacity-25" style={{ top: '15%', left: '10%', color: course.color, transform: 'rotate(-12deg)', fontSize: '0.75rem' }}>&lt;div&gt;</div>
            <div className="position-absolute font-monospace small opacity-25" style={{ bottom: '15%', right: '10%', color: course.color, transform: 'rotate(15deg)', fontSize: '0.75rem' }}>&lt;/h1&gt;</div>
            <div className="position-absolute font-monospace small opacity-15" style={{ top: '50%', right: '15%', color: course.color, fontSize: '0.75rem' }}>&lt;p&gt;</div>
          </>
        );
      case 'css-fundamentals':
        return (
          <>
            <div className="position-absolute font-monospace small opacity-25" style={{ top: '15%', left: '10%', color: course.color, transform: 'rotate(-10deg)', fontSize: '0.75rem' }}>.btn &#123;</div>
            <div className="position-absolute font-monospace small opacity-25" style={{ bottom: '15%', right: '10%', color: course.color, transform: 'rotate(8deg)', fontSize: '0.75rem' }}>color: #fff; &#125;</div>
            <div className="position-absolute font-monospace small opacity-15" style={{ top: '45%', right: '15%', color: course.color, fontSize: '0.75rem' }}>@media</div>
          </>
        );
      case 'javascript-essentials':
        return (
          <>
            <div className="position-absolute font-monospace small opacity-25" style={{ top: '15%', left: '8%', color: course.color, transform: 'rotate(-15deg)', fontSize: '0.75rem' }}>const x = () =&gt;</div>
            <div className="position-absolute font-monospace small opacity-25" style={{ bottom: '15%', right: '8%', color: course.color, transform: 'rotate(12deg)', fontSize: '0.75rem' }}>import React</div>
            <div className="position-absolute font-monospace small opacity-15" style={{ top: '50%', right: '15%', color: course.color, fontSize: '0.75rem' }}>let sum = 0;</div>
          </>
        );
      case 'bootstrap-basics':
        return (
          <>
            <div className="position-absolute font-monospace small opacity-25" style={{ top: '15%', left: '10%', color: course.color, transform: 'rotate(-8deg)', fontSize: '0.75rem' }}>col-md-6</div>
            <div className="position-absolute font-monospace small opacity-25" style={{ bottom: '15%', right: '10%', color: course.color, transform: 'rotate(15deg)', fontSize: '0.75rem' }}>d-flex justify</div>
            <div className="position-absolute font-monospace small opacity-15" style={{ top: '50%', right: '15%', color: course.color, fontSize: '0.75rem' }}>row g-3</div>
          </>
        );
      case 'react-intro':
        return (
          <>
            <div className="position-absolute font-monospace small opacity-25" style={{ top: '15%', left: '10%', color: course.color, transform: 'rotate(-12deg)', fontSize: '0.75rem' }}>useState(null)</div>
            <div className="position-absolute font-monospace small opacity-25" style={{ bottom: '15%', right: '10%', color: course.color, transform: 'rotate(10deg)', fontSize: '0.75rem' }}>&lt;App /&gt;</div>
            <div className="position-absolute font-monospace small opacity-15" style={{ top: '50%', right: '15%', color: course.color, fontSize: '0.75rem' }}>useEffect()</div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4 animate-fade">
      <div className="course-card">
        {/* Dynamic Image/Badge Header */}
        <div className="course-card-image position-relative overflow-hidden" style={{ background: `linear-gradient(135deg, rgba(${hexToRgb(course.color)}, 0.05), rgba(${hexToRgb(course.color)}, 0.18))` }}>
          <div className="course-badge">{course.category}</div>
          {renderFloatingChars(course.id)}
          <div 
            style={{ 
              color: course.color, 
              fontSize: '2.5rem', 
              fontWeight: 800,
              textShadow: `0 0 15px rgba(${hexToRgb(course.color)}, 0.4)`,
              zIndex: 2
            }}
          >
            {course.imageText}
          </div>
        </div>

        {/* Card Body */}
        <div className="course-card-content">
          <div className="course-meta">
            <span>
              <Clock size={14} />
              {course.duration}
            </span>
            <span>
              <BarChart size={14} />
              {course.difficulty}
            </span>
            <span>
              <BookOpen size={14} />
              {totalLessons} Lessons
            </span>
          </div>

          <h5 className="course-card-title">{course.title}</h5>
          <p className="course-card-desc">{course.description}</p>

          {/* Progress Tracker */}
          <div className="progress-container">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="progress-text">
              <span>{progressPercent}% Complete</span>
              <span>{completedCount}/{totalLessons} Lessons</span>
            </div>
          </div>

          {/* Button Link */}
          <div className="mt-auto d-flex justify-content-between align-items-center">
            {isFinished ? (
              <span className="badge bg-success-subtle text-success border border-success-subtle px-2.5 py-1.5 rounded-pill d-flex align-items-center gap-1">
                <Award size={14} /> Certified
              </span>
            ) : (
              <span />
            )}
            <Link 
              to={`/course/${course.id}`} 
              className="btn btn-outline-info btn-sm rounded-pill d-flex align-items-center gap-1.5 transition-all px-3 py-1.5"
              style={{
                borderColor: course.color,
                color: course.color,
                background: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `rgba(${hexToRgb(course.color)}, 0.1)`;
                e.currentTarget.style.boxShadow = `0 0 10px rgba(${hexToRgb(course.color)}, 0.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {progressPercent > 0 ? 'Resume Learning' : 'Start Learning'} 
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to turn color string to RGB format for alpha overlays
function hexToRgb(hex) {
  // Simple check for hex
  if (!hex || !hex.startsWith('#')) return '56, 189, 248'; // default primary cyan
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '56, 189, 248';
}

export default CourseCard;