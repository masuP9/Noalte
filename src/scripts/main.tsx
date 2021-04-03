import React from 'react';
import ReactDom from 'react-dom';
import { App } from './components/App';

function initializeApp(): void {
  const rootApp = document.createElement('div');
  rootApp.setAttribute('id', 'Noalte-alt-editor-for-note');
  document.body.appendChild(rootApp);
  ReactDom.render(<App />, rootApp);
}

window.onload = (_e: Event): void => {
  initializeApp();
};
