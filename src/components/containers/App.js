import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import "../../assets/vendors/style";
import greenTheme from "./themes/greenTheme";
import indigoTheme from "./themes/indigoTheme";
import cyanTheme from "./themes/cyanTheme";
import orangeTheme from "./themes/orangeTheme";
import amberTheme from "./themes/amberTheme";
import pinkTheme from "./themes/pinkTheme";
import blueTheme from "./themes/blueTheme";
import purpleTheme from "./themes/purpleTheme";
import darkTheme from "./themes/darkTheme";
import AppLocale from "../../lngProvider";
import { RoleContext } from "../switchComponent/Context";
import IntlMessages from "../../util/IntlMessages";
import _ from "lodash";

import "@material-ui/core/TextField";
import {
  AMBER,
  BLUE,
  CYAN,
  DARK_AMBER,
  DARK_BLUE,
  DARK_CYAN,
  DARK_DEEP_ORANGE,
  DARK_DEEP_PURPLE,
  DARK_GREEN,
  DARK_INDIGO,
  DARK_PINK,
  DEEP_ORANGE,
  DEEP_PURPLE,
  GREEN,
  INDIGO,
  PINK,
} from "../../constants/ThemeColors";

import MainApp from "../../app/index";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import RTL from "../../util/RTL";
import asyncComponent from "../../util/asyncComponent";
import { setInitUrl } from "../../store/actions/Auth";

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => {
  console.log("authUser", authUser);
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

class App extends Component {
  state = {
    user: {
      role: "visitor",
    },
    accessToken: "",
    contextValue: {},
    currentAppLocale: AppLocale["fr"],
  };

  componentWillMount() {
    console.log("container /app");
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    if (this.props.initURL === "") {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
  }

  componentDidUpdate(previous) {
    if (this.props.themeColor !== previous.themeColor) {
      document.body.classList.add(this.props.themeColor);
    }
  }

  getColorTheme(themeColor, applyTheme) {
    switch (themeColor) {
      case INDIGO: {
        applyTheme = createMuiTheme(indigoTheme);
        break;
      }
      case CYAN: {
        applyTheme = createMuiTheme(cyanTheme);
        break;
      }
      case AMBER: {
        applyTheme = createMuiTheme(amberTheme);
        break;
      }
      case DEEP_ORANGE: {
        applyTheme = createMuiTheme(orangeTheme);
        break;
      }
      case PINK: {
        applyTheme = createMuiTheme(pinkTheme);
        break;
      }
      case BLUE: {
        applyTheme = createMuiTheme(blueTheme);
        break;
      }
      case DEEP_PURPLE: {
        applyTheme = createMuiTheme(purpleTheme);
        break;
      }
      case GREEN: {
        applyTheme = createMuiTheme(greenTheme);
        break;
      }
      case DARK_INDIGO: {
        applyTheme = createMuiTheme(indigoTheme);
        break;
      }
      case DARK_CYAN: {
        applyTheme = createMuiTheme(cyanTheme);
        break;
      }
      case DARK_AMBER: {
        applyTheme = createMuiTheme(amberTheme);
        break;
      }
      case DARK_DEEP_ORANGE: {
        applyTheme = createMuiTheme(orangeTheme);
        break;
      }
      case DARK_PINK: {
        applyTheme = createMuiTheme(pinkTheme);
        break;
      }
      case DARK_BLUE: {
        applyTheme = createMuiTheme(blueTheme);
        break;
      }
      case DARK_DEEP_PURPLE: {
        applyTheme = createMuiTheme(purpleTheme);
        break;
      }
      case DARK_GREEN: {
        applyTheme = createMuiTheme(greenTheme);
        break;
      }
      default:
        createMuiTheme(indigoTheme);
    }
    return applyTheme;
  }

  render() {
    /* eslint eqeqeq: "off" */

    const { match, location, authUser, initURL, isDarkTheme, themeColor } =
      this.props;

    let applyTheme = createMuiTheme(indigoTheme);
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
      applyTheme = createMuiTheme(darkTheme);
    } else {
      applyTheme = this.getColorTheme(themeColor, applyTheme);
    }

    if (location.pathname === "/") {
      if (authUser === null) {
        return <Redirect to={"/signin"} />;
      } else if (initURL === "" || initURL === "/" || initURL === "/signin") {
        return <Redirect to={"/app/home"} />;
      } else {
        return <Redirect to={initURL} />;
      }
    }

    return (
      <RoleContext.Provider value={this.state.contextValue}>
        <MuiThemeProvider theme={applyTheme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <IntlProvider
              locale={this.state.currentAppLocale.locale}
              messages={this.state.currentAppLocale.messages}
            >
              <RTL>
                <div className="app-main">
                  <Switch>
                    <RestrictedRoute
                      path={`${match.url}app`}
                      authUser={authUser}
                      component={MainApp}
                      themeColor={themeColor}
                    />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route
                      component={asyncComponent(() => import("../Error404"))}
                    />
                  </Switch>
                </div>
              </RTL>
            </IntlProvider>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </RoleContext.Provider>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { themeColor, sideNavColor, darkTheme, locale, isDirectionRTL } =
    settings;
  const { authUser, initURL } = auth;

  return {
    themeColor,
    sideNavColor,
    isDarkTheme: darkTheme,
    locale,
    isDirectionRTL,
    authUser,
    initURL,
  };
};

function getLanguage(appLang) {
  switch (appLang) {
    case "french":
      return {
        languageId: "french",
        locale: "fr",
        name: <IntlMessages id="languageData.french" />,
        icon: "fr",
      };
    case "english":
      return {
        languageId: "english",
        locale: "en",
        name: <IntlMessages id="languageData.english" />,
        icon: "us",
      };
    case "tunisia":
      return {
        languageId: "tunisia",
        locale: "ar",
        name: <IntlMessages id="languageData.arabic" />,
        icon: "tn",
      };
    default:
      return {
        languageId: "french",
        locale: "fr",
        name: <IntlMessages id="languageData.french" />,
        icon: "fr",
      };
  }
}
export default connect(mapStateToProps, {
  setInitUrl,
  // getEstablishmentsModules,
  // getEstablishmentsInformations,
})(App);
