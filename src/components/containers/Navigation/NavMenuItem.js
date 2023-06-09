import React from 'react';
import { List } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { RoleContext } from '../../switchComponent/Context';
import Can from '../../switchComponent/can';

import IntlMessages from '../../../util/IntlMessages';

const NavMenuItem = (props) => {
  const { name , pathName } = props;

  return (
    <RoleContext.Consumer>
      {({ role }) => (
        <Can
          role={role}
          perform={`module-nav-${name}`}
          yes={() => (
            <List component="div" className="nav-menu-item">
              <NavLink className="prepend-icon nav-menu-link" to={{ pathname: '/app/' + pathName }}>
                <span className="nav-text">
                  <IntlMessages id={`sidebar.components.${name}`} />
                </span>
              </NavLink>
            </List>
          )}
        />
      )}
    </RoleContext.Consumer>
  );
};

export default NavMenuItem;
