import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { userSignOut } from "../../actions/Auth";
import ColorOption from "../../containers/Customizer/ColorOption";
import imageStudent from "../../assets/images/supAdmin.png";
import {
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from "../../constants/ActionTypes"; /* eslint eqeqeq: "off" */

import SearchBox from "../../components/SearchBox";
import { switchLanguage, toggleCollapsedNav } from "../../actions/Setting";
import { classService } from "../../_services/class.service";
import IntlMessages from "../../util/IntlMessages";
import LanguageSwitcher from "../../components/LanguageSwitcher/index";
import Menu from "@material-ui/core/Menu";
import UserInfoPopup from "../../components/UserInfo/UserInfoPopup";
import SchoolYearModal from "../../app/routes/Administration/routes/SchoolYear/SchoolYearModal";
import MenuHeader from "../../components/TopNav/Menu";
import _ from "lodash";

function getRoleNameByID(roleId) {
  switch (roleId) {
    case 1:
      return <IntlMessages id="role.superAdmin" />;
    case 2:
      return <IntlMessages id="role.admin" />;
    case 3:
      return <IntlMessages id="toDo.professor" />;
      case 4:
        return "Chef d'agence";
      case 5:
        return 'Collaborateur';
      case 6:
        return 'Responsable formation';
      case '7':
        return 'Directeur Des Ressources Humaines';
    default:
      return '';
  }
}

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      openProfile: false,
      anchorElProfile: undefined,
      roleName: "",
      colorOption: false,
      establishmentName: "",
      uri: "",
      establishmentName_ar: "",

      anchorEl: undefined,
      searchBox: false,
      searchText: "",
      mailNotification: false,
      userInfo: false,
      langSwitcher: false,
      appNotification: false,
      schoolyear: "2019/2020",
      openSchoolYearModal: false,
      schoolYearName: "",
    };
  }
  activePanel = () => {
    this.setState({ colorOption: true });
    this.setState({ openProfile: false });
  };

  activeSchoolYear = () => {
    this.setState({ openSchoolYearModal: true });
    // this.props.updateSchoolYear()
  };

  handleClick = (event) => {
    this.setState({ openProfile: true, anchorElProfile: event.currentTarget });
  };

  handleRequestCloseMenuProfile = () => {
    this.setState({
      openProfile: false,
      roleName: "",
      anchorElProfile: undefined,
    });
  };

  handleCancelPanel() {
    this.setState({ colorOption: false });
  }
  handleCancelModal() {
    this.setState({ openSchoolYearModal: false });
  }
  UNSAFE_componentWillMount() {
    if (!_.isEmpty(this.props.userProfile)) {
      this.setState({
        establishmentName: this.props.userProfile.establishments[0]
          .establishment.name,
        schoolYearName: this.props.userProfile.establishments[0].establishment
          .licence[0].schoolYear.name,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userProfile !== this.props.userProfile) {
      this.setState({
        establishmentName: this.props.userProfile.establishments[0]
          .establishment.name,
        schoolYearName: this.props.userProfile.establishments[0].establishment
          .licence[0].schoolYear.name,
      });
    }
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
  Apps = () => {
    const roleIdSuperAdmin = 1;
    const roleIdAdmin = 2;
    const roleIdProfessor = 3;
    const roleId = parseInt(this.props.userProfile.roles_id);
    return (
      <ul className="jr-list jr-list-half">
        {(() => {
          if (roleId === roleIdSuperAdmin || roleId === roleIdAdmin) {
            return (
              <li className="jr-list-item">
                <Link className="jr-list-link" to="/app/administration/establishment">
                  <i className="zmdi zmdi-graduation-cap" />
                  <span className="jr-list-text">
                    <IntlMessages id="sidebar.administration" />
                  </span>
                </Link>
              </li>
            );
          }
        })()}

        {(() => {
          if (roleId === roleIdProfessor || roleId === roleIdAdmin || roleId === roleIdSuperAdmin) {
            return (
              <li className="jr-list-item">
                <Link className="jr-list-link" to="/app/call_register">
                  <i className="zmdi zmdi-calendar-alt zmdi-hc-fw" />
                  <span className="jr-list-text">
                    <IntlMessages id="pages.registreAppel" />
                  </span>
                </Link>
              </li>
            );
          }
        })()}
        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/mail">
            <i className="zmdi zmdi-email zmdi-hc-fw" />
            <span className="jr-list-text">
              <IntlMessages id="sidebar.appModule.mail" />
            </span>
          </Link>
        </li>

        {(() => {
          if (roleId === roleIdSuperAdmin || roleId === roleIdAdmin) {
            return (
              <li className="jr-list-item">
                <Link className="jr-list-link" to="/app/payments">
                  <i className="zmdi zmdi-money-box" />
                  <span className="jr-list-text">
                    <IntlMessages id="sidebar.components.payment" />
                  </span>
                </Link>
              </li>
            );
          }
        })()}
      </ul>
    );
  };

  render() {   /* eslint eqeqeq: "off" */
    const { drawerType, locale, navigationStyle, horizontalNavPosition, languageId } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? 'd-block d-xl-none'
      : drawerType.includes(COLLAPSED_DRAWER)
      ? 'd-block'
      : 'd-none';
    const establishmentName = this.state.establishmentName;
    const user = this.props.userProfile.user; 

    // const schoolyear = JSON.parse(localStorage.getItem("school_year_name"));
    return (
      <AppBar className="app-main-header jr-border-radius" position="relative">
        {user != undefined && (
          <Toolbar>
            {navigationStyle === HORIZONTAL_NAVIGATION ? (
              <div className="d-block d-md-none pointer mr-3" onClick={this.onToggleCollapsedNav}>
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
              {establishmentName.toUpperCase() +
                "   " +
                "(" +
                " " +
                this.state.schoolYearName +
                " " +
                ")"}
            </h4>
            {/* {languageId === 'tunisia' ? (
              <h4 className="mb-0 mr-auto text-white">
                {this.state.establipaddshmentName_ar +
                  '   ' +
                  '(' +
                  ' ' +
                  this.props.userProfile.school_year_name +
                  ' ' +
                  ')'}
              </h4>
            ) : (
      
            )} */}

            <MenuHeader estabModule={this.props.estabModule} />

            {/* {navigationStyle === HORIZONTAL_NAVIGATION &&
            horizontalNavPosition === INSIDE_THE_HEADER && <Menu />} */}

            <SearchBox styleName="d-none d-sm-block" />

            <div className="d-inline-block d-sm-none list-inline-item">
              <Dropdown
                className="quick-menu nav-searchbox"
                isOpen={this.state.searchBox}
                toggle={this.onSearchBoxSelect.bind(this)}
              >
                <DropdownToggle className="d-inline-block" tag="span" data-toggle="dropdown">
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
              <li className="list-inline-item">
                <i className="zmdi zmdi-notifications-active zmdi-hc-lg zmdi-hc-fw" />
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
                  <DropdownToggle className="d-inline-block" tag="span" data-toggle="dropdown">
                    <IconButton className="icon-btn ">
                      {locale.languageId === 'tunisia' ? (
                        <i className="tn flag"></i>
                      ) : locale.languageId === 'english' ? (
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

              <li className="list-inline-item">
                <h4 className="mb-0 mr-auto text-white">
                {user.name.charAt(0).toUpperCase() + user.name.slice(1)} {user.surname.toUpperCase()}
               
                </h4>
                <h5 className="mb-0 mr-auto text-grey">
                  {getRoleNameByID(this.props.userProfile.role_id)}
                </h5>
              </li>
              {navigationStyle === HORIZONTAL_NAVIGATION && (
                <li className="list-inline-item user-nav">
                  <Dropdown
                    className="quick-menu"
                    isOpen={this.state.userInfo}
                    toggle={this.onUserInfoSelect.bind(this)}
                  >
                    <DropdownToggle className="d-inline-block" tag="span" data-toggle="dropdown">
                      <IconButton className="icon-btn size-30"></IconButton>
                    </DropdownToggle>

                    <DropdownMenu right>
                      <UserInfoPopup />
                    </DropdownMenu>
                  </Dropdown>
                </li>
              )}
            </ul>
            <div
              className="user-detail"
              // onClick={this.handleClick}
              onBlur={this.handleRequestCloseMenuProfile}
            >
              {user.photo != null ? (
                <Avatar
                  alt="..."
                  src={user.photo}
                  className="ml-2 ml-lg-4 d-none d-sm-block"
                  onClick={this.handleClick}
                />
              ) : (
                <Avatar
                  alt="..."
                  src={imageStudent}
                  className="ml-2 ml-lg-4 d-none d-sm-block"
                  onClick={this.handleClick}
                />
              )}
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
                <MenuItem onClick={this.activeSchoolYear.bind(this)}>
                  <i className="zmdi zmdi-calendar-check zmdi-hc-fw mr-2" />
                  <IntlMessages id="filter.school.years" />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    this.setState({ roleName: '' });
                    this.handleRequestCloseMenuProfile();
                    this.props.userSignOut();
                  }}
                >
                  <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />
                  <IntlMessages id="user.signOut" />{' '}
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        )}

        {this.state.colorOption ? (
          <ColorOption cancelPanel={this.handleCancelPanel.bind(this)} />
        ) : (
          ''
        )}
        {this.state.openSchoolYearModal ? (
          <SchoolYearModal
            cancelModal={this.handleCancelModal.bind(this)}
            openSchoolYearModal={this.state.openSchoolYearModal}
          />
        ) : (
          ''
        )}
      </AppBar>
    );
  }
}

const mapStateToProps = ({ settings, auth, establishment }) => {
  const { drawerType, locale, navigationStyle, horizontalNavPosition, languageId } = settings;
  return {
    drawerType,
    locale,
    navigationStyle,
    horizontalNavPosition,
    languageId,
    userProfile: auth.userProfile,
    estabModule: establishment.estabModule,
  };
};

export default withRouter(
  connect(mapStateToProps, { toggleCollapsedNav, switchLanguage, userSignOut })(Header)
);
