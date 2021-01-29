import React from "react";
import { List } from "@material-ui/core";
import NavMenuItem from "./NavMenuItem";
import NavSection from "./NavSection";
import NavCollapse from "./NavCollapse";
import { RoleContext } from "../../Context";
import Can from "../../can";

const Navigation = (props) => {
  const { menuItems, pathName, listModule } = props;
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
                moduleList: listModule,
              }}
              yes={() => (
                <List component="nav" disablePadding className="side-nav-menu ">
                  {menuItems.map((item, index) => {
                
                            switch (item.type) {
                              case "section":
                                return <NavSection {...item} key={index} />;
                              case "collapse":
                                return <NavCollapse {...item} key={index} />;
                              case "item":
                                return <NavMenuItem {...item} key={index} />;
                            }
                 
                          })}
                </List>
              )}
            />
          )}
        />
      )}
    </RoleContext.Consumer>
  );
};

export default Navigation;
