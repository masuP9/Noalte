import React from 'react';
import { AltEditor } from '../AltEditor';

export type Position = {
  left: number;
  top: number;
};

const filterFirstChildImagesFromNodes = (nodeList: NodeList): HTMLImageElement[] => {
  const childNodes = Array.from(nodeList).flatMap((node) => (node.firstChild != null ? [node.firstChild] : []));
  const images = childNodes.filter((node): node is HTMLImageElement => node instanceof HTMLImageElement);
  return images;
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
          const { addedNodes, removedNodes } = record;
          if (addedNodes.length > 0) {
            const addImages = filterFirstChildImagesFromNodes(addedNodes);

            if (addImages.length > 0) {
              addImages.forEach((image) => {
                image.addEventListener('click', handleClickAddedImage);
              });
              setSelectedImage(null);
            }
          }

          if (removedNodes.length > 0) {
            const removedImages = filterFirstChildImagesFromNodes(removedNodes);

            if (removedImages.length > 0) {
              removedImages.forEach((image) => {
                image.removeEventListener('click', handleClickAddedImage);
              });
              setSelectedImage(null);
            }
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
