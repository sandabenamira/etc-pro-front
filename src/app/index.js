import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
} from '../constants/ActionTypes'; /* eslint eqeqeq: "off" */
import Can from '../can';
import asyncComponent from '../util/asyncComponent';
import {isIOS, isMobile} from 'react-device-detect';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// -------------- import components --------------------//
import Header from '../components/Header/index';
import Sidebar from '../containers/SideNav/index';
import Footer from '../components/Footer';
import Administration from './routes/Administration/index';
import Devoir from './routes/Learning/index';
import Home from './routes/Home/index';
 import HealthMonitoring from './routes/HealthMonitoring/HealthMonitoring';
import Learning from './routes/Learning/index';
import Evaluation from './routes/Evaluation/index';
import Assiduity from './routes/Assiduity/index';
import {RoleContext} from '../Context';
import SupportCours from './routes/Learning/routes/CoursMaterials/SupportCours';
import VirtualClasses from './routes/Learning/index';
import Community from './routes/Community/index';
import Libraries from './routes/Libraries/index';
import FinancialManagement from './routes/FinancialManagement/index';
import Superadmin from './routes/Superadmin/index';
import ModalEstablishmentList from './routes/Home/DashboardAdmin/ModalEstablishmentList';
import UserProfile from './routes/UserProfile/index';

//----------------------- import actions ------------//

import {getProfile} from '../actions/Auth';
//----------------------- import actions ------------//

// import {
//   roleIdSuperAdmin,
//   roleIdProfessor,
//   roleIdAdmin,
//   roleIdParent,
//   roleIdStudent,
//   roleIdDirector,
//   roleIdSupervisor,
// } from '../config/config';

const RouteControl = ({pathName, estabModule, Component, match}) => {
  return (
    <RoleContext.Consumer>
      {({role}) => (
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
                    import('../components/Error404'),
                  )}
                />
              )}
            />
          )}
          no={() => (
            <Route
              component={asyncComponent(() => import('../components/Error404'))}
            />
          )}
        />
      )}
    </RoleContext.Consumer>
  );
};
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      load: false,
    };
  }

  UNSAFE_componentWillMount() {
    if (_.isEmpty(this.props.userProfile)) {
      this.props.dispatch(
        getProfile(
          localStorage.token,
          parseInt(localStorage.getItem('rtvrx_tgfsaju_G0loik')),
        ),
      );
    } else {
      // this.initModules(this.props.userProfile);
    }
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.userProfile !== this.props.userProfile) {
    //   let {userProfile} = this.props;
    //     this.initModules(userProfile);
    // }
  }

  render() {
    /* eslint eqeqeq: "off" */
    const {match, drawerType, estabModule} = this.props;

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
                  render={props => <Home {...props} />}
                />
                <Route
                  path={`${match.url}/administration`}
                  render={props => (
                    <Administration
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/super_administration`}
                  render={props => (
                    <Superadmin
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />

                <Route
                  path={`${match.url}/financial_management`}
                  render={props => (
                    <FinancialManagement
                      match={match}
                      estabModule={estabModule}
                      {...props}
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
                  path={`${match.url}/e-learning`}
                  render={props => (
                    <Learning
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/evaluation`}
                  render={props => (
                    <Evaluation
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />

                <Route
                  path={`${match.url}/community`}
                  render={props => (
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
                  path={`${match.url}/e-libraries`}
                  render={props => (
                    <Libraries
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/assiduity`}
                  render={props => (
                    <Assiduity
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/course-support`}
                  render={props => (
                    <SupportCours
                      match={match}
                      estabModule={estabModule}
                      {...props}
                    />
                  )}
                />
                <Route
                  component={asyncComponent(() =>
                    import('../components/Error404'),
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

const mapStateToProps = ({settings, establishment, auth, schoolYearEtab}) => {
  const {drawerType, navigationStyle, horizontalNavPosition} = settings;
  const {estabModule} = establishment;
  const {multiple, userProfile} = auth;
  const {schoolYear} = schoolYearEtab;

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
