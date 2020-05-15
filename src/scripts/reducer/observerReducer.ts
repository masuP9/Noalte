import { OBSERVE_EDITOR, ActionTypes } from '../actions';

export type State = {
  observingEditor: Boolean;
};

const initialState: State = {
  observingEditor: false,
};

type Action = ActionTypes;

export function observerReducer(state = initialState, action: Action) {
  switch (action.type) {
    case OBSERVE_EDITOR: {
      return {
        ...state,
        observingEditor: action.payload,
      };
    }
    default:
      return state;
  }
}
