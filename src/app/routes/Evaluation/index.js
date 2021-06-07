import React from "react";
import asyncComponent from "../../../util/asyncComponent";
import { Redirect, Route, Switch } from "react-router-dom";
import Can from "../../../components/switchComponent/can";
import { RoleContext } from "../../../components/switchComponent/Context";
import ReportingKPI from "./routes/ReportingKPI/ReportingKPI";
import SatisfactionSurvey from "./routes/SatisfactionSurvey/SatisfactionSurvey";

const Evaluation = ({ match, estabModule }) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/evaluation`}
      />
   
    
      <Route
        path={`${match.url}/satisfaction-question`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: "evaluation",
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-satisfaction-question`}
                    yes={() => <SatisfactionSurvey match={match} />}
                    no={() => (
                      <Route
                        component={asyncComponent(() =>
                          import("../../../components/Error404")
                        )}
                      />
                    )}
                  />
                )}
                no={() => (
                  <Route
                    component={asyncComponent(() =>
                      import("../../../components/Error404")
                    )}
                  />
                )}
              />
            )}
          </RoleContext.Consumer>
        )}
      />
      <Route
        path={`${match.url}/reporting-kpi`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: "evaluation",
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-reporting-kpi`}
                    yes={() => <ReportingKPI match={match} />}
                    no={() => (
                      <Route
                        component={asyncComponent(() =>
                          import("../../../components/Error404")
                        )}
                      />
                    )}
                  />
                )}
                no={() => (
                  <Route
                    component={asyncComponent(() =>
                      import("../../../components/Error404")
                    )}
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

export default Evaluation;
