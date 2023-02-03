import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { EditorProvider } from './contexts/editor';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <EditorProvider>
    <App />
  </EditorProvider>
);
