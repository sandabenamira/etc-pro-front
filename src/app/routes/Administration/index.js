import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";
import UsersManagement from "./routes/UsersManagement/Users";
import Rooms from "./routes/Room/Rooms";
import Can from "../../../can";
import Establishments from "./routes/Establishment/Establishments";
import { RoleContext } from "../../../Context";
import Option from "./routes/Option/option";
import SchoolYearEtab from "./routes/SchoolYear/SchoolYearEtab";
import SchoolSettings from "./routes/SchoolSetting/SchoolSettings";
import TypeOfEducation from "./routes/SchoolSettings/TypeOfEducation/TypeOfEducation";
import Levels from "./routes/SchoolSettings/levels/Levels";
import Sections from "./routes/SchoolSettings/Sections/Sections";
import SchoolSession from './routes/SchoolSettings/SchoolSession/SchoolSession'
import SubjectModule from './routes/SchoolSettings/SubjectModule/SubjectModule'
import SubjectsSettings from './routes/SchoolSettings/SubjectsSettings/SubjectsSettings'
import ClassesSettings from './routes/SchoolSettings/ClassesSettings/ClassesSettings'
import CourseAssignment from './routes/SchoolSettings/CourseAssignment/CourseAssignment'
import ExamsTypes from './routes/SchoolSettings/ExamsTypes/ExamsTypes'
import CallRegisterSetting from './routes/CallRegisterSetting/CallRegisterSetting'
import PermissionSetting from './routes/PermissionSetting/PermissionSetting';
import Groupes  from './routes/SchoolSettings/groupes/Groupes'
const Administration = ({ match, estabModule }) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/establishment`} />
      <Route
        path={`${match.url}/rooms`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-rooms`}
                    yes={() => <Rooms match={match} />}
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
        path={`${match.url}/usersManagement`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-usersManagement`}
                    yes={() => <UsersManagement match={match} />}
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
        path={`${match.url}/options`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-options`}
                    yes={() => <Option match={match} />}
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
        path={`${match.url}/schoolYears`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-schoolYears`}
                    yes={() => <SchoolYearEtab match={match} />}
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
        path={`${match.url}/schoolSettings`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-schoolSettings`}
                    yes={() => <SchoolSettings match={match} />}
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
        path={`${match.url}/typeOfEducation`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-typeOfEducation`}
                    yes={() => <TypeOfEducation match={match} />}
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
        path={`${match.url}/levels`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-levels`}
                    yes={() => <Levels match={match} />}
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
        path={`${match.url}/sections`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-sections`}
                    yes={() => <Sections match={match} />}
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
        path={`${match.url}/groupes`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-groupes`}
                    yes={() => <Groupes match={match} />}
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
        path={`${match.url}/schoolsession`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-schoolSession`}
                    yes={() => <SchoolSession match={match} />}
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
        path={`${match.url}/subjectModule`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-subjectModule`}
                    yes={() => <SubjectModule match={match} />}
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
        path={`${match.url}/subjectsSettings`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-subjectsSettings`}
                    yes={() => <SubjectsSettings match={match} />}
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
        path={`${match.url}/classesSettings`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-classesSettings`}
                    yes={() => <ClassesSettings match={match} />}
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
        path={`${match.url}/sections`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-sections`}
                    yes={() => <ClassesSettings match={match} />}
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
        path={`${match.url}/groupes`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-groupes`}
                    yes={() => <Groupes match={match} />}
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
        path={`${match.url}/courseAssignment`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-courseAssignment`}
                    yes={() => <CourseAssignment match={match} />}
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
        path={`${match.url}/examTypes`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-examTypes`}
                    yes={() => <ExamsTypes match={match} />}
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
        path={`${match.url}/callRegisterSetting`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-callRegisterSetting`}
                    yes={() => <CallRegisterSetting match={match} />}
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
        path={`${match.url}/permissionSetting`}
        render={() => (
          <RoleContext.Consumer>
            {({ role }) => (
              <Can
                role={role}
                perform="module-nav-access"
                data={{
                  mod: 'administration',
                  moduleList: estabModule,
                }}
                yes={() => (
                  <Can
                    role={role}
                    perform={`module-nav-permissionSetting`}
                    yes={() => <PermissionSetting match={match} />}
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

      <Route component={asyncComponent(() => import('../../../components/Error404'))} />
    </Switch>
  </div>
);
export default Administration;
