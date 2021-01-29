import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import IntlMessages from '../../util/IntlMessages';
import {
  sousModuleEtab,
  sousModuleEtab2,
  sousModuleELearning,
  sousModuleAssiduity,
  sousModuleCalendar,
  sousModuleGrades,
  sousModuleLibraries,
  sousModuleFinancialManagement,
  sousModuleSuperadmin,
  sousModuleCommunity,
} from '../../constants/StuppModules';
import { RoleContext } from '../../Context';
import Can from '../../can';

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
                <NavLink to={{ pathname: '/app/' + pathName }}>
                  <span className="nav-text">
                    <IntlMessages id={`sidebar.components.${pathName}`} />{' '}
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
                  <a className="nav-text ">
                    <IntlMessages id={`sidebar.components.${pathName}`} />
                  </a>
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
                    <NavLink to={{ pathname: '/app/' + mod.pathName }}>
                      <i className={`zmdi zmdi-${mod.icon}`} />
                      <span className="nav-text">
                        <IntlMessages id={`sidebar.components.${mod.name}`} />{' '}
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
  );
};

const MenuCollapseBoxItem2 = ({ pathName, listModule, sousModuleStupp }) => {
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
                  <a className="nav-text ">
                    <IntlMessages id={`sidebar.components.${pathName}`} />
                  </a>
                )}
              />
            )}
          />
        )}
      </RoleContext.Consumer>

      <ul className="sub-menu">
        {sousModuleStupp.map((mod, index) => {
          let test = false;
          let arr = [];
          if (mod.name === 'schoolSettings') {
            test = true;
            arr = mod.sousSousModules;
          }
          return test === true ? (
            <li key={index} className="nav-arrow">
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform={`module-nav-${mod.name}`}
                    yes={() => (
                      <a>
                        <span className="nav-link">
                          <i className={`zmdi zmdi-${mod.icon}`} />
                          <IntlMessages id={`sidebar.components.${mod.name}`} />{' '}
                        </span>
                      </a>
                    )}
                  />
                )}
              </RoleContext.Consumer>
              <ul className="sub-menu">
                {arr.map((sousModule, index) => (
                  <li key={index}>
                    <RoleContext.Consumer>
                      {({ role }) => (
                        <Can
                          role={role}
                          perform={`module-nav-${sousModule.name}`}
                          yes={() => (
                            <NavLink
                              to={{ pathname: '/app/' + mod.pathName + '/' + sousModule.pathName }}
                            >
                              <i className={`zmdi zmdi-${sousModule.icon}`} />
                              <span className="nav-text">
                                <IntlMessages id={`sidebar.components.${sousModule.name}`} />{' '}
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
          ) : (
            <li key={index}>
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform={`module-nav-${mod.name}`}
                    yes={() => (
                      <NavLink to={{ pathname: '/app/' + mod.pathName }}>
                        <i className={`zmdi zmdi-${mod.icon}`} />
                        <span className="nav-text">
                          <IntlMessages id={`sidebar.components.${mod.name}`} />{' '}
                        </span>
                      </NavLink>
                    )}
                  />
                )}
              </RoleContext.Consumer>
            </li>
          );
        })}
      </ul>
    </>
  );
};

class Menu extends Component {
  componentDidMount() {
    const { history } = this.props;

    const pathname = `#${history.location.pathname}`; // get current path
    const mainMenu = document.getElementsByClassName('nav-item');
    for (let i = 0; i < mainMenu.length; i++) {
      mainMenu[i].onclick = function() {
        for (let j = 0; j < mainMenu.length; j++) {
          if (mainMenu[j].classList.contains('active')) {
            mainMenu[j].classList.remove('active');
          }
        }
        this.classList.toggle('active');
      };
    }
    const subMenuLi = document.getElementsByClassName('nav-arrow');
    for (let i = 0; i < subMenuLi.length; i++) {
      subMenuLi[i].onclick = function() {
        for (let j = 0; j < subMenuLi.length; j++) {
          if (subMenuLi[j].classList.contains('active')) {
            subMenuLi[j].classList.remove('active');
          }
        }
        this.classList.toggle('active');
      };
    }
    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('active');
      } else {
        this.closest(activeLi, 'li').classList.add('active');
      }
      const parentNav = this.closest(activeNav, '.nav-item');
      if (parentNav) {
        parentNav.classList.add('active');
      }
    } catch (e) {}
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      [
        'matches',
        'webkitMatchesSelector',
        'mozMatchesSelector',
        'msMatchesSelector',
        'oMatchesSelector',
      ].some(function(fn) {
        if (typeof document.body[fn] === 'function') {
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
            <li className="nav-item">
              <MenuCollapseBoxItem
                pathName={'super_administration'}
                listModule={estabModule}
                sousModuleStupp={sousModuleSuperadmin}
              />
            </li>

            <li className="nav-item">
              <MenuCollapseBoxItem2
                pathName={'administration'}
                listModule={estabModule}
                sousModuleStupp={sousModuleEtab2}
              />
            </li>

            <li className="nav-item">
              <MenuCollapseBoxItem
                pathName={'e-learning'}
                listModule={estabModule}
                sousModuleStupp={sousModuleELearning}
              />
            </li>

            <li className="nav-item">
              <MenuCollapseBoxItem
                pathName={'assiduity'}
                listModule={estabModule}
                sousModuleStupp={sousModuleAssiduity}
              />
            </li>
            <li className="nav-item">
              <MenuCollapseBoxItem
                pathName={'community'}
                listModule={estabModule}
                sousModuleStupp={sousModuleCommunity}
              />
            </li>

            {/* <li className="nav-item">
            <NavlinkItem pathName={"cafeteria"} 
            listMoule={estabModule} />
          </li>
          <li className="nav-item">
            <NavlinkItem
              pathName={"health-monitoring"}
              listMoule={estabModule}
            />
          </li> */}
            <li className="nav-item">
              <MenuCollapseBoxItem
                pathName={'financial_management'}
                listModule={estabModule}
                sousModuleStupp={sousModuleFinancialManagement}
              />
            </li>
            <li className="nav-item">
              <MenuCollapseBoxItem
                pathName={'e-libraries'}
                listModule={estabModule}
                sousModuleStupp={sousModuleLibraries}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);
