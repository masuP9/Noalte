import React from 'react';
import { AltEditor } from '../AltEditor';

export type Position = {
  left: number;
  top: number;
};

export const App: React.VFC = () => {
  const [selectedImage, setSelectedImage] = React.useState<HTMLImageElement | null>(null);
  const [observingRoot, setObservingRoot] = React.useState<boolean>(false);

  const handleClickAddedImage = (e: Event) => {
    if (e.target instanceof HTMLImageElement) {
      setSelectedImage(e.target);
    }
  };

  const editorObserverOption = React.useMemo<MutationObserverInit>(
    () => ({
      childList: true,
    }),
    [],
  );

  const editorObserver = React.useMemo(
    () =>
      new MutationObserver((records) => {
        records.forEach((record) => {
          if (record.addedNodes.length > 0) {
            const addImages = Array.from(record.addedNodes)
              .map((node) => node.firstChild)
              .filter((node) => node instanceof HTMLImageElement);

            addImages.forEach((image) => {
              image.addEventListener('click', handleClickAddedImage);
            });

            setSelectedImage(null);
          }

          if (record.removedNodes.length > 0) {
            // 削除された Image へのイベントを削除
            const removedImages = Array.from(record.removedNodes)
              .map((node) => node.firstChild)
              .filter((node) => node.nodeName === 'IMG');

            removedImages.forEach((image) => {
              image.removeEventListener('click', handleClickAddedImage);
            });

            setSelectedImage(null);
          }
        });
      }),
    [],
  );

  const rootObserverOption = React.useMemo<MutationObserverInit>(
    () => ({
      childList: true,
    }),
    [],
  );

  const rootObserver = React.useMemo(
    () =>
      new MutationObserver((recodes) => {
        recodes.forEach((_recode) => {
          const editorElement = document.getElementById('note-body');

          if (editorElement != undefined && !observingRoot) {
            const existingImages = editorElement.querySelectorAll('img');

            if (existingImages.length > 0) {
              existingImages.forEach((img) => {
                img.addEventListener('click', handleClickAddedImage);
              });
            }

            editorObserver.observe(editorElement, editorObserverOption);
            setObservingRoot(true);
          } else if (editorElement == null && observingRoot) {
            editorObserver.disconnect();
            setObservingRoot(false);
          }
        });
      }),
    [editorObserver, editorObserverOption, observingRoot],
  );

  React.useEffect(() => {
    const editorElement = document.getElementById('note-body');

    if (!observingRoot) {
      rootObserver.observe(document.body, rootObserverOption);
      setObservingRoot(true);
    }

    if (editorElement !== null) {
      editorObserver.observe(editorElement, editorObserverOption);

      const existingImages = editorElement.querySelectorAll('img');

      if (existingImages.length > 0) {
        existingImages.forEach((img) => {
          img.addEventListener('click', handleClickAddedImage);
        });
      }
    }
  }, [editorObserver, editorObserverOption, rootObserver, rootObserverOption, observingRoot]);

  if (selectedImage === null) {
    return <div></div>;
  }

  return (
    <AltEditor
      selectedImage={selectedImage}
      onClose={() => {
        setSelectedImage(null);
      }}
    />
  );
};
