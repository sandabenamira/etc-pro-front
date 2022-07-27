import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";
import {
  sousModuleSuperAdministration,
  sousModuleAdministration,
  sousModuleELearning,
  sousModuleReporting,
} from "../../constants/EducapProModules";
import { RoleContext } from "../switchComponent/Context";
import Can from "../switchComponent/can";

const MenuCollapseBoxItem = ({ pathName, listModule, sousModuleEducapPro }) => {
  return (
    <>
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
                  <>
                    <a className="nav-text " href={null}>
                      <IntlMessages id={`sidebar.components.${pathName}`} />
                    </a>
                    <ul className="sub-menu">
                      {sousModuleEducapPro.map((mod, index) => (
                        <li key={index}>
                          <RoleContext.Consumer>
                            {({ role }) => (
                              <Can
                                role={role}
                                perform={`module-nav-${mod.name}`}
                                yes={() => (
                                  <NavLink
                                    to={{ pathname: "/app/" + mod.pathName }}
                                  >
                                    <i className={`zmdi zmdi-${mod.icon}`} />
                                    <span className="nav-text">
                                      <IntlMessages
                                        id={`sidebar.components.${mod.name}`}
                                      />
                                    </span>
                                  </NavLink>
                                )}
                              />
                            )}
                          </RoleContext.Consumer>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              />
            )}
          />
        )}
      </RoleContext.Consumer>
    </>
  );
};
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

class Menu extends Component {
  componentDidMount() {
    const { history } = this.props;

    const pathname = `#${history.location.pathname}`; // get current path
    const mainMenu = document.getElementsByClassName("nav-item");
    for (let i = 0; i < mainMenu.length; i++) {
      mainMenu[i].onclick = function () {
        for (let j = 0; j < mainMenu.length; j++) {
          if (mainMenu[j].classList.contains("active")) {
            mainMenu[j].classList.remove("active");
          }
        }
        this.classList.toggle("active");
      };
    }
    const subMenuLi = document.getElementsByClassName("nav-arrow");
    for (let i = 0; i < subMenuLi.length; i++) {
      subMenuLi[i].onclick = function () {
        for (let j = 0; j < subMenuLi.length; j++) {
          if (subMenuLi[j].classList.contains("active")) {
            subMenuLi[j].classList.remove("active");
          }
        }
        this.classList.toggle("active");
      };
    }
    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, "ul"); // select closest ul
      if (activeNav.classList.contains("sub-menu")) {
        this.closest(activeNav, "li").classList.add("active");
      } else {
        this.closest(activeLi, "li").classList.add("active");
      }
      const parentNav = this.closest(activeNav, ".nav-item");
      if (parentNav) {
        parentNav.classList.add("active");
      }
    } catch (e) {}
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
      ].some(function (fn) {
        if (typeof document.body[fn] === "function") {
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
    /* eslint eqeqeq: "off" */
    /* eslint jsx-a11y/anchor-is-valid: "off" */
    const estabModule = this.props.estabModule;

    const { roleId } = this.props;

     return (
      <div className="d-none d-xl-block">
        <div className="app-main-menu ">
          <ul className="navbar-nav  ">
            <li className="nav-item ">
              <NavLink className="prepend-icon" to="/app/home">
                <span className="nav-text">
                  <IntlMessages id="sidebar.home" />
                </span>
              </NavLink>
            </li>

            {roleId === 1 && (
              <li className="nav-item">
                <MenuCollapseBoxItem
                  pathName={"super-administration"}
                  listModule={estabModule}
                  sousModuleEducapPro={sousModuleSuperAdministration}
                />
              </li>
            )}

            <li className="nav-item">
              <MenuCollapseBoxItem
                pathName={"administration"}
                listModule={estabModule}
                sousModuleEducapPro={sousModuleAdministration}
              />
            </li>

            <li className="nav-item">
              <MenuCollapseBoxItem
                pathName={"e-learning"}
                listModule={estabModule}
                sousModuleEducapPro={sousModuleELearning}
              />
            </li>
            <li className="nav-item">
              <NavlinkItem pathName={"catalog"} listMoule={estabModule} />
            </li>

            <li className="nav-item">
              <MenuCollapseBoxItem
                pathName={"reporting"}
                listModule={estabModule}
                sousModuleEducapPro={sousModuleReporting}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ users }) => {
  const { roleId } = users;
  return { roleId };
};

export default withRouter(connect(mapStateToProps)(Menu));
