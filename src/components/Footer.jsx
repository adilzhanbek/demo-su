import React from 'react';
import classNames from 'classnames';
import { Col, Container, Row } from "react-bootstrap";
import { PiTwitterLogoFill, PiInstagramLogoFill, PiFacebookLogoFill, PiTwitchLogoFill } from "react-icons/pi";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerNavigationContainer = classNames('footer-navigation-container');

    const socialMediaSize = 32;

    return (
        <footer>
            <Container className={ footerNavigationContainer }>
                <Col className="footer-navigation-column">
                    <Row className="footer-navigation-highlighted-text">Расписание игр</Row>
                    <Row className="footer-navigation-row">Предстоящие турниры</Row>
                    <Row className="footer-navigation-row">Рейтинг игроков</Row>
                    <Row className="footer-navigation-row">Записаться на игры</Row>
                </Col>

                <Col className="footer-navigation-column">
                    <Row className="footer-navigation-title-row">Support</Row>
                    <Row className="footer-navigation-row">FAQ</Row>
                    <Row className="footer-navigation-row">Tutorial</Row>
                    <Row className="footer-navigation-row">Contact</Row>
                </Col>

                <Col className="footer-navigation-column">
                    <Row className="footer-navigation-title-row">Connect</Row>
                    <Row className="footer-navigation-row">Forum</Row>
                    <Row className="footer-navigation-row">Blog</Row>
                    <Row className="footer-navigation-row">Social</Row>
                </Col>
            </Container>

            <Row className="social-media-container">
                <PiTwitterLogoFill  className="social-media" size={ socialMediaSize } color={"white"} />
                <PiInstagramLogoFill  className="social-media" size={ 31 } color={"white"} />
                <PiFacebookLogoFill className="social-media" size={ socialMediaSize } color={"white"} />
                <PiTwitchLogoFill className="social-media" size={ socialMediaSize } color={"white"} />
            </Row>
            <p className="mafia-copyright">&copy; Mafia Madness { currentYear } </p>
        </footer>
    );
};

export default Footer;