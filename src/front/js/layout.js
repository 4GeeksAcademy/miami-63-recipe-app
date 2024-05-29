import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { UserHome } from "./pages/user-home";
import { ItemDetail } from "./pages/item-detail";
import { Search } from "./pages/search";

import { CreateRecipe } from "./pages/CreateRecipe";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";

const LayoutContent = () => {
    const location = useLocation();
    const renderNavbar = !["/login", "/signup"].includes(location.pathname);

    return (
        <div>
            <BrowserRouter basename={basename}>
            {renderNavbar && <Navbar />}
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<UserHome />} path="/user-home" />
                    <Route element={<ItemDetail />} path="/item-detail/:id" />
                    <Route element={<Search />} path="/search" />
                    <Route element={<Signup />} path="/signup" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <BrowserRouter basename={basename}>
            <LayoutContent />
        </BrowserRouter>
    );
};

export default injectContext(Layout);