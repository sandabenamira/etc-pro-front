import React from "react";
import asyncComponent from "../../../util/asyncComponent";
import { Redirect, Route, Switch } from "react-router-dom";
import Can from "../../../can";
import { RoleContext } from "../../../Context";
import VirtualClass from "./routes/VirtualClasses/VirtualClass";
import Moocs from "./routes/Moocs/Moocs";
import SupportCours from "./routes/CoursMaterials/SupportCours";
import Homework from "./routes/Homeworks/Homework";
import VirtualClassDetails from "./routes/VirtualClasses/VirtualClassDetails";
import MoocsDetails from "./routes/Moocs/MoocsDetails";
import SupportCoursList from "./routes/CoursMaterials/SupportCoursList"
import BooksManagement from "./routes/BooksManagement/BooksManagement";
import TextCopybook from "./routes/TextCopybook/TextCopybook"

const Learning = ({ match, estabModule }) => {
  return (
    <div className="app-wrapper">
      <Switch>
        <Redirect
          exact
          from={`${match.url}/`}
          to={`${match.url}/virtual_classes`}
        />
        <Route
          path={`${match.url}/virtual_classes`}
          render={() => (
            <RoleContext.Consumer>
              {({ role }) => (
                <Can
                  role={role}
                  perform="module-nav-access"
                  data={{
                    mod: "e-learning",
                    moduleList: estabModule,
                  }}
                  yes={() => (
                    <Can
                      role={role}
                      perform={`module-nav-virtual_classes`}
                      yes={() => <VirtualClass match={match} />}
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
          path={`${match.url}/moocs`}
          render={() => (
            <RoleContext.Consumer>
              {({ role }) => (
                <Can
                  role={role}
                  perform="module-nav-access"
                  data={{
                    mod: "e-learning",
                    moduleList: estabModule,
                  }}
                  yes={() => (
                    <Can
                      role={role}
                      perform={`module-nav-moocs`}
                      yes={() => <Moocs match={match} />}
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
          path={`${match.url}/course-material`}
          render={() => (
            <RoleContext.Consumer>
              {({ role }) => (
                <Can
                  role={role}
                  perform="module-nav-access"
                  data={{
                    mod: "e-learning",
                    moduleList: estabModule,
                  }}
                  yes={() => (
                    <Can
                      role={role}
                      perform={`module-nav-course-material`}
                      yes={() => <SupportCours match={match} />}
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
          path={`${match.url}/homeworks`}
          render={() => (
            <RoleContext.Consumer>
              {({ role }) => (
                <Can
                  role={role}
                  perform="module-nav-access"
                  data={{
                    mod: "e-learning",
                    moduleList: estabModule,
                  }}
                  yes={() => (
                    <Can
                      role={role}
                      perform={`module-nav-homeworks`}
                      yes={() => <Homework match={match} />}
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
          path={`${match.url}/book_management`}
          render={() => (
            <RoleContext.Consumer>
              {({ role }) => (
                <Can
                  role={role}
                  perform="module-nav-access"
                  data={{
                    mod: "e-learning",
                    moduleList: estabModule,
                  }}
                  yes={() => (
                    <Can
                      role={role}
                      perform={`module-nav-book_management`}
                      yes={() => <BooksManagement match={match} />}
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
          path={`${match.url}/text_copybook`}
          render={() => (
            <RoleContext.Consumer>
              {({ role }) => (
                <Can
                  role={role}
                  perform="module-nav-access"
                  data={{
                    mod: "e-learning",
                    moduleList: estabModule,
                  }}
                  yes={() => (
                    <Can
                      role={role}
                      perform={`module-nav-text_copybook`}
                      yes={() => <TextCopybook match={match} />}
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

        {
          <Route
            path="/app/e-learning/virtual_classes_details/:classId/:className"
            component={VirtualClassDetails}
          />
        }
        {
          <Route
            path="/app/e-learning/moocs_details/:moocsId/:moocsTopic"
            component={MoocsDetails}
          />
        }
         {
          <Route
            path="/app/e-learning/course_material/:levelId/:levelName/:classRoomId/:className/:subjectId/:subjectName/:idAssignement/:surnameProf/:nameProf/:idProf"
            component={SupportCoursList}
          />
        }
      </Switch>
    </div>
  );
};

export default Learning;
