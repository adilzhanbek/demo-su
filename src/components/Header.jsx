import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Navbar, Nav, Container, Button } from "react-bootstrap";
import classNames from "classnames";

import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

import "../assets/styles/index.css";

const Header = () => {
    const navigate = useNavigate();

    const headerNavigationContainer = classNames("header-navigation-container");

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const loginLink = () => {
        navigate("/login");
    };

    const signUpLink = () => {
        navigate("/register");
    };

    const headerNavigationRegistrationButtonContainer = classNames(
        "header-navigation-registration-button-container"
    );

    return (
        <header>
            <Navbar bg="light">
                <Container className={headerNavigationContainer}>
                    <Navbar.Brand href="/">Mafia Madness</Navbar.Brand>

                    <Navbar.Toggle
                        aria-controls="responsive-navbar-nav"
                        onClick={toggleMenu}
                    >
                        {showMenu ? (
                            <RxCross1 color={"hsl(1, 60%, 40%)"} size={24} />
                        ) : (
                            <RxHamburgerMenu
                                color={"hsl(1, 60%, 40%)"}
                                size={24}
                            />
                        )}
                    </Navbar.Toggle>

                    <Navbar.Collapse>
                        <Nav className="header-navigation-nav">
                            <Nav.Link href="/">ГЛАВНАЯ</Nav.Link>
                            <Nav.Link href="/">О НАС</Nav.Link>
                            <Nav.Link href="/">РАСПИСАНИЕ</Nav.Link>
                            <Nav.Link href="/">КОНТАКТЫ</Nav.Link>

                            {localStorage.getItem("userInfo") ? (
                                <div></div>
                            ) : (
                                <Container
                                    className={
                                        headerNavigationRegistrationButtonContainer
                                    }
                                >
                                    <Button
                                        onClick={loginLink}
                                        className="header-navigation-registration-button header-navigation-registration-button-1"
                                    >
                                        Log In
                                    </Button>
                                </Container>
                            )}

                            {localStorage.getItem("userInfo") ? (
                                <div></div>
                            ) : (
                                <Container
                                    className={
                                        headerNavigationRegistrationButtonContainer
                                    }
                                >
                                    <Button
                                        onClick={signUpLink}
                                        className="header-navigation-registration-button header-navigation-registration-button-2"
                                    >
                                        Sign Up
                                    </Button>
                                </Container>
                            )}
                        </Nav>
                    </Navbar.Collapse>

                    {showMenu && (
                        <div className="mobile-menu">
                            <Nav>
                                <Nav.Link href="/">ГЛАВНАЯ</Nav.Link>
                                <Nav.Link href="/">О НАС</Nav.Link>
                                <Nav.Link href="/">РАСПИСАНИЕ</Nav.Link>
                                <Nav.Link href="/">КОНТАКТЫ</Nav.Link>
                            </Nav>
                        </div>
                    )}
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
