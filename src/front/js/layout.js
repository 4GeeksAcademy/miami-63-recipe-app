import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Navbar />
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<UserHome />} path="/user-home" />
                    <Route element={<Single />} path="/single/:theid" />
                    <Route element={<CreateRecipe />} path="/createrecipe" />
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

export default injectContext(Layout);
