import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsSearch } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/authContext";

export default function NavBar() {
  const [allMenusLink, setAllMenusLink] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllMenusLink(data);
      });
  }, []);

  return (
    <div className="main-navbar">
      <div className="container-fluid">
        <div className="main-navbar-content">
          <div className="main-navbar-right">
            <img
              src="/images/logo/logo.png"
              alt="لوگوی سبزلرن"
              className="main-navbar-logo"
            />

            <Navbar expand="lg">
              <Container>
                <Navbar.Brand href="/" className="navbar-right-home-text">
                  صفحه اصلی
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    {allMenusLink.map((menu) => (
                      <>
                        {menu.submenus.length === 0 ? (
                          <>
                            <Nav.Link to={`${menu.href}` / 1}>{menu.title}</Nav.Link>
                          </>
                        ) : (
                          <>
                            <NavDropdown
                              title={menu.title}
                              href={menu.href}
                              id="basic-nav-dropdown"
                            >
                              {menu.submenus.length !== 0 && (
                                <>
                                  {menu.submenus.map((submenu) => (
                                    <NavDropdown.Item href={`/course-info/${submenu.href}`}>
                                      {submenu.title}
                                    </NavDropdown.Item>
                                  ))}
                                </>
                              )}
                            </NavDropdown>
                          </>
                        )}
                      </>
                    ))}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>

          <div className="main-header-left">
            <a href="" className="main-navbar-search-btn">
              <BsSearch className="left-navbar-search-icon" />
            </a>
            <a href="" className="left-navbar-cart-btn">
              <HiShoppingCart className="left-navbar-cart-icon" />
            </a>
            {authContext.isLoggedIn ? (
              <Link to="#" className="left-navbar-profile">
                <span className="left-navbar-profile-text">
                  {authContext.userInfos.name}
                </span>
              </Link>
            ) : (
              <Link to="/login" className="left-navbar-profile">
                <span className="left-navbar-profile-text">ورود / ثبت نام</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
