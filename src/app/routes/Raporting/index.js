import React from 'react';
import asyncComponent from '../../../util/asyncComponent';
import {Redirect, Route, Switch} from 'react-router-dom';
import Can from '../../../components/switchComponent/can';
import {RoleContext} from '../../../components/switchComponent/Context';
import RaportingFormation from './routes/RaportingFormation/RaportingFormation';
import ReportingFinancier from './routes/ReportingFinancier/ReportingFinancier';

const Raporting = ({match, estabModule}) => {
  return (
    <div className="app-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/reporting-formation`} />
        <Route
          path={`${match.url}/reporting-formation`}
          render={() => (
            <RoleContext.Consumer>
              {({role}) => (
                <Can
                  role={role}
                  perform="module-nav-access"
                  data={{
                    mod: 'reporting',
                    moduleList: estabModule,
                  }}
                  yes={() => (
                    <Can
                      role={role}
                      perform={`module-nav-reporting-formation`}
                      yes={() => <ReportingFinancier match={match} />}
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
          path={`${match.url}/reporting-financier`}
          render={() => (
            <RoleContext.Consumer>
              {({role}) => (
                <Can
                  role={role}
                  perform="module-nav-access"
                  data={{
                    mod: 'reporting',
                    moduleList: estabModule,
                  }}
                  yes={() => (
                    <Can
                      role={role}
                      perform={`module-nav-reporting-financier`}
                      yes={() => <RaportingFormation match={match} />}
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

export default Raporting;
