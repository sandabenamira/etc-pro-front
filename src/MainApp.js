import React, {Component} from 'react';
import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import configureStore, {history} from './store';
import App from './components/containers/App';

// import * as Sentry from '@sentry/react';
// import { Integrations } from '@sentry/tracing';

// Sentry.init({
//   dsn: 'https://7fdeee10ce9240fda4e2e93ca09570ff@o516693.ingest.sentry.io/5623462',
//   beforeSend(event, hint) {
//     // Check if it is an exception, and if so, show the report dialog
//     if (event.exception) {
//       Sentry.showReportDialog({ eventId: event.event_id });
//     }
//     return event;
//   },
//   integrations: [new Integrations.BrowserTracing()],
//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0,
//   release: 'educap' + process.env.npm_package_version,
// });

export const store = configureStore();
//console.log("our store",store.getState().value.toString())
class MainApp extends Component {
  state = {
    load: false,
  };

  render() {
     return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
           
          <BrowserRouter>
            <Switch>
              <Route path="/" render={(props) => <App {...props} />} />
            </Switch>
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>
    );
  }
}
// export default Sentry.withProfiler(MainApp);

export default MainApp;
