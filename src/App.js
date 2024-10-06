import React, {useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {ProjectRoutes, AuthRoutes} from './Routes';
import { useSelector } from "react-redux";
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';


function App() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  console.log(user);
  
  return (
        <div className='bg-blue-400_01 bg-opacity-65 w-[100%] h-[100%] min-h-screen min-w-full'>
          <Router>
            {
              user? 
              (
                <>
                  <Navbar user = {user}/>
                  <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                  <ProjectRoutes user = {user} sidebarOpen={sidebarOpen}/>
                </>
              ) :
              (
                <>
                  <AuthRoutes/>
                </>
              )
            }
          </Router>
          
        </div>
  );
}

export default App;