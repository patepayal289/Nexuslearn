import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  // Global completion logs linked with localStorage
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_completed_lessons');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [completedQuizzes, setCompletedQuizzes] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_completed_quizzes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toggles completed status of a lesson
  const toggleLessonComplete = (courseId, lessonTitle) => {
    setCompletedLessons((prev) => {
      const courseList = prev[courseId] ? [...prev[courseId]] : [];
      const index = courseList.indexOf(lessonTitle);
      
      if (index > -1) {
        courseList.splice(index, 1);
      } else {
        courseList.push(lessonTitle);
      }

      const updated = { ...prev, [courseId]: courseList };
      localStorage.setItem('nexus_completed_lessons', JSON.stringify(updated));
      return updated;
    });
  };

  // Adds a course ID to list of passed quizzes
  const completeQuiz = (courseId) => {
    setCompletedQuizzes((prev) => {
      if (prev.includes(courseId)) return prev;
      const updated = [...prev, courseId];
      localStorage.setItem('nexus_completed_quizzes', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="app-container">
      {/* Glowing Ambient Blobs */}
      <div className="ambient-glow-wrapper">
        <div className="ambient-blob blob-emerald" />
        <div className="ambient-blob blob-teal" />
        <div className="ambient-blob blob-mint" />
      </div>

      {/* Header receives dynamic progress states */}
      <Header 
        completedLessons={completedLessons} 
        completedQuizzes={completedQuizzes} 
      />
      
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                completedLessons={completedLessons} 
                completedQuizzes={completedQuizzes} 
              />
            } 
          />
          <Route 
            path="/course/:id" 
            element={
              <CourseDetail 
                completedLessons={completedLessons} 
                toggleLessonComplete={toggleLessonComplete} 
                completedQuizzes={completedQuizzes} 
                completeQuiz={completeQuiz} 
              />
            } 
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
