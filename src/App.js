import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthForms from './components/AuthForms';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthForms />
      </div>
    </Router>
  );
}

export default App;