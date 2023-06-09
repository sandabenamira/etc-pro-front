import React from 'react';
import { List } from '@material-ui/core';

import IntlMessages from '../../../util/IntlMessages';
import NavMenuItem from './NavMenuItem';
import NavCollapse from './NavCollapse';
import { RoleContext } from '../../switchComponent/Context';
import Can from '../../switchComponent/can';

const NavSection = (props) => {
  const { name, icon, children = [] } = props;
  const isExpandable = children && children.length > 0;

  const MenuCollapse = (
    <RoleContext.Consumer>
      {({ role }) => (
        <Can
          role={role}
          perform={`module-nav-${name}`}
          yes={() => (
            <List component="div" className="nav-header">
              {/* Display an icon if any */}
              {!!icon && <i className={'zmdi zmdi-hc-fw  zmdi-' + icon} />}
              <IntlMessages id={name} />
            </List>
          )}
        />
      )}
    </RoleContext.Consumer>
  );

  const MenuItemChildren = isExpandable ? (
    <List component="div" disablePadding>
      {children.map((item, index) => {
        switch (item.type) {
          case 'section':
            return <NavSection {...item} key={index} />;
          case 'collapse':
            return <NavCollapse {...item} key={index} />;
          case 'item':
            return <NavMenuItem {...item} key={index} />;
          default:
            return true;
        }
      })}
    </List>
  ) : null;

  return (
    <div className="nav-section">
      {MenuCollapse}
      {MenuItemChildren}
    </div>
  );
};

export default NavSection;
