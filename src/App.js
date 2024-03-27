import React from 'react';

import "./assets/styles/index.css";

import Header from "./components/Header";
// import Content from "./components/Content";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import {Container} from "react-bootstrap";
const App = () => {

    return (
        <Router>
            <Header />
            <main className="py-3">
            <Container>

                <Routes>
                    <Route path={"/login"} element={<LoginPage />}/>
                    <Route path={"/register"} element={<SignUpPage />} />
                    <Route path={"/"} element={<HomePage />} exact/>
                </Routes>
            </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;