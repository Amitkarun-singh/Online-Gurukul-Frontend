import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProjectRoutes from "./Routes";
import {Card} from './components/Card/card.jsx';

function App() {
  return (
    <div className='bg-blue-300_01 bg-opacity-25 w-[100%] h-[100%]'>
      <Card/>
      {/* <Router>
        <ProjectRoutes/>
      </Router> */}
    </div>
  );
}

export default App;