# Certificate Maker NFT
A dapp where users can use certificate template to create certificate and upload it to IPFS

## Features
- Users can create certificates and upload it to IPFS
- User can use certificate borders that are created by designers
- User can mint certificate as NFT
- Developers can see a list of bounties and choose which bounties to work on.
- Designers can earn cryptos when someone used their certificate borders to mint NFT of certificates.
- User will need to purchase membership to see all certificate borders.
- User can login with Unstoppable Domain

## Technologies
- React
- semantic-ui
- Node.js
- nft.storage (Store certificates and its metadata)
- Pinata (Store certificate borders)
- Polygon (Deploy the contract on Polygon Testnet for cheap gas fee)
- Filecoin Testnet (Deploy the contract on Hyperspace Testnet for cheap gas fee)
- Unlock (Using Unlock's Paywall to get user to pay membership to access all certificate templates)
- Unstoppable Domains Login

## Running the dapp on local host
- Clone or download this repository
- Run `npm i` to install the dependencies
- Install and open up Ganache and click "Quickstart"
- Run `truffle migrate` to deploy the contract
- Create a file called 'config.js' on the src folder and add the following code
```
export const PINATA_APIKEY = "< Create API key from Pinata >";
export const PINATA_SECRETAPIKEY = "< Create API key from Pinata >";
export const SERVER_URL = "http://localhost:4000/";
export const UNSTOPPABLEDOMAINS_CLIENTID = "< Your Unstoppable Domains Client Id >";
export const UNSTOPPABLEDOMAINS_CLIENTSECRET = "< Your Unstoppable Domains Client Secret >";
export const UNSTOPPABLEDOMAINS_REDIRECT_URI = "< Your Unstoppable Domains Redirect URL >";
export const UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI = "< Your Unstoppable Domains Logout Redirect URL >";
```
- Create a file called '.env' on the root folder and add the following code
```
NFTSTORAGE_APIKEY =  "< Create API key from nft.storage >";
MNEMONIC=< Your mnemonic >
ALCHEMYAPI_KEY = < Your Alchemy API key >
```
- Run `npm start` to start the dapp