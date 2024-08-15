import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import AuthForms from './components/AuthForms';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <AuthForms /> */}
        <SignUp />
      </div>
    </Router>
  );
}

export default App;