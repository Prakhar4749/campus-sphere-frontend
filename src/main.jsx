// Shims for libraries that expect Node.js globals (Earliest execution)
(function() {
  console.info('[Init] Checking globals in src/main.jsx...');
  if (typeof global === 'undefined') {
    console.warn('[Init] global was undefined, polyfilling window.global');
    window.global = window;
  }
  if (typeof process === 'undefined') {
    console.warn('[Init] process was undefined, polyfilling window.process');
    window.process = { env: { NODE_ENV: 'production' } };
  }
  if (typeof exports === 'undefined') {
    window.exports = {};
  }
  console.info('[Init] Globals check complete:', {
    hasGlobal: typeof global !== 'undefined',
    hasProcess: typeof process !== 'undefined',
    hasRequest: typeof Request !== 'undefined'
  });
})();

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

try {
  console.info('[Render] Starting React root mount');
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  console.info('[Render] React root mount complete');
} catch (error) {
  console.error('[CRITICAL] Failed to mount application:', error);
  // Show a visible error message on the screen for easier production debugging
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px;">
        <h2 style="margin-top: 0;">Application Load Error</h2>
        <p>A fatal error occurred during application startup. Please check the browser console for more details.</p>
        <pre style="white-space: pre-wrap; word-wrap: break-word;">${error.stack || error.message}</pre>
      </div>
    `;
  }
}