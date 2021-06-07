import React from 'react';
import asyncComponent from '../../../util/asyncComponent';
import { Redirect, Route, Switch } from 'react-router-dom';
import Can from '../../../components/switchComponent/can';
import { RoleContext } from '../../../components/switchComponent/Context';
// import EducationalCalendar from './routes/EducationalCalendar/EducationalCalendar';
import Timetable from './routes/Timetable/TimeTable';
import Planning from './routes/Planning/Planning';
import CallRegister from './routes/CallRegister/Registre';
 
const Assiduity = ({ match, estabModule }) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/educational_calendar`} />
      {<Route path="/app/assiduity/call_register/:classId/:classeName" component={CallRegister} />}

      <Route
        path={`${match.url}/timetable`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'assiduity',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-timetable`}
                    yes={() => <Timetable match={match} />}
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
        path={`${match.url}/planning`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'assiduity',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-planning`}
                    yes={() => <Planning match={match} />}
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
        path={`${match.url}/call_register`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'assiduity',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-call_register`}
                    yes={() => <CallRegister match={match} />}
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
      {
        // <Route
        //   path="/app/assiduity/DetailsCallRegister/:type/:eventId/:classId/:profileId/:startDate"
        //   component={DetailsCallRegister}
        // />
        // <Route
        //   path="/app/assiduity/DetailsCallRegister/:type/:eventId/:classId/:profileId/:startDate"
        //   render={(props) => <DetailsCallRegister  {...props} />}
        // />
      }
    </Switch>
  </div>
);

export default Assiduity;
