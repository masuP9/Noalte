import * as React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { selectImageAction } from './actions';
import App from './components/App';

window.onload = (_e: Event): void => {
  const noteBody = document.getElementById('note-body');
  const rootApp = document.createElement('div');
  rootApp.setAttribute('id', 'Noalte-alt-editor-for-note');
  document.body.appendChild(rootApp);
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootApp,
  );

  const noteBodyObserver = new MutationObserver((records) => {
    records.forEach((record) => {
      const addImages = Array.from(record.addedNodes)
        .map((node) => node.firstChild)
        .filter((node) => node.nodeName === 'IMG');

      addImages.forEach((image) => {
        image.addEventListener('click', (e) => {
          store.dispatch(selectImageAction(e.target as HTMLImageElement));
        });
      });
    });
  });

  noteBodyObserver.observe(noteBody, { childList: true });
};
