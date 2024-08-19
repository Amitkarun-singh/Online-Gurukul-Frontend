import React from "react";
import { useRoutes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

const ProjectRoutes = () => {
    let element = useRoutes([
        { path: "/login", element: <LogIn/>},
        { path: "/register", element: <SignUp /> },
        { path: "/reset-password", element : <ResetPassword/>}
    ]);

    return element;
};

export default ProjectRoutes;
