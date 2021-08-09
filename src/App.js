import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import CertificateForm from './pages/CertificateForm';
import './App.css';

function App() {
  return (
    <Router className="App">
      <Navbar />
      <Switch>
        <Route path="/add-certificate">
          <CertificateForm />
        </Route>
        <Route path="/">
          <h1>Certificate Maker</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
