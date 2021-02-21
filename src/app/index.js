import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header/index';
import Sidebar from '../containers/SideNav/index';
import Footer from '../components/Footer';
import Administration from './routes/Administration/index';
import RegistreAppel from './routes/RegistreAppel/Registre';
import Mail from './routes/Mail/Mail';
import Devoir from './routes/Learning/index';
import Home from './routes/Home/index';
import UserProfile from './routes/UserProfile/index';
import { getUserProfile, getSchoolYear } from '../actions/Auth';
import { COLLAPSED_DRAWER, FIXED_DRAWER } from '../constants/ActionTypes';
import { isIOS, isMobile } from 'react-device-detect';
import asyncComponent from '../util/asyncComponent';
import Cafeteria from './routes/Cafeteria/index';
import HealthMonitoring from './routes/HealthMonitoring/HealthMonitoring';
import Learning from './routes/Learning/index';
import Assiduity from './routes/Assiduity/index';
import GradesMenu from './routes/GradesMenu/index';
import Can from '../can';
import { RoleContext } from '../Context';
import SupportCours from './routes/Learning/routes/CoursMaterials/SupportCours';
import VirtualClasses from './routes/Learning/index';
import Community from './routes/Community/index';
import Dashboard from './routes/Dashboard/index';
import Libraries from './routes/Libraries/index';
import FinancialManagement from './routes/FinancialManagement/routes/FinancialReporting/FinancialReporting';
import Superadmin from './routes/Superadmin/index';
import ModalEstablishmentList from './routes/Home/admin/ModalEstablishmentList';
import { getSubjectModules } from '../actions/SubjectModuleAction';
import { getSection } from '../actions/SectionsAction';
import { getLevel } from '../actions/LevelAction';
import {
  getSubjectSetting,
  getSubjectByEstablishmentAndSchoolYear,
} from '../actions/subjectAction';
import _ from 'lodash';
import { getClassSettings } from '../actions/ClassSettingsAction';
import { getSchoolSession } from '../actions/SchoolSessionAction';
import { getExamType } from '../actions/ExamTypeAction';
import { getAssignementCourse } from '../actions/AssignementAction';
import { getEstablishment } from '../actions/establishmentAction';
import { getMoocs } from '../actions/MoocsActions';
import { getClassesVirtual } from '../actions/VirtualClassAction';
import { getLevelClassSubjectData } from '../actions/MaterialCourseAction';
import { getEventsByEstabAndSchoolYearForProf } from '../actions/planningActions';
import { getUserPermissions } from '../actions/PermissionAction';
import { getGroup } from '../actions/GroupsAction';
import { getAllUsersForAdmin } from '../actions/usersAction';
import { getAgence } from '../actions/AgenceSettingsAction';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { roleIdSuperAdmin } from '../config/config';
import Evaluation from './routes/Evaluation/index';
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
                <Route component={asyncComponent(() => import('../components/Error404'))} />
              )}
            />
          )}
          no={() => <Route component={asyncComponent(() => import('../components/Error404'))} />}
        />
      )}
    </RoleContext.Consumer>
  );
};
class App extends React.Component {
  state = {
    load: false,
  };
  UNSAFE_componentWillMount() {
    const user = localStorage.getItem('user_id');
    this.props.dispatch(getUserProfile(parseInt(user)));

    if (_.isEmpty(this.props.schoolYear)) {
      this.props.dispatch(getSchoolYear());
    }
    if (localStorage.establishment_id != undefined && localStorage.school_year_id != undefined) {
      this.props.dispatch(
        getAgence(localStorage.establishment_id)
      );
      this.props.dispatch(
        getSubjectModules(localStorage.establishment_id, localStorage.school_year_id)
      );
      this.props.dispatch(
        getClassSettings(localStorage.establishment_id, localStorage.school_year_id)
      );
      this.props.dispatch(getSection(localStorage.establishment_id, localStorage.school_year_id));
      this.props.dispatch(getLevel(localStorage.establishment_id, localStorage.school_year_id));
      this.props.dispatch(
        getSubjectSetting(localStorage.establishment_id, localStorage.school_year_id)
      );
      this.props.dispatch(
        getSubjectByEstablishmentAndSchoolYear(
          localStorage.establishment_id,
          localStorage.school_year_id
        )
      );
      this.props.dispatch(
        getSchoolSession(localStorage.establishment_id, localStorage.school_year_id)
      );
      this.props.dispatch(getExamType(localStorage.establishment_id, localStorage.school_year_id));

      this.props.dispatch(
        getSchoolSession(localStorage.establishment_id, localStorage.school_year_id)
      );
      this.props.dispatch(
        getAssignementCourse(localStorage.establishment_id, localStorage.school_year_id)
      );
      this.props.dispatch(
        getEventsByEstabAndSchoolYearForProf(
          localStorage.establishment_id,
          localStorage.school_year_id,
          localStorage.profileId
        )
      );

      this.props.dispatch(getGroup(localStorage.establishment_id, localStorage.school_year_id));

      this.props.dispatch(
        getAllUsersForAdmin(localStorage.establishment_id, localStorage.school_year_id)
      );
    }

    if (
      localStorage.establishment_id != undefined &&
      localStorage.school_year_id != undefined &&
      localStorage.role_id != undefined &&
      localStorage.profileId != undefined
    ) {
      if (localStorage.role_id === roleIdSuperAdmin) {
        this.props.dispatch(getEstablishment(localStorage.school_year_id));
      }
      this.props.dispatch(getUserPermissions(localStorage.establishment_id, localStorage.role_id));

      this.props.dispatch(
        getMoocs(
          localStorage.establishment_id,
          localStorage.school_year_id,
          localStorage.role_id,
          localStorage.profileId
        )
      );
      this.props.dispatch(
        getClassesVirtual(
          localStorage.establishment_id,
          localStorage.school_year_id,
          localStorage.role_id,
          localStorage.profileId
        )
      );
      this.props.dispatch(
        getLevelClassSubjectData(
          localStorage.establishment_id,
          localStorage.school_year_id,
          localStorage.role_id,
          localStorage.profileId
        )
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userProfile !== this.props.userProfile) {
      if (localStorage.establishment_id != undefined && localStorage.school_year_id != undefined) {
        this.props.dispatch(
          getAgence(localStorage.establishment_id)
        );
        this.props.dispatch(
          getAssignementCourse(localStorage.establishment_id, localStorage.school_year_id)
        );
        this.props.dispatch(
          getSubjectSetting(localStorage.establishment_id, localStorage.school_year_id)
        );
        this.props.dispatch(getSection(localStorage.establishment_id, localStorage.school_year_id));
        this.props.dispatch(
          getClassSettings(localStorage.establishment_id, localStorage.school_year_id)
        );
        this.props.dispatch(
          getSubjectByEstablishmentAndSchoolYear(
            localStorage.establishment_id,
            localStorage.school_year_id
          )
        );
        this.props.dispatch(getLevel(localStorage.establishment_id, localStorage.school_year_id));
        this.props.dispatch(
          getSchoolSession(localStorage.establishment_id, localStorage.school_year_id)
        );
        this.props.dispatch(
          getExamType(localStorage.establishment_id, localStorage.school_year_id)
        );

        this.props.dispatch(getLevel(localStorage.establishment_id, localStorage.school_year_id));
        this.props.dispatch(
          getEventsByEstabAndSchoolYearForProf(
            localStorage.establishment_id,
            localStorage.school_year_id,
            localStorage.profileId
          )
        );

        this.props.dispatch(
          getAllUsersForAdmin(localStorage.establishment_id, localStorage.school_year_id)
        );
      }

      if (
        this.props.userProfile.establishment_id != undefined &&
        this.props.userProfile.school_year_id != undefined &&
        this.props.userProfile.role_id != undefined &&
        this.props.userProfile.id != undefined
      ) {
        this.props.dispatch(
          getUserPermissions(
            this.props.userProfile.establishment_id,
            this.props.userProfile.role_id
          )
        );

        this.props.dispatch(
          getMoocs(
            this.props.userProfile.establishment_id,
            this.props.userProfile.school_year_id,
            this.props.userProfile.role_id,
            this.props.userProfile.id
          )
        );
        this.props.dispatch(
          getClassesVirtual(
            this.props.userProfile.establishment_id,
            this.props.userProfile.school_year_id,
            this.props.userProfile.role_id,
            this.props.userProfile.id
          )
        );
        this.props.dispatch(
          getLevelClassSubjectData(
            this.props.userProfile.establishment_id,
            this.props.userProfile.school_year_id,
            this.props.userProfile.role_id,
            this.props.userProfile.id
          )
        );

        this.props.dispatch(
          getGroup(this.props.userProfile.establishment_id, this.props.userProfile.school_year_id)
        );
        if (this.props.userProfile.role_id === roleIdSuperAdmin) {
          this.props.dispatch(getEstablishment(this.props.userProfile.school_year_id));
        }
      }
    }
  }

  render() {
    const { match, drawerType, navigationStyle, horizontalNavPosition, estabModule } = this.props;

    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? 'fixed-drawer'
      : drawerType.includes(COLLAPSED_DRAWER)
      ? 'collapsible-drawer'
      : 'mini-drawer';
    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height');
    } else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height');
    }
    return (
      <div className={`app-container ${drawerStyle}`}>
        <Sidebar estabModule={this.props.estabModule} />
        <div className="app-main-container bg-white">
          {this.props.multiple ? <ModalEstablishmentList multiple={this.props.multiple} /> : null}

          <div className="app-header app-header-horizontal">
            <Header />
          </div>
          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                <Route path={`${match.url}/profile`} component={UserProfile} />
                <Route path={`${match.url}/home`} render={(props) => <Home {...props} />} />
                <Route
                  path={`${match.url}/administration`}
                  render={(props) => (
                    <Administration match={match} estabModule={estabModule} {...props} />
                  )}
                />
                <Route
                  path={`${match.url}/super_administration`}
                  render={(props) => (
                    <Superadmin match={match} estabModule={estabModule} {...props} />
                  )}
                />
                <Route
                  path={`${match.url}/gradesmenu`}
                  render={(props) => (
                    <GradesMenu match={match} estabModule={estabModule} {...props} />
                  )}
                />
                <Route
                  path={`${match.url}/financial_management`}
                  render={(props) => (
                    <FinancialManagement match={match} estabModule={estabModule} {...props} />
                  )}
                />
                {/* <Route
                  path={`${match.url}/complaints`}
                  render={() => (
                    <RouteControl
                      pathName={'complaints'}
                      estabModule={estabModule}
                      Component={Complaint}
                      match={match}
                    />
                  )}
                /> */}
                <Route
                  path={`${match.url}/call_register`}
                  render={(props) => (
                    <RouteControl
                      pathName={'call_register'}
                      estabModule={estabModule}
                      Component={RegistreAppel}
                      match={props.match}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/Cafeteria`}
                  render={() => (
                    <RouteControl
                      pathName={'cafeteria'}
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
                      pathName={'devoir'}
                      estabModule={estabModule}
                      Component={Devoir}
                      match={match}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/mail`}
                  render={() => (
                    <RouteControl
                      pathName={'mail'}
                      estabModule={estabModule}
                      Component={Mail}
                      match={match}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/e-learning`}
                  render={(props) => (
                    <Learning match={match} estabModule={estabModule} {...props} />
                  )}
                />

                <Route
                  path={`${match.url}/community`}
                  render={(props) => (
                    <Community match={match} estabModule={estabModule} {...props} />
                  )}
                />
                <Route
                  path={`${match.url}/health-monitoring`}
                  render={() => (
                    <RouteControl
                      pathName={'health-monitoring'}
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
                      pathName={'course-material'}
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
                      pathName={'virtual_classes'}
                      estabModule={estabModule}
                      Component={VirtualClasses}
                      match={match}
                    />
                  )}
                />

                <Route
                  path={`${match.url}/dashboard`}
                  render={() => (
                    <RouteControl
                      pathName={'dashboard'}
                      estabModule={estabModule}
                      Component={Dashboard}
                      match={match}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/e-libraries`}
                  render={(props) => (
                    <Libraries match={match} estabModule={estabModule} {...props} />
                  )}
                />
                <Route
                  path={`${match.url}/assiduity`}
                  render={(props) => (
                    <Assiduity match={match} estabModule={estabModule} {...props} />
                  )}
                />
                <Route
                  path={`${match.url}/evaluation`}
                  render={(props) => (
                    <Evaluation match={match} estabModule={estabModule} {...props} />
                  )}
                />

                <Route
                  path={`${match.url}/course-support`}
                  render={(props) => (
                    <SupportCours match={match} estabModule={estabModule} {...props} />
                  )}
                />
                <Route component={asyncComponent(() => import('../components/Error404'))} />
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
    userProfile,
    schoolYear,
  };
};
export default withRouter(connect(mapStateToProps)(App));
