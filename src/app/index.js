import React, {useEffect} from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
} from "../constants/ActionTypes"; /* eslint eqeqeq: "off" */
import asyncComponent from "../util/asyncComponent";
import { isIOS, isMobile } from "react-device-detect";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Header from "../components/Header/index";
import Sidebar from "../components/containers/SideNav/index";
import Footer from "../components/Footer";
import Administration from "./routes/Administration/index";
import Home from "./routes/Home/index";
import Learning from "./routes/Learning/index";
import UserProfile from "./routes/UserProfile/index";
import { educapProModules } from "../constants/EducapProModules";
import Raporting from "./routes/Raporting/index";
import Catalog from "./routes/Catalog/Catalog";
import SuperAdministration from "./routes/SuperAdministration";
//import { getUsersProfiles } from "../../src/store/actions/Auth";
//import { useDispatch } from "react-redux";
 import Alert from "@mui/material/Alert";

function App(props) {
  const {
    match,
    drawerType,
    showAlerteNavAgence,
    successAgence,
    alertMessageAgence,
    showAlerteNavUser,
    successUser,
    alertMessageUser,
  } = props;
  const estabModule = educapProModules;
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
  //const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getUsersProfiles());
  }, []);

  return (
    <div className={`app-container ${drawerStyle}`}>
      <Sidebar estabModule={estabModule} />
      <div className="app-main-container bg-white">
        <div className="app-header app-header-horizontal">
          <Header />
        </div>{" "}
        {showAlerteNavUser && (
          <Alert severity={successUser}>{alertMessageUser}</Alert>
        )}
        {showAlerteNavAgence && (
          <Alert severity={successAgence}>{alertMessageAgence}</Alert>
        )}
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
                path={`${match.url}/super-administration`}
                render={(props) => (
                  <SuperAdministration
                    match={match}
                    estabModule={estabModule}
                    {...props}
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
                path={`${match.url}/catalog`}
                render={(props) => (
                  <Catalog match={match} estabModule={estabModule} {...props} />
                )}
              />
              <Route
                path={`${match.url}/reporting`}
                render={(props) => (
                  <Raporting
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
const mapStateToProps = ({ settings, auth, Agence, users }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  const { multiple } = auth;
  const { showAlerteNavAgence, alertMessageAgence, successAgence } = Agence;
  const { showAlerteNavUser, alertMessageUser, successUser } = users;

  return {
    drawerType,
    navigationStyle,
    horizontalNavPosition,
    multiple,
    showAlerteNavAgence,
    alertMessageAgence,
    successAgence,
    showAlerteNavUser,
    alertMessageUser,
    successUser,
  };
};
export default withRouter(connect(mapStateToProps)(App));
