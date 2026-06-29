import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react';
import Certificate from './Certificate';

const Quiz = ({ course, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // Certificate states
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('nexus_student_name') || '';
  });
  const [showCertificate, setShowCertificate] = useState(false);

  const questions = course.quiz || [];

  if (questions.length === 0) {
    return (
      <div className="glass-panel p-4 text-center">
        <HelpCircle size={40} className="text-warning mb-2" />
        <h5>No Quiz Available</h5>
        <p className="text-muted">There are no quiz questions added for this course yet.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  const handleOptionClick = (optIdx) => {
    if (isAnswered) return;
    setSelectedOpt(optIdx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null || isAnswered) return;
    
    const isCorrect = selectedOpt === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setIsAnswered(false);
    
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
      if (score + (selectedOpt === currentQuestion.correctIndex ? 1 : 0) === questions.length) {
        if (onComplete) onComplete();
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    setShowCertificate(false);
  };

  if (showCertificate) {
    return (
      <div>
        <div className="mb-4 text-center">
          <button 
            onClick={() => setShowCertificate(false)} 
            className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1.5"
          >
            <RotateCcw size={14} /> Back to Quiz Summary
          </button>
        </div>
        <Certificate studentName={studentName} courseTitle={course.title} courseId={course.id} />
      </div>
    );
  }

  if (isFinished) {
    const passed = score === questions.length;
    return (
      <div className="glass-panel p-5 text-center">
        {passed ? (
          <div>
            <Award size={64} className="text-glow text-warning mb-3" style={{ filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.4))' }} />
            <h3 className="fw-bold mb-2">Congratulations!</h3>
            <p className="text-secondary mb-4">
              You scored <strong className="text-light">{score}/{questions.length}</strong> and passed the quiz with 100%!
            </p>

            <div className="mx-auto" style={{ maxWidth: '400px' }}>
              <div className="mb-3 text-start">
                <label className="form-label text-secondary fw-semibold small">Enter your full name for the certificate:</label>
                <input 
                  type="text" 
                  className="form-control bg-dark border-secondary text-white py-2"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    localStorage.setItem('nexus_student_name', e.target.value);
                  }}
                  placeholder="e.g. Payal Patel"
                />
              </div>
              <button 
                onClick={() => setShowCertificate(true)} 
                disabled={!studentName.trim()}
                className="btn btn-glow-primary w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
              >
                <ShieldCheck size={18} /> Generate Certificate
              </button>
            </div>
          </div>
        ) : (
          <div>
            <XCircle size={64} className="text-danger mb-3" />
            <h3 className="fw-bold mb-2">Quiz Incomplete</h3>
            <p className="text-secondary mb-4">
              You scored <strong className="text-light">{score}/{questions.length}</strong>. You need 100% correct answers to unlock your Certificate of Completion.
            </p>
            <button onClick={handleRestart} className="btn btn-outline-info rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2">
              <RotateCcw size={16} /> Try Again
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="glass-panel p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-4">
        <div>
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill mb-1">QUIZ</span>
          <h5 className="mb-0 fw-bold">{course.title} Quiz</h5>
        </div>
        <span className="text-muted small fw-semibold">
          Question {currentIdx + 1} of {questions.length}
        </span>
      </div>

      {/* Progress Line */}
      <div className="progress-bar-bg mb-4">
        <div 
          className="progress-bar-fill bg-info" 
          style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h5 className="fw-semibold mb-4 text-light">{currentQuestion.question}</h5>

      {/* Options */}
      <div className="mb-4">
        {currentQuestion.options.map((option, idx) => {
          let optionClass = '';
          if (isAnswered) {
            if (idx === currentQuestion.correctIndex) {
              optionClass = 'correct';
            } else if (idx === selectedOpt) {
              optionClass = 'incorrect';
            }
          } else if (idx === selectedOpt) {
            optionClass = 'selected';
          }

          return (
            <div 
              key={idx} 
              onClick={() => handleOptionClick(idx)}
              className={`quiz-option ${optionClass}`}
            >
              <div className="option-letter">
                {String.fromCharCode(65 + idx)}
              </div>
              <span className="fw-medium text-white-50">{option}</span>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="d-flex justify-content-end">
        {!isAnswered ? (
          <button 
            onClick={handleSubmit} 
            disabled={selectedOpt === null}
            className="btn btn-primary px-4 py-2 rounded-pill d-flex align-items-center gap-2"
          >
            Submit Answer
          </button>
        ) : (
          <button 
            onClick={handleNext} 
            className="btn btn-success px-4 py-2 rounded-pill d-flex align-items-center gap-2 text-dark fw-bold"
          >
            {currentIdx + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
