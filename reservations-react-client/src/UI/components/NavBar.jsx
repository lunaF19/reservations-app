import React, { useContext } from "react";

import { NavLink, useLocation } from "react-router-dom";

import { CgLogOut, CgProfile, CgList } from "react-icons/cg"
import { MdOutlinePermMedia, MdAirlineSeatIndividualSuite, MdCategory } from "react-icons/md"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { AuthContext } from "../../auth";
import { useAuthLogin } from "../../auth/hooks/";

import { LogIn, BookOpen, Search, Bookmark } from "react-feather"

export const NavBarUI = () => {
  const { logged: isLogged = false, url_image } = useContext(AuthContext);
  const { pathname } = useLocation()
  const loginRegister = pathname === "/auth/login" ? "/auth/register" : "/auth/login"
  return <>{isLogged ? <NavBarPrivate pathname={pathname} image={url_image} /> : <NavBarPublic pathname={pathname} loginRegister={loginRegister} />}</>;
};

const LogoNavBar = () => (
  <NavLink to="/home" className="nav-link">

    <img
      src="/HiltonHotelsLogo2.png"
      alt=""

      className="rounded-1"
      style={{ backgroundColor: "white", padding: "5px", height: "60px" }}
    />
  </NavLink>
)

const LinkSearch = ({ pathname }) => (
  <NavLink
    className={({ isActive }) =>
      `nav-link ${(isActive || pathname.includes("/home/suite")) ? " fs-5 active" : ""}`
    }
    to={"/home/suites"}
  >
    {" "}
    Search suite <Search />
  </NavLink>
)

const LinkContact = () => (
  <NavLink
    className={({ isActive }) =>
      `nav-link ${isActive ? "fs-5 active" : ""}`
    }
    to={"/home/contact"}
  >
    {" "}
    Contact{" "} <Bookmark />
  </NavLink>

)
const NavBarPublic = ({ pathname, loginRegister }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          {" "}

          <LogoNavBar />

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

          </Nav>

          <Nav>

            <LinkSearch pathname={pathname} />

            {/* <LinkContact /> */}

            <NavLink
              className={`nav-link 
              ${["/auth/login", "/auth/register"].includes(pathname) ? "fs-5 active" : ""}`
              }
              to={loginRegister}
            >
              <NavLinkAuth pathname={pathname} />
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const NavLinkAuth = ({ pathname }) => {
  if (pathname === "/auth/login") return (
    <>
      Register <BookOpen />
    </>
  )

  if (pathname === "/auth/register") return (
    <>
      Login
      <LogIn />
    </>
  )

  return (
    <>
      Login/Register{" "}
    </>
  )

}


const NavBarPrivate = ({ pathname, image }) => {
  const { displayName, role_id } = useContext(AuthContext)

  const { authLogOut } = useAuthLogin()

  // const routesByRol = {
  //   AD: [ // Usuario Administrador
  //     { title: "Search Suites", route: "/home/suites" },
  //     { title: "Reservations", route: "/dashboard/reservations" }
  //   ],  // Usuario Administrador
  // }

  //const mapRutas = (item, i) => < ItemsRoutesXRoles key={i} {...item} />

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>

        <Navbar.Brand>
          <LogoNavBar />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto">

          </Nav>

          <Nav>
            <LinkSearch pathname={pathname} />

            {/* <LinkContact /> */}

            <NavDropdown title={`${displayName}`} id="collasible-nav-dropdown">
              <ImageProfileUser image={image} />
              <NavLink className="dropdown-item" to="/dashboard/profileUser">Edit Profile <CgProfile color="gray" size={"25px"} style={{ position: "absolute", right: "1rem" }} /></NavLink>
              <NavLink className="dropdown-item" to="/dashboard/reservationsUser">Show reservations <CgList color="gray" size={"25px"} style={{ position: "absolute", right: "1rem" }} /></NavLink>

              {
                role_id === "ADM" && (
                  <>
                    <NavDropdown.Divider />{/* AdmRouter*/}
                    <NavLink className="dropdown-item" to="/dashboard/adm/suites">Suites<MdAirlineSeatIndividualSuite color="gray" size={"25px"} style={{ position: "absolute", right: "1rem" }} /></NavLink>
                    <NavLink className="dropdown-item" to="/dashboard/adm/suites_categories">Suites Categories <MdCategory color="gray" size={"25px"} style={{ position: "absolute", right: "1rem" }} /></NavLink>
                    <NavLink className="dropdown-item" to="/dashboard/adm/catalog_media">Catalog Media<MdOutlinePermMedia color="gray" size={"25px"} style={{ position: "absolute", right: "1rem" }} /></NavLink>
                  </>
                )
              }

              <NavDropdown.Divider title="adas" />
              <Button className="dropdown-item" onClick={authLogOut}>Logout <CgLogOut color="gray" size={"25px"} style={{ position: "absolute", right: "1rem" }} /> </Button>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};



const ImageProfileUser = ({
  image = "/default_profile_image.webp"
}) => {

  return (

    <img
      src={image}
      // alt={"Profile Image"}
      style={{

        padding: "10px",
        width: "200px",
        height: "200px",
        borderRadius: "10%"
      }}
    />

  )
}