import { store } from './store';
import { selectImageAction, deselectImageAction, changeSizeImageAction } from './actions';

export const imageObserver = new MutationObserver((records) => {
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

export const noteBodyObserver = new MutationObserver((records) => {
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
