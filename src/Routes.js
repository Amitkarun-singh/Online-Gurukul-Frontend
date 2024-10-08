import React from "react";
import { useRoutes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import Home from "./pages/Home";
import EnterOTP from "./pages/EnterOTP";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";

const ProjectRoutes = ({sidebarOpen}) => {
        let element = useRoutes([
                // { path: "/login", element: <LogIn/>},
                // { path: "/register", element: <SignUp /> },
                { path: "/", element: <Home sidebarOpen={sidebarOpen}/> },
                // { path: "/reset-password", element : <ResetPassword/>},
                // { path: "/enter-otp", element : <EnterOTP/>},
                // { path: "/change-password", element : <ChangePassword/>}
        ]);

        return element;
};

const AuthRoutes = () => {
        let element = useRoutes([
                { path: "/", element: <LogIn/>},
                { path: "/register", element: <SignUp /> },
                { path: "/reset-password", element : <ResetPassword/>},
                { path: "/enter-otp", element : <EnterOTP/>},
                { path: "/change-password", element : <ChangePassword/>}
        ]);

        return element;
};

export {ProjectRoutes, AuthRoutes};
