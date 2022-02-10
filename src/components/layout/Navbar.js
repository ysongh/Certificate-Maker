import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Container, Segment, Menu, Button } from 'semantic-ui-react';
import Web3 from 'web3';
import UAuth from '@uauth/js';

import CertificateMaker from '../../abis/CertificateMaker.json';
import { web3modal } from '../Web3modal';
import Logo from '../../logo.svg';
import {
  UNSTOPPABLEDOMAINS_CLIENTID,
  UNSTOPPABLEDOMAINS_CLIENTSECRET,
  UNSTOPPABLEDOMAINS_REDIRECT_URI,
  UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI
} from '../../config';

const uauth = new UAuth({
  clientID: UNSTOPPABLEDOMAINS_CLIENTID,
  clientSecret: UNSTOPPABLEDOMAINS_CLIENTSECRET,
  scope: 'openid email wallet',
  redirectUri: UNSTOPPABLEDOMAINS_REDIRECT_URI,
  postLogoutRedirectUri: UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI,
})

function Navbar({ walletAddress, udName, setWalletAddress, setContract }) {
  const history = useHistory();

  const [activeItem, setActiveItem] = useState('Home');

  const connectToBlockchain = async () => {
    try{
      await loadWeb3();
      await loadBlockchainData();
    } catch(error) {
      console.error(error);
    }
  }

  const loadWeb3 = async () => {
    const provider = await web3modal.connect();
    window.web3 = new Web3(provider);

    await window.ethereum.enable();
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setWalletAddress(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = CertificateMaker.networks[networkId];

    if(networkData){
      const abi = CertificateMaker.abi;
      const address = CertificateMaker.networks[networkId].address;

      const data = new web3.eth.Contract(abi, address);
      setContract(data);
    }else{
      window.alert('Contract is not deployed to detected network')
    }
  }

  const logout = () => {
    setWalletAddress('');
    setContract(null);
  }

  const logoutFromUnstoppableDomains = async () => {
    try {
      await uauth.logout();

      history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Segment color='purple' inverted>
      <Container>
        <Menu inverted secondary>
          <Menu.Item
            as={Link}
            to='/'
            name='Certificate Maker'
            onClick={() => setActiveItem('Home')}
          >
            <img src={Logo} style={{ width: '8rem' }} alt="Logo" />
          </Menu.Item>
          <Menu.Item
            as={Link}
            to='/'
            name='Home'
            active={activeItem === 'Home'}
            onClick={() => setActiveItem('Home')}
          />
          <Menu.Item
            as={Link}
            to='/certificate-template-list'
            name='Template List'
            active={activeItem === 'List'}
            onClick={() => setActiveItem('List')}
          />
          <Menu.Item
            as={Link}
            to='/add-certificate'
            name='Add Certificate Border'
            active={activeItem === 'Add Certificate Border'}
            onClick={() => setActiveItem('Add Certificate Border')}
          />
          {walletAddress || udName
            && <Menu.Item
                as={Link}
                to='/user-certificates'
                name='Your Certificates'
                active={activeItem === 'Your Certificates'}
                onClick={() => setActiveItem('Your Certificates')}
              />
          }
          {walletAddress ? (
            <Menu.Menu position='right'>
              <Menu.Item>
                <p>{walletAddress.substring(0,8)}...{walletAddress.substring(34,42)}</p>
              </Menu.Item>
              <Menu.Item>
                <Button color="red" onClick={logout}>Disconnect</Button>
              </Menu.Item>
            </Menu.Menu>
          ) : udName ? (
            <Menu.Menu position='right'>
              <Menu.Item>
                <p>{udName}</p>
              </Menu.Item>
              <Menu.Item>
                <Button color="red" onClick={logoutFromUnstoppableDomains}>Logout</Button>
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu position='right'>
              <Menu.Item>
                <Button color='green' onClick={connectToBlockchain}>Open Wallet</Button>
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
      </Container>
    </Segment>

  );
}

export default Navbar;