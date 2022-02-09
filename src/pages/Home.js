import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import UAuth from '@uauth/js';

import UDbtn from '../assets/ud-default-button.png';
import {
  UNSTOPPABLEDOMAINS_CLIENTID,
  UNSTOPPABLEDOMAINS_CLIENTSECRET,
  UNSTOPPABLEDOMAINS_REDIRECT_URI,
  UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI
} from '../config';

const uauth = new UAuth({
  clientID: UNSTOPPABLEDOMAINS_CLIENTID,
  clientSecret: UNSTOPPABLEDOMAINS_CLIENTSECRET,
  scope: 'openid email wallet',
  redirectUri: UNSTOPPABLEDOMAINS_REDIRECT_URI,
  postLogoutRedirectUri: UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI,
})

function Home({ setUDName }) {
  const loginWithUnstoppableDomains = async () => {
    try {
      const authorization = await uauth.loginWithPopup();
   
      console.log(authorization);
      setUDName(authorization.idToken.sub);
    } catch (error) {
      console.error(error);
    }
  }

  return <div className="hero-img">
    <Container className="hero-content">
      <Header style={{ paddingTop: "12rem" }} as='h1'>
        Send your Digital Certificate as NFT
      </Header>
      <p>Chose a certificate border created by designers</p>
      <br />
      <img className="ud-btn" src={UDbtn} onClick={loginWithUnstoppableDomains} />
    </Container>
  </div>;
}

export default Home;