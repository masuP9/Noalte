import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducer';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const store = createStore(rootReducer, applyMiddleware(logger));
