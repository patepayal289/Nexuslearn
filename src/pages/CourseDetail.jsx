import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import courses from '../data/courses.js';
import Playground from '../components/Playground';
import Quiz from '../components/Quiz';
import { 
  ArrowLeft, CheckCircle, Video, Code, BookOpen, 
  ChevronRight, Award, Lock, ExternalLink, HelpCircle 
} from 'lucide-react';

const CourseDetail = ({ completedLessons = {}, toggleLessonComplete, completedQuizzes = [], completeQuiz }) => {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);

  // State to manage active selection (either lesson index or 'quiz')
  const [activeTab, setActiveTab] = useState(0); // number for lesson index, or 'quiz'
  // Tab within the active lesson view
  const [lessonWorkSpaceTab, setLessonWorkSpaceTab] = useState('video'); // 'video', 'sandbox', 'resources'
  const [showMobileSyllabus, setShowMobileSyllabus] = useState(false);

  // Auto-switch to quiz if lessons are fully completed, or stay on active lesson
  useEffect(() => {
    // Reset workspace tab when changing active lesson
    if (typeof activeTab === 'number') {
      setLessonWorkSpaceTab('video');
    }
  }, [activeTab]);

  // Utility to parse standard youtube URL to embed format
  const getEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0` 
      : url;
  };

  if (!course) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-danger fw-bold">Course Not Found</h3>
        <p className="text-secondary">The requested course could not be loaded.</p>
        <Link to="/" className="btn btn-primary rounded-pill mt-3">Back to Courses List</Link>
      </div>
    );
  }

  const courseCompletedList = completedLessons[course.id] || [];
  const allLessonsCompleted = courseCompletedList.length === course.lessons.length;
  const isQuizPassed = completedQuizzes.includes(course.id);
  const activeLesson = typeof activeTab === 'number' ? course.lessons[activeTab] : null;

  return (
    <div className="container py-4">
      {/* Back button and breadcrumb */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <Link to="/" className="text-secondary hover-text-primary d-flex align-items-center gap-1.5 small fw-semibold">
          <ArrowLeft size={16} /> Back to Courses
        </Link>
        <ChevronRight size={14} className="text-muted" />
        <span className="text-muted small">{course.category}</span>
        <ChevronRight size={14} className="text-muted" />
        <span className="text-info small fw-medium">{course.title}</span>
      </div>

      {/* Mobile Syllabus Toggle Button */}
      <div className="d-lg-none mb-3">
        <button
          onClick={() => setShowMobileSyllabus(!showMobileSyllabus)}
          className="btn btn-outline-info w-100 py-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 text-white"
        >
          <BookOpen size={16} />
          {showMobileSyllabus ? 'Hide Syllabus' : 'Show Syllabus'}
        </button>
      </div>

      <div className="course-detail-layout">
        {/* Left Side: Course lessons list & Quiz triggers */}
        <aside className={`lesson-sidebar glass-panel ${showMobileSyllabus ? 'd-block' : 'd-none d-lg-block'}`}>
          <div className="border-bottom border-secondary border-opacity-10 pb-3 mb-3">
            <h5 className="fw-bold mb-1">{course.title}</h5>
            <span className="badge bg-secondary-subtle text-secondary small">{course.difficulty}</span>
          </div>

          <div className="sidebar-title">Lessons</div>
          <div className="lesson-list mb-4">
            {course.lessons.map((lesson, idx) => {
              const isCompleted = courseCompletedList.includes(lesson.title);
              const isActive = activeTab === idx;
              
              return (
                <div 
                  key={idx} 
                  className={`lesson-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(idx);
                    setShowMobileSyllabus(false);
                  }}
                >
                  <div className="lesson-item-left">
                    {/* Completion Checkbox */}
                    <div 
                      className={`checkbox-custom ${isCompleted ? 'checked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent setting active lesson
                        toggleLessonComplete(course.id, lesson.title);
                      }}
                      title="Toggle Completed"
                    >
                      {isCompleted && <CheckCircle size={14} className="text-dark fill-success" />}
                    </div>
                    <span className="lesson-item-index">{idx + 1}</span>
                    <span className="lesson-item-title" title={lesson.title}>{lesson.title}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quiz Action Block */}
          <div className="sidebar-title pt-2 border-top border-secondary border-opacity-10">Verification</div>
          <div 
            className={`lesson-item ${activeTab === 'quiz' ? 'active' : ''} ${!allLessonsCompleted && !isQuizPassed ? 'opacity-50' : ''}`}
            onClick={() => {
              if (allLessonsCompleted || isQuizPassed) {
                setActiveTab('quiz');
                setShowMobileSyllabus(false);
              } else {
                alert('Please complete all lessons first to unlock the course completion quiz!');
              }
            }}
          >
            <div className="lesson-item-left">
              {allLessonsCompleted || isQuizPassed ? (
                <Award size={18} className={isQuizPassed ? 'text-success' : 'text-warning'} />
              ) : (
                <Lock size={16} className="text-muted" />
              )}
              <span className="lesson-item-title fw-bold">
                {isQuizPassed ? 'Course Certificate' : 'Final Course Quiz'}
              </span>
            </div>
            {!allLessonsCompleted && !isQuizPassed && (
              <span className="badge bg-dark text-muted rounded-pill" style={{ fontSize: '0.7rem' }}>
                {courseCompletedList.length}/{course.lessons.length}
              </span>
            )}
          </div>
        </aside>

        {/* Right Side: Active Workspace */}
        <main className="course-main-content">
          {activeTab === 'quiz' ? (
            /* QUIZ SCREEN */
            <Quiz 
              course={course} 
              onComplete={() => completeQuiz(course.id)} 
            />
          ) : (
            /* LESSON WORKSPACE */
            activeLesson && (
              <div className="glass-panel lesson-content-panel">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 border-bottom border-secondary border-opacity-10 pb-3">
                  <div>
                    <h3 className="fw-bold mb-1 text-light">{activeLesson.title}</h3>
                    <p className="text-secondary small mb-0">{activeLesson.description}</p>
                  </div>
                  
                  {/* Mark complete button */}
                  <div>
                    <button 
                      onClick={() => toggleLessonComplete(course.id, activeLesson.title)}
                      className={`btn btn-sm px-3 rounded-pill d-flex align-items-center gap-1.5 ${
                        courseCompletedList.includes(activeLesson.title)
                          ? 'btn-success text-dark fw-bold'
                          : 'btn-outline-secondary text-white'
                      }`}
                    >
                      <CheckCircle size={15} />
                      {courseCompletedList.includes(activeLesson.title) ? 'Lesson Completed' : 'Mark as Complete'}
                    </button>
                  </div>
                </div>

                {/* Workspace tabs: Video, Editor Sandbox, Resources */}
                <div className="detail-tabs">
                  <button 
                    onClick={() => setLessonWorkSpaceTab('video')}
                    className={`tab-btn d-flex align-items-center gap-1.5 ${lessonWorkSpaceTab === 'video' ? 'active' : ''}`}
                  >
                    <Video size={16} /> Video Tutorial
                  </button>
                  <button 
                    onClick={() => setLessonWorkSpaceTab('sandbox')}
                    className={`tab-btn d-flex align-items-center gap-1.5 ${lessonWorkSpaceTab === 'sandbox' ? 'active' : ''}`}
                  >
                    <Code size={16} /> Interactive Sandbox
                  </button>
                  <button 
                    onClick={() => setLessonWorkSpaceTab('resources')}
                    className={`tab-btn d-flex align-items-center gap-1.5 ${lessonWorkSpaceTab === 'resources' ? 'active' : ''}`}
                  >
                    <BookOpen size={16} /> Resources & Guides
                  </button>
                </div>

                {/* Tab contents */}
                <div className="tab-contents py-2">
                  {/* Video tab */}
                  {lessonWorkSpaceTab === 'video' && (
                    <div>
                      {activeLesson.youtubeLink ? (
                        <div>
                          <div className="video-container">
                            <iframe 
                              src={getEmbedUrl(activeLesson.youtubeLink)}
                              title={activeLesson.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                              allowFullScreen
                            />
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="small text-muted">Embedding YouTube Stream</span>
                            <a 
                              href={activeLesson.youtubeLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-info d-inline-flex align-items-center gap-1"
                            >
                              Open in YouTube <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-5 bg-dark rounded bg-opacity-25">
                          <HelpCircle size={40} className="text-muted mb-2" />
                          <p className="text-secondary">No tutorial video is linked to this lesson.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Sandbox Tab */}
                  {lessonWorkSpaceTab === 'sandbox' && (
                    <div style={{ height: '560px' }}>
                      <Playground 
                        initialCode={activeLesson.codeSnippet || '<!-- Start coding here... -->'} 
                        title={`Practice Area: ${activeLesson.title}`}
                      />
                    </div>
                  )}

                  {/* Resources Tab */}
                  {lessonWorkSpaceTab === 'resources' && (
                    <div className="py-2">
                      <h5 className="fw-semibold text-light mb-3">Recommended Resources</h5>
                      {activeLesson.resources && activeLesson.resources.length > 0 ? (
                        <ul className="list-unstyled d-flex flex-column gap-2.5">
                          {activeLesson.resources.map((link, idx) => (
                            <li key={idx}>
                              <a 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="d-flex align-items-center justify-content-between bg-dark bg-opacity-50 hover-bg-secondary p-3 rounded-3 border border-secondary border-opacity-10 text-white-50"
                              >
                                <span className="fw-medium text-info">{link}</span>
                                <ExternalLink size={14} className="text-muted" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted">No external reference links for this lesson.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseDetail;
