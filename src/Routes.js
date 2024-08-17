import React from "react";
import { useRoutes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";

const ProjectRoutes = () => {
    let element = useRoutes([
        { path: "/login", element: <LogIn/>},
        { path: "/register", element: <SignUp /> },
    ]);

    return element;
};

export default ProjectRoutes;
