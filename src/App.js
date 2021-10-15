import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CertificateTemplateList from './pages/CertificateTemplateList';
import CertificateForm from './pages/CertificateForm';
import CertificateMaker from './pages/CertificateMaker';
import UserCertificates from './pages/UserCertificates';
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
      <div style={{ minHeight: '77vh' }}>
        <Switch>
          <Route path="/user-certificates">
            <UserCertificates
              walletAddress={walletAddress}
              contract={contract} />
          </Route>
          <Route path="/add-certificate">
            <CertificateForm
              walletAddress={walletAddress}
              contract={contract} />
          </Route>
          <Route path="/certificate-maker/:cid">
            <CertificateMaker
              walletAddress={walletAddress}
              contract={contract} />
          </Route>
          <Route path="/">
            <CertificateTemplateList />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
