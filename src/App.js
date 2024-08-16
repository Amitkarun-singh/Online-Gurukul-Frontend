import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import AuthForms from './components/AuthForms';
import SignUp from './pages/SignUp.jsx';
import LogIn from './pages/Login.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <AuthForms /> */}
        <SignUp />
        {/* <LogIn/> */}
      </div>
    </Router>
  );
}

export default App;