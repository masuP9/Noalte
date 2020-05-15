import { DESELECT_IMAGE, SELECT_IMAGE, ActionTypes, CHANGE_SIZE_IMAGE } from '../actions';

export type Position = {
  left: number;
  top: number;
};

export type State = {
  selectedImage: HTMLImageElement | null;
  position: Position;
};

const initialState: State = {
  selectedImage: null,
  position: {
    left: 0,
    top: 0,
  },
};

type Action = ActionTypes;

export function imageReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SELECT_IMAGE: {
      const imageRect = action.payload.getBoundingClientRect();
      return {
        ...state,
        selectedImage: action.payload,
        position: {
          left: imageRect.right + 12,
          top: imageRect.top,
        },
      };
    }
    case DESELECT_IMAGE: {
      return { ...state, selectedImage: null };
    }
    case CHANGE_SIZE_IMAGE: {
      const imageRect = state.selectedImage.getBoundingClientRect();
      return {
        ...state,
        position: {
          left: imageRect.right + 12,
          top: imageRect.top,
        },
      };
    }
    default:
      return state;
  }
}
