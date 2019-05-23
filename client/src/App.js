import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes'

function App() {
  return (
    <Router>
        <div>
        <main>
          <Routes />
        </main>

          </div>
      </Router>
  
  );
}

export default App;
