export const SELECT_IMAGE = 'SELECT_IMAGE';
export type SelectImageAction = {
  type: typeof SELECT_IMAGE;
  payload: HTMLImageElement;
};

export function selectImageAction(image: HTMLImageElement): SelectImageAction {
  return { type: SELECT_IMAGE, payload: image };
}

export const DESELECT_IMAGE = 'DESELECT_IMAGE';
export type DeselectImageAction = {
  type: typeof DESELECT_IMAGE;
};

export function deselectImageAction(): DeselectImageAction {
  return { type: DESELECT_IMAGE };
}

export const CHANGE_SIZE_IMAGE = 'CHANGE_SIZE_IMAGE';
export type ChangeSizeImageAction = {
  type: typeof CHANGE_SIZE_IMAGE;
};

export function changeSizeImageAction(): ChangeSizeImageAction {
  return { type: CHANGE_SIZE_IMAGE };
}

export type ActionTypes = SelectImageAction | DeselectImageAction | ChangeSizeImageAction;
