import React from "react";
import {
  //Redirect,
  Route,
  Switch,
} from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";
import Can from "../../../components/switchComponent/can";
import { RoleContext } from "../../../components/switchComponent/Context";
import Inscription from "./routes/InscriptionManagement/Inscription";
import Entreprise from "./routes/EntrepriseMangement/Entreprise";
const SuperAdministration = ({ match, estabModule }) => (
  <div className="app-wrapper">
    <Switch>
      {/* <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/establishment`}
      /> */}

      <Route
        path={`${match.url}/inscription`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: "super-administration",
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-inscription`}
                    yes={() => <Inscription match={match} />}
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
        path={`${match.url}/entreprise`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: "super-administration",
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={"module-nav-entreprise"}
                    yes={() => <Entreprise match={match} />}
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
        component={asyncComponent(() => import("../../../components/Error404"))}
      />
    </Switch>
  </div>
);
export default SuperAdministration;
