import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { RoleContext } from '../../Context';
import Can from '../../can';

import IntlMessages from '../../util/IntlMessages';

const NavMenuItem = (props) => {
  const { name, icon, pathName } = props;

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
