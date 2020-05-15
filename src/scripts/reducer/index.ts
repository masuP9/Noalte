import { combineReducers } from 'redux';
import { imageReducer } from './imageReducer';
import { observerReducer } from './observerReducer';

export const rootReducer = combineReducers({
  image: imageReducer,
  observer: observerReducer,
});
export type AppState = ReturnType<typeof rootReducer>;
