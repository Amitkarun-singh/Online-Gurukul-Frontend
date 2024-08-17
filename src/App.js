import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import AuthForms from './components/AuthForms';
import SignUp from './pages/SignUp.jsx';
import LogIn from './pages/Login.jsx';

function App() {
  return (
    <Router>
      <div className="App bg-[#00BEFF] bg-opacity-25">
        {/* <AuthForms /> */}
        {/* <SignUp /> */}
        <LogIn/>
      </div>
    </Router>
  );
}

export default App;