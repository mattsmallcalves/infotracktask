import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

function SimpleNavBar(args) {
  return (
    <div>
      <Navbar>
        <Container className="d-flex justify-content-start align-items-center">
          <NavbarBrand className="mr-4">InfoTrack</NavbarBrand>
          <Nav className="d-flex">
            <NavItem className="mx-2">
              <NavLink href="/">Search</NavLink>
            </NavItem>
            <NavItem className="mx-2">
              <NavLink href="/history/">History</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default SimpleNavBar;
