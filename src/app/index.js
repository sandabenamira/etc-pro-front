import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../components/Header/index";
import Sidebar from "../containers/SideNav/index";
import Footer from "../components/Footer";
import Administration from "./routes/Administration/index";
import Devoir from "./routes/Learning/index";
import Home from "./routes/Home/index";
import UserProfile from "./routes/UserProfile/index";
import { getSchoolYear, getProfile } from "../actions/Auth";
import { COLLAPSED_DRAWER, FIXED_DRAWER } from "../constants/ActionTypes";
import { isIOS, isMobile } from "react-device-detect";
import asyncComponent from "../util/asyncComponent";
import Cafeteria from "./routes/Cafeteria/index";
import HealthMonitoring from "./routes/HealthMonitoring/HealthMonitoring";
import Learning from "./routes/Learning/index";
import Assiduity from "./routes/Assiduity/index";
import GradesMenu from "./routes/GradesMenu/index";
import Can from "../can";
import { RoleContext } from "../Context";
import SupportCours from "./routes/Learning/routes/CoursMaterials/SupportCours";
import VirtualClasses from "./routes/Learning/index";
import Community from "./routes/Community/index";
import Libraries from "./routes/Libraries/index";
import FinancialManagement from "./routes/FinancialManagement/index";
import Superadmin from "./routes/Superadmin/index";
import ModalEstablishmentList from "./routes/Home/admin/ModalEstablishmentList";
import { getSubjectModules } from "../actions/SubjectModuleAction";
import { getSection } from "../actions/SectionsAction";
import { getLevel } from "../actions/LevelAction";
import { getSubjectSetting } from "../actions/subjectAction";
import _ from "lodash";
import { getClassSettings } from "../actions/ClassSettingsAction";
import { getSchoolSession } from "../actions/SchoolSessionAction";
import { getExamType } from "../actions/ExamTypeAction";
import { getAssignementCourse } from "../actions/AssignementAction";
import { getEstablishment } from "../actions/establishmentAction";
import { getMoocs } from "../actions/MoocsActions";
import { getClassesVirtual } from "../actions/VirtualClassAction";
import { getLevelClassSubjectData } from "../actions/MaterialCourseAction";
import { getEventsByEstabAndSchoolYearForProf } from "../actions/planningActions";
import { getUserPermissions } from "../actions/PermissionAction";
import { getAllUsersForAdmin } from "../actions/usersAction";
import { getHomework } from "../actions/HomeworkAction";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  roleIdSuperAdmin,
  roleIdProfessor,
  roleIdAdmin,
  roleIdParent,
  roleIdStudent,
  roleIdDirector,
} from "../config/config";

const RouteControl = ({ pathName, estabModule, Component, match }) => {
  return (
    <RoleContext.Consumer>
      {({ role }) => (
        <Can
          role={role}
          perform={`module-nav-${pathName}`}
          yes={() => (
            <Can
              role={role}
              perform="module-nav-access"
              data={{
                mod: pathName,
                moduleList: estabModule,
              }}
              yes={() => <Component match={match} />}
              no={() => (
                <Route
                  component={asyncComponent(() =>
                    import("../components/Error404")
                  )}
                />
              )}
            />
          )}
          no={() => (
            <Route
              component={asyncComponent(() => import("../components/Error404"))}
            />
          )}
        />
      )}
    </RoleContext.Consumer>
  );
};
class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      load: false,
    }
    this.initModules = this.initModules.bind(this);

  }
  initModules(userProfile){
    console.log("userProfile",userProfile)
    console.log("initModules")

    this.props.dispatch(
      getUserPermissions(userProfile.establishment_id, userProfile.role_id)
    );
    this.props.dispatch(
      getAssignementCourse(
        userProfile.establishment_id,
        userProfile.school_year_id
      )
    );
    this.props.dispatch(
      getMoocs(
        userProfile.establishment_id,
        userProfile.school_year_id,
        userProfile.role_id,
        userProfile.id
      )
    );
    this.props.dispatch(
      getClassesVirtual(
        userProfile.establishment_id,
        userProfile.school_year_id,
        userProfile.role_id,
        userProfile.id
      )
    );
    this.props.dispatch(
      getLevelClassSubjectData(
        userProfile.establishment_id,
        userProfile.school_year_id,
        userProfile.role_id,
        userProfile.id
      )
    );

    this.props.dispatch(
      getHomework(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id,
        this.props.userProfile.id,
        this.props.userProfile.role_id
      )
    );
    switch (userProfile.role_id) {
      case roleIdSuperAdmin:
        this.props.dispatch(getEstablishment(userProfile.school_year_id));
        break;
      case roleIdAdmin:
      case roleIdDirector:
        this.props.dispatch(
          getSubjectModules(
            userProfile.establishment_id,
            userProfile.school_year_id
          )
        );
        this.props.dispatch(
          getClassSettings(
            userProfile.establishment_id,
            userProfile.school_year_id
          )
        );
        this.props.dispatch(
          getSection(
            userProfile.establishment_id,
            userProfile.school_year_id
          )
        );
        this.props.dispatch(
          getLevel(userProfile.establishment_id, userProfile.school_year_id)
        );
        this.props.dispatch(
          getSubjectSetting(
            userProfile.establishment_id,
            userProfile.school_year_id
          )
        );

        this.props.dispatch(
          getSchoolSession(
            userProfile.establishment_id,
            userProfile.school_year_id
          )
        );

        this.props.dispatch(
          getAllUsersForAdmin(
            userProfile.establishment_id,
            userProfile.school_year_id
          )
        );
      this.props.dispatch(
        getExamType(
          userProfile.establishment_id,
          userProfile.school_year_id
        )
      );
        break;
      case roleIdProfessor:
        this.props.dispatch(
          getEventsByEstabAndSchoolYearForProf(
            userProfile.establishment_id,
            userProfile.school_year_id,
            userProfile.id
          )
        );
        break;
      case roleIdStudent:
      case roleIdParent:
        break;
      default:
        break;
    }
  }

  UNSAFE_componentWillMount() {

    if (_.isEmpty(this.props.userProfile)) {
      this.props.dispatch(
        getProfile(
          localStorage.token,
          parseInt(localStorage.getItem("rtvrx_tgfsaju_G0loik"))
        )
      );
    }else{
      this.initModules(this.props.userProfile);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userProfile !== this.props.userProfile) {
      let { userProfile } = this.props;
      this.initModules(userProfile);
    }
  }

  render() {
    const { match, drawerType, estabModule } = this.props;

    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "fixed-drawer"
      : drawerType.includes(COLLAPSED_DRAWER)
      ? "collapsible-drawer"
      : "mini-drawer";
    if (isIOS && isMobile) {
      document.body.classList.add("ios-mobile-view-height");
    } else if (document.body.classList.contains("ios-mobile-view-height")) {
      document.body.classList.remove("ios-mobile-view-height");
    }
    return (
      <div className={`app-container ${drawerStyle}`}>
        <Sidebar estabModule={this.props.estabModule} />
        <div className="app-main-container bg-white">
          {this.props.multiple ? (
            <ModalEstablishmentList multiple={this.props.multiple} />
          ) : null}

          <div className="app-header app-header-horizontal">
            <Header />
          </div>
          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                <Route path={`${match.url}/profile`} component={UserProfile} />
                <Route
                  path={`${match.url}/home`}
                  render={(props) => <Home {...props} />}
                />
                <Route
                  path={`${match.url}/administration`}
                  render={(props) => (
                    <Administration
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/super_administration`}
                  render={(props) => (
                    <Superadmin
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/gradesmenu`}
                  render={(props) => (
                    <GradesMenu
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/financial_management`}
                  render={(props) => (
                    <FinancialManagement
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />

                <Route
                  path={`${match.url}/Cafeteria`}
                  render={() => (
                    <RouteControl
                      pathName={"cafeteria"}
                      estabModule={estabModule}
                      Component={Cafeteria}
                      match={match}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/devoir`}
                  render={() => (
                    <RouteControl
                      pathName={"devoir"}
                      estabModule={estabModule}
                      Component={Devoir}
                      match={match}
                    />
                  )}
                />

                <Route
                  path={`${match.url}/e-learning`}
                  render={(props) => (
                    <Learning
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />

                <Route
                  path={`${match.url}/community`}
                  render={(props) => (
                    <Community
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/health-monitoring`}
                  render={() => (
                    <RouteControl
                      pathName={"health-monitoring"}
                      estabModule={estabModule}
                      Component={HealthMonitoring}
                      match={match}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/course-material`}
                  render={() => (
                    <RouteControl
                      pathName={"course-material"}
                      estabModule={estabModule}
                      Component={SupportCours}
                      match={match}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/virtual_classes`}
                  render={() => (
                    <RouteControl
                      pathName={"virtual_classes"}
                      estabModule={estabModule}
                      Component={VirtualClasses}
                      match={match}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/e-libraries`}
                  render={(props) => (
                    <Libraries
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/assiduity`}
                  render={(props) => (
                    <Assiduity
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/course-support`}
                  render={(props) => (
                    <SupportCours
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />
                <Route
                  component={asyncComponent(() =>
                    import("../components/Error404")
                  )}
                />
              </Switch>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    );
  }
}



const mapStateToProps = ({ settings, establishment, auth, schoolYearEtab }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  const { estabModule } = establishment;
  const { multiple, userProfile } = auth;
  const { schoolYear } = schoolYearEtab;

  return {
    drawerType,
    navigationStyle,
    horizontalNavPosition,
    estabModule,
    multiple,
    schoolYear,
    userProfile,
  };
};
export default withRouter(connect(mapStateToProps)(App));
