import React from "react";
import { useRoutes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import Home from "./pages/Home";

const ProjectRoutes = () => {
    let element = useRoutes([
        { path: "/login", element: <LogIn/>},
        { path: "/register", element: <SignUp /> },
        { path: "/home", element: <Home /> }
    ]);

    return element;
};

export default ProjectRoutes;
