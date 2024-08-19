import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProjectRoutes from "./Routes";
import ChangePassword from './pages/ChangePassword';
import EnterOTP from './pages/EnterOTP';

function App() {
  return (
    <div className='bg-blue-300_01 bg-opacity-25 w-[100vw] h-[100vh]'>
      {/* <ChangePassword/> */}
      {/* <EnterOTP/> */}
      <Router>
        <ProjectRoutes/>
      </Router>
    </div>
  );
}

export default App;