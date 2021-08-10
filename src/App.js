import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import CertificateTemplateList from './pages/CertificateTemplateList';
import CertificateForm from './pages/CertificateForm';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [contract, setContract] = useState(null);

  return (
    <Router className="App">
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        setContract={setContract} />
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
