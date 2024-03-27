import React, { useEffect, useState } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { signup } from "../actions/userActions";

import "../assets/styles/registration.css";

const SignUpPage = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const SignUpPageContainer = classNames(
        "registration-page-container",
        "sign-up-page-container"
    );

    const SignUpModalPageContainer = classNames(
        "registration-modal-page-container",
        "sign-up-modal-page-container"
    );

    const SignUpRegistrationChoiceContainer = classNames(
        "registration-choice-container"
    );
    
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search ? location.search.split("="[1]) : "/";

    // eslint-disable-next-line no-unused-expressions
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(name, email, username, password);
        dispatch(signup(name, email, username, password));
    };

    return (
        <main>
            <Container className={SignUpPageContainer}>
                <Container className={SignUpModalPageContainer}>
                    <Container className={SignUpRegistrationChoiceContainer}>
                        <Link
                            to="/register"
                            className="registration-choice login-page-registration-choice"
                        >
                            Регистрация
                        </Link>
                        <Link
                            to="/login"
                            className="registration-choice login-page-registration-choice"
                        >
                            Вход
                        </Link>
                    </Container>

                    <Form
                        className="registration-form"
                        onSubmit={submitHandler}
                    >
                        <InputGroup>
                            <InputGroup.Text
                                id="user-name"
                                className="registration-input-text"
                            >
                                Введите имя:
                            </InputGroup.Text>
                            <Form.Control
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="sign-up-form-control"
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text
                                id="email"
                                className="registration-input-text"
                            >
                                Введите электронную почту:
                            </InputGroup.Text>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="sign-up-form-control"
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text
                                id="login"
                                className="registration-input-text"
                            >
                                Введите никнейм:
                            </InputGroup.Text>
                            <Form.Control
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="sign-up-form-control"
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text
                                id="password"
                                className="registration-input-text"
                            >
                                Введите пароль:
                            </InputGroup.Text>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="sign-up-form-control"
                            />
                        </InputGroup>

                        <Button
                            className="registration-button sign-in-button"
                            type="submit"
                        >
                            Зарегистрироваться
                        </Button>
                    </Form>
                </Container>
            </Container>
        </main>
    );
};

export default SignUpPage;
