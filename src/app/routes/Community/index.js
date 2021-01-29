import React from 'react';
import asyncComponent from '../../../util/asyncComponent';
import { Redirect, Route, Switch } from 'react-router-dom';
import Can from '../../../can';
import { RoleContext } from '../../../Context';
import Complaint from './routes/Complaint/Complaint';
import Mail from './routes/InternalMail/Mail';

const Community = ({ match, estabModule }) => (
  <div className="app-wrapper">
    <Switch>
      <Route
        path={`${match.url}/complaints`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'community',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-complaints`}
                    yes={() => <Complaint match={match} />}
                    no={() => (
                      <Route
                        component={asyncComponent(() => import('../../../components/Error404'))}
                      />
                    )}
                  />
                )}
                no={() => (
                  <Route component={asyncComponent(() => import('../../../components/Error404'))} />
                )}
              />
            )}
          </RoleContext.Consumer>
        )}
      />
      <Route
        path={`${match.url}/internal_mail`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'community',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-internal_mail`}
                    yes={() => <Mail match={match} />}
                    no={() => (
                      <Route
                        component={asyncComponent(() => import('../../../components/Error404'))}
                      />
                    )}
                  />
                )}
                no={() => (
                  <Route component={asyncComponent(() => import('../../../components/Error404'))} />
                )}
              />
            )}
          </RoleContext.Consumer>
        )}
      />
    </Switch>
  </div>
);

export default Community;
