import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import CertificateTemplateList from './pages/CertificateTemplateList';
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
          <CertificateTemplateList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
