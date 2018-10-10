import React from 'react';

import { Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class AuthNavigation extends React.Component {

  render() {

    return (
      <Nav className="custom-nav justify-content-end">
        <a className="mr-auto navbar-brand" href="/login">
          Block Forms
        </a>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/registerCreator">Create Form</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/validate">Validate</NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default withRouter(AuthNavigation);