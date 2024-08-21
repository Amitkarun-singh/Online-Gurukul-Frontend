import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProjectRoutes from "./Routes";
import {Card} from './components/Card/card';

function App() {
  return (
    <div>
      {/* <Card/> */}
     <Router>
      <ProjectRoutes/>
     </Router>
    </div>
  );
}

export default App;