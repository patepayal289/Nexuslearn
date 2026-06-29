import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import courses from '../data/courses.js';
import CourseCard from '../components/CourseCard';
import Playground from '../components/Playground';
import Certificate from '../components/Certificate';
import { Search, Sparkles, BookOpen, Award, CheckCircle, User } from 'lucide-react';

const Home = ({ completedLessons = {}, completedQuizzes = [] }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentView, setCurrentView] = useState('explore'); // 'explore' or 'dashboard'

  // Sync state view from Router navigation triggers
  useEffect(() => {
    if (location.state && location.state.view) {
      setCurrentView(location.state.view);
    }
  }, [location.state]);
  const [selectedCertCourse, setSelectedCertCourse] = useState(null);
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('nexus_student_name') || 'Graduate Student';
  });

  // Course categories
  const categories = ['All', 'Web Basics', 'Styling', 'Scripting', 'Frameworks'];

  // Filter courses based on search & category selection
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Calculate learning stats
  const totalCourses = courses.length;
  const enrolledCourses = Object.keys(completedLessons).length;
  
  const totalLessons = courses.reduce((acc, course) => acc + course.lessons.length, 0);
  const completedLessonsCount = Object.values(completedLessons).reduce(
    (acc, list) => acc + (list ? list.length : 0),
    0
  );
  
  const overallProgress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
  const completedQuizzesCount = completedQuizzes.length;

  const handleNameChange = (val) => {
    setStudentName(val);
    localStorage.setItem('nexus_student_name', val);
  };

  // Enrolled courses list (lessons checked, but not fully completed/quiz passed)
  const enrolledCoursesList = courses.filter(course => {
    const completedCount = (completedLessons[course.id] || []).length;
    return completedCount > 0 && !completedQuizzes.includes(course.id);
  });

  // Completed certified courses list
  const certifiedCoursesList = courses.filter(course => {
    return completedQuizzes.includes(course.id);
  });

  return (
    <div className="container py-4">
      {/* High-Impact Hero / Dashboard Section */}
      <section className="hero-banner glass-panel p-5 mb-4 position-relative overflow-hidden">
        {/* Glow decoration */}
        <div className="position-absolute rounded-circle" style={{ top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'rgba(16, 185, 129, 0.15)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div className="position-absolute rounded-circle" style={{ bottom: '-40px', left: '-40px', width: '200px', height: '200px', background: 'rgba(20, 184, 166, 0.15)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="hero-badge">
              <Sparkles size={14} />
              <span>Next-Generation Interactive Learning</span>
            </div>
            <h1 className="fw-bold mb-3 display-5">
              Master Modern Web <span className="text-gradient">Development</span>
            </h1>
            <p className="text-secondary mb-4 fs-5" style={{ maxWidth: '560px' }}>
              Learn core layout architectures, style components, write code, run it side-by-side in real-time, and earn verified certificates.
            </p>
          </div>

          {/* Stats Box */}
          <div className="col-lg-5">
            <div className="bg-dark bg-opacity-50 border border-secondary border-opacity-25 rounded-4 p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <Award size={18} className="text-glow text-warning" />
                <span>Your Dashboard</span>
              </h5>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="p-3 bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-3 text-center">
                    <span className="text-muted d-block small mb-1">Enrolled</span>
                    <strong className="fs-4 text-white">{enrolledCourses}</strong>
                    <span className="text-muted d-block small">of {totalCourses} courses</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-3 text-center">
                    <span className="text-muted d-block small mb-1">Certificates</span>
                    <strong className="fs-4 text-warning d-inline-flex align-items-center gap-1">
                      <Award size={20} className="fill-warning-subtle" />
                      {completedQuizzesCount}
                    </strong>
                    <span className="text-muted d-block small">Unlocked</span>
                  </div>
                </div>
              </div>

              {/* Overall platform progress */}
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="small text-secondary fw-semibold">Global Learning Progress</span>
                  <span className="small text-info fw-bold">{overallProgress}%</span>
                </div>
                <div className="progress-bar-bg" style={{ height: 8 }}>
                  <div className="progress-bar-fill" style={{ width: `${overallProgress}%` }} />
                </div>
                <div className="text-muted small mt-1.5 text-end" style={{ fontSize: '0.75rem' }}>
                  {completedLessonsCount} / {totalLessons} lessons completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore vs My Learning Navigation Toggle */}
      <div className="d-flex justify-content-center mb-5">
        <div className="bg-dark bg-opacity-40 p-1.5 rounded-pill border border-secondary border-opacity-20 d-inline-flex animate-fade">
          <button
            onClick={() => setCurrentView('explore')}
            className={`btn rounded-pill px-4 py-2 text-white fw-semibold d-flex align-items-center gap-2 border-0 ${
              currentView === 'explore' 
                ? 'btn-glow-primary' 
                : 'bg-transparent opacity-75'
            }`}
          >
            <BookOpen size={16} /> Explore Courses
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`btn rounded-pill px-4 py-2 text-white fw-semibold d-flex align-items-center gap-2 border-0 ${
              currentView === 'dashboard' 
                ? 'btn-glow-primary' 
                : 'bg-transparent opacity-75'
            }`}
          >
            <Award size={16} /> My Workspace
          </button>
        </div>
      </div>

      {currentView === 'explore' ? (
        /* EXPLORE COURSES SECTION */
        <>
          {/* Toolbar / Search & Filter Section */}
          <section className="mb-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4 border-bottom border-secondary border-opacity-10 pb-4">
              {/* Category Filter Pills */}
              <div className="filter-pills mb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search box */}
              <div className="search-container">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Courses List Grid */}
          <section>
            {filteredCourses.length > 0 ? (
              <div className="row">
                {filteredCourses.map((course) => {
                  const completedCount = (completedLessons[course.id] || []).length;
                  return (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      completedCount={completedCount}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-5 glass-panel">
                <BookOpen size={48} className="text-muted mb-3" />
                <h4 className="fw-semibold">No Courses Found</h4>
                <p className="text-secondary">Try adjusting your filters or search queries.</p>
              </div>
            )}
          </section>

          {/* Instant Sandbox Quick-Try Section */}
          <section className="mt-5 pt-4 border-top border-secondary border-opacity-10">
            <div className="glass-panel p-4 p-md-5 position-relative overflow-hidden">
              <div className="row align-items-center mb-4">
                <div className="col-md-8">
                  <h3 className="fw-bold text-gradient-accent mb-2">Instant Dashboard Sandbox</h3>
                  <p className="text-secondary mb-0">
                    Test your HTML, CSS, and JS skills instantly! Make changes in the editor block, and check out the live preview panel below.
                  </p>
                </div>
              </div>
              <div style={{ height: '420px' }}>
                <Playground 
                  initialCode={`<!-- Live Editor Test -->
<style>
  body {
    background: radial-gradient(circle at 50% 50%, #0d1e18, #050a08);
    color: #34d399;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
    margin: 0;
    text-align: center;
  }
  h1 {
    font-size: 2.2rem;
    color: #10b981;
    text-shadow: 0 0 10px rgba(16,185,129,0.4);
    margin-bottom: 5px;
  }
  p {
    color: #a3b8b0;
    font-size: 1rem;
  }
</style>

<h1>Welcome to NexusLearn!</h1>
<p>Change this code block to see preview compiler update instantly.</p>`}
                  title="Dashboard Live Playground"
                />
              </div>
            </div>
          </section>
        </>
      ) : (
        /* MY LEARNING DASHBOARD SECTION */
        <div className="row g-4">
          {/* Left panel: Profile Management */}
          <div className="col-lg-4 animate-fade">
            <div className="glass-panel p-4 mb-4">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2 border-bottom border-secondary border-opacity-10 pb-2 text-white">
                <User size={18} className="text-info" />
                <span>Student Settings</span>
              </h5>
              
              <div className="mb-3">
                <label className="form-label text-secondary fw-semibold small">Student Name for Certificates:</label>
                <input 
                  type="text"
                  className="form-control bg-dark border-secondary text-white py-2"
                  value={studentName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter your name"
                />
                <span className="text-muted small mt-1.5 d-block" style={{ fontSize: '0.75rem' }}>
                  This name will automatically appear on all completion certificates generated across NexusLearn.
                </span>
              </div>
            </div>

            <div className="glass-panel p-4">
              <h5 className="fw-bold mb-3 text-light">Achievements Summary</h5>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-success bg-opacity-15 p-2 rounded-3 text-success">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <div className="fw-bold text-white leading-tight">{completedLessonsCount}</div>
                    <div className="text-muted small">Total Checked Lessons</div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="bg-warning bg-opacity-15 p-2 rounded-3 text-warning">
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="fw-bold text-gradient-accent leading-tight">{completedQuizzesCount}</div>
                    <div className="text-muted small">Unlocked Certifications</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Active Courses & Achievements */}
          <div className="col-lg-8 animate-fade">
            {/* Active Enrolled Courses */}
            <div className="glass-panel p-4 mb-4">
              <h4 className="fw-bold mb-4 text-light border-bottom border-secondary border-opacity-10 pb-2">
                In-Progress Courses
              </h4>
              {enrolledCoursesList.length > 0 ? (
                <div className="row">
                  {enrolledCoursesList.map(course => {
                    const completedCount = (completedLessons[course.id] || []).length;
                    return (
                      <CourseCard 
                        key={course.id}
                        course={course}
                        completedCount={completedCount}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 bg-dark bg-opacity-25 rounded-3">
                  <BookOpen size={36} className="text-muted mb-2" />
                  <p className="text-secondary mb-0">No active in-progress courses.</p>
                  <button onClick={() => setCurrentView('explore')} className="btn btn-sm btn-outline-info rounded-pill px-3 py-1.5 mt-2">
                    Explore available courses
                  </button>
                </div>
              )}
            </div>

            {/* Achievements & Certificates */}
            <div className="glass-panel p-4">
              <h4 className="fw-bold mb-4 text-light border-bottom border-secondary border-opacity-10 pb-2">
                Verified Credentials
              </h4>
              {certifiedCoursesList.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {certifiedCoursesList.map(course => (
                    <div 
                      key={course.id} 
                      className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-secondary bg-opacity-10 border border-secondary border-opacity-10"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-warning bg-opacity-10 p-2.5 rounded-3 text-warning border border-warning border-opacity-25">
                          <Award size={24} className="fill-warning-subtle text-glow" />
                        </div>
                        <div>
                          <h6 className="fw-bold text-white mb-0.5">{course.title} Certificate</h6>
                          <div className="text-muted small">Course Verified Successfully</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedCertCourse(course)}
                        className="btn btn-glow-primary btn-sm rounded-pill d-flex align-items-center gap-1"
                      >
                        View Certificate
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 bg-dark bg-opacity-25 rounded-3">
                  <Award size={36} className="text-muted mb-2" />
                  <p className="text-secondary mb-0">You haven't earned any certificates yet.</p>
                  <span className="text-muted small d-block mt-1">Complete all lessons of a course and score 100% on the final quiz to unlock yours!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal Overlay */}
      {selectedCertCourse && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-80 d-flex align-items-center justify-content-center p-3 animate-fade" style={{ zIndex: 2000 }}>
          <div className="glass-panel p-4 position-relative w-100 shadow-lg border-info border-opacity-20" style={{ maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto' }}>
            <button 
              onClick={() => setSelectedCertCourse(null)}
              className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-3 rounded-pill text-white border-secondary border-opacity-50 d-flex align-items-center justify-content-center"
              style={{ width: '32px', height: '32px', fontSize: '1.25rem' }}
              title="Close modal"
            >
              &times;
            </button>
            <div className="pt-2 text-center">
              <Certificate 
                studentName={studentName} 
                courseTitle={selectedCertCourse.title} 
                courseId={selectedCertCourse.id} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
