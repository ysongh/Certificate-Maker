import * as UAuthWeb3Modal from '@uauth/web3modal';
import UAuthSPA from '@uauth/js';
import Web3Modal from "web3modal";

import {
  UNSTOPPABLEDOMAINS_CLIENTID,
  UNSTOPPABLEDOMAINS_CLIENTSECRET,
  UNSTOPPABLEDOMAINS_REDIRECT_URI,
  UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI
} from '../config';

export const uauthOptions = {
  clientID: UNSTOPPABLEDOMAINS_CLIENTID,
  clientSecret: UNSTOPPABLEDOMAINS_CLIENTSECRET,
  redirectUri: UNSTOPPABLEDOMAINS_REDIRECT_URI,
  postLogoutRedirectUri: UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI,

  scope: 'openid wallet',
}

const providerOptions = {
  'custom-uauth': {
    display: UAuthWeb3Modal.display,
    connector: UAuthWeb3Modal.connector,
    package: UAuthSPA,
    options: uauthOptions,
  },
}

export const web3modal = new Web3Modal({providerOptions});

UAuthWeb3Modal.registerWeb3Modal(web3modal);