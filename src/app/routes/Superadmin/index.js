import React from "react";
import asyncComponent from "../../../util/asyncComponent";
import { Redirect, Route, Switch } from "react-router-dom";
import Can from "../../../components/switchComponent/can";
import { RoleContext } from "../../../components/switchComponent/Context";
import SchoolLicence from "./SchoolLicence/SchoolLicence";
import Reclamations from "./Reclamations/Reclamations";
import FinancialManagement from "./financialManagement/FinancialManagement";
import EstablishmentManagement from "./EstablishmentManagement/EstablishmentManagement";
 
const Superadmin = ({ match, estabModule }) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/schoolLicence`}
      />
      <Route
        path={`${match.url}/schoolLicence`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: "super_administration",
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-schoolLicence`}
                    yes={() => <SchoolLicence match={match} />}
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
        path={`${match.url}/establishment_management`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: "super_administration",
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-establishment_management`}
                    yes={() => <EstablishmentManagement match={match} />}
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
        path={`${match.url}/reclamations`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: "super_administration",
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-reclamations`}
                    yes={() => <Reclamations match={match} />}
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
        path={`${match.url}/financial_management_superadmin`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: "super_administration",
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-financial_management_superadmin`}
                    yes={() => <FinancialManagement match={match} />}
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

export default Superadmin;
