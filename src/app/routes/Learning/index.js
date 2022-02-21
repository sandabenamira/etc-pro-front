import React from 'react';
import asyncComponent from '../../../util/asyncComponent';
import {Redirect, Route, Switch} from 'react-router-dom';
import Can from '../../../components/switchComponent/can';
import {RoleContext} from '../../../components/switchComponent/Context';
import OnlineTraining from './routes/OnlineTraining/OnlineTraining';
import Moocs from './routes/Moocs/Moocs';
import TrainingMaterials from './routes/TrainingMaterials/TrainingMaterials';

const Learning = ({match, estabModule}) => {
  return (
    <div className="app-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/online-training`} />
        <Route
          path={`${match.url}/online-training`}
          render={() => (
            <RoleContext.Consumer>
              {({role}) => (
                <Can
                  role={role}
                  perform="module-nav-access"
                  data={{
                    mod: 'e-learning',
                    moduleList: estabModule,
                  }}
                  yes={() => (
                    <Can
                      role={role}
                      perform={`module-nav-online-training`}
                      yes={() => <OnlineTraining match={match} />}
                      no={() => (
                        <Route
                          component={asyncComponent(() => import('../../../components/Error404'))}
                        />
                      )}
                    />
                  )}
                  no={() => (
                    <Route
                      component={asyncComponent(() => import('../../../components/Error404'))}
                    />
                  )}
                />
              )}
            </RoleContext.Consumer>
          )}
        />
        <Route
          path={`${match.url}/moocs`}
          render={() => (
            <RoleContext.Consumer>
              {({role}) => (
                <Can
                  role={role}
                  perform="module-nav-access"
                  data={{
                    mod: 'e-learning',
                    moduleList: estabModule,
                  }}
                  yes={() => (
                    <Can
                      role={role}
                      perform={`module-nav-moocs`}
                      yes={() => <Moocs match={match} />}
                      no={() => (
                        <Route
                          component={asyncComponent(() => import('../../../components/Error404'))}
                        />
                      )}
                    />
                  )}
                  no={() => (
                    <Route
                      component={asyncComponent(() => import('../../../components/Error404'))}
                    />
                  )}
                />
              )}
            </RoleContext.Consumer>
          )}
        />
        <Route
          path={`${match.url}/training-materials`}
          render={() => (
            <RoleContext.Consumer>
              {({role}) => (
                <Can
                  role={role}
                  perform="module-nav-access"
                  data={{
                    mod: 'e-learning',
                    moduleList: estabModule,
                  }}
                  yes={() => (
                    <Can
                      role={role}
                      perform={`module-nav-training-materials`}
                      yes={() => <TrainingMaterials match={match} />}
                      no={() => (
                        <Route
                          component={asyncComponent(() => import('../../../components/Error404'))}
                        />
                      )}
                    />
                  )}
                  no={() => (
                    <Route
                      component={asyncComponent(() => import('../../../components/Error404'))}
                    />
                  )}
                />
              )}
            </RoleContext.Consumer>
          )}
        />
      </Switch>
    </div>
  );
};

export default Learning;
