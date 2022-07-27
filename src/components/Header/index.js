import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { userSignOut } from "../../store/actions/Auth";
import ColorOption from "../containers/Customizer/ColorOption";
import imageStudent from "../../assets/images/supAdmin.png";
import {
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from "../../constants/ActionTypes";
import SearchBox from "../../components/SearchBox";
import {
  switchLanguage,
  toggleCollapsedNav,
} from "../../store/actions/Setting";
import IntlMessages from "../../util/IntlMessages";
import LanguageSwitcher from "../../components/LanguageSwitcher/index";
import Menu from "@material-ui/core/Menu";
import MenuHeader from "../../components/TopNav/Menu";
import AppNotification from "../AppNotification";
import CardHeader from "../CardHeader/index";
import Typography from "@material-ui/core/Typography";
import {
  educapProModules
} from "../../constants/EducapProModules";

/* eslint eqeqeq: "off" */

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      openProfile: false,
      anchorElProfile: undefined,
      colorOption: false,
      uri: "",
      anchorEl: undefined,
      searchBox: false,
      searchText: "",
      mailNotification: false,
      userInfo: false,
      langSwitcher: false,
      appNotification: false,
    };
  }
  activePanel = () => {
    this.setState({ colorOption: true });
    this.setState({ openProfile: false });
  };

  handleClick = (event) => {
    this.setState({ openProfile: true, anchorElProfile: event.currentTarget });
  };

  handleRequestCloseMenuProfile = () => {
    this.setState({
      openProfile: false,
      anchorElProfile: undefined,
    });
  };

  handleCancelPanel() {
    this.setState({ colorOption: false });
  }

  onAppNotificationSelect = () => {
    this.setState({
      appNotification: !this.state.appNotification,
    });
  };
  onMailNotificationSelect = () => {
    this.setState({
      mailNotification: !this.state.mailNotification,
    });
  };
  onLangSwitcherSelect = (event) => {
    this.setState({
      langSwitcher: !this.state.langSwitcher,
      anchorEl: event.currentTarget,
    });
  };
  onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox,
    });
  };
  onAppsSelect = () => {
    this.setState({
      apps: !this.state.apps,
    });
  };
  onUserInfoSelect = () => {
    this.setState({
      userInfo: !this.state.userInfo,
    });
  };
  handleRequestClose = () => {
    this.setState({
      langSwitcher: false,
      userInfo: false,
      mailNotification: false,
      appNotification: false,
      searchBox: false,
      apps: false,
    });
  };
  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  updateSearchText(evt) {
    this.setState({
      searchText: evt.target.value,
    });
  }

  render() {
    const { drawerType, locale, navigationStyle,entreprise } = this.props;
     const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "d-block d-xl-none"
      : drawerType.includes(COLLAPSED_DRAWER)
      ? "d-block"
      : "d-none";

    return (
      <AppBar className="app-main-header jr-border-radius" position="relative">
       
        <Toolbar>
          {navigationStyle === HORIZONTAL_NAVIGATION ? (
            <div
              className="d-block d-md-none pointer mr-3"
              onClick={this.onToggleCollapsedNav}
            >
              <span className="jr-menu-icon">
                <span className="menu-icon" />
              </span>
            </div>
          ) : (
            <IconButton
              className={`jr-menu-icon mr-3 ${drawerStyle}`}
              aria-label="Menu"
              onClick={this.onToggleCollapsedNav}
            >
              <span className="menu-icon" />
            </IconButton>
          )}
          <h4 className="mb-0 mr-auto text-white">
            {entreprise+
                '   ' +
                '(' +
                ' ' +
                "2022" +
                ' ' +
                ')'}
          </h4>

          <MenuHeader estabModule={educapProModules} />

          <SearchBox styleName="d-none d-sm-block" />

          <div className="d-inline-block d-sm-none list-inline-item">
            <Dropdown
              className="quick-menu nav-searchbox"
              isOpen={this.state.searchBox}
              toggle={this.onSearchBoxSelect.bind(this)}
            >
              <DropdownToggle
                className="d-inline-block"
                tag="span"
                data-toggle="dropdown"
              >
                <IconButton className="icon-btn size-30">
                  <i className="zmdi zmdi-search zmdi-hc-fw" />
                </IconButton>
              </DropdownToggle>

              <DropdownMenu right className="p-0">
                <SearchBox
                  styleName="search-dropdown"
                  placeholder=""
                  onChange={this.updateSearchText.bind(this)}
                  value={this.state.searchText}
                />
              </DropdownMenu>
            </Dropdown>
          </div>

          <ul className="header-notifications list-inline ml-3 d-none d-sm-block">
            <li className="list-inline-item app-tour">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.appNotification}
                toggle={this.onAppNotificationSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <IconButton className="icon-btn">
                    <i className="zmdi zmdi-notifications-none icon-alert animated infinite wobble" />
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu style={{ width: "450px" }} right>
                  <CardHeader
                    styleName="align-items-center"
                    heading={
                      <Typography
                        variant="h6"
                        style={{
                          color: "#7e7e7f",
                          fontWeight: "bold",
                          fontFamily: "Roboto",
                          fontSize: "20px",
                          marginTop: "10px",
                          marginLeft: "3%",
                        }}
                      >
                        <IntlMessages id="appNotification.title" />
                      </Typography>
                    }
                  />
                  <AppNotification />
                </DropdownMenu>
              </Dropdown>
            </li>
            <li className="list-inline-item">
              <i className="zmdi zmdi-comment-alt-text zmdi-hc-lg zmdi-hc-fw" />
            </li>

            <li className="list-inline-item">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.langSwitcher}
                toggle={this.onLangSwitcherSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <IconButton className="icon-btn ">
                    {locale.languageId === "tunisia" ? (
                      <i className="tn flag"></i>
                    ) : locale.languageId === "english" ? (
                      <i className="us flag"></i>
                    ) : (
                      <i className="fr flag"></i>
                    )}
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu right className="w-50">
                  <LanguageSwitcher
                    switchLanguage={this.props.switchLanguage}
                    handleRequestClose={this.handleRequestClose}
                  />
                </DropdownMenu>
              </Dropdown>
            </li>

            {navigationStyle === HORIZONTAL_NAVIGATION && (
              <li className="list-inline-item user-nav">
                <Dropdown
                  className="quick-menu"
                  isOpen={this.state.userInfo}
                  toggle={this.onUserInfoSelect.bind(this)}
                >
                  <DropdownToggle
                    className="d-inline-block"
                    tag="span"
                    data-toggle="dropdown"
                  >
                    <IconButton className="icon-btn size-30"></IconButton>
                  </DropdownToggle>
                </Dropdown>
              </li>
            )}
          </ul>
          <div
            className="user-detail"
            onBlur={this.handleRequestCloseMenuProfile}
          >
            <Avatar
              alt="..."
              src={imageStudent}
              className="ml-2 ml-lg-4 d-none d-sm-block"
              onClick={this.handleClick}
            />

         

            <Menu
              className=""
              id="simple-menu"
              anchorEl={this.state.anchorElProfile}
              open={this.state.openProfile}
              onClose={this.handleRequestCloseMenuProfile}
              PaperProps={{
                style: {
                  minWidth: 120,
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              }}
            >
              <NavLink to="/app/profile">
                <MenuItem onClick={this.handleRequestCloseMenuProfile}>
                  <i className="zmdi zmdi-account zmdi-hc-fw mr-2" />
                  <IntlMessages id="popup.profile" />
                </MenuItem>
              </NavLink>
              <MenuItem onClick={this.activePanel.bind(this)}>
                <i className="zmdi zmdi-settings zmdi-hc-fw mr-2" />
                <IntlMessages id="popup.setting" />
              </MenuItem>

              <MenuItem
                onClick={() => {
                  this.handleRequestCloseMenuProfile();
                  this.props.userSignOut();
                }}
              >
                <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />
                <IntlMessages id="user.signOut" />{" "}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
       

        {this.state.colorOption ? (
          <ColorOption cancelPanel={this.handleCancelPanel.bind(this)} />
        ) : (
          ""
        )}
      </AppBar>
    );
  }
}

const mapStateToProps = ({ settings, auth,users }) => {
  const {
    drawerType,
    locale,
    navigationStyle,
    horizontalNavPosition,
    languageId,
  } = settings;
  const {entreprise}=users
  return {
    drawerType,
    locale,
    navigationStyle,
    horizontalNavPosition,
    languageId,entreprise
   
  };
};

export default withRouter(
  connect(mapStateToProps, { toggleCollapsedNav, switchLanguage, userSignOut })(
    Header
  )
);
