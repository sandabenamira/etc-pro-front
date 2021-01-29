import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import configureStore, { history } from './store';
import './firebase/firebase';
import App from './containers/App';

export const store = configureStore();

class MainApp extends Component {
  state = {
    load: false,
  };

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" render={(props) => <App {...props} />} />
          </Switch>
        </ConnectedRouter>


      </Provider>
    )
  }
}
export default MainApp;