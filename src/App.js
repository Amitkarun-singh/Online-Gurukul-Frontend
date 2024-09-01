import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import ProjectRoutes from './Routes';

function App() {
  return (
    <div className='bg-blue-300_01 bg-opacity-25 w-[100%] h-[100%]'>
      {/* <Card/> */}
      <Provider store={store}>
        <Router>
          <ProjectRoutes />
        </Router>
      </Provider>
      
    </div>
  );
}

export default App;