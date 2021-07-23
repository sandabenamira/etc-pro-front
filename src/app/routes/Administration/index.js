import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";
import UsersManagement from "./routes/UsersManagement/Users";
import Can from "../../../components/switchComponent/can";
import { RoleContext } from "../../../components/switchComponent/Context";
import PermissionSetting from "./routes/PermissionSetting/PermissionSetting";
import AgenceSetting from "./routes/AgenceSetting/AgenceSetting";
const Administration = ({ match, estabModule }) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/establishment`}
      />

      <Route
        path={`${match.url}/user-management`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: "administration",
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-user-management`}
                    yes={() => <UsersManagement match={match} />}
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
        path={`${match.url}/permissions-settings`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: "administration",
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-permissions-settings`}
                    yes={() => <PermissionSetting match={match} />}
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
        path={`${match.url}/agency-management`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: "administration",
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-agency-management`}
                    yes={() => <AgenceSetting match={match} />}
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
export default Administration;
