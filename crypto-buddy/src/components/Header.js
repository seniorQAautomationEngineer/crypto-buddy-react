import { useState } from "react";
import {
  Navbar,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Navbar dark color="primary" sticky="top" expand="md">
      <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
      <Collapse isOpen={menuOpen} navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <NavLink className="nav-link" to="/">
              <i className="fa fa-home fa-lg" /> Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/community">
              <i className="fa fa-list fa-lg" /> Community
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
