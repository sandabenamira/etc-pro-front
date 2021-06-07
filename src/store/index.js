import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './reducers/index';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routeMiddleware, thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedEnhancers = compose(applyMiddleware(...middlewares));

export default function configureStore(initialState) {
  var store;

  if (process.env.NODE_ENV === 'development') {
    store = createStore(reducers(history), initialState, composeEnhancers(composedEnhancers));
  } else {
    store = createStore(reducers(history), initialState, composedEnhancers);
  }


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
export { history };
