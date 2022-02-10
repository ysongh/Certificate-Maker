import React, { useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CertificateTemplateList from './pages/CertificateTemplateList';
import CertificateForm from './pages/CertificateForm';
import CertificateMaker from './pages/CertificateMaker';
import UserCertificates from './pages/UserCertificates';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [udName, setUDName] = useState('');
  const [contract, setContract] = useState(null);

  return (
    <Router className="App">
      <div style={{ minHeight: '77vh' }}>
        <Switch>
          <Route path="/user-certificates">
            <Navbar
              walletAddress={walletAddress}
              udName={udName}
              setWalletAddress={setWalletAddress}
              setContract={setContract} />
            <UserCertificates
              walletAddress={walletAddress}
              contract={contract} />
          </Route>
          <Route path="/add-certificate">
            <Navbar
              walletAddress={walletAddress}
              udName={udName}
              setWalletAddress={setWalletAddress}
              setContract={setContract} />
            <CertificateForm
              walletAddress={walletAddress}
              contract={contract} />
          </Route>
          <Route path="/certificate-maker/:cid">
            <Navbar
              walletAddress={walletAddress}
              udName={udName}
              setWalletAddress={setWalletAddress}
              setContract={setContract} />
            <CertificateMaker
              walletAddress={walletAddress}
              contract={contract} />
          </Route>
          <Route path="/certificate-template-list">
            <Navbar
              walletAddress={walletAddress}
              udName={udName}
              setWalletAddress={setWalletAddress}
              setContract={setContract} />
            <CertificateTemplateList />
          </Route>
          <Route path="/">
            <Home setUDName={setUDName} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
