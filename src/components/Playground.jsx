import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal } from 'lucide-react';

const Playground = ({ initialCode = '', title = 'Live Code Editor' }) => {
  const [code, setCode] = useState(initialCode);
  const [srcDoc, setSrcDoc] = useState('');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('editor'); // 'editor' or 'preview' on mobile

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    // Debounce the compiler render to keep typing smooth
    const timeout = setTimeout(() => {
      setSrcDoc(code);
    }, 400);

    return () => clearTimeout(timeout);
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset code to initial boilerplate?')) {
      setCode(initialCode);
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      {/* Sandbox Toolbar */}
      <div className="d-flex justify-content-between align-items-center bg-dark px-3 py-2 border border-bottom-0 border-secondary rounded-top-3">
        <div className="d-flex align-items-center gap-2">
          <Terminal size={16} className="text-info" />
          <span className="text-light-emphasis fw-bold small">{title}</span>
        </div>
        <div className="d-flex gap-2">
          <button 
            onClick={handleCopy} 
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1.5 py-1 px-2.5 text-white"
            title="Copy Code"
          >
            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
            <span className="small">{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button 
            onClick={handleReset} 
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1.5 py-1 px-2.5 text-white"
            title="Reset Editor"
          >
            <RotateCcw size={14} />
            <span className="small">Reset</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Selector (Visible only on mobile screens) */}
      <div className="d-flex d-md-none bg-dark border-start border-end border-secondary border-opacity-50 px-2 py-1">
        <button 
          onClick={() => setViewMode('editor')}
          className={`btn btn-sm rounded-pill flex-grow-1 me-1 text-white py-1.5 ${viewMode === 'editor' ? 'bg-info bg-opacity-10 text-info border border-info border-opacity-50' : 'border-0 opacity-75'}`}
        >
          Code Editor
        </button>
        <button 
          onClick={() => setViewMode('preview')}
          className={`btn btn-sm rounded-pill flex-grow-1 ms-1 text-white py-1.5 ${viewMode === 'preview' ? 'bg-info bg-opacity-10 text-info border border-info border-opacity-50' : 'border-0 opacity-75'}`}
        >
          Live Preview
        </button>
      </div>

      {/* Editor & Previewer Split Layout */}
      <div className="playground-container">
        {/* Left Side: Code Editor */}
        <div className={`playground-editor ${viewMode === 'editor' ? 'd-flex' : 'd-none d-md-flex'}`}>
          <div className="playground-header">
            <span>index.html</span>
            <span className="text-success d-flex align-items-center gap-1">
              <span className="d-inline-block rounded-circle bg-success" style={{ width: 6, height: 6 }} />
              Live Compile
            </span>
          </div>
          <textarea
            className="playground-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            placeholder="Type your HTML/CSS/JS here..."
          />
        </div>

        {/* Right Side: Live Browser Preview */}
        <div className={`playground-preview ${viewMode === 'preview' ? 'd-flex' : 'd-none d-md-flex'}`}>
          <div className="playground-header bg-light text-dark border-bottom border-light-subtle">
            <span>Browser Preview</span>
            <span className="text-muted small">Sandboxed</span>
          </div>
          <iframe
            srcDoc={srcDoc}
            title="sandbox-preview"
            sandbox="allow-scripts"
            className="playground-iframe"
          />
        </div>
      </div>
      <div className="mt-2 text-muted small d-flex align-items-center gap-1">
        <Play size={12} className="text-info" />
        <span>Try making changes in the code editor, the browser preview renders in real-time.</span>
      </div>
    </div>
  );
};

export default Playground;
