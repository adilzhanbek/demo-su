import React, { useState, useEffect } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import "../assets/styles/registration.css";

const LoginPage = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const LoginPageContainer = classNames(
        "registration-page-container",
        "login-page-container"
    );

    const LoginModalPageContainer = classNames(
        "registration-modal-page-container",
        "login-modal-page-container"
    );

    const LoginRegistrationChoiceContainer = classNames(
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
        console.log(email, password);
        dispatch(login(email, password));
    };
    return (
        <div>
            <Container className={LoginPageContainer}>
                <Container className={LoginModalPageContainer}>
                    <Container className={LoginRegistrationChoiceContainer}>
                        <Link
                            to="/login"
                            className="registration-choice login-page-registration-choice"
                        >
                            Вход
                        </Link>

                        <Link
                            to="/register"
                            className="registration-choice login-page-registration-choice"
                        >
                            Регистрация
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
                                Введите электронную почту:
                            </InputGroup.Text>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="login-form-control"
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="login-form-control"
                            />
                        </InputGroup>

                        <Button
                            className="registration-button login-button"
                            type="submit"
                        >
                            Войти
                        </Button>
                    </Form>
                </Container>
            </Container>
        </div>
    );
};

export default LoginPage;
