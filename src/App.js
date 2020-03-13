import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import FindPlace from './pages/FindPlace';

function App() {
  return (
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/about/" component={About} />
      <Route path="/map/" component={FindPlace} />
    </div>
  );
}

export default App;
