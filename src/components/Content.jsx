import React from 'react';

import { Routes, Route } from 'react-router-dom';

import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";

const Content = () => {
    return (
        <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
    );
};

export default Content;