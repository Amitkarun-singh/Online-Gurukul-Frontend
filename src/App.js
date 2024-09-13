import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';
import ProjectRoutes from './Routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className='bg-blue-400_01 bg-opacity-65 w-[100%] h-[100%] min-h-screen min-w-full'>
          <Router>
            <ProjectRoutes />
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;