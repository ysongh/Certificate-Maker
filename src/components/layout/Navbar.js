import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Container, Segment, Menu, Button } from 'semantic-ui-react';
import UAuth from '@uauth/js';

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

  const logout = () => {
    setWalletAddress('');
    setContract(null);
    history.push('/');
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
          {(walletAddress || udName)
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
                {/* <Button color='green' onClick={connectToBlockchain}>Open Wallet</Button> */}
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
      </Container>
    </Segment>

  );
}

export default Navbar;