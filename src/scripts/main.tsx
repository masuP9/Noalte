import * as React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { selectImageAction, deselectImageAction } from './actions';
import App from './components/App';

function handleClickAddedImage(e: Event) {
  store.dispatch(selectImageAction(e.target as HTMLImageElement));
}

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
      if (record.addedNodes.length > 0) {
        const addImages = Array.from(record.addedNodes)
          .map((node) => node.firstChild)
          .filter((node) => node.nodeName === 'IMG');

        addImages.forEach((image) => {
          image.addEventListener('click', handleClickAddedImage);
        });
      }

      if (record.removedNodes.length > 0) {
        // 削除された Image へのイベントを削除
        const removedImages = Array.from(record.removedNodes)
          .map((node) => node.firstChild)
          .filter((node) => node.nodeName === 'IMG');

        removedImages.forEach((image, i, self) => {
          image.removeEventListener('click', handleClickAddedImage);

          // 最後に画像の選択を解除
          if (i + 1 === self.length) {
            store.dispatch(deselectImageAction());
          }
        });
      }
    });
  });

  noteBodyObserver.observe(noteBody, { childList: true });
};
