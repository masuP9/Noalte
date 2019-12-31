import * as React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/App';
import { editorObserver } from './observers';

function initializeApp(): void {
  const rootApp = document.createElement('div');
  rootApp.setAttribute('id', 'Noalte-alt-editor-for-note');
  document.body.appendChild(rootApp);
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootApp,
  );
}

window.onload = (_e: Event): void => {
  editorObserver.observe(document.body, { childList: true });
  initializeApp();
};
