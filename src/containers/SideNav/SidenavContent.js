import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../util/IntlMessages";
import CustomScrollbars from "../../util/CustomScrollbars";
import { RoleContext } from "../../Context";
import Can from "../../can";
import {
  sousModuleGrades,
  sousModuleLibraries,
  sousModuleFinancialManagement,
  sousModuleSuperadmin,
  sousModuleELearning,
  sousModuleAdministration,
  sousModuleAssiduity,
  sousModuleCommunity,
  sousModuleEvaluation
} from "../../constants/StuppModules";
import Navigation from "../Navigation/index";
// import CustomScrollbars from '../../util/CustomScrollbars';

const NavlinkItem = ({ pathName, listMoule }) => {
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
                moduleList: listMoule,
              }}
              yes={() => (
                <NavLink to={{ pathname: "/app/" + pathName }}>
                  <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                  <span className="nav-text">
                    <IntlMessages id={`sidebar.components.${pathName}`} />{" "}
                  </span>
                </NavLink>
              )}
            />
          )}
        />
      )}
    </RoleContext.Consumer>
  );
};

const MenuCollapseBoxItem = ({ pathName, listModule, sousModuleStupp }) => {
  console.log(pathName ,':', sousModuleStupp, '|', listModule);
  return (
    <li className="menu collapse-box">
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
                  moduleList: listModule,
                }}
                yes={() => (
                  <Button>
                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                    <span className="nav-text">
                      <IntlMessages id={`sidebar.components.${pathName}`} />
                    </span>
                  </Button>
                )}
              />
            )}
          />
        )}
      </RoleContext.Consumer>
      <ul className="sub-menu">
        {sousModuleStupp.map((mod, index) => (
          <li key={index}>
            <RoleContext.Consumer>
              {({ role }) => (
                <Can
                  role={role}
                  perform={`module-nav-${mod.name}`}
                  yes={() => (
                    <NavLink to={{ pathname: "/app/" + mod.pathName }}>
                      <span className="nav-text">
                        <IntlMessages id={`sidebar.components.${mod.name}`} />{" "}
                      </span>
                    </NavLink>
                  )}
                />
              )}
            </RoleContext.Consumer>
          </li>
        ))}
      </ul>
    </li>
  );
};
class SidenavContent extends Component {
  componentDidMount() {
    const { history } = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`; // get current path
    const menuLi = document.getElementsByClassName("menu");

    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function(event) {
        for (let j = 0; j < menuLi.length; j++) {
          const parentLi = that.closest(this, "li");
          if (
            menuLi[j] !== this &&
            (parentLi === null || !parentLi.classList.contains("open"))
          ) {
            menuLi[j].classList.remove("open");
          }
        }
        this.classList.toggle("open");
      };
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, "ul"); // select closest ul
      if (activeNav.classList.contains("sub-menu")) {
        this.closest(activeNav, "li").classList.add("open");
      } else {
        this.closest(activeLi, "li").classList.add("open");
      }
    } catch (error) {}
  }

  componentWillReceiveProps(nextProps) {
    const { history } = nextProps;
    const pathname = `${history.location.pathname}`; // get current path
    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, "ul"); // select closest ul
      if (activeNav.classList.contains("sub-menu")) {
        this.closest(activeNav, "li").classList.add("open");
      } else {
        this.closest(activeLi, "li").classList.add("open");
      }
    } catch (error) {}
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      [
        "matches",
        "webkitMatchesSelector",
        "mozMatchesSelector",
        "msMatchesSelector",
        "oMatchesSelector",
      ].some(function(fn) {
        if (typeof document.body[fn] == "function") {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {}

    return null;
  }

  render() {
    const estabModule = this.props.estabModule;
    return (
      <CustomScrollbars className=" scrollbar">
        <ul className="nav-menu">
          <li>
            <NavLink className="prepend-icon" to="/app/home">
              &nbsp;&nbsp;
              <i className={`zmdi zmdi-home`} />
              <span className="nav-text">
                <IntlMessages id="sidebar.home" />
              </span>
            </NavLink>
          </li>

          <MenuCollapseBoxItem
            pathName={"super_administration"}
            listModule={estabModule}
            sousModuleStupp={sousModuleSuperadmin}
          />
          <li>
            <Navigation
              pathName={"administration"}
              listModule={estabModule}
              menuItems={sousModuleAdministration}
            />
          </li>

          {/* <MenuCollapseBoxItem
            pathName={"administration"}
            listModule={estabModule}
            sousModuleStupp={sousModuleEtab}
          /> */}

          <MenuCollapseBoxItem
            pathName={"e-learning"}
            listModule={estabModule}
            sousModuleStupp={sousModuleELearning}
          />
          <MenuCollapseBoxItem
            pathName={"evaluation"}
            listModule={estabModule}
            sousModuleStupp={sousModuleEvaluation}
          />
          {/* <li>
            <NavlinkItem pathName={"e-learning"} listMoule={estabModule} />
          </li> */}

          <MenuCollapseBoxItem
            pathName={"assiduity"}
            listModule={estabModule}
            sousModuleStupp={sousModuleAssiduity}
          />
          <MenuCollapseBoxItem
            pathName={"community"}
            listModule={estabModule}
            sousModuleStupp={sousModuleCommunity}
          />
          <li>
            <NavlinkItem pathName={"lesson"} listMoule={estabModule} />
          </li>
          <li>
            <NavlinkItem pathName={"devoir"} listMoule={estabModule} />
          </li>
          {/* <MenuCollapseBoxItem
            pathName={"calendar"}
            listModule={estabModule}
            sousModuleStupp={sousModuleCalendar}
          /> */}
          {/* <li>
            <NavlinkItem pathName={"complaints"} listMoule={estabModule} />
          </li> */}
          <li>
            <NavlinkItem pathName={"call_register"} listMoule={estabModule} />
          </li>
          <li>
            <NavlinkItem pathName={"billetPass"} listMoule={estabModule} />
          </li>
          <li>
            <NavlinkItem pathName={"mail"} listMoule={estabModule} />
          </li>
          <MenuCollapseBoxItem
            pathName={"menuGrade"}
            listModule={estabModule}
            sousModuleStupp={sousModuleGrades}
          />
          <li>
            <NavlinkItem pathName={"cafeteria"} listMoule={estabModule} />
          </li>
          {/* <li>
            <NavlinkItem pathName={"community"} listMoule={estabModule} />
          </li> */}
          <li>
            <NavlinkItem pathName={"dashboard"} listMoule={estabModule} />
          </li>
          <li>
            <NavlinkItem
              pathName={"health-monitoring"}
              listMoule={estabModule}
            />
          </li>
          {/* <MenuCollapseBoxItem
            pathName={"financial_management"}
            listModule={estabModule}
            sousModuleStupp={sousModuleFinancialManagement}
          /> */}

          <li>
            <NavLink className="prepend-icon" to="/app/financial_management/ServiceAllocation">
             
              <i className={`zmdi zmdi-view-dashboard zmdi-hc-fw`} />
              <span className="nav-text">
                <IntlMessages id="sidebar.components.financial_management" />
              </span>
            </NavLink>
          </li>

          <MenuCollapseBoxItem
            pathName={"e-libraries"}
            listModule={estabModule}
            sousModuleStupp={sousModuleLibraries}
          />

          <li>
            <NavlinkItem pathName={"course-support"} listMoule={estabModule} />
          </li>
        </ul>
      </CustomScrollbars>
    );
  }
}

export default withRouter(SidenavContent);
