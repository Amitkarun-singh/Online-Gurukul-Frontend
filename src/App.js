import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProjectRoutes from "./Routes";

function App() {
  return (
    <div className='bg-blue-400_01 bg-opacity-65 w-[100%] h-[100%]'>
      <Router>
        <ProjectRoutes/>
      </Router>
    </div>
  );
}

export default App;