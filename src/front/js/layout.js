import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { UserHome } from "./pages/user-home";
import { ItemDetail } from "./pages/item-detail";
import { RecipeBoard } from "./pages/recipe-board";
import { RecipePage } from "./pages/recipe-page";
import { Search } from "./pages/search";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { ResetRequest } from "./pages/reset-request";
import { ChangePassword } from "./pages/change-password";
import injectContext from "./store/appContext";

import { CreateRecipe } from "./pages/CreateRecipe";
import { Navbar } from "./component/navbar";

const LayoutContent = () => {
    const location = useLocation();
    const renderNavbar = !["/login", "/signup", "/reset-request", "/change-password"].includes(location.pathname);

    return (
        <div>
            {renderNavbar && <Navbar />}
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<UserHome />} path="/user-home" />
                <Route element={<ItemDetail />} path="/item-detail/:id" />
                <Route element={<RecipeBoard />} path="/recipe-board/:id" />
                <Route element={<RecipePage />} path="/recipe-page/:id" />
                <Route element={<Search />} path="/search" />
                <Route element={<Signup />} path="/signup" />
                <Route element={<Login />} path="/login" />
                <Route element={<CreateRecipe />} path="/createrecipe" />
                <Route element={<ResetRequest />} path="/reset-request" />
                <Route element={<ChangePassword />} path="/change-password" />
                <Route element={<h1>Not found!</h1>} />
            </Routes>
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