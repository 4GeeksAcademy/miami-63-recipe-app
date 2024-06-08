import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { UserHome } from "./pages/user-home";
import { ItemDetail } from "./pages/item-detail";
import { Search } from "./pages/search";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Single } from "./pages/single";
import { CreateRecipe } from "./pages/CreateRecipe";
import { RecipePage } from "./pages/RecipePage";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const LayoutContent = () => {
    const location = useLocation();
    const renderNavbar = !["/login", "/signup"].includes(location.pathname);

    return (
        <div>
            {renderNavbar && <Navbar />}
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<UserHome />} path="/user-home" />
                <Route element={<ItemDetail />} path="/item-detail/:id" />
                <Route element={<Search />} path="/search" />
                <Route element={<Signup />} path="/signup" />
                <Route element={<Login />} path="/login" />
                <Route element={<CreateRecipe />} path="/createrecipe" />
                <Route element={<RecipePage />} path="recipepage/:id" />
                <Route element={<h1>Not found!</h1>} />
            </Routes>
        </div>
    );
};

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <>
            <BrowserRouter basename={basename}>
                <LayoutContent />
            </BrowserRouter>
            {/* <LayoutContent /> */}
            {/* <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<CreateRecipe />} path="/createrecipe" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer /> */}
        </>
    );
};

export default injectContext(Layout);