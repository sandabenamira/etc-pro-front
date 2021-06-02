import React from 'react';
import asyncComponent from '../../../util/asyncComponent';
import { Redirect, Route, Switch } from 'react-router-dom';
import Can from '../../../components/switchComponent/can';
import { RoleContext } from '../../../components/switchComponent/Context';
import Billing from './routes/Billing/Billing';
import Payment from './routes/Payment/Payments';
import ServiceAllocation from './routes/ServiceAllocation/ServiceAllocation';
import Service from './routes/Service/Service';

const FinancialManagement = ({ match, estabModule }) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/service`} />
      <Route
        path={`${match.url}/service`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'financial_management',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-service`}
                    yes={() => <Service match={match} />}
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
        path={`${match.url}/service-allocation`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'financial_management',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-service-allocation`}
                    yes={() => <ServiceAllocation match={match} />}
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
        path={`${match.url}/billing`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'financial_management',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-billing`}
                    yes={() => <Billing match={match} />}
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
        path={`${match.url}/payment`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'financial_management',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-payment`}
                    yes={() => <Payment match={match} />}
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

export default FinancialManagement;
