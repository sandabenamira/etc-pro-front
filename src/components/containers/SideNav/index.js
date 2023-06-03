import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import SidenavContent from "./SidenavContent";
import {
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from "../../../constants/ActionTypes"; /* eslint eqeqeq: "off" */

import { toggleCollapsedNav, updateWindowWidth } from "../../../store/actions/Setting";
import imageSchool from "../../../assets/images/logoetcpro.png";

class SideNav extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  UNSAFE_componentWillMount() {
    window.addEventListener("resize", () => {
      this.props.updateWindowWidth(window.innerWidth);
    });
  }

  render() {   
    const estabModule = this.props.estabModule;

    const {
      navCollapsed,
      drawerType,
       navigationStyle,roleId
    } = this.props;
     let drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "d-xl-flex"
      : drawerType.includes(COLLAPSED_DRAWER)
      ? ""
      : "d-flex";
 

    if (navigationStyle === HORIZONTAL_NAVIGATION) {
      drawerStyle = "";
     }
    return (
      <div className={`app-sidebar d-none ${drawerStyle}`}>
    
        <Drawer
          className="app-sidebar-content"
          variant="temporary"
          open={navCollapsed}
          onClose={this.onToggleCollapsedNav}
          classes={{
            paper: "side-nav",
          }}
        >
          <div className="container-sm" style={{ padding: "40px" }}>
            <img
              className="img-fluid"
              src={
                imageSchool
              }
              alt="EDUCAP-PRO"
              title="EDUCAP-PRO"
            />
          </div>
          <SidenavContent estabModule={estabModule} roleId={roleId} />
        </Drawer>
      </div>
    );
  }
}
 
const mapStateToProps = ({ settings,users }) => {
  const { navCollapsed, drawerType, width, navigationStyle } = settings;
  const {roleId}=users
  return { navCollapsed, drawerType, width, navigationStyle,roleId };
};

export default withRouter(
  connect(mapStateToProps, { toggleCollapsedNav, updateWindowWidth })(SideNav)
);
