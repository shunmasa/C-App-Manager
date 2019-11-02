import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

//props ({...}) after refucter , no more pathing the props from parents so that just take off
const NavBar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
//as Link ....button and item menu will be link when specify to=''
//style Link NavLink where it is in nav bar
export default observer(NavBar);
