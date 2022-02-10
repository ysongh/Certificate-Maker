import React from 'react';
import { useHistory } from 'react-router';
import { Container } from 'semantic-ui-react';
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
  const history = useHistory();

  const loginWithUnstoppableDomains = async () => {
    try {
      const authorization = await uauth.loginWithPopup();
   
      console.log(authorization);
      setUDName(authorization.idToken.sub);
      history.push('/certificate-template-list');
    } catch (error) {
      console.error(error);
    }
  }

  return <div className="hero-img">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#9640C1" fill-opacity="1" d="M0,64L48,74.7C96,85,192,107,288,101.3C384,96,480,64,576,53.3C672,43,768,53,864,90.7C960,128,1056,192,1152,192C1248,192,1344,128,1392,96L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
</svg>
    <Container className="hero-content">
      <h1>
        Send your Digital Certificate as NFT
      </h1>
      <p>Chose a certificate border created by designers</p>
      <br />
      <img className="ud-btn" src={UDbtn} onClick={loginWithUnstoppableDomains} />
    </Container>
  </div>;
}

export default Home;
