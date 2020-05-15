import { store } from './store';
import { selectImageAction, deselectImageAction, changeSizeImageAction, observeEditorAction } from './actions';

const imageObserver = new MutationObserver((records) => {
  records.forEach((record) => {
    const { type, target, oldValue, attributeName } = record;
    if (
      type === 'attributes' &&
      target.nodeName === 'IMG' &&
      oldValue !== (target as HTMLImageElement).getAttribute(attributeName)
    ) {
      store.dispatch(changeSizeImageAction());
    }
  });
});

function handleClickAddedImage(e: Event) {
  store.dispatch(selectImageAction(e.target as HTMLImageElement));
}

const noteBodyObserver = new MutationObserver((records) => {
  records.forEach((record) => {
    if (record.addedNodes.length > 0) {
      const addImages = Array.from(record.addedNodes)
        .map((node) => node.firstChild)
        .filter((node) => node.nodeName === 'IMG');

      addImages.forEach((image) => {
        image.addEventListener('click', handleClickAddedImage);
        imageObserver.observe(image, { attributeFilter: ['style'] });
      });

      store.dispatch(deselectImageAction());
    }

    if (record.removedNodes.length > 0) {
      // 削除された Image へのイベントを削除
      const removedImages = Array.from(record.removedNodes)
        .map((node) => node.firstChild)
        .filter((node) => node.nodeName === 'IMG');

      removedImages.forEach((image) => {
        image.removeEventListener('click', handleClickAddedImage);
      });

      store.dispatch(deselectImageAction());
    }
  });
});

export const editorObserver = new MutationObserver((recodes, observer) => {
  recodes.forEach((_recode) => {
    const noteBody = document.getElementById('note-body');
    const state = store.getState();

    if (noteBody != undefined && state.observer.observingEditor !== true) {
      const existingImages = noteBody.querySelectorAll('img');
      if (existingImages.length > 0) {
        existingImages.forEach((img) => {
          img.addEventListener('click', handleClickAddedImage);
        });
      }

      noteBodyObserver.observe(noteBody, { childList: true });
      store.dispatch(observeEditorAction(true));
    } else if (noteBody == null && state.observer.observingEditor === true) {
      noteBodyObserver.disconnect();
      store.dispatch(observeEditorAction(false));
    }
  });
});
