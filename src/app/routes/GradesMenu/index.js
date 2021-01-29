
import React from 'react';
import asyncComponent from '../../../util/asyncComponent';
import { Redirect, Route, Switch } from 'react-router-dom';
import Can from '../../../can';
import { RoleContext } from "../../../Context";
import Grades from "./routes/Grade/Grades";
import Exams from "./routes/Exams/Exams";
import Report from "./routes/Report";

const GradesMenu = ({ match, estabModule }) => (

  <div className="app-wrapper" >
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/grades`} />
      <Route path={`${match.url}/grades`} render={() =>
        <RoleContext.Consumer>
          {({ role }) => (
            < Can
              role={role}
              perform="module-nav-access"
              data={{
                mod: 'menuGrade',
                moduleList: estabModule
              }}
              yes={() => (
                < Can
                  role={role}
                  perform={`module-nav-grades`}
                  yes={() => (
                    <Grades />
                  )}
                  no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}

                />
              )}
              no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}
            />
          )}
        </RoleContext.Consumer>
      } />
      <Route path={`${match.url}/exams`} render={() =>
        <RoleContext.Consumer>
          {({ role }) => (
            < Can
              role={role}
              perform="module-nav-access"
              data={{
                mod: 'menuGrade',
                moduleList: estabModule
              }}
              yes={() => (
                < Can
                  role={role}
                  perform={`module-nav-exams`}
                  yes={() => (
                    <Exams match={match} />
                  )}
                  no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}

                />
              )}
              no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}
            />
          )}
        </RoleContext.Consumer>
      } />
      <Route path={`${match.url}/report`} render={() =>
        <RoleContext.Consumer>
          {({ role }) => (
            < Can
              role={role}
              perform="module-nav-access"
              data={{
                mod: 'menuGrade',
                moduleList: estabModule
              }}
              yes={() => (
                < Can
                  role={role}
                  perform={`module-nav-report`}
                  yes={() => (
                    <Report />
                  )}
                  no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}

                />
              )}
              no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}
            />
          )}
        </RoleContext.Consumer>
      } />
    </Switch>
  </div>
);

export default GradesMenu;

