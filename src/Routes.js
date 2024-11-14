import React from "react";
import { useRoutes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import Home from "./pages/Home";
import EnterOTP from "./pages/EnterOTP";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import ClassManagement from "./pages/ClassManagement";
import ModulePage from "./pages/ModulePage";
// import CreateNotes from "./pages/CreateNotes";

const ProjectRoutes = ({sidebarOpen , user}) => {
        let element = useRoutes([
                { path: "/", element: <Home sidebarOpen={sidebarOpen}/> },
                { path: "/class-management/:classRoomId", element: <ClassManagement user={user} sidebarOpen={sidebarOpen}/> },
                { path: "/module/:moduleId", element: <ModulePage user={user} sidebarOpen={sidebarOpen}/>},
                // { path: "/create-notes", element : <CreateNotes/>}
        ]);

        return element;
};

const AuthRoutes = () => {
        let element = useRoutes([
                { path: "/", element: <LogIn/>},
                { path: "/register", element: <SignUp /> },
                { path: "/reset-password", element : <ResetPassword/>},
                { path: "/enter-otp", element : <EnterOTP/>},
                { path: "/change-password", element : <ChangePassword/>},
        ]);

        return element;
};

export {ProjectRoutes, AuthRoutes};
