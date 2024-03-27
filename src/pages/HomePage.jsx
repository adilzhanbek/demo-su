import React from 'react';
import { Button, Card, CardGroup, Container } from "react-bootstrap";
import classNames from "classnames";

import { RiArrowRightLine } from "react-icons/ri";

import gamer_1 from "../assets/images/gamer_1.jpg";
import gamer_2 from "../assets/images/gamer_2.jpg";
import gamer_3 from "../assets/images/gamer_3.jpg";
import gamer_4 from "../assets/images/gamer_4.jpg";

const HomePage = () => {

    const welcomePageContainer = classNames('welcome-page-container')
    const infoPageContainer = classNames('info-page-container')

    const bigEllipse_1 = classNames('big-ellipse big-ellipse-1');
    const bigEllipse_2 = classNames('big-ellipse big-ellipse-2');
    const bigEllipse_3 = classNames('big-ellipse big-ellipse-3');

    const welcomePageWelcomeTextContainer = classNames('welcome-page-welcome-text-container')

    const infoPageWelcomeTextGroup = classNames('info-page-welcome-text-group');

    const gameScheduleDayContainer = classNames('game-schedule-day-container');

    const littleEllipseContainer = classNames('little-ellipse-container');

    const getStartedContainer = classNames('get-started-container');

    return (
        <main>
            <Container className={welcomePageContainer}>
                <Container className={bigEllipse_1}></Container>
                <Container className={bigEllipse_2}></Container>
                <Container className={bigEllipse_3}></Container>

                <Container className={welcomePageWelcomeTextContainer}>
                    <h1 className="welcome-page-welcome-text">ДОБРО ПОЖАЛОВАТЬ</h1>
                    <h1 className="welcome-page-welcome-text">В MAFIA CLUB</h1>
                </Container>

                <p className="brand-name-text">Mafia Madness</p>
            </Container>

            <Container className={infoPageContainer}>
                <section className="info-page-welcome-section">
                    <h2 className="info-page-welcome-title">WELCOME TO MAFIA MADNESS!</h2>

                    <Container className={ infoPageWelcomeTextGroup }>
                        <p className="info-page-welcome-text">
                            Join the wildest, pulse-pounding online mafia games available!
                            Put your cunning skills to the test and outwit your opponents
                            in this thrilling gaming arena.
                        </p>

                        <p className="info-page-welcome-text">
                            Not only can you register for upcoming games,
                            but you can also browse our exhilarating game schedule
                            and plot out your next epic betrayal.
                        </p>
                    </Container>
                </section>

                <section className="info-page-meet-gamers-section">
                    <h2 className="meet-gamers-title">MEET GAMERS</h2>

                    <p className="meet-gamers-text">
                        Join a growing community of Mafia enthusiasts.
                        Bond, deceive, and conquer your way through our captivating games!
                    </p>

                    <CardGroup className="gamers-card-group">
                        <Card className="gamer gamer-1">
                            <Card.Header>
                                <Card.Img src={gamer_1}/>
                            </Card.Header>

                            <Card.Body>
                                <Card.Title>
                                    JAKE 'THE DON' STEVENS
                                </Card.Title>

                                <Card.Text>
                                    Mastermind
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className="gamer gamer-2">
                            <Card.Header>
                                <Card.Img src={gamer_2}/>
                            </Card.Header>

                            <Card.Body>
                                <Card.Title>
                                    VERA 'THE ENFORCER' MILES
                                </Card.Title>

                                <Card.Text>
                                    Enforcer
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className="gamer gamer-3">
                            <Card.Header>
                                <Card.Img src={gamer_3}/>
                            </Card.Header>

                            <Card.Body>
                                <Card.Title>
                                    FRANK 'THE SNITCH' RIZZO
                                </Card.Title>

                                <Card.Text>
                                    Snitch
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className="gamer gamer-4">
                            <Card.Header>
                                <Card.Img src={gamer_4}/>
                            </Card.Header>

                            <Card.Body>
                                <Card.Title>
                                    CLEO 'THE SPY' BISHOP
                                </Card.Title>

                                <Card.Text>
                                    Spy
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </section>

                <section className="info-page-game-schedule-section">
                    <Container className={gameScheduleDayContainer}>
                        <h4 className="game-schedule-day">
                            October 18, 2023 <span className="game-schedule-day-game-name">Turf War Tuesday</span>
                        </h4>

                        <RiArrowRightLine size={32}/>
                    </Container>

                    <Container className={gameScheduleDayContainer}>
                        <h4 className="game-schedule-day">
                            October 20, 2023 <span className="game-schedule-day-game-name">Whack-A-Rat Thursday</span>
                        </h4>

                        <RiArrowRightLine size={32}/>
                    </Container>

                    <Container className={gameScheduleDayContainer}>
                        <h4 className="game-schedule-day">
                            October 22, 2023 <span className="game-schedule-day-game-name">Sinister Saturday</span>
                        </h4>

                        <RiArrowRightLine size={32}/>
                    </Container>

                    <Container className={gameScheduleDayContainer}>
                        <h4 className="game-schedule-day">
                            October 27, 2023 <span className="game-schedule-day-game-name">Double-Cross Wednesday</span>
                        </h4>

                        <RiArrowRightLine size={32}/>
                    </Container>

                    <Container className={gameScheduleDayContainer}>
                        <h4 className="game-schedule-day">
                            October 29, 2023 <span className="game-schedule-day-game-name">Frenemy Friday</span>
                        </h4>

                        <RiArrowRightLine size={32}/>
                    </Container>
                </section>

                <section className="info-page-get-started-section">
                    <Container className={littleEllipseContainer}>
                        <Container className="little-ellipse little-ellipse-1"></Container>
                        <Container className="little-ellipse little-ellipse-2"></Container>
                    </Container>

                    <Container className={getStartedContainer}>
                        <h2 className="get-started-title">Get Started</h2>

                        <p className="get-started-text">
                            Ready to dive into the gripping world of Mafia Madness?
                            Don’t wait any longer! Register, pick your game, and start
                            outsmarting your rivals today!
                        </p>

                        <Button className="info-page-sign-up-button">Sign Up Now</Button>
                    </Container>
                </section>
            </Container>
        </main>
    );
};

export default HomePage;