import { store } from './store';
import { selectImageAction, deselectImageAction } from './actions';

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
      });
    }

    if (record.removedNodes.length > 0) {
      // 削除された Image へのイベントを削除
      const removedImages = Array.from(record.removedNodes)
        .map((node) => node.firstChild)
        .filter((node) => node.nodeName === 'IMG');

      removedImages.forEach((image, i, self) => {
        image.removeEventListener('click', handleClickAddedImage);
      });

          store.dispatch(deselectImageAction());
        }
      });
});
